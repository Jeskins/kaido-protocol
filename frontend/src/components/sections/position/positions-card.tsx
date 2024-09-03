import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Positions } from "@/components/ui/positions";
import PositionsHeader from "@/components/ui/positions-header";
import { Position } from "@/lib/type";

export default function PositionsCard({
  positions,
}: {
  positions: Position[];
}) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>
          <PositionsHeader />
        </CardTitle>
        <CardDescription>
          Monitor your positions created in UniswapV3.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Positions positions={positions} />
      </CardContent>
    </Card>
  );
}
