import { mount } from '@vue/test-utils'
import login from './login.vue'
import { createTestingPinia } from '@pinia/testing'

let wrapper:any;
let pinia = createTestingPinia()
let authStore:any

/**
 * ! Expand later
 */


const factory = () => {
    return mount(login, {
        global: {
            plugins:[pinia],
            components: {
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
        expect(wrapper.html()).toMatchSnapshot()
    })
    
}
)
