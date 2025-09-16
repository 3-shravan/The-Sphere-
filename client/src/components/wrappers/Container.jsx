import { useSmoothScroll } from "@/hooks";
export const Container = ({ children }) => {
  useSmoothScroll(".create-native-scroll");
  return (
    <div className="flex flex-1 h-full ">
      <div className="flex flex-col items-center gap-6 md:gap-10  overflow-y-scroll create-native-scroll flex-1 py-2 pb-30 px-5 md:px-8 md:py-4 lg:py-6 lg:px-15">
        {children}
      </div>
    </div>
  );
};
