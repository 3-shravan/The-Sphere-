import { motion } from "@lib";

export const Loading = () => {
  return (
    <div className="text-center py-10 font-bold text-sm font-Futura">
      fetching...
    </div>
  );
};

export const Error = () => {
  <div className="text-center py-10 font-bold text-rose-500">
    Failed to fetch posts.
  </div>;
};

const Spinner = ({ text, radius, fontSize, letterSpacing }) => {
  const characters = text.split("");
  return (
    <motion.div
      className="relative aspect-square"
      style={{ width: radius * 2 }}
    >
      <p aria-label={text} />
      <p
        aria-hidden="true"
        className="absolute left-1/2 top-0 font-bold text-[color:var(--foreground)] whitespace-nowrap mix-blend-difference"
      >
        {characters.map((ch, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-0 font-['Gilroy_Bold']"
            style={{
              transformOrigin: `0 ${radius}px`,
              transform: `rotate(${i * letterSpacing}deg)`,
              fontSize,
              color: "var(--font)",
            }}
          >
            {ch}
          </motion.span>
        ))}
      </p>
    </motion.div>
  );
};

export const Loader = () => {
  return (
    <div className="absolute inset-0 w-screen h-full bg-[var(--background)] flex items-center justify-center overflow-hidden">
      {/* Spinner 1 */}
      <motion.div
        className="absolute -right-[535px] -bottom-[840px]"
        initial={{ rotate: 45 }}
        animate={{ rotate: -315 }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      >
        <Spinner
          text="LOADING  LOADING  LOADING  LOADING  LOADING"
          radius={800}
          fontSize="180px"
          letterSpacing={8}
        />
      </motion.div>

      {/* Spinner 2 */}
      <motion.div
        className="absolute -right-[385px] -bottom-[695px]"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      >
        <Spinner
          text="LOADING  LOADING  LOADING  LOADING"
          radius={650}
          fontSize="180px"
          letterSpacing={10}
        />
      </motion.div>

      {/* Spinner 3 */}
      <motion.div
        className="absolute -right-[200px] -bottom-[510px]"
        initial={{ rotate: -5 }}
        animate={{ rotate: -365 }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      >
        <Spinner
          text="LOADING LOADING LOADING"
          radius={480}
          fontSize="180px"
          letterSpacing={15}
        />
      </motion.div>
    </div>
  );
};
