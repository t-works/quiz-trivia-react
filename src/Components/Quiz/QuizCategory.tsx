import React, {FC} from "react";
import {useQuizContext} from "./QuizContext";
import styled from "styled-components";
import {Quiz} from "./quizTypes.d";


export interface IQuizCategoryFC{
    category: Quiz.IQuizCategory;
    idx: number;
}

export interface IButtonIStyleProps{
    isSelected?: boolean;
    onClick: SelectCategory;
}
export type SelectCategory = () => void;
// border-top-color:#DEE4F7;
// border-left-color:#DEE4F7;
// border-right-color:#8A9EDB;
// border-bottom-color:#8A9EDB;
const Button = styled.button<IButtonIStyleProps>`
  background: ${props => props.isSelected ? "#EBE9C1" : "#DEE4F7"};
  color: ${props => props.isSelected ? "#1B233B" : "#293968"};
  border-color:#C1CEF7;
  font-size:1.2rem;
  margin-bottom:32px;
  @media (max-width: 680px){
    display: block;
    width: 100%;
    margin-left:0px;
    margin-right: 0px;
    margin-bottom:16px;
    text-align: left;
    padding-left: 40px!important;
    text-indent: -28px;
    font-size: 20px!important;
  }
`;
// const StartPage: FC<IQuestionPageFC> = ({ children}: IQuestionPageFC) => {
const QuizCategory: FC<IQuizCategoryFC> = ({ category, idx}: IQuizCategoryFC) => {
    const {selectedCategory, selectCategory} = useQuizContext();
    const handleSelectCategory = () => {
        if (selectCategory) {
            selectCategory(idx);
        }
    }
    const cssClassButton = idx===selectedCategory ? "btn big selected":"btn big";
    return(
        <Button data-testid="category_button" className={cssClassButton} isSelected={idx===selectedCategory} onClick={handleSelectCategory}>
            {idx+1}. {category.name}
            {/*({category.id})*/}
        </Button>
    )
}
export default QuizCategory;




