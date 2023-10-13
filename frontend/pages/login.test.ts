import { VueWrapper, mount } from '@vue/test-utils'
import LoginCard from '~/components/modules/Auth/LoginCard.vue'

describe('login page testing', () => {
    const wrapper = mount(LoginCard)

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
}
)
