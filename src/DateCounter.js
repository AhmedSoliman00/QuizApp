import { useReducer } from "react";

function DateCounter() {
  const initialState = { count: 0, step: 1 };
  function counter(state, action) {

    console.log(state, action);
    switch (action.type) {
      case `inc`:
        return { ...state, count: state.count + state.step };
      case `dec`:
        return { ...state, count: state.count - state.step };
      case "setNumber":
        return { ...state, count: action.payload };
      case "setStep":
        return { ...state, step: action.payload };
      case "reset":
        return initialState  
      default:
        return action.payload;
    }
  }
  const [state, dispatch] = useReducer(counter, initialState);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    dispatch({ type: "dec" });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: "inc" });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({type:'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    dispatch({type:"reset"})
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
