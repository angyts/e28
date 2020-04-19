<template>
    <div>
        <v-calendar
                :start="chosenDate"
                :events="shifts"
                :event-color="getEventColor"
                :type="'week'"
        ></v-calendar>
    </div>
</template>

<script>
    export default {
        name: "WeekView",
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