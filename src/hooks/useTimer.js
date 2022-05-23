import { useEffect, useState } from "react";

export const useTimer = (finishTime, stop) => {
  const [currTime, setCurrTime] = useState(new Date());
  const isTimeUp = currTime >= finishTime;

  if (finishTime && isTimeUp) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      isTimeUp: true,
    };
  }

  console.log(stop);

  useEffect(() => {
    if (stop) {
      return;
    }
    const interval = setInterval(() => {
      setCurrTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [setCurrTime, stop]);

  return {
    hours: new Date(finishTime - currTime).getHours(),
    minutes: new Date(finishTime - currTime).getMinutes(),
    seconds: new Date(finishTime - currTime).getSeconds(),
    timeRemaining: finishTime - currTime,
  };
};
