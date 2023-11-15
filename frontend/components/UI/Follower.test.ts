import { VueWrapper, mount } from '@vue/test-utils'
import Follower from './Follower.vue'

describe('Follower testing', () => {
    let wrapper:VueWrapper;

    beforeEach(() => {
        wrapper = mount(Follower)
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})