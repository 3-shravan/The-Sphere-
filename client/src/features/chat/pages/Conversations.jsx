import { useErrorMessage } from "@/hooks";
import { useSendMessage } from "../api/useMutations";
import { Button } from "@/components/ui/button";
import { useConnections, useMessages } from "../api/useQueries";

export default function Chat() {
  const { mutate, isPending } = useSendMessage("68c715a37e38b12dcdbf1ef8");

  const { data: messages } = useMessages();
  console.log(messages);

  const { data, error } = useConnections();
  console.log("connections", data, error);

  const handleSend = () =>
    mutate({ receiverId: "68c715a37e38b12dcdbf1ef8", message: "Hello" });

  return (
    <div>
      <Button onClick={handleSend}>Send Message</Button>
      {isPending && <p>Sending...</p>}
      {error && <p className="text-red-400">{useErrorMessage(error)}</p>}
    </div>
  );
}
