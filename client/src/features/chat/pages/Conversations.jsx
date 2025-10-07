import {
  useDeleteChat,
  useDeleteMessage,
  useSendMessage,
} from "../api/useMutations";
import { Button } from "@/components/ui/button";
import { useConnections, useMessages } from "../api/useQueries";

export default function Chat() {
  const { mutateAsync, isPending } = useSendMessage("68e14efb456d6a9948842147");

  const { data: messages } = useMessages("68e14efb456d6a9948842147");

  const { data: connections } = useConnections();
  console.log(messages);

  const handleSend = async () => {
    const response = await mutateAsync({
      receiverId: "68c715a37e38b12dcdbf1ef8",
      message: "BBU ❤",
    });
    console.log(response);
  };
  const { mutateAsync: deleteMessage } = useDeleteMessage(
    "68e14efb456d6a9948842147"
  );
  // const { mutateAsync: deleteChat } = useDeleteChat();
  return (
    <div className="p-8 pb-20">
      <Button onClick={handleSend}>Send Message</Button>
      {isPending && <p>Sending...</p>}
      {messages?.messages?.map((msg) => (
        <div key={msg._id}>
          <p>{msg.content}</p>
          <Button
            variant="destructive"
            onClick={async () => await deleteMessage({ messageId: msg._id })}
            disabled={isPending}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
