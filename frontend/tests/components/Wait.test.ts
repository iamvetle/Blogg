import Wait from '@/components/Wait.vue'
import { mount } from '@vue/test-utils'
import test

test("Should work", () => {
    const wrapper = mount(Wait)
    expect(wrapper.text()).toContain("You need to have an account")
})