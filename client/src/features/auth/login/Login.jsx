import React from "react";
import { useNavigate, AnimatePresence, motion, IoLogIn } from "@lib";
import { Menu, Header, PrivacyTermsAndConditions } from "@components";
import { useApi } from "@hooks";
import { useAuth, useMenu } from "@context";
import { LoginInitialFormData, setTokenAndAuthenticated } from "@utils";
import { ViaEmail, ViaPhone, RedirectToSignup } from "./components";
import { AuthButton } from "../shared";
import loginstyles from "./style.module.css";
import styles from "@features/auth/shared/auth.module.css";

const Login = () => {
  const { setAuth } = useAuth();
  const { menu } = useMenu();

  const navigate = useNavigate();

  const [formData, setFormData] = React.useState(LoginInitialFormData);
  const [loginByEmail, setLoginByEmail] = React.useState(true);
  const { request, loading } = useApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMethod = () => {
    setFormData(LoginInitialFormData);
    setLoginByEmail(!loginByEmail);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await request({
      endpoint: "auth/login",
      method: "POST",
      body: formData,
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
    <>
      <div className="heroSection">
        <Header />

        <AnimatePresence>{menu && <Menu />}</AnimatePresence>

        {!menu && (
          <motion.div
            className={loginstyles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, ease: "linear" }}
          >
            <form action="" className={loginstyles.formContainer}>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, ease: "linear" }}
                className={styles.heading1}
              >
                Good To See You Back !{" "}
              </motion.h1>

              <span className={styles.spanLine} onClick={() => handleMethod()}>
                Login via
                <h2>{loginByEmail ? "Phone Number" : "Email"}</h2>
              </span>

              {loginByEmail ? (
                <ViaEmail handleChange={handleChange} formData={formData} />
              ) : (
                <ViaPhone handleChange={handleChange} formData={formData} />
              )}

              <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, ease: "linear" }}
              >
                <AuthButton
                  handleNext={submitHandler}
                  text="Login"
                  type="submit"
                  loading={loading}
                  icon={<IoLogIn className="text-black/90" />}
                />
                <button
                  className={styles.secondaryButton}
                  onClick={() => navigate("/forgetPassword", { replace: true })}
                  type="button"
                >
                  Forget Password ?
                </button>
                <RedirectToSignup />
              </motion.div>
            </form>
            <PrivacyTermsAndConditions />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Login;
