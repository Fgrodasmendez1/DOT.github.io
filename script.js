 // VAR WITH ARRAY AND OBJECTS FOR QUESTIONS 
 var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed with ____.",
        choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
        answer: "Parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],
        answer: "All of the Above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
        answer: "Quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "Terminal / Bash", "For Loops", "Console Log"],
        answer: "Console Log"
    },

];

// DECLARED VARIABLES
var score = 0;
var questionIndex = 0;

// START WORKING CODE 
// DECLARED VARIABLES
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// SECONDS LEFT IS 15 SECONDS PER QUESTION:
var secondsLeft = 76;

// HOLDS INTERVAL TIME
var holdInterval = 0;

// HOLDS PENALTY TIME
var penalty = 10;

// CREATES NEW ELEMENTS
var ulCreate = document.createElement("ul");

// TRIGGERS TIMER ON BUTTON, SHOWS USER A DISPLAY ON THE SCREEN
timer.addEventListener("click", function () {

    // WE ARE CHECKING ZERO BECAUSE ITS ORIGINALLY SET TO ZERO
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// RENDERS QUESTIONS AND CHOICES TO PAGE: 
function render(questionIndex) {

    // CLEARS EXISTING DATA 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";

    // FOR LOOPS TO LOOP THROUGH ALL INFO IN ARRAY
    for (var i = 0; i < questions.length; i++) {

        // APPENDS QUESTION TITLE ONLY
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }

    // NEW FOR EACH FOR QUESTION CHOICES
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// EVENT TO COMPARE CHOICES WITH ANSWER
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        
        // CORRECT CONDITION 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            
        // INCORRECT CONDITION 
        } else {

            // WILL DEDUCT -5 SECONDS OFF SECONDS LEFT FOR WRONG ANSWER
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // QUESTION INDEX DETERMINES QUESTION NUMBER
    questionIndex++;

    if (questionIndex >= questions.length) {
      
        // ALL DONE WILL APPEND LAST PAGE WITH USER STATS
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
        
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}

// ALL DONE WILL APPEND LAST PAGE
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // HEADING:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // PARAGRAPH
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // CALCULATES TIME REMAINING AND REPLACES IT WITH SCORE
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // LABEL
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials:";

    questionsDiv.appendChild(createLabel);

    // INPUT
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // SUBMIT
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

// EVENT LISTENER TO CAPTURE INITIALS AND LOCAL STORAGE FOR INITIALS AND SCORE
createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            
            // TRAVELS TO FINAL PAGE
            window.location.replace("./HighScores.html");
        }
    });
}