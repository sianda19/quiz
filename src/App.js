import React, { useState } from "react";
import Homepage from "./components/Homepage";
import Quiz from "./components/quiz/Quiz";
import "./App.css";
import Category from "./components/Category";

const App = () => {
  const [isHomeVisible, setIsHomeVisible] = useState(true);
  const [isCategoryVisible, setisCategoryVisible] = useState(false);
  const [category, setCategory] = useState(-1);
  const [difficulty, setDifficulty] = useState("");

  const showCategory = () => {
    setIsHomeVisible(false);
    setisCategoryVisible(true);
  };

  const startQuiz = () => {
    setisCategoryVisible(false);
  };

  return (
    <div className="main-body">
      {isHomeVisible && <Homepage showCategory={showCategory}></Homepage>}
      {!isHomeVisible && isCategoryVisible && (
        <Category
          startQuiz={startQuiz}
          setCategory={setCategory}
          setDifficulty={setDifficulty}
          category={category}
          difficulty={difficulty}
        ></Category>
      )}
      {!isHomeVisible && !isCategoryVisible && (
        <Quiz category={category} difficulty={difficulty}></Quiz>
      )}
    </div>
  );
};

export default App;
