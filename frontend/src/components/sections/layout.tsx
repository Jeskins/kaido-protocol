import Image from "next/image";

import ConnectButton from "@/components/ui/custom/connect-button";
import { useEffect, useState } from "react";
import { MainNav } from "./navbar";
import AIComponent from "./ai";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ArrowLeftCircleIcon,
  ArrowRight,
  ArrowRightCircleIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { useEnvironmentContext } from "./context";
import axios from "axios";
import { supportedcoins } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { arbitrumSepolia } from "viem/chains";
import { BackgroundBeams } from "../ui/custom-ui/background-beams";
import {
  HeroHighlight,
  Highlight,
} from "@/components/ui/custom-ui/hero-highlight";
import { motion } from "framer-motion";
import DefaultLanding from "./default-landing";
interface Convo {
  id: string;
  isAI: boolean;
  message: string;
}

interface ClassifyResponse {
  response: string;
  action: string;
  params: string;
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { address } = useEnvironmentContext();
  const pathname = usePathname();
  const router = useRouter();
  const [classifyResponse, setClassifyResponse] = useState<ClassifyResponse>({
    response: "",
    action: "",
    params: "",
  });
  const {
    balance,
    balanceInUSD,
    setActionParams,
    action,
    setAction,
    actionParams,
  } = useEnvironmentContext();
  const { openAi, setOpenAi } = useEnvironmentContext();
  const [thinking, setThinking] = useState(false);
  const [convos, setConvos] = useState<Convo[]>([]);

  useEffect(() => {
    if (action == "swap" && pathname != "/pool") {
      // TODO: Make AI explain the page
      router.push("/pool");
    }

    if (action == "stake" && pathname != "/stake") {
      // TODO: Make AI explain the page
      router.push("/stake");
    }
  }, [action]);

  return (
    <>
      {address == "" ? (
        <DefaultLanding />
      ) : (
        <div className="h-screen flex">
          <BackgroundBeams />
          <div className="z-10 px-8 w-full flex flex-col justify-center items-center">
            <div className="flex w-full justify-between">
              <div className="flex justify-between py-6 w-full">
                <div className="flex items-center">
                  <Image src={"/logo.png"} height={50} width={50} alt="Logo" />
                  <MainNav
                    className="mx-6"
                    setOpenAi={async (path: string) => {
                      setThinking(true);
                      setOpenAi(true);
                      try {
                        const response = await axios.post("/api/classify", {
                          message: path,
                        });

                        console.log(response.data);
                        if (response.data.success == false)
                          throw Error("Error in response");
                        console.log(typeof response.data.response.response);
                        setConvos([
                          ...convos,
                          {
                            id: (convos.length + 1).toString(),
                            isAI: true,
                            message: response.data.response.response,
                          },
                        ]);
                        console.log({
                          id: (convos.length + 1).toString(),
                          isAI: true,
                          message: response.data.response.response,
                        });
                      } catch (e) {
                        console.log(e);
                        setConvos([
                          ...convos,
                          {
                            id: (convos.length + 1).toString(),
                            isAI: true,
                            message: "Please refresh the page and try again.",
                          },
                        ]);
                      }
                      setThinking(false);
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
          <Sheet
            open={openAi}
            onOpenChange={(open) => {
              setOpenAi(open);
            }}
          >
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="relative">
                  <ArrowRight
                    className="h-10 w-10 absolute -left-9 bg-background border-[1px]  p-2 text-WHITE cursor-pointer rounded-lg"
                    onClick={() => {
                      setOpenAi(false);
                    }}
                  />
                </SheetTitle>
                <SheetDescription className="h-screen">
                  <AIComponent
                    convos={convos}
                    setConvos={setConvos}
                    setClassifyResponse={setClassifyResponse}
                    thinking={thinking}
                    setAction={setAction}
                    setActionParams={setActionParams}
                  />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </>
  );
}
