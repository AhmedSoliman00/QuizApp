import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
export default function App() {
  const initialState = {
    questions: [],
    
    // error ,ready ,active ,finished
    status: "loading",
  }
  const [{questions,status}, dispatch] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }))
  }, []);
  

  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataFaild":
        return {...state,status:"Error"}  
      default:
        throw new Error("Action unknown");
    }
  }
  
  return (
    <div className="app">
      <Header />
      <Main>
        {status==="loading"&&<Loader />}
        {status==="Error"&&<Error />}
        {status==="ready"&&<StartScreen numOfQuestions = {numOfQuestions} />}
      </Main>
    </div>
  );
}
