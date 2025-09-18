import { useEffect, useState } from "react";
import { useAuth } from "@/context";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function BirthdayHeader() {
  const { isBirthday, auth } = useAuth();
  const [confetti, setConfetti] = useState(true);

  useEffect(() => {
    if (isBirthday) {
      const t = setTimeout(() => setConfetti(false), 8000);
      return () => clearTimeout(t);
    }
  }, [isBirthday]);

  if (!isBirthday) return null;

  return (
    <div className="w-full font-Poppins">
      {confetti && (
        <Confetti
          width={document.getElementById("header-bar")?.offsetWidth || 1500}
          height={800}
          numberOfPieces={500}
          recycle={true}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="
          text-xs font-semibold
          md:text-sm
          text-center uppercase font-blackout tracking-widest
        "
      >
        Happy Birthday,{" "}
        <span className="text-rose-300">
          {" "}
          {auth?.profile?.fullName || auth?.profile?.name || "Friend"}🎉
        </span>
      </motion.div>
    </div>
  );
}
