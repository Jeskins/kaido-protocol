import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ChooseToken from "./chooseToken";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAccount, useWriteContract } from "wagmi";
import { erc20Abi, parseEther, zeroAddress } from "viem";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import { supportedchains, supportedcoins } from "@/lib/constants";
import { arbitrumSepolia } from "viem/chains";
import { config } from "@/lib/config";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useEnvironmentContext } from "../context";

export function CreatePositionDialog({
  open,
  setOpen,
  tokenA,
  tokenB,
  setTokenA,
  setTokenB,
  tokenAmountA,
  setTokenAmountA,
  tokenAmountB,
  setTokenAmountB,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  tokenA: string;
  tokenB: string;
  setTokenA: (token: string) => void;
  setTokenB: (token: string) => void;
  tokenAmountA: string;
  setTokenAmountA: (tokenAmount: string) => void;
  tokenAmountB: string;
  setTokenAmountB: (tokenAmount: string) => void;
}) {
  const [completedTxs, setCompletedTxs] = useState(0);
  const [approveATx, setApproveATx] = useState("");
  const [approveBTx, setApproveBTx] = useState("");
  const [actionTx, setActionTx] = useState("");
  const { toast } = useToast();
  const { chainId, address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [txStarted, setTxStarted] = useState(0);
  const [pool, setPool] = useState(zeroAddress);
  const [firstIsTokenA, setFirstIsTokenA] = useState(true);
  const { setOpenAi } = useEnvironmentContext();
  useEffect(() => {
    let tempPool;
    if (
      supportedchains[chainId || arbitrumSepolia.id].pools[
        ((tokenA as string) + tokenB) as string
      ] == undefined
    ) {
      setFirstIsTokenA(true);
      tempPool =
        supportedchains[chainId || arbitrumSepolia.id].pools[
          ((tokenB as string) + tokenA) as string
        ];
    } else {
      setFirstIsTokenA(false);
      tempPool =
        supportedchains[chainId || arbitrumSepolia.id].pools[
          ((tokenA as string) + tokenB) as string
        ];
    }

    console.log("tempPool");
    console.log(tempPool);
    setPool(tempPool);
  }, [tokenA, tokenB]);
  useEffect(() => {
    if (approveATx != "") {
      toast({
        title: `Approve ${tokenA.toUpperCase()} Confirmed`,
        description: "Transaction Sent Successfully",
        action: (
          <ToastAction altText="Goto schedule to undo">
            <Link
              target="_blank"
              href={
                supportedchains[(chainId || arbitrumSepolia.id).toString()]
                  .explorer +
                "tx/" +
                approveATx
              }
            >
              View
            </Link>
          </ToastAction>
        ),
      });
    }
  }, [approveATx]);

  useEffect(() => {
    if (approveBTx != "") {
      toast({
        title: `Approve ${tokenB.toUpperCase()} Confirmed`,
        description: "Transaction Sent Successfully",
        action: (
          <ToastAction altText="Goto schedule to undo">
            <Link
              target="_blank"
              href={
                supportedchains[(chainId || arbitrumSepolia.id).toString()]
                  .explorer +
                "tx/" +
                approveBTx
              }
            >
              View
            </Link>
          </ToastAction>
        ),
      });
    }
  }, [approveBTx]);

  useEffect(() => {
    if (actionTx != "") {
      toast({
        title: "Position Created",
        description: "Transaction Sent Successfully",
        action: (
          <ToastAction altText="Goto schedule to undo">
            <Link
              target="_blank"
              href={
                supportedchains[(chainId || arbitrumSepolia.id).toString()]
                  .explorer +
                "tx/" +
                actionTx
              }
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
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-between items-center">
              <p>Create Position</p>
              <Button
                size={"sm"}
                variant={"ghost"}
                className="mr-6"
                onClick={() => setOpenAi(true)}
              >
                ℹ️ Help
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription className="text-sm">
            If you don't understand something click the Help button to chat with
            our AI.
          </DialogDescription>
        </DialogHeader>
        <ChooseToken
          index={1}
          token={tokenA}
          setToken={setTokenA}
          tokenAmount={tokenAmountA}
          setTokenAmount={setTokenAmountA}
          setTokenAmountB={setTokenAmountB}
          otherToken={tokenB}
          txStarted={txStarted != 0}
        />
        <ChooseToken
          index={2}
          token={tokenB}
          setToken={setTokenB}
          tokenAmount={tokenAmountB}
          setTokenAmountB={setTokenAmountA}
          setTokenAmount={setTokenAmountB}
          otherToken={tokenA}
          txStarted={txStarted != 0}
        />
        <div className="flex flex-col space-y-2">
          <Button
            variant="outline"
            className="w-full my-0"
            disabled={txStarted != 0}
            onClick={async () => {
              setTxStarted(1);
              try {
                const tx = await writeContractAsync({
                  address:
                    supportedchains[chainId || arbitrumSepolia.id].tokens[
                      tokenA
                    ],
                  abi: erc20Abi,
                  functionName: "approve",
                  args: [
                    pool,
                    BigInt(parseEther(tokenAmountA)) /
                      (tokenA == "usdc"
                        ? BigInt("1000000000000")
                        : BigInt("1")),
                  ],
                });
                const txReceipt = await waitForTransactionReceipt(config, {
                  hash: tx,
                });
                setApproveATx(tx);
                setCompletedTxs(completedTxs + 1);
              } catch (e) {
                setTxStarted(0);
                setCompletedTxs(0);
              }
            }}
          >
            {txStarted == 1 && completedTxs == 0 ? (
              <div className="black-spinner"></div>
            ) : (
              ` Approve ${tokenA.toUpperCase()}`
            )}
          </Button>
          <Button
            onClick={async () => {
              setTxStarted(2);
              try {
                const tx = await writeContractAsync({
                  address:
                    supportedchains[chainId || arbitrumSepolia.id].tokens[
                      tokenB
                    ],
                  abi: erc20Abi,
                  functionName: "approve",
                  args: [
                    pool,
                    BigInt(parseEther(tokenAmountB)) /
                      (tokenB == "usdc"
                        ? BigInt("1000000000000")
                        : BigInt("1")),
                  ],
                });

                const txReceipt = await waitForTransactionReceipt(config, {
                  hash: tx,
                });

                setApproveBTx(tx);
                setCompletedTxs(completedTxs + 1);
              } catch (e) {
                setTxStarted(0);
                setCompletedTxs(0);
              }
            }}
            variant="outline"
            className="w-full  my-0"
            disabled={completedTxs != 1 || txStarted == 2}
          >
            {txStarted == 2 && completedTxs == 1 ? (
              <div className="black-spinner"></div>
            ) : (
              ` Approve ${tokenB.toUpperCase()}`
            )}
          </Button>
          <Button
            onClick={async () => {
              setTxStarted(3);
              try {
                const args = [
                  address,
                  "-345460",
                  "-345480",
                  BigInt(parseEther(tokenAmountA)) /
                    (tokenA == "usdc" ? BigInt("1000000000000") : BigInt("1")),

                  BigInt(parseEther(tokenAmountB)) /
                    (tokenB == "usdc" ? BigInt("1000000000000") : BigInt("1")),
                ];
                console.log("ARGS");
                console.log(args);
                // const tx = await writeContractAsync({
                //   address: pool,
                //   abi: poolAbi,
                //   functionName: "mint",
                //   args: args,
                // });
                // const txReceipt = await waitForTransactionReceipt(config, {
                //   hash: tx,
                // });
                // setActionTx(tx);
                setCompletedTxs(completedTxs + 1);
              } catch (e) {
                console.log(e);
                setTxStarted(0);
                setCompletedTxs(0);
              }
            }}
            variant="default"
            className="w-full  my-0"
            disabled={completedTxs != 2 || txStarted == 3}
          >
            Create Position
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
