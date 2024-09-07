import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import {
  altPoolAbi,
  depositAbi,
  kintoInfo,
  poolAbi,
  supportedcoins,
} from "@/lib/constants";
import Image from "next/image";
import { roundUpToFiveDecimals } from "@/lib/utils";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { use, useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { encodeFunctionData, erc20Abi, parseEther, zeroAddress } from "viem";
import { arbitrumSepolia } from "viem/chains";
import { useEnvironmentContext } from "../context";
import watchContractEvents from "@/lib/helpers/pool/watch-contract-events";
export default function Transaction({
  open,
  setOpen,
  action,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  action: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
}) {
  const [completedTxs, setCompletedTxs] = useState(0);
  const [depositTx, setDepositTx] = useState("");
  const [approveTx, setApproveTx] = useState("");
  const [actionTx, setActionTx] = useState("");
  const { toast } = useToast();
  const { address } = useEnvironmentContext();
  const [txStarted, setTxStarted] = useState(0);
  const { kintoSDK, publicClient } = useEnvironmentContext();
  const [isDeposit, setIsDeposit] = useState(false);
  const [pool, setPool] = useState<`0x${string}`>(zeroAddress);
  const [zeroIsFrom, setZeroIsFrom] = useState(false);
  const [depositTxStarted, setDepositTxStarted] = useState(false);
  useEffect(() => {
    if (fromToken == "" || toToken == "") return;
    const localFromToken = fromToken == "eth" ? "weth" : fromToken;
    const localToToken = toToken == "eth" ? "weth" : toToken;

    if (
      kintoInfo.pools[
        (localFromToken + localToToken) as keyof typeof kintoInfo.pools
      ] != undefined
    ) {
      setPool(
        kintoInfo.pools[
          (localFromToken + localToToken) as keyof typeof kintoInfo.pools
        ] as `0x${string}`
      );
      setZeroIsFrom(true);
    } else {
      setPool(
        kintoInfo.pools[
          (localToToken + localFromToken) as keyof typeof kintoInfo.pools
        ] as `0x${string}`
      );
      setZeroIsFrom(false);
    }
  }, [fromToken, toToken]);
  useEffect(() => {
    if (address == "") return;
    setIsDeposit(fromToken == "eth");
    watchContractEvents(
      address as `0x${string}`,
      publicClient,
      kintoInfo.tokens[
        fromToken as keyof typeof kintoInfo.tokens
      ] as `0x${string}`,
      fromToken == "eth",
      setDepositTx,
      setApproveTx,
      setActionTx,
      setCompletedTxs
    );
  }, []);

  useEffect(() => {
    if (depositTx != "") {
      toast({
        title: "Deposit Confirmed",
        description: "Transaction Sent Successfully",
        action: (
          <ToastAction altText="Goto schedule to undo">
            <Link
              target="_blank"
              href={`https://explorer.kinto.xyz/tx/` + depositTx}
            >
              View
            </Link>
          </ToastAction>
        ),
      });
    }
  }, [depositTx]);

  useEffect(() => {
    if (approveTx != "") {
      toast({
        title: "Approve Tokens Confirmed",
        description: "Transaction Sent Successfully",
        action: (
          <ToastAction altText="Goto schedule to undo">
            <Link
              target="_blank"
              href={`https://explorer.kinto.xyz/tx/` + approveTx}
            >
              View
            </Link>
          </ToastAction>
        ),
      });
    }
  }, [approveTx]);

  useEffect(() => {
    if (actionTx != "") {
      toast({
        title: `${action == "swap" ? "Swap" : "Order"} Confirmed`,
        description: "Transaction Sent Successfully",
        action: (
          <ToastAction altText="Goto schedule to undo">
            <Link
              target="_blank"
              href={`https://explorer.kinto.xyz/tx/` + actionTx}
            >
              View
            </Link>
          </ToastAction>
        ),
      });
    }
  }, [actionTx]);
  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Confirm {action == "swap" ? "Swap" : "Order"}
          </DialogTitle>
          <DialogDescription>
            <p>Check the summary of the transaction</p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-around w-full text-center items-center text-sm">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <p>From</p>
            <Image
              src={supportedcoins[fromToken].image}
              width={50}
              height={50}
              alt="coin"
              className="mx-auto"
            />
            <p>
              {roundUpToFiveDecimals(fromAmount)}{" "}
              {supportedcoins[fromToken].symbol}
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <ArrowBigRight size={30} />
            <ArrowBigLeft size={30} />
          </div>
          <div className="flex flex-col space-y-3">
            <p>To</p>
            <Image
              src={supportedcoins[toToken].image}
              width={50}
              height={50}
              alt="coin"
              className="mx-auto"
            />
            <p>
              {roundUpToFiveDecimals(toAmount)} {supportedcoins[toToken].symbol}
            </p>
          </div>
        </div>
        {isDeposit && depositTx == "" ? (
          <DialogFooter>
            <Button
              disabled={depositTxStarted}
              onClick={async () => {
                setDepositTxStarted(true);

                try {
                  const depositData = encodeFunctionData({
                    abi: depositAbi,
                    functionName: "deposit",
                    args: [],
                  });
                  await kintoSDK.sendTransaction([
                    {
                      to: kintoInfo.ethDeposit as `0x${string}`,
                      value: BigInt(parseEther(fromAmount)),
                      data: depositData,
                    },
                  ]);
                } catch (e) {
                  console.log(e);
                  setDepositTxStarted(false);
                }
              }}
            >
              {depositTxStarted ? (
                <div className="black-spinner"></div>
              ) : (
                `Deposit ETH`
              )}
            </Button>
          </DialogFooter>
        ) : (
          <DialogFooter>
            <Button
              disabled={
                completedTxs > 0 || (txStarted == 1 && completedTxs == 0)
              }
              onClick={async () => {
                setTxStarted(1);
                console.log("Approving");

                try {
                  const approveData = encodeFunctionData({
                    abi: erc20Abi,
                    functionName: "approve",
                    args: [
                      address as `0x${string}`,
                      BigInt(parseEther(fromAmount)) /
                        (fromToken == "usdc"
                          ? BigInt("1000000000000")
                          : BigInt("1")),
                    ],
                  });

                  await kintoSDK.sendTransaction([
                    {
                      to: kintoInfo.tokens[
                        fromToken as keyof typeof kintoInfo.tokens
                      ] as `0x${string}`,
                      value: BigInt("0"),
                      data: approveData,
                    },
                  ]);
                } catch (e) {
                  console.log(e);
                  setTxStarted(0);
                }
              }}
            >
              {txStarted == 1 && completedTxs == 0 ? (
                <div className="black-spinner"></div>
              ) : (
                `Approve ${supportedcoins[fromToken].symbol}`
              )}
            </Button>
            <Button
              disabled={
                completedTxs == 0 || (txStarted == 2 && completedTxs == 1)
              }
              onClick={async () => {
                setTxStarted(2);
                const amount0 = zeroIsFrom ? fromAmount : toAmount;
                const amount1 = zeroIsFrom ? toAmount : fromAmount;
                const token0 = zeroIsFrom ? fromToken : toToken;
                const token1 = zeroIsFrom ? toToken : fromToken;
                const args = [
                  address,
                  !zeroIsFrom,
                  BigInt(parseEther(amount0)) /
                    (token0 == "usdc" ? BigInt("1000000000000") : BigInt("1")),

                  BigInt(parseEther(amount1)) /
                    (token1 == "usdc" ? BigInt("1000000000000") : BigInt("1")),
                ];
                console.log(args);
                try {
                  const swapData = encodeFunctionData({
                    abi: altPoolAbi,
                    functionName: "swap",
                    args,
                  });
                  await kintoSDK.sendTransaction([
                    {
                      to: pool as `0x${string}`,
                      value: BigInt("0"),
                      data: swapData,
                    },
                  ]);
                } catch (e) {
                  console.log(e);
                  setTxStarted(1);
                }
              }}
            >
              {action == "swap" ? "Perform Swap" : "Create Order"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
