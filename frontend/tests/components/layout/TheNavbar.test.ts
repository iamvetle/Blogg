import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TheNavbar from '~/components/layout/TheNavbar.vue'
import { useGeneralStore } from '~/store/generalStore'

describe("thenavvbarr testing", () => {
    let wrapper:VueWrapper;
    let generalStore: any; 
    let pinia: any;

    beforeEach(() => {
        pinia = createTestingPinia()
        generalStore = useGeneralStore(pinia)
        generalStore.isAuthenticated = true
        wrapper = mount(TheNavbar, {
            global: {
                plugins: [pinia],
                stubs: {
                    "BaseSearchBar":true,
                    "nuxt-link":true,

                }
            },
        })
    })

    test('Should exist', () => {
        expect(wrapper.exists()).toBe(true)
    })

    test("Should render the default navbar text", () => {
        expect(wrapper.text()).toContain("Nytt innlegg")
        expect(wrapper.text()).toContain("Min profil")

    })
    test("Should not render content on navbar when the web client is not authenticated", () => {
        wrapper.unmount()

        generalStore.isAuthenticated = false
        
        wrapper = mount(TheNavbar, {
            global: {
                plugins: [pinia],
            },
        })

        expect(wrapper.text()).not.toContain("Nytt innlegg")
        expect(wrapper.text()).not.toContain("Min profil")
    })
})