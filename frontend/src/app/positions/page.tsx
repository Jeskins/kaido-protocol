import dynamic from "next/dynamic";
const PositionPage = dynamic(
  () => import("@/components/sections/position/page"),
  {
    ssr: false,
  }
);
export const metadata = {
  title: "Positions | Kaido Protocol",
  description: "Positions page",
};

export default function Page() {
  return <PositionPage />;
}
