import Image from "next/image";
import { Button } from "../button";

export default function KintoButton() {
  return (
    <Button variant={"ghost"} className="space-x-2 font-semibold mx-2">
      <Image src={"/coins/kinto.png"} width={20} height={20} alt="Kinto" />
      <p>Kinto Mainnet</p>
    </Button>
  );
}
