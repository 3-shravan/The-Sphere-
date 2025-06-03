import { useGetProfile, useMyPosts } from "../services";
import { Backdrop, Container, PostGrid } from "@/components";
import { useParams } from "react-router-dom";
import { ProfileCard } from "../components/ProfileCard";

const Profile = () => {
  const { username } = useParams();
  const { data: profile } = useGetProfile({ username });
  const posts = profile?.user?.posts;
  const user = profile?.user;

  return (
    <Container>
      <ProfileCard user={user} />
      <div className="font-Futura text-left w-full px-2 text-muted-foreground  ">
        <span className="border-b-2 py-1 border-border ">your posts</span>
      </div>
      <PostGrid posts={posts} />
    </Container>
  );
};

export default Profile;
