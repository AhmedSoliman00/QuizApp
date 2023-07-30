import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
export default function App() {
  const initialState = {
    questions: [],

    // error ,ready ,active ,finished
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    seconds: null,
  };
  let SEC_PER_Q = 30
  const [
    { questions, status, index, answer, points, highScore, seconds },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, questions: action.payload, status: "ready" ,seconds:state.questions.length * SEC_PER_Q };
      case "dataFaild":
        return { ...state, status: "Error" };
      case "start":
        return { ...state, status: "active" };
      case "newAnswer":
        const question = state.questions.at(state.index); //current question that the user clicked
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      case "nextQuestion":
        return { ...state, index: state.index + 1, answer: null };
      case "finish":
        return {
          ...state,
          status: "finished",
          highScore:
            state.points > state.highScore ? state.points : state.highScore,
        };
      case "retry":
        return {
          ...initialState,
          status: "ready",
          questions: state.questions,
        };
      case "ticktick":
        return {
          ...state,
          seconds: state.seconds - 1,
          status: state.seconds === 0 ? "finished" : state.status,
        };

      default:
        throw new Error("Action unknown");
    }
  }

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numOfQuestions={numOfQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              numOfQuestions={numOfQuestions}
              index={index}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
            <Footer>
              <Timer dispatch={dispatch} seconds={seconds}></Timer>
              <NextQuestion
                numOfQuestions={numOfQuestions}
                index={index}
                answer={answer}
                dispatch={dispatch}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            dispatch={dispatch}
            highScore={highScore}
            maxPossiblePoints={maxPossiblePoints}
            points={points}
          />
        )}
      </Main>
    </div>
  );
}
