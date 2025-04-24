import React from "react";

const Wrap = ({ children }) => {
  return (
    <div className="relative  overflow-hidden ">
      <img
        src="https://images.pexels.com/photos/16811220/pexels-photo-16811220/free-photo-of-in-galleria.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        className="absolute inset-0 object-cover z-0 rounded-full w-full h-full"
      />
        {children}
    </div>
  );
};

export default Wrap;
