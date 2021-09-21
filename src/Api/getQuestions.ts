
import axios from "axios";
import {Quiz} from "../Components/Quiz/quizTypes";
import {DifficultyType} from "../Components/Quiz/QuizContext";

export interface ErrorPayloadAxios{
    data: ErrorPayload,
    status: number,
    statusText: string,
}
export interface ErrorPayload{
    code?: number;
    hasError: boolean;
    message: string;
}

export type CommitQuestionsFn = (questionResponsePayload: Quiz.IQuestionsResult) => void;
export type ErrorFn = (payload: ErrorPayload) => void;
export type ErrorFnAxios = (payload: ErrorPayloadAxios) => void;

export function getQuestions (categoryId:number,
                              difficulty: DifficultyType,
                              commitFn: CommitQuestionsFn,
                              errorFn: ErrorFnAxios){

    return axios.get('https://opentdb.com/api.php?amount=10&category='+categoryId+'&difficulty='+difficulty,{ //+ '&type=boolean'
    })
        .then((response)=> {
            commitFn(response.data);
        })
        .catch((error)=>{
            errorFn(error.response);
        });
}