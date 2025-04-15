import styles from "./style.module.css";
import authStyles from "@features/auth/shared/auth.module.css";
import FormContainer from "./components/FormContainer";
import PrivacyTermsAndConditions from "@components/common/PrivacyToc";
import Header from "@components/UI/Header";
import { AuthButton } from "../shared";
import { useApi } from "@hooks";
import { useMenu } from "@context";
import {
  useState,
  useEffect,
  Link,
  useParams,
  motion,
  RiRestartFill,
} from "@lib";

const ResetPasswordViaPhone = () => {
  const { disableMenu, enableMenu } = useMenu();
  const [formData, setFormData] = useState(ResetPasswordFormDataPhone);
  const params = useParams();
  const { execute, loading } = useApi("/resetPassword/phone", "PUT", "/login");

  useEffect(() => {
    disableMenu();
    return enableMenu;
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    let reqData = { ...formData, phone: params.phoneNumber };

    await execute(reqData);
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
        <form
          action=""
          className={styles.formContainer}
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
        </form>
        <PrivacyTermsAndConditions />
      </motion.div>
    </>
  );
};

export default ResetPasswordViaPhone;
