import { useSmoothScroll } from "@/hooks"
export default function Container({ children }) {
  useSmoothScroll(".scroll")
  return (
    <div className="flex h-full flex-1">
      <div className="scroll flex flex-1 flex-col items-center gap-6 overflow-y-scroll px-3.5 py-6 pb-30 md:gap-10 md:px-8 md:py-4 lg:px-15 lg:py-6">
        {children}
      </div>
    </div>
  )
}
