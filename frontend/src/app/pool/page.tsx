import dynamic from "next/dynamic";
const PoolPage = dynamic(() => import("@/components/sections/pool/page"), {
  ssr: false,
});
export const metadata = {
  title: "Swaps | Kaido Protocol",
  description: "Swaps page",
};

export default function Page() {
  return <PoolPage />;
}
