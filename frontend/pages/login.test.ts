import { mount } from '@vue/test-utils'
import login from './login.vue'
import LoginCard from '~/components/modules/Auth/LoginCard.vue'
import { createTestingPinia } from '@pinia/testing'

let wrapper
let pinia = createTestingPinia()
let generalStore = useGeneralStore(pinia)

vi.stubGlobal("definePageMeta", () => {
    return null
})


const factory = () => {
    return mount(login, {
        global: {
            components: {
                LoginCard
            },
            stubs: {
                "LoginCard":true
            },
            plugins: [pinia]
        }
    })
}

describe('login page testing', () => {

    test('Should NOT render loginform when the user is authenticated', async () => {

        // Arrange
        wrapper = factory()

        await (wrapper.vm as any).$nextTick()

        const login = wrapper.findComponent({ name: "LoginCard" })

        // no act?

        // Assert
        expect(wrapper.exists()).toBe(true)
        expect(login.exists()).toBe(false)
    })

    test('Should render the loginform when the user is not authenticated', async () => {
        // Arrange
        wrapper = factory()
        
        await (wrapper.vm as any).$nextTick()

        const loginCard = wrapper.findComponent({ name: "LoginCard" })

        // no act?

        // Assert        
        expect(loginCard.exists()).toBe(true)
    })
}
)
