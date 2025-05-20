import { useSmoothScroll } from "@/hooks";
import Feed from "../components/Feed";

const Home = () => {
  useSmoothScroll(".home-native-scroll");

  return (
    <div className="flex  flex-1 bg-neutral-900 rounded-4xl m-3 p-2   border border-muted ">
      <div
        className="  js-native-scroll home-native-scroll
        flex  flex-col flex-1 h-full rounded-4xl gap-10  py-8  pb-30 px-5 md:px-8 lg:px-8 lg:py-10"
      >
        <Feed />
      </div>
      {/* <SuggestedUsers posts={posts} /> */}
    </div>
  );
};

export default Home;
