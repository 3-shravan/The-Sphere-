import { useDebounce } from "@/hooks";
import { useEffect, useState } from "react";

export default function useUsernameAvailability(value) {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const debouncedUsername = useDebounce(value, 500);

  useEffect(() => {
    if (!debouncedUsername) {
      setStatus(null);
      setMessage("");
      return;
    }

    const checkAvailability = async () => {
      try {
        setStatus("checking");
        const res = await fetch(
          `http://localhost:8000/api/v1/auth/check-username?username=${debouncedUsername}`
        );
        const data = await res.json();
        if (data.available) setStatus("available");
        else setStatus("unavailable");
        setMessage(data.message || "");
      } catch (err) {
        setStatus("error");
        setMessage("Something went wrong.");
      }
    };

    checkAvailability();
  }, [debouncedUsername]);

  return { status, message };
}
