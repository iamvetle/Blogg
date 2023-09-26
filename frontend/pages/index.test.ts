import { VueWrapper, mount } from '@vue/test-utils'
import index from '~/pages/index.vue'

vi.stubGlobal('setPageLayout', () => {
    return null
})

describe('index page testing', () => {
    let wrapper:VueWrapper

    beforeEach(() => {
        wrapper = mount(index)
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})