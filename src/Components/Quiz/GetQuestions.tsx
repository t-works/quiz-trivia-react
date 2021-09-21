import styled from 'styled-components';
import React, {FC, useState} from "react";
import {DifficultyType, useQuizContext} from "./QuizContext";
import {
    useHistory,
} from 'react-router-dom';
import Popup from "../UI/Popup";
import {RocketIcon} from "@primer/octicons-react";

const Button = styled.a`
  background:#b7680f;
  color: #fff;
  display: inline-block;
  margin: 1em;
  border: 3px solid #fba13f;
`;
const Icon = styled.span`
    svg{
        height:30px;
        margin-left: -5px;
        margin-right: 5px;
    }
`

const GetQuestions: FC = () => {
    const [popup,setPopup] = useState(null as null | React.ReactElement);
    const history = useHistory();
    const {selectedCategory,selectedDifficulty} = useQuizContext();
    const handleStartQuiz = () =>{
        if(selectedCategory>=0 && selectedDifficulty!==DifficultyType.EMPTY){
            history.push('/asnwerQuestions')
        }else{
            setPopup(
                <Popup callback={hidePopup}
                       styleType="warning"
                >
                    <h2> Warning</h2>
                    <p>Please select category and difficulty.</p>
                </Popup>
            )
        }
    }
    const hidePopup = () =>{
        setPopup(null);
    }
    return(
        <div>
            <Button className="btn big"  onClick={handleStartQuiz}><Icon><RocketIcon size={32}  verticalAlign="middle" /></Icon> Start Quiz</Button>
            {popup}
        </div>
    )
}
export default GetQuestions;