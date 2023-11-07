import { createTestingPinia } from "@pinia/testing"
import { VueWrapper, mount } from '@vue/test-utils';
import index from "~/pages/index.vue";
import { useGeneralStore } from '~/store/generalStore';
import ListArticles from '~/components/modules/Blogg/ListArticles.vue';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePostStore } from '~/store/postStore';
import { useSearchStore } from '~/store/searchStore';
import { usePaginationStore } from '~/store/paginationStore';

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
                    "ListArticles": true,
                    'ListArticlesSidebar': true,
                    "FilterBox": true
                },
                mocks: {
                },
                components: {
                    ListArticles,
                },

            },
        })
    })

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })

    test('Should render ListArticles when there are posts and logged in user profile information', async () => {

        const listarticles = wrapper.findComponent({ name: 'ListArticles' })

        expect(listarticles.exists()).toBe(true)

        generalStore.isAuthenticated = false

        await wrapper.vm.$nextTick()

        expect(listarticles.exists()).toBe(false)
    });
    test('Should NOT render ListArticles when the loggedinuser is not authenticated', async () => {

        generalStore.isAuthenticated = false

        await wrapper.vm.$nextTick()
        const listarticles = wrapper.findComponent({ name: 'ListArticles' })


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

        const sidebar = wrapper.findComponent({ name: "ListArticlesSidebar" })

        expect(sidebar.exists()).toBe(true)
    })

    test('Should NOT render the sidebar if the logged in user profile information are there/is true (and feed posts)', async () => {
        loggedInUserStore.loggedInUserProfile = false

        await wrapper.vm.$nextTick()

        const sidebar = wrapper.findComponent({ name: "ListArticlesSidebar" })

        expect(sidebar.exists()).toBe(false)
    })
    test('Should not automatically have the filter dropdown open', async () => {
        const sidebar = wrapper.findComponent({ name: "FilterBox" })

        expect(sidebar.exists()).toBe(false)
    })
    test('Should render the filterbox component, containing the filter options, when the dropdown-button is CLICKED', async () => {

        const dropbutton = wrapper.find("[data-test='dropdown-button']")
        expect(dropbutton.exists()).toBe(true)

        await dropbutton.trigger("click")

        await wrapper.vm.$nextTick()

        const sidebar = wrapper.findComponent({ name: "FilterBox" })

        expect(sidebar.exists()).toBe(true)
    })
    test('Search result text should not be present when no search has been made', async () => {
        expect(wrapper.html()).not.toContain("Søkeresultater for")
    })
    test('Search result text SHOULD be present when a search has been made', async () => {
        searchStore.searchPart = true

        await wrapper.vm.$nextTick()

        expect(wrapper.html()).toContain("Søkeresultater for")
    })

    test('Should be a text giving two options', () => {
        const following_text = "Following"
        const feed_text = "Feed"

        expect(wrapper.html()).toContain(feed_text)
        expect(wrapper.html()).toContain(following_text)
    })
    test("There should be two buttons containing the two texts", () => {
        const feed_button = wrapper.get("[data-test='feed-posts-option']")
        const following_button = wrapper.get("[data-test='following-posts-option']")

        expect(feed_button.element.tagName).toBe("BUTTON")
        expect(following_button.element.tagName).toBe("BUTTON")

        expect(feed_button.text()).toContain("Feed")
        expect(following_button.text()).toContain("Following")
    })
    test('There is a defined function meant for the feed button', async () => {

        expect((wrapper.vm as any).feedPostSetting).toBeDefined()
    })

    test('There is a defined function meant for the following posts button', async () => {

        expect((wrapper.vm as any).followingPostSetting).toBeDefined()
    })
    test('When the following button is clicked the fetch url value that is used for fetching posts is changed ', async () => {

        const following_button = wrapper.get("[data-test='following-posts-option']")

        await following_button.trigger("click")

        await wrapper.vm.$nextTick()

        expect(paginationStore.activeFetchURL).toEqual("http://localhost:8888/api/feed/following/")
    })
    test('When the following button is clicked the fetch url value that is used for fetching posts is changed ', async () => {
        const feed_button = wrapper.get("[data-test='feed-posts-option']")

        await feed_button.trigger("click")

        await wrapper.vm.$nextTick()

        expect(paginationStore.activeFetchURL).toEqual("http://localhost:8888/api/feed/")
    })
    // test('The fetch function should be called after changing the fetchURL on feed button click', async () => {
    //     const mockGetPostMultipleSnippet = vi.fn();

    //     ;(wrapper.vm as any).getPostMultipleSnippet = mockGetPostMultipleSnippet;

    //     await wrapper.vm.$nextTick()


    //     const feed_button = wrapper.get("[data-test='feed-posts-option']")
    //     await feed_button.trigger("click")
    //     await wrapper.vm.$nextTick()

    //     expect(mockGetPostMultipleSnippet).toHaveBeenCalledOnce()
    // })
    test('The feed button should be primary (have a class of white) from the beginning', () => {

        const feed_button = wrapper.find("[data-test='feed-posts-option']")
        const following_button = wrapper.find("[data-test='following-posts-option']")

        console.log(wrapper.html())

        expect(feed_button.attributes("class")).toContain("bg-primary")
        expect(following_button.attributes("class")).not.toContain("bg-primary")
    })
    test('The following button should be primary (have a class of primary) when the value of selected shifts to true', async () => {

        ; (wrapper.vm as any).followingSelected = true

        await wrapper.vm.$nextTick()

        const following_button = wrapper.find("[data-test='following-posts-option']")
        const feed_button = wrapper.find("[data-test='feed-posts-option']")

        console.log(wrapper.html())

        expect(following_button.attributes("class")).toContain("bg-primary")
        expect(feed_button.attributes("class")).not.toContain("bg-primary")
    })
    test("If the following list posts are selected, then the filter dropdown should not be shown", async () => {

        ; (wrapper.vm as any).followingSelected = true

        await wrapper.vm.$nextTick()

        const dropdown_filter = wrapper.find("#dropdown-filter")

        expect(dropdown_filter.exists()).toBe(false)
    })
    test('The dropdown filter SHOULD exist if normal feed posts are shown', () => {
        const dropdown_filter = wrapper.find("#dropdown-filter")

        expect(dropdown_filter.exists()).toBe(true)
    })
    test('Should NOT (when the logged in user is following atlest one) show text saying that the logged-in user is not following anyone if that is the case when the following button is on', async () => {
        ; (wrapper.vm as any).followingSelected = true
        loggedInUserStore.loggedInUserProfile.num_of_following = 0

        await wrapper.vm.$nextTick()

        const if_no_following_message = "You are not following anyone"

        expect(wrapper.text()).not.toContain(if_no_following_message)
    })

    test('SHOULD show text saying that the logged-in user is not following anyone if that is the case when the following button is on', async () => {
        ; (wrapper.vm as any).followingSelected = true;
        postStore.posts.results = []
        loggedInUserStore.loggedInUserProfile.num_of_following = 0

        await wrapper.vm.$nextTick()

        const if_no_following_message = "You are not following anyone."

        expect(wrapper.text()).toContain(if_no_following_message)
    })
    test('If the users the user is following doesnt have any posts that should be notified on the screen', async () => {
        
        // already set to users who have made no posts
        
        postStore.posts.results = []
        ;(wrapper.vm as any).followingSelected = true

        await wrapper.vm.$nextTick()

        const if_no_following_message = "You are not following anyone."


        expect(wrapper.text()).toContain("No posts are published.")
        expect(wrapper.text()).not.toContain(if_no_following_message)
    }),
    test('If the logged in user is following no one, only the "You are not following anyone" text should be rendered', async () => {
        
        // already set to users who have made no posts
        
        postStore.posts.results = []
        ;(wrapper.vm as any).followingSelected = true
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

})
