import { FaGithub, FaLinkedin, FaTwitter, FaUserAstronaut } from "@lib";
import { motion } from "framer-motion";
import { HeartIcon } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

export default function Menu() {
	return (
		<motion.div
			initial={{ y: -800, opacity: 1 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: -800, opacity: 0 }}
			transition={{
				delay: 0.1,
				duration: 1,
				ease: "anticipate",
			}}
			className="relative flex flex-col justify-center items-center  min-h-screen font-Gilroy z-10 px-5"
		>
			<div className="flex flex-col items-center justify-center  text-center h-[65vh] ">
				<FaUserAstronaut className="text-9xl text-emerald-600 animate-pulse mb-4" />
				<div className="text-lg text-white/35  tracking-wide drop-shadow-lg">
					developed by <HeartIcon className="inline " size={17} color="red" />{" "}
					<br />
					<span className="font-bold text-white text-xl">Shravan </span>
				</div>
				<p className="text-sm text-neutral-700 font-medium mt-2">
					Crafting with code & creativity
				</p>

				<div className="flex gap-6 mt-4 text-white/80">
					<a
						href="https://github.com/3-shravan"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-emerald-400 transition duration-200"
					>
						<FaGithub size={24} />
					</a>
					<a
						href="https://linkedin.com/in/shravan"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-emerald-400 transition duration-200"
					>
						<FaLinkedin size={24} />
					</a>
					<a
						href="https://x.com/__9teen_"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-emerald-400 transition duration-200"
					>
						<FaTwitter size={24} />
					</a>
					<a
						href="https://instagram.com/03_shravan"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-emerald-400 transition duration-200"
					>
						<FaInstagram size={24} />
					</a>
				</div>
			</div>

			<span className="absolute bottom-1 text-xs text-yellow-100">
				Copyright © 2025
			</span>
		</motion.div>
	);
}
