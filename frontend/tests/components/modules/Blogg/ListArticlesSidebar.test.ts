import { VueWrapper, mount } from "@vue/test-utils";

import ListArticlesSidebar from "~/components/modules/Blogg/ListArticlesSidebar.vue";
import MyProfileCard from "~/components/modules/MyUser/MyProfileCard.vue";
import ArticleSavedCard from "~/components/modules/MyUser/ArticleSavedCard.vue";
import Following from "~/components/modules/MyUser/Following.vue";
import { createTestingPinia } from '@pinia/testing';
import { useGeneralStore } from "~/store/generalStore";
import { ref } from 'vue'
import { LoggedInUserProfileType } from '../../../../typescript/post_interfaces';

let wrapper: VueWrapper
let store
let pinia

const mock_redirect_to_author_page = (author:any) => {
	author = null
	return null
}

describe('ListArticlesSidebar testing', () => {

	beforeAll(async () => {

		pinia = createTestingPinia()
		store = useGeneralStore(pinia)




		// Mock the getLoggedInUserProfile function
		store.personalUser = {
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
						"id":1,
						"title": " saved1testtitle",
						"username": "saved1guy",
						"first_name": "saved1guyfirstname",
						"last_name": "saved1guylastname",
					}
				},
				{
					"post": {
						"id":2,
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




		wrapper = mount(ListArticlesSidebar, {
			global: {
				components: { MyProfileCard, ArticleSavedCard, Following },
				mocks: { full_name, redirect_to_author_page:mock_redirect_to_author_page },
				plugins: [pinia]
			}
		});


		await wrapper.vm.$nextTick()
	})

	it('renders the listarticlessidebar component', () => {
		expect(wrapper.exists()).toBe(true)
	})

	it('renders MyProfileCard when userdata is available', () => {
		const myProfile = wrapper.find('[data-test="myprofile"]')
		expect(myProfile.exists()).toBe(true)
	})

	it('ArticleSavedCard exists', () => {
		const articleSavedCard = wrapper.findComponent(ArticleSavedCard)
		expect(articleSavedCard.exists()).toBe(true)
	})

	it('Following exists', () => {
		const following = wrapper.findComponent(Following)
		expect(following.exists()).toBe(true)
	})
	it('should render username of who I am following', async () => {
		console.log(wrapper.html())

		expect(wrapper.text()).toContain("michael90")
	})

	test("renders my profile information (username, firstname, lastname)",
		() => {

			expect(wrapper.text()).toContain("iamperson")
			expect(wrapper.text()).toContain("iamfirstname")
			expect(wrapper.text()).toContain("iamlastname")

		})
	test("renders the amount of posts saved", () => {
		expect(wrapper.text()).toContain("192")
	}),

		test("renders my saved posts", () => {
			expect(wrapper.text()).toContain("saved1guy")
			expect(wrapper.text()).toContain("saved1testtitle")

			expect(wrapper.text()).toContain("saved2guy")
			expect(wrapper.text()).toContain("saved2testtitle")

		})

		test('Should call the function to redirect to the post page', async () => {
		  const button = wrapper.find("[data-test='redirect_to_author']")

		  expect(button.exists()).toBe(true)

		  button.trigger("click")

		  await wrapper.vm.$nextTick()

		  // I have no way to assert whether the function has called or not
			
		
		})
})
