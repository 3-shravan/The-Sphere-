import {
  ToastAvatar,
  ToastUserName,
  ToastActionButton,
  ToastMessageText,
  ToastMedia,
} from "@/lib/Toast";
import { useNavigate } from "react-router-dom";

export const CommentNotificationToast = ({
  user,
  media,
  comment,
  postId,
  type,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center cursor-pointer gap-3 w-full pr-3 font-Gilroy"
      onClick={() => navigate(`/post/${postId}`)}
    >
      <ToastAvatar src={user.profilePicture} />
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <ToastUserName name={user.name} />
          {/* <ToastActionButton to={`/post/${postId}`} /> */}
        </div>
        {type === "reply" ? (
          <span className="text-xs text-muted-foreground/60">
            replied to your comment
          </span>
        ) : (
          <span className="text-xs text-muted-foreground/60">commented</span>
        )}
        <ToastMessageText text={comment} />
      </div>
      <ToastMedia src={media} />
    </div>
  );
};

export const FollowNotificationToast = ({ user }) => {
  return (
    <div className="flex items-center gap-3 justify-center rounded-2xl w-full max-w-md font-Gilroy">
      <ToastAvatar src={user.profilePicture} size="w-11 h-11" />
      <div className="flex -mt-1 flex-col flex-1">
        <ToastMessageText text={`${user.name} started following you 🗽`} />
        <div className="flex mt-1 -ml-0.5 items-center justify-between">
          <ToastActionButton to={`/profile/${user.name}`} />
        </div>
      </div>
    </div>
  );
};

export const LikeNotificationToast = ({ user, postId, media }) => {
  return (
    <div className="flex items-center gap-2 rounded-2xl w-full max-w-sm font-Gilroy">
      <ToastAvatar src={user.profilePicture} />
      <div className="flex -mt-1 flex-col flex-1">
        <ToastMessageText text={`${user.name} liked your post`} heart={true} />
        <div className="flex mt-1 -ml-0.5 items-center justify-between">
          <ToastActionButton to={`/post/${postId}`} />
        </div>
      </div>
      <ToastMedia src={media} />
    </div>
  );
};
