import React from 'react'

const Progress = ({numOfQuestions,index,points,maxPossiblePoints}) => {
  return (
    <header className="progress">
     <progress max={numOfQuestions} value={index} />
     <p>Question <strong>{index+1}</strong> \ {numOfQuestions} </p>
     <p>{points} / {maxPossiblePoints}</p>
    </header>
  )
}

export default Progress
