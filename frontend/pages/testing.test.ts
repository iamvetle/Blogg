
import testing from "./testing.vue"
import { mount } from "@vue/test-utils"

const mockClickIt = true

/**
 * **Correct way to mock a composable!!**
 * 
 * This is the correct way to mock a composable in Vue Test utils
 * when unit testing a component
 * 
 * **First** the path to the component is referanced
 * 
 * **Second** - The function that is declared with "export const someFunction"
 * is what I am going to then referance with " : "
 * 
 * **Third** - I need to call "await wrapper.vm.$nextTick()"
 */
vi.mock('~/composables/getMethod', () => ({
    getMethod: () => true
}))

describe('YourComponent', () => {
    it('renders "Please" when sesamy is true', async () => {
        const wrapper = mount(testing)

        // Make sure the component has mounted
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('Please')
    })
})