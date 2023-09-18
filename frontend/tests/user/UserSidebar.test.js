import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore';
import UserSideBar from '~/components/user/UserSidebar.vue';  // dont know why not working

vi.stubGlobal("useRoute", () => {
    
})

describe('min-side page testing', () => {
    let wrapper;
    let store;
    let pinia;

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)
        wrapper = mount(UserSideBar, {
            global: {
                plugins: [pinia],
            },
        })
    })

    test('exists', () => {
        expect(wrapper.find('[id="bio"]').exists()).toBe(true)
    })
})