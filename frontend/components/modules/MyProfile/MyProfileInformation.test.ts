import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import MyProfileInformation from './MyProfileInformation.vue';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePostStore } from '~/store/postStore';

let wrapper: VueWrapper
let loggedInUserStore:any;
let pinia;
let postStore:any;

describe('Testing the component with myprofileinformation', () => {

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

        wrapper = shallowMount(MyProfileInformation, {
            global: {
                plugins: [pinia],
                stubs:{
                    Follower:true,
                    MyProfilePostsList:true,
                    "nuxt-link":true
                },
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
            email: "test@example.com",
            address: "Someaddress 7, 4713 City, Country",
            date_of_birth:"01-05-2008",
            gender:"male",
            phone_number:"12375932",
            date_joined:"06-02-2015",
            num_of_saved_posts:9172,
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

        expect(wrapper.text()).toContain("test@example.com") // email
        expect(wrapper.text()).toContain("male") // gender
        expect(wrapper.text()).toContain("01-05-2008") //  date_of_birth
        expect(wrapper.text()).toContain("06-02-2015") // date_joined
        expect(wrapper.text()).toContain("Someaddress 7, 4713 City, Country") // address
        expect(wrapper.text()).toContain(9172) // num_of_saved_posts
    })

    test('Should not render anything if there are no data from the fetches', () => {
        const something = wrapper.find("p")
        
        expect(something.exists()).toBe(false)
    })

    test("Should change the text about followers after the amount", async () => {
        loggedInUserStore.loggedInUserProfile = {
            email: "test@example.com",
            address: "Someaddress 7, 4713 City, Country",
            date_of_birth:"01-05-2008",
            gender:"male",
            phone_number:"12375932",
            date_joined:"06-02-2015",
            num_of_saved_posts:987,
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

    })
})