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
}

var app = new Vue({
    el: '#app',
    data: {
        name: '',
        guess: '',
        startGame: false,
        words: [
            ['apple', 'Sometimes red, sometimes delicious'],
            ['washington', 'Rushmore’s left edge'],
            ['pumpkin', 'Halloween’s favorite fruit'],
            ['football', 'Play with your hands or feet, depending on your location']
        ],
        chosenword: [],
        correct: 3, // 1 for correct. 2 for wrong. 3 for not answered
    },
    computed: {
        mysteryWord: function () {
            let word = this.chosenword[0];
            let scrambled = `${word}`.shuffle();
            return scrambled;
        }
    },
    mounted: function () {
        this.chosenword = this.words[Math.floor(Math.random() * this.words.length)];
    },
    methods:
        {
            start: function () {
                this.startGame = true;
                console.log('game start');
            }
            ,
            check: function () {
                if (this.guess == this.chosenword[0]) {
                    this.correct = 1;
                } else {
                    this.correct = 2;
                }
            },
            playagain: function () {
                console.log('game restart')
                // TODO: to remove the current chosen word from the array
                // https://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
                // TODO remove one, then scramble again, then this.correct=3, this.guess=""
            }
        }
})


// TODO
// (Optional but suggested)

// When the game is loaded, allow the user to choose a category or difficulty level either via a group of radio buttons or a dropdown. This choice should then be used to influence what word/hint is chosen. (This will require expanding the word list so it's organized by category or difficulty level).