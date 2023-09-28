import { VueWrapper, mount } from '@vue/test-utils'
import Follower from '~/components/modules/MyUser/Follower.vue'

describe('Follower testing', () => {
    let wrapper:VueWrapper;

    beforeEach(() => {
        wrapper = mount(Follower)
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})