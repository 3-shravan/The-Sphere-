import "@styles/auth.css"
import { useMenu } from "@context"
import authStyles from "@features/auth/shared/auth.module.css"
import { useApi } from "@hooks"
import { RiRestartFill } from "@lib"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ResetPasswordFormData } from "@/utils"
import { AuthButton, TermsCond } from "../shared"
import FormContainer from "./components/FormContainer"

const ResetPasswordViaPhone = () => {
  const { disableMenu, enableMenu } = useMenu()
  const [formData, setFormData] = useState(ResetPasswordFormData)
  const { phoneNumber } = useParams()
  const { request, loading } = useApi()

  useEffect(() => {
    disableMenu()
    return enableMenu
  }, [disableMenu, enableMenu])

  const submitHandler = async (e) => {
    e.preventDefault()

    await request({
      endpoint: `/auth/reset-password/phone/${phoneNumber}`,
      method: "PUT",
      body: formData,
      redirectUrl: "/login",
    })
  }
  return (
    <div className="main">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, ease: "linear" }}
        className="auth-container reset"
      >
        <form
          action=""
          className="auth-form auth-form-transparent"
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
            icon={<RiRestartFill className="pl-1 text-black text-md" />}
          />
          <Link to="/login" className={authStyles.secondaryButton}>
            Want to login ?
          </Link>
        </form>
        <TermsCond />
      </motion.div>
    </div>
  )
}

export default ResetPasswordViaPhone
