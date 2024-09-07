import React, { createContext, useContext, useState, ReactNode } from "react";
import { createKintoSDK } from "kinto-web-sdk";
import { KintoSDK } from "@/lib/type";
interface BalanceContextType {
  totalBalance: number | null;
  setTotalBalance: (totalBalance: number) => void;
  balanceObject: any;
  setBalanceObject: (balanceObject: any) => void;
  balanceObjectInUSD: any;
  setBalanceObjectInUSD: (balanceObjectInUSD: any) => void;
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
  kintoSDK: KintoSDK;
  address: string;
  setAddress: (address: string) => void;
  appName: string;
  setAppName: (appName: string) => void;
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
  const [totalBalance, setTotalBalance] = useState<number | null>(null);
  const [balanceObject, setBalanceObject] = useState<any>(null);
  const [balanceObjectInUSD, setBalanceObjectInUSD] = useState<any>(null);
  const [openAi, setOpenAi] = useState<boolean>(false);
  const [actionParams, setActionParams] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [openPositionTransactionModal, setOpenPositionTransactionModal] =
    useState<boolean>(false);
  const appAddress = process.env.NEXT_PUBLIC_KINTO_APP_ADDRESS || "";
  const kintoSDK = createKintoSDK(appAddress);
  const [address, setAddress] = useState("");
  const [appName, setAppName] = useState("");
  return (
    <BalanceContext.Provider
      value={{
        totalBalance,
        setTotalBalance,
        balanceObject,
        setBalanceObject,
        balanceObjectInUSD,
        setBalanceObjectInUSD,
        openAi,
        setOpenAi,
        actionParams,
        setActionParams,
        action,
        setAction,
        openPositionTransactionModal,
        setOpenPositionTransactionModal,
        kintoSDK,
        address,
        setAddress,
        appName,
        setAppName,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
