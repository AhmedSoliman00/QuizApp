import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
export default function App() {
  const initialState = {
    questions: [],

    // error ,ready ,active ,finished
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
  };
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numOfQuestions = questions.length;
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, questions: action.payload, status: "ready" };
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
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
            <NextQuestion answer={answer} dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}
