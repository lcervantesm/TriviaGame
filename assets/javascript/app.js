var time = 15;
var randomQuestion;
var goodGuess;
var badGuess;
var timer;
var copy = [];

var questions = [
    {
        question: "Which of the following is not a programming language?",
        correctAns: "HTML",
        answers: ["HTML", "Javascript", "C++", "Ruby on Rails"],
        correctIMG: "./assets/img/correct1.webp",
        wrongIMG: "./assets/img/wrong1.webp"
    },
    {
        question: "Which of the following is the most used JS Library?",
        correctAns: "jQuery",
        answers: ["AWS", "jQuery", "SIT", "Js"],
        correctIMG: "./assets/img/correct2.webp",
        wrongIMG: "./assets/img/wrong2.webp"
    },
    {
        question: "Who is the creator of the JavaScript scripting language?",
        correctAns: "Brendan Eich",
        answers: ["Guido van Rossum", "Larry Wall", "Brendan Eich", "Sergey Brin"],
        correctIMG: "./assets/img/correct3.webp",
        wrongIMG: "./assets/img/wrong3.webp"
    },
    {
        question: "Which is the jQuery selector?",
        correctAns: "$",
        answers: ["J", "$", "&", "s"],
        correctIMG: "./assets/img/correct4.webp",
        wrongIMG: "./assets/img/wrong4.webp"
    },
    {
        question: "Who invented Bootstrap?",
        correctAns: "Twitter",
        answers: ["Twitter", "Facebook", "Google", "Amazon"],
        correctIMG: "./assets/img/correct5.webp",
        wrongIMG: "./assets/img/wrong5.webp"
    },
    {
        question: "Which famous computer scientist killed himself by eating a posion apple?",
        correctAns: "Alan Touring",
        answers: ["Bjarne Stroustrup", "Robert Prim", "Donald Knuth", "Alan Touring"],
        correctIMG: "./assets/img/correct1.webp",
        wrongIMG: "./assets/img/wrong1.webp"
    },
    {
        question: "Animations and interactivity with user on web pages can be done by",
        correctAns: "JavaScript",
        answers: ["PHP", "Visual Basic", "JavaScript", "C#"],
        correctIMG: "./assets/img/correct2.webp",
        wrongIMG: "./assets/img/wrong2.webp"
    },
    {
        question: "Another term for programs is",
        correctAns: "Software",
        answers: ["Software", "Shareware", "Hardware", "Firmware"],
        correctIMG: "./assets/img/correct3.webp",
        wrongIMG: "./assets/img/wrong3.webp"
    },
    {
        question: "Process or set of rules to be followed in calculations or other problem-solving operations, especially by a computer.",
        correctAns: "Algorithm",
        answers: ["String", "Algorithm", "Object", "Array"],
        correctIMG: "./assets/img/correct4.webp",
        wrongIMG: "./assets/img/wrong4.webp"
    },
    {
        question: "CSS stands for",
        correctAns: "Cascade Style Sheets",
        answers: ["Copy Style Sheets", "Coco Style Sheets", "Car State Symphony", "Cascade Style Sheets"],
        correctIMG: "./assets/img/correct5.webp",
        wrongIMG: "./assets/img/wrong5.webp"
    }
];

$("#startGame").on("click", function(event){
    event.preventDefault();

    for (var i = 0; i < questions.length; i++){
        copy.push(questions[i]);
    }
    goodGuess = 0;
    badGuess = 0;
    startGame();
});

$(document.body).on("click", "#restart", function(event){
    event.preventDefault();

    // window.location.reload(false);
    for (var i = 0; i < questions.length; i++){
        copy.push(questions[i]);
    }
    console.log(copy);
    goodGuess = 0;
    badGuess = 0;
    startGame();
});

$(document.body).on("click", ".userGuess", function (event) {
    event.preventDefault();

    if ($(this).attr("data-answer") === randomQuestion.correctAns){
        wins();
        clearInterval(timer); //stop timer
        setTimeout(function () { startGame(); }, 4000);
    }else{
        loses();
        clearInterval(timer); //stop timer
        setTimeout(function() { startGame(); }, 4000);
    }
});

function startGame(){
    var rand = copy[Math.floor(Math.random()*copy.length)]; //Select Random Question
    var pos = copy.indexOf(rand);
    randomQuestion = rand;
    reset();
    runTimer();
    if (copy.length > 0){
        addToDOM(rand);
        copy.splice(pos,1); //Remove selection from original array
    } else {
        clearInterval(timer);
        finalScreen();
    }
}

function addToDOM(arg){
    var addTo = $('#mainGame');
    var addQuestion = $('#question');
    var h3 = $('<h3>');
    var div = $("<div>");
    var ul = $("<ul>");
    var row = $("<div>");
    var timerRow = $("<div>");
    var timerDiv = $("<div>");
    var timerSpan = $("<span>");
    var j = arg.answers.length;

    div.addClass("col");
    row.addClass("row text-center");
    timerDiv.addClass("col");
    timerRow.addClass("row text-center");
    timerDiv.addClass("timer");

    timerSpan.attr("id","seconds");
    timerSpan.html(time);
    timerDiv.text("Time Left: ");

    timerDiv.append(timerSpan);
    timerRow.append(timerDiv);
    addTo.append(timerRow);

    h3.addClass("friends-txt");
    h3.text(arg.question);
    addQuestion.html(h3);

    shuffleArray(arg.answers); //Shuffle the answers array so the answers don't always appear in the same place
    for(var i = 0; i < arg.answers.length; i++){ //While K is less than the number of answers
        var li = $('<li>');

        li.addClass("friends-txt2 m-3 userGuess");
        li.attr("data-answer", arg.answers[i]);
        li.text(arg.answers[i]);
        ul.append(li);
        div.append(ul);
        row.append(div);
        addTo.append(row);
    }
}

function createTimer(){
    time--;

    $("#seconds").text(time);

    if (time === 0){
        clearInterval(timer); //stop timer
        loses(); //Loses because user ran out of time
        setTimeout(function() { startGame(); }, 4000); //wait 4 seconds before calling the startGame function
    }
}

function runTimer(){
    timer = setInterval(createTimer, 1000);
}

function reset(){
    time = 15;
    $('#mainGame').html("");
}

function loses(){
    var img = $("<img>");
    var addTo = $('#mainGame');
    var row1 = $("<div>");
    var row2 = $("<div>");
    var col1 = $("<div>");
    var col2 = $("<div>");
 
    badGuess++;

    img.attr("src", randomQuestion.wrongIMG);
    img.attr("alt", "Bad Guess Gif");

    row1.addClass("row text-center mb-3");
    row2.addClass("row text-center");
    col1.addClass("col friends-txt");
    col2.addClass("col friends-txt");

    col1.text("WRONG! The answer is: "+randomQuestion.correctAns);
    row1.append(col1);
    addTo.html(row1);

    col2.html(img);
    row2.append(col2);
    addTo.append(row2);

}

function wins(){
    var img = $("<img>");
    var addTo = $('#mainGame');
    var row1 = $("<div>");
    var row2 = $("<div>");
    var col1 = $("<div>");
    var col2 = $("<div>");
 
    goodGuess++;

    img.attr("src", randomQuestion.correctIMG);
    img.attr("alt", "Good Guess Gif");

    row1.addClass("row text-center mb-3");
    row2.addClass("row text-center");
    col1.addClass("col friends-txt text-center");
    col2.addClass("col friends-txt text-center");

    col1.text("You are absolutely right!");
    row1.append(col1);
    addTo.html(row1);

    col2.html(img);
    row2.append(col2);
    addTo.append(row2);

}

function finalScreen(){
    var gameOverMsg = $('#question');
    var h3 = $('<h3>');
    var wa = $('<h3>');
    var ca = $('<h3>');
    var btn = $('<button>');
    var row = $("<div>");
    var col = $("<div>");
    var addTo = $('#mainGame');

    h3.addClass("friends-txt");
    wa.addClass("friends-txt mt-3");
    ca.addClass("friends-txt mt-3");
    row.addClass("row textcenter");
    btn.addClass("btn friends-txt mt-5");
    col.addClass("col");

    h3.text("Game Over! Check your results");
    ca.text("Correct Answers: "+goodGuess);
    wa.text("Wrong Answers: "+badGuess);
    btn.text("Restart");

    col.append(ca);
    col.append(wa);
    col.append(btn);
    row.append(col);

    btn.attr("id","restart");
    addTo.html(row);
    gameOverMsg.html(h3);

}

function shuffleArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
