import React from "react";

const Message = () => {
  return (
    <div className="absolute top-20 left-50 font-[Poppins] border border-gray-600  bg-black/40 backdrop-blur-md rounded-3xl px-6 py-4 z-10">
      <h2 className="text-white py-4 font-medium">UNREAD</h2>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1676732331165-61bd1e55494a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-white text-sm font-medium">Davis Dean</p>
            <p className="text-gray-600 text-xs truncate">
              Idk why it doesn't w...
            </p>
          </div>
          <span className="text-gray-300 text-xs">11:11</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
