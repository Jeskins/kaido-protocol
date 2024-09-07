import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TokenBalance } from "@/components/ui/custom/token-balance";
import { Faucet } from "@/components/ui/faucet";
import { Fuel } from "lucide-react";
import { useEnvironmentContext } from "../context";

export default function TokenBalanceCard({
  balance,
  usdbalance,
}: {
  balance: Record<string, string>;
  usdbalance: Record<string, string>;
}) {
  const { setOpenFacuet } = useEnvironmentContext();
  return (
    <Card className="col-span-2">
      <CardHeader className="">
        <div className="flex justify-between">
          <div>
            <CardTitle>Assets Owned</CardTitle>
            <CardDescription>Track your crosschain portfolio.</CardDescription>
          </div>
          <Button
            className="px-5 rounded-sm"
            variant={"outline"}
            onClick={() => {
              setOpenFacuet(true);
            }}
          >
            <Fuel className="w-5 h-5 mr-2" /> Faucet
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <TokenBalance balance={balance} usdbalance={usdbalance} />
      </CardContent>
    </Card>
  );
}
