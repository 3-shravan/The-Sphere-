export default function Container({ children }) {
  return (
    <div className="scroll flex h-screen w-full flex-1 gap-6 overflow-y-scroll px-3.5 py-6 pb-30 md:gap-10 md:px-8 md:py-4 lg:px-4 lg:py-5">
      {children}
    </div>
  )
}
