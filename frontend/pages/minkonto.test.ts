import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import minkonto from '~/pages/minkonto.vue'
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePostStore } from '~/store/postStore';
import BaseImage from '~/components/base/BaseImage.vue';
import MyProfileBio from '~/components/modules/MyProfile/MyProfileBio.vue';
import MyProfilePostsList from '~/components/modules/MyProfile/MyProfilePostsList.vue';
import MyProfileInformation from '~/components/modules/MyProfile/MyProfileInformation.vue';
import Following from '~/components/UI/Following.vue';

let wrapper: VueWrapper
let loggedInUserStore: any;
let pinia;
let postStore: any;

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

        wrapper = shallowMount(minkonto, {
            global: {
                plugins: [pinia],
                stubs: {
                    Follower: true,
                    MyProfilePostsList: true,
                    "nuxt-link": true,
                    BaseImage:true,
                    MyProfileBio:true,
                    MyProfileInformation:true,
                    Following:true
                },
                components: {
                    BaseImage,
                    MyProfileBio,
                    MyProfilePostsList,
                    MyProfileInformation,
                    Following
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
    test('Should render all of the logged in user information correctly', async () => {

        loggedInUserStore.loggedInUserProfile = {
            id: 3,
            username: "test32",
            first_name: "Test",
            last_name: "Testanson",
            num_of_followers: 9876,
            num_of_following: 54321,
            bio: "This is a bio of a testuser",
            profile_picture: "~/path/to/something/image.png",
        };
        postStore.loggedInUserPosts = {
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

        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain("test32") // username
        expect(wrapper.text()).toContain("Test") // first_name
        expect(wrapper.text()).toContain("Testanson") // last_name
        expect(wrapper.text()).toContain(9876) //  num_of_followers
        expect(wrapper.text()).toContain(54321) // num_of_following'

        expect(wrapper.text()).toContain("9876 followers")
        expect(wrapper.text()).toContain("You are following")
    })

    test('Should not render anything if there are no data from the fetches', () => {
        const something = wrapper.find("p")

        expect(something.exists()).toBe(false)
    })

    test("Should change the text about followers after the amount", async () => {
        loggedInUserStore.loggedInUserProfile = {
            id: 3,
            username: "test32",
            first_name: "Test",
            last_name: "Testanson",
            num_of_followers: 1,
            num_of_following: 54321,
            profile_picture: "~/path/to/something/image.png",
        };
        postStore.loggedInUserPosts = {
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

        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain("1 follower")
        expect(wrapper.text()).not.toContain("followers")
    })

    test('Placeholder image should be displayed if the logged in user doesnt have a personal profile picture', async () => {
        postStore.loggedInUserPosts = {
            id: 17,
        }

        loggedInUserStore.loggedInUserProfile = {
            id: 26
        }

            ; (wrapper.vm as any).placeholder = "~/placeholder/image.jpg"

        await wrapper.vm.$nextTick()

        let profile_image = wrapper.get("#profile_picture")

        expect(profile_image.attributes("src")).toBe("~/placeholder/image.jpg")
    })
    test('Should have baseimage component', async () => {

        loggedInUserStore.loggedInUserProfile = {
            id: 3,
            username: "test32",
            first_name: "Test",
            last_name: "Testanson",
            num_of_followers: 9876,
            num_of_following: 54321,
            bio: "This is a bio of a testuser",
            profile_picture: "~/path/to/something/image.png",
        };
        postStore.loggedInUserPosts = {
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

        await wrapper.vm.$nextTick()

        const baseImage = wrapper.findComponent({ name:"BaseImage" })

        expect(baseImage.exists()).toBe(true)


    })
    test('Should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
})