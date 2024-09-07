import { erc20Abi } from "viem";
import { depositAbi, kintoInfo, poolAbi } from "../../constants";

export default function watchContractEvents(
  address: `0x${string}`,
  publicClient: any,
  fromAddress: `0x${string}`,
  isDeposit: boolean,
  setDepositTx: (tx: string) => void,
  setApproveTx: (tx: string) => void,
  setSwapTx: (tx: string) => void,
  setCompletedTxs: React.Dispatch<React.SetStateAction<number>>
) {
  if (isDeposit) {
    const unwatchDeposit = publicClient.watchContractEvent({
      address: kintoInfo.ethDeposit,
      abi: depositAbi,
      eventName: "Transfer",
      args: { to: address },
      onLogs: (logs: any) => {
        console.log(logs);
        setDepositTx(logs.transactionHash);
        unwatchDeposit();
        setCompletedTxs((prev) => prev + 1);
      },
    });
  }

  const unwatchApproval = publicClient.watchContractEvent({
    address: fromAddress,
    abi: erc20Abi,
    eventName: "Approval",
    args: { owner: address },
    onLogs: (logs: any) => {
      console.log(logs);
      setApproveTx(logs.transactionHash);
      unwatchApproval();
      setCompletedTxs((prev) => prev + 1);
    },
  });

  const unwatchSwap = publicClient.watchContractEvent({
    address: fromAddress,
    abi: erc20Abi,
    eventName: "Transfer",
    args: { to: address },
    onLogs: (logs: any) => {
      console.log(logs);
      setSwapTx(logs.transactionHash);
      unwatchSwap();
      setCompletedTxs((prev) => prev + 1);
    },
  });
}
