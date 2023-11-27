import FeedSidebar from './FeedSidebar.vue';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePaginationStore } from '~/store/paginationStore';
import FeedPostsListSidebar from '~/components/modules/Blogg/FeedPostsListSidebar.vue';
import FeedDropdownFilter from './FeedDropdownFilter.vue';

let wrapper: any;
let pinia: any = createTestingPinia();                  

// let generalStore; 
let postStore: any
let loggedInUserStore: any
let paginationStore: any

const factory = () => {
    return shallowMount(FeedSidebar, {
        global: {
            plugins: [pinia],
            components: {
                FeedPostsListSidebar,
                FeedDropdownFilter
            },
            mocks: {},
            stubs: {
                FeedDropdownFilter: true,
                FeedPostsListSidebar: true,
                SkeletonFeedPostsListSidebar: true
            },
        },
        props: {},
        slots: {}
    })
};

describe('Testing the sidebar of the feed', () => {

    beforeEach(() => {
        // generalStore = useGeneralStore(pinia); 
        postStore = usePostStore(pinia);
        loggedInUserStore = useLoggedInUserStore(pinia);
        paginationStore = usePaginationStore(pinia);

        loggedInUserStore.loggedInUserProfile = {
            username: "testusername"
        }

        postStore.allTags = [
            "Food",
            "Animals"
        ]
        paginationStore.activeFetchURL = false

    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('Should exist', () => {
        wrapper = factory()

        expect(wrapper.exists()).toBe(true)
    })
    test('Should render the the feedpostsidebar and the feeddropdownfilter', () => {
        wrapper = factory()

        const sidebar = wrapper.findComponent({ name: "FeedPostsListSidebar" })
        const dropdownFilter = wrapper.findComponent({ name: "FeedDropdownFilter" })

        expect(sidebar.exists()).toBe(true)
        expect(dropdownFilter.exists()).toBe(true)
    })
    test('Should not render the feeddropdownfilter if not tags are specified', async () => {
        wrapper = factory()
        postStore.allTags = null

        await wrapper.vm.$nextTick()

        const feedDropdown = wrapper.findComponent({ name: "FeedDropdownFilter" })

        expect(feedDropdown.exists()).toBe(false)

        // but still render the feedsidebar
        const sidebar = wrapper.findComponent({ name: "FeedPostsListSidebar" })

        expect(sidebar.exists()).toBe(true)
    })
    test('Should match snapshot', () => {
        wrapper = factory()

        expect(wrapper).toMatchSnapshot()

    })
    test('Should have the FeedPostsListSidebar been rendered when loggedinuserinformation is not present', async () => {
        wrapper = factory()

        loggedInUserStore.loggedInUserProfile = null

        await wrapper.vm.$nextTick()


        // normal sidebar should not be there
        const feedSidebar = wrapper.findComponent({ name:"FeedPostsListSidebar" })
        expect(feedSidebar.exists()).toBe(false)

        // skeleton should be there

        const skeletonfeedPostListsidebar = wrapper.findComponent({ name: "SkeletonFeedPostsListSidebar" })
        expect(skeletonfeedPostListsidebar.exists()).toBe(true)
    })

});