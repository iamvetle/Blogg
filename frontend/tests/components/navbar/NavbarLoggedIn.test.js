import { mount } from '@vue/test-utils'
import NavbarLoggedInVue from '~/components/Element/Navbar/NavbarLoggedIn.vue'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'

describe("testing NavbarLoggedIn component", () => {
    let wrapper
    let store
    let pinia

    beforeEach(() => {
        
    pinia = createTestingPinia()
    store = useGeneralStore(pinia)
    
    store.isAuthenticated = true
    store.username = "testname"
    store.token = "23fsijhwh189d"
    

    wrapper = mount(NavbarLoggedInVue, {
        global: {
            plugins: [pinia]

        }

    })
    })
    
    test("exists", () => {
        expect(wrapper.exists()).toBe(true)        
    })

    test("text renders", () => {
        expect(wrapper.text()).toContain("Min side")
    })

    test("username renders correctly",() => {
        expect(wrapper.text()).toContain("testname")
    })

    test("username does not render", () => {
        wrapper.unmount()

        store.isAuthenticated = false

        wrapper = mount(NavbarLoggedInVue, {
            global: {
                plugins: [pinia]
    
            }
    
        })
        expect(wrapper.text()).not.toContain("testname")
    })
})