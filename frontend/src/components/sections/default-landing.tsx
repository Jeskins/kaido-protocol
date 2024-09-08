import Image from "next/image";
import { HeroHighlight, Highlight } from "../ui/custom-ui/hero-highlight";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useEnvironmentContext } from "./context";
import "@/styles/spinner.css";
import { kintoLogin } from "@/lib/helpers/kinto";
export default function DefaultLanding() {
  const { kintoSDK } = useEnvironmentContext();
  return (
    <HeroHighlight className="select-none">
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        <Image
          src={"/logotext.png"}
          height={100}
          width={450}
          alt="Logo"
          className="rounded-full mx-auto mb-8"
        />
        <p className="text-5xl">DeFi, for the new degens </p>
        <p className="text-xl mt-2">
          Built on{" "}
          <Highlight className="text-black dark:text-white ">
            &nbsp;KINTO&nbsp;
          </Highlight>
          &nbsp;| Forked from{" "}
          <Highlight className="text-black dark:text-white from-pink-300 to-purple-700 dark:from-pink-500 dark:to-pink-600">
            &nbsp;UniswapV3&nbsp;
          </Highlight>
          &nbsp;| Powered by{" "}
          <Highlight className="text-black dark:text-white from-blue-300 to-blue-700 dark:from-blue-600 dark:to-blue-700">
            &nbsp;Galadriel AI&nbsp;
          </Highlight>{" "}
        </p>
        <p className="text-2xl"></p>
        <div>
          <Button
            onClick={async () => {
              await kintoLogin(kintoSDK);
            }}
          >
            {"Connect Your Kinto Wallet"}
          </Button>
        </div>
      </motion.h1>
    </HeroHighlight>
  );
}
