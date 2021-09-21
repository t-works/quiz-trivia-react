import React, { useState,  FC} from "react";
import QuizContext, {DifficultyType} from "./QuizContext"
import {IQuizComponentProps, Quiz} from "./quizTypes.d";




const QuizComponent: FC<IQuizComponentProps> = ({ children, initialState }: IQuizComponentProps) => {
    const [questions,setQuestionsState] = useState(initialState.questions as Quiz.AnsweredQuestion[]);
    const [categories,setCategories] = useState(initialState.categories as Quiz.IQuizCategory[]);
    const [selectedCategory,selectCategory] = useState(initialState.selectCategory as number);
    const [selectedDifficulty,selectDifficulty] = useState(DifficultyType.EMPTY as DifficultyType);
    const setQuestions = (questions: Quiz.AnsweredQuestion[]) => {
            setQuestionsState(questions);
    }
    const selectAnswer = (questionIdx: number, selectedAnswer: string) => {
       const answers = [...questions];
       if(answers[questionIdx]){
           answers[questionIdx].selected_answer=selectedAnswer;
           setQuestionsState(answers);
       }else{
           throw new Error("Question does not exist")
       }
    }
    return (
        <QuizContext.Provider value={{
            setQuestions,
            questions,
            categories,
            setCategories,
            selectedCategory,
            selectCategory,
            selectAnswer,
            selectDifficulty,
            selectedDifficulty,
            // score
        }}>
                {children}
        </QuizContext.Provider>
    )
}
export default QuizComponent;