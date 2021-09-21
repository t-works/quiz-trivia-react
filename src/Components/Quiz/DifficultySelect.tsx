import React, { FC} from "react";
import {DifficultyType, useQuizContext} from "./QuizContext";
import styled from "styled-components";

const Select = styled.select`
  display: inline-block;
  font-size: 1em;
  margin: 1em;
  padding: 0.5em 1em;
  border: 2px solid #C1CEF7;
  border-radius: 6px;
  cursor: pointer;
  display: inline-block;
`;

const QuizCategoryList: FC = () => {
    const {selectedDifficulty, selectDifficulty} = useQuizContext();
    const handleSelectDifficulty = (evt: React.ChangeEvent<HTMLSelectElement>)=>{
        if (selectDifficulty) {
            selectDifficulty(evt.target.value as DifficultyType);
        }
    }
    return(
        <div>
        <Select data-testid="selectElement"
                value={selectedDifficulty}
                onChange={handleSelectDifficulty}
        >
            <option value={DifficultyType.EMPTY}
                    data-testid="select-option">
                {DifficultyType.EMPTY}
            </option>
            <option value={DifficultyType.EASY} data-testid="select-option">
                {DifficultyType.EASY}
            </option>
            <option value={DifficultyType.MEDIUM} data-testid="select-option">
                {DifficultyType.MEDIUM}
            </option>
            <option value={DifficultyType.HARD}  data-testid="select-option">
                {DifficultyType.HARD}
            </option>
        </Select>
        </div>
    )
}
export default QuizCategoryList;