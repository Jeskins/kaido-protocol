import Image from "next/image";
import ConnectButton from "../ui/connect-button";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { motion } from "framer-motion";

export default function DefaultLanding() {
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
          <ConnectButton />
        </div>
      </motion.h1>
    </HeroHighlight>
  );
  // return (
  //   <div className="flex-1 flex flex-col justify-center items-center">
  //     <Image
  //       src={"/logotext.jpeg"}
  //       height={100}
  //       width={200}
  //       alt="Logo"
  //       className="mb-5"
  //     />
  //     <p className="pb-6 font-semibold text-sm">
  //       Beginner friendly UniswapV3 on  powered by AI
  //     </p>

  //     {/* <Image
  //       src={"/hero.png"}
  //       height={200}
  //       width={600}
  //       alt="Avatar"
  //       className="rounded-md"
  //     /> */}
  //     <div className="py-4 flex">
  //       <ConnectButton />
  //     </div>
  //   </div>
  // );
}
