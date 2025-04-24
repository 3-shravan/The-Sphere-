import React from "react";
import { Eye, Heart, MessageSquare, Moon, Send } from "lucide-react";
import Wrap from "./Wrap";

const Bar = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center absolute top-25 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-4  px-8 h-full z-10 ">
      <Wrap>
        <div className="flex items-center gap-2 bg-black/50 border border-green-200 backdrop-blur-xs rounded-full py-2 px-2.5">
          <div className="w-8 h-8 rounded-full  overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542458579-bc6f69b5ce6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-white text-sm">MARI HAS JOINED</p>
        </div>
      </Wrap>
      <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-green-200 rounded-full py-2 px-2.5">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542458579-bc6f69b5ce6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-white text-sm">DAMON got new message</p>
      </div>

      <div className="flex gap-4">
        <button className="w-10 h-10 border border-green-200 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center">
          <Moon className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Bar;

