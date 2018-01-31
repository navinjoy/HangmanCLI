var inquirer = require('inquirer');
var word = require('./word');
var letter = require('./letter');
var logger = require('./logger');

var wordObj = new word();
var letterObj = new letter();
var loggerObj = new logger();

var guessesRemaining = 5;
var guessLetterArr = [];
var guessWordCharArr = [];
var guessWordCharArrUser = [];

startGame();

function startGame() {
    inquirer.prompt([{
        type: 'list',
        name: 'category',
        message: 'Choose a category to guess a word',
        choices: wordObj.guesscategories()
    }]).then(function (answer) {
        loggerObj.logToFile('Category choosen by user : ' + answer.category);
        var guessWord = wordObj.guessword(answer.category);
        guessWordCharArr = wordObj.guessWordCharArr(guessWord);
        guessWordCharArrUser = wordObj.guessWordCharArrUser(guessWordCharArr);
        console.log(wordObj.wordArrStrOutput(guessWordCharArrUser));
        guessletter(guessWordCharArr);
    })
}

function resetGame() {
    guessesRemaining = 5;
    guessLetterArr = [];
    guessWordCharArr = [];
    guessWordCharArrUser = [];
    wordObj = new word();
    letterObj = new letter();
    loggerObj = new logger();

    startGame();
}

function guessletter(guessWordCharArr) {
    inquirer.prompt([{
        type: 'input',
        name: 'letter',
        message: 'Guess a letter!',
        validate: function (value) {
            if (value.length === 1) {
                return true;
            } else {
                return 'Please guess only 1 letter';
            }
        }
    }]).then(function (answer) {
        var letterTyped = answer.letter.toLowerCase();
        loggerObj.logToFile('Letter Guessed : ' + letterTyped);

        if (guessLetterArr.includes(letterTyped)) {
            console.log('Letter : ' + letterTyped + ' | already guessed, choose a different one\n');
            guessletter(guessWordCharArr);
        } else {
            guessLetterArr.push(letterTyped);


            if (guessesRemaining > 0) {
                if (guessWordCharArr.indexOf(letterTyped) >= 0) {
                    guessWordCharArrUser = wordObj.guessWordCharArrUserAfter(guessWordCharArr, guessWordCharArrUser, letterTyped);
                    loggerObj.logToFile(guessWordCharArrUser);
                    console.log('\nCORRECT !!' + '\n');
                    if (!guessWordCharArrUser.includes('_')){
                        console.log('\n\n******** Hurray.... You WON ******** \n\n');
                        resetGame();
                    }
                } else {
                    console.log('\nWRONG GUESS ....Guesses Remaining : ' + guessesRemaining + '\n');
                    guessesRemaining--;
                }
                console.log(wordObj.wordArrStrOutput(guessWordCharArrUser));
                guessletter(guessWordCharArr);
            }
        }
    })
}