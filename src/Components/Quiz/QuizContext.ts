import {Context, createContext, useContext} from "react";
import { Quiz} from "./quizTypes.d";

export enum DifficultyType {
    EMPTY= "Select difficulty",
    EASY= "easy",
    MEDIUM="medium",
    HARD = "hard"
}
export enum ScoreLevel {
    POOR= 3,
    GOOD= 6,
    GREAT = 7
}
export interface IQuizContextState {
    questions: Quiz.AnsweredQuestion[];
    categories: Quiz.IQuizCategory[];
    selectedCategory: number;
    selectedDifficulty: DifficultyType;
    selectDifficulty?: (difficulty: DifficultyType)=>void;
    selectAnswer?: (questionIdx: number, selectedAnswer: string)=>void;
    selectCategory?: (categoryIdx: number)=>void;
    setQuestions?: (questions: Quiz.AnsweredQuestion[])=>void;
    setCategories?: (categories: Quiz.IQuizCategory[])=>void;
}
export type IQuizContext = IQuizContextState | undefined;

export const defaultContextState: IQuizContextState = {
        questions: [],
        categories: [],
        selectedCategory: -1,
        selectedDifficulty: DifficultyType.EMPTY
}

const QuizContext: Context<IQuizContextState> = createContext<IQuizContextState>(
    defaultContextState);
export const useQuizContext = () => useContext(QuizContext);
export default QuizContext;


