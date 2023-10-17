import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'
import BaseDropdownMenu from '~/components/base/BaseDropdownMenu.vue'

describe('BaseDropDownMenu testing', () => {
    let wrapper:VueWrapper;
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
        expect(button.text()).toContain("Filter posts")
    })

    test("button isnt dropped down", () => {
        expect(wrapper.text()).not.toContain("Dropdown items")
    })
    test('button toggles dropdown', async () => {
        let button = wrapper.get('button')
        
        button.trigger('click')

        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain("Dropdown items")
    })

})