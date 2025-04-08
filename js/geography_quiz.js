import { allQuestions } from "../data/geography_questions.js";


var questions;
var index;


function selectRandomQuestions(numQuestions) {
    // declare array to store the questions
    questions = new Array(numQuestions);

    // repeat for each question to be included in quiz
    for (let i = 0; i < numQuestions; i++) {
        while (true) {
            // calculate a random index
            let randomIndex = Math.floor(Math.random() * allQuestions.length);

            // check if question has already been selected
            if (questions.includes(allQuestions[randomIndex])) {
                continue;
            } else {
                questions[i] = allQuestions[randomIndex];
                break;
            }
        }

        // set the chose answer to 0 (ensures answers are not carried over when replaying)
        questions[i].chosenAnswer = 0;
    }
}


// updates the users chosen answer
function updateAnswer(answerNum) {
    // update answer
    questions[index].chosenAnswer = answerNum;

    // add css for chosen answer
    const chosenAnswer = document.getElementById(`answer${answerNum}`);
    chosenAnswer.setAttribute("class", "geo-answer  geo-answer-checked");

    // display the question again
    displayQuestion();
}


// add a header to the page displaying the question number
function addQuestionHeader(node) {
    const questionLabel = document.createElement("h2");
    questionLabel.setAttribute("class", "geo-question-header");
    questionLabel.textContent = `Question ${index + 1}`;

    node.appendChild(questionLabel);
}


// add question text to the page
function addQuestionText(node) {
    const questionText = document.createElement("p");
    questionText.setAttribute("class", "geo-question-text");
    questionText.textContent = `${questions[index].question}`;

    node.appendChild(questionText);
}


// create an answer button
function createAnswerButton(answerNum, answerText) {
    const answerButton = document.createElement("button");
    answerButton.setAttribute("id", `answer${answerNum}`);
    answerButton.setAttribute("class", "geo-answer");
    answerButton.textContent = `${answerText}`

    // add event listener to update the question with the chosen answer when clicked
    answerButton.addEventListener("click", () => updateAnswer(answerNum));

    // update the classes of the button if it is the users previously chosen answer
    if (questions[index].chosenAnswer == answerNum) {
        answerButton.setAttribute("class", "geo-answer geo-answer-checked");
    }

    return answerButton;
}


// add the the answer buttons for the current question
function addAnswerButtons(node) {
    for (const [answerNum, answerText] of Object.entries(questions[index].answers)) {
        const answerButton = createAnswerButton(answerNum, answerText);

        node.appendChild(answerButton);
    }
}


// remove all children from a node
function removeChildren(node) {
    while (node.firstChild) {
        node.lastChild.remove();
    }
}


// display the previous question
function displayPreviousQuestion() {
    index--;
    displayQuestion();
}


// display the next question
function displayNextQuestion() {
    index++;
    displayQuestion();
}


// add a button to return to previous question
function addPrevButton(node) {
    const prevButton = document.createElement("button");
    prevButton.setAttribute("class", "geo-prev-button");
    prevButton.textContent = "PREV";

    prevButton.addEventListener("click", displayPreviousQuestion);

    node.appendChild(prevButton);
}


// add a button to continue to the next question
function addNextButton(node) {
    const nextButton = document.createElement("button");
    nextButton.setAttribute("class", "geo-next-button");
    nextButton.textContent = "NEXT";

    nextButton.addEventListener("click", displayNextQuestion);

    node.appendChild(nextButton);
}


// add a button to submit answers
function addSubmitButton(node) {
    const submitButton = document.createElement("button");
    submitButton.setAttribute("class", "geo-next-button");
    submitButton.textContent = "SUBMIT";

    submitButton.addEventListener("click", displayScore);

    node.appendChild(submitButton);
}


// calculate the players score
function calculateScore() {
    var score = 0;

    for (let i = 0; i < questions.length; i++) {
        if (questions[i].chosenAnswer == questions[i].correctAnswer) {
            score++;
        }
    }

    return score;
}


// display the players score
function displayScore() {
    // get main
    const main = document.getElementsByTagName("main")[0];

    // clear main
    removeChildren(main);

    // display score header
    const scoreHeader = document.createElement("h2");
    scoreHeader.setAttribute("id", "score-header");
    scoreHeader.textContent = "You scored:";
    main.appendChild(scoreHeader);


    // display score
    const score = document.createElement("p");
    score.setAttribute("id", "final-score");
    score.textContent = `${calculateScore()}/${questions.length}`;

    main.appendChild(score);

    // display message thanking user for playing
    const message = document.createElement("p");
    message.setAttribute("class", "geo-text");
    message.textContent = "Thank you for playing!";

    main.appendChild(message);

    // display replay button
    const replayButton = document.createElement("button");
    replayButton.setAttribute("class", "geo-replay-button");
    replayButton.textContent = "PLAY AGAIN?";

    replayButton.addEventListener("click", startNewGame);

    main.appendChild(replayButton);
}


// display the current question
function displayQuestion() {
    // get main
    const main = document.getElementsByTagName("main")[0];

    // clear main
    removeChildren(main);

    // add the question number
    addQuestionHeader(main);

    // add the question text
    addQuestionText(main);

    // add the question answers
    addAnswerButtons(main);

    // create div for quiz navigation buttons
    const div = document.createElement("div");
    div.setAttribute("class", "geo-quiz-nav");

    // if not the first question add a previous button
    if (index != 0) {
        addPrevButton(div);
    }

    // add submit or next button based on question number
    if (index == questions.length - 1) {
        addSubmitButton(div);
    } else {
        addNextButton(div);
    }

    main.appendChild(div);
}


function startNewGame() {
    // select 5 random questions from the question banks
    selectRandomQuestions(5);
    index = 0;

    // display the first question
    displayQuestion(index);
}

window.onload = startNewGame();
