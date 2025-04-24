import { Send } from "lucide-react";

const Connect = () => {
  return (
    <div className="absolute left-10 bottom-60 w-64 border-1 border-zinc-500 bg-bg backdrop-blur-md rounded-4xl px-5 py-3 ">
      <h2 className=" text-m font-[Poppins]  ">Connect</h2>

      <div className="flex justify-center gap-1 py-2">
        <div className="w-30 h-12 rounded-2xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/4310726/pexels-photo-4310726.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Profile"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <button className="w-full py-2 bg-black rounded-full text-white text-sm flex font-[Gilroy] items-center justify-center gap-1">
        Send message <Send className="w-3 h-3" />
      </button>
    </div>
  );
};

export default Connect;
