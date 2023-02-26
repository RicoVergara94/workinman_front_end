import React, { useState, useEffect } from "react";
import QuestionComponent from "./QuestionComponent";

export default function GameComponent(props) {
  const [records, setRecords] = useState([]);

  const [points, setPoints] = useState(0);

  const handleSettingPoints = () => {
    setPoints((prev) => prev + 1);
  };

  useEffect(() => {
    const controller = new AbortController();
    fetch(`http://localhost:3232/get-game?username=${props.username}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.difficulty_level - b.difficulty_level);
        setRecords(data);
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <div id="points-container">
        <p id="points-paragraph">Number of points: {points}</p>
      </div>
      <div id="question-blocks">
        {records &&
          records.map((record, index) => {
            return (
              <QuestionComponent
                imageSource={record.imageUrl}
                questionText={record.question_text}
                incorrectAnswerOne={record.incorrect_answer1}
                incorrectAnswerTwo={record.incorrect_answer2}
                incorrectAnswerThree={record.incorrect_answer3}
                correctAnswer={record.correct_answer}
                handleSettingPoints={handleSettingPoints}
                index={index}
              />
            );
          })}
      </div>
    </>
  );
}
