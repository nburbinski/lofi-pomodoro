import { useState } from "react";
import { useTimer } from "../hooks/useTimer";

const Timer = ({ stop }) => {
  const [finishTime, setFinishTime] = useState(
    new Date(new Date().getTime() + 25 * 60000)
  );

  const { minutes, seconds, timeRemaining } = useTimer(finishTime, stop);
  return (
    <div>
      <h1>{`${minutes == 0 ? "00" : minutes} : ${
        seconds == 0 ? "00" : seconds
      }`}</h1>
    </div>
  );
};

export default Timer;
