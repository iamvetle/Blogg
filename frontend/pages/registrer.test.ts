import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'
import register from '~/pages/registrer.vue'

describe('register page testing', () => {
    let wrapper:VueWrapper
    let store;
    let pinia;

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)
        wrapper = mount(register, {
            global: {
                plugins: [pinia],
            },
        })
    })

    test('register page exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})