import ArticleEntire from '~/components/modules/Blogg/ArticleEntire.vue'
import { shallowMount } from '@vue/test-utils'

describe("testing the ArticleEntire", () => {
    const wrapper = shallowMount(ArticleEntire, {
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

    test("text is rendered", () => {
        expect(wrapper.text()).toContain("Read more")
        expect(wrapper.text()).toContain("title")
        expect(wrapper.text()).toContain("some content")
        expect(wrapper.text()).toContain("testuser")
    })
})