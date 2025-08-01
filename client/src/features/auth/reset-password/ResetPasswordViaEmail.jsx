import React from "react";
import styles from "./style.module.css";
import authStyles from "@features/auth/shared/auth.module.css";
import FormContainer from "./components/FormContainer";
import { Header } from "@components";
import { AuthButton, PrivacyTermsAndConditions } from "../shared";
import { useApi } from "@hooks";
import { useMenu } from "@context";
import { Link, useParams, motion, RiRestartFill } from "@lib";
import { ResetPasswordFormData } from "@utils";

const ResetPassowrdViaEmail = () => {
  const { disableMenu, enableMenu } = useMenu();
  const { token } = useParams();
  const [formData, setFormData] = React.useState(ResetPasswordFormData);

  React.useEffect(() => {
    disableMenu();
    return enableMenu;
  }, []);

  const { request, loading } = useApi();

  const submitHandler = async (e) => {
    e.preventDefault();

    await request({
      endpoint: `auth/reset-password/email/${token}`,
      method: "PUT",
      body: formData,
      redirectUrl: "/login",
    });
  };
  return (
    <>
      {/* <Header /> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, ease: "linear" }}
        className={styles.container}
      >
        <motion.form
          action=""
          className={styles.formContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, ease: "linear" }}
          onSubmit={(e) => submitHandler(e)}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, ease: "linear" }}
            className={authStyles.heading1}
          >
            Create new password.
          </motion.h1>
          <div className={authStyles.space4vh}></div>

          <FormContainer formData={formData} setFormData={setFormData} />
          <div className={authStyles.space1vh}></div>

          <AuthButton
            text="Reset"
            type="submit"
            loading={loading}
            icon={<RiRestartFill className="text-md pl-1 text-black" />}
          />

          <Link to="/login" className={authStyles.secondaryButton}>
            Want to login ?
          </Link>
        </motion.form>
        <PrivacyTermsAndConditions />
      </motion.div>
    </>
  );
};

export default ResetPassowrdViaEmail;
