import { createTestingPinia } from "@pinia/testing"
import { VueWrapper, mount } from '@vue/test-utils';
import index from "~/pages/index.vue";
import { useGeneralStore } from '~/store/generalStore';
import FeedListArticles from '~/components/modules/Blogg/FeedListArticles.vue';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePostStore } from '~/store/postStore';
import { useSearchStore } from '~/store/searchStore';
import { usePaginationStore } from '~/store/paginationStore';
import BaseButton from '~/components/base/BaseButton.vue'

let wrapper: VueWrapper
let generalStore: any
let postStore: any;
let loggedInUserStore: any;
let searchStore: any;
let pinia: any;
let paginationStore: any;


describe('index page testing', () => {

    beforeEach(() => {
        vi.stubGlobal("definePageMeta", () => {
            return null
        })

        pinia = createTestingPinia()
        generalStore = useGeneralStore(pinia)
        postStore = usePostStore(pinia)
        loggedInUserStore = useLoggedInUserStore(pinia)
        searchStore = useSearchStore(pinia)
        paginationStore = usePaginationStore(pinia)

        generalStore.isAuthenticated = true

        loggedInUserStore.idArrayOfSavedPosts = true
        loggedInUserStore.loggedInUserProfile = {
            following: [
                {
                    username:"michael98"
                },
                {
                    username:"stephen5"
                }
            ]
        }

        loggedInUserStore.loggedInUserProfile = {
            "num_of_following": 2,
        }

        postStore.posts = {
            results: [
                {
                    title:"testtitle1",
                    content:"testcontent1"
                },
                {
                    title:"testtitle2",
                    content:"testcontent2"
                },
                {
                    title:"testtitle3",
                    content:"testcontent3"
                }
            ]
        }
        postStore.allTags = []

        paginationStore.activeFetchURL = "something"

        wrapper = mount(index, {
            global: {
                plugins: [pinia],
                stubs: {
                    "FeedListArticles": true,
                    'FeedListArticlesSidebar': true,
                    "FilterBox": true
                },
                mocks: {
                },
                components: {
                    FeedListArticles,
                    BaseButton
                },

            },
        })
    })

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })

    test('Should render FeedListArticles when there are posts and logged in user profile information', async () => {

        const listarticles = wrapper.findComponent({ name: 'FeedListArticles' })

        expect(listarticles.exists()).toBe(true)

        generalStore.isAuthenticated = false

        await wrapper.vm.$nextTick()

        expect(listarticles.exists()).toBe(false)
    });
    test('Should NOT render FeedListArticles when the loggedinuser is not authenticated', async () => {

        generalStore.isAuthenticated = false

        await wrapper.vm.$nextTick()
        const listarticles = wrapper.findComponent({ name: 'FeedListArticles' })


        expect(listarticles.exists()).toBe(false)
    });
    test('Should display stuff when there are posts / posts are true', async () => {

        await wrapper.vm.$nextTick()

        const element = wrapper.find("[data-test='everything']")

        expect(element.exists()).toBe(true)

    });
    test('Should not display anything when posts is false', async () => {
        postStore.posts = false

        await wrapper.vm.$nextTick()

        const element = wrapper.find("[data-test='everything']")

        expect(element.exists()).toBe(false)

    });
    test('Should render the dropdown filter when there are tags (and posts and profile info)', async () => {

        const filter = wrapper.find("#dropdown-filter")

        expect(filter.exists()).toBe(true)

    });

    test('Should not render the dropdown filter if there are not tags', async () => {
        postStore.allTags = null

        await wrapper.vm.$nextTick()

        const filter = wrapper.find("#dropdown-filter")

        expect(filter.exists()).toBe(false)

    });
    test('Should render the sidebar if the logged in user profile information are there/is true (and feed posts)', () => {

        const sidebar = wrapper.findComponent({ name: "FeedListArticlesSidebar" })

        expect(sidebar.exists()).toBe(true)
    })

    test('Should NOT render the sidebar if the logged in user profile information are there/is true (and feed posts)', async () => {
        loggedInUserStore.loggedInUserProfile = false

        await wrapper.vm.$nextTick()

        const sidebar = wrapper.findComponent({ name: "FeedListArticlesSidebar" })

        expect(sidebar.exists()).toBe(false)
    })
    test('Should not automatically have the filter dropdown open', async () => {
        const sidebar = wrapper.findComponent({ name: "FilterBox" })

        expect(sidebar.exists()).toBe(false)
    })
    test('Search result text should not be present when no search has been made', async () => {
        expect(wrapper.html()).not.toContain("Søkeresultater for")
    })
    test('Search result text SHOULD be present when a search has been made', async () => {
        searchStore.searchPart = true

        await wrapper.vm.$nextTick()

        expect(wrapper.html()).toContain("Søkeresultater for")
    })
    test("If the following list posts are selected, then the filter dropdown should not be shown", async () => {

        paginationStore.activeFetchURL = "http://localhost:8888/api/feed/following/"

        await wrapper.vm.$nextTick()

        const dropdown_filter = wrapper.find("#dropdown-filter")

        expect(dropdown_filter.exists()).toBe(false)
    });
    test('The dropdown filter SHOULD exist if normal feed posts are shown', () => {
        const dropdown_filter = wrapper.find("#dropdown-filter")

        expect(dropdown_filter.exists()).toBe(true)
    });
    test('Should NOT (when the logged in user is following atlest one) show text saying that the logged-in user is not following anyone if that is the case when the following button is on', async () => {
        paginationStore.activeFetchURL = "http://localhost:8888/api/feed/following/"
        loggedInUserStore.loggedInUserProfile.num_of_following = 0

        await wrapper.vm.$nextTick()

        const if_no_following_message = "You are not following anyone"

        expect(wrapper.text()).not.toContain(if_no_following_message)
    });

    test('SHOULD show text saying that the logged-in user is not following anyone if that is the case when the following button is on', async () => {
        paginationStore.activeFetchURL = "http://localhost:8888/api/feed/following/"
        postStore.posts.results = []
        loggedInUserStore.loggedInUserProfile.num_of_following = 0

        await wrapper.vm.$nextTick()

        const if_no_following_message = "You are not following anyone."

        expect(wrapper.text()).toContain(if_no_following_message)
    });
    test('If the users the user is following doesnt have any posts that should be notified on the screen', async () => {
        
        // already set to users who have made no posts
        
        postStore.posts.results = []
        paginationStore.activeFetchURL = "http://localhost:8888/api/feed/following/"

        await wrapper.vm.$nextTick()

        const if_no_following_message = "You are not following anyone."


        expect(wrapper.text()).toContain("No posts are published.")
        expect(wrapper.text()).not.toContain(if_no_following_message)
    });
    test('If the logged in user is following no one, only the "You are not following anyone" text should be rendered', async () => {
        
        // already set to users who have made no posts
        
        postStore.posts.results = []
        paginationStore.activeFetchURL = "http://localhost:8888/api/feed/following/"
        loggedInUserStore.loggedInUserProfile.num_of_following = 0

        await wrapper.vm.$nextTick()

        const if_no_following_message = "You are not following anyone."


        expect(wrapper.text()).not.toContain("No posts are published.")
        expect(wrapper.text()).toContain(if_no_following_message)
    }),
    test("If normal feed is displayed, no 'special text' should be displayed", () => {
        expect(wrapper.html()).not.toContain("No posts are published.")
        expect(wrapper.html()).not.toContain("You are not following anyone.")
    })

    test('Should match snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })


})
