import { VueWrapper, mount } from '@vue/test-utils'
import newpost from '~/pages/newpost.vue'

describe('newpost page testing', () => {
    let wrapper:VueWrapper

    beforeEach(() => {
        wrapper = mount(newpost)
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})