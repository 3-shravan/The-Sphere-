import React from "react";
import styles from "./Reset.module.css";
import authStyles from "../AuthComponents.module.css";
import FormContainer from "./FormContainer";
import AuthButton from "../../../components/UI/AuthButton";
import Header from "../../../components/UI/Header";
import PrivacyTermsAndConditions from "../../../components/UI/PrivacyToc";

import { Link, useParams } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import { motion } from "framer-motion";
import { RiRestartFill } from "react-icons/ri";
import { useMenu } from "../../../context/MenuContext";

const initialFormData = {
  newPassword: "",
  confirmPassword: "",
};

const ResetPassowrdViaEmail = () => {
  const { disableMenu, enableMenu } = useMenu();
  const { token } = useParams();
  const [formData, setFormData] = React.useState(initialFormData);

  React.useEffect(() => {
    disableMenu();
    return enableMenu;
  }, []);


  const { execute, loading } = useApi(
    `/resetPassword/email/${token}`,
    "PUT",
    "/login"
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    await execute(formData);
  };

  return (
    <>
      <Header />
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
