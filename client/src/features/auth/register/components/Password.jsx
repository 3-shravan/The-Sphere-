import {
  useEffect,
  useRef,
  motion,
  MdNavigateNext,
  MdLock,
  IoIosArrowBack,
} from "@lib";
import { AuthButton } from "../../shared";
import styles from "@features/auth/shared/auth.module.css";
import RedirectToLogin from "./RedirectToLogin";

const Password = ({ handleNext, formData, handleChange, handlePrevious }) => {
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
        <h1 className={styles.heading1}>
          <IoIosArrowBack
            onClick={handlePrevious}
            className={styles.backIcon}
          />
        </h1>
        <h1 className={styles.heading2}>Create a secure password. </h1>
        <h2 className={styles.inputName}>Password</h2>
        <div className={styles.inputWrapper}>
          <MdLock className="text-3xl absolute left-2.5 text-zinc-100 pr-2  border-zinc-700 h-6 " />

          <input
            ref={inputRef}
            type="password"
            placeholder=" ********"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            onKeyDown={handleKeyDown}
            className={styles.inputField}
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

export default Password;
