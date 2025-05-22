import Feed from "../components/Feed";
import { useAuth } from "@/context";
import SuggestedUsers from "../components/SuggestedUsers";

const Home = () => {
  const { auth } = useAuth();
  return (
    <div 
   
    className="flex flex-col flex-1 overflow-hidden md:bg-muted rounded-4xl m-2 md:border-1 md:border-muted-foreground">
      <div className="flex items-center  gap-10 px-2 md:px-3 pt-3 justify-between w-[95%]">
        <span className="px-3 text-sm font-mono hidden md:block text-neutral-500">
          {" "}
          11:11{" "}
        </span>
        <span className=" md:hidden text-xs font-Poppins   text-neutral-200  ">
          whats been up,{" "}
          <span className="text-indigo-200">{auth?.profile?.name}</span>
        </span>
        <div className=" hidden md:block text-xl font-bold flex items-center  leading-tight font-mono tracking-tighter md:text-sm md:font-extralight md:leading-tight md:tracking-tighter md:px-4 md:py-2 md:w-auto w-full  ">
          <img
            src={auth?.profile?.profilePicture}
            alt=""
            className="w-6 h-6 rounded-full inline "
          />
          <span className="font-Poppins font-semibold text-medium px-2 text-foreground  ">
            {/* {auth?.profile?.name} */}
            Shravan Yadav
          </span>
        </div>
      </div>

      <div className=" flex justify-center items-center md:min-w-[50vw] ">
        <Feed />
        <div className=" hidden md:block rounded-3xl mr-4 w-full h-full ">
          <SuggestedUsers />
        </div>
      </div>
    </div>
  );
};

export default Home;
