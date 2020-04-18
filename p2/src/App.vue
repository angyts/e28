<template>
    <div>
        <!-- https://bootstrap-vue.js.org/docs/components/navbar/ -->
        <div>
            <b-navbar toggleable="lg" type="dark" variant="primary">
                <b-navbar-brand href="#">Zenith Schedules</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item href="https://www.punggolgp.com">Zenith Web</b-nav-item>
                        <b-nav-item href="https://forms.punggolgp.com">Zenith Forms</b-nav-item>
                        <b-nav-item href="https://learn.punggolgp.com">Zenith E-Learning</b-nav-item>
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-form>
                            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                        </b-nav-form>

                        <b-nav-item-dropdown text="Lang" right>
                            <b-dropdown-item href="#">EN</b-dropdown-item>
                            <b-dropdown-item href="#">ES</b-dropdown-item>
                            <b-dropdown-item href="#">RU</b-dropdown-item>
                            <b-dropdown-item href="#">FA</b-dropdown-item>
                        </b-nav-item-dropdown>

                        <b-nav-item-dropdown right>
                            <!-- Using 'button-content' slot -->
                            <template v-slot:button-content>
                                <em>User</em>
                            </template>
                            <b-dropdown-item href="#">Profile</b-dropdown-item>
                            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <div id="app">
            <div class="container">
                <b-navbar toggleable="lg" type="light" variant="warning">
                    <b-navbar-toggle target="nav-collapse-2"></b-navbar-toggle>
                    <b-navbar-brand href="#">You are on the {{currentRouteName}}</b-navbar-brand>
                    <datepicker v-if="currentRouteName === 'Day View'" v-model="chosenDate"
                                name="uniquename"></datepicker>
                    <b-collapse id="nav-collapse-2" is-nav>
                        <b-nav pills class="ml-auto">
                            <b-nav-item to="/" exact exact-active-class="active">Home</b-nav-item>
                            <b-nav-item to="/day" exact exact-active-class="active">Day View</b-nav-item>
                            <b-nav-item to="/week" exact exact-active-class="active">Week View</b-nav-item>
                            <b-nav-item to="/month" exact exact-active-class="active">Month View</b-nav-item>
                        </b-nav>
                    </b-collapse>
                </b-navbar>
                <div>

                    Chosen: {{chosenDate}}

                    Month: {{ chosenMonth }}

                    Day: {{ chosenDay }}

                    Chosen day MOnth: {{ chosenDayMonthYear }}
                </div>
                <b-card-body>
                    <router-view :chosenDate="chosenDate"></router-view>
                </b-card-body>
            </div> <!-- /container -->
        </div>
    </div>
</template>

<script>
    import * as app from '@/common/app.js'
    import Datepicker from 'vuejs-datepicker'

    var moment = require('moment');

    export default {
        name: 'App',
        components: {
            Datepicker
        },
        data: function () {
            return {
                chosenDate: new Date(),
            }
        },
        computed: {
            currentRouteName() {
                return this.$route.name;
            },
            chosenMonth() {
                return moment(this.chosenDate).format('MMM');
            },
            chosenDay() {
                return moment(this.chosenDate).format('dddd');
            },
            chosenDayMonthYear() {
                return moment(this.chosenDate).format('DD-MMMM-YYYY');
            }
        },
        mounted: function () {
            app.api.all('shifts').then(response => {
                console.log(response);
            });
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    body {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }

    h3 {
        margin-top: 2rem;
    }

    .row {
        margin-bottom: 1rem;
    }

    .row .row {
        margin-top: 1rem;
        margin-bottom: 0;
    }

    [class*="col-"] {
        padding-top: 1rem;
        padding-bottom: 1rem;
        background-color: rgba(86, 61, 124, .15);
        border: 1px solid rgba(86, 61, 124, .2);
    }

    hr {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }

</style>
