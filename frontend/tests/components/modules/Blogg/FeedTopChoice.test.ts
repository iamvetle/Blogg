import FeedTopChoice from '~/components/modules/Blogg/FeedTopChoice.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import BaseButton from '~/components/base/BaseButton.vue';
import { usePaginationStore } from '~/store/paginationStore';
import FeedDropdownFilter from '~/components/modules/Blogg/FeedDropdownFilter.vue';
import { useAuthStore } from '~/store/authStore';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore; 
let postStore;
let loggedInUserStore;
let paginationStore:any;
let authStore:any

let mockSetToOnlyShowFollowingPosts = vi.fn()
let mockShowAllFeedPosts = vi.fn()



const factory = () => {
    return shallowMount(FeedTopBar, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {
                "FeedTopChoiceFeedOptionButton":true,
                "FeedTopChoiceFollowingOptionButton":true,
            },
        },
        props: {},
        slots: {}
    })
};

describe('Testing the choices that are over the feed of posts', () => {

	beforeEach(() => {
		// generalStore = useGeneralStore(pinia); 
		postStore = usePostStore(pinia);
		loggedInUserStore = useLoggedInUserStore(pinia);
		paginationStore = usePaginationStore(pinia); 
		authStore = useAuthStore(pinia)

		paginationStore.activeFetchURL = "http://localhost:8888/api/feed/following/"


	});

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
		vi.clearAllMocks()
	});
	test('Should exist', async () => {
		wrapper = factory()
		authStore.isAuthenticated = true

		expect(wrapper.exists()).toBe(true)
	})

	test('SHOULD render "FeedTopChoice', () => {
		wrapper = factory()
		
		expect(wrapper.findComponent({ name:"FeedTopChoice" }).exists()).toBe(true)
	})
    test('Should have the FEED option', () => {
        // Is supposed to make sure that "all" posts can be viewed - is not specific to whom following
        wrapper = factory()
        expect(wrapper.findComponent({ name:"FeedTopChoiceFeedOptionButton" }).exists()).toBe(true)
    })
    test('Should have the FEED option', () => {
        // The following component button is supposed to be there, which - is supposed to make sure that posts only made by whom following is shown
        wrapper = factory()
        expect(wrapper.findComponent({ name:"FeedTopChoiceFollowingOptionButton" }).exists()).toBe(true)
    })
});