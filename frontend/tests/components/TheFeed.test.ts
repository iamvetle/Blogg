import { mount } from '@vue/test-utils'
import TheFeed from '../../components/TheFeed.vue'
import PostWindow from '../../components/PostWindow.vue'

describe("TheFeed testing", () => {
    const wrapper = mount(TheFeed)

    test("exists", () => {
        expect(wrapper.exists()).toBe(true)
    })
    
    test("renders text", () => {
        expect(wrapper.text()).toContain("Siste blogginnlegg")
    })
})