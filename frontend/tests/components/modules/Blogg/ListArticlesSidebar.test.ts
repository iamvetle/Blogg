import { VueWrapper, mount } from "@vue/test-utils";

import ListArticlesSidebar from "~/components/modules/Blogg/ListArticlesSidebar.vue";
import MyProfileCard from "~/components/modules/MyUser/MyProfileCard.vue";
import ArticleSavedCard from "~/components/modules/MyUser/ArticleSavedCard.vue";
import Following from "~/components/modules/MyUser/Following.vue";
import { createTestingPinia } from '@pinia/testing';
import { useGeneralStore } from "~/store/generalStore";

// Mock fetchPersonalUser function
const mockFetchPersonalUser = async (url: string) => {
  return { data: 'mockedData' }
}

let wrapper: VueWrapper
let store
let pinia

describe('ListArticlesSidebar testing', () => {

  beforeAll(async () => {

    pinia = createTestingPinia()
    store = useGeneralStore(pinia)


    // Mock the fetchPersonalUser function
    const userdata = ref({
      "id": 13,
      "email": "vetle122@gmail.com",
      "username": "iamvetle",
      "first_name": "",
      "last_name": "",
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
            "username": "iamvetle",
            "first_name": "",
            "last_name": ""
          },
          "post": 7
        }
      ],
      "num_of_saved_posts": 1
    });


    userdata.value = await mockFetchPersonalUser('http://localhost:8888/api/min-side/')

    wrapper = mount(ListArticlesSidebar, {
      global: {
        components: { MyProfileCard, ArticleSavedCard, Following },
        mocks: { fetchPersonalUser: mockFetchPersonalUser, userdata },
        plugins: [pinia]
      },
    });


    await wrapper.vm.$nextTick()
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders MyProfileCard when userdata is available', () => {
    const myProfile = wrapper.find('[data-test="myprofile"]')
    expect(myProfile.exists()).toBe(true)
  })

  it('passes userdata prop to MyProfileCard', () => {
    const myProfileCard = wrapper.findComponent(MyProfileCard)
    expect(myProfileCard.props('userProp')).toEqual({ data: 'mockedData' })
  })

  it('present ArticleSavedCard', () => {
    const articleSavedCard = wrapper.findComponent(ArticleSavedCard)
    expect(articleSavedCard.exists()).toBe(true)
  })

  it('present Following', () => {
    const following = wrapper.findComponent(Following)
    expect(following.exists()).toBe(true)
  })
  it('should render info about who I am following', async () => {
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain("michael90")


  })
})
