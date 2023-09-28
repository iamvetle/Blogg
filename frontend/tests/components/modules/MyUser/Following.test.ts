import { mount } from '@vue/test-utils'
import Following from '~/components/modules/MyUser/Following.vue'

describe('following testing', () => {
    const wrapper = mount(Following)

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})