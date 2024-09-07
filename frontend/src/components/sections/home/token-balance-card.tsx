import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TokenBalance } from "@/components/ui/custom/token-balance";

export default function TokenBalanceCard({
  balance,
  usdbalance,
}: {
  balance: Record<string, string>;
  usdbalance: Record<string, string>;
}) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Assets Owned</CardTitle>
        <CardDescription>Track your crosschain portfolio.</CardDescription>
      </CardHeader>
      <CardContent>
        <TokenBalance balance={balance} usdbalance={usdbalance} />
      </CardContent>
    </Card>
  );
}
