import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'
import dropdown from '~/pages/dropdown.vue'

describe('dropdown page testing', () => {
    let wrapper:VueWrapper
    let store;
    let pinia;

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)
        wrapper = mount(dropdown, {
            global: {
                plugins: [pinia],
            },
        })
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})