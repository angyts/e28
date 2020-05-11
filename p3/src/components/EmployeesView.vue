<template>
    <div class="container">
        <div class="row">
            <h2>Your Dream Team</h2>
        </div>
        <div v-if="message !== '' " class="alert alert-success" role="alert">
            {{message}}
        </div>
        <div class="row">
            <show-employee
                    class="col-lg-4"
                    v-for="(staff, id) in staffs"
                    :staff="staff"
                    :key="id"
            ></show-employee>
        </div>
        <div class="row">
            <div class="col">

            </div>
            <div class="col">
                <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="show">
                    <b-form-group
                            id="input-group-1"
                            label="Full Name:"
                            label-for="input-1"
                            description="Full Name of Staff Please"
                    >
                        <b-form-input
                                id="input-1"
                                v-model="name"
                                placeholder="Enter name"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Nickname:" label-for="input-2"
                                  description="Single Word only Please">
                        <b-form-input
                                id="input-2"
                                v-model.trim="slug"
                                placeholder="Enter staff nickname or short name"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-4">
                        <b-form-checkbox-group id="checkboxes-4">
                            <input type="checkbox" id="checkbox" v-model="manager">
                            <label for="checkbox">Staff is a Manager</label>
                        </b-form-checkbox-group>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button>
                </b-form>
            </div>
            <div class="col">

            </div>
        </div>
    </div>
</template>

<script>
    import {required, minLength} from 'vuelidate/lib/validators'
    import * as app from '@/common/app.js'
    import ShowEmployee from "@/components/ShowEmployee"

    export default {
        name: "EmployeesView",
        components: {ShowEmployee},
        props: ['staffs'],
        data: function () {
            return {
                message: '',
                show: true, // apparently to reset form validation
                name: "",
                slug: "",
                manager: false
            }
        },
        methods: {
            onSubmit() {
                let staff = {
                    'name': this.name,
                    'slug': this.slug,
                    'manager': this.manager,
                };
                app.api.add('staff', staff).then(response => {
                    this.message = `${staff.name} have been added`;
                    staff.id = response;
                    this.$emit('staffAdded', staff);
                });
                this.onReset();
            },
            onReset() {
                this.name = "";
                this.slug = "";
                this.manager = false;
                // Trick to reset/clear native browser form validation state
                // https://bootstrap-vue.js.org/docs/components/form/
                this.show = false;
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>

<style scoped>

</style>