import { VueWrapper, mount } from '@vue/test-utils'
import LoginCard from '~/components/modules/Auth/LoginCard.vue';

describe('FormLogin page testing', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
        wrapper = mount(LoginCard)
    })

    test('exists', () => {

        expect(wrapper.exists()).toBe(true)
    })
    
    test("renders the login form", () => {
        expect(wrapper.findComponent({ name:"FormKit" }))
    })
})