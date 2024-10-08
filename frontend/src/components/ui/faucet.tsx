import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEnvironmentContext } from "../sections/context";
import Image from "next/image";
import { encodeFunctionData } from "viem";
import { kintoInfo, tokenAbi } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useToast } from "./use-toast";
import { ToastAction } from "./toast";
import Link from "next/link";

export function Faucet() {
  const { openFaucet, setOpenFaucet, kintoSDK, address, publicClient } =
    useEnvironmentContext();
  const { toast } = useToast();

  const [mintTx, setMintTx] = useState<string>("");

  useEffect(() => {
    if (mintTx != "" && mintTx != "-1") {
      toast({
        title: "Drip Tokens Confirmed",
        description: "Transaction Sent Successfully",
        action: (
          <ToastAction altText="Goto schedule to undo">
            <Link
              target="_blank"
              href={`https://explorer.kinto.xyz/tx/` + mintTx}
            >
              View
            </Link>
          </ToastAction>
        ),
      });
      setMintTx("");
    }
  }, [mintTx]);
  return (
    <Dialog
      open={openFaucet}
      onOpenChange={(op) => {
        setOpenFaucet(op);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Faucet</DialogTitle>
          <DialogDescription>
            Drip some tokens to try out our application.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 items-center gap-4">
          <Button
            variant={"outline"}
            onClick={async () => {
              setMintTx("-1");
              const mintData = encodeFunctionData({
                abi: tokenAbi,
                args: [
                  address as `0x${string}`,
                  BigInt("10000000000000000000"),
                ],
              });
              try {
                await kintoSDK.sendTransaction([
                  {
                    to: kintoInfo.tokens.link as `0x${string}`,
                    value: BigInt("0"),
                    data: mintData,
                  },
                ]);

                const unwatch = publicClient.watchContractEvent({
                  address: kintoInfo.tokens.link as `0x${string}`,
                  abi: tokenAbi,
                  eventName: "Transfer",
                  args: { to: address },
                  onLogs: (logs: any) => {
                    console.log(logs);
                    setMintTx(logs.transactionHash);
                    unwatch();
                  },
                });
              } catch (e) {
                toast({
                  title: "Drip Tokens Unsuccesful",
                  description: "Transaction Failed or Rejected",
                });
                setMintTx("");
              }
            }}
            disabled={mintTx == "-1"}
          >
            <Image
              src={"/coins/link.png"}
              width={20}
              height={20}
              alt="token"
              className="mx-2"
            />
            10 LINK
          </Button>
          <Button
            variant={"outline"}
            disabled={mintTx == "-1"}
            onClick={async () => {
              setMintTx("-1");
              const mintData = encodeFunctionData({
                abi: tokenAbi,
                args: [
                  address as `0x${string}`,
                  BigInt("10000000000000000000"),
                ],
              });
              try {
                await kintoSDK.sendTransaction([
                  {
                    to: kintoInfo.tokens.weth as `0x${string}`,
                    value: BigInt("0"),
                    data: mintData,
                  },
                ]);

                const unwatch = publicClient.watchContractEvent({
                  address: kintoInfo.tokens.weth as `0x${string}`,
                  abi: tokenAbi,
                  eventName: "Transfer",
                  args: { to: address },
                  onLogs: (logs: any) => {
                    console.log(logs);
                    setMintTx(logs.transactionHash);
                    unwatch();
                  },
                });
              } catch (e) {
                toast({
                  title: "Drip Tokens Unsuccesful",
                  description: "Transaction Failed or Rejected",
                });
                setMintTx("");
              }
            }}
          >
            <Image
              src={"/coins/weth.png"}
              width={20}
              height={20}
              alt="token"
              className="mx-2"
            />
            10 WETH
          </Button>
          <Button
            variant={"outline"}
            disabled={mintTx == "-1"}
            onClick={async () => {
              setMintTx("-1");
              const mintData = encodeFunctionData({
                abi: tokenAbi,
                args: [
                  address as `0x${string}`,
                  BigInt("10000000000000000000"),
                ],
              });
              try {
                await kintoSDK.sendTransaction([
                  {
                    to: kintoInfo.tokens.usdt as `0x${string}`,
                    value: BigInt("0"),
                    data: mintData,
                  },
                ]);

                const unwatch = publicClient.watchContractEvent({
                  address: kintoInfo.tokens.usdt as `0x${string}`,
                  abi: tokenAbi,
                  eventName: "Transfer",
                  args: { to: address },
                  onLogs: (logs: any) => {
                    console.log(logs);
                    setMintTx(logs.transactionHash);
                    unwatch();
                  },
                });
              } catch (e) {
                toast({
                  title: "Drip Tokens Unsuccesful",
                  description: "Transaction Failed or Rejected",
                });
                setMintTx("");
              }
            }}
          >
            <Image
              src={"/coins/usdt.png"}
              width={20}
              height={20}
              alt="token"
              className="mx-2"
            />
            10 USDT
          </Button>
          <Button
            variant={"outline"}
            disabled={mintTx == "-1"}
            onClick={async () => {
              setMintTx("-1");
              const mintData = encodeFunctionData({
                abi: tokenAbi,
                args: [address as `0x${string}`, BigInt("10000000")],
              });
              try {
                await kintoSDK.sendTransaction([
                  {
                    to: kintoInfo.tokens.usdc as `0x${string}`,
                    value: BigInt("0"),
                    data: mintData,
                  },
                ]);

                const unwatch = publicClient.watchContractEvent({
                  address: kintoInfo.tokens.usdc as `0x${string}`,
                  abi: tokenAbi,
                  eventName: "Transfer",
                  args: { to: address },
                  onLogs: (logs: any) => {
                    console.log(logs);
                    setMintTx(logs.transactionHash);
                    unwatch();
                  },
                });
              } catch (e) {
                toast({
                  title: "Drip Tokens Unsuccesful",
                  description: "Transaction Failed or Rejected",
                });
                setMintTx("");
              }
            }}
          >
            <Image
              src={"/coins/usdc.png"}
              width={20}
              height={20}
              alt="token"
              className="mx-2 rounded-full"
            />
            10 USDC
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
