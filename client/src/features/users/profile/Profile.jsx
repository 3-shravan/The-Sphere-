import { useParams } from "react-router-dom";
import { Container, Loading, NonExistRoutes } from "@/components";
import { useAuth } from "@/context";
import { PostGrid } from "@/shared";
import { useGetProfile } from "../services";
import { ProfileCard } from "./components/ProfileCard";

const Profile = () => {
	const { username } = useParams();
	const { currentUserId } = useAuth();
	const { data: profile, isLoading } = useGetProfile(username);

	const user = profile?.user;
	const me = user?._id === currentUserId;
	const posts = profile?.user?.posts;

	if (isLoading) return <Loading />;
	if (!user) return <NonExistRoutes />;

	return (
		<Container>
			<ProfileCard user={user} />
			<div className="font-Futura text-left w-full px-0.5 text-neutral-600">
				<span className="border-b-2 py-1 border-border">
					{me ? "your" : "there"} posts{" "}
					<span className="text-second font-blackout">{posts?.length}</span>
				</span>
			</div>
			<PostGrid posts={posts} likePost={true} savePost={true} />
		</Container>
	);
};

export default Profile;
