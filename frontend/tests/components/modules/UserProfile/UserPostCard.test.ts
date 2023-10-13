import UserPostCard from '~/components/modules/UserProfile/UserPostCard.vue'
import { shallowMount } from '@vue/test-utils'

describe("testing the UserPostCard", () => {
    const wrapper = shallowMount(UserPostCard, {
        props: {
            postProp: {
                title:"title",
                content_snippet:"some content",
                date_published:"2023-09-23",
                author: {
                    username:"testuser",
                    first_name: "tester",
                    last_name: "testis"
                }
            }
        }
    })
    
    test("exists", () => {
        expect(wrapper.exists()).toBe(true)        
    })

    it("should take and render the content of the props being passed", () => {
        expect(wrapper.text()).toContain("Read more")
        expect(wrapper.text()).toContain("title")
        expect(wrapper.text()).toContain("some content")
        expect(wrapper.text()).toContain("testuser")
    })
})