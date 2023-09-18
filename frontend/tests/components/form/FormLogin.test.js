import { mount } from '@vue/test-utils'
import FormLogin from '~/components/form/FormLogin.vue'

describe('FormLogin page testing', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(FormLogin)
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})