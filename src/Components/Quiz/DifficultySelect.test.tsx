// import dependencies
import React, {ReactElement} from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import DifficultySelect from './DifficultySelect';
import {defaultContextState, DifficultyType, IQuizContextState, useQuizContext} from "./QuizContext";
import QuizComponent from "./QuizComponent";

const customRender = (ui: ReactElement, contextState: IQuizContextState) => {
    return render(
        <QuizComponent initialState={contextState}>{ui}</QuizComponent>,
    )
}

test('select difficulty type', async () => {
    customRender(<DifficultySelect />, defaultContextState)
    const selectItem = screen.getByTestId('selectElement')
    expect(selectItem).toBeInTheDocument();
    expect((screen.getByText(DifficultyType.EMPTY) as HTMLOptionElement).selected).toBeTruthy();

    expect((screen.queryByDisplayValue(DifficultyType.EMPTY))).toBeInTheDocument();
    expect((screen.queryByDisplayValue(DifficultyType.HARD))).toBeNull();

    userEvent.selectOptions(selectItem, DifficultyType.HARD);
    expect((screen.getByText(DifficultyType.HARD) as HTMLOptionElement).selected).toBeTruthy();
    expect((screen.getByText(DifficultyType.EASY) as HTMLOptionElement).selected).toBeFalsy();
    expect((screen.getByText(DifficultyType.MEDIUM) as HTMLOptionElement).selected).toBeFalsy();

    userEvent.selectOptions(selectItem, DifficultyType.MEDIUM);
    expect((screen.getByText(DifficultyType.MEDIUM) as HTMLOptionElement).selected).toBeTruthy();
    expect((screen.getByText(DifficultyType.EASY) as HTMLOptionElement).selected).toBeFalsy();
    expect((screen.getByText(DifficultyType.HARD) as HTMLOptionElement).selected).toBeFalsy();

})

