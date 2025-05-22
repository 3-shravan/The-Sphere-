import { LeftSidebar } from "./components/LeftSidebar";
import { Topbar } from "./components/Topbar";
import Bottombar from "./components/Bottombar";
import { Outlet } from "react-router-dom";

const FeedLayout = () => {
  return (
    <div className="bg-background text-foreground  w-full h-[101vh] md:flex    ">
      <Topbar />
      <LeftSidebar />
      <section className="flex flex-1 h-screen ">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default FeedLayout;
