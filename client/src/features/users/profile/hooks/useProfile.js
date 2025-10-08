import { useState } from "react";
import { useAuth } from "@/context";
import { useFollowUser } from "@/shared/api/useMutations";

const useProfile = (user) => {
	const { _id, followers } = user;
	const { currentUserId } = useAuth();
	const me = currentUserId === _id;

	const [isFollowing, setIsFollowing] = useState(
		followers.some((f) => f?._id?.toString() === currentUserId?.toString()),
	);
	const [followersCount, setFollowersCount] = useState(followers.length);

	const { mutate: followUser, isPending } = useFollowUser({
		onMutate: () => {
			setIsFollowing((prev) => !prev);
			setFollowersCount((count) => (isFollowing ? count - 1 : count + 1));
		},
		onError: () => {
			setIsFollowing((prev) => !prev);
			setFollowersCount((count) => (isFollowing ? count + 1 : count - 1));
		},
	});

	return {
		me,
		isFollowing,
		followersCount,
		followUser,
		isPending,
	};
};

export default useProfile;
