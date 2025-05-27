import { useNavigate } from "@lib";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const NonExistRoutes = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-950 text-white px-4">
      <motion.h1
        className="text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-lg mb-8 text-white/25 font-bold font-[Gilroy] leading-5 text-center max-w-md"
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
        <Button
          onClick={() => navigate("/")}
          className=" bg-amber-200 text-black/90 text-sm hover:bg-amber-50 px-6 py-2 rounded-md"
        >
          Go Home
        </Button>
      </motion.div>
    </div>
  );
};

export default NonExistRoutes;
