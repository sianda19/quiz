import React, { useState, useEffect } from "react";
import quizBlobTop from "../../images/quiz-blob-top.png";
import quizBlobBottom from "../../images/quiz-blob-bottom.png";
import Question from "./Question";
import Confetti from "react-confetti";
import useWindowSize from "./useWindowSize";
import "./Quiz.css";

const Quiz = ({ category, difficulty }) => {
  const [questions, setQuestions] = useState([]);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  let { width, height } = useWindowSize();
  const body = document.body;
  const html = document.documentElement;
  height = Math.max(
    height,
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  const getFetchURL = () => {
    let url;
    if (category !== -1 && difficulty !== "") {
      url = `https://opentdb.com/api.php?amount=5&type=multiple&category=${category}&difficulty=${difficulty}`;
    } else if (category === -1 && difficulty !== "") {
      url = `https://opentdb.com/api.php?amount=5&type=multiple&difficulty=${difficulty}`;
    } else if (category !== -1 && difficulty === "") {
      url = `https://opentdb.com/api.php?amount=5&type=multiple&category=${category}`;
    } else {
      url = "https://opentdb.com/api.php?amount=5&type=multiple";
    }
    return url;
  };

  useEffect(() => {
    if (!submitted) {
      const url = getFetchURL();
      fetch(url)
        .then((res) => res.json())
        .then((data) => setQuestions(data.results))
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  useEffect(() => {
    if (questions.length !== 0) {
      setQuestionsLoaded(true);
    }
  }, [questions]);

  const questionScore = (score) => {
    setTotalScore((prevScore) => prevScore + score);
  };

  const questionElements = questions.map((questionObj) => (
    <Question
      key={questionObj.question}
      question={questionObj.question}
      incorrectOpt={questionObj.incorrect_answers}
      correctOpt={questionObj.correct_answer}
      submitted={submitted}
      questionScore={questionScore}
    ></Question>
  ));

  function refreshPage() {
    window.location.reload(false);
  }

  const toggleSubmit = () => {
    setSubmitted((prevState) => {
      if (prevState) {
        refreshPage();
      } else {
        return true;
      }
    });
  };

  return (
    <main className="quiz-section">
      {submitted && totalScore === 5 && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={300}
          initialVelocityY={20}
        />
      )}
      {/* <pre>{JSON.stringify(questions, null, 2)}</pre> */}
      <img className="top" src={quizBlobTop} alt="page design element"></img>

      {questionsLoaded ? (
        [...questionElements]
      ) : (
        <div className="fetching">
          <h1>Fetching your questions...</h1>
        </div>
      )}
      <div className="submit-section">
        {submitted && <h2>You scored {totalScore}/5 correct answers</h2>}
        {questionsLoaded && (
          <button className="submit-quiz" onClick={toggleSubmit}>
            {submitted ? "Play Again" : "Check Answers"}
          </button>
        )}
      </div>

      <img
        className="bottom"
        src={quizBlobBottom}
        alt="page design element"
      ></img>
    </main>
  );
};

export default Quiz;
