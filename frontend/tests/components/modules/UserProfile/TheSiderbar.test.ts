import { VueWrapper, mount } from '@vue/test-utils'
import TheUserSidebar from '~/components/modules/UserProfile/TheUserSidebar.vue'

vi.stubGlobal("useRoute", () => {
    
})

describe('minkonto page testing', () => {
    let wrapper:VueWrapper

    beforeEach(() => {
        wrapper = mount(TheUserSidebar)
    })

    test('exists', () => {
        expect(wrapper.find('[id="bio"]').exists()).toBe(true)
    })
})