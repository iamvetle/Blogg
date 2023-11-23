import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import minkonto from '~/pages/minkonto.vue'
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePostStore } from '~/store/postStore';
import BaseImage from '~/components/base/BaseImage.vue';
import MyProfileBio from '~/components/modules/MyProfile/MyProfileBio.vue';
import MyProfilePostsList from '~/components/modules/MyProfile/MyProfilePostsList.vue';
import MyProfileInformation from '~/components/modules/MyProfile/MyProfileInformation.vue';
import Following from '~/components/UI/Following.vue';
import MyProfileName from '~/components/modules/MyProfile/MyProfileName.vue';
import MyProfileUsername from '~/components/modules/MyProfile/MyProfileUsername.vue';

import MyProfileNumOfFollowers from '~/components/modules/MyProfile/MyProfileNumOfFollowers.vue';
import MyProfilePicture from '~/components/modules/MyProfile/MyProfilePicture.vue';
import MyProfileFollowing from '~/components/modules/MyProfile/MyProfileFollowing.vue';

let wrapper: VueWrapper
let loggedInUserStore: any;
let pinia;
let postStore: any;

let inputImageName = "image_file"

const standardLoggedInProfile = {
    id: 3,
    username: "test32",
    first_name: "Test",
    last_name: "Testanson",
    num_of_followers: 1,
    num_of_following: 54321,
    bio: "This is a bio of a testuser",
    profile_picture: "~/path/to/something/image.png",
};

const standardLoggedInUserPosts = {
    id: 17,
    title: "This is a title that is made by bob",
    author: {
        username: "bob",
        first_name: "Bob",
        last_name: "Smith",
    },
    content_snippet: "Lorem ipsum...",
    date_published: "08-12-2021",
}

describe('Testing the page minkonto', () => {

    beforeEach(async () => {
        vi.stubGlobal("definePageMeta", () => {
            return true
        })

        vi.stubGlobal("getLoggedInUserProfile", () => {
            return true
        })

        vi.stubGlobal("getSnippetPostAllLoggedInUser", () => {
            return true
        })

        pinia = createTestingPinia();
        loggedInUserStore = useLoggedInUserStore(pinia);
        postStore = usePostStore(pinia);

        wrapper = mount(minkonto, {
            global: {
                plugins: [pinia],
                stubs: {
                    Follower: true,
                    MyProfilePostsList: true,
                    "nuxt-link": true,
                    MyProfilePicture: true,
                    MyProfileBio: true,
                    MyProfileInformation: true,
                    Following: true,
                    PostSavedCardList: true,
                    MyProfileUsername: true,
                    MyProfileName: true,
                    MyProfileNumOfFollowers: true,
                    MyProfileFollowing: true
                },
                components: {
                    BaseImage,
                    MyProfileBio,
                    MyProfilePostsList,
                    MyProfileInformation,
                    Following,
                    MyProfileName,
                    MyProfileUsername,
                    MyProfileNumOfFollowers,
                    MyProfilePicture,
                    MyProfileFollowing
                }
            }
        })

        await wrapper.vm.$nextTick()
    })

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })

    test('the page exists', () => {
        expect(wrapper.exists()).toBe(true)

    })

    test('Should not render anything if there are no data from the fetches', () => {
        const something = wrapper.find("p")

        expect(something.exists()).toBe(false)
    })

    test('Should have myprofilepicture component', async () => {
        postStore.loggedInUserPosts = standardLoggedInUserPosts
        loggedInUserStore.loggedInUserProfile = standardLoggedInProfile
        await wrapper.vm.$nextTick()



        const myprofilepicture = wrapper.findComponent({ name: "MyProfilePicture" })

        expect(myprofilepicture.exists()).toBe(true)


    })

    test('Should have the MyProfileName component', async () => {
        postStore.loggedInUserPosts = standardLoggedInUserPosts
        loggedInUserStore.loggedInUserProfile = standardLoggedInProfile

        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent({ name: "MyProfileName" }).exists()).toBe(true)
    })
    test('Should have the MyProfileUsername component', async () => {
        postStore.loggedInUserPosts = standardLoggedInUserPosts
        loggedInUserStore.loggedInUserProfile = standardLoggedInProfile

        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent({ name: "MyProfileUsername" }).exists()).toBe(true)

    })
    test('Should have the myprofilenumoffollwers component', async () => {
        postStore.loggedInUserPosts = standardLoggedInUserPosts
        loggedInUserStore.loggedInUserProfile = standardLoggedInProfile

        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent({ name: "MyProfileNumOfFollowers" }).exists()).toBe(true)

    })
    test('Should have the myprofilefollowing component', async () => {
        postStore.loggedInUserPosts = standardLoggedInUserPosts
        loggedInUserStore.loggedInUserProfile = standardLoggedInProfile

        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent({ name: "MyProfileFollowing" }).exists()).toBe(true)

    })
    test('Should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

})