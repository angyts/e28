<template>
    <div id="app">
        <img alt="ZipFoods logo" id="logo" src="./assets/images/zipfoods-logo.png">
        <!-- src/App.vue template -->
        <nav>
            <ul>
                <li v-for='link in links' :key='link'>
                    <router-link exact :to='{ name: link }'>{{ link }}</router-link>
                </li>
            </ul>
        </nav>

        <router-view></router-view>

    </div>
</template>

<script>
    import {products} from "./products";

    export default {
        name: 'App',
        data: function () {
            return {
                products: products,
                links: ['home', 'products', 'categories'],
            }
        }
    }
</script>

<style lang="scss">
    @import './assets/scss/zipfoods.scss';
</style>
