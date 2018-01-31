

var letter = function(letter) {
    this.letter = letter;
    this.letterExists = function(wordArr, letter) {
        return wordArr.includes(letter);
    }
}

module.exports = letter;