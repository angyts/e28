<template>
    <div class="container">
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
        <div v-if="selectedShift.staff != undefined" class="alert alert-success" role="alert">
            The following stars are rostered:
            <span v-for="(staff, id) in selectedShift.staff" :key="id"><show-employee
                    :staff="staff"
            ></show-employee></span>
        </div>
        <div class="row" v-if="deleteShiftView">
            <b-button block variant="danger" @click.prevent="deleteShiftConfirm">Delete Shift</b-button>
        </div>
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
                        :hide-header="true"
                        @click:event="deleteShift"
                ></v-calendar>
            </div>
            <div class="col-2" id="peoplerow">
                <div class="row">
                    <b-button @click="selectEmployee(staff)"
                              class="col-xl-6"
                              variant="outline-primary"
                              v-for="(staff, id) in staffs"
                              :key="id">
                        <show-employee
                                :staff="staff"
                        ></show-employee>
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as firebase from 'firebase/app'
    import * as app from '@/common/app.js'
    import Datepicker from 'vuejs-datepicker'
    import ShowEmployee from "@/components/ShowEmployee"

    let _ = require('lodash');

    var moment = require('moment');

    export default {
        name: "DayView",
        components: {
            Datepicker,
            ShowEmployee
        },
        props: ['chosenDate', 'shifts', 'staffs'],
        data: function () {
            return {
                // View Events
                addShiftDropdown: false,
                deleteShiftView: false,
                message: '',
                // Date to add data
                dateToAdd: new Date(),
                startTimeToAdd: "08:00",
                endTimetoAdd: "13:00",
                shiftName: "Morning Shift",
                // Data to delete shifts
                selectedShift: {},
                selectedElement: null, // TODO Need to understand From vuetify https://codepen.io/pen/?editors=1010
                // Vuetify calendar options
                dayStartsTime: "15", // TODO build an admin portal, start of the day option, but it is according the to interval
                intervalminutes: "30", // TODO shows intervals, default is 60
                intervalcount: "48", // TODO These 3 are related by some math
            };
        },
        methods: {
            resetMessage() {
                this.message = '';
            },
            addShift() {
                if (this.addShiftDropdown) {
                    this.message = `Adding ${this.shiftName} Right Now!`;
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

                    app.api.add('shifts', shiftToAdd).then(response => {
                        this.message = `Your ${this.shiftName} have been added`;
                        shiftToAdd.id = response;
                        this.$emit('shiftAdded', shiftToAdd);
                        setTimeout(this.resetMessage, 2000);
                    });
                }
                this.addShiftDropdown = !this.addShiftDropdown;
            },
            deleteShift({nativeEvent, event}) {
                this.selectedShift = event;
                this.selectedElement = nativeEvent.target; // TODO not sure what this does
                this.deleteShiftView = true;
                this.message = 'Click on Staff to Roster this Staff';
            },
            deleteShiftConfirm() {
                this.deleteShiftView = false;
                let shift = this.selectedShift;
                this.message = `Your ${shift.name} have been deleted`;
                this.$emit('shiftDeleted', shift);
                app.api.delete('shifts', shift.id);
                setTimeout(this.resetMessage, 2000);
                // TODO setTimeout(() => (this.message = ''),3000);
            },
            getEventColor(event) {
                if (event.staff != undefined) {
                    return 'bg-primary';
                }
                return event.color;
            },
            selectEmployee(staff) {
                if (this.selectedShift !== {}) {
                    if (this.selectedShift.staff == undefined) {
                        this.selectedShift.staff = [];
                    }
                    if (_.find(this.selectedShift.staff, {id: staff.id})) {
                        // TODO handle remove employee from shift or something, it is duplicate
                    } else {
                        this.selectedShift.staff.push(staff);
                        app.api.update('shifts', this.selectedShift.id, this.selectedShift);
                        this.message = ""; // force re-rendering
                        this.message = "Successfully updated";
                    }
                }
            }
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