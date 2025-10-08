import { useNavigate } from "@lib";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

export default function NonExistRoutes() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen w-full flex flex-col justify-center items-center  text-third px-4">
			<motion.h1
				className="text-6xl font-bold mb-4"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				404
			</motion.h1>
			<motion.p
				className="text-3xl mb-8 font-medium  text-neutral-700 font-Poppins uppercase leading-8 text-center max-w-xl"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
			>
				The page you’re looking for doesn’t exist or has been moved.
			</motion.p>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
			>
				<Button onClick={() => navigate(-1)} variant="outline">
					Go Home
				</Button>
			</motion.div>
		</div>
	);
}
