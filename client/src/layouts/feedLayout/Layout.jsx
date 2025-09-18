import { Outlet } from "react-router-dom";
import Dock from "./components/Dock";
import Sidebar from "./components/Sidebar";
import PhoneHeader from "./components/PhoneHeader";

export default function Layout() {
  return (
    <div className="w-full h-[100svh] md:flex">
      <PhoneHeader />
      <Sidebar />
      <main className="flex flex-1 md:min-w-[70vw] h-[92svh] md:h-screen">
        <Outlet />
      </main>
      <Dock />
    </div>
  );
}
