import React, {FC, useEffect, useState} from "react";
import { Quiz} from "../quizTypes";
import AnswerListBoolean from "./AnswerListBoolean";
import AnswerListMultiple from "./AnswerListMultiple";
import styled from "styled-components";
export interface IAnswerListFc {
    question: Quiz.IQuizQuestion;
    questionIdx: number;
    isSelected: boolean;

}
export interface IAnswerListProp{
    answerList: string[];
    questionIdx: number;
}
export interface IQuestionProps{
    isSelected: boolean
}
const QuestionElement = styled.div<IQuestionProps>`
  background: ${props => props.isSelected ? "#fff" : "#efefef"};
  color: ${props => props.isSelected ? "white" : "#e99232"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

const AnswerList: FC <IAnswerListFc>= ({question, questionIdx, isSelected}: IAnswerListFc) => {
    const [answerListMap, setAnswerListMap] = useState({boolean:AnswerListBoolean,multiple : AnswerListMultiple})
    const [answerList,setAnswerList] = useState(<AnswerListBoolean questionIdx={-1} answerList={[]}/>);
    useEffect(()=>{
        setAnswerListMap({
            boolean : AnswerListBoolean,
            multiple : AnswerListMultiple,
        })
    },[]);

    const shuffle = (answers: string[]) => {
        let currentIndex = answers.length,  randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [answers[currentIndex], answers[randomIndex]] = [
                answers[randomIndex], answers[currentIndex]];
        }
        return answers;
    }

    useEffect(()=>{
        const answers: string[] = [...question.incorrect_answers];
        answers.push(question.correct_answer);
        shuffle(answers);
        const AnswerTypeFc = answerListMap[question.type];
        setAnswerList(<AnswerTypeFc answerList={answers} questionIdx={questionIdx} />)
    },[question, questionIdx, answerListMap])

    return(
        <QuestionElement isSelected={isSelected}>
            {answerList}
        </QuestionElement>
    )
}
export default AnswerList;