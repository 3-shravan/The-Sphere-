import styles from "@features/auth/shared/auth.module.css";
import RedirectToLogin from "./RedirectToLogin";
import { motion, IoIosArrowBack } from "@lib";
import { InputOtp } from "../../shared";
import { useApi } from "@hooks";
import { useAuth } from "@context";
import { setTokenAndAuthenticated } from "@utils";

const VerifyOTP = ({
  formData,
  handlePrevious,
  isResend,
  resendHandler,
  showError,
  resendLoading,
  text,
}) => {
  const phone = formData.phone ? `+91${formData.phone}` : "";
  const { setAuth } = useAuth();

  const { request, loading } = useApi();

  const handleResendOtp = () => {
    isResend ? resendHandler() : showError();
  };

  const handleOtpSubmit = async (otp) => {
    const requestData = {
      email: formData.email,
      phone: formData.phone,
      otp,
    };

    const response = await request({
      endpoint: "auth/verifyOtp",
      method: "POST",
      body: requestData,
      redirectUrl: "/feeds",
    });

    if (response.status === 200) {
      setAuth({
        token: response.data.token,
        isAuthenticated: true,
        profile: response.data.user,
      });
      setTokenAndAuthenticated(response.data.token, true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "linear" }}
    >
      <form action="" className={styles.formContainer}>
        <h1 className={styles.heading1}>
          <IoIosArrowBack
            onClick={handlePrevious}
            className={styles.backIcon}
          />
        </h1>
        <h2 className={styles.inputName}>
          We sent you a Verification Code on{" "}
          <span className={styles.email}>
            {phone} {formData.email}
          </span>
        </h2>

        <InputOtp handleOtpSubmit={handleOtpSubmit} loading={loading} />
      </form>

      <button
        type="button"
        onClick={() => handleResendOtp()}
        className="resendOtp"
        disabled={resendLoading}
      >
        {resendLoading ? "..." : text}
      </button>

      <RedirectToLogin />
    </motion.div>
  );
};

export default VerifyOTP;
