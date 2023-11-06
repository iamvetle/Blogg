import { createTestingPinia } from "@pinia/testing"
import { VueWrapper, mount, flushPromises } from '@vue/test-utils';
import index from "~/pages/index.vue";
import { useGeneralStore } from '~/store/generalStore';
import ListArticles from '~/components/modules/Blogg/ListArticles.vue';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePostStore } from '~/store/postStore';
import { useSearchStore } from '~/store/searchStore';


let wrapper: VueWrapper
let generalStore: any
let postStore: any;
let loggedInUserStore: any;
let searchStore: any;
let pinia: any;

const mockFeedPostSetting = vi.fn()
const mockFollowingPostSetting = vi.fn()


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

        generalStore.isAuthenticated = true

        loggedInUserStore.idArrayOfSavedPosts = true
        loggedInUserStore.loggedInUserProfile = true

        postStore.posts = {
            results: true
        }
        postStore.allTags = []

        wrapper = mount(index, {
            global: {
                plugins: [pinia],
                components: {
                    ListArticles,
                },
                mocks: {
                    feedPostSetting:mockFeedPostSetting,
                    followingPostSetting:mockFollowingPostSetting
                },
                stubs: { "ListArticles": true, 'ListArticlesSidebar': true, "FilterBox": true }
            }

        })
    })

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })

    test('Should render ListArticles when there are posts and logged in user profile information', async () => {

        let listarticles = wrapper.findComponent({ name: 'ListArticles' })

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

    })
    test('Should not display anything when posts is false', async () => {
        postStore.posts = false

        await wrapper.vm.$nextTick()

        const element = wrapper.find("[data-test='everything']")

        expect(element.exists()).toBe(false)

    })
    test('Should render the dropdown filter when there are tags (and posts and profile info)', async () => {

        const filter = wrapper.find("#dropdown-filter")

        expect(filter.exists()).toBe(true)

    })

    test('Should not render the dropdown filter if there are not tags', async () => {
        postStore.allTags = null

        await wrapper.vm.$nextTick()

        const filter = wrapper.find("#dropdown-filter")

        expect(filter.exists()).toBe(false)

    })
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
    test('The feed button should call a function', async () => {

        const feed_button = wrapper.get("[data-test='feed-posts-option']")

        expect(wrapper.vm.feedPostSetting).toBeDefined() 
        
        await feed_button.trigger("click")

        await wrapper.vm.$nextTick()
        
        expect(mockFeedPostSetting).toHaveBeenCalledOnce()
    })

    test('The following button should call a function', async () => {

        const following_button = wrapper.get("[data-test='following-posts-option']")

        expect(wrapper.vm.followingPostSetting).toBeDefined() 
        
        await following_button.trigger("click")

        await wrapper.vm.$nextTick()
        
        expect(mockFollowingPostSetting).toHaveBeenCalledOnce()
    })
})
