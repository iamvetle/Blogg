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

    // it("the input field in the menu bar get shown when the menu bar is clicked", async () => {
    //     await 
    //     const input_bar = await find('input["search_input"]')
        
    //     expect(input_bar.exists()).toBe(true)
    // })
})