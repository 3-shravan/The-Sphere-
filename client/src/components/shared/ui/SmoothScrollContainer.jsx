import { useSmoothScroll } from "@/hooks";

const SmoothScrollContainer = ({ children }) => {
  useSmoothScroll(".smooth-scroll");

  return <div className="overflow-scroll smooth-scroll ">{children}</div>;
};

export default SmoothScrollContainer;
