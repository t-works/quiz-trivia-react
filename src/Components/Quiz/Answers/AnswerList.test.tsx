// import dependencies
import React, {ReactElement} from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import {render, fireEvent, waitFor, screen} from '@testing-library/react'

import {defaultContextState, IQuizContextState} from '../QuizContext'
import QuizComponent from '../QuizComponent'
import '@testing-library/jest-dom'
import AnswerList from './AnswerList';
import {Quiz} from "../quizTypes";

const server = setupServer(
    rest.get('https://opentdb.com/api_category.php',
        (req,
         res,
         ctx) => {
            // respond using a mocked JSON body
            return res(ctx.json({"trivia_categories":[{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]}))
        }),
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


const customRender = (ui: ReactElement, contextState: IQuizContextState) => {
    return render(
        <QuizComponent initialState={contextState}>{ui}</QuizComponent>,
    )
}

test('displays answers and selects answers with context - type boolean', async () => {
    const questionBoolean: Quiz.AnsweredQuestion  = {"category":"Entertainment: Comics","type":"boolean","difficulty":"easy","question":"The &quot;Pepe&quot; meme originated from a comic drawn by Matt Furie called &quot;Boy&#039;s Club&quot;?","correct_answer":"True","incorrect_answers":["False"],"selected_answer":null};
    const questionMulti: Quiz.AnsweredQuestion  = {"category":"Entertainment: Comics","type":"multiple","difficulty":"easy","question":"This Marvel superhero is often called &quot;The man without fear&quot;.","correct_answer":"Daredevil","incorrect_answers":["Thor","Wolverine","Hulk"],"selected_answer":null};
    const question: Quiz.AnsweredQuestion = questionBoolean;
    const questions: Quiz.AnsweredQuestion[] =[questionMulti,questionBoolean]

    const contextState: IQuizContextState = {...defaultContextState,questions:questions}
    customRender(<AnswerList questionIdx={1} question={question} />, contextState)
    expect(screen.getByText(question.correct_answer)).toBeInTheDocument();
    question.incorrect_answers.forEach((answer)=>{
        expect(screen.getByText(answer)).toBeInTheDocument();
        fireEvent.click(screen.getByText(answer));
        expect(screen.getByText(answer)).toHaveClass("selected");
        expect(screen.getByText(question.correct_answer)).not.toHaveClass("selected");
        question.incorrect_answers.forEach((answerCheck)=>{
            if(answerCheck===answer){
                return;
            }
            expect(screen.getByText(answerCheck)).not.toHaveClass("selected");
            expect(screen.getByText(question.correct_answer)).not.toHaveClass("selected");
        })
    });
    fireEvent.click(screen.getByText(question.correct_answer));
    question.incorrect_answers.forEach((answer)=>{
        expect(screen.getByText(answer)).not.toHaveClass("selected");
    })


});

test('loads and displays answers with context - type multi', async () => {
    const questionBoolean: Quiz.AnsweredQuestion  = {"category":"Entertainment: Comics","type":"boolean","difficulty":"easy","question":"The &quot;Pepe&quot; meme originated from a comic drawn by Matt Furie called &quot;Boy&#039;s Club&quot;?","correct_answer":"True","incorrect_answers":["False"],"selected_answer":null};
    const questionMulti: Quiz.AnsweredQuestion  = {"category":"Entertainment: Comics","type":"multiple","difficulty":"easy","question":"This Marvel superhero is often called &quot;The man without fear&quot;.","correct_answer":"Daredevil","incorrect_answers":["Thor","Wolverine","Hulk"],"selected_answer":null};
    const question: Quiz.AnsweredQuestion = questionMulti;
    const questions: Quiz.AnsweredQuestion[] =[questionBoolean,questionMulti]

    const contextState: IQuizContextState = {...defaultContextState,questions:questions}
    customRender(<AnswerList questionIdx={1} question={question} />, contextState)
    expect(screen.getByText(question.correct_answer)).toBeInTheDocument();
    question.incorrect_answers.forEach((answer)=>{
        expect(screen.getByText(answer)).toBeInTheDocument();
        fireEvent.click(screen.getByText(answer));
        expect(screen.getByText(answer)).toHaveClass("selected");
        expect(screen.getByText(question.correct_answer)).not.toHaveClass("selected");
        question.incorrect_answers.forEach((answerCheck)=>{
            if(answerCheck===answer){
                return;
            }
            expect(screen.getByText(answerCheck)).not.toHaveClass("selected");
            expect(screen.getByText(question.correct_answer)).not.toHaveClass("selected");
        })
    });
    fireEvent.click(screen.getByText(question.correct_answer));
    question.incorrect_answers.forEach((answer)=>{
        expect(screen.getByText(answer)).not.toHaveClass("selected");
    })

});

