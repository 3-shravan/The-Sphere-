import { AnimatePresence, motion, useNavigate } from "@lib";
import { useMenu } from "@context";
import { Header, Menu } from "@components";
import Marquee from "./components/Marquee";
import styles from "./style.module.css";

const LandingPage = () => {
  const { menu } = useMenu();

  const navigate = useNavigate();
  return (
    <>
      <div className={styles.wrapper}>
        <Header />
        <AnimatePresence>{menu && <Menu />}</AnimatePresence>
        <div className={styles.bg}>
          <div className={styles.hero}>
            <motion.h1
              className={styles.line1}
              initial={{ opacity: 0, y: -500 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Connect . Share
            </motion.h1>

            <motion.span
              className={styles.and}
              initial={{ y: -210, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              &
            </motion.span>

            <motion.div>
              <motion.h1
                className={styles.line2}
                initial={{ y: -500, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 0.7,
                  ease: "easeOut",
                }}
              >
                Discover
              </motion.h1>
            </motion.div>
          </div>
          <Marquee />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
