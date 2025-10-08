import { Album, BadgePlus, GalleryVerticalEnd, Search } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { tabs } from "@/utils"

const Dock = () => {
  const { pathname } = useLocation()

  const className = "w-5"
  const icons = [
    <GalleryVerticalEnd key="gallery" className={`${className}`} />,
    <Search key="search" className={`${className}`} />,
    <Album key="album" className={`${className}`} />,
    <BadgePlus key="badge" className={`${className}`} />,
  ]
  return (
    <section className="-translate-x-1/2 fixed bottom-0 left-1/2 z-50 flex w-full items-center bg-background/40 backdrop-blur md:hidden">
      {tabs.map((link, index) => {
        const isActive = pathname === link.route
        return (
          <Link
            key={link.label}
            to={link.route}
            className={`${
              isActive && "text-third"
            } w-full flex-center flex-col py-2 transition md:py-4`}
          >
            {icons[index]}

            {/* <p className=" text-[8px] font-bold font-Poppins leading-tight">
              {link.label}
            </p> */}
          </Link>
        )
      })}
    </section>
  )
}

export default Dock
