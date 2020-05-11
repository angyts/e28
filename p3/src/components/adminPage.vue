<template>
    <div>
        <h2>Admin</h2>

        <em>
            Disclaimer: This functionality is for demonstration purposes only.
            In a real-world application, this functionality must be locked down to administrators only.
        </em>

        <b-button @click='clearApi'>Clear API</b-button>

        <b-button @click='seedApi'>Seed API</b-button>

        <div class='alert' v-if='message'>{{ message }}</div>
    </div>
</template>

<script>
    import * as app from '@/common/app.js'
    // Used for seeding firestore
    import {shifts} from '@/seeds/shifts.js'
    import {staff} from '@/seeds/staff.js'

    export default {
        name: '',
        data: function () {
            return {
                message: '',
                collections: {
                    'shifts': shifts,
                    'staff': staff,
                }
            };
        },
        methods: {
            clearApi: function () {
                for (let collectionName in this.collections) {
                    app.api.allobj(collectionName).then(collection => {
                        Object.keys(collection).forEach(key => {
                            app.api.delete(collectionName, key);
                        });
                    });
                }
                this.message = 'Clearing API';
            },
            seedApi: function () {
                for (let collectionName in this.collections) {
                    for (let key in this.collections[collectionName]) {
                        app.api.add(
                            collectionName,
                            this.collections[collectionName][key]
                        );
                    }
                }
                this.message = 'Seeding API';
            }
        }
    };
</script>

<style scoped>
    button {
        display: block;
        margin: auto;
        margin-top: 10px;
    }
</style>