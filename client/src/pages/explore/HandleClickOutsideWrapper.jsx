import { useEffect, useRef } from "react";

const ClickOutsideWrapper = ({ onClickOutside, children }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClickOutside?.(); // Call the callback if provided
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClickOutside]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default ClickOutsideWrapper;
