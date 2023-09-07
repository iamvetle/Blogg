import PostWindow from '../../components/PostWindow.vue'
import { shallowMount } from '@vue/test-utils'

describe("testing the PostWindow", () => {
    const wrapper = shallowMount(PostWindow, {
        props: {
            postDetail: {
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

    test("text is rendered", () => {
        expect(wrapper.text()).toContain("Read more")
    })
})