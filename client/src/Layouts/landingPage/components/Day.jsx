import React, { useState, useEffect } from "react";

const Day = () => {
  const [dateTime, setDateTime] = useState({
    day: "",
    time: "",
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const days = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
      ];
      const day = days[now.getDay()];
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setDateTime({ day, time });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center text-center ">
      <p className="text-lg font-bold text-green-200">{dateTime.day} •</p>
    </div>
  );
};

export default Day;
