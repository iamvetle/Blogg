import TheHeader from "~/components/Element/TheHeader.vue"
import { mount } from '@vue/test-utils'

describe("Testing TheHeader", () => {
    const wrapper = mount(TheHeader)

    test("exists", () => {
        expect(wrapper.exists()).toBe(true)        
    })

    test("renders text", () => {
        expect(wrapper.text()).toContain("THE BLOG")
    })
})