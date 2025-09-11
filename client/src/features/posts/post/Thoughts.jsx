import { infoToast, validateThoughtsForm } from "@/utils";
import { useState } from "react";
import { useCreateThought } from "../services";
import { BiSend } from "react-icons/bi";
import { Button } from "@/components/ui/button";
const Thoughts = () => {
  const [thoughts, setThoughts] = useState("");
  const { mutateAsync, isPending } = useCreateThought();

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

      <Button
        className="w-full rounded-lg text-xs gap-1 hover:scale-[1.01] cursor-pointer transition duration-300 mt-2 py-2 flex items-center justify-center font-Futura text-black border bg-emerald-500"
        type="submit"
        variant="ghost"
        onClick={submitHandler}
        disabled={isPending}
      >
        {isPending ? "Posting..." : "Post"}
        <BiSend className="inline w-4 h-4" />
      </Button>
    </div>
  );
};

export default Thoughts;
