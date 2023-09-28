import { mount } from '@vue/test-utils'
import TheNavbarLoggedOutVue from '~/components/layout/TheNavbarLoggedOut.vue'

describe("testing NavbarLoggedOut cmp", () => {
    
    const wrapper = mount(TheNavbarLoggedOutVue)

    test("thenavbarloggedoute exists", () => {
        expect(wrapper.exists()).toBe(true)
    })

    test("renders text", () => {
        expect(wrapper.text()).toContain("Logg inn")
    })
})