import { useState } from "react";
import { useTimer } from "../hooks/useTimer";
import Button from "./Button";
import { changeTime, startStopTimer, resetTimer, skip } from "../utils/utils";

const Timer = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [finishTime, setFinishTime] = useState(
    new Date(new Date().getTime() + 25 * 60000)
  );
  const [stopTimer, setStopTimer] = useState(true);
  const [customTime, setCustomTime] = useState(false);
  const [displayMinutes, setDisplayMinutes] = useState("25");
  const [displaySeconds, setDisplaySeconds] = useState("00");
  const [mode, setMode] = useState("work");

  const { minutes, seconds, timeRemaining } = useTimer({
    startTime,
    setStartTime,
    finishTime,
    setFinishTime,
    stopTimer,
    setStopTimer,
    mode,
    setMode,
  });

  return (
    <div>
      <p>Set Timer</p>
      <p>Time to {mode}</p>
      <input
        id="minutes"
        type="number"
        max="59"
        min="0"
        value={displayMinutes}
        onChange={(e) =>
          changeTime(
            e.target.value,
            "minutes",
            setStopTimer,
            setCustomTime,
            setDisplayMinutes,
            setDisplaySeconds
          )
        }
      ></input>
      <input
        id="seconds"
        type="number"
        maxLength={2}
        max={59}
        min={0}
        value={displaySeconds}
        onChange={(e) =>
          changeTime(
            e.target.value,
            "seconds",
            setStopTimer,
            setCustomTime,
            setDisplayMinutes,
            setDisplaySeconds
          )
        }
      ></input>
      <Button
        onClick={() =>
          startStopTimer(
            timeRemaining,
            stopTimer,
            setStopTimer,
            setCustomTime,
            setStartTime,
            setFinishTime,
            displayMinutes,
            displaySeconds,
            customTime
          )
        }
      >
        {stopTimer ? "Start" : "Stop"}
      </Button>{" "}
      <Button
        onClick={() =>
          resetTimer(
            setStopTimer,
            setCustomTime,
            setStartTime,
            setFinishTime,
            displayMinutes,
            displaySeconds
          )
        }
      >
        Reset
      </Button>{" "}
      <Button
        onClick={() =>
          skip(
            setStopTimer,
            setCustomTime,
            mode,
            setMode,
            setStartTime,
            setFinishTime
          )
        }
      >
        Skip
      </Button>
      <h1>{`${minutes} : ${seconds}`}</h1>
    </div>
  );
};

export default Timer;
