import { VueWrapper, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'
import TheNavbar from '~/components/layout/TheNavbar.vue'

let wrapper: VueWrapper;
let pinia: any;
let authStore:any;



describe("thenavvbarr testing", () => {

    beforeEach(() => {
        vi.stubGlobal("useRoute", () => {
            return null
        })


        pinia = createTestingPinia()

        authStore = useAuthStore(pinia)
        authStore.isAuthenticated = true


        wrapper = mount(TheNavbar, {
            global: {
                plugins: [pinia],
                stubs: {
                    BaseSearchBar: true,
                    FormKit:true,
                    Icon:true
                },
            },
        })

    })


    test('Should exist', () => {

        expect(wrapper.exists()).toBe(true)
    })
    test('Should render the brand icon', () => {
        expect(wrapper.find("[data-test='brand_icon']").exists()).toBe(true)
    })
    test('Should render the write new post icon', () => {
        expect(wrapper.find("[data-test='new_post_icon']").exists()).toBe(true)
        
    })
    test('Should render the my profile icon', () => {
        expect(wrapper.find("[data-test='my_profile_icon']").exists()).toBe(true)
        
    })
    test('Should render loggout', () => {
        expect(wrapper.find("[data-test='loggout_icon']").exists()).toBe(true)
        
    })

})

/**
 * bare ga opp med å ha store.isauthenticated jeg
 */