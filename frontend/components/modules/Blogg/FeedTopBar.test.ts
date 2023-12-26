import FeedTopBar from './FeedTopBar.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';


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
			components: {
			},
			mocks: {
				handleShowFollowingPosts: mockSetToOnlyShowFollowingPosts,
				handleShowAllFeedPosts: mockShowAllFeedPosts,
			},
			stubs: {
                "FeedTopChoice":true
			},
		},
		slots: {}
	})
};

describe('Testing component', () => {

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

	/** The web client should not get any options when not authenticated */
	test('Should match snapshot when not authenticated', async () => {
		wrapper = factory()
		authStore.isAuthenticated = false;

		await wrapper.vm.$nextTick()
	
		expect(wrapper.html()).toMatchSnapshot()
	})
	test('Should match snapshot when authenticated', async () => {
		wrapper = factory()
		authStore.isAuthenticated = true
		await wrapper.vm.$nextTick()
		
		expect(wrapper.html()).toMatchSnapshot()
	})
	test('Should render the COMPONENT "FeedTopChoice"', async () => {
		wrapper = factory()
		authStore.isAuthenticated = true
		await wrapper.vm.$nextTick()

		expect(wrapper.findComponent("FeedTopChoice").exists()).toBe(true)
	})
	test('Should render the following option button when authenticated', async () => {
		wrapper = factory()
		authStore.isAuthenticated = false
		await wrapper.vm.$nextTick()

		expect(wrapper.findComponent("FeedTopChoice").exists()).toBe(false)
	})

	test('Should RENDER the FILTER COMPONENT regardless of if the user is authenticated or not', async () => {
		wrapper = factory()
		authStore.isAuthenticated = true
		await wrapper.vm.$nextTick()
		
		expect(wrapper.findComponent("FeedDropdownFilter").exists()).toBe(true)

		wrapper.unmount()

		wrapper = factory()
		authStore.isAuthenticated = false
		await wrapper.vm.$nextTick()
		
		expect(wrapper.findComponent("FeedDropdownFilter").exists()).toBe(true)
	})
    
});