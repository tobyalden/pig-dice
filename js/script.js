function Player(playerName, score, turnScore) {
  this.playerName = playerName;
  this.score = score;
  this.turnScore = turnScore;
}

Player.prototype.rollDie = function() {
  var rollScore = 0;
  var diceArray = [];
  var isP2AI;

  var dice1 = Math.floor(Math.random() * 6) + 1;
  var dice2 = Math.floor(Math.random() * 6) + 1;

  if (dice1 !== 1 && dice2 !== 1) {
    this.turnScore += dice1 + dice2;
  } else {
    this.turnScore = 0;
    return "Hit One";
  }

  diceArray.push(dice1, dice2);
  return diceArray;
}

Player.prototype.stop = function() {
  this.score += this.turnScore;
  this.turnScore = 0;
}

Player.prototype.newTurn = function() {
  this.turnScore = 0;
}

Player.prototype.scoreCheck = function() {
  if(this.score >= 100) {
    return "Win";
  }
}

Player.prototype.newGame = function() {
  this.turnScore = 0;
  this.score = 0;
}

$(document).ready(function() {
  $(".first-row").hide();
  $(".buttons-1").hide();
  $(".buttons-2").hide();

  $("#player-name-form").submit(function(event) {
    event.preventDefault();

    var player1input = $("#player-1").val();
    var player2input = $("#player-2").val();
    isP2AI = $("input#ai").prop('checked');

    $(".player-1-name").text(player1input);
    $(".player-2-name").text(player2input);

    var player1 = new Player(player1input, 0, 0);
    var player2 = new Player(player2input, 0, 0);

    $(".first-row").fadeIn("fast");
    $(".buttons-1").fadeIn("slow");


    $(".roll-1").click(function() {
      var player1Dice = player1.rollDie();
      $(".player-1-roll").text(" " + player1Dice);
      $(".player-1-score").text(" " + player1.turnScore);
      $(".player-1-total-score").text(" " + player1.score);
      if (player1Dice === "Hit One") {
        toggleButtons(true);
        if(isP2AI) {
          takeTurnAI();
        }
      };
        var winner = player1.scoreCheck();
    });

    $(".stop-1").click(function() {
      player1.stop();
      $(".player-1-total-score").text(" " + player1.score);
      $(".player-1-score").text(" " + player1.turnScore);
      var winner = player1.scoreCheck();
      if (winner === "Win") {
        alert("Congratulations " + player1.playerName +" you win! GAME OVER!")
        player1.newGame();
        player2.newGame();
        $(".player-1-total-score").text(" " + player1.score);
        $(".player-1-score").text(" " + player1.turnScore);
        $(".player-2-total-score").text(" " + player2.score);
        $(".player-2-score").text(" " + player2.turnScore);
        $(".player-1-roll").text(" ");
        $(".player-2-roll").text(" ");
      } else {
        toggleButtons(true);
        if(isP2AI) {
          takeTurnAI();
        }
      }
    });

    $(".roll-2").click(function() {
      var player2Dice = player2.rollDie();
      $(".player-2-roll").text(" " + player2Dice);
      $(".player-2-score").text(" " + player2.turnScore);
      $(".player-2-total-score").text(" " + player2.score);
      if (player2Dice === "Hit One") {
        toggleButtons(false);
      }
      var winner = player2.scoreCheck();
    });


    $(".stop-2").click(function() {
      player2.stop();
      $(".player-2-total-score").text(" " + player2.score);
      $(".player-2-score").text(" " + player2.turnScore);
      var winner = player2.scoreCheck();
      if (winner === "Win") {
        alert("Congratulations " + player2.playerName + " you win! GAME OVER!")
        player1.newGame();
        player2.newGame();
        $(".player-1-total-score").text(" " + player1.score);
        $(".player-1-score").text(" " + player1.turnScore);
        $(".player-2-total-score").text(" " + player2.score);
        $(".player-2-score").text(" " + player2.turnScore);
        $(".player-1-roll").text(" ");
        $(".player-2-roll").text(" ");
      } else {
        toggleButtons(false);
      }
    });

    function takeTurnAI() {

      var startTime = Date.now();

      $('button.roll-2').trigger('click');
      while(player2.turnScore < 10 && $(".player-1-roll").text() != "Hit One") {
        $('button.roll-2').trigger('click');
      }

      if($(".player-1-roll").text() != "Hit One") {
        $('button.stop-2').trigger('click');
      }

// debugger;

//       while(player2.turnScore < 10 && $(".player-1-roll").text() != "Hit One") {
//         var nowTime = Date.now();
//         if(startTime + 2000 < nowTime) {
// // debugger;
//           $('button.roll-2').trigger('click');
//           startTime = Date.now();
//         }
//       }


    }


    function toggleButtons(toggleP1Off) {
      if (toggleP1Off) {
        $(".buttons-1").fadeOut("slow");
        $("button.roll-1").prop('disabled', true);
        $("button.stop-1").prop('disabled', true);
        $(".buttons-2").fadeIn("slow");
        if(!isP2AI) {
          $("button.roll-2").prop('disabled', false);
          $("button.stop-2").prop('disabled', false);
        }
      } else {
        $(".buttons-2").fadeOut("slow");
        $("button.roll-2").prop('disabled', true);
        $("button.stop-2").prop('disabled', true);
        $(".buttons-1").fadeIn("slow");
        $("button.roll-1").prop('disabled', false);
        $("button.stop-1").prop('disabled', false);
      }
    }

  });
});
