function checkAnswers() {
    const correctAnswers = ["false", "false", "false", "true", "true"];
    let score = 0;
    const form = document.getElementById("quiz-form");
    const result = document.getElementById("result");
    let answers = [];

    for (let i = 1; i <= correctAnswers.length; i++) {
        const answer = form.querySelector(`input[name="q${i}"]:checked`);
        if (answer && answer.value === correctAnswers[i - 1]) {
            score++;
        }
    }

    if (result.childNodes.length == 0) {
        const scoreText = document.createElement("p");
        scoreText.textContent = `You scored ${score} out of ${correctAnswers.length}`;
    
        result.appendChild(scoreText);
    
        const restartButton = document.createElement("nav");
        restartButton.setAttribute("id", "restart-button");
    
        const restartLink = document.createElement("a");
        restartLink.textContent = "RESTART";
        restartLink.setAttribute("href", "sports_quiz.html");
    
        restartButton.appendChild(restartLink);
        result.appendChild(restartButton);

        scrollTo(0, document.body.scrollHeight);
    }
}