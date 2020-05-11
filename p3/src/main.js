import Vue from 'vue'
import App from './App.vue'
// import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import {BootstrapVue} from 'bootstrap-vue'
import VueRouter from 'vue-router'
import store from '@/common/store'

import HomeView from '@/components/HomeView'
import DayView from "@/components/DayView"
import WeekView from "@/components/WeekView"
import MonthView from "@/components/MonthView"

import UserProfileView from "@/components/UserProfileView";
import EmployeesView from "@/components/EmployeesView";
// TODO for development server only
import adminPage from "@/components/adminPage"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from './plugins/vuetify'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)
Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
    {path: '/', component: HomeView, name: 'Home Page'},
    {path: '/day', component: DayView, name: 'Day View'},
    {path: '/week', component: WeekView, name: 'Weekly view'},
    {path: '/month', component: MonthView, name: 'Monthly View'},
    // Users
    {path: '/user', component: UserProfileView, name: 'User View'},
    {path: '/employee', component: EmployeesView, name: 'Employees View'},
    // TODO Login and logout paths
    // TODO for development server only
    {path: '/adminseed', component: adminPage, name: 'Admin Seed'},
    // TODO path: '*' for 404
];

const router = new VueRouter({
    routes: routes,
    linkActiveClass: "active",
    mode: 'history'
});

new Vue({
    store: store,
    router: router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
