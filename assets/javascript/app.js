// Each multiple choice question is stored as a object in the array 'questions', with all the possible choices as 'options'
// Answer to each question is stored in the 'answer', gif image url is in 'gif'
var multipleChoiceQuiz = [
    {
        question: "What is i++ equivalent to?",
        options: ["i = i + 1", "i = i - 1", "i = i + i", "i = 1 + 1"],
        answer: "i = i + 1",
        gif: "https://media.giphy.com/media/26BGIqWh2R1fi6JDa/giphy.gif"
    },
    {
        question: "What is the range for the random number that Math.random() generates?",
        options: ["between 0 and 1, including 1", "between -1 and 1", "between 0 and 10", "between 0 and 1, not including 1"],
        answer: "between 0 and 1, not including 1",
        gif: "https://media.giphy.com/media/vzO0Vc8b2VBLi/giphy.gif"
    },
    {
        question: "What game theme did Quincy say would earn extra points for this assignment?",
        options: ["Pokeman", "Chinpokomon", "Pokemon", "Pokebowl"],
        answer: "Pokemon",
        gif: "https://media.giphy.com/media/3ov9jNziFTMfzSumAw/giphy.gif"
    },
    {
        question: "What is jQuery?",
        options: ["JavaScript library", "JavaScript convention", "JavaScript parameter", "Javascript friendo"],
        answer: "JavaScript library",
        gif: "https://media.giphy.com/media/349qKnoIBHK1i/giphy.gif"
    },
    {
        question: "Which is a correct example of camel casing?",
        options: ["IDONOTKNOWWHATTODO", "Idonotknowwhattodo", "iDoNotKnowWhatToDo", "IDoNotKnowWhatToDo"],
        answer: "iDoNotKnowWhatToDo",
        gif: "https://media.giphy.com/media/pOKrXLf9N5g76/giphy.gif"
    }

];

// variables for correct, wrong and unanswered question count
var numCorrect = 0;
var numWrong = 0;
var numUnanswered = 0;
var number = 35  // 35 seconds = 30 seconds displaying question + 5 seconds displaying gif
var intervalId; // variable to store the setInterval
var clockRunning = false; // slows down the timer
var i = 0; // first question index

// event listener for the start button, unbind() so it only clicks once
$("#startButton").unbind().click(function () {
    start();
});

// Function for when the start button is pressed 
function start() {
        newQuestion(); // loads the first question
        $("#startButton").hide(); // Hide the start button
        if (!clockRunning) {
            intervalId = setInterval(countdown, 1000); // run countdown function every second
        }
    }

// function for counting down seconds during the question and answer display
function countdown() {
        number--;
        if (number > 5) { // 5 second is alloted time of the gif
            // what is actually displayed to the user is the time alloted minus 5 seconds
            $('#timer').text((number - 5) + " seconds remaining");

            // event listener for an option getting clicked, unbind() so that button can only be clicked once
            $("button").unbind().click(function () {
                number = 5; // immediately change counter to 4 seconds (move to gif image)
                var chosen = $(this).attr('value');
                if (chosen === multipleChoiceQuiz[i].answer) { // correct answer 
                    numCorrect++;
                    playGif();
                    $("#questionDisplay").prepend("<h2> Correct! </h2>");
                } else if (chosen !== multipleChoiceQuiz[i].answer) { // wrong answer
                    numWrong++;
                    playGif();
                    $("#questionDisplay").prepend("<h2> The correct answer was " + multipleChoiceQuiz[i].answer + "</h2>");
                }
            });
        } else if (number === 5) { // time ran out, display gif
            $('#timer').html("");
            numUnanswered++; // you reached the time limit so the question was unanswered
            playGif();
        } else if (number === 0) { // next question
            reset();
        }
    }

// function that resets the timer
function reset() {
        number = 36;
        //clockRunning = true;
        $("#questionDisplay").html("");
        i++;
        newQuestion();
    }

//
function playGif() {
        $("#questionDisplay").html("");
        $("#timer").html("");
        var image = $("<img>");
        image.attr("src", multipleChoiceQuiz[i].gif);
        $("#questionDisplay").append(image);
    }

// function for when you reach the end of the quiz
function endGame() {
        clockRunning = true;
        $("#questionDisplay").html("");
        clearInterval(intervalId);
        $("#timer").hide();
        // Displays the results from the quiz
        $("#questionDisplay").append("<h3>Correct Answers: " + numCorrect + "</h3>");
        $("#questionDisplay").append("<h3>Incorrect Answers: " + numWrong + "</h3>");
        $("#questionDisplay").append("<h3>Unanswered: " + numUnanswered + "</h3>");
        // adds a restart button to play the game again
        var restartGameButton = $("<button>");
        restartGameButton.text("Restart Game");
        restartGameButton.attr("onclick", "newGame();");
        $("#questionDisplay").append(restartGameButton);
    }

// function to clear to starting values of the counter variables
function newGame() {
        $("#questionDisplay").html("");
        $("#timer").show();
        numCorrect = 0;
        numWrong = 0;
        numUnanswered = 0;
        number = 35;
        i = 0;
        clockRunning = false;
        start();
    }

// This function formats each question object in the multiple choice quiz array for displaying
function newQuestion() {
        // Conditional when ending the game
        if (numCorrect + numWrong + numUnanswered === multipleChoiceQuiz.length) {
            endGame();
        } else {
            // Create a empty div 
            var questionDiv = $("<div>");

            // Appending the question
            questionDiv.append("<h2>" + multipleChoiceQuiz[i].question + "</h2><br>");

            // taking out the array of options from the object and storing as variable optionArray
            var optionArray = multipleChoiceQuiz[i].options;

            // Generating buttons for each of the options
            for (var j = 0; j < optionArray.length; j++) {
                var button = document.createElement("button");
                button.value = optionArray[j]; // Option is stored as a value attribute in button
                button.innerHTML = optionArray[j]; // Option shows up as text on the button
                button.className = "btn btn-secondary"; // Button looks good with Bootstrap
                questionDiv.append(button); // Add button to the div
                questionDiv.append("<br><br>"); // Inserts break between buttons for spacing
            }

            // add the question to the div
            $("#questionDisplay").append(questionDiv);
        } // close else

    } // close function newQuestion
