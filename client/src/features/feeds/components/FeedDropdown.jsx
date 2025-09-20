import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function FeedDropdown({ dropdown, setDropdown }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex  max-w-fit cursor-pointer p-2 md:pt-4 no-focus">
        <h2 className="text-xl flex items-end gap-1 font-Futura tracking-tighter">
          your feed
          <span className="text-muted-foreground/50 font-Gilroy text-sm">
            {dropdown === "all" ? "posts from everywhere" : dropdown}
          </span>
          <ChevronDown size={16} color="pink" />
        </h2>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="bg-card w-40 outline-hidden">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setDropdown("all")}
        >
          All Posts
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setDropdown("following")}
        >
          Following
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
