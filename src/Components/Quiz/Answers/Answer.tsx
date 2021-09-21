import React, { useState, useEffect, FC} from "react";
import {useQuizContext} from "../QuizContext"

import he from "he";
import styled from "styled-components";

const Button = styled.button<IAnswerStyleProps>`
  /* Adapt the colors based on primary prop */
  background: ${props => props.isSelected ? "#b7680f" : "white"};
  color: ${props => props.isSelected ? "white" : "#000"};
  border: ${props => props.isSelected ? "1px solid #92530c" : "1px solid #ccc"};;

`;

export interface IAnswerStyleProps{
    isSelected: boolean;
    onClick: SelectAnswer;
}
export type SelectAnswer = () => void;

export interface IAnswerFC {
    answer: string;
    questionIdx: number;
};

const Answer: FC <IAnswerFC>= ({questionIdx,answer}: IAnswerFC) => {
    const [isSelected, setIsSelected] = useState(false);
    const {questions, selectAnswer} = useQuizContext();
    const currentAnswer = questions[questionIdx].selected_answer;
    const cssClassButton = isSelected? "btn selected":"btn";
    useEffect(()=>{
        setIsSelected(currentAnswer!==null && currentAnswer===answer);
    },[answer,currentAnswer])

    const handleSelectAnswer = () => {
        if (selectAnswer) {
            selectAnswer(questionIdx, answer);
        }
    }
    return(
        <Button data-testid={questionIdx+answer} className={cssClassButton} isSelected={isSelected} onClick={handleSelectAnswer}>
            {he.decode(answer)}
        </Button>
    )
}
export default Answer;