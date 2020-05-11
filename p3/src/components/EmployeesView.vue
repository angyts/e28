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
                                v-model="$v.name.$model"
                                placeholder="Enter name"
                                :state="$v.name.$dirty ? !$v.name.$error : null"
                                @keyup="saveLocal"
                        ></b-form-input>
                    </b-form-group>

                    <div v-if='$v.name.$error'>
                        <b-alert show variant="danger" v-if="!$v.name.required">Name is required</b-alert>
                    </div>

                    <b-form-group id="input-group-2" label="Nickname:" label-for="input-2"
                                  description="Single Word only">
                        <b-form-input
                                id="input-2"
                                v-model="$v.slug.$model"
                                placeholder="Enter staff nickname or short name"
                                :state="$v.slug.$dirty ? !$v.slug.$error : null"
                                @keyup="saveLocal"
                        ></b-form-input>
                    </b-form-group>

                    <div v-if='$v.slug.$error'>
                        <b-alert show variant="danger" v-if="!$v.slug.required">Slug is required</b-alert>
                        <b-alert show variant="danger" v-if="!$v.slug.minLength">At least 3 characters</b-alert>
                        <b-alert show variant="danger" v-if="!$v.slug.alphaNum">Cannot contain space or symbols</b-alert>
                        <b-alert show variant="danger" v-if="!$v.slug.doesNotExist">This nickname already exists, please use another one</b-alert>
                    </div>

                    <b-form-group id="input-group-4">
                        <b-form-checkbox-group id="checkboxes-4">
                            <input type="checkbox" id="checkbox" v-model="manager">
                            <label for="checkbox">Staff is a Manager</label>
                        </b-form-checkbox-group>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button>
                    <b-alert show variant="danger" v-if="$v.$anyError">Please correct the above errors</b-alert>
                </b-form>
            </div>
            <div class="col">

            </div>
        </div>
    </div>
</template>

<script>
    import {required, minLength, alphaNum} from 'vuelidate/lib/validators'
    import * as app from '@/common/app.js'
    import ShowEmployee from "@/components/ShowEmployee"

    export default {
        name: "EmployeesView",
        components: {ShowEmployee},
        props: [],
        data: function () {
            return {
                message: '',
                show: true, // apparently to reset form validation
                name: "",
                slug: "",
                manager: false
            }
        },
        computed: {
            staffs: function () {
                return this.$store.state.staffs;
            }
        },
        validations: {
            name:{
                required
            },
            slug:{
                required,
                minLength: minLength(3),
                alphaNum,
                doesNotExist(value) {
                    return !this.$store.getters.getStaffbySlug(value);
            }
            }
        },
        mounted: function(){
            let form = JSON.parse(localStorage.getItem('form'));
            this.name = form.name;
            this.slug = form.slug;
            this.manager = form.manager;
        },
        methods: {
            onSubmit() {
                // Invoke this touch method to force the validation system to register errors even if the user hasn't interacted with any of the fields yet.
                this.$v.$touch();
                if (this.$v.$anyError == false){
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
                 }
            },
            onReset() {
                // Reset all validation fields
                this.$v.$reset();

                this.name = "";
                this.slug = "";
                this.manager = false;
                // Trick to reset/clear native browser form validation state
                // https://bootstrap-vue.js.org/docs/components/form/
                this.show = false;
                this.$nextTick(() => {
                    this.show = true
                })
            },
            saveLocal(){
                let form = {
                    name: this.name,
                    slug: this.slug,
                    manager: this.manager
                };
                localStorage.setItem('form', JSON.stringify(form));
            }
        }
    }
</script>

<style scoped>
.form-input-error {
    color:red;
}
</style>