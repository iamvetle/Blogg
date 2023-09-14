import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'
import login from '~/pages/login.vue'

describe('login page testing', () => {
    let wrapper;
    let store;
    let pinia;

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)
        wrapper = mount(login, {
            global: {
                plugins: [pinia],
            },
        })
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})