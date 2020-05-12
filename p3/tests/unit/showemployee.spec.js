// /tests/unit/ShowProduct.spec.js

// Import our assertion library
// https://www.chaijs.com/guide/styles/#expect
import { expect } from 'chai'

// Vue Test Utils tests Vue components by mounting them in isolation, 
// mocking the necessary inputs (props, injections and user events) and 
// asserting the outputs (render result, emitted custom events).
// Here we're using `shallowMount` which will allow us to mount our component 
// without rendering its child components.
// https://vue-test-utils.vuejs.org/api/#shallowmount
// https://vue-test-utils.vuejs.org/api/components/#routerlinkstub
import { shallowMount } from '@vue/test-utils'

// Import the component you want to test
import ShowEmployee from '@/components/ShowEmployee.vue'

// So that the b-tooltip component will be available
import {BootstrapVue} from 'bootstrap-vue'
import Vue from "vue"
Vue.use(BootstrapVue)

// describe() is how we group tests in Mocha
// It takes two arguments:
// 1) name of the test group
// 2) callback function
describe('ShowEmployee.vue', () => {
    // it() is used for an individual test case.
    // should be written as if you were saying it out loud: “It should equal zero”, “It should log the user in”, etc. 
    // takes two arguments:
    // 1) a string explaining what the test should do, 
    // 2) a callback function which contains our actual test
    it('shows a staff', () => {

        // Define a product we can test
        let staff = {
            slug: 'dog',
            name: 'The dazed brown dog'
        }

        // Mount our component
        // Mounted components are returned inside a Wrapper, which exposes 
        // many convenience methods for manipulating, traversing and 
        // querying the underlying Vue component instance.
        // https://vue-test-utils.vuejs.org/api/wrapper/#properties
        const wrapper = shallowMount(ShowEmployee, {
            propsData: { staff },
            stubs: {
              //  RouterLink: RouterLinkStub
            }
        })

        // Assert our results
        expect(wrapper.text()).to.include(staff.name)
        let foundStaffFace = wrapper.find('[data-test="staff-face"]').exists();
        expect(foundStaffFace).to.equal(true);
    })
})

// TODO: it has a picture no matter what