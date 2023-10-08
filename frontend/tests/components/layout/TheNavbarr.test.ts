import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TheNavbar from '~/components/layout/TheNavbar.vue'
import { useGeneralStore } from '~/store/generalStore'

describe("thenavvbarr testing", () => {
    let wrapper:VueWrapper;
    let store: any; 
    let pinia: any;

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)
        wrapper = mount(TheNavbar, {
            global: {
                plugins: [pinia],
            },
        })
        store.isAuthenticated = true
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })

    test("renders text", () => {
        expect(wrapper.text()).toContain("Nytt innlegg")
        expect(wrapper.text()).toContain("Min profil")

    })
    test("does not render nytt innleg and min-side icons when not authenticated", () => {
        wrapper.unmount()

        store.isAuthenticated = false
        
        wrapper = mount(TheNavbar, {
            global: {
                plugins: [pinia],
            },
        })

        expect(wrapper.text()).not.toContain("Nytt innlegg")
        expect(wrapper.text()).not.toContain("Min profil")
    })
})