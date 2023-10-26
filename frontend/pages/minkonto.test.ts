import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import minkonto from '~/pages/minkonto.vue'
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePostStore } from '~/store/postStore';

let wrapper: VueWrapper
let loggedInUserStore:any;
let pinia;
let postStore:any;

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
                stubs:{
                    Follower:true,
                    ListMyPosts:true,
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
            id: 3,
            email: "test@example.com",
            username: "test32",
            first_name: "Test",
            last_name: "Testanson",
            age: 24,
            address: "Someaddress 7, 4713 City, Country",
            nickname: "Tt",
            num_of_followers: 4,
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

        expect(wrapper.text()).toContain("test@example.com")
        expect(wrapper.text()).toContain("test32")
        expect(wrapper.text()).toContain("test")
        expect(wrapper.text()).toContain("Test")
        expect(wrapper.text()).toContain("Testanson")
        expect(wrapper.text()).toContain(24);
        expect(wrapper.text()).toContain("Someaddress 7, 4713 City, Country")
        expect(wrapper.text()).toContain("Tt")
        // expect(wrapper.text()).toContain("19-01-2021") # last_online 
        expect(wrapper.text()).toContain(4)
        expect(wrapper.text()).toContain("4 followers")
        expect(wrapper.text()).toContain("People following you")
    })

    test('Should not render anything if there are no data from the fetches', () => {
        const something = wrapper.find("p")
        
        expect(something.exists()).toBe(false)
    })

    test("Should change the text about followers after the amount", async () => {
        loggedInUserStore.loggedInUserProfile = {
            id: 3,
            email: "test@example.com",
            username: "test32",
            first_name: "Test",
            last_name: "Testanson",
            age: 24,
            address: "Someaddress 7, 4713 City, Country",
            nickname: "Tt",
            num_of_followers: 1,
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
    })
})