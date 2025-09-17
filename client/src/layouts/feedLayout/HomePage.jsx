import { SuggestedUsers } from "@/features/users";
import { useSavedPosts } from "@/shared/services";
import Thoughts from "@/features/posts/post/Thoughts";
import Birthdays from "@/features/birthdays/Birthdays";
import Feed from "@/features/feeds/Feed";
import HomePageHeader from "./components/HomePageHeader";

const HomePage = () => {
  useSavedPosts();
  return (
    <div className="flex flex-col w-full flex-1 overflow-hidden rounded-3xl m-1.5 md:m-3 md:border-[1.5px] md:border-border">
      <HomePageHeader />
      <main className="md:flex md:justify-center">
        <Feed />
        <section className="hidden lg:flex ml-2 flex-col gap-5 pt-2 pl-0 mr-4.5 w-full">
          <Thoughts />
          <SuggestedUsers />
          <Birthdays />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
