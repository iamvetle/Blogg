import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import FeedPagination from '~/components/modules/Blogg/FeedPagination.vue'
import { useGeneralStore } from '~/store/generalStore'

let wrapper:VueWrapper
let store
let pinia

describe("testing Pagniation component", () => {

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore()
    
        store.number_of_posts_count = 78
        store.total_pages_count = 28
        store.previous_page_link = "http://example.com/posts/page?=3"
        store.current_page = 4
        store.next_page_link = "http://example.com/posts/page?=5"
        
        wrapper = mount(FeedPagination, {
            globals: {
                plugins: [pinia]
            }
        })

    })
    test("testing existence", () => {

        expect(wrapper.exists()).toBe(true)
    })

    test("store variables are being rendered", () => {
        
        expect(wrapper.text()).toContain(78)
        expect(wrapper.text()).toContain(28)
        expect(wrapper.text()).toContain(4)

    })

    // test("test if correct props are being given", () => {

    //     const wrapper = mount(Pagination, {
    //         globals: {
    //             props: {
    //                 total_number_of_pages: 17
                    
    //             }
    //         }
    //     })
    //     expect(wrapper.props)

    // })
})