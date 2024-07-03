"use client";
import React, { useState } from "react";

type Answer = {
  text: string;
  correct: boolean;
};

type Question = {
  question: string;
  answers: Answer[];
};

const questions: Question[] = [
  // HTML Questions
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hyperlinking Text Marking Language", correct: false },
    ],
  },
  {
    question: "Which HTML element is used to define a paragraph?",
    answers: [
      { text: "<p>", correct: true },
      { text: "<paragraph>", correct: false },
      { text: "<par>", correct: false },
      { text: "<para>", correct: false },
    ],
  },
  {
    question:
      "Which attribute is used to provide a unique identifier to an HTML element?",
    answers: [
      { text: "id", correct: true },
      { text: "class", correct: false },
      { text: "name", correct: false },
      { text: "type", correct: false },
    ],
  },
  {
    question: "Which HTML element is used for the largest heading?",
    answers: [
      { text: "<h1>", correct: true },
      { text: "<h6>", correct: false },
      { text: "<head>", correct: false },
      { text: "<heading>", correct: false },
    ],
  },
  {
    question: "How can you make a numbered list?",
    answers: [
      { text: "<ol>", correct: true },
      { text: "<ul>", correct: false },
      { text: "<li>", correct: false },
      { text: "<list>", correct: false },
    ],
  },

  // CSS Questions
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Creative Style Sheets", correct: false },
      { text: "Computer Style Sheets", correct: false },
      { text: "Colorful Style Sheets", correct: false },
    ],
  },
  {
    question: "Which property is used to change the background color?",
    answers: [
      { text: "background-color", correct: true },
      { text: "color", correct: false },
      { text: "bgcolor", correct: false },
      { text: "background", correct: false },
    ],
  },
  {
    question: "Which CSS property controls the text size?",
    answers: [
      { text: "font-size", correct: true },
      { text: "text-size", correct: false },
      { text: "font-style", correct: false },
      { text: "text-style", correct: false },
    ],
  },
  {
    question: 'How do you select an element with id "demo"?',
    answers: [
      { text: "#demo", correct: true },
      { text: ".demo", correct: false },
      { text: "demo", correct: false },
      { text: "*demo", correct: false },
    ],
  },
  {
    question:
      "How do you make each word in a text start with a capital letter?",
    answers: [
      { text: "text-transform: capitalize", correct: true },
      { text: "text-style: capitalize", correct: false },
      { text: "transform: capitalize", correct: false },
      { text: "font-transform: capitalize", correct: false },
    ],
  },

  // JavaScript Questions
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<javascript>", correct: false },
      { text: "<js>", correct: false },
      { text: "<scripting>", correct: false },
    ],
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: [
      {
        text: "Both the <head> section and the <body> section are correct",
        correct: true,
      },
      { text: "The <head> section", correct: false },
      { text: "The <body> section", correct: false },
      { text: "The <footer> section", correct: false },
    ],
  },
  {
    question:
      'What is the correct syntax for referring to an external script called "xxx.js"?',
    answers: [
      { text: '<script src="xxx.js">', correct: true },
      { text: '<script href="xxx.js">', correct: false },
      { text: '<script ref="xxx.js">', correct: false },
      { text: '<script name="xxx.js">', correct: false },
    ],
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    answers: [
      { text: 'alert("Hello World");', correct: true },
      { text: 'msgBox("Hello World");', correct: false },
      { text: 'msg("Hello World");', correct: false },
      { text: 'alertBox("Hello World");', correct: false },
    ],
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      { text: "function myFunction()", correct: true },
      { text: "function = myFunction()", correct: false },
      { text: "function:myFunction()", correct: false },
      { text: "function => myFunction()", correct: false },
    ],
  },
];

const Quiz: React.FC = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showStartButton, setShowStartButton] = useState<boolean>(true);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  const startGame = () => {
    setShuffledQuestions(questions.sort(() => Math.random() - 0.5));
    setCurrentQuestionIndex(0);
    setShowStartButton(false);
    setSelectedAnswer(null);
  };

  const setNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
  };

  const selectAnswer = (correct: boolean) => {
    setSelectedAnswer(correct);
    setTimeout(() => {
      if (shuffledQuestions.length > currentQuestionIndex + 1) {
        setNextQuestion();
      } else {
        setShowStartButton(true);
      }
    }, 1000); // 1 second delay to show feedback
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <div className="container">
      {showStartButton ? (
        <div className="controls">
          <button onClick={startGame} className="start-btn btn">
            Start
          </button>
        </div>
      ) : (
        <div id="question-container">
          <h1>Quiz App</h1> {/* Add your heading here */}
          <div id="question">{currentQuestion.question}</div>
          <div id="answer-buttons" className="btn-grid">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                className={`btn ${
                  selectedAnswer !== null
                    ? answer.correct
                      ? "correct"
                      : "wrong"
                    : ""
                }`}
                onClick={() => selectAnswer(answer.correct)}
                disabled={selectedAnswer !== null}
              >
                {answer.text}
              </button>
            ))}
          </div>
          <div className="controls">
            <button
              onClick={setNextQuestion}
              className={`next-btn btn ${
                selectedAnswer !== null ? "" : "hide"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
