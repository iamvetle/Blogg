import { createTestingPinia } from "@pinia/testing"
import { VueWrapper, flushPromises, mount } from '@vue/test-utils';
import index from "~/pages/index.vue";
import { useGeneralStore } from '~/store/generalStore';
import FeedPostsList from '~/components/modules/Blogg/FeedPostsList.vue';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePostStore } from '~/store/postStore';
import { useSearchStore } from '~/store/searchStore';
import { usePaginationStore } from '~/store/paginationStore';
import BaseButton from '~/components/base/BaseButton.vue'
import FeedTopChoice from '~/components/modules/Blogg/FeedTopChoice.vue';
import FeedTopSearch from "~/components/modules/Blogg/FeedTopSearch.vue";

let wrapper: any;
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
                    username: "michael98"
                },
                {
                    username: "stephen5"
                }
            ]
        }

        loggedInUserStore.loggedInUserProfile = {
            "num_of_following": 2,
        }

        postStore.posts = {
            results: [
                {
                    title: "testtitle1",
                    content: "testcontent1"
                },
                {
                    title: "testtitle2",
                    content: "testcontent2"
                },
                {
                    title: "testtitle3",
                    content: "testcontent3"
                }
            ]
        }
        postStore.allTags = []

        paginationStore.activeFetchURL = "something"

        wrapper = mount(index, {
            global: {
                plugins: [pinia],
                stubs: {
                    "FeedPostsList": true,
                    'FeedPostsListSidebar': true,
                    "FilterBox": true,
                    "FeedTopSearch": true,
                    "FeedSidebar": true
                },
                mocks: {
                },
                components: {
                    FeedPostsList,
                    BaseButton,
                    FeedTopChoice,
                    FeedTopSearch
                },

            },
        })
    })

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })

    test('Should render FeedPostsList when there are posts and logged in user profile information', async () => {

        const listarticles = wrapper.findComponent({ name: 'FeedPostsList' })

        expect(listarticles.exists()).toBe(true)

        generalStore.isAuthenticated = false

        await wrapper.vm.$nextTick()

        expect(listarticles.exists()).toBe(false)
    });
    test('Should NOT render FeedPostsList when the loggedinuser is not authenticated', async () => {

        generalStore.isAuthenticated = false

        await wrapper.vm.$nextTick()
        const listarticles = wrapper.findComponent({ name: 'FeedPostsList' })


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
    test('Should not render the dropdown filter if there are not tags', async () => {
        postStore.allTags = null

        await wrapper.vm.$nextTick()

        const filter = wrapper.find("#dropdown-filter")

        expect(filter.exists()).toBe(false)

    });

    test('Should NOT render the sidebar if the logged in user profile information are there/is true (and feed posts)', async () => {
        loggedInUserStore.loggedInUserProfile = false

        await wrapper.vm.$nextTick()

        const sidebar = wrapper.findComponent({ name: "FeedPostsListSidebar" })

        expect(sidebar.exists()).toBe(false)
    })
    test('Should not automatically have the filter dropdown open', async () => {
        const sidebar = wrapper.findComponent({ name: "FilterBox" })

        expect(sidebar.exists()).toBe(false)
    })
    test("If the following list posts are selected, then the filter dropdown should not be shown", async () => {

        paginationStore.activeFetchURL = "http://localhost:8888/api/feed/following/"

        await wrapper.vm.$nextTick()

        const dropdown_filter = wrapper.find("#dropdown-filter")

        expect(dropdown_filter.exists()).toBe(false)
    });

    test('Should render the feed top choice', async () => {
        await wrapper.vm.$nextTick()


        const topchoice = wrapper.findComponent({ name: "FeedTopChoice" })

        expect(topchoice.exists()).toBe(true)
    })
    test('Should render search top for feed', () => {
        const topSearch = wrapper.findComponent({ name: "FeedTopSearch" })
        expect(topSearch.exists()).toBe(true)

    })
    test('Should render the sidebar component', () => {
        const sidebar = wrapper.findComponent({ name: "FeedSidebar" })

        expect(sidebar.exists()).toBe(true)
    })




    test('Should match snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })


})
