import { VueWrapper, mount } from '@vue/test-utils'
import FollowerType from '~/components/modules/MyUser/FollowerType.vue'

describe('FollowerType testing', () => {
    let wrapper:VueWrapper;

    beforeEach(() => {
        wrapper = mount(FollowerType)
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})