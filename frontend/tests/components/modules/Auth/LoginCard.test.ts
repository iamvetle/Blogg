import { mount } from '@vue/test-utils'
import LoginCard from '~/components/modules/Auth/LoginCard.vue';

describe('FormLogin page testing', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(LoginCard)
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})