import Vue from 'vue'
import Vuex from 'vuex'

import * as app from '@/common/app.js'
let _ = require('lodash');

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        shifts: [],
        staffs: []
    },
    mutations: {
        setShifts(state, payload) {
            state.shifts = payload;
        },
        addShifts(state, payload){
          state.shifts.push(payload);
        },
        deleteShifts(state, payload){
          state.shifts = _.remove(state.shifts, function (n) { // TODO need to read up about lodash... wierd it works upside down
                    return n.id !== payload.id;
                    });
        },
        setStaffs(state, payload) {
            state.staffs = payload;
        }
    },
    actions: {
        fetchShifts(context) {
            app.api.all('shifts').then(response => {
                context.commit('setShifts', response);
            });
        },
        addShifts(context, shiftToAdd){
            context.commit('addShifts', shiftToAdd);
            return app.api.add('shifts', shiftToAdd); // important to return entire async fn
        },
        deleteShifts(context, shift){
            context.commit('deleteShifts', shift);
            app.api.delete('shifts', shift.id);
        },
        // TODO move ALL API actions here
        fetchStaffs(context) {
            app.api.all('staff').then(response => {
                context.commit('setStaffs', response);
            });
        }
    },
    getters: {
    getStaffbySlug(state) {
        return function (slug) {
            for (let key of Object.keys(state.staffs)) {
                // console.log(slug);
                if (state.staffs[key].slug == slug) {
                    return state.staffs[key];
                }
            }
        }
    }
}
})