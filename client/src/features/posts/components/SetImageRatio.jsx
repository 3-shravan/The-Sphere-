import { useState } from "react";

const SetImageRatio = ({ src }) => {
  const [aspectClass, setAspectClass] = useState("aspect-[1/1]");

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    const ratio = naturalWidth / naturalHeight;

    let newAspect;
    if (Math.abs(ratio - 1) < 0.1) newAspect = "aspect-[1/1]";
    // else if (Math.abs(ratio - 3 / 4) < 0.1) newAspect = "aspect-[3/4]";
    else if (Math.abs(ratio - 4 / 3) < 0.1) newAspect = "aspect-[4/3]";
    // else if (Math.abs(ratio - 2 / 3) < 0.1) newAspect = "aspect-[2/3]";
    else if (Math.abs(ratio - 3 / 2) < 0.1) newAspect = "aspect-[3/2]";
    else newAspect = "aspect-[3/4] md:aspect-[1/1]"; // fallback to default 2:3

    setAspectClass(newAspect);
  };

  return (
    <div
      className={` w-full md:max-w-[55vw] lg:w-[45vw] overflow-hidden rounded-xl  ${aspectClass}`}
    >
      <img
        src={src}
        alt="post"
        onLoad={handleImageLoad}
        className="w-full h-full object-cover cursor-pointer"
      />
    </div>
  );
};

export default SetImageRatio;
