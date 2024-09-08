import dynamic from "next/dynamic";
const HomePage = dynamic(() => import("@/components/sections/home/page"), {
  ssr: false,
});

export const metadata = {
  title: "Home | Kaido Protocol",
  description: "Home page",
};

export default function Page() {
  return <HomePage />;
}
