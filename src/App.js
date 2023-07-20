import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
export default function App() {
  const initialState = {
    questions: [],

    // error ,ready ,active ,finished
    status: "loading",
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err)=> dispatch({type:"dataFaild "}))
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
    <div className="App">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}
