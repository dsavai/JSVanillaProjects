const settingsBtnElement = document.querySelector("#settings-btn")
const settingsElement = document.querySelector("#settings")
const wordElement = document.querySelector("#word")
const textElement = document.querySelector("#text")
const scoreElement = document.querySelector("#score")
const timeElement = document.querySelector("#time")
const gameContainerElement = document.querySelector("#end-game-container")
const difficultyElement = document.querySelector("#difficulty")

const words = [
    "Liverpool",
    "Man City",
    "Leicester",
    "Chelsea",
    "Man Utd",
    "Wolves",
    "Arsenal",
    "Spurs",
    "Burnley",
    "Sheffield Utd",
    "Everton",
    "Crystal Palace",
    "Newcastle",
    "Southampton",
    "Brighton",
    "West Ham",
    "Watford",
    "Aston Villa",
    "Bournemouth",
    "Norwich",
    "Real Madrid",
    "Barcelona",
    "Atlético Madrid",
    "Sevilla",
    "Villarreal",
    "Getafe",
    "Athletic Club",
    "Real Sociedad",
    "Granada",
    "Valencia",
    "Levante",
    "Osasuna",
    "Real Betis",
    "Valladolid",
    "Alavés",
    "Eibar",
    "Celta Vigo",
    "Mallorca",
    "Mallorca",
    "Leganes",
    "Espanyol",
]

//Init variable
let score = 0
let timer = 10
let timerInterval = null
let easyLevelNumWords = 15
let mediumLevelNumWords = 13
let hardLevelNumWords = 8


//Show or hide the select difficulty panel
settingsBtnElement.addEventListener("click", () => {
    return !settingsElement.classList.contains("hide") ? settingsElement.classList.add("hide") : settingsElement.classList.remove("hide")
})

//Show Random Words
function showRandomWords(gameLevel){
    //console.log(gameLevel)
    const wordsArrLength = !gameLevel ? words.length : gameLevel.length
    const randomIndex = Math.floor(Math.random() * wordsArrLength)
    const randomWord = !gameLevel ? words[randomIndex] : gameLevel[randomIndex]
    wordElement.innerHTML = randomWord

    //get the random word
    return matchRandomWithInputWords(randomWord)
}

//Filter game by difficulty
function filterGameByDifficulty(numWords){
    let filterByGamelevel = words.filter((word) => {
        if (word.length < numWords) {
           return word;
        }
    });

    showRandomWords(filterByGamelevel)
}

//Seclect game difficulty
function selectGameDifficulty(){
    difficultyElement.value === "easy" ? filterGameByDifficulty(easyLevelNumWords) : null;

    difficultyElement.addEventListener("change", (event) => {
        const selcteOnchnageValue = event.target.value
        selcteOnchnageValue === "easy" ? filterGameByDifficulty(easyLevelNumWords) : null
        selcteOnchnageValue === "medium" ? filterGameByDifficulty(mediumLevelNumWords) : null
        selcteOnchnageValue === "hard" ? filterGameByDifficulty(hardLevelNumWords) : null
    })
}



//Return score if words match
function matchRandomWithInputWords(randomWord){
    textElement.addEventListener("keypress", (event) => {
        if(event.key === "Enter"){
            const textElementValue = event.target.value
            const lowerCasedRandomWord = randomWord.toLowerCase()
            const lowerCaseTextElementValue = textElementValue.toLowerCase()
            if(lowerCasedRandomWord === lowerCaseTextElementValue){
                score+=1
                scoreElement.innerHTML = score
                textElement.value = ""
            }
            showRandomWords()
        }
    })
}


//Start game timer
function decrementTimer(){
    if(timer < 100){
        //console.log(timer)
        timeElement.innerHTML = `${timer}s`
        timer--
    }
    if(timer === -1){
        clearInterval(timerInterval)
        gameContainerElement.style.display = "flex"
        endGameModal()
    }
}

//Clear gamer timer interval
timerInterval = setInterval(decrementTimer, 1000)


//Show end game modaal
function endGameModal() {
    return gameContainerElement.innerHTML = `
         <h1>Time ran out</h1>
          <p>Your final score is ${score}</p>
          <button onclick="removeModal()">Close</button>
    `;
}

//Close end game modal
function removeModal(){
    score = 0
    timer = 10
    scoreElement.innerHTML = score
    textElement.value = ""
    gameContainerElement.innerHTML = ""
    gameContainerElement.style.display = "none"
    decrementTimer()
    timerInterval = setInterval(decrementTimer, 1000)
}

//init game
function init(){
    selectGameDifficulty()
}

//init
init()