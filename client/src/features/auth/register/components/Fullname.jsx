import styles from "@features/auth/shared/auth.module.css";
import { CgProfile, MdNavigateNext, motion, useEffect, useRef } from "@lib";
import { CircleCheckBig } from "lucide-react";
import { GiCrossMark } from "react-icons/gi";
import { Spinner } from "@/components";
import { useUsernameAvailability } from "@/shared";
import { AuthButton } from "../../shared";
import RedirectToLogin from "./RedirectToLogin";

const Fullname = ({ handleNext, formData, handleChange }) => {
	const inputRef = useRef(null);
	const { status, message } = useUsernameAvailability(formData.name);

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleNext();
		}
	};

	useEffect(() => {
		inputRef.current.focus();
	}, []);
	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.1, ease: "linear" }}
			>
				<h1 className={styles.heading1}>Create New Account</h1>
				<h1 className={` ${styles.heading2}`}>Join today!</h1>
				<h2 className={styles.inputName}>Your username ?</h2>
				<div className={styles.inputWrapper}>
					<CgProfile className="text-3xl absolute left-2.5 text-zinc-300 pr-2  border-zinc-700 h-7 mx-auto" />
					<input
						ref={inputRef}
						type="text"
						placeholder=" e.g johndoe"
						name="name"
						value={formData.name}
						onChange={(e) => handleChange(e)}
						onKeyDown={handleKeyDown}
						className={styles.inputField}
						autoCapitalize="none"
						autoComplete="off"
						autoCorrect="off"
						spellCheck="false"
					/>
				</div>
				{status && (
					<p
						className={`mt-1 font-Gilroy text-xs text-left pl-2 min-h-[1.25rem] font-medium
              ${status === "unavailable" && "text-rose-500"}
              ${status === "available" && "text-emerald-400"}`}
					>
						{status === "checking" ? (
							<span className="flex items-center gap-2">
								Checking if username available
								<Spinner size="2" />
							</span>
						) : (
							<span className="flex items-center gap-1">
								{message}
								{status === "available" ? (
									<CircleCheckBig className=" text-emerald-600" size={12} />
								) : (
									<GiCrossMark className="inline text-rose-500 text-sm" />
								)}
							</span>
						)}
					</p>
				)}
			</motion.div>
			<AuthButton
				handleNext={status === "available" && handleNext}
				text="Next"
				type="button"
				register={true}
				icon={<MdNavigateNext />}
			/>
			<RedirectToLogin />
		</>
	);
};

export default Fullname;
