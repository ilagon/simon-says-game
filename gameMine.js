var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = []; //Store current sequence
var userClickPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

$('.btn').click(function () {
    var userChosenColour = $(this).attr('id');
    userClickPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playAudio(userChosenColour);

    checkAnswer(userClickPattern.length - 1);

});


function nextSequence() {

    userClickPattern = [];

    level++;
    $("#level-title").text("level " + level);

    let randomNumber = Math.floor(Math.random() * 4); //Generate random numbers from 1 - 4
    let randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);

    playAudio(randomChosenColour);
}

function playAudio(name) {
    var audio = new Audio("/sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass('pressed')

    setTimeout(function () {
        $(`#${currentColour}`).removeClass('pressed');
    }, 100);

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to restart");


        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        playAudio("wrong");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

