import { useEffect, useState } from "react";
let sound = require("url:../audio/Clock-sound-effect.mp3");
import { timeToString } from "../utils/utils";
export const useTimer = ({
  startTime,
  setStartTime,
  finishTime,
  setFinishTime,
  stopTimer,
  setStopTimer,
  mode,
  setMode,
}) => {
  const isTimeUp = startTime >= finishTime;
  const timeRemaining = isTimeUp ? 0 : finishTime - startTime;
  const [audio] = useState(new Audio(sound));

  const minutes = timeToString(new Date(finishTime - startTime).getMinutes());
  const seconds = timeToString(new Date(finishTime - startTime).getSeconds());

  useEffect(() => {
    if (stopTimer) {
      return;
    }

    if (isTimeUp) {
      setStopTimer(true);

      audio.play();

      setTimeout(() => {
        audio.pause();
      }, 1500);

      if (mode === "work") {
        setMode("break");
        setStartTime(new Date());
        setFinishTime(new Date(new Date().getTime() + 5 * 60000));
      } else {
        setMode("work");
        setStartTime(new Date());
        setFinishTime(new Date(new Date().getTime() + 25 * 60000));
      }
    }

    const interval = setInterval(() => {
      setStartTime(new Date(startTime.getTime() + 1000));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [stopTimer, startTime, setStartTime, finishTime]);

  return {
    minutes,
    seconds,
    timeRemaining,
  };
};
