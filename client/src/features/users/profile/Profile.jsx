import { useGetProfile } from "../services";
import { Container, NonExistRoutes, PostGrid } from "@/components";
import { useParams } from "react-router-dom";
import { ProfileCard } from "./components/ProfileCard";
import { useAuth } from "@/context";

const Profile = () => {
  const { username } = useParams();
  const { currentUserId } = useAuth();
  const { data: profile } = useGetProfile(username);

  const user = profile?.user;
  const me = user?._id === currentUserId;
  const posts = profile?.user?.posts;
  if (!user) return <NonExistRoutes />;

  return (
    <Container>
      <ProfileCard user={user} />
      <div className="font-Futura text-left w-full px-2 text-neutral-600">
        <span className="border-b-2 py-1 border-border">
          {me ? "your" : "there"} posts .
          <span className=" text-rose-400 font-blackout">
            {" "}
            {posts?.length || 0}
          </span>
        </span>
      </div>
      <PostGrid posts={posts} />
    </Container>
  );
};

export default Profile;
