import { arbitrumSepolia } from "viem/chains";
import { Button } from "../button";
import { Icons } from "../icons";
import {
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
} from "@/components/ui/menubar";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useEnvironmentContext } from "../../sections/context";
import KintoButton from "./kinto-button";

export default function ConnectButton() {
  const { address } = useEnvironmentContext();
  const [chainChevron, setChainChevron] = useState(false);
  const pathname = usePathname();

  return address != "" ? (
    <>
      <KintoButton />

      <Button
        className="my-auto flex space-x-2 rounded-sm"
        onClick={() => {
          // disconnect();
        }}
      >
        <Image
          src={`/avatar.jpeg`}
          width={25}
          height={25}
          alt="Avatar"
          className="rounded-full "
        />
        <p>{address?.slice(0, 6) + "..." + address?.slice(-6)}</p>
      </Button>
    </>
  ) : (
    <Button
      className="my-auto"
      onClick={() => {
        // console.log("connect");
        // connect({
        //   chainId: arbitrumSepolia.id,
        //   connector: injected(),
        // });
      }}
    >
      Connect Wallet
    </Button>
  );
}
