
import Wait from '~/components/layout/Wait.vue'
import { mount } from '@vue/test-utils'

describe("testing TheWait component", () => {
    const wrapper = mount(Wait)

    test("renders text", () => {
        expect(wrapper.text()).toContain("You need an account to be able to")
    })

    it("should Render FormLogin", () => {
        expect(wrapper.findComponent({ name:"FormLogin" }))
    })
})