var logger = require('./logger');

var guesswords = {
    movies: ['zootopia', 'finding nemo', 'harry Potter', 'home alone', 'polar express'],
    animals: ['leopard', 'dinosaur', 'rakoon', 'tiger', 'mouse', 'squirrel']
}
var loggerObj = new logger();

var word = function(category) {
    this.guessword = function(category){
        var randomWord = '';
        randomWord = getRandomWordFromArray(guesswords[category]);
        loggerObj.logToFile('Random Word is : '+randomWord);
        return randomWord;
    };
    this.allguesswords = guesswords;
    this.guessWordCharArr = function(guessWord) {
        return guessWord.split('');
    };
    this.guessWordCharArrUser = function(arr, validLetter) {
        var wordArr = [];
        for (i=0; i<arr.length;i++) {
            if (arr[i] == ' ' || arr[i] == validLetter) {
                wordArr[i] = arr[i];
            } else {
                wordArr[i] = '_';
            }
        }
        return wordArr;
    };
    this.guessWordCharArrUserAfter = function(arr, arrUser, validLetter) {
        for (i=0; i<arr.length;i++) {
            if (arr[i] == validLetter) {
                arrUser[i] = arr[i];
            }
        }
        return arrUser;
    };
    this.wordArrStrOutput = function (arr) {
        var str = "";
        for (i=0; i<arr.length;i++) {
            str = str + ' ' + arr[i];
        }
        return str+'\n';
    }
    this.guesscategories = function(){
        return Object.keys(guesswords);
    }
}

function getRandomWordFromArray(wordArray) {
    var randomWord, randomWordNum;
    randomWordNum = Math.floor((Math.random() * wordArray.length));
    randomWord = wordArray[randomWordNum];
    return randomWord;
}

module.exports = word;