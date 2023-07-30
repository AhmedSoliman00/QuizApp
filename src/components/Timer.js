import { useEffect } from "react";

const Timer = ({ seconds, dispatch }) => {
  const minuts = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "ticktick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <p className="timer">
      {minuts < 10 && "0"}
      {minuts}:{sec < 10 && "0"}
      {sec}
    </p>
  );
};

export default Timer;
