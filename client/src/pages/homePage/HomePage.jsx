import { useAuth } from "@context";
import { useNavigate } from "react-router-dom";
import { SuggestedUsers } from "@/features/users";
import { Feed } from "@/features/posts";
import Thoughts from "./components/Thoughts";
import Header from "./components/Header";
import Birthdays from "./components/Birthdays";

const HomePage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  return (
    <div className="flex flex-col w-full flex-1 overflow-hidden  rounded-3xl m-3 md:border-[1.5px] md:border-border">
      <Header auth={auth} navigate={navigate} />
      <main className="md:flex md:justify-center">
        <Feed />
        <section className="hidden lg:flex flex-col gap-5 pt-2 pl-0 mr-4.5 w-full">
          <Thoughts />
          <SuggestedUsers />
          <Birthdays />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
