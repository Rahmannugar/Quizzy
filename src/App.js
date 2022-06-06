import React from "react";
import { useState, useEffect } from "react";
import { Question } from "./components";
 
const API_URL = "https://opentdb.com/api.php?amount=18&category=9&difficulty=easy&type=multiple";

export default function App(){
    const [questions, setQuestions] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [showAnswers, setShowAnswers] = useState(false)


    useEffect(() => {
        fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
            setQuestions(data.results);
            const questions = data.results.map((question) => ({
                ...question, answers : [
                    question.correct_answer,
                    ...question.incorrect_answers
                ].sort(() => Math.random() - 0.5)
            }))
            setQuestions(questions)
        });
    }, []);
    const handleAnswer = (answer) => {
        if (!showAnswers){
        if(answer === questions[currentIndex].correct_answer){
            setScore(score + 1)
        }
    }
        setShowAnswers(true)
    }
    const handleNextQuestion = () => {
        setShowAnswers(false)
        setCurrentIndex(currentIndex + 1)
    }

    return questions.length > 0 ? (
        <div className="container">
        {currentIndex >= questions.length ? (
    <h1 id="score" className="text-3xl text-white font-bold">Your final score is {score}/10!
    </h1>
    ) : (
        <Question data={questions[currentIndex]} showAnswers={showAnswers} handleNextQuestion={handleNextQuestion} handleAnswer={handleAnswer}/>
    )}
            </div>
 )  : (
      <h1 className="load">Loading...</h1>
  );
}
