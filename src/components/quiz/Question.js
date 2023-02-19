import React, { useEffect, useState } from "react";
import "./Question.css";

const Question = (props) => {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [options] = useState(
    shuffleArray([...props.incorrectOpt, props.correctOpt])
  );

  useEffect(() => {
    if (props.submitted) {
      if (selectedAnswer === props.correctOpt) {
        props.questionScore(1);
      } else {
        props.questionScore(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.submitted]);

  const handleOptionClick = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const parser = new DOMParser();
  const parse = (str) => {
    return parser.parseFromString(`<!doctype html><body>${str}`, "text/html")
      .body.textContent;
  };

  const setStyles = (value) => {
    const styles = {};
    styles.disabled = false;
    if (!props.submitted) {
      if (selectedAnswer === value) {
        styles.bgColor = "#d6dbf5";
        styles.borderColor = "#d6dbf5";
      } else {
        styles.bgColor = "#f5f7fb";
        styles.borderColor = "#4d5b9e";
      }
    } else {
      if (value === props.correctOpt) {
        styles.bgColor = "#41ed3b";
      } else if (value !== selectedAnswer) {
        styles.disabled = true;
        styles.bgColor = "f5f7fb";
      } else {
        styles.disabled = true;
        styles.bgColor = "#f8bcbc";
      }
    }
    return styles;
  };

  const optionElements = options.map((option) => (
    <button
      key={option}
      value={option}
      onClick={handleOptionClick}
      disabled={setStyles(option).disabled}
      style={{
        backgroundColor: setStyles(option).bgColor,
        borderColor: setStyles(option).borderColor,
      }}
    >
      {parse(option)}
    </button>
  ));

  return (
    <div className="question">
      <h2>{parse(props.question)}</h2>
      <div className="options-section">{optionElements}</div>
    </div>
  );
};

export default Question;
