import { Outlet } from "react-router-dom"
import { Dock, PhoneHeader, Sidebar } from "../components"

export default function Layout() {
  return (
    <div className="h-[100svh] w-full md:flex">
      <PhoneHeader />
      <Sidebar />
      <main className="flex h-[92svh] flex-1 md:h-screen md:min-w-[70vw]">
        <Outlet />
      </main>
      <Dock />
    </div>
  )
}
