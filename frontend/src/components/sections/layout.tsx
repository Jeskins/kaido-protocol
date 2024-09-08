"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import ConnectButton from "@/components/ui/custom/connect-button";
import { useState } from "react";
import { MainNav } from "./navbar";

import { Button } from "../ui/button";
import { useEnvironmentContext } from "./context";
import { BackgroundBeams } from "../ui/custom-ui/background-beams";

import DefaultLanding from "./default-landing";
import { Faucet } from "../ui/faucet";

const AIWrapper = dynamic(() => import("@/components/sections/ai-wrapper"), {
  ssr: false,
});

interface Convo {
  id: string;
  isAI: boolean;
  message: string;
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { address, setOpenAi } = useEnvironmentContext();
  const [convos, setConvos] = useState<Convo[]>([]);

  return (
    <>
      {address == "" ? (
        <DefaultLanding />
      ) : (
        <div className="h-screen flex z-10">
          <BackgroundBeams />
          <div className="z-10 px-8 w-full flex flex-col justify-center items-center">
            <div className="flex w-full justify-between">
              <div className="flex justify-between py-6 w-full">
                <div className="flex items-center">
                  <Image src={"/logo.png"} height={50} width={50} alt="Logo" />
                  <MainNav
                    className="mx-6"
                    setOpenAi={async (path: string) => {
                      // setOpenAi(true);
                      // try {
                      //   const response = await axios.post("/api/classify", {
                      //     message: path,
                      //   });
                      //   console.log(response.data);
                      //   if (response.data.success == false)
                      //     throw Error("Error in response");
                      //   console.log(typeof response.data.response.response);
                      //   setConvos([
                      //     ...convos,
                      //     {
                      //       id: (convos.length + 1).toString(),
                      //       isAI: true,
                      //       message: response.data.response.response,
                      //     },
                      //   ]);
                      //   console.log({
                      //     id: (convos.length + 1).toString(),
                      //     isAI: true,
                      //     message: response.data.response.response,
                      //   });
                      // } catch (e) {
                      //   console.log(e);
                      //   setConvos([
                      //     ...convos,
                      //     {
                      //       id: (convos.length + 1).toString(),
                      //       isAI: true,
                      //       message: "Please refresh the page and try again.",
                      //     },
                      //   ]);
                      // }
                    }}
                  />
                </div>
                <div className="flex">
                  <ConnectButton />
                </div>
              </div>
            </div>

            <div className="flex flex-1 space-x-12 w-full">
              <div className="flex-1 flex flex-col w-full h-full">
                {children}
              </div>
            </div>
          </div>

          <Button
            className="z-10 absolute  bottom-10 right-10 border-2 rounded-full border-muted-foreground bg-transparent border-none hover:border-none hover:bg-transparent"
            onClick={() => {
              setOpenAi(true);
            }}
          >
            <Image
              src={"/ai.gif"}
              height={80}
              width={80}
              alt="Logo"
              className="bg-transparent rounded-full border-2 border-secondary hover:bg-secondary"
            />
          </Button>
          <AIWrapper />
          <Faucet />
        </div>
      )}
    </>
  );
}
