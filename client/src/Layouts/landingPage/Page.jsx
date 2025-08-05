import styles from "./page.module.css";
import { AnimatePresence } from "@lib";
import { useMenu } from "@context";
import { Menu, Marquee } from "@components";
import {
  Notificaton,
  UnreadMessage,
  Nearby,
  Chats,
  Connect,
  Post,
  Button,
  StackedCards,
  PhoneMockup,
  Gradient,
  Day,
  MagnetButton,
  VelocityText,
  RevealLinks,
  Footer,
} from "./components";

const Page = () => {
  const { menu } = useMenu();
  return (
    <>
      <div className={styles.page}>
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
              <Button />
            </div>
          </section>
          <section className={styles.sectionMagnetButton}>
            <MagnetButton />
          </section>

          <section className={styles.sectionGradient}>
            <Gradient />
            <PhoneMockup />
            <div className=" w-full flex flex-col items-center justify-center overflow-hidden ">
              <Nearby />
              <Notificaton />
              <Connect />
              <UnreadMessage />
              <Post />
              <Chats />
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
          <Footer />
        </div>
        <div className={styles.marqueeBottom}>
          <Marquee />
        </div>
      </div>
    </>
  );
};

export default Page;
