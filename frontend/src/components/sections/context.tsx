"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ethers, Signer } from "ethers";
import { createKintoSDK } from "kinto-web-sdk";
import { balance, ClassifyResponse, Convo, KintoSDK } from "@/lib/type";
import { createPublicClient, http, PublicClient, WalletClient } from "viem";
import { kinto } from "@/lib/config";
import getAllbalance from "@/lib/helpers/getAllBalances";
import { fetchAccountInfo, fetchKYCViewerInfo } from "@/lib/helpers/kinto";

interface BalanceContextType {
  kintoSDK: KintoSDK;
  address: string;
  setAddress: (address: string) => void;
  totalBalance: number | null;
  setTotalBalance: (totalBalance: number) => void;
  balance: any;
  setBalance: (balance: any) => void;
  balanceInUSD: any;
  setBalanceInUSD: (balanceInUSD: any) => void;
  openAi: boolean;
  setOpenAi: (openAi: boolean) => void;
  actionParams: string;
  setActionParams: (actionParams: string) => void;
  action: string;
  setAction: (action: string) => void;
  openPositionTransactionModal: boolean;
  setOpenPositionTransactionModal: (
    openPositionTransactionModal: boolean
  ) => void;
  openFaucet: boolean;
  setOpenFaucet: (openFaucet: boolean) => void;
  publicClient: any;
  setPublicClient: (publicClient: any) => void;
  convos: Convo[];
  setConvos: (convos: Convo[]) => void;
  classifyResponse: ClassifyResponse;
  setClassifyResponse: (classifyResponse: ClassifyResponse) => void;
  isOnNetwork: boolean;
  setIsOnNetwork: (isOnNetwork: boolean) => void;
  signer: Signer | null;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const useEnvironmentContext = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
};

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const appAddress = process.env.NEXT_PUBLIC_KINTO_APP_ADDRESS || "";
  const kintoSDK = createKintoSDK(appAddress);
  const [balance, setBalance] = useState<balance | null>(null);
  const [balanceInUSD, setBalanceInUSD] = useState<balance | null>(null);
  const [classifyResponse, setClassifyResponse] = useState<ClassifyResponse>({
    response: "",
    action: "",
    params: "",
    suggestions: [],
  });
  const [convos, setConvos] = useState<Convo[]>([]);
  const [openFaucet, setOpenFaucet] = useState<boolean>(false);
  const [totalBalance, setTotalBalance] = useState<number | null>(null);
  const [openAi, setOpenAi] = useState<boolean>(false);
  const [actionParams, setActionParams] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [openPositionTransactionModal, setOpenPositionTransactionModal] =
    useState<boolean>(false);
  const [address, setAddress] = useState("");
  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
  const [kycViewerInfo, setKycViewerInfo] = useState<any>(null);
  const [isOnNetwork, setIsOnNetwork] = useState(false);
  const [signer, setSigner] = useState<Signer | null>(null);
  useEffect(() => {
    const client = createPublicClient({
      chain: kinto,
      transport: http(),
    });
    setPublicClient(client);
  }, []);

  useEffect(() => {
    if (address == "" || publicClient == null) return;
    (async function () {
      await getAllbalance(
        publicClient,
        address,
        setTotalBalance,
        setBalance,
        setBalanceInUSD
      );
    })();
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    setSigner(provider.getSigner());
  }, [address]);

  useEffect(() => {
    fetchAccountInfo(kintoSDK, setAddress);
  }, []);

  useEffect(() => {
    if (address != "" && publicClient != null) {
      fetchKYCViewerInfo(address, publicClient).then((res) =>
        setKycViewerInfo(res)
      );
    }
  }, [address, publicClient]);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const modal = document.getElementById("kinto-sdk-modal");
          if (modal) {
            modal.style.zIndex = "69420";
          }
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  // XMTP

  return (
    <BalanceContext.Provider
      value={{
        kintoSDK,
        address,
        setAddress,
        totalBalance,
        setTotalBalance,
        balanceInUSD,
        setBalanceInUSD,
        balance,
        setBalance,
        openAi,
        setOpenAi,
        actionParams,
        setActionParams,
        action,
        setAction,
        openPositionTransactionModal,
        setOpenPositionTransactionModal,
        publicClient,
        setPublicClient,
        classifyResponse,
        setClassifyResponse,
        convos,
        setConvos,
        openFaucet,
        setOpenFaucet,
        isOnNetwork,
        setIsOnNetwork,
        signer,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
