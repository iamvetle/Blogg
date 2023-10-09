import { VueWrapper, mount } from "@vue/test-utils";

import ListArticlesSidebar from "~/components/modules/Blogg/ListArticlesSidebar.vue";
import MyProfileCard from "~/components/modules/MyUser/MyProfileCard.vue";
import ArticleSavedCard from "~/components/modules/MyUser/ArticleSavedCard.vue";
import Following from "~/components/modules/MyUser/Following.vue";
import { createTestingPinia } from '@pinia/testing';
import { useGeneralStore } from "~/store/generalStore";

let wrapper: VueWrapper
let store
let pinia

describe('ListArticlesSidebar testing', () => {

beforeAll(async () => {

	pinia = createTestingPinia()
	store = useGeneralStore(pinia)


	// Mock the fetchPersonalUser function
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
		"user": {
			"username": "saved1guy",
			"first_name": "saved1guyfirstname",
			"last_name": "saved1guylastname",
		},
		"post": {
			"title":" saved1testtitle"
		}
		},
		{
		"user": {
			"username": "saved2guy",
			"first_name": "saved2guyfirstname",
			"last_name": "saved2guylastname",
		},
		"post": {
			"title":" saved2testtitle"
		}
		}
	],
	"num_of_saved_posts": 192
	};

	const full_name = ref("iamfirstname iamlastname")


	wrapper = mount(ListArticlesSidebar, {
	global: {
		components: { MyProfileCard, ArticleSavedCard, Following },
		mocks: { full_name },
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
	await wrapper.vm.$nextTick()

	expect(wrapper.text()).toContain("michael90")
})

test("renders my profile information (username, firstname, lastname)", 
async () => {
	await wrapper.vm.$nextTick()

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
})
