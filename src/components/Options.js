const Options = ({ question, dispatch, answer }) => {
  const hasAnswerd = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          disabled={hasAnswerd}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswerd ? index === question.correctOption ? "correct" : "wrong" : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
