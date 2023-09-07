import Navbar from '~/components/Element/Navbar.vue'
import NavbarLoggedIn from '~/components/Navbar/NavbarLoggedIn.vue'
import NavbarLoggedOut from '~/components/Navbar/NavbarLoggedOut.vue'

import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

describe('Testing the Navbar element/component', () => {

    const wrapper = mount(Navbar)


    test("element exists", () => {
        expect(wrapper.exists()).toBe(true);
    });

    test("renders navbarloggedin", () => {
        const pinia = createTestingPinia()
        expect(wrapper.findComponent({ name:"NavbarLoggedIn" }).exists()).toBe(true)
    });

    test("renders navbarloggedout", () => {
        const pinia = createTestingPinia()

        expect(wrapper.findComponent({ name:"NavbarLoggedOut" }).exists()).toBeTruthy()
    })
})
