import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function FeedDropdown({ dropdown, setDropdown }) {
  console.log(dropdown);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" cursor-pointer p-2 md:pt-4 no-focus">
        <h2 className="text-xl flex items-end gap-1 font-Futura tracking-tighter">
          your feed
          <span className="text-muted-foreground/50 font-Gilroy text-sm">
            {dropdown === "all posts"
              ? "showing following posts for now"
              : dropdown}
          </span>
          <ChevronDown size={16} color="pink" />
        </h2>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card outline-hidden">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setDropdown("all posts")}
        >
          All Posts
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setDropdown("following 🐱‍👤")}
        >
          Following
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
