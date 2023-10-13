import { mount, VueWrapper } from '@vue/test-utils'
import folgere from '~/pages/folgere.vue'

describe('folgere page testing', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
        wrapper = mount(folgere)
    })

    test('renders followers', () => {
        expect(wrapper.findComponent({ name: "FollowerType"}))
    })
})