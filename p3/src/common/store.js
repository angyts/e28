import Vue from 'vue'
import Vuex from 'vuex'

import * as app from '@/common/app.js'

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
        setStaffs(state, payload) {
            state.staffs = payload;
        }
    },
    actions: {
        fetchShifts(context) {
            app.api.all('shifts').then(response => {
                context.commit('setShifts', response);
            });
        },// TODO move ALL API actions here
        fetchStaffs(context) {
            app.api.all('staff').then(response => {
                context.commit('setStaffs', response);
            });
        }
    }
})