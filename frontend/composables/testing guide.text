import { mount } from '@vue/test-utils'
import component from '~/component/component.vue'

const wrapper

describe("Description of test..", () => {

    wrapper = mount(component)

/** with options */ 

wrapper mount(component, {
        global: {
            plugins: []
        },
        props: {
            propname: {
                "key": value
            }
        },
        slots: {
            "slotname": value
        }
    })

    test("Testing if something..", () => {

        /** There are many ways to write expect */
        expect(wrapper.text()).toContain("something")
        expect(wrapper.html()).toContain("something")
        expect(wrapper.exists()).toBe(true)
    })



    /** more specific to vue test utils */

    suite("testing for something", () => {

/** with options */ 

wrapper mount(component, {
        global: {
            plugins: []
        },
        props: {
            propname: {
                "key": value
            }
        },
        slots: {
            "slotname": value
        }
    })
    })

    it("Should do a certain thing", () => {

        /** assert is more specific to 'vue test utils' 
         * there are many ways to assert
        */
        assert(wrapper.html()).includes("<p>something</p>")
    })

})