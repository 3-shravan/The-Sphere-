import HomePageHeader from "./components/HomePageHeader";
import Thoughts from "@/features/posts/components/Thoughts";
import Birthdays from "@/features/birthdays/pages/Birthdays";
import Feed from "@/features/feeds/pages/Feed";
import { useSavedPosts } from "@/shared/api/useQueries";
import SuggestedUsers from "@/features/users/pages/SuggestedUsers";

export default function HomePage() {
  useSavedPosts();

  return (
    <div className="home-page">
      <HomePageHeader />
      <main className="md:flex md:justify-center">
        <Feed />
        <section className="home-page-section">
          <Thoughts />
          <SuggestedUsers />
          <Birthdays />
        </section>
      </main>
    </div>
  );
}
