import React from "react";
import categoryData from "./categoryData";
import "./Category.css";

const Category = (props) => {
  const difficultyChoices = [
    { title: "easy" },
    { title: "medium" },
    { title: "hard" },
  ];

  const setStyles = (state, value) => {
    const styles = {};
    if (state === value) {
      styles.bgColor = "#d6dbf5";
      styles.borderColor = "#d6dbf5";
    } else {
      styles.bgColor = "#f5f7fb";
      styles.borderColor = "#4d5b9e";
    }
    return styles;
  };

  const difficultyElements = difficultyChoices.map((obj) => (
    <button
      value={obj.title}
      style={{
        backgroundColor: setStyles(props.difficulty, obj.title).bgColor,
        borderColor: setStyles(props.difficulty, obj.title).borderColor,
      }}
      onClick={() => props.setDifficulty(obj.title)}
      key={obj.title}
    >{`${obj.title[0].toUpperCase()}${obj.title.slice(1)}`}</button>
  ));

  const categoryElements = categoryData.map((buttonObj) => (
    <button
      key={buttonObj.id}
      value={buttonObj.id}
      style={{
        backgroundColor: setStyles(props.category, buttonObj.id).bgColor,
        borderColor: setStyles(props.category, buttonObj.id).borderColor,
      }}
      onClick={() => props.setCategory(buttonObj.id)}
    >
      {buttonObj.title}
    </button>
  ));

  return (
    <div className="category-section">
      <div className="category-choices">
        <h2>Choose a category</h2>
        {categoryElements}
      </div>
      <div className="difficulty-choices">
        <h2>Choose a difficulty</h2>
        {difficultyElements}
      </div>
      <button id="start-quiz" onClick={props.startQuiz}>
        Let's Go!
      </button>
    </div>
  );
};

export default Category;
