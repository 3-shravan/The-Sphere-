import { useCreatePost } from "@/features/posts/services";
import { Send } from "lucide-react";
import { useState } from "react";
const Thoughts = () => {
  const [thoughts, setThoughts] = useState("");
  const { mutateAsync, isPending } = useCreatePost();
  const submitHandler = () => {
    mutateAsync({ thoughts });
    setThoughts("");
  };
  return (
    <div className="w-full mt-4 bg-card p-4 font-Poppins border ">
      <textarea
        className="w-full rounded-xl p-4 text-xs focus-visible:ring-1 outline-hidden focus-visible:ring-muted shadow"
        placeholder="have any thoughts... ?"
        onChange={(e) => setThoughts(e.target.value)}
        value={thoughts}
      />

      <button
        className="w-full rounded-lg text-xs hover:scale-[1.01] cursor-pointer transition duration-300 mt-2 py-2 flex items-center justify-center font-Futura text-rose-600 border-1 border-border bg-rose-300"
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
