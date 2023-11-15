import { VueWrapper, mount } from "@vue/test-utils";

import FeedListArticlesSidebar from "~/components/modules/Blogg/FeedListArticlesSidebar.vue";
import LoggedInUserProfileCard from "~/components/modules/MyUser/LoggedInUserProfileCard.vue";
import ArticleSavedCardList from "~/components/modules/MyUser/ArticleSavedCardList.vue";

import Following from "~/components/modules/MyUser/Following.vue";
import { createTestingPinia } from '@pinia/testing';
import { ref } from 'vue'
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

let wrapper: VueWrapper
let loggedInUserStore:any
let pinia

const mock_redirect_to_author_page = (author: any) => {
	author = null
	return null
}

describe('FeedListArticlesSidebar testing', () => {

	beforeAll(async () => {

		pinia = createTestingPinia()
		loggedInUserStore = useLoggedInUserStore()




		// Mock the getLoggedInUserProfile function
		loggedInUserStore.loggedInUserProfile = {
			"id": 13,
			"email": "person@gmail.com",
			"username": "iamperson",
			"first_name": "iamfirstname",
			"last_name": "iamlastname",
			"age": null,
			"address": null,
			"phone_number": null,
			"nickname": null,
			"last_online": "2023-09-07T15:46:59.393210Z",
			"following": [
				{
					"username": "michael90"
				}
			],
			"num_of_following": 1,
			"followers": [
				{
					"username": "bob3"
				}
			],
			"num_of_followers": 1,
			"saved_posts": [
				{
					"post": {
						"id": 1,
						"title": " saved1testtitle",
						"username": "saved1guy",
						"first_name": "saved1guyfirstname",
						"last_name": "saved1guylastname",
					}
				},
				{
					"post": {
						"id": 2,
						"title": " saved2testtitle",
						"username": "saved2guy",
						"first_name": "saved2guyfirstname",
						"last_name": "saved2guylastname",
					}
				},
			],
			"num_of_saved_posts": 192
		} as LoggedInUserProfileType;

		const full_name = ref("iamfirstname iamlastname")

		wrapper = mount(FeedListArticlesSidebar, {
			global: {
				components: { LoggedInUserProfileCard, ArticleSavedCardList, Following },
				mocks: { full_name, redirect_to_author_page: mock_redirect_to_author_page },
				plugins: [pinia],
				stubs:{
					ArticleSavedCardList:true
				}
			}
		});


		await wrapper.vm.$nextTick()
	})

	it('renders the FeedListArticlesSidebar component', () => {
		expect(wrapper.exists()).toBe(true)
	})

	it('renders LoggedInUserProfileCard when userdata is available', () => {
		const myProfile = wrapper.find('[data-test="myprofile"]')
		expect(myProfile.exists()).toBe(true)
	})

	it('articlesavedcarlist exists', () => {
		const ArticleSavedCardList = wrapper.findComponent({ name:"ArticleSavedCardList" })
		expect(ArticleSavedCardList.exists()).toBe(true)
	})

	it('Following exists', () => {
		const following = wrapper.findComponent(Following)
		expect(following.exists()).toBe(true)
	})
	it('should render username of who I am following', async () => {
		// console.log(wrapper.html())

		expect(wrapper.text()).toContain("michael90")
	})

	test("renders my profile information (username, firstname, lastname)",
		() => {

			expect(wrapper.text()).toContain("iamperson")
			expect(wrapper.text()).toContain("iamfirstname")
			expect(wrapper.text()).toContain("iamlastname")

		})

})
