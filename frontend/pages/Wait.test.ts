
import Wait from './wait.vue'
import { mount } from '@vue/test-utils'

/** 'Stubs' the function. Basically "difussing" it */
vi.stubGlobal("definePageMeta", () => {
    return null
})

describe("testing TheWait page", () => {
    const wrapper = mount(Wait)

    test("renders text", () => {
        expect(wrapper.text()).toContain("You need an account to be able to")
    })

    it("should Render FormLogin", () => {
        expect(wrapper.findComponent({ name:"FormLogin" }))
    })
})