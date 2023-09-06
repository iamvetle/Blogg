import { mount } from '@vue/test-utils'
import TheFeed from '../../components/TheFeed.vue'

describe("TheFeed testing", () => {
    test("exists", async () => {
        const wrapper = mount(TheFeed)
        expect(wrapper.exists()).toBe(true)
    })
})