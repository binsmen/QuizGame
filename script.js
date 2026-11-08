// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
{
    question: "Who is gay among the given options?",
    answers: [
    { text: "Neel", correct: false },
    { text: "Kishore{USA}", correct: false },
    { text: "Abinivesh", correct: true },
    { text: "paarth", correct: false },
    ],
},
{
    question: "What do you think of Neel?",
    answers: [
    { text: "child", correct: false },
    { text: "Mature_Boy", correct: true },
    { text: "Crazy{Ha}", correct: false },
    { text: "None", correct: false },
    ],
},
{
    question: "Who is most having the dark skin color{NIGGA}",
    answers: [
    { text: "Neel{NO_WAY}", correct: false },
    { text: "Abinivesh", correct: false },
    { text: "Paarth", correct: false },
    { text: "Kishore{Likely}", correct: true },
    ],
},
{
    question: "Which language does Neel knows",
    answers: [
    { text: "Arabi", correct: false },
    { text: "Urdu", correct: false },
    { text: "Japanese", correct: true },
    { text: "punjabi", correct: false },
    ],
},
{
    question: "Why are u born?",
    answers: [
    { text: "For fun", correct: false },
    { text: "Become success", correct: false },
    { text: "Don't Know", correct: false },
    { text: "To Fail in Life", correct: true },
    ],
},
];

let currentQuestionIndex = 0
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


// Adding Event listeners

startButton.addEventListener("click",startQuiz);
restartButton.addEventListener("click",restartQuiz);

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    //Call the show question function 
    showQuestion();
}

function showQuestion(){
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent=currentQuestionIndex+1;

    const progressPercent = (currentQuestionIndex/quizQuestions.length)*100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach ( answer =>{
        const button  = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click",selectAnswer);
        answersContainer.appendChild(button);
    }) 
}


function selectAnswer(event){
    //optimization check --> Only one clickable opportunity
    if(answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";


    Array.from(answersContainer.children).forEach((button) =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        else if(button === selectedButton){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex<quizQuestions.length){
            showQuestion();
        }else{
            showResults();
        }
    },1000)
}

function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;
    
    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}

function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}