<template>
    <div class="container">
        This is the Day view page for the {{ chosenDate }}
        <div class="row">
            <div class="col-2" id="timerow">
                <div v-for="(hour,id) in hours" :key="id" class="row">
                    {{ hour }}
                </div>
            </div>
            <div class="col-8" id="shiftrow">
                <div class="row">
                    <div class="col">
                        This is one shift
                    </div>
                    <div class="col">
                        This is Another shift
                    </div>
                    <div class="col">
                        This is Another shift
                    </div>
                    <div class="col">
                        This is Another shift
                    </div>
                </div>
            </div>
            <div class="col-2" id="peoplerow">
                <div class="row">
                    <div class="col-md-6">
                        This is one employer
                    </div>
                    <div class="col-md-6">
                        This is another employer
                    </div>
                    <div class="col-md-6">
                        This is yet another employer
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DayView",
        props: ['chosenDate'],
        data: function () {
            return {
                hours: [
                    '12 Midnight',
                    '1 AM',
                    '2 AM',
                    '3 AM',
                    '4 AM',
                    '5 AM',
                    '6 AM',
                    '7 AM',
                    '8 AM',
                    '9 AM',
                    '10 AM',
                    '11 AM',
                    '12 Noon',
                    '1 PM',
                    '2 PM',
                    '3 PM',
                    '4 PM',
                    '5 PM',
                    '6 PM',
                    '7 PM',
                    '8 PM',
                    '9 PM',
                    '10 PM',
                    '11 PM'
                ]
            };
        }
    }
</script>

<style scoped>

</style>