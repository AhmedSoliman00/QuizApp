const FinishScreen = ({ maxPossiblePoints, points,highScore,dispatch }) => {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <div>

    <p className="result">
      Your Score is {points} out of {maxPossiblePoints} with percentage  {" "}
      {Math.ceil( percentage )} %
    </p>
    <p className="highscore">
      Highscore: {highScore} points
    </p>
    <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "retry" })}
      >
        Retry
      </button>
    </div>
  );
};

export default FinishScreen;
