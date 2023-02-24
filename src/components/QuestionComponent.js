import React, { useState, useEffect } from "react";

export default function QuestionComponent(props) {
  const [image, setImage] = useState(null);
  const [index, setIndex] = useState(props.index);

  const [disabledQuestionContainer, setDisabledQuestionContainer] =
    useState(null);
  const [shuffledQuestionsArray, setShuffledQuestionsArray] = useState(
    [
      props.incorrectAnswerOne,
      props.incorrectAnswerTwo,
      props.incorrectAnswerThree,
      props.correctAnswer,
    ].sort(() => Math.random() - 0.5)
  );
  const handleWrongOptionClicked = () => {
    setDisabledQuestionContainer(true);
  };
  const handleCorrectOptionClicked = () => {
    setDisabledQuestionContainer(false);
  };

  const correctAnswerIndex = shuffledQuestionsArray.indexOf(
    props.correctAnswer
  );
  useEffect(() => {
    if (disabledQuestionContainer === true) {
      const questionsContainer = document.getElementById(
        `questions-container${index}`
      );
      questionsContainer.innerHTML = "<div><p>Wrong answer</p></div>";
      questionsContainer.style.display = "flex";
      questionsContainer.style.justifyContent = "center";
      questionsContainer.style.backgroundColor = "red";
      questionsContainer.style.color = "Black";
      questionsContainer.style.border = "1px solid black";
      questionsContainer.style.fontWeight = "bold";
    } else if (disabledQuestionContainer === false) {
      const questionsContainer = document.getElementById(
        `questions-container${index}`
      );
      questionsContainer.innerHTML = "<p>Correct answer</p>";
      questionsContainer.style.backgroundColor = "Green";
      questionsContainer.style.display = "flex";
      questionsContainer.style.justifyContent = "center";
      questionsContainer.style.color = "Black";
      questionsContainer.style.border = "1px solid black";
      questionsContainer.style.fontWeight = "bold";
    }
  }, [disabledQuestionContainer]);
  return (
    <>
      <div className="QuestionComponent">
        <div id="image-question-container">
          <img src={props.imageSource}></img>
        </div>
        <div id="question-container">{props.questionText}</div>
        <div className="questions-container" id={`questions-container${index}`}>
          <div
            id="answer-one-container"
            onClick={() => {
              if (correctAnswerIndex === 0) {
                props.handleSettingPoints();
                handleCorrectOptionClicked();
              } else {
                handleWrongOptionClicked();
                console.log(disabledQuestionContainer);
              }
            }}
          >
            {shuffledQuestionsArray[0]}
          </div>
          <div
            id="answer-two-container"
            onClick={() => {
              if (correctAnswerIndex === 1) {
                props.handleSettingPoints();
                handleCorrectOptionClicked();
              } else {
                handleWrongOptionClicked();
              }
            }}
          >
            {shuffledQuestionsArray[1]}
          </div>
          <div
            id="answer-three-container"
            onClick={() => {
              if (correctAnswerIndex === 2) {
                props.handleSettingPoints();
                handleCorrectOptionClicked();
              } else {
                handleWrongOptionClicked();
              }
            }}
          >
            {shuffledQuestionsArray[2]}
          </div>
          <div
            id="answer-four-container"
            onClick={() => {
              if (correctAnswerIndex === 3) {
                props.handleSettingPoints();
                handleCorrectOptionClicked();
              } else {
                handleWrongOptionClicked();
              }
            }}
          >
            {shuffledQuestionsArray[3]}
          </div>
        </div>
      </div>
    </>
  );
}
