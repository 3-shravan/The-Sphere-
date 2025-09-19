import { Avatar, UserName, ActionButton, MessageText } from "@/lib/Toast";

export const CommentNotificationToast = ({
  user,
  parent,
  comment,
  postId,
  type,
}) => {
  return (
    <div className="flex items-center gap-2 rounded-2xl w-full max-w-sm font-Gilroy">
      <Avatar src={user.profilePicture} alt={user.name} />
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <UserName name={user.name} />
          <ActionButton to={`/post/${postId}`} />
        </div>

        {type === "reply" && parent && (
          <span className="text-xs -mt-1.5 text-muted-foreground/60">
            replied to your comment
          </span>
        )}
        <MessageText text={comment} />
      </div>
    </div>
  );
};

export const FollowNotificationToast = ({ user }) => {
  return (
    <div className="flex items-center gap-2 rounded-2xl w-full max-w-md font-Gilroy">
      <Avatar src={user.profilePicture} />
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <UserName name={user.name} />
          <ActionButton to={`/profile/${user.name}`} />
        </div>
        <MessageText text={`${user.name} started following you 🗽`} />
      </div>
    </div>
  );
};

export const LikeNotificationToast = ({ user }) => {
  return (
    <div className="flex items-center gap-2 rounded-2xl w-full max-w-sm font-Gilroy">
      <Avatar src={user.profilePicture} alt={user.name} />
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <UserName name={user.name} />
        </div>
        <MessageText text={` liked your post`} heart="true" />
      </div>
    </div>
  );
};
