// Sets the number and type of buttons, go to CSS to select color
const button = [
    {class: 'g', name: 'Green'},
    {class: 'r', name: 'Red'},
    {class: 'y', name: 'Yellow'},
    {class: 'b', name: 'Blue'},
    {class: 'o', name: 'Orange'},
    {class: 'p', name: 'Purple'}
];

const numberOfRounds = 12; // Sets the number of rounds in the game
var rounds = [];

for (let i = 1; i <= numberOfRounds; i++) {
    rounds.push({isActive: false, isOldRow: false});
}

Vue.component('game-pin', {
    data: function () {
        return {
            button: eval(button), // get the global object
            activeColourCounter: 0,
        }
    },
    props: {
        isOldRow: Boolean,
        index: Number,
    },
    template: '#game-pin',
    methods: {
        rotatePin: function () {
            if (!this.isOldRow) {
                this.activeColourCounter = (this.activeColourCounter + 1) % 6; // So that it will never go out of the list
                this.$emit('pinChanged', this.index, button[this.activeColourCounter]);
            }
        }
    }
});

Vue.component('checkanswer-pin', {
    props: {
        colour: String,
    },
    template: '#checkanswer-pin',
    // [...]}
});

Vue.component('game-row', {
    data: function () {
        return {
            userAnswer: [],
            pins: 4
        }
    },
    props: {
        isOldRow: Boolean,
        checkAnswer: Array,
    },
    template: '#game-row',
    mounted: function () {
        // create the default array for user answers
        for (let i = 0; i < this.pins; i++) {
            this.userAnswer.push(eval(button)[0]);
        }
    },
    methods: {
        pinChanged: function (index, pin) {
            this.userAnswer[index] = pin;
        }
    }
});

Vue.component('ans-row', {
    props: {
        answers: Array,
    },
    template: '#ans-row',
    // [...]}
});

var app = new Vue({
    el: '#app',
    data: {
        endGame: false,
        button: eval(button), // get the global object
        finalAnswer: [],
        rounds: [],
        roundsLeft: 11,
        recordOfAllAnswers: [], // Seems a little hacky, to record all the rounds info here
        recordOfAllAttempts: []
    },
    computed: {},
    mounted: function () {
        this.createAnswer();
        this.rounds = eval(rounds);
        this.rounds[this.roundsLeft].isActive = true; // The list renders upside down
    },
    methods: {
        randomValueFromArray: function (array) {
            const random = Math.floor(Math.random() * array.length);
            return array[random];
        },
        createAnswer: function () {
            this.finalAnswer = [];
            // Generate a row of code to break, default is 4
            for (let i = 0; i < 4; i++) {
                this.finalAnswer.push(this.randomValueFromArray(button));
            }
        },
        checkAnswer: function () {
            if (this.roundsLeft >= 0) {
                // Wow a hack
                // https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements
                // ES6 clone
                let answer = [...this.$refs.index[this.roundsLeft].userAnswer];
                let copyFinalAnswer = [...this.finalAnswer];

                // Check for correct answer at correct place
                let blackMarker = 0;
                let len = 4;
                for (let i = 0; i < len; i++) {
                    if (answer[i] === copyFinalAnswer[i]) {
                        blackMarker += 1;
                        // Remove to prevent duplicates
                        answer.splice(i, 1);
                        copyFinalAnswer.splice(i, 1);
                        // Wierd bug that happens when you try to splice an array in iteration
                        // https://stackoverflow.com/questions/56827326/weird-bug-in-javascript-splice-method/56827364
                        i--;
                        len--;
                    }
                }

                // Check for correct answer at wrong place
                let whiteMarker = 0;
                len = answer.length;
                for (let i = 0; i < len; i++) {
                    if (answer.includes(copyFinalAnswer[i])) {
                        whiteMarker += 1;
                        // Remove to prevent duplicates
                        // https://stackoverflow.com/questions/9792927/javascript-array-search-and-remove-string
                        copyFinalAnswer.splice(i, 1);
                        // https://stackoverflow.com/questions/56827326/weird-bug-in-javascript-splice-method/56827364
                        i--;
                        len--;
                    }
                }
                // To render the black and white pins
                this.recordOfAllAnswers.push({id: this.roundsLeft, black: blackMarker, white: whiteMarker});

                this.rounds[this.roundsLeft].isOldRow = true; // deactivate current row
                this.roundsLeft -= 1;

                // Check if won already
                if (blackMarker === 4) {
                    this.endGame = true;
                    this.recordOfAllAttempts.push({won: true, moves: (11 - this.roundsLeft)});
                    alert("You won! Click Another Round to try again!");
                } else {
                    this.rounds[this.roundsLeft].isActive = true; // activate next row
                }
            } else {
                this.recordOfAllAttempts.push({won: false});
                this.endGame = true;
                alert("You ran out of turns! Click Another Round to try again!");
            }
        },
        restart: function () {
            this.endGame = false;
            this.createAnswer();
            // reset all data
            this.roundsLeft = 11;
            this.recordOfAllAnswers = [];
            this.rounds = [];
            for (let i = 0; i <= this.roundsLeft; i++) {
                if (i == 11) {
                    this.rounds.push({isActive: true, isOldRow: false});
                } else {
                    this.rounds.push({isActive: false, isOldRow: false});
                }
            }
        },
        reset: function () {
            this.recordOfAllAttempts = [];
        }
    }
});