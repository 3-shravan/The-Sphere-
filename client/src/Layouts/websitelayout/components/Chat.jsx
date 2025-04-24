import { Send } from "lucide-react";
import Wrap from "./Wrap";

const Chat = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="absolute bottom-30 font-[Poppins] right-30 w-70 h-42 bg-black/40 backdrop-blur-md border border-gray-600 rounded-3xl px-4 py-2 z-10">
      <div className="flex items-center gap-2 py-3">
        <img
          src="https://images.unsplash.com/photo-1676732331165-61bd1e55494a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="text-white font-medium">Violet Baker</p>
      </div>

      <div className="space-y-2">
        <div className="bg-gray-200/90 backdrop-blur-md rounded-2xl pt-2 px-2 max-w-[70%]">
          <p className="text-black font-semibold text-xs">
            Hi! What's plan for today?
          </p>
          <p className=" text-xs py-1 text-right">11:11</p>
        </div>

        <div className="flex justify-end">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl  border-l border-r border-violet-700 p-2 max-w-[80%] flex items-center gap-2">
            <p className="text-white text-xs">
              its {daysOfWeek[new Date().getDay()]}..lets
            </p>
            <Send className="w-3 h-3 text-yellow-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
