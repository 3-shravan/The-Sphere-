import { Eye, Heart, MessageSquare, Moon, Send } from "lucide-react";

const Post = () => {
  return (
    <div className="absolute left-30 min-w-64 bg-black/40 bottom-0 backdrop-blur-md rounded-3xl p-3 z-10">
      <div className="w-full h-36 rounded-2xl overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1572878/pexels-photo-1572878.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Profile"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="flex justify-between items-center px-2 py-1">
        <p className=" text-xs font-[Gilroy] text-end ">ALICE</p>

        <div className="flex items-center gap-1 ">
          <div className="w-8 h-8 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-blue-950" />
          </div>
          <p className="text-white text-xs">1.2k</p>
        </div>

        <div className="flex items-center gap-1 ">
          <div className="w-8 h-8 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-white text-xs">2 MILLION</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
