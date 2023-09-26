import { VueWrapper, mount } from '@vue/test-utils'
import login from '~/pages/login'

describe('login page testing', () => {
    const wrapper = mount()

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
}
)
