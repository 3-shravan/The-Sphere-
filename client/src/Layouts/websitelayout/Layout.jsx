import styles from "./layout.module.css";
import { AnimatePresence, motion, useEffect } from "@lib";
import { useMenu } from "@context";
import { Header, Menu } from "@components";
import {
  Bar,
  Message,
  Near,
  Chat,
  Connect,
  Post,
  Marquee,
  Signup,
  StackedCards,
  PhoneMockup,
  Gradient,
  Day,
  MagnetButton,
  VelocityText,
  RevealLinks,
  Footer,
} from "./components";

const Layout = () => {
  const { menu } = useMenu();

  useEffect(() => {
    document.body.style.background = "#000";
    return () => {
      document.body.style.background = localStorage.getItem("theme");
    };
  }, []);

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.marqueeTop}>
          <Marquee direction="left" />
        </div>

        <main className={styles.mainContent}>
          <AnimatePresence>{menu && <Menu />}</AnimatePresence>

          <div className={styles.heroTextWrapper}>
            <h1 className={styles.heroText}>Sphere</h1>
          </div>

          <section className={styles.sectionRevealLinks}>
            <RevealLinks />
            <div className={styles.sectionRevealLinksInner}>
              <Day />
              <Signup />
            </div>
          </section>
          <section className={styles.sectionMagnetButton}>
            <MagnetButton />
          </section>

          <section className={styles.sectionGradient}>
            <Gradient />
            <PhoneMockup />
            <div className="  w-full overflow-hidden ">
              <Bar />
              <Message />
              <Near />
              <Chat />
              <Connect />
              <Post />
            </div>
          </section>

          <section className={styles.sectionVelocityText}>
            <VelocityText />
          </section>

          <div className={styles.h1Wrapper}>
            <StackedCards />
          </div>
        </main>
        <div className="flex flex-col w-full h-screen">
          {" "}
          <Footer />
        </div>
        <div className={styles.marqueeBottom}>
          <Marquee />
        </div>
      </div>
    </>
  );
};

export default Layout;
