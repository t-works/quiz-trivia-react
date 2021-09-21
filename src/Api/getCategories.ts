
import axios from "axios";
import {QuizApi} from "../Components/Quiz/quizTypes";

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
export interface StandardApiResponseInterface{
    code: number;
    hasError: boolean;
    message: string;
}

export type CommitCategoriesFn = (payload: QuizApi.IApiResponseCategories) => void;
export type StandardResponseFn = (payload: StandardApiResponseInterface) => void
export type ErrorFn = (payload: ErrorPayload) => void;
export type ErrorFnAxios = (payload: ErrorPayloadAxios) => void;

export function getCategories (commitFn: CommitCategoriesFn,
                               errorFn: ErrorFnAxios){

    return axios.get('https://opentdb.com/api_category.php',{
        // headers: {S
        //     Token: endpointConfig.token
        // }
    })
        .then((response)=> {
            // console.log(response);
            commitFn(response.data);
        })
        .catch((error)=>{
            errorFn(error.response);
        });
}