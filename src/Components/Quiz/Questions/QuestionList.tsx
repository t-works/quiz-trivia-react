import React, {useEffect, FC, useState} from "react";
import {useQuizContext} from "../QuizContext"
import { Quiz} from "../quizTypes";
import {ErrorPayloadAxios} from "../../../Api/getCategories";
import {getQuestions} from "../../../Api/getQuestions";
import Question from "./Question";
import {useHistory} from "react-router-dom";
import Popup from "../../UI/Popup";
import styled from "styled-components";

const QuestionListPanel = styled.div`
    padding: 0px;
    overflow:hidden;
`;
const QuestionList: FC = () => {
    const [popup,setPopup] = useState(null as null | React.ReactElement);
    const {selectedCategory,categories,selectedDifficulty,setQuestions, questions} = useQuizContext();
    const history = useHistory()

    const hidePopup = () =>{
        setPopup(null);
        history.push("/");
    }
    const handleQuestionsResponse = (questionResponsePayload: Quiz.IQuestionsResult)=>{
        if(questionResponsePayload.response_code>0){
            let message = '';
            switch (questionResponsePayload.response_code){
                case 1:
                    message = "There was not enough questions for the selected category and difficulty. Try to select a different difficulty and/or category.";
                    break;
                case 2:
                    message = "Query contains an invalid parameter. Arguements passed in aren't valid";
                    break;
                case 3:
                    message = "Token Not Found Session Token does not exist.";
                    break;
                case 4:
                    message = "Token Empty Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.";
                    break;
                default:
                    message = "Unknown API error. Try to select a different difficulty and/or category.";
            }
            setPopup(
                <Popup callback={hidePopup}
                       styleType="warning"
                       buttonText="Try Again"
                >
                    <p>{message}</p>
                </Popup>)
        }
        questionResponsePayload.results.forEach((question)=>{
            (question as Quiz.AnsweredQuestion)['selected_answer'] = null as Quiz.SelectedAnswerType;
        })
        if (setQuestions) {
            setQuestions(questionResponsePayload.results as Quiz.AnsweredQuestion[])
        }
    }
    const onGetQuestionsError = (payload: ErrorPayloadAxios)=>{
        console.log(payload)
    }
    useEffect(() => {
        if(selectedCategory>-1){
            getQuestions(categories[selectedCategory].id, selectedDifficulty, handleQuestionsResponse,onGetQuestionsError);
        }else{
            history.push("/");
        }
        return () => {
        };
    }, []);

    const QuestionListView = questions.map(
        (question, idx) => <Question key={idx} idx={idx} question={question}></Question>);

    return(
        <QuestionListPanel className="panel">
            {QuestionListView}
            {popup}
        </QuestionListPanel>
    )
}
export default QuestionList;
