import { VueWrapper, mount } from '@vue/test-utils'
import ListArticles from '~/components/modules/Blogg/ListArticles.vue'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'

describe("TheFeed testing", () => {
    let wrapper:VueWrapper
    let store:any;
    let pinia:any;

    beforeEach(() => { // The beforeEach block runs before each test
        // Create a new testing Pinia instance
        pinia = createTestingPinia()

        // Initialize the store with mock data
        store = useGeneralStore(pinia)
        store.posts = {
            "count": 31,
            "next": "http://localhost:8888/api/feed/?page=3",
            "previous": "http://localhost:8888/api/feed/",
            "current_page": 2,
            "results": [
                {
                    "id": 17,
                    "title": "This is a title that is made by bob",
                    "author": {
                        "username": "bob",
                        "first_name": "Bob",
                        "last_name": "Smith"
                    },
                    "content_snippet": "Lorem ipsum...",
                    "date_published": "2023-08-29"
                }
            ]
        }

        // Mount the component
        wrapper = mount(ListArticles, {
            global: {
                plugins: [pinia],
            },
        })
    })

    test("exists", () => {
        expect(wrapper.exists()).toBe(true)
    })

    it("Should render the posts that are fetched", () => {
        console.log(wrapper.html())
        
        expect(wrapper.text()).toContain("This is a title that is made by bob")
    })

    test("shows an error message if there are no posts", () => {
        
        store.posts = null
        wrapper.unmount()

        wrapper = mount(ListArticles, {
            global: {
                plugins: [pinia],
            },
        })
    })
})
