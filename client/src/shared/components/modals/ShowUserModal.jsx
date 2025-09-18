import { ProfilePicture } from "@/components";
import { Button } from "@/components/ui/button";
import { PiHeartFill } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function ShowUserModel({ title = "Users", users, onCancel }) {
  return (
    <>
      <h2 className="flex gap-1 font-semibold mb-4 ">
        <PiHeartFill size={22} className="text-third" /> {title}
      </h2>
      <ul className="space-y-4 pl-1">
        {users.map((user) => (
          <li key={user._id} className="flex items-center gap-2">
            <ProfilePicture
              profilePicture={user.profilePicture}
              size="sm"
              username={user.name}
            />
            <Link
              to={`/profile/${user.name}`}
              className="text-sm font-Futura text-foreground"
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => onCancel(false)}
        className="mt-4 w-full py-1 cursor-pointer text-sm text-foreground bg-muted hover:bg-rose-500"
      >
        Close
      </Button>
    </>
  );
}
