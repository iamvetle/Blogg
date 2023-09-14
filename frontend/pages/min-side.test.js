import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore';
import min-side from '~/pages/min-side.vue' // dont know why not working

describe('min-side page testing', () => {
    let wrapper;
    let store;
    let pinia;

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)
        wrapper = mount(min-side, {
            global: {
                plugins: [pinia],
            },
        })
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})