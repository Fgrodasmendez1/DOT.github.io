// DECLARED VARIABLE
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// EVENT LISTENERS TO CLEAR SCORES 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// RETRIEVE LOCAL STORAGE 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}

// EVENT LISTENER TO MOVE TO INDEX PAGE
goBack.addEventListener("click", function () {
    window.location.replace("./index.html")
});