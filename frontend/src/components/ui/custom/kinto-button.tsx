import Image from "next/image";
import { Button } from "../button";

export default function KintoButton() {
  return (
    <Button variant={"ghost"} className="space-x-1 font-semibold mx-2">
      <Image src={"/coins/kinto.png"} width={25} height={25} alt="Kinto" />
      <p>Kinto Mainnet</p>
    </Button>
  );
}
