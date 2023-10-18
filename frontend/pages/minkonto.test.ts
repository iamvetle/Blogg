import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore';
import minkonto from '~/pages/minkonto.vue'

let wrapper: VueWrapper
let store;
let pinia;

describe('min-side page testing', () => {

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
        store = useGeneralStore(pinia);

        store.personalUser = {
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
        store.personalPosts = {
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
    test('the user information is rendering', async () => {
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
    })
})