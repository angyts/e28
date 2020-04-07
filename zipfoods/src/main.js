import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import ShowHome from "./components/ShowHome";
import ShowCategories from "./components/ShowCategories";
import ShowProducts from "./components/ShowProducts";

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
    {path: '/', component: ShowHome, name: 'home'},
    {path: '/products', component: ShowProducts, name: 'products'},
    {path: '/categories', component: ShowCategories, name: 'categories'}
];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

new Vue({
    router: router,
    render: h => h(App),
}).$mount('#app');
