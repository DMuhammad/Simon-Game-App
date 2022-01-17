const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    const userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
    userClickedPattern = [];
    $("#level-title").text(`Level ${level}`);
    level++;
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
};

function playSound(name){
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour){
    $(`.${currentColour}`).addClass("pressed");
    setTimeout(function(){
        $(`.${currentColour}`).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        startOver();
    }
}

function startOver(){
    gamePattern = []
    level = 0;
    started = false;
}