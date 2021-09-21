import React, {  FC} from "react";
import {IAnswerListProp} from "./AnswerList";
import Answer from "./Answer";
import styled from "styled-components";
const AnswerList = styled.div`
  button{
  &:first-of-type{
      margin-right:0px;
      border-radius: 3px 0px 0px 3px;
      border-right: 0px;
  }
  &:last-of-type{
      margin-left:0px;
      border-radius: 0px 3px 3px 0px;
      border-left: 0px;
    }
  }
`;
const AnswerListBoolean: FC <IAnswerListProp>= ({answerList, questionIdx}: IAnswerListProp) => {
    const AnswerListView = answerList.map(
        (answer, idx) =>
            <Answer key={idx} questionIdx={questionIdx} answer={answer} />
    );
    return(
        <AnswerList>
            {AnswerListView}
        </AnswerList>
    )
}
export default AnswerListBoolean;
