import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'
import BaseDropdownMenu from '~/components/base/BaseDropdownMenu.vue'

describe('BaseDropDownMenu testing', () => {
    let wrapper;
    let store;
    let pinia;

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)
        wrapper = mount(BaseDropdownMenu, {
            global: {
                plugins: [pinia],
            },
        })
    })

    test('component exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('there is a button', () => {
        const button = wrapper.find('button')
        expect(button.text()).toContain("Toggle dropdown")
    })
    test('')

})