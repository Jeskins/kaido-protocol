"use client";
import Order from "@/components/sections/pool/order";
import Swap from "@/components/sections/pool/swap";
import Transaction from "@/components/sections/pool/transaction";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import ConnectButton from "@/components/ui/custom/connect-button";
import {
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
} from "@/components/ui/menubar";
import { supportedcoins } from "@/lib/constants";

import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { erc20Abi, formatEther } from "viem";
import { roundUpToFiveDecimals } from "@/lib/utils";
import { useEnvironmentContext } from "@/components/sections/context";
import { arbitrumSepolia } from "viem/chains";
interface ClassifyResponse {
  response: string;
  action: string;
  params: string;
}

export default function PoolPage() {
  const { address, balance } = useEnvironmentContext();
  const [selectedAction, setSelectedAction] = useState(false);
  const [fromAmount, setFromAmount] = useState("0");
  const [fromToken, setFromToken] = useState("usdc");
  const [toLoading, setToLoading] = useState(false);
  const [toToken, setToToken] = useState("weth");
  const [toAmount, setToAmount] = useState("0");
  const [conversionValue, setConversionValue] = useState("0");
  const [fromCoversionValue, setFromConversionValue] = useState("0");
  const [toCoversionValue, setToConversionValue] = useState("0");
  const [sellingPriceLoading, setSellingPriceLoading] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);
  const [slippage, setSlippage] = useState("0.1");
  const [sellingPrice, setSellingPrice] = useState("0");

  const [chainChevron, setChainChevron] = useState(true);
  const { action, actionParams } = useEnvironmentContext();
  const [aiTriggered, setAiTriggered] = useState(false);

  if (balance == null) return <div></div>;

  useEffect(() => {
    (async function () {
      setToLoading(true);
      setSellingPriceLoading(true);
      const response = await axios.get(
        `/api/coinmarketcap/convert?from=${fromToken}&to=${toToken}`
      );

      console.log(response.data);
      setFromConversionValue(response.data.amount.from);
      setToConversionValue(response.data.amount.to);

      if (selectedAction) {
        const cValue = response.data.amount.from / response.data.amount.to;
        setSellingPrice(response.data.amount.from);
        setConversionValue(cValue.toString());
        const f = fromAmount == "" ? "0" : fromAmount;
        setToAmount((parseFloat(f) * cValue).toString());
      } else {
        const cValue = response.data.amount.from / response.data.amount.to;
        console.log(cValue);
        const f = fromAmount == "" ? "0" : fromAmount;
        const s = slippage == "" ? "0" : slippage;
        const cValueWithSlippage = cValue * (1 - parseFloat(s) / 100);

        setConversionValue(cValue.toString());
        setToAmount((parseFloat(f) * cValueWithSlippage).toString());
      }
      setSellingPriceLoading(false);
      setToLoading(false);
    })();
  }, [fromToken, toToken, aiTriggered]);

  useEffect(() => {
    if (selectedAction) {
      if (sellingPrice == "0") setSellingPrice(fromCoversionValue);
      const f = fromAmount == "" ? "0" : fromAmount;
      const s = sellingPrice == "" ? "0" : sellingPrice;
      const cValue = parseFloat(s) / parseFloat(toCoversionValue);
      setConversionValue(cValue.toString());
      setToAmount((parseFloat(f) * cValue).toString());
    } else {
      console.log(fromAmount);
      console.log(conversionValue);
      console.log(slippage);
      const f = fromAmount == "" ? "0" : fromAmount;
      const s = slippage == "" ? "0" : slippage;
      setToAmount(
        (
          parseFloat(f) *
          parseFloat(conversionValue) *
          (1 - parseFloat(s) / 100)
        ).toString()
      );
    }
  }, [fromAmount, slippage, sellingPrice]);

  useEffect(() => {
    if (selectedAction) {
      const f = fromAmount == "" ? "0" : fromAmount;
      const s = sellingPrice == "" ? "0" : sellingPrice;
      const cValue = parseFloat(s) / parseFloat(toCoversionValue);
      setConversionValue(cValue.toString());
      setToAmount((parseFloat(f) * cValue).toString());
    } else {
      const cValue =
        parseFloat(fromCoversionValue) / parseFloat(toCoversionValue);
      console.log(cValue);
      const f = fromAmount == "" ? "0" : fromAmount;
      const s = slippage == "" ? "0" : slippage;
      const cValueWithSlippage = cValue * (1 - parseFloat(s) / 100);

      setConversionValue(cValue.toString());
      setToAmount((parseFloat(f) * cValueWithSlippage).toString());
    }
  }, [selectedAction]);

  useEffect(() => {
    if (action == "swap" && actionParams.length > 0) {
      const p = actionParams.split("_");

      setFromToken(p[1].toLowerCase());
      setToToken(p[2].toLowerCase());
      setSlippage(p[3]);
      setFromAmount(p[4]);
      const c = parseInt(p[0]);

      setAiTriggered(!aiTriggered);
    }
  }, [actionParams]);

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="border w-[500px] pt-2">
        <CardTitle>
          <div className="flex justify-between items-center px-3 py-1">
            <div className="flex ">
              <Button
                variant={"ghost"}
                className={`hover:bg-transparent  ${
                  !selectedAction
                    ? "text-primary"
                    : "text-muted-foreground font-semibold"
                }`}
                onClick={async () => {
                  setSelectedAction(false);
                }}
              >
                Swap
              </Button>
              <Button
                variant={"ghost"}
                className={`hover:bg-transparent  ${
                  selectedAction
                    ? "text-primary"
                    : "text-muted-foreground font-semibold"
                }`}
                onClick={() => setSelectedAction(true)}
              >
                Limit
              </Button>
            </div>

            <p>Kinto Mainnet</p>
          </div>
        </CardTitle>
        {selectedAction ? (
          <Order
            {...{
              fromAmount,
              setFromAmount,
              fromToken,
              setFromToken,
              toToken,
              setToToken,
              toAmount,
              sellingPrice,
              setSellingPrice,
              sellingPriceLoading,
              triggerAction: () => {
                setOpenTransaction(true);
              },
              isTestnet: false,
            }}
          />
        ) : (
          <Swap
            {...{
              fromAmount,
              setFromAmount,
              fromToken,
              setFromToken,
              toToken,
              setToToken,
              toAmount,
              setSlippage,
              slippage,
              fromBalance: balance[arbitrumSepolia.id][fromToken],
              toLoading,
              triggerAction: () => {
                setOpenTransaction(true);
              },
              openTransaction,
              isTestnet: false,
            }}
          />
        )}
      </Card>
      <Transaction
        open={openTransaction}
        setOpen={setOpenTransaction}
        action={"swap"}
        fromAmount={fromAmount}
        fromToken={fromToken}
        toToken={toToken}
        toAmount={toAmount}
      />
    </div>
  );
}
