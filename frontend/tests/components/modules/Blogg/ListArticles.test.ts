import { VueWrapper, mount } from '@vue/test-utils'
import ListArticles from '~/components/modules/Blogg/ListArticles.vue'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'
import ArticleCard from '~/components/modules/Blogg/ArticleCard.vue'
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePostStore } from '~/store/postStore'

describe("list articles testing", () => {
    let wrapper: VueWrapper
    let generalStore: any;
    let loggedInUserStore:any;
    let postStore:any;
    let pinia: any;

    beforeEach(() => { // The beforeEach block runs before each test
        // Create a new testing Pinia instance
        pinia = createTestingPinia()

        // Initialize the generalStore with mock data
        generalStore = useGeneralStore(pinia)
        loggedInUserStore = useLoggedInUserStore(pinia)
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
                }
            ]
        }

        // Mount the component
        wrapper = mount(ListArticles, {
            global: {
                plugins: [pinia],
                components: {
                    ArticleCard
                },
                stubs: {
                    BaseIconSaveArticleUnSaved:true,
                    BaseIconSaveArticleSaved:true,
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
    test("renders the save icon component", () => {
        const save_icon = wrapper.findComponent({ name: "BaseIconSaveArticleUnSaved" }) 

        expect(save_icon.exists()).toBe(true)
    })
    
})
