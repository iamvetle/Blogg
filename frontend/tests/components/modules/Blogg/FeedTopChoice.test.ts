import FeedTopBar from '~/components/modules/Blogg/FeedTopBar.vue';
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
			components: {
				BaseButton,
				FeedDropdownFilter
			},
			mocks: {
				handleShowFollowingPosts: mockSetToOnlyShowFollowingPosts,
				handleShowAllFeedPosts: mockShowAllFeedPosts,
			},
			stubs: {
				"FeedDropdownFilter":true,
				"FeedTopBarFeedOptionButton":true,
				"FeedTopBarFollowingOptionButton":true
			},
		},
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

		loggedInUserStore.loggedInUserProfile = { num_of_following: 8 }
		postStore.posts = {
			results: true
		}
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
		
		expect(wrapper).toMatchSnapshot()
	})
	
	test('Should render the feed option button when authenticated ', async () => {
		wrapper = factory()
		authStore.isAuthenticated = true
		await wrapper.vm.$nextTick()

		expect(wrapper.find("[data-test='feed_all_posts_option_button']").exists()).toBe(true)
	})
	test('Should render the following option button when authenticated', async () => {
		wrapper = factory()
		authStore.isAuthenticated = true
		await wrapper.vm.$nextTick()

		expect(wrapper.find("[data-test='following_posts_option']").exists()).toBe(true)
	})
	test('Should NOT render the following option button when NOT authenticated', async () => {
		wrapper = factory()
		authStore.isAuthenticated = false
		await wrapper.vm.$nextTick()

		expect(wrapper.find("[data-test='following_posts_option']").exists()).toBe(false)
	})
	test('Should NOT render the feed option button when NOT authenticated ', async () => {
		wrapper = factory()
		authStore.isAuthenticated = false
		await wrapper.vm.$nextTick()

		expect(wrapper.find("[data-test='feed_all_posts_option_button']").exists()).toBe(false)
	})
	test('Should have a "button" to call the function that only shows posts by the the users the logged in user is following', async () => {
		wrapper = factory()
		// The user is authenticated
		authStore.isAuthenticated = true
		await wrapper.vm.$nextTick()
				
		const setToFollowingOnlyButton = wrapper.find("[data-test='following_posts_option']")

		await setToFollowingOnlyButton.trigger("show-following-posts")

		expect(mockSetToOnlyShowFollowingPosts).toHaveBeenCalledOnce()
	})
	test('Should have a "button" call the function that shows all feed posts', async () => {
		wrapper = factory()
		authStore.isAuthenticated = true
		await wrapper.vm.$nextTick()
		
		const setToFeedButton = wrapper.find("[data-test='feed_all_posts_option_button']")

		await setToFeedButton.trigger("show-all-feed-posts")

		expect(mockShowAllFeedPosts).toHaveBeenCalledOnce()
	})

	test('Should render the filter regardless of if the user is authenticated or not', async () => {
		wrapper = factory()
		authStore.isAuthenticated = true
		await wrapper.vm.$nextTick()
		
		let feedFilter = wrapper.find("[data-test='feed_dropdown_filter']")

		expect(feedFilter.exists()).toBe(true)

		wrapper.unmount()

		wrapper = factory()
		authStore.isAuthenticated = false
		await wrapper.vm.$nextTick()
		
		feedFilter = wrapper.find("[data-test='feed_dropdown_filter']")

		expect(feedFilter.exists()).toBe(true)
	})
});