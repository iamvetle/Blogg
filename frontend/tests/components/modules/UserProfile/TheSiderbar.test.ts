import { VueWrapper, mount } from '@vue/test-utils'
import TheSidebar from '~/components/modules/UserProfile/TheSidebar.vue'

vi.stubGlobal("useRoute", () => {
    
})

describe('min-side page testing', () => {
    let wrapper:VueWrapper

    beforeEach(() => {
        wrapper = mount(TheSidebar)
    })

    test('exists', () => {
        expect(wrapper.find('[id="bio"]').exists()).toBe(true)
    })
})