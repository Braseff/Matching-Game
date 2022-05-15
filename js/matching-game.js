window.addEventListener('load', generateFaces);
document.querySelector('#choice').addEventListener('change', getDifficulty);
document.querySelector('#choice').addEventListener('change', hideDifficultyChoice);
window.addEventListener('load', removeDifficultyAndScoreData)
window.onload = function() {
    let difficultyFromBrowser = localStorage.getItem('highscoreDifficulty')
    let scoreFromBrowser = localStorage.getItem('highscore');
    if (scoreFromBrowser != undefined) {
        highscore = scoreFromBrowser
        highscoreDifficulty = difficultyFromBrowser.charAt(0).toUpperCase() + difficultyFromBrowser.slice(1)
        document.querySelector('#highscore').innerHTML = 'A Previously Made Highscore Was ' + highscore + ' on ' + highscoreDifficulty +' difficulty!' + '\n\nCould You Beat It?';
    }
}


//global variables
let numberOfFaces = 5;
const theLeftSide = document.querySelector('#leftSide');
const theRightSide = document.querySelector('#rightSide');
let score = 0;
let highscore = 0;
let difficulty = '';
let previousScore = 0;
let highscoreDifficulty = '';
let fnafScore = 0

//create faces
function generateFaces() {

    for (let i=0; i<numberOfFaces; i++) {
        const face = document.createElement('img');
        face.src = 'https://iconarchive.com/download/i43127/oxygen-icons.org/oxygen/Emotes-face-smile.ico';

        const randomTop = Math.floor(Math.random() * 400) + 1;
        const randomLeft = Math.floor(Math.random() * 400) + 1;

        face.style.top = randomTop + 'px';
        face.style.left = randomLeft + 'px';

        theLeftSide.appendChild(face);
    }

    let leftSideImages = theLeftSide.cloneNode(true);
    leftSideImages.removeChild(leftSideImages.lastChild);
    theRightSide.appendChild(leftSideImages);
    theLeftSide.lastChild.addEventListener('click', nextLevel);

    theLeftSide.lastChild.onclick = updateScore();
    function updateScore() {
        document.querySelector('#game-score').innerHTML = score;
    }

    theLeftSide.addEventListener('click', gameOver)
}

//difficulty
function getDifficulty() {

    if (document.getElementById("baby").checked) {
        difficulty = 'baby'
        localStorage.setItem('difficulty', difficulty)
    }
    else if (document.getElementById("easy").checked) {
        difficulty = 'easy'
        localStorage.setItem('difficulty', difficulty)
    }
    else if (document.getElementById("mediocre").checked) {
        difficulty = 'mediocre'
        localStorage.setItem('difficulty', difficulty)
    }
    else if (document.getElementById("hard").checked) {
        difficulty = 'hard'
        localStorage.setItem('difficulty', difficulty)
    }
    else if (document.getElementById("challenging").checked) {
        difficulty = 'challenging'
        localStorage.setItem('difficulty', difficulty)
    }
    else if (document.getElementById("beastly").checked) {
        difficulty = 'beastly'
        localStorage.setItem('difficulty', difficulty)
    }
    else if (document.getElementById("legendary").checked) {
        difficulty = 'legendary'
        localStorage.setItem('difficulty', difficulty)
    }
    else if (document.getElementById("impossible").checked) {
        difficulty = 'impossible'
        localStorage.setItem('difficulty', difficulty)
    }
    else if (document.getElementById("FNAF").checked) {
        difficulty = 'FNAF'
        localStorage.setItem('difficulty', difficulty)
    }
}

//remove previous data and score
function removeDifficultyAndScoreData() {
    localStorage.removeItem('difficulty');
    localStorage.removeItem('score')
}

//hide difficulty after choice is made
function hideDifficultyChoice() {
    choice = document.querySelector('#choice');
    while (choice.firstChild) {
        choice.removeChild(choice.firstChild);
    }
    choice.remove()
}


// go to next level
function nextLevel() {

    playCorrect();
    event.stopPropagation();

    while(theLeftSide.firstChild) {
        theLeftSide.removeChild(theLeftSide.firstChild)
    }
    while(theRightSide.firstChild) {
        theRightSide.removeChild(theRightSide.firstChild)
    }
    //difficulty part 2
    if(localStorage.getItem('difficulty') == 'baby') {
        numberOfFaces += 0;
    }
    else if(localStorage.getItem('difficulty') == 'easy') {
        numberOfFaces += 1;
    }
    else if(localStorage.getItem('difficulty') == 'mediocre') {
        numberOfFaces += 2;
    }
    else if(localStorage.getItem('difficulty') == 'hard') {
        numberOfFaces += 3;
    }
    else if(localStorage.getItem('difficulty') == 'challenging') {
        numberOfFaces += 4;
    }
    else if(localStorage.getItem('difficulty') == 'beastly') {
        numberOfFaces += 5;
    }
    else if(localStorage.getItem('difficulty') == 'legendary') {
        numberOfFaces += 10;
    }
    else if(localStorage.getItem('difficulty') == 'impossible') {
        numberOfFaces += 100;
    }
    else if(localStorage.getItem('difficulty') == 'FNAF') {
        numberOfFaces -= 1;
    }
    else {
        alert("Choose A Difficulty!")
        document.location.reload(true)
    }
    score += 1;
    fnafScore += 1;
    //highscore
        if (score > highscore) {
    highscore = score;
    localStorage.setItem('highscore', highscore);
    localStorage.setItem('highscoreDifficulty', difficulty)

    }
    fnafJumpscare();
    generateFaces();
}




//Game over
function gameOver() {
    event.stopPropagation()
    theLeftSide.removeEventListener('click', gameOver);

    const losingScreen = document.createElement('div');
    losingScreen.setAttribute('id','totalScore');
    losingScreen.setAttribute('class','end-screen');

    theLeftSide.lastChild.removeEventListener('click', nextLevel);

    const finalScore = document.querySelector('#game-score').innerText

    if (finalScore == 1) {
        losingScreen.appendChild(document.createTextNode('\n\nYou found\n\n' + finalScore +'\n\nsmiley face!\n\n' + 'You are garbanzo!'))
    } else if (finalScore >= 10 && finalScore < 50) {
        losingScreen.appendChild(document.createTextNode('\n\nYou found\n\n' + finalScore +'\n\nsmiley faces!\n\n' + 'EY thats a pretty good score!'))
    } else if (finalScore < 10 && finalScore > 1) {
        losingScreen.appendChild(document.createTextNode('\n\nYou found\n\n' + finalScore +'\n\nsmiley faces!\n\n' + 'Not bad but not good either!'))
    } else if ( finalScore >= 50) {
        losingScreen.appendChild(document.createTextNode('\n\nYou found\n\n' + finalScore +'\n\nsmiley faces!\n\n' + 'CERTIFIED BEAST MODE! BIGGA NIGGAS!'))
    } else {
        losingScreen.appendChild(document.createTextNode('\n\nYou found\n\n' + finalScore +'\n\nsmiley faces!\n\n' + 'You suck!'))
    }
    document.body.appendChild(losingScreen)


    //restart button
    const restart = document.createElement('button');
    restart.setAttribute('id', 'restart-button');
    restart.setAttribute('class', 'end-screen');
    restart.appendChild(document.createTextNode('Play Again?'));
    document.body.appendChild(restart);

    restart.addEventListener('click',() => location.reload());
}

//audio
function playCorrect() {
    var audio = document.getElementById("audio");
    audio.play();
}
function playIncorrect() {
    var audio2 = document.getElementById("audio2");
    audio2.play();
}
theLeftSide.addEventListener('click', playIncorrect)

function playImpossibleAudio() {
    var audioImpossible = document.getElementById("audioImpossible")
    audioImpossible.play();
}
document.getElementById("impossible").addEventListener('change', e => {
    if(e.target.checked) {
        playImpossibleAudio();
    }
})
function jumpScare() {
    var jumpscareFreddy = document.getElementById("audioScare")
    jumpscareFreddy.play()
}
function fnafSong() {
    var song = document.getElementById("audioFnafSong")
    song.play()
}

//FNAF
function fnafJumpscare() {
    if (fnafScore == 5) {
        jumpScare()
        let title = document.querySelector('#title')
        title.remove()
        freddy = document.createElement('img')
        freddy.setAttribute('src', '/images/7f9.gif')
        fullscreen.appendChild(freddy)
        freddy.style.width = '100%';
        freddy.style.height = '100%';
        freddy.style.top = '0%';
        freddy.style.left = '0%';
        freddy.addEventListener('click', setTimeout("fnafSong()", 4700));

    }
}
