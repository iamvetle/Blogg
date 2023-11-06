import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import FeedPagination from '~/components/modules/Blogg/FeedPagination.vue'
import { useGeneralStore } from '~/store/generalStore'
import { usePaginationStore } from '~/store/paginationStore'

let wrapper:VueWrapper
let store
let paginationStore:any
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

    afterEach(() => {
        wrapper.unmount()
    })

    test("paginationStore variables are being rendered", () => {
        
        expect(wrapper.text()).toContain(78)
        expect(wrapper.text()).toContain(28)
        expect(wrapper.text()).toContain(4)

    })
    test("Should display navigation if there are 11 or more posts", async () => {

        const navigation = wrapper.find("[data-test='post-navigation']")

        expect(navigation.exists()).toBe(true)
    })
    test("Should not display navigation if there are only 10 or less posts", async () => {
        paginationStore.number_of_posts = 10

        await wrapper.vm.$nextTick()

        const navigation = wrapper.find("[data-test='post-navigation']")

        expect(navigation.exists()).toBe(false)
    })
    test("Should not display navigation when number of posts is 9", async () => {
        paginationStore.number_of_posts = 9

        await wrapper.vm.$nextTick()

        const navigation = wrapper.find("[data-test='post-navigation']")

        expect(navigation.exists()).toBe(false)
    })
    test("Should display navigation if there are 11 posts", async () => {
        paginationStore.number_of_posts = 11

        await wrapper.vm.$nextTick()

        const navigation = wrapper.find("[data-test='post-navigation']")

        expect(navigation.exists()).toBe(true)
    })
})