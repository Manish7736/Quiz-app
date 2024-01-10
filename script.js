const questions=[
{
    question:"1. Number of primtive data types in java are ?",
    answers:[
        {text: "6" ,correct:false},
        {text: "7" ,correct:true},
        {text: "8" ,correct:false},
        {text: "10" ,correct:false},
    ]
},

{
    question:"2. Automatic type conversion is possible in which of the possible case?",
    answers:[
        {text: "Byte to int" ,correct:false},
        {text: "int to long" ,correct:true},
        {text: "Long to int" ,correct:false},
        {text: "Short toint" ,correct:false},
    ]
},
{
    question:"3. what is  the size of float and double in java??",
    answers:[
        {text: "32 and 64" ,correct:true},
        {text: "32 and 32" ,correct:false},
        {text: "64 and 64" ,correct:false},
        {text: "64 and 32" ,correct:false},
    ]
},
{
    question:"4. _____ is used to find and fix bugs in the Java programs.?",
    answers:[
        {text: "JVM" ,correct:false},
        {text: "JRE" ,correct:false},
        {text: "JDK" ,correct:false},
        {text: "JDB" ,correct:true},
    ]
},
{
    question:"5.In which process, a local variable has the same name as one of the instance variables?",
    answers:[
        {text: "Serialization" ,correct:false},
        {text: "Variable Shadowing" ,correct:true},
        {text: "Abstraction" ,correct:false},
        {text: "Multi-threading" ,correct:false},
    ]
}

];
const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML=questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click" , selectAnswer);
    });
}


function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect= selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `your scored ${score} out of ${questions.length}!`;
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


nextButton.addEventListener("click",() => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
