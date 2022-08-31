import { useState, useEffect } from "react";

function Time() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]); //eslint-disable-line

  return <div className="current-time">{time}</div>;
}
export default Time;
