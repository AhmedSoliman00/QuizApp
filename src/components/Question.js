import Options from "./Options";
const Question = ({ question, dispatch, answer }) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options dispatch={dispatch} answer={answer} question={question} />
    </div>
  );
};

export default Question;
