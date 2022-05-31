export function timeToString(time) {
  if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
}

export function newFinishTime({ displayMinutes = 25, displaySeconds = 0 }) {
  return new Date(
    new Date().getTime() + displayMinutes * 60000 + displaySeconds * 1000
  );
}

export function changeTime({
  type,
  time,
  setCustomTime,
  setDisplayMinutes,
  setDisplaySeconds,
  setStartTime,
  setFinishTime,
  displayMinutes,
  displaySeconds,
}) {
  setCustomTime(true);
  setStartTime(new Date());

  if (type === "minutes") {
    setDisplayMinutes(time);
    setFinishTime(
      new Date(new Date().getTime() + time * 60000 + displaySeconds * 1000)
    );
  } else {
    setDisplaySeconds(time);
    setFinishTime(
      new Date(new Date().getTime() + displayMinutes * 60000 + time * 1000)
    );
  }
}

export function startStopTimer(
  timeRemaining,
  stopTimer,
  setStop,
  setCustomTime,
  setStartTime,
  setFinishTime,
  displayMinutes,
  displaySeconds
) {
  if (timeRemaining === 0) {
    setStop(false);
    setCustomTime(false);
    setStartTime(new Date());
    setFinishTime(newFinishTime({ displayMinutes, displaySeconds }));
    return;
  }

  setStop(!stopTimer);
}

export function resetTimer(
  setStop,
  setCustomTime,
  setStartTime,
  setFinishTime,
  displayMinutes,
  displaySeconds
) {
  setStop(true);
  setCustomTime(true);

  setStartTime(new Date());
  setFinishTime(newFinishTime({ displayMinutes, displaySeconds }));
}

export function skip(
  setStop,
  setCustomTime,
  mode,
  setMode,
  setStartTime,
  setFinishTime
) {
  setStop(true);
  setCustomTime(true);

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
