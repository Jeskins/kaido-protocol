"use client";
import { useEnvironmentContext } from "@/components/sections/context";
import ApyTvl from "@/components/sections/stake/apy-tvl";
import SwitchChainHeader from "@/components/sections/stake/header";
import Receive from "@/components/sections/stake/receive";
import Stake from "@/components/sections/stake/stake";
import StakeTransaction from "@/components/sections/stake/transaction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ConnectButton from "@/components/ui/custom/connect-button";
import { supportedchains } from "@/lib/constants";
import { roundUpToFiveDecimals } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";

export default function StakePage() {
  const [stakeAmount, setStakeAmount] = useState("0");
  const [stoneAmount, setStoneAmount] = useState("0");
  const { address, balance } = useEnvironmentContext();
  const [open, setOpen] = useState(false);
  const { action, actionParams, balanceObject } = useEnvironmentContext();

  if (balanceObject == null) return <div></div>;

  // TODO
  // const { data: sharePrice } = useReadContract({
  //   config,
  //   chainId: chainId as any,
  //   functionName: "currentSharePrice",
  //   address: supportedchains[chainId as any].stake,
  //   args: [],
  //   abi: [
  //     {
  //       inputs: [],
  //       name: "currentSharePrice",
  //       outputs: [
  //         {
  //           internalType: "uint256",
  //           name: "price",
  //           type: "uint256",
  //         },
  //       ],
  //       stateMutability: "nonpayable",
  //       type: "function",
  //     },
  //   ],
  // });

  // TODO
  // useEffect(() => {
  //   setStoneAmount(
  //     roundUpToFiveDecimals(
  //       (
  //         parseFloat(stakeAmount) /
  //         parseFloat(formatEther(sharePrice || BigInt("0")))
  //       ).toString()
  //     )
  //   );
  // }, [sharePrice, stakeAmount]);

  useEffect(() => {
    if (action == "stake" && actionParams.length > 0) {
      const p = actionParams.split("_");
      setStakeAmount(p[1]);
      const c = parseInt(p[0]);
    }
  }, [action, actionParams]);
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="border-none w-[500px] ">
        <SwitchChainHeader />
        <CardContent>
          <ApyTvl />
          <Stake
            stakeAmount={stakeAmount}
            setStakeAmount={setStakeAmount}
            balance={balance}
          />

          <Receive
            stonePrice={formatEther(BigInt("1"))}
            stoneAmount={stoneAmount}
          />
          <div className="px-4">
            <Button
              className="w-full mt-3 font-bold text-sm"
              disabled={
                stakeAmount == "" ||
                parseFloat(stakeAmount) == 0.0 ||
                parseFloat(stakeAmount) >= parseFloat(balance)
              }
              onClick={() => {
                setOpen(true);
              }}
            >
              {parseFloat(stakeAmount) >= parseFloat(balance)
                ? "Insufficient Balance"
                : parseFloat(stakeAmount) == 0.0
                ? "Enter Amount to Stake"
                : "Stake"}
            </Button>
          </div>
          <div className="flex justify-end pt-2 text-muted-foreground space-x-1 px-4">
            <p className="font-semibold text-xs">Powered By </p>
            <Image
              src="/coins/stakestone.jpg"
              width={18}
              height={20}
              alt=""
              className="rounded-full bg-white"
            />
            <p className="font-semibold text-xs">StakeStone </p>
          </div>
        </CardContent>
      </Card>
      <StakeTransaction
        stakeAmount={stakeAmount}
        stoneAmount={stoneAmount}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
