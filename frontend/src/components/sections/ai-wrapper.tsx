import { XMTPProvider } from "@xmtp/react-sdk";
import AIComponent from "./ai";

export default function AIWrapper() {
  return (
    <XMTPProvider>
      <AIComponent />
    </XMTPProvider>
  );
}
