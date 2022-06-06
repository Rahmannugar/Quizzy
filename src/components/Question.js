import React from "react";

export default function Question({showAnswers, handleNextQuestion, handleAnswer, data: {question, correct_answer, answers}, }) {
    
    return (
        <div>
             <div className="flex flex-col">
                <h2 className="header" dangerouslySetInnerHTML={{__html: question}}/>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6">
                {answers.map((answer) => {
                    const textColor = showAnswers ? answer === correct_answer ? "text-green-500" : "text-red-500" : "text-cyan-600"
                  
                   return (               
                     <button
                     className= {`bg-white ${textColor} p-4 font-semibold rounded shadow`}
                    onClick={() => handleAnswer(answer)} id="btn">{answer}</button>
                )})}
            </div>
            { showAnswers && (
            <button id="next" onClick={handleNextQuestion} className= {`ml-auto text-white bg-cyan-400 p-4 font-semibold rounded shadow mt-6`}>Next Question</button>
            )}
            </div>
    )
}
