import { VueWrapper, mount } from "@vue/test-utils";

import ListArticlesSidebar from "~/components/modules/Blogg/ListArticlesSidebar.vue";
import MyProfileCard from "~/components/modules/MyUser/MyProfileCard.vue";
import ArticleSavedCard from "~/components/modules/MyUser/ArticleSavedCard.vue";
import Following from "~/components/modules/MyUser/Following.vue";

// Mock fetchPersonalUser function
const mockFetchPersonalUser = async (url: string) => {
  return { data: 'mockedData' }
}

describe('ListArticlesSidebar testing', () => {

  let wrapper:VueWrapper

  beforeAll(async () => {
    // Mock the fetchPersonalUser function
    const userdata = ref<object | null>(null)
    userdata.value = await mockFetchPersonalUser('http://localhost:8888/api/min-side/')
    
    wrapper = mount(ListArticlesSidebar, {
      global: {
        components: { MyProfileCard, ArticleSavedCard, Following },
        mocks: { fetchPersonalUser: mockFetchPersonalUser, userdata }
      }
    })
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

  it('renders ArticleSavedCard', () => {
    const articleSavedCard = wrapper.findComponent(ArticleSavedCard)
    expect(articleSavedCard.exists()).toBe(true)
  })

  it('renders Following', () => {
    const following = wrapper.findComponent(Following)
    expect(following.exists()).toBe(true)
  })
})
