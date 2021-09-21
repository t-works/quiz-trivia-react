import React, {FC, useEffect, useState} from "react";
import {useQuizContext} from "../Quiz/QuizContext"
import QuestionList from "../Quiz/Questions/QuestionList";
import Popup from "../UI/Popup";
import { useHistory } from "react-router-dom";
const QuestionsPage: FC = () => {
    const [categoryName, setCategoryName] = useState('');
    const history = useHistory();
    const [score,setScore] = useState(0);
    const [totalQuestions,setTotalQuestions] = useState(0);
    const [hasAllAnswers, setHasAllAnswers] = useState(false);
    const [resultPopup,setResultPopup] = useState(null as  JSX.Element | null)
    const {selectedCategory,categories,questions} = useQuizContext();

    useEffect(()=>{
        let currentScore = 0;
        let answerCount = 0;
        let totalQuestions = 0;
        questions.forEach((question)=>{
            if(question.selected_answer === question.correct_answer){
                currentScore++;
            }
            totalQuestions++;
            if(question.selected_answer!==null){
                answerCount++;
            }
        })
        if(answerCount===totalQuestions){
            setHasAllAnswers(true);
        }else{
            setHasAllAnswers(false);
        }
        setTotalQuestions(totalQuestions);
        setScore(currentScore);
    },[questions]);

    useEffect(()=>{
        if(categories.length>=selectedCategory){
            setCategoryName(categories[selectedCategory].name);
        }
    },[selectedCategory,categories]);

    const startOver = ()=>{
        history.push('/');
    }
    const hidePopup = () =>{
        setResultPopup(null);
    }
    const handleShowResultsPopup = ()=>{
        if(hasAllAnswers){
            setResultPopup(
                <Popup callback={startOver}
                       styleType="congrats"
                       buttonText="Start Over"
                >
                    <h2>Your score is {score}/{totalQuestions}</h2>
                </Popup>
            )
        }else{
            setResultPopup(
                <Popup callback={hidePopup}
                       styleType="warning"
                >
                    <p>Please answer all questions. {}</p>
                </Popup>
            )
        }
    }

 return(
     <div className="container">
         <h1 data-testid="questionsPage">Category: {categoryName}</h1>
         <QuestionList/>
         <button onClick={handleShowResultsPopup} className="btn big">Submit Answers</button>
         {resultPopup}
     </div>
 )
}
export default QuestionsPage;
