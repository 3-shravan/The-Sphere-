import styles from "@features/auth/shared/auth.module.css";
import { MdMarkEmailUnread, motion } from "@lib";

const ViaEmail = ({ handleChange, formData }) => {
  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, ease: "circIn" }}
    >
      <div className={styles.inputWrapper}>
        <MdMarkEmailUnread className="text-[1.7rem] absolute left-3 text-zinc-300 pr-2 border-r-1 border-zinc-700 h-7 mx-auto" />{" "}
        <input
          type="email"
          placeholder=" Email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e)}
          className={styles.inputField}
        />
      </div>
    </motion.div>
  );
};

export default ViaEmail;
