import { createTestingPinia } from "@pinia/testing"
import { VueWrapper, shallowMount, flushPromises } from '@vue/test-utils';
import index from "~/pages/index.vue";
import { useGeneralStore } from '~/store/generalStore';
import ListArticles from '~/components/modules/Blogg/ListArticles.vue';
import { useLoggedInUserStore } from '../store/loggedInUserStore';
import { usePostStore } from '../store/postStore';


describe('index page testing', () => { 
    let wrapper: VueWrapper
    let generalStore: any
    let postStore:any;
    let loggedInUserStore:any;
    let pinia:any;

    beforeEach(() => {
        vi.stubGlobal("definePageMeta", () => {
            return null
        })

        vi.stubGlobal("setPageLayout", () => {
            return null
        })



        pinia = createTestingPinia()
        generalStore = useGeneralStore(pinia)
        postStore = usePostStore(pinia)
        loggedInUserStore = useLoggedInUserStore(pinia)
        generalStore.isAuthenticated = true
        loggedInUserStore.idArrayOfSavedPosts = true
        postStore.posts = true
        loggedInUserStore.loggedInUserProfile = true
        wrapper = shallowMount(index, {
            global: {
                plugins: [pinia],
                components: {
                    ListArticles,
                },
                stubs: { 'Wait': true, FilterBox:true, 'ListArticlesSidebar': true }
            }

        })
    })

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })

    test('ListArticles component is being rendered correctly', async () => {

        // Debugging
        console.log(generalStore.isAuthenticated)  // Should print true
        console.log(wrapper.html())  // Should show the rendered HTML

        let listarticles = wrapper.findComponent({ name: 'ListArticles' })

        expect(listarticles.exists()).toBe(true)

        generalStore.isAuthenticated = false

        await wrapper.vm.$nextTick()

        listarticles = wrapper.findComponent(ListArticles)
        expect(listarticles.exists()).toBe(false)
    });

    test("the wait component is being rendered correctly conditentially", async () => {
        generalStore.isAuthenticated = false
        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent({ name: 'Wait' }).exists()).toBe(false)

        generalStore.isAuthenticated = true
        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent({ name: 'Wait' }).exists()).toBe(false)
    })
    test('content not rendered if no posts and personal user is being retrieved', async () => {
        generalStore.posts = false
        generalStore.personalUser = false

        await flushPromises()
        await wrapper.vm.$nextTick()


        const element = wrapper.find("[date-test='filter-tool']")

        expect(element.exists()).toBe(false)

    })
})
