import { VueWrapper, flushPromises, mount } from '@vue/test-utils'
import LoginCard from '~/components/modules/Auth/LoginCard.vue';
import { useGeneralStore } from '~/store/generalStore';
import { createTestingPinia } from '@pinia/testing'

let wrapper: VueWrapper
let pinia:any;
let generalStore:any;

describe('FormLogin page testing', () => {

    beforeEach(() => {
        pinia = createTestingPinia()
        generalStore = useGeneralStore(pinia)
        generalStore.isAuthenticated = false

        wrapper = mount(LoginCard, {
            global: {
                plugins:[pinia]
            }
            
        })

    })

    test('exists', async () => {

        await flushPromises()
        await (wrapper.vm as any).$nextTick()

        expect(wrapper.exists()).toBe(true)
    })
    
    test("renders the login form", async () => {
        console.log(wrapper.html())

        await (wrapper.vm as any).$nextTick()

        expect(wrapper.html()).toContain("Invalid credentials")
        expect(wrapper.html()).toContain("Login successfull")
    })
})