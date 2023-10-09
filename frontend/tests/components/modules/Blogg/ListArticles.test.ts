import { VueWrapper, mount } from '@vue/test-utils'
import ListArticles from '~/components/modules/Blogg/ListArticles.vue'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'
import ArticleCard from '~/components/modules/Blogg/ArticleCard.vue'
import BaseIconSaveArticleUnSaved from '~/components/base/BaseIconSaveArticleUnSaved.vue';

describe("list articles testing", () => {
    let wrapper: VueWrapper
    let store: any;
    let pinia: any;

    beforeEach(() => { // The beforeEach block runs before each test
        // Create a new testing Pinia instance
        pinia = createTestingPinia()

        // Initialize the store with mock data
        store = useGeneralStore(pinia)

        store.isAuthenticated = true
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
                    ArticleCard, BaseIconSaveArticleUnSaved
                },
            },
            props: {
                widthProp: "23",
                heightProp:"51",
                colorProp:"blue",
            }
        })
    })

    test("exists", () => {
        console.log(wrapper.html())
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
