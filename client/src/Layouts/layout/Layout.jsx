import { Dock, Sidebar, Header } from "./components";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="bg-background text-foreground w-full h-[101vh] md:flex    ">
      <Header />
      <Sidebar />
      <section className="flex flex-1 h-screen ">
        <Outlet />
      </section>
      <Dock />
    </div>
  );
};

export default Layout;
