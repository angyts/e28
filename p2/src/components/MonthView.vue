<template>
    <div>
        <v-calendar
                :start="chosenDate"
                :events="shifts"
                :event-color="getEventColor"
                :type="'month'"
        ></v-calendar>
    </div>
</template>

<script>
    export default {
        name: "MonthView",
        props: ['chosenDate', 'shifts'],
        methods: {
            getEventColor(event) {
                if (event.staff != undefined) {
                    return 'bg-primary';
                }
                return event.color;
            },
        }
    }
</script>

<style scoped>

</style>