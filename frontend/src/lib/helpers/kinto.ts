import { getContract, PublicClient } from "viem";
import { KintoSDK, KYCViewerInfo } from "../type";
import { kycViewer } from "../constants";

export async function kintoLogin(kintoSDK: KintoSDK) {
  try {
    await kintoSDK.createNewWallet();
  } catch (error) {
    console.error("Failed to login/signup:", error);
  }
}

export async function fetchKYCViewerInfo(
  address: string,
  publicClient: PublicClient
): Promise<KYCViewerInfo> {
  if (address) return {} as KYCViewerInfo;

  const kycViewerContract = getContract({
    address: kycViewer.contracts.KYCViewer.address as `0x${string}`,
    abi: kycViewer.contracts.KYCViewer.abi,
    client: { public: publicClient },
  });

  try {
    const [
      isIndividual,
      isCorporate,
      isKYC,
      isSanctionsSafe,
      getCountry,
      getWalletOwners,
    ] = await Promise.all([
      kycViewerContract.read.isIndividual([address]),
      kycViewerContract.read.isCompany([address]),
      kycViewerContract.read.isKYC([address]),
      kycViewerContract.read.isSanctionsSafe([address]),
      kycViewerContract.read.getCountry([address]),
      kycViewerContract.read.getWalletOwners([address]),
    ]);

    return {
      isIndividual,
      isCorporate,
      isKYC,
      isSanctionsSafe,
      getCountry,
      getWalletOwners,
    } as KYCViewerInfo;
  } catch (error) {
    console.error("Failed to fetch KYC viewer info:", error);
    return {} as KYCViewerInfo;
  }
}

export async function fetchAccountInfo(kintoSDK: KintoSDK, setAddress: any) {
  try {
    const res = await kintoSDK.connect();
    setAddress(res.walletAddress || "0x");
  } catch (error) {
    console.error("Failed to fetch account info:", error);
  }
}
