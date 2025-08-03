import { useCreatePost } from "@/features/posts/services";
import { infoToast, validateThoughtsForm } from "@/utils";
import { Send } from "lucide-react";
import { useState } from "react";
const Thoughts = () => {
  const [thoughts, setThoughts] = useState("");
  const { mutateAsync, isPending } = useCreatePost();

  const submitHandler = () => {
    const error = validateThoughtsForm(thoughts);
    if (error) {
      infoToast(error);
      return;
    }
    mutateAsync({ thoughts });
    setThoughts("");
  };

  return (
    <div className="w-full bg-card p-4 font-Poppins rounded-2xl">
      <textarea
        className="resize-none h-18 w-full rounded-lg p-4 text-xs bg-background focus-visible:ring-1 outline-hidden focus-visible:ring-emerald-400 placeholder:text-muted-foreground placeholder:font-mono font-bold "
        placeholder="have any thoughts..🚀"
        onChange={(e) => setThoughts(e.target.value)}
        value={thoughts}
      />

      <button
        className="w-full rounded-lg text-xs hover:scale-[1.01] cursor-pointer transition duration-300 mt-2 py-2 flex items-center justify-center font-Futura text-black border bg-emerald-500"
        type="submit"
        onClick={submitHandler}
        disabled={isPending}
      >
        {isPending ? "Posting..." : "Post"}
        <Send className="inline w-3 mx-1 h-3" />
      </button>
    </div>
  );
};

export default Thoughts;
