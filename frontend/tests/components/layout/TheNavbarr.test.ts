import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useSearchStore } from '~/store/searchStore'
import TheNavbarr from '~/components/layout/TheNavbarr.vue'

describe("thenavvbarr testing", () => {
    let wrapper:VueWrapper;
    let store;
    let pinia;

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useSearchStore(pinia)
        wrapper = mount(TheNavbarr, {
            global: {
                plugins: [pinia],
            },
        })
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })

    test("renders text", () => {
        expect(wrapper.text()).toContain("Nytt innlegg")
        expect(wrapper.text()).toContain("Min profil")

    })
})