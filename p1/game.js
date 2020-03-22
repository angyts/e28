const button = [
    {class: 'g', name: 'Green'},
    {class: 'r', name: 'Red'},
    {class: 'y', name: 'Yellow'},
    {class: 'b', name: 'Blue'},
    {class: 'o', name: 'Orange'},
    {class: 'p', name: 'Purple'}
];

Vue.component('game-pin', {
    data: function () {
        return {
            button: eval(button), // get the global object
            activeColourCounter: 0,
        }
    },
    template: '#game-pin',
    methods: {
        rotatePin: function () {
            this.activeColourCounter = (this.activeColourCounter + 1) % 6; // So that it will never go out of the list
        }
    }
});

Vue.component('checkanswer-pin', {
    // [...]
    template: '#checkanswer-pin',
    // [...]}
});

Vue.component('game-row', {
    // [...]
    template: '#game-row',
    // [...]}
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
            button: eval(button),
            finalAnswer: [],
        },
        computed: {
            // item_count: function () {
            //     return this.list.length;
            // }
        },
        mounted: function () {
            this.createAnswer();
        },
        methods: {
            addItem: function () {
                if (this.item !== '') {
                    this.list.push(this.item);
                    this.item = '';
                }
            },
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
            }
        }
    })
;