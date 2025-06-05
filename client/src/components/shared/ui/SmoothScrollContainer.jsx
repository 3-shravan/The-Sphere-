import { useSmoothScroll } from "@/hooks";

const SmoothScrollContainer = ({ children, className = "" }) => {
  useSmoothScroll(".create-native-scroll");
  return (
    <div
      className={`overflow-y-scroll create-native-scroll border  ${className}`}
    >
      {children}
    </div>
  );
};

export default SmoothScrollContainer;
