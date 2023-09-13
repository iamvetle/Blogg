// import Navbar from '~/components/Element/Navbar.vue'

// import { mount, shallowMount } from '@vue/test-utils'

// import { createTestingPinia } from '@pinia/testing'

// describe('Testing the Navbar element/component', () => {
//     afterEach(() => {
//         vi.unstubAllGlobals()
//     })

//     const wrapper = mount(Navbar)


//     test("element exists", () => {
//         expect(wrapper.exists()).toBe(true);
//     });

//     test("renders navbarloggedin", () => {
//         vi.stubGlobal('useNuxtApp', () => ({ $msal: {} }))
//         vi.stubGlobal('useGeneralStore', () => ({ isAuthenticated:false }))
//         const pinia = createTestingPinia()

//         expect(wrapper.findComponent({ name:"NavbarLoggedIn" }).exists()).toBe(true)
//     });

//     test("renders navbarloggedout", () => {
//         const pinia = createTestingPinia()

//         expect(wrapper.findComponent({ name:"NavbarLoggedOut" }).exists()).toBeTruthy()
//     })
// })
