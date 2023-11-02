import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import FeedPagination from '~/components/modules/Blogg/FeedPagination.vue'
import { useGeneralStore } from '~/store/generalStore'
import { usePaginationStore } from '~/store/paginationStore'

let wrapper:VueWrapper
let store
let paginationStore
let pinia

describe("testing Pagniation component", () => {

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore()
        paginationStore = usePaginationStore()

        paginationStore.number_of_posts = 78
        paginationStore.all_pages_count = 28
        paginationStore.previous_page = "http://example.com/posts/page?=3"
        paginationStore.current_page_number = 4
        paginationStore.next_page = "http://example.com/posts/page?=5"
        
        wrapper = mount(FeedPagination, {
            globals: {
                plugins: [pinia]
            }
        })

    })
    test("testing existence", () => {

        expect(wrapper.exists()).toBe(true)
    })

    test("paginationStore variables are being rendered", () => {
        
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