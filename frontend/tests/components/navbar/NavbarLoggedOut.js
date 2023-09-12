import { mount } from '@vue/test-utils'
import NavbarLoggedOutVue from '~/components/Element/Navbar/NavbarLoggedOut.vue'

describe("testing NavbarLoggedOut cmp", () => {
    
    let wrapper

    wrapper = mount(NavbarLoggedOutVue)

    test("component exists", () => {
        expect(wrapper.exists()).toBe(true)
    })

    test("renders text", () => {
        expect(wrapper.text()).toContain("Logg inn")
    })
})