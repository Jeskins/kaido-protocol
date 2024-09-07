import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { createKintoSDK } from "kinto-web-sdk";
import { balance, ClassifyResponse, Convo, KintoSDK } from "@/lib/type";
import { createPublicClient, formatEther, http } from "viem";
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
  setOpenFacuet: (openFaucet: boolean) => void;
  publicClient: any;
  setPublicClient: (publicClient: any) => void;
  convos: Convo[];
  setConvos: (convos: Convo[]) => void;
  classifyResponse: ClassifyResponse;
  setClassifyResponse: (classifyResponse: ClassifyResponse) => void;
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
  const [openFaucet, setOpenFacuet] = useState<boolean>(true);
  const [totalBalance, setTotalBalance] = useState<number | null>(null);
  const [openAi, setOpenAi] = useState<boolean>(false);
  const [actionParams, setActionParams] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [openPositionTransactionModal, setOpenPositionTransactionModal] =
    useState<boolean>(false);
  const [address, setAddress] = useState("");
  const [publicClient, setPublicClient] = useState<any>(null);
  const [kycViewerInfo, setKycViewerInfo] = useState<any>(null);
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
  }, [address]);

  useEffect(() => {
    fetchAccountInfo(kintoSDK, setAddress);
  });

  useEffect(() => {
    if (address != "") {
      fetchKYCViewerInfo(address, publicClient).then((res) =>
        setKycViewerInfo(res)
      );
    }
  }, [address]);
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
        setOpenFacuet,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
