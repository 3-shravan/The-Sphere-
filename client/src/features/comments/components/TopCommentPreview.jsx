import { ProfilePicture } from "@/components";

export default function TopCommentPreview({ topComment, onClick }) {
  return (
    <div className="flex gap-2 cursor-default text-xs my-1" onClick={onClick}>
      <ProfilePicture
        profilePicture={topComment?.author?.profilePicture}
        size="sm"
      />
      <span>
        <span className="font-mono ml-1 font-bold text-muted-foreground/80">
          {topComment?.author.name} commented{" "}
        </span>
        <span className="font-mono italic">"{topComment?.comment}"</span>
      </span>
    </div>
  );
}
