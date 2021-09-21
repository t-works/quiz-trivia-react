// import dependencies
import React, {ReactElement} from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import {render, fireEvent, waitFor, screen} from '@testing-library/react'

import {defaultContextState, IQuizContextState} from './QuizContext'
import QuizComponent from './QuizComponent'
import '@testing-library/jest-dom'
import QuizCategoryList from './QuizCategoryList';


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


const customRender = (ui: ReactElement,  contextState: IQuizContextState) => {
    return render(
        // <QuizContext.Provider {...providerProps}>{ui}</QuizContext.Provider>,
        <QuizComponent initialState={contextState}>{ui}</QuizComponent>,
    )
}

test('loads and displays categories with context', async () => {
    customRender(<QuizCategoryList />, defaultContextState)
    render(<QuizCategoryList />)
    await waitFor(() => screen.getAllByTestId('category_button'))
     expect(screen.getAllByTestId('category_button').length).toBeGreaterThanOrEqual(4);
     expect(screen.getByText(/General Knowledge/)).toBeInTheDocument();

})

test('selects category', async () => {
    customRender(<QuizCategoryList />, defaultContextState)
    render(<QuizCategoryList />)
    await waitFor(() => screen.getAllByTestId('category_button'))
    fireEvent.click(screen.getByText(/General Knowledge/));
    expect(screen.getByText(/General Knowledge/)).toHaveClass("selected");
    fireEvent.click(screen.getByText(/Entertainment: Books/));
    expect(screen.getByText(/General Knowledge/)).not.toHaveClass("selected");
    expect(screen.getByText(/Entertainment: Books/)).toHaveClass("selected");

})

test('handles server error', async () => {
    server.use(
        rest.get('https://opentdb.com/api_category.php', (req, res, ctx) => {
            return res(ctx.status(500))
        }),
    )
    customRender(<QuizCategoryList />, defaultContextState)
    // fireEvent.click(screen.getByText('Load Greeting'))
    await waitFor(() => screen.getByRole('alert'))
    expect(screen.getByRole('alert')).toHaveTextContent('Please check your network connection')
    // expect(screen.getByRole('button')).not.toBeDisabled()
})
