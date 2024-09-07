import { useEnvironmentContext } from "@/components/sections/context";
import { erc20Abi, formatEther } from "viem";
import { kintoInfo } from "../constants";
import { balance } from "../type";

export default async function getAllbalance(
  publicClient: any,
  address: string,
  setTotalBalance: (totalBalance: number) => void,
  setbalance: (balance: any) => void,
  setbalanceInUSD: (balanceInUSD: any) => void
) {
  const tempbalance: any = {
    eth: "",
    link: "",
    usdc: "",
    usdt: "",
    weth: "",
  };
  const tempbalanceInUSD: any = {
    eth: "",
    link: "",
    usdc: "",
    usdt: "",
    weth: "",
  };
  let totalBalance: number = 0;
  const nativeBalance = await publicClient.getBalance({
    address: address,
  });
  tempbalance["eth"] = formatEther(nativeBalance);
  const entries = Object.entries(kintoInfo.tokens);
  for (const [key, supp] of entries) {
    const tokenBalnce = await publicClient.readContract({
      address: supp,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [address],
    });
    console.log("TOKEN BALANCE", tokenBalnce);
    tempbalance[key] = formatEther(tokenBalnce);
  }
  setbalance(tempbalance);
  const resOne = await fetch(`/api/coinmarketcap/convert?from=link&to=eth`);
  const resTwo = await fetch(`/api/coinmarketcap/convert?from=usdc&to=usdt`);
  const dataOne = await resOne.json();
  const dataTwo = await resTwo.json();
  const usdValue: any = {
    link: dataOne.amount.from,
    eth: dataOne.amount.to,
    weth: dataOne.amount.to,
    usdc: dataTwo.amount.from,
    usdt: dataTwo.amount.to,
  };
  for (const [key, value] of Object.entries(tempbalance)) {
    tempbalanceInUSD[key] = usdValue[key] * parseFloat(value as string);
    totalBalance += tempbalanceInUSD[key];
  }

  setTotalBalance(totalBalance);
  setbalanceInUSD(tempbalanceInUSD);
}
//         await updateAllbalance();
//         setbalance(tempbalance);
//         console.log("TEMP BALANCE OBJECT");
//         console.log(tempbalance);
//         console.log(typeof tempbalance[arbitrumSepolia.id].native);
//         console.log(typeof tempbalance[arbitrumSepolia.id].usdc);
//         if (tempbalance != null && convos.length == 0) {
//           console.log("BEFORE SNEDING TO AI");
//           console.log(JSON.stringify(tempbalance));
//           try {
//             setThinking(true);
//             const response = await axios.post("/api/classify", {
//               message: JSON.stringify(tempbalance),
//             });

//             console.log(response.data);
//             if (response.data.success == false)
//               throw Error("Error in response");

//             console.log(typeof response.data.response.response);
//             setConvos([
//               {
//                 id: "1",
//                 isAI: true,
//                 message: response.data.response.response,
//               },
//             ]);
//             console.log({
//               id: "1",
//               isAI: true,
//               message: response.data.response.response,
//             });
//           } catch (e) {
//             console.log(e);
//             setConvos([
//               ...convos,
//               {
//                 id: "1",
//                 isAI: true,
//                 message: "Please refresh the page and try again.",
//               },
//             ]);
//           }
//           setThinking(false);
//         }
//       })();
//     } catch (e) {
//       console.log("FETCH BALANCE ERROR");
//       console.log(e);
//     }
//   } else {
//     console.log("ALL balance FETCHED");
//     console.log(balance);
//     try {
//       (async function () {
//         const res = await fetch(
//           `/api/coinmarketcap/convert?from=link&to=eth`
//         );
//         const data = await res.json();
//         const linkUsdValue = data.amount.from;
//         const ethUsdValue = data.amount.to;

//         const nextRes = await fetch(
//           `/api/coinmarketcap/convert?from=edu&to=eth`
//         );
//         const nextData = await nextRes.json();
//         const eduUsdValue = nextData.amount.from;
//         let tempTotalValue = 0;
//         let tempbalanceInUSD: any = {};
//         for (const [chainId, balance] of Object.entries(balance)) {
//           console.log(`Network ID: ${chainId}`);
//           tempbalanceInUSD[chainId] = {};
//           for (const [token, balance] of Object.entries(balance as any)) {
//             tempbalanceInUSD[chainId][token] =
//               (balance as any) *
//               (token == "usdc" || token == "usdt" || token == "dai"
//                 ? 1
//                 : token == "link"
//                 ? linkUsdValue
//                 : chainId == arbitrumSepolia.id.toString()
//                 ? ethUsdValue
//                 : eduUsdValue);
//             tempTotalValue += tempbalanceInUSD[chainId][token];
//           }
//         }
//         console.log("TEMP BALANCE OBJECT IN USD");
//         console.log(tempbalanceInUSD);
//         setbalanceInUSD(tempbalanceInUSD);
//         setTotalBalance(tempTotalValue);
//       })();
//     } catch (e) {
//       console.log(e);
//     }
