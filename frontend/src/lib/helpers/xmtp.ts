import { Signer } from "ethers";
import { Client } from "@xmtp/react-sdk";

const ENCODING = "binary";

export const buildLocalStorageKey = (walletAddress: string) => {
  return walletAddress ? `xmtp:production:keys:${walletAddress}` : "";
};

export const loadKeys = (walletAddress: string) => {
  const val = localStorage.getItem(buildLocalStorageKey(walletAddress));
  return val ? Buffer.from(val, ENCODING) : null;
};

export const storeKeys = (walletAddress: string, keys: Uint8Array) => {
  localStorage.setItem(
    buildLocalStorageKey(walletAddress),
    Buffer.from(keys).toString(ENCODING)
  );
};

export const wipeKeys = (walletAddress: string) => {
  localStorage.removeItem(buildLocalStorageKey(walletAddress));
};

export const initXmtpWithKeys = async (signer: Signer, initialize: any) => {
  if (signer == null) return;
  const options: any = { env: "dev" };
  const address = await signer.getAddress();
  if (!address) return;
  let keys: any = loadKeys(address);
  if (!keys) {
    keys = await Client.getKeys(signer, {
      ...options,
      skipContactPublishing: true,
      persistConversations: false,
    });
    storeKeys(address, keys);
  }
  await initialize({ keys, options, signer });
};
export const handleLogout = async (
  signer: any,
  setIsOnNetwork: any,
  disconnect: any
) => {
  if (signer == null) return;
  const address = await signer.getAddress();
  wipeKeys(address);
  console.log("wipe", address);
  setIsOnNetwork(false);
  await disconnect();
  localStorage.removeItem("isOnNetwork");
  localStorage.removeItem("isConnected");
};
