import { useLogout } from "@hooks";
import { motion } from "@lib";
import { useAuth } from "@context";
import { Loader } from "@components";
import { LogoutNTheme } from "./components";

const Feed = () => {
  const { auth } = useAuth();
  const { loading } = useLogout();

  return loading ? (
    <Loader />
  ) : (
    <div className=" h-screen font-thin bg-background text-muted flex flex-col justify-center items-center text-m font-Poppins">
      <h1 className="text-xl ">Welcome</h1>
      <h1 className=" text-3xl  border-l-2 text-foreground  px-1 ml-2 border-accent-foreground  font-sans">
        {auth?.profile?.name}.
      </h1>

      <div className="flex items-center justify-center gap-2 mt-10">
        <LogoutNTheme />
      </div>
    </div>
  );
};

export default Feed;
