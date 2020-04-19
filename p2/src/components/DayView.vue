<template>
    <div class="container">
        This is the Day view page for the {{ chosenDate }}
        <div class="row">
            <b-button block variant="primary" @click.prevent="addShift">Add Shift</b-button>
        </div>
        <transition name="fade">
            <div class="div bg-light" v-show="addShiftDropdown">
                <h3>Let's Add a Shift</h3>
                <div class="row">
                    <div class="col">

                    </div>
                    <div class="col">
                        <datepicker
                                :bootstrap-styling="true"
                                :inline="true"
                                v-model="dateToAdd"
                                name="datepicker"></datepicker>
                    </div>
                    <div class="col">

                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h2>Start:</h2>
                        <v-time-picker
                                v-model="startTimeToAdd"
                                :max="endTimetoAdd"
                                header-color="bg-primary"
                                color="bg-primary"
                        ></v-time-picker>
                    </div>
                    <div class="col">
                        <h2>End:</h2>
                        <v-time-picker
                                v-model="endTimetoAdd"
                                :min="startTimeToAdd"
                                header-color="bg-primary"
                                color="bg-primary"
                        ></v-time-picker>
                    </div>
                </div>
                <div class="row">
                    <b-col sm="3">
                        <label>Name Your Shift: </label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-input v-model="shiftName" placeholder=""></b-form-input>
                    </b-col>
                </div>
                <div class="row">
                    <b-button block variant="primary" @click.prevent="addShift">Add Shift</b-button>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div v-if="message !== '' " class="alert alert-success" role="alert">
                {{message}}
            </div>
        </transition>
        <div class="row">
            <div class="col-10" id="shiftrow">
                <v-calendar
                        :start="chosenDate"
                        :first-interval="dayStartsTime"
                        :interval-minutes="intervalminutes"
                        :interval-count="intervalcount"
                        :events="shifts"
                        :event-color="getEventColor"
                        :short-intervals="false"
                        :type="'day'"
                ></v-calendar>
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
    import * as firebase from 'firebase/app';
    import * as app from '@/common/app.js'
    import Datepicker from 'vuejs-datepicker'

    var moment = require('moment');

    export default {
        name: "DayView",
        components: {
            Datepicker
        },
        props: ['chosenDate', 'shifts'],
        data: function () {
            return {
                // View Events
                addShiftDropdown: true,
                message: '',
                // Date to add data
                dateToAdd: new Date(),
                startTimeToAdd: "08:00",
                endTimetoAdd: "13:00",
                shiftName: "Morning Shift",
                // Vuetify calendar options
                dayStartsTime: "15", // TODO build an admin portal, start of the day option, but it is according the to interval
                intervalminutes: "30", // TODO shows intervals, default is 60
                intervalcount: "48", // TODO These 3 are related by some math
            };
        },
        methods: {
            added() {
                this.message = "Your Shifts have been added";
            },
            resetMessage() {
                this.message = '';
            },
            addShift() {
                if (this.addShiftDropdown) {
                    let epochtimeStart = moment(this.dateToAdd).set({
                        'hour': this.startTimeToAdd.substring(0, 2),
                        'minute': this.startTimeToAdd.substring(3, 2)
                    }).format("X");
                    let startFormatted = new firebase.firestore.Timestamp(epochtimeStart, 0);
                    let epochtimeEnd = moment(this.dateToAdd).set({
                        'hour': this.endTimetoAdd.substring(0, 2),
                        'minute': this.endTimetoAdd.substring(3, 2)
                    }).format("X");
                    let endFormatted = new firebase.firestore.Timestamp(epochtimeEnd, 0)
                    let shiftToAdd = {
                        color: "bg-secondary",
                        name: this.shiftName,
                        start: `${moment(this.dateToAdd).format('YYYY-MM-DD')} ${this.startTimeToAdd}`,
                        end: `${moment(this.dateToAdd).format('YYYY-MM-DD')} ${this.endTimetoAdd}`,
                        startFormatted: startFormatted,
                        endFormatted: endFormatted,
                    };
                    this.$emit('shiftAdded', shiftToAdd);
                    app.api.add('shifts', shiftToAdd).then(response => {
                        console.log(response);
                    });
                    this.message = "Adding Shifts Right Now!";
                    setTimeout(this.added, 2000);
                    setTimeout(this.resetMessage, 4000);
                }
                this.addShiftDropdown = !this.addShiftDropdown;
            },
            getEventColor(event) {
                return event.color
            },
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>