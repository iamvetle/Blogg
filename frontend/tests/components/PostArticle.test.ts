import PostArticle from '../../components/PostArticle.vue'
import { mount } from '@vue/test-utils'

describe("testing PostArticle", async () => {
    const wrapper = await mount(PostArticle, {
        props: {
            postProp: {
                date_published: "2023-09-12",
                title:"test title",
                content_snippet:"Test content",
                id:1,
                author: {
                    username:"tester",
                    first_name:"first",
                    last_name:"last"
                }
            }
        }
    }) 
    
    test("exists", () => {
        expect(wrapper.exists()).toBe(true)
    })
})
