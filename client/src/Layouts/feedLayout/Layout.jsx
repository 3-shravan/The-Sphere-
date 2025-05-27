import { Dock, Sidebar, Header } from "./components";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="w-full h-[101vh] md:flex  ">
      <Header />
      <Sidebar />
      <main className="flex flex-1">
        <Outlet />
      </main>
      <Dock />
    </div>
  );
};

export default Layout;
