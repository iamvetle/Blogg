import { VueWrapper, mount } from '@vue/test-utils'
import UserSideBar from '~/components/user/UserSidebar.vue';  // dont know why not working

vi.stubGlobal("useRoute", () => {
    
})

describe('min-side page testing', () => {
    let wrapper:VueWrapper

    beforeEach(() => {
        wrapper = mount(UserSideBar)
    })

    test('exists', () => {
        expect(wrapper.find('[id="bio"]').exists()).toBe(true)
    })
})