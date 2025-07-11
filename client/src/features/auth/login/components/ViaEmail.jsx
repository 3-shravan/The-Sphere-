import styles from "@features/auth/shared/auth.module.css";
import { motion, MdLock, MdMarkEmailUnread } from "@lib";

const ViaEmail = ({ handleChange, formData }) => {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, ease: "circIn" }}
    >
      <div className={styles.inputWrapper}>
        <MdMarkEmailUnread className="text-[1.7rem] absolute left-3 text-zinc-300 pr-2 border-r-1 border-zinc-700 h-6 mx-auto" />{" "}
        <input
          type="email"
          placeholder=" e.g sphere@gmail.com"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e)}
          className={styles.inputField}
        />
      </div>

      <div className={styles.inputWrapper}>
        <MdLock className="text-[1.7rem] absolute left-3 text-zinc-300 pr-2 border-r-1 border-zinc-700 h-6 mx-auto" />

        <input
          type="password"
          placeholder=" password"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange(e)}
          className={styles.inputField}
        />
      </div>
    </motion.div>
  );
};

export default ViaEmail;
