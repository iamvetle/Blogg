import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'
import loggut from '~/pages/loggut.vue'

describe('loggut page testing', () => {
    let wrapper;
    let store;
    let pinia;

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)
        wrapper = mount(loggut, {
            global: {
                plugins: [pinia],
            },
        })
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})