import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'
import TheNavbarLoggedIn from '~/components/layout/TheNavbarLoggedIn.vue'

vi.stubGlobal('useRouter', () => {
    return null
})

describe("testing NavbarLoggedIn component", () => {
    let wrapper:VueWrapper
    let store:any
    let pinia:any

    beforeEach(() => {
        
    pinia = createTestingPinia()
    store = useGeneralStore(pinia)
    
    store.isAuthenticated = true
    store.username = "testname"
    

    wrapper = mount(TheNavbarLoggedIn, {
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

    test("username does not render", async () => {
        await wrapper.unmount()

        store.isAuthenticated = false

        wrapper = mount(TheNavbarLoggedIn, {
            global: {
                plugins: [pinia]
    
            }
    
        })

        expect(wrapper.text()).not.toContain("testname")
    })
})