import RedirectToLogin from "./RedirectToLogin";
import styles from "@features/auth/shared/auth.module.css";
import { AuthButton } from "../../shared";
import { useEffect, useRef, motion, MdNavigateNext, CgProfile } from "@lib";

const Fullname = ({ handleNext, formData, handleChange }) => {
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, ease: "linear" }}
      >
        <h1 className={styles.heading1}>Create New Account</h1>
        <h1 className={` ${styles.heading2}`}>Join today!</h1>
        <h2 className={styles.inputName}>Your username ?</h2>
        <div className={styles.inputWrapper}>
          <CgProfile className="text-3xl absolute left-2.5 text-zinc-300 pr-2  border-zinc-700 h-7 mx-auto" />
          <input
            ref={inputRef}
            type="text"
            placeholder=" Username"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
            onKeyDown={handleKeyDown}
            className={styles.inputField}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>
      </motion.div>
      <AuthButton
        handleNext={handleNext}
        text="Next"
        type="button"
        register={true}
        icon={<MdNavigateNext />}
      />
      <RedirectToLogin />
    </>
  );
};

export default Fullname;
