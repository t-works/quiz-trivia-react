# Quiz Mania React Typescript Application

## What is this?
It's a simple demo react application that makes use of Open Trivia API https://opentdb.com/ \
You can browse all available categories select difficulty level, load 10 questions, answer them and see your score.\
On the first page initially only first 4 categories are visible. \
To see all categories press down arrow below.\
Anwers order on the questions page is randomized on every load.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Notes
I played with React Styled Components https://styled-components.com/ \
that are a great way to keep styles close to the code. \
Especially useful for customizing styles on the component level.

## What is missing
Currently the session key is not implemented what means you will always load the same 10 questions.

## Install

### Run `yarn install`
to install dependencies.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
It uses React Test Library https://testing-library.com/ and Mock Service Worker https://mswjs.io/docs/ for API testing.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


### License
 MIT