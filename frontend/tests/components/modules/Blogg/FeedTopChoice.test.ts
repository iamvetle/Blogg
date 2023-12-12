import FeedTopChoice from '~/components/modules/Blogg/FeedTopChoice.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import BaseButton from '~/components/base/BaseButton.vue';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore; 
let postStore;
let loggedInUserStore;
// let paginationStore; 

let mockSetToOnlyShowFollowingPosts = vi.fn()
let mockSetToShowAllFeedPosts = vi.fn()


const factory = () => {
	return shallowMount(FeedTopChoice, {
		global: {
			plugins: [pinia],
			components: {
				BaseButton
			},
			mocks: {
				setToOnlyShowFollowingPosts: mockSetToOnlyShowFollowingPosts,
				setToShowAllFeedPosts: mockSetToShowAllFeedPosts
			},
			stubs: {},
		},
		slots: {}
	})
};

describe('Testing the choices that are over the feed of posts', () => {

	beforeEach(() => {
		// generalStore = useGeneralStore(pinia); 
		postStore = usePostStore(pinia);
		loggedInUserStore = useLoggedInUserStore(pinia);
		// paginationStore = usePaginationStore(pinia); 

		loggedInUserStore.loggedInUserProfile = { num_of_following: 8 }
		postStore.posts = {
			results: true
		}

	});

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
		vi.clearAllMocks()
	});
	test('Should exist', () => {
		wrapper = factory()

		expect(wrapper.exists()).toBe(true)
	})
	test('Should render two (base)buttons', () => {
		const buttons = wrapper.findAllComponents({ name: "BaseButton" })

		expect(buttons).toHaveLength(2)
	})

	test('Should match snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot()
	})
	test('Should render the feed option button ', () => {
		expect(wrapper.find("[data-test='feed_all_posts_option_button']").exists()).toBe(true)
	})
	test('Should render the following option button', () => {
		expect(wrapper.find("[data-test='following_posts_option']").exists()).toBe(true)
	})
	test('Should have a button to call the function that only shows posts by the the users the logged in user is following', async () => {
		const setToFollowingOnlyButton = wrapper.find("[data-test='following_posts_option']")

		await setToFollowingOnlyButton.trigger("click")

		expect(mockSetToOnlyShowFollowingPosts).toHaveBeenCalledOnce()
	})
	test('Should have a button call the function that shows all feed posts', async () => {
		const setToFeedButton = wrapper.find("[data-test='feed_all_posts_option_button']")

		await setToFeedButton.trigger("click")

		expect(mockSetToShowAllFeedPosts).toHaveBeenCalledOnce()
	})
});