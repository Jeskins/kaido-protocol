import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { RecentActions } from "../../ui/custom/recent-actions";
import { Action } from "@/lib/type";

export default function RecentActionsCard({ actions }: { actions: Action[] }) {
  const [checked, SetChecked] = useState(false);
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          Monitor your recent transactions with regard to your positions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RecentActions actions={actions} />
      </CardContent>
    </Card>
  );
}
