import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { Label } from "./label";
import Link from "next/link";
import { Button, buttonVariants } from "./button";
import { Plus } from "lucide-react";
import { useEnvironmentContext } from "../sections/context";
import { useAccount, useSwitchChain } from "wagmi";
import { CreatePositionDialog } from "../sections/position/create-position-dialog";

export default function PositionsHeader() {
  const { chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [tokenA, setTokenA] = useState<string>("link");
  const [tokenB, setTokenB] = useState<string>("usdt");
  const [tokenAmountA, setTokenAmountA] = useState<string>("0");
  const [tokenAmountB, setTokenAmountB] = useState<string>("0");
  const { action, actionParams } = useEnvironmentContext();

  useEffect(() => {
    (async function () {
      if (action == "position") {
        const p = actionParams.split("_");
        console.log("INSIDE POSITION HEADER");
        console.log(actionParams);
        console.log(p);
        const c = p[0];
        const tA = p[1].toLocaleLowerCase();
        const tB = p[2].toLocaleLowerCase();
        if (c != chainId?.toString()) {
          await switchChainAsync({
            chainId: parseInt(c),
          });
          setTokenA(tA);
          setTokenB(tB);
          setOpen(true);
        }
      }
    })();
  }, [actionParams]);
  return (
    <div className="flex justify-between items-center">
      <p>UniswapV3 Positions</p>
      <div className="hidden md:flex items-center space-x-6">
        <div className="hidden lg:flex items-center space-x-2">
          <Switch
            checked={checked}
            onCheckedChange={() => {
              setChecked(!checked);
            }}
          />
          <Label htmlFor="airplane-mode" className="text-sm font-semibold">
            View Closed
          </Label>
        </div>

        <Button
          variant={"secondary"}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          <p className=" font-bold">New Position</p>
        </Button>
      </div>
      <CreatePositionDialog
        open={open}
        setOpen={setOpen}
        tokenA={tokenA}
        tokenB={tokenB}
        setTokenA={setTokenA}
        setTokenB={setTokenB}
        tokenAmountA={tokenAmountA}
        setTokenAmountA={setTokenAmountA}
        tokenAmountB={tokenAmountB}
        setTokenAmountB={setTokenAmountB}
      />
    </div>
  );
}
