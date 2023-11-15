import { VueWrapper, mount } from '@vue/test-utils'
import FeedListArticles from '~/components/modules/Blogg/FeedListArticles.vue'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'
import ArticleCard from '~/components/modules/Blogg/ArticleCard.vue'
import { usePostStore } from '~/store/postStore'
import ArticleBookmark from '~/components/UI/ArticleBookmark.vue'

describe("list articles testing", () => {
    let wrapper: VueWrapper
    let generalStore: any;
    let postStore:any;
    let pinia: any;

    beforeEach(() => { // The beforeEach block runs before each test
        // Create a new testing Pinia instance
        pinia = createTestingPinia()

        // Initialize the generalStore with mock data
        generalStore = useGeneralStore(pinia)
        postStore = usePostStore(pinia)

        generalStore.isAuthenticated = true
        postStore.posts = {
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
        wrapper = mount(FeedListArticles, {
            global: {
                plugins: [pinia],
                components: {
                    ArticleCard,
                    ArticleBookmark
                },
                stubs: {
                    ArticleBookmark:true,
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
    test("renders the article bookmark icon component", () => {
        const save_icon = wrapper.findComponent({ name: "ArticleBookmark" }) 

        expect(save_icon.exists()).toBe(true)
    })

    test("Should display the number of comments", () => {
        expect(wrapper.text()).toContain("526")
    })
    
})
