export default function Container({ children }) {
  return (
    <div className="scroll flex h-[100svh] w-full flex-1 overflow-y-scroll pb-2 md:gap-10 md:px-8 md:py-4 lg:px-4 lg:py-5">
      {children}
    </div>
  )
}
