import TheWait from '../../components/TheWait.vue'
import { shallowMount } from '@vue/test-utils'

describe("testing TheWait component", () => {
    const wrapper = shallowMount(TheWait, {
        global: {
            stubs:{
                FormLogin:true
            }
        }
    })

    test("exists", () => {
        expect(wrapper.exists()).toBe(true)
    })

    test("renders text", () => {
        expect(wrapper.text()).toContain("need an account")
    })
})