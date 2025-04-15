import styles from "@features/auth/shared/auth.module.css";
import { InputOtp } from "@features/auth/shared";
import { useApi } from "@hooks";
import { motion, IoIosArrowBack } from "@lib";

const OtpVerify = ({
  formData,
  setStage,
  isResend,
  resendHandler,
  showError,
  resendLoading,
  text,
}) => {
  const phone = `${formData.phone}`;

  const { execute, loading } = useApi(
    "/forgetPassword/verifyOTP",
    "POST",
    `/resetPassword/phone/${formData.phone}`
  );

  const handleResendOtp = () => {
    isResend ? resendHandler() : showError();
  };

  const handleOtpSubmit = async (otp) => {
    const requestData = {
      phone: formData.phone,
      otp,
    };
    await execute(requestData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "linear" }}
      className={styles.verifyOtp}
    >
      <form
        action=""
        className={styles.formContainer}
        onSubmit={(e) => {
          handleOtpSubmit(e);
        }}
      >
        <h1 className={styles.heading1}>
          <IoIosArrowBack
            onClick={() => setStage(0)}
            className={styles.backIcon}
          />
        </h1>

        <h2 className={styles.inputName}>
          We sent you a Verification Code on +91
          <h2>{phone}</h2>
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
    </motion.div>
  );
};

export default OtpVerify;
