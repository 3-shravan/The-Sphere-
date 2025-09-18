import { useSmoothScroll } from "@/hooks";
export default function Container({ children }) {
  useSmoothScroll(".scroll");
  return (
    <div className="flex flex-1 h-full ">
      <div className="flex flex-col items-center gap-6 md:gap-10 overflow-y-scroll scroll flex-1 py-6 pb-30 px-5 md:px-8 md:py-4 lg:py-6 lg:px-15">
        {children}
      </div>
    </div>
  );
}
