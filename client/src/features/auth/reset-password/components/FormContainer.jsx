import { MdLock, MdLockOutline } from "@lib";
import styles from "@features/auth/shared/auth.module.css";

const FormContainer = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <section className={styles.space1vh}></section>
      <div className={styles.inputWrapper}>
        <MdLockOutline className="text-3xl absolute left-2.5 text-zinc-100 pr-2 border-r-1 border-zinc-700 h-7 mx-auto" />

        <input
          type="password"
          placeholder=" New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={(e) => handleChange(e)}
          className={styles.inputField}
        />
      </div>

      <div className={styles.inputWrapper}>
        <MdLock className="text-3xl absolute left-2.5 text-zinc-100 pr-2 border-r-1 border-zinc-700 h-7 mx-auto" />
        <input
          type="password"
          placeholder=" Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => handleChange(e)}
          className={styles.inputField}
        />
      </div>
    </div>
  );
};

export default FormContainer;
