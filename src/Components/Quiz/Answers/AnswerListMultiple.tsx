import React, {  FC} from "react";
import {IAnswerListProp} from "./AnswerList";
import Answer from "./Answer";
import styled from "styled-components";
export interface IListItemProps{
    isSelected?: boolean
}

const ListElement = styled.li<IListItemProps>`
    display:inline-block;
    font-size: 1em;
    margin: 0;
    list-style: none;
    padding: 0;
`;
const ListWrapper = styled.ul`
  margin: 0;
  padding: 0; 
`;

const AnswerListBoolean: FC <IAnswerListProp>= ({answerList, questionIdx}: IAnswerListProp) => {

    const AnswerListView = answerList.map(
        (answer, idx) => <ListElement key={idx}>
            <Answer key={idx} questionIdx={questionIdx} answer={answer}></Answer>
            </ListElement>
    );
    return(
        <ListWrapper>
            {AnswerListView}
        </ListWrapper>
    )
}
export default AnswerListBoolean;
