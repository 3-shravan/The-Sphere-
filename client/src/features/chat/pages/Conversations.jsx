import { useSendMessage } from "../api/useMutations";
import { Button } from "@/components/ui/button";
import { useConnections, useMessages } from "../api/useQueries";
import { errorMessage } from "@/lib/utils/api-responses";

export default function Chat() {
  const { mutateAsync, isPending } = useSendMessage("68c715a37e38b12dcdbf1ef8");

  const { data: messages } = useMessages();
  console.log(messages);

  const { data, error } = useConnections();
  console.log("connections >", data, "Error >", error);

  const handleSend = async () => {
    const response = await mutateAsync({
      receiverId: "68c715a37e38b12dcdbf1ef8",
      message: "",
    });
    console.log(response);
  };
  return (
    <div>
      <Button onClick={handleSend}>Send Message</Button>
      {isPending && <p>Sending...</p>}
      {error && <p className="text-red-400">{errorMessage(error)}</p>}
    </div>
  );
}
