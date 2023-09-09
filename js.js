const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false},
            { text: "Madrid", correct: false},
            { text: "Paris", correct: true},
            { text: "Berlin", correct: false}, 
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Mars", correct: true},
            { text: "Earth", correct: false},
            { text: "Venus", correct: false},
            { text: "Jupiter", correct: false}, 
        ]
    },
    {
        question: "The sum of two numbers is 15 and the sum of their squares is 113. Find the numbers?",
        answers: [
            { text: "5,6", correct: false},
            { text: "6,7", correct: false},
            { text: "8,9",  correct: false},
            { text: "7,8", correct: true},
        ]
    },
    {
        question: "GB stands for?",
        answers: [
            { text: "Gilobit", correct: false},
            { text: "Gigabyte", correct: true},
            { text: "Gilobyte", correct: false},
            { text: "Gigabit", correct: false},
        ]
    },
    {
        question: "RAM consists of binary numbers 0s and?",
        answers: [
            { text: "1s", correct: true},
            { text: "2s", correct: false},
            { text: "3s", correct: false},
            { text: "4s", correct: false},
        ]
    },
    {
        question: "Which kind of storage device can be carried around?",
        answers: [
            { text: "Hard disk drive", correct: false},
            { text: "System cabinet", correct: false},
            { text: "Hard disk", correct: false},
            { text:  "Floppy disk", correct: true},
        ]
    },
    {
        question: "Pride is related to Humility in the same way as Desire is related to?",
        answers: [
            { text: "Indifference", correct: false},
            { text: "Supress", correct: false},
            { text: "Wish", correct: false},
            { text: "Hate", correct: true}
        ]
       },
    {
        question: "What is the largest mammal in the world?",
        answers: [
            { text: "Giraffe", correct: false},
            { text: "Elephant", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Hippopotamus", correct: false}, 
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you Scored ${score} out of ${questions.
    length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();