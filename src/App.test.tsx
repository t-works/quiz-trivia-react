import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import React, {ReactElement} from 'react'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom'
import App from './App';
import {setupServer} from "msw/node";
import {rest} from "msw";
import {defaultContextState, DifficultyType, IQuizContextState} from "./Components/Quiz/QuizContext";
import QuizComponent from "./Components/Quiz/QuizComponent";
import {Quiz} from "./Components/Quiz/quizTypes";


const server = setupServer(
    rest.get('https://opentdb.com/api_category.php',
        (req,
         res,
         ctx) => {
          // respond using a mocked JSON body
          return res(ctx.json({"trivia_categories":[{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]}))
        }),
)
beforeAll( () => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const questionsResponse: Quiz.IQuestionsResult = {"response_code":0,"results":[{"category":"General Knowledge","type":"multiple","difficulty":"easy","question":"What word represents the letter &#039;T&#039; in the NATO phonetic alphabet?","correct_answer":"Tango","incorrect_answers":["Target","Taxi","Turkey"]},{"category":"General Knowledge","type":"boolean","difficulty":"easy","question":"Bulls are attracted to the color red.","correct_answer":"False","incorrect_answers":["True"]},{"category":"General Knowledge","type":"multiple","difficulty":"easy","question":"What is the nickname of the US state of California?","correct_answer":"Golden State","incorrect_answers":["Sunshine State","Bay State","Treasure State"]},{"category":"General Knowledge","type":"boolean","difficulty":"easy","question":"The color orange is named after the fruit.","correct_answer":"True","incorrect_answers":["False"]},{"category":"General Knowledge","type":"multiple","difficulty":"easy","question":"Five dollars is worth how many nickles?","correct_answer":"100","incorrect_answers":["50","25","69"]},{"category":"General Knowledge","type":"boolean","difficulty":"easy","question":"The National Animal of Scotland is the Unicorn.","correct_answer":"True","incorrect_answers":["False"]},{"category":"General Knowledge","type":"multiple","difficulty":"easy","question":"The likeness of which president is featured on the rare $2 bill of USA currency?","correct_answer":"Thomas Jefferson","incorrect_answers":["Martin Van Buren","Ulysses Grant","John Quincy Adams"]},{"category":"General Knowledge","type":"multiple","difficulty":"easy","question":"If you are caught &quot;Goldbricking&quot;, what are you doing wrong?","correct_answer":"Slacking","incorrect_answers":["Smoking","Stealing","Cheating"]},{"category":"General Knowledge","type":"multiple","difficulty":"easy","question":"What is the profession of Elon Musk&#039;s mom, Maye Musk?","correct_answer":"Model","incorrect_answers":["Professor","Biologist","Musician"]},{"category":"General Knowledge","type":"boolean","difficulty":"easy","question":"The mitochondria is the powerhouse of the cell.","correct_answer":"True","incorrect_answers":["False"]}]};
const customRender = (ui: ReactElement,  contextState: IQuizContextState) => {
    const history = createMemoryHistory()
    return render(

        <Router history={history}>
            <QuizComponent initialState={contextState}>
                {ui}
            </QuizComponent>
        </Router>
    )
}
test('test application flow', async () => {
    let amount = 0;
    server.use(
        rest.get('https://opentdb.com/api.php',
            (req, res, ctx) => {
                const query = req.url.searchParams
                const amount = query.get("amount")
                const category = query.get("category")
                const difficulty = query.get("difficulty")
                return res(ctx.json(questionsResponse))
        }),
    )
    customRender(<App />,defaultContextState);
    // await waitFor(() => screen.getByText(/Quiz Categories/));
    await waitFor(() => screen.getAllByTestId('category_button'));
    expect(screen.getByText(/Quiz Categories/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Start Quiz/));
    expect(screen.getByText(/Please select category and difficulty/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/OK/));
    expect(screen.queryByText(/Please select category and difficulty/)).toBeNull();
    fireEvent.click(screen.getByText(/General Knowledge/));
    fireEvent.click(screen.getByText(/General Knowledge/));
    userEvent.selectOptions(screen.getByTestId('selectElement'), DifficultyType.HARD);
    fireEvent.click(screen.getByText(/Start Quiz/));
    await waitFor(() => screen.getAllByTestId('question'));
    fireEvent.click(screen.getByText(/Submit Answers/i));
    expect(screen.getByText(/Please answer all questions/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/OK/));
    expect(screen.queryByText(/Please answer all questions/)).toBeNull();
    let idx = 0;
    questionsResponse.results.forEach((question)=>{
        fireEvent.click(screen.getByTestId(idx+question.correct_answer));
        idx++;
    })
    fireEvent.click(screen.getByText(/Submit Answers/i));
    expect(screen.getByText(/Your score is 10\/10/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Start Over/i));
    await waitFor(() => screen.getAllByTestId('category_button'));
    expect(screen.getByText(/Quiz Categories/i)).toBeInTheDocument();
});
