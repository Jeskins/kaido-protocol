import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supportedcoins } from "@/lib/constants";
import { useEffect } from "react";
import { ScrollArea, ScrollBar } from "../scroll-area";
import { roundUpToFiveDecimals } from "@/lib/utils";

export function TokenBalance({
  balance,
  usdbalance,
}: {
  balance: Record<string, string>;
  usdbalance: Record<string, string>;
}) {
  useEffect(() => {
    console.log("TOKEN ABALNCE LOGOGG");
    console.log(balance);
    console.log(usdbalance);
  }, []);
  return (
    <ScrollArea className="h-[15rem] mx-0 px-0 w-full">
      {Object.entries(usdbalance)
        .sort(
          ([, valueA], [, valueB]) => parseFloat(valueB) - parseFloat(valueA)
        )
        .map(([key, value]) => (
          <div key={key} className="flex  items-center py-3 px-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={supportedcoins[key].image} alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>

            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {supportedcoins[key].name}
              </p>
              <p className="text-sm text-muted-foreground">
                {supportedcoins[key].symbol}
              </p>
            </div>
            <div className="ml-auto space-y-1 text-right">
              <p className="text-sm font-medium leading-none">{balance[key]}</p>
              <p className="text-sm text-muted-foreground">
                $ {roundUpToFiveDecimals(value)}
              </p>
            </div>
          </div>
        ))}
    </ScrollArea>
  );
}
