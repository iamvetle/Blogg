import FeedSidebar from './FeedSidebar.vue';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import FeedPostsListSidebar from '~/components/modules/Blogg/FeedPostsListSidebar.vue';

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
    test('Should render the the feedpostsidebar', () => {
        wrapper = factory()

        const sidebar = wrapper.findComponent({ name: "FeedPostsListSidebar" })

        expect(sidebar.exists()).toBe(true)
    })
    test('Should not render the feeddropdownfilter (because that component is not there anymore)', async () => {
        wrapper = factory()

        const feedDropdown = wrapper.findComponent({ name: "FeedDropdownFilter" })

        expect(feedDropdown.exists()).toBe(false)
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