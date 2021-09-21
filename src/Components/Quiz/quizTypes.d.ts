

export declare namespace Quiz{

    export type SelectedAnswerType = string | null;
    export type QuestionType = "boolean" | "multiple";
    export interface IQuestionsResult{
        results: IQuizQuestion[];
        response_code: number;
    }
    export interface IQuizQuestion{
        category: string,
        type: QuestionType,
        difficulty: DifficultyType,
        question: string,
        correct_answer: string,
        incorrect_answers: string[],
    }
    export interface IQuizQuestionAnswer{
        selected_answer: SelectedAnswerType
    }
    export type AnsweredQuestion = IQuizQuestion & IQuizQuestionAnswer;
    export interface IQuizCategory{
        id: number,
        name: string

    }
    export interface IQuizState{
        questions: IQuizQuestion[],
    }
}

export declare namespace QuizApi{
    export interface IApiResponseCategories{
        trivia_categories: Quiz.IQuizCategory[]
    }
    export interface IApiResponseQuestions{
        results: Quiz.IQuizQuestion[],
        response_code: number
    }
}

export interface IQuizComponentProps{
    children?: ReactElement[] | ReactElement;
    initialState: IQuizContextState;
    // categories: Quiz.IQuizCategory[];
    // questions: Quiz.IQuizQuestion[];
}
export interface IQuestionPageFC{
    // children: ReactElement[] | ReactElement | undefined;
    label: string,
    questionIdx: number,
    cat
    // categories: Quiz.IQuizCategory[];
    // questions: Quiz.IQuizQuestion[];
}