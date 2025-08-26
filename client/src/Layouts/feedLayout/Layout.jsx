import { Dock, Sidebar, Header } from "./components";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="w-full h-[100vh] md:flex">
      <Header />
      <Sidebar />
      <main className="flex flex-1 md:min-w-[70vw] h-screen">
        <Outlet />
      </main>
      <Dock />
    </div>
  );
};
export default Layout;
