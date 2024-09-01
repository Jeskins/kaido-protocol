import React, { createContext, useContext, useState, ReactNode } from "react";

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
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
