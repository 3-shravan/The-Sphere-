import { CirclesThreePlus, PaperPlaneRight, SmileyWink } from "phosphor-react";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks";
import { cn } from "@/lib/utils";
import { useChatComposer } from "../../hooks/useChatComposer";

export function ChatComposer() {
  const IS_MOBILE = useIsMobile();
  const { text, setText, hasText, sendMessage, handleKeyDown } =
    useChatComposer();

  return (
    <div className="sticky bottom-0 z-20 py-2 px-2 md:pb-1">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-2 rounded-3xl bg-muted/50 px-4 py-2 shadow-sm">
          <ActionButton>
            <CirclesThreePlus size={25} />
          </ActionButton>

          {!IS_MOBILE && (
            <ActionButton>
              <SmileyWink size={25} />
            </ActionButton>
          )}

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            variant="messages"
            rows={1}
          />

          <button
            onClick={sendMessage}
            disabled={!hasText}
            className={cn(
              "flex cursor-pointer items-center justify-center transition",
              hasText ? "text-teal-700" : "text-foreground"
            )}
          >
            <PaperPlaneRight size={25} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ className, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-foreground transition hover:bg-muted/80",
        className
      )}
      {...props}
    />
  );
}
