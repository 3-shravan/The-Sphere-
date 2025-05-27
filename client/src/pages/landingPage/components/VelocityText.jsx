import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import { Asterisk } from "lucide-react";
import React, { useRef } from "react";

const VelocityText = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  const skewXRaw = useTransform(
    scrollVelocity,
    [-0.5, 0.5],
    ["45deg", "-45deg"]
  );
  const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });

  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -3000]);
  const x = useSpring(xRaw, { mass: 3, stiffness: 200, damping: 50 });

  return (
    <section
      ref={targetRef}
      className="h-[700vh] md:h-[1000vh]  text-neutral-900"
    >
      <div className="sticky top-0 flex h-[50vh] items-center  overflow-hidden">
        <motion.p
          style={{ skewX, x }}
          className="origin-bottom-left flex items-center justify-center whitespace-nowrap text-8xl font-black font-[Poppins] uppercase leading-[0.85] md:text-9xl md:leading-[0.85]"
        >
          &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt; Where moments meet trends
          <Asterisk
            size={150}
            color="blue"
            strokeWidth={25}
            absoluteStrokeWidth
          />
          <span className="text-emerald-400 font-Futura lowercase">
            Join us today
          </span>
          <Asterisk
            size={150}
            color="blue"
            strokeWidth={25}
            absoluteStrokeWidth
          />
          &lt; &lt; &lt; &lt; &lt; &lt; &lt; &lt; &lt;
        </motion.p>
      </div>
    </section>
  );
};

export const FuzzyOverlay = () => {
  return (
    <motion.div
      initial={{ transform: "translateX(-10%) translateY(-10%)" }}
      animate={{
        transform: "translateX(10%) translateY(10%)",
      }}
      transition={{
        repeat: Infinity,
        duration: 0.2,
        ease: "linear",
        repeatType: "mirror",
      }}
      // You can download these PNGs here:
      // https://www.hover.dev/black-noise.png
      // https://www.hover.dev/noise.png
      style={{
        // backgroundImage: 'url("https://www.hover.dev/black-noise.png")',
        backgroundImage: 'url("https://www.hover.dev/noise.png")',
      }}
      className="pointer-events-none absolute -inset-[100%] opacity-[10%]"
    />
  );
};

export default VelocityText;
