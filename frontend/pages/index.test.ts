import { createTestingPinia } from "@pinia/testing"
import { VueWrapper, shallowMount, flushPromises } from '@vue/test-utils';
import index from "~/pages/index.vue"
import { useGeneralStore } from '~/store/generalStore';
import ListArticles from '~/components/modules/Blogg/ListArticles.vue';
import BaseDropdownMenu from "~/components/base/BaseDropdownMenu.vue";
import { FilterBox } from '#components';

describe('index page testing', () => { 
    let wrapper: VueWrapper
    let store: any

    beforeEach(() => {
        vi.stubGlobal("setPageLayout", () => {
            return null
        })

        const pinia = createTestingPinia()
        store = useGeneralStore(pinia)
        store.isAuthenticated = true
        store.idArrayOfSavedPosts = true
        store.posts = true
        store.personalUser = true
        wrapper = shallowMount(index, {
            global: {
                plugins: [pinia],
                components: {
                    ListArticles,
                    BaseDropdownMenu,
                    FilterBox
                },
                stubs: { 'Wait': true, 'FilterTool': true, 'ListArticlesSidebar': true }
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
        console.log(store.isAuthenticated)  // Should print true
        console.log(wrapper.html())  // Should show the rendered HTML

        let listarticles = wrapper.findComponent({ name: 'ListArticles' })

        expect(listarticles.exists()).toBe(true)

        store.isAuthenticated = false

        await wrapper.vm.$nextTick()

        listarticles = wrapper.findComponent({ name: 'ListArticles' })
        expect(listarticles.exists()).toBe(false)
    });

    test("base-dropdown-menu is being rendered", async () => {
        await wrapper.vm.$nextTick()

        let basedropmenu = wrapper.findComponent({ name: 'BaseDropdownMenu' })
        expect(basedropmenu.exists()).toBe(true)
    })
    test("the wait component is being rendered correctly conditentially", async () => {
        store.isAuthenticated = false
        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent({ name: 'Wait' }).exists()).toBe(true)

        store.isAuthenticated = true
        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent({ name: 'Wait' }).exists()).toBe(false)
    })
    test('content not rendered if no posts and personal user is being retrieved', async () => {
        store.posts = false
        store.personalUser = false

        await flushPromises()
        await wrapper.vm.$nextTick()


        const element = wrapper.find("[date-test='filter-tool']")

        expect(element.exists()).toBe(false)

    })
})
