import styles from "@features/auth/shared/auth.module.css"
import { FaPlus, TbNumber91Small } from "@lib"
import { motion } from "framer-motion"

const ViaPhone = ({ handleChange, formData }) => {
  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, ease: "circIn" }}
    >
      <div className={styles.inputWrapper}>
        <FaPlus className="absolute left-2 mx-auto h-7 border-zinc-700 pr-2 text-sm text-zinc-300" />
        <TbNumber91Small className="absolute left-2.5 mx-auto h-7 border-zinc-700 border-r-1 pr-1 text-3xl text-zinc-300" />
        <input
          type="number"
          placeholder=" Phone Number"
          name="phone"
          value={formData.phone}
          onChange={(e) => handleChange(e)}
          className={styles.inputField}
        />
      </div>
    </motion.div>
  )
}

export default ViaPhone
