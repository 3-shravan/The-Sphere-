import { useNavigate } from "@lib";
import styles from "@features/auth/shared/auth.module.css";

const RedirectToLogin = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.redirectLine}>
      <span>
        {" "}
        Already have an account?{" "}
        <span
          className={styles.redirectLink}
          onClick={() => navigate("/login", { replace: true })}
        >
          Login.
        </span>{" "}
      </span>
    </div>
  );
};

export default RedirectToLogin;
