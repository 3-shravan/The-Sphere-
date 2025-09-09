import { motion } from "@lib";
import { MarqueeItems } from "@utils";
import { Asterisk } from "lucide-react";
import "@styles/marquee.css";

const Marquee = ({ direction }) => {
  const animationX = direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"];
  return (
    <motion.div className="marquee-container">
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          className="marquee-content"
          animate={{ x: animationX }}
          transition={{
            repeat: Infinity,
            duration: 120,
            ease: "linear",
          }}
        >
          {MarqueeItems.map((text, index) => (
            <span key={index} className="marquee-item">
              {text}{" "}
              <span className="px-20">
                <Asterisk
                  size={40}
                  className="text-second"
                  strokeWidth={7}
                  absoluteStrokeWidth
                />
              </span>
            </span>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Marquee;
