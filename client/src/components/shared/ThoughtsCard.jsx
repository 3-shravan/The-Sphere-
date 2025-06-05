import { twMerge } from "tailwind-merge";
const ThoughtsCard = ({ thought, className = "" }) => {
  return (
    <div
      className={twMerge(
        "px-4 pt-14 pb-4 text-xs font-Poppins text-foreground",
        className
      )}
    >
      {thought}
    </div>
  );
};
export default ThoughtsCard;
