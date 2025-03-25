import { allQuestions } from "./data/geo_questions.js";


var questions = selectRandomQuestions(4);
var index = 0;

function selectRandomQuestions(numQuestions) {
    // declare array to store selected questions
    var selectedQuestions = new Array(numQuestions);

    // repeat for each question to be included in quiz
    for (let i = 0; i < numQuestions; i++) {
        while (true) {
            // calculate a random index
            let randomIndex = Math.floor(Math.random() * allQuestions.length);

            // check if question has already been selected
            if (selectedQuestions.includes(allQuestions[randomIndex])) {
                continue;
            } else {
                selectedQuestions[i] = allQuestions[randomIndex];
                break;
            }
        }
    }

    // return the selected questions
    return selectedQuestions;
}

// updates the users chosen answer
function updateAnswer(answer) {
    questions[index].chosenAnswer = answer;
}

function addQuestionHeader(node) {
    // create question header
    const questionLabel = document.createElement("h2");
    questionLabel.textContent = `Question ${index + 1}`;

    node.appendChild(questionLabel);
}

function addQuestionText(node) {
    // create question text
    const questionText = document.createElement("p");
    questionText.textContent = `${questions[index].question}`;

    node.appendChild(questionText);
}

function createAnswerLabel(answerNum, answerText) {
    // add label for answer button
    const answerLabel = document.createElement("label");
    answerLabel.setAttribute("for", `answer${answerNum}`);
    answerLabel.textContent = answerText;

    return answerLabel;
}

function createAnswerButton(answerNum) {
    // create answer button
    const answerButton = document.createElement("input");

    // set attributes
    answerButton.setAttribute("type", "radio");
    answerButton.setAttribute("name", "answers");
    answerButton.setAttribute("id", `answer${answerNum}`);

    // set to checked if it is the users previously chosen answer
    if (questions[index].chosenAnswer == answerNum) {
        answerButton.setAttribute("checked", "checked");
    }

    // add onclick function to update users answer
    answerButton.addEventListener("click", () => updateAnswer(answerNum));

    return answerButton;
}

function addQuestionAnswers(node) {
    // add all question answers
    for (const [answerNum, answerText] of Object.entries(questions[index].answers)) {
        // add answer radio button
        const answerButton = createAnswerButton(answerNum);
        node.appendChild(answerButton);

        // add label for answer button
        const anserLabel = createAnswerLabel(answerNum, answerText);
        node.appendChild(anserLabel);
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
    prevButton.textContent = "PREV";
    prevButton.addEventListener("click", displayPreviousQuestion);

    node.appendChild(prevButton);
}

// add a button to continue to the next question
function addNextButton(node) {
    const nextButton = document.createElement("button");
    nextButton.textContent = "NEXT";
    nextButton.addEventListener("click", displayNextQuestion);

    node.appendChild(nextButton);
}

// add a button to submit answers
function addSubmitButton(node) {
    const submitButton = document.createElement("button");
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
    scoreHeader.textContent = "You scored:";
    main.appendChild(scoreHeader);


    // display score
    const score = document.createElement("p");
    score.textContent = `${calculateScore()}/${questions.length}`;
    main.appendChild(score);

    // display message thanking user for playing
    const message = document.createElement("p");
    message.textContent = "Thank you for playing!";
    main.appendChild(message);

    // display nav link to play again
    const nav = document.createElement("nav");

    const link = document.createElement("a");
    link.textContent = "PLAY AGAIN?";
    link.setAttribute("href", "geography_quiz.html");
    nav.appendChild(link);

    main.appendChild(nav);
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
    addQuestionAnswers(main);

    // if not the first question add a previous button
    if (index != 0) {
        addPrevButton(main);
    }

    // add submit or next button based on question number
    if (index == questions.length - 1) {
        addSubmitButton(main);
    } else {
        addNextButton(main);
    }
}

// display first question after loading page
window.onload = displayQuestion(0);
