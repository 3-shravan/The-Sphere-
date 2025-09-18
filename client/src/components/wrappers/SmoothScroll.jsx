import { useSmoothScroll } from "@/hooks";

export default function SmoothScroll({ children, className = "" }) {
  useSmoothScroll(".scroll");
  return (
    <div className={`overflow-y-scroll scroll border  ${className}`}>
      {children}
    </div>
  );
}
