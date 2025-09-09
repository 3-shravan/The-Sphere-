import { useSmoothScroll } from "@/hooks";

const SmoothScroll = ({ children, className = "" }) => {
  useSmoothScroll(".create-native-scroll");
  return (
    <div
      className={`overflow-y-scroll create-native-scroll border  ${className}`}
    >
      {children}
    </div>
  );
};

export default SmoothScroll;
