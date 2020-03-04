// Shuffle characters in string
// https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
};

// Remove item in array
// https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

// Vue app
var app = new Vue({
    el: '#app',
    data: {
        // States
        invalid: false,
        startGame: false,
        correct: 3, // 1 for correct. 2 for wrong. 3 for not answered
        difficulty: 0,
        // Game dynamics
        name: '',
        chosenword: [],
        guess: '',
        // Constants: do they need to be inside the app?
        words: [
            // Generate some hints here
            // https://www.the-crossword-solver.com/word/person
            ['apple', 'Sometimes red, sometimes delicious', '1'],
            ['washington', 'Rushmore’s left edge', '3'],
            ['pumpkin', 'Halloween’s favorite fruit', '1'],
            ['football', 'Play with your hands or feet, depending on your location', '1'],
            ['owl', 'Makes the sound Hoot', '1'],
            ['eggs', 'Chickens lays ____', '1'],
            ['house', 'A dwelling', '1'],
            ['electricity', 'Juice you can"t drink', '2'],
            ['lightsaber', 'Favourite jedi weapon', '2'],
            ['baseball', 'It\'s legal to hit and run in it', '2'],
            ['mattress', 'Sleep on this', '2'],
            ['ringleader', 'a person who leads (especially in illicit activities)', '3'],
            ['vegetarian', 'One who does not kill for food', '3'],
            ['drawback', 'catch, disadvantage', '3'],
            ['professor', 'Teacher of the highest rank', '3']
        ]
    },
    computed: {
        mysteryWord: function () {
            let word = this.chosenword[0];
            let scrambled = `${word}`.shuffle();
            return scrambled;
        }
    },
    methods:
        {
            chooseAWord: function (wordsList, difficulty) {
                // https://alligator.io/js/filter-array-method/
                let wordsListByDifficulty = wordsList.filter(function (word) {
                    return word[2] == difficulty;
                });
                // https://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
                this.chosenword = wordsListByDifficulty[Math.floor(Math.random() * wordsListByDifficulty.length)];
            },
            start: function () {
                // Validate that name and difficulty has been chosen
                this.invalid = false;
                if (this.name !== '' && this.difficulty !== 0) {
                    this.chooseAWord(this.words, this.difficulty);
                    this.startGame = true;
                } else {
                    this.invalid = true;
                }
            },
            check: function () {
                if (this.guess.toLowerCase() === this.chosenword[0]) {
                    this.correct = 1;
                } else {
                    this.correct = 2;
                }
            },
            playagain: function () {
                // Copy array so that original list will not be cut down forever
                let newWordList = this.words.slice();
                removeA(newWordList, this.chosenword);
                this.chooseAWord(newWordList, this.difficulty);
                // Reset game
                this.correct = 3;
                this.guess = '';
            }
        }
});