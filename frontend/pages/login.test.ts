import { mount } from '@vue/test-utils'
import login from './login.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '~/store/authStore';
import LoginCard from '~/components/modules/Auth/LoginCard.vue';

let wrapper
let pinia = createTestingPinia()
let authStore:any


const factory = () => {
    return mount(login, {
        global: {
            plugins:[pinia],
            components: {
                LoginCard
            },
            stubs: {
                "LoginCard":true
            },
        }
    })
}

describe('login page testing', () => {

    beforeEach(() => {
        vi.stubGlobal("definePageMeta", () => {
            return null
        })
        authStore = useAuthStore(pinia)

    })

    /**
     * TODO make this work later
     */

    // test('Should NOT render loginform when the user is authenticated', async () => {

    //     // Arrange
    //     wrapper = factory()
    //     authStore.isAuthenticated = true

    //     await (wrapper.vm as any).$nextTick()

    //     const loginCard = wrapper.findComponent({ name: "LoginCard" })

    //     // no act?

    //     // Assert
    //     expect(wrapper.exists()).toBe(true)
    //     expect(loginCard.exists()).toBe(false)
    // })

    test('Should render the loginform when the user is NOT authenticated', async () => {
        // Arrange
        wrapper = factory()
        authStore.isAuthenticated = false
        
        await (wrapper.vm as any).$nextTick()

        const loginCard = wrapper.findComponent({ name: "LoginCard" })
 
        expect(loginCard.exists()).toBe(true)
    })
    test('Should match snapshot', () => {
        wrapper = factory()
        expect(wrapper).toMatchSnapshot()
    })
    
}
)
