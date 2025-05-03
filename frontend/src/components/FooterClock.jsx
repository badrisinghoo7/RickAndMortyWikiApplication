import React, { useEffect, useState } from "react";

export default function FooterClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString();
      const dateStr = now.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setTime(`${timeStr} ${dateStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <footer className="footer-clock">{time}</footer>;
}
