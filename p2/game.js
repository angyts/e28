var app = new Vue({
    el: '#app',
    data: {
        item: '',
        list: []
    },
    computed: {
        item_count: function () {
            return this.list.length;
        }
    },
    methods: {
        addItem: function () {
            if (this.item !== '') {
                this.list.push(this.item);
                this.item = '';
            }
        }
    }
})