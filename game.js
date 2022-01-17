const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

function nextSequence(){
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    $(".btn").click(function(){
        const userChosenColour = this.id;
        playSound(userChosenColour);
        animatePress(userChosenColour);
        userClickedPattern.push(userChosenColour);
    })
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

nextSequence();