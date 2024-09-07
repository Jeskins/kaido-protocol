import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supportedchains, supportedcoins } from "@/lib/constants";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { useState } from "react";
import { arbitrumSepolia } from "viem/chains";
import { useEnvironmentContext } from "../context";
export default function ChooseToken({
  index,
  tokenAmount,
  setTokenAmount,
  setTokenAmountB,
  token,
  setToken,
  otherToken,
  txStarted,
}: {
  index: number;
  otherToken: string;
  tokenAmount: string;
  setTokenAmount: (fromAmount: string) => void;
  setTokenAmountB: (fromAmount: string) => void;
  token: string;
  setToken: (fromToken: string) => void;
  txStarted: boolean;
}) {
  const [chevron, setChevron] = useState(true);
  const { balanceObject } = useEnvironmentContext();
  return (
    <Card className="w-full pt-2  border-none ">
      <CardTitle>
        <p className="text-xs text-muted-foreground font-semibold px-2">
          Token {index == 1 ? "A" : "B"}
        </p>
      </CardTitle>
      <CardContent className="flex justify-between p-0">
        <Menubar
          onClick={() => {
            setChevron(!chevron);
          }}
          className="border-none"
        >
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => {
                setChevron(!chevron);
              }}
              className="data-[state=open]:bg-transparent focus:bg-transparent"
            >
              <div className=" flex space-x-2 items-center ">
                <Image
                  src={supportedcoins[token].image}
                  width={20}
                  height={20}
                  alt=""
                  className="rounded-full"
                />
                <p>{`${supportedcoins[token].symbol}`}</p>
                {!chevron ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </MenubarTrigger>
            <MenubarContent>
              {Object.entries(supportedcoins)
                .slice(2, 7)
                .map(([coinId, coin]) => (
                  <MenubarItem
                    disabled={coinId == otherToken || txStarted}
                    onClick={() => {
                      setToken(coinId);
                      setChevron(true);
                    }}
                  >
                    <div className="flex space-x-2">
                      <Image
                        src={coin.image}
                        width={20}
                        height={20}
                        alt=""
                        className="rounded-full"
                      />
                      <p>{coin.symbol}</p>
                    </div>
                  </MenubarItem>
                ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <Input
          disabled={txStarted}
          className="font-semibold focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 bg-transparent border-none w-[50%] text-right "
          value={tokenAmount}
          onChange={(e) => {
            const decimalRegex = /^\d+(\.\d*)?$/;
            if (decimalRegex.test(e.target.value) || e.target.value == "") {
              setTokenAmount(e.target.value);
              setTokenAmountB(e.target.value);
            }
          }}
        />
      </CardContent>

      <CardFooter className="pb-4 px-2 flex justify-between text-muted-foreground">
        <p className="text-xs ">{supportedcoins[token].name}</p>

        {/* TODO: 
        <p className="text-end text-xs font-medium">
          Balance: {balanceObject[chainId || arbitrumSepolia.id][token]}
        </p> */}
      </CardFooter>
    </Card>
  );
}
