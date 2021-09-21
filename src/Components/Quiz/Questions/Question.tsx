import React, {useState, useEffect, FC} from "react";
import {Quiz} from "../quizTypes";
import he from "he";
import AnswerList from "../Answers/AnswerList";
import styled from "styled-components";
export interface IQuestionItemProps{
    isSelected: boolean
}
const QuestionElement = styled.div<IQuestionItemProps>`
  background: ${props => props.isSelected ? "#efefef" : "white"};
  color: ${props => props.isSelected ? "#6a6a6a" : "#4D5D90"};
  font-size: 1em;
  margin: 0 0 2px 0;
  list-style: none;
  padding: 10px;
  border-left: ${props => props.isSelected ? "6px solid #ffa442" : "6px solid #fff"};
  &:last-of-type{
    margin-bottom:0px;
  }
  @media screen and (min-width: 640px){
  p{
        margin-left: 1em;
        text-align: left;
    }
  }
  h2{
    font-weight:600;
  }
`;
export interface QuestionProps {question: Quiz.AnsweredQuestion, idx: number};

const Question: FC <QuestionProps>= ({question,idx}: QuestionProps) => {
    const [isSelected, setIsSelected] = useState(false);
    useEffect(()=>{
        if(question.selected_answer !== null){
            setIsSelected(true);
        }else{
            setIsSelected(false);
        }
    },[question.selected_answer])
    return(
        <QuestionElement isSelected={isSelected}>
            <h2 className="question-title" data-testid="question">Question {idx+1}</h2>
            <p className="question-title" data-testid="question">{he.decode(question.question)}</p>
            <AnswerList question={question} questionIdx={idx} isSelected={isSelected}/>
        </QuestionElement>
    )
}
export default Question;
