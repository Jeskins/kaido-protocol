import { defineChain } from "viem";
import { arbitrumSepolia } from "viem/chains";
import { http, createConfig } from "wagmi";

export const config = createConfig({
  chains: [arbitrumSepolia],
  transports: {
    [arbitrumSepolia.id]: http(),
  },
});
