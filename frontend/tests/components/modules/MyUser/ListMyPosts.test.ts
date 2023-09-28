import ListMyPosts from '~/components/modules/MyUser/ListMyPosts.vue'
import { mount } from '@vue/test-utils'

describe("testing MyUserPost cmp", () => {

    // mounts component
    const wrapper = mount(ListMyPosts, {
        props: {
            postProp: {
                id:3,
                title:"test title",
                content: "test content",
                date_published:"2003-29-05",
                author: {
                    username:"test",
                    first_name:"test_first_name",
                    last_name:"test_last_name",
                }
            }
        }
    })
    
    test("exists", () => {
        expect(wrapper.exists()).toBe(true);        
    })

    test("Props get rendered", () => {
        expect(wrapper.text()).toContain("test title");
        expect(wrapper.text()).toContain("test content");
        expect(wrapper.text()).toContain("2003-29-05");
    })
})