
import Wait from '~/components/layout/Wait.vue'
import { shallowMount } from '@vue/test-utils'

describe("testing TheWait component", () => {
    const wrapper = shallowMount(Wait)

    test("exists", () => {
        expect(wrapper.exists()).toBe(true)
    })

    test("renders text", () => {
        expect(wrapper.text()).toContain("You need an account to be able to")
    })
})