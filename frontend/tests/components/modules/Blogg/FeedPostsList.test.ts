
import { VueWrapper, mount } from '@vue/test-utils'
import FeedPostsList from '~/components/modules/Blogg/FeedPostsList.vue'
import { createTestingPinia } from '@pinia/testing'
import PostBookmark from '~/components/UI/PostBookmark.vue'
import FeedPostPreviewCard from '~/components/modules/Blogg/FeedPostPreviewCard.vue'

describe("list articles testing", () => {
    let wrapper: VueWrapper
    let generalStore: any;
    let postStore:any;
    let pinia: any;

    beforeEach(() => { // The beforeEach block runs before each test
        // Create a new testing Pinia instance
        pinia = createTestingPinia()

        vi.stubGlobal("checkIfLoggedInUser", () => {
            return false
        })

        // Initialize the generalStore with mock data
        generalStore = useGeneralStore(pinia)
        postStore = usePostStore(pinia)

        generalStore.isAuthenticated = true
        postStore.posts = {
            "count": 31,
            "next": "http://127.0.0.1:8888/api/feed/?page=3",
            "previous": "http://127.0.0.1:8888/api/feed/",
            "current_page": 2,
            "results": [
                {
                    "id": 17,
                    "title": "This is a title that is made by bob",
                    "author": {
                        "username": "bob",
                        "first_name": "Bob",
                        "last_name": "Smith",
                    },
                    "content_snippet": "Lorem ipsum...",
                    "date_published": "08-12-2021",
                    "num_of_comments":526,
                    "images":[
                        {
                            image:"~/src/something/image.jpeg"
                        },
                        {
                            image:"~/src/fruit/life.png"
                        }
                    ]
                },
                {
                    "id": 19,
                    "title": "This is a title James",
                    "author": {
                        "username": "jammy",
                        "first_name": "James",
                        "last_name": "Brown",
                    },
                    "content_snippet": "Test content content yes",
                    "date_published": "18-10-2022",
                    "num_of_comments":98,
                    "images":[
                        {
                            image:"~/src/africa/elefant.jpeg"
                        },
                        {
                            image:"~/src/vegetables/pingpong.png"
                        }
                    ]
                }
            ]
        }

        // Mount the component
        wrapper = mount(FeedPostsList, {
            global: {
                plugins: [pinia],
                components: {
                    FeedPostPreviewCard,
                    PostBookmark
                },
                stubs: {
                    PostBookmark:true,
                    BaseTag:true,
                    BaseIconMoreOptions:true,

                }
            },
            props: {
                width: "23",
                height:"51",
                fillColor:"blue",
                class:'',
            },
        })
    })

    test("exists", () => {
        expect(wrapper.exists()).toBe(true)
    })

    test("the articles/posts are rendering", () => {
        expect(wrapper.text()).toContain("This is a title that is made by bob")
        expect(wrapper.text()).toContain("bob")
        expect(wrapper.text()).toContain("Bob")
        expect(wrapper.text()).toContain("Smith")
        expect(wrapper.text()).toContain("Lorem ipsum...")
        expect(wrapper.text()).toContain("08-12-2021")
    })
    /**
     * ! try to mock the pagination store and such so that I can check more proper behavior through computed properties
     */
    // test("renders the article bookmark icon component", () => {
    //     const bookMarkComp = wrapper.find("[data-test='post_bookmark']") 

    //     expect(bookMarkComp.exists()).toBe(true)

    // })

    test("Should display the number of comments", () => {
        expect(wrapper.text()).toContain("526")
    })
    test('Should match snapshot', () => {
        expect(FeedPostsList).toMatchSnapshot()
    })
    
    
})
