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
        loggerObj.logToFile('Category choosen by user : '+answer.category);
        var guessWord = wordObj.guessword(answer.category);
        guessWordCharArr = wordObj.guessWordCharArr(guessWord);
        console.log('1',guessWordCharArr);
        guessWordCharArrUser = wordObj.guessWordCharArrUser(wordObj.guessWordCharArr(guessWord));
        console.log('2',guessWordCharArrUser);
        // console.log(displayGuessWord(guessWordCharArr)+'\n');
        console.log(wordObj.wordArrStrOutput(guessWordCharArrUser));
        guessletter(guessWordCharArr);
    })
}

guessWordCharArrUser = guessWordCharArr.forEach(function(elem, i){
    if (elem == ' ') {
        guessWordCharArrUser[i] = elem;
    } else {
        guessWordCharArrUser[i] = '_';
    }
})

function displayGuessWord(wordArr, validLetter) {
    var letter = '_';
    var wordStr = '';
    wordArr.forEach(element => {
        if (element == ' '){
            letter = ' ';
        } else if (element == validLetter) {
            letter = validLetter;
        } else {
            letter = '_';
        }
        wordStr = wordStr+' '+letter;
    });
    return wordStr;
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
        // console.log(guessWordCharArr);
        // console.log(displayGuessWord(guessWordCharArr));
        loggerObj.logToFile('Letter Guessed : '+letterTyped);
        if (letterObj.letterExists(guessWordCharArr, letterTyped)) {

        }
        guessLetterArr.push(letterTyped);
        if (guessesRemaining > 0) {
            if (guessWordCharArr.indexOf(letterTyped) >= 0) {

                // console.log(displayGuessWord(guessWordCharArr, letterTyped));
                console.log('\nCORRECT !!'+'\n');
            } else {
                // console.log(answer.letter+' NOT exists in '+guessWordCharArr+' Guesses Remaining : '+guessesRemaining);
                console.log('\nWRONG GUESS ....Guesses Remaining : '+guessesRemaining+'\n');
                guessesRemaining--;
            }
            guessletter(guessWordCharArr);
        }
        
    })
}

