import { Wifi, Battery, Search, Plus } from "lucide-react";

const imgSrc = [
  "https://images.pexels.com/photos/4029925/pexels-photo-4029925.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/5105049/pexels-photo-5105049.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/5461379/pexels-photo-5461379.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/325045/pexels-photo-325045.jpeg?auto=compress&cs=tinysrgb&w=600",
];
const PhoneMockup = () => {
  return (
    <div className="relative hidden md:block max-w-sm mx-auto mt-10">
      {/* Phone frame */}

      <div className="bg-black rounded-[40px] border-2 h-[70vh] border-[#111]  shadow-4xl overflow-hidden">
        {/* Status bar */}
        <div className=" text-white flex justify-between items-center pt-2 px-6 pb-1">
          <span className="text-xs pt-3 font-Poppins font-semibold">
            9<span className="text-gray-400">:</span>41
          </span>

          <div className=" h-12  flex items-center justify-center  absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-xl">
            <div className="h-6 w-6 bg-bg rounded-full "></div>
          </div>
          <div className="flex items-center text-xs  gap-1">
            <Wifi size={14} strokeWidth={1} absoluteStrokeWidth />
            <Battery size={20} strokeWidth={1} absoluteStrokeWidth />
          </div>
        </div>

        {/* App content */}
        <div className=" h-[100px] w-full p-6 ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-2xl p-1 font-semibold">Chats</h2>
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Search bar */}
          <div className="bg-bg flex items-center gap-3 rounded-xl py-3 px-3 mb-5">
            <span className="text-gray-400">
              <Search size={18} />
            </span>
            <span className="text-gray-400 text-sm">Search</span>
          </div>

          {/* Contact circles */}
          <div className="flex justify-between mb-4  px-2">
            {["Caroline", "Damon", "Stefan", "Klaus"].map((name, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-18 h-18 rounded-full bg-gray-200 mb-1 overflow-hidden">
                  <img
                    src={imgSrc[index]}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/100";
                    }}
                  />
                </div>
                <span className="font-semibold text-xs">{name}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-14">
            <h2 className="text-white text-2xl p-1 font-semibold">Posts</h2>
            <div className="w-12 h-12 rounded-full border-1 border-zinc-800 flex items-center justify-center overflow-hidden">
              <Plus />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom shadow */}
      <div className="absolute bottom-0 left-0 w-full h-30 bg-gradient-to-t from-[#000] to-transparent  shadow-3xl"></div>

      {/* Connect button */}
    </div>
  );
};

export default PhoneMockup;
