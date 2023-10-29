import { VueWrapper, mount } from '@vue/test-utils'
import LoginCard from '~/components/modules/Auth/LoginCard.vue';
import { useGeneralStore } from '~/store/generalStore';
import { createTestingPinia } from '@pinia/testing'

let wrapper: VueWrapper
let generalStore:any;
let pinia:any;

describe('FormLogin page testing', () => {

    beforeEach(() => {
        pinia = createTestingPinia()
        generalStore = useGeneralStore(pinia)
        generalStore.isAuthenticated = false
        wrapper = mount(LoginCard, {
            
        })

    })

    test('exists', () => {

        expect(wrapper.exists()).toBe(true)
    })
    
    test("renders the login form", () => {
        expect(wrapper.findComponent({ name:"FormKit" }))
    })
})