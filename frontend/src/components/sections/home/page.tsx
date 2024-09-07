"use client";

import TokenBalanceCard from "@/components/sections/home/token-balance-card";
import Image from "next/image";
import { roundUpToFiveDecimals } from "@/lib/utils";
import { useEnvironmentContext } from "@/components/sections/context";
import "@/styles/spinner.css";
import { arbitrumSepolia } from "viem/chains";

export default function HomePage() {
  const { address } = useEnvironmentContext();
  const { totalBalance, balanceObject, balanceObjectInUSD } =
    useEnvironmentContext();

  if (totalBalance == null)
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="flex space-x-4 items-center">
          <div className="black-spinner"></div>
          <p className="font-semibold text-md">
            {balanceObject != null ? "Finishing up" : "Fetching Balances"}
          </p>
        </div>
      </div>
    );
  return (
    <div className="flex-1">
      <div className="flex flex-col items-center py-6">
        <div className="flex">
          <div className="flex flex-col items-center">
            <Image
              src={"/avatar.jpeg"}
              height={50}
              width={60}
              alt="Avatar"
              className="rounded-full"
            />
            <p className="text-3xl mt-4 mb-2 font-bold">Your Portfolio</p>
            <div className="flex space-x-8 text-center">
              <div>
                <p className="text-sm text-muted-foreground ">Net Worth</p>
                <p className="text-md font-semibold">
                  <span className="text-muted-foreground mx-1">$</span>
                  {roundUpToFiveDecimals(totalBalance.toString())}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[80%] mx-auto">
        <TokenBalanceCard
          balances={{
            eth: roundUpToFiveDecimals(
              balanceObject[arbitrumSepolia.id].native
            ),
            usdc: roundUpToFiveDecimals(balanceObject[arbitrumSepolia.id].usdc),
            usdt: roundUpToFiveDecimals(balanceObject[arbitrumSepolia.id].usdt),
            link: roundUpToFiveDecimals(balanceObject[arbitrumSepolia.id].link),
            dai: roundUpToFiveDecimals(balanceObject[arbitrumSepolia.id].dai),
            weth: roundUpToFiveDecimals(balanceObject[arbitrumSepolia.id].weth),
          }}
          usdBalances={{
            eth: roundUpToFiveDecimals(
              balanceObjectInUSD[arbitrumSepolia.id].native
            ),
            usdc: roundUpToFiveDecimals(
              balanceObjectInUSD[arbitrumSepolia.id].usdc
            ),
            usdt: roundUpToFiveDecimals(
              balanceObjectInUSD[arbitrumSepolia.id].usdt
            ),
            link: roundUpToFiveDecimals(
              balanceObjectInUSD[arbitrumSepolia.id].link
            ),
            dai: roundUpToFiveDecimals(
              balanceObjectInUSD[arbitrumSepolia.id].dai
            ),
            weth: roundUpToFiveDecimals(
              balanceObjectInUSD[arbitrumSepolia.id].weth
            ),
          }}
        />
      </div>
    </div>
  );
}
