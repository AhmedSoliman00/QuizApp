const NextQuestion = ({ dispatch, answer, numOfQuestions, index }) => {
  if (answer === null) return null;
  if (index + 1 < numOfQuestions)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
    if (index + 1 === numOfQuestions)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
};

export default NextQuestion;
