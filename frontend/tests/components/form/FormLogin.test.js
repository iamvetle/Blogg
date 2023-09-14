import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'
import FormLogin from '~/components/form/FormLogin.vue'

describe('FormLogin page testing', () => {
    let wrapper;
    let store;
    let pinia;

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)
        wrapper = mount(FormLogin, {
            global: {
                plugins: [pinia],
            },
        })
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})