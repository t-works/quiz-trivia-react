import React, {FC} from "react";

import QuizCategoryList from "../Quiz/QuizCategoryList";
import DifficultySelect from "../Quiz/DifficultySelect";
import GetQuestions from "../Quiz/GetQuestions";

// const StartPage: FC<IQuestionPageFC> = ({ children}: IQuestionPageFC) => {
const StartPage: FC = () => {

    return(
        <div className="container">
            <h1>Quiz Categories</h1>
            <QuizCategoryList/>
            <DifficultySelect/>
            <GetQuestions/>
        </div>
    )
}
export default StartPage;
