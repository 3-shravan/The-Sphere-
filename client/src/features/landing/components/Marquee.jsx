import { motion } from "@lib";
import { MarqueeItems } from "@utils";
import "./marquee.css";

const Marquee = () => {
  return (
    <motion.div className="marquee-container">
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          className="marquee-content"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 80,
            ease: "linear",
          }}
        >
          {MarqueeItems.map((text, index) => (
            <span key={index} className="marquee-item">
              {text} •
            </span>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Marquee;
