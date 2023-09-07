import Footer from '~/components/Element/Footer.vue'
import { mount } from '@vue/test-utils'

describe('Testing the Footer element/component', () => {
    const wrapper = mount(Footer);

    test("element exists", () => {
        expect(wrapper.exists()).toBe(true)
    })

    test("renders text", () => {
        expect(wrapper.text()).toContain("The Blog™")
    })
    
})