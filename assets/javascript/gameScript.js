/* Building the game using object oriented classes. 1 Game class as a framework for the game. Questions class is used to load guestions into the game object. 
Originally tried using standard arrays for the questions but was inconvenient for iterating through the multiple choice array of options */
class Game {
  constructor(questions, time) {
    this.score = 0;
    this.questions = questions;
    this.index = 0;
    this.time = time;
    this.penalty = 3;
  }

  // method to determine the round number
  /* getIndex = (() =>{
        return this.question[this.index];
    }); */

  gameTimer = (selection, currentSeconds) => {
    //do something
  };

  //method to determine if the user selection is correct.
  gradeSelection = selection => {
    if (this.questions[this.index].answer === selection) {
      this.score++;
    }
    this.index++;
  };

  // method to determine if the last round is reached and the gema is over.
  isGameOver = () => {
    return this.index === this.questions.length;
  };
}

// Questions class used to strucure question object with a string question sentence, array of options, string answer.
class Question {
  constructor(sentence, options, answer) {
    this.sentence = sentence;
    this.options = options;
    this.answer = answer;
  }
}

//listener to make sure dom is loaded prior to firing the game code.
document.addEventListener("DOMContentLoaded", function(event) {
  $("#startButton").click(() => {
    // initiate an instance of the game object. (Game is the blue print and game is the house)
    var game = new Game(questions);

    $(".game-time").css("display", "flex"); // unhide the card containing the game html
    $(".pre-game").css("display", "none"); // hide the pre-game info.
    timer(20);
    playRound();

    function playRound() {
      console.log(game.isGameOver());
      if (game.isGameOver()) {
        finalScore();
      } // if game is not over, load up a round
      else {
        //populate current question to the html
        $("#currentQuestion").text(game.questions[game.index].sentence);

        // empty the options game area of any prior option buttons
        $("#optionsList").empty();
        //create button elements for each option
        game.questions[game.index].options.forEach((element, index) => {
          $("#optionsList").append(
            $("<li>")
              .attr("id", "option" + index)
              .addClass("btn btn-info btn-lg m-1 options")
              .text(element)
              .click(gradeSelection)
          );
        });

        updateGameScore();

        //updateTimeLeft();
      }
    }
    // determine if the user selection is correct and adjust time remaining if incorrect
    function gradeSelection(event) {
      game.gradeSelection(event.target.innerText);

      playRound();
    }

    function timer(seconds) {
      $("#seconds").text(seconds);
    }

    // function to update score after each round
    function updateGameScore() {
      $("#currentScore").text("Score: " + game.score);
      $("#rounds").text(parseInt(game.index) + 1 + " of " + questions.length);
    }

    //function to display final scores
    function finalScore() {
      $(".game-time").css("display", "none");
      $(".post-game").css("display", "flex");

      var score = ((game.score / questions.length) * 100).toFixed(0);
      $("#playerScore").text(
        "You answered " +
          game.score +
          " of " +
          questions.length +
          " questions correct."
      );
      $("#scoreInfo").text("Your JavaScript score is " + score + "%");
    }

    // function to restart game.

    $("#replayButton").click(() => {
      location.reload();
    });

    // var timeLeft = 10;
  }); //end of start click
}); // end of Dom loaded listener

//Questions
var questions = [
  new Question(
    "Which of the following is correct about JavaScript?",
    [
      "JavaScript is a lightweight, interpreted programming language.",
      "JavaScript has object-oriented capabilities that allows you to build interactivity into otherwise static HTML pages.",
      "The general-purpose core of the language has been embedded in Netscape, Internet Explorer, and other web browsers.",
      "All of the above"
    ],
    "All of the above"
  ),
  new Question(
    "Which built-in method reverses the order of the elements of an array?",
    ["changeOrder(order)", " reverse()", "sort(order)", "None of the above."],
    "changeOrder(order)"
  ),
  new Question(
    "Which of the following function of Boolean object returns a string containing the source of the Boolean object?",
    ["toSource()", "valueOf()", "toString()", "None of the above"],
    "toSource()"
  ),
  new Question(
    "Which of the following function of String object executes the search for a match between a regular expression and a specified string?",
    [" concat()", "match()", "replace", "search()"],
    "search()"
  ),
  new Question(
    "Which of the following function of String object returns a string representing the specified object?",
    ["toLocaleUpperCase()", "toUpperCase()", "toString()", "substring()"],
    "toString()"
  ),
  new Question(
    "Which of the following function of Array object calls a function for each element in the array?",
    ["concat()", "every()", "filter()", "forEach()"],
    "forEach()"
  ),
  new Question(
    "Which built-in method reverses the order of the elements of an array?",
    ["changeOrder(order)", " reverse()", "sort(order)", "None of the above."],
    "changeOrder(order)"
  ),
  new Question(
    "Who created JavaScript?",
    ["Microsoft", "Sun Microsystems", "Oracle", "Netscape"],
    "Netscape"
  ),
  new Question(
    "Which of the following is the correct syntax to create a cookie using JavaScript?",
    [
      "document.cookie = 'key1 = value1; key2 = value2; expires = date';",
      "browser.cookie = 'key1 = value1; key2 = value2; expires = date';",
      "window.cookie = 'key1 = value1; key2 = value2; expires = date';",
      "navigator.cookie = 'key1 = value1; key2 = value2; expires = date';"
    ],
    "document.cookie = 'key1 = value1; key2 = value2; expires = date'"
  ),
  new Question(
    "Is JavaScript a front-end, back-end, or full-stack programming language?",
    ["Front-end", "Back-end", "Full-stack", "Half-baked"],
    "Full-stack"
  )
];
// function for game timer
/* function gameTimer(seconds){
        alert("Game Timer");
      document.getElementById("timer").innerText = "Time Remaining " + seconds;
      var interval = setInterval(() => {
        $("#timer").innerText = "Time Remaining " + seconds; 
        seconds--;
      })
      if(seconds < 0){
        clearInterval(interval);
        finalScore();
      }
    } */
