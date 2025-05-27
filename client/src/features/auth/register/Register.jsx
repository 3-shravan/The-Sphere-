import styles from "./style.module.css";
import React from "react";
import { AnimatePresence, motion, PiArrowSquareInDuotone } from "@lib";
import { Header, Menu } from "@components";
import { useApi } from "@hooks";
import { useMenu } from "@context";
import { errorToast, RegisterInitialFormData, validateForm } from "@utils";
import { AuthButton,PrivacyTermsAndConditions } from "@features/auth/shared";
import {
  Fullname,
  Password,
  VerifyCredentials,
  RedirectToLogin,
  VerifyOTP,
} from "./components";

const RESEND_TIME = 30;
const Register = () => {
  const { menu } = useMenu();
  const [stage, setStage] = React.useState(1);
  const [formData, setFormData] = React.useState(RegisterInitialFormData);
  const [isResend, setIsResend] = React.useState(true);
  const [resendTimer, setResendTimer] = React.useState(0);

  React.useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResend(true);
    }

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (stage === 1 && !formData.name.trim())
      return errorToast("Please provide your name.");

    if (stage === 2 && formData.password.length < 6)
      return errorToast("Password must be 6 characters long.");

    if (stage < 4) {
      setStage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setStage((prev) => prev - 1);
  };

  const { request, loading } = useApi();

  const showError = async () => {
    return errorToast(
      `Please wait ${resendTimer} seconds before resending OTP.`
    );
  };

  const resendHandler = async () => {
    const validationError = validateForm(formData, stage);
    if (validationError) {
      return errorToast(validationError);
    }
    if (!isResend) {
      return errorToast(
        `Please wait ${resendTimer} seconds before resending OTP.`
      );
    }
    const response = await request({
      endpoint: "auth/register",
      method: "POST",
      body: formData,
    });
    if (!response) return setIsResend(true);
    if (response.data.success) {
      handleNext();
      setResendTimer(RESEND_TIME);
      setIsResend(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationError = validateForm(formData, stage);
    if (validationError) {
      return errorToast(validationError);
    }

    if (!isResend) {
      return errorToast(
        `Please wait ${resendTimer} seconds before resending OTP.`
      );
    }

    const response = await request({
      endpoint: "auth/register",
      method: "POST",
      body: formData,
    });
    if (!response) return setIsResend(true);
    if (response.data.success) {
      handleNext();
      setResendTimer(RESEND_TIME);
      setIsResend(false);
    }
  };

  return (
    <div className="heroSection">
      <Header />

      <AnimatePresence>{menu && <Menu />}</AnimatePresence>

      {!menu && (
        <motion.div
          className={styles.container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, ease: "linear" }}
        >
          <form
            action=""
            onSubmit={(e) => submitHandler(e)}
            className={styles.formContainer}
          >
            {stage === 1 && (
              <Fullname
                handleNext={handleNext}
                formData={formData}
                handleChange={handleChange}
              />
            )}

            {stage === 2 && (
              <Password
                handleNext={handleNext}
                formData={formData}
                handleChange={handleChange}
                handlePrevious={handlePrevious}
              />
            )}

            {stage === 3 && (
              <>
                <VerifyCredentials
                  handleNext={handleNext}
                  formData={formData}
                  handleChange={handleChange}
                  handlePrevious={handlePrevious}
                  submitHandler={submitHandler}
                />
                <AuthButton
                  handleNext={submitHandler}
                  type="submit"
                  text={isResend ? "Send OTP" : `Resend in ${resendTimer}s`}
                  loading={isResend && loading}
                  register={true}
                  icon={<PiArrowSquareInDuotone className="text-2xl pl-1" />}
                />
                <RedirectToLogin />
              </>
            )}
          </form>

          {stage === 4 && (
            <div className={styles.formContainer}>
              <VerifyOTP
                text={isResend ? "Resend OTP" : `Resend in ${resendTimer}s`}
                resendLoading={loading}
                showError={showError}
                resendHandler={resendHandler}
                isResend={isResend}
                formData={formData}
                handleChange={handleChange}
                handlePrevious={handlePrevious}
              />
            </div>
          )}

          <PrivacyTermsAndConditions />
        </motion.div>
      )}
    </div>
  );
};
export default Register;
