import { useState, useEffect } from "react";
import { padDate } from "core/utils/dateHelpers";

export default function Timer({ color }) {
  const [seconds, setSeconds] = useState("00");
  const [hrs, setHrs] = useState("00");
  const [mins, setMins] = useState("00");

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();

      const secs = date.getSeconds() + 1;
      setHrs(date.getHours());
      setMins(date.getMinutes());

      setSeconds(secs);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <span style={{ color: color || "#fff", fontWeight: "bold" }}>
      {padDate(hrs)} : {padDate(mins)} : {padDate(seconds)}
    </span>
  );
}
