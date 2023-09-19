import search from '~/pages/search.vue'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useSearchStore } from '~/store/searchStore'

if (import.meta.vitest) {

vi.stubGlobal("useRoute", () => {
    return null
})
vi.stubGlobal("useRouter", () => {
    return null
})
vi.stubGlobal("trySearch", () => {
    return null
})
vi.stubGlobal("onMounted", () => {
    return null
})

let wrapper
let store
let pinia

    describe("testing search page", () => {

        pinia = createTestingPinia()
        store = useSearchStore(pinia)
        store.lastSearch = "test"
        
        // store.searchPosts = {
        //     results: {
        //         {content:"testresult 1"},
        //         {content:"testresult 2"}
        //     },
        // }

        wrapper = mount(search, {
            global: {
                plugins:[pinia]
            }
        })

        test("exists", () => {

            expect(wrapper.exists()).toBe(true)            
        })

    //     test("has a search bar", () => {

    //         console.log(wrapper.html())
    //         expect(wrapper.find('input[name="text"][id="search_bar"]').exists()).toBe(true)
    //     })

    //     test("has submit search buttin", () => {
    //         expect(wrapper.find('button[id="search_button"]').exists()).toBe(true);         
    //     })
        
    //     test("search variable is defined", () => {
    //         expect(wrapper.vm.search_input).toBeDefined();
    //     })

    //     test("search function exists", () => {
    //         expect(typeof wrapper.vm.trySearch).toBe('function')
    //     })

    //     test("results is passed as prop to child component", async () => {
    //         wrapper.unmount();

    //         wrapper = mount(search, {
    //             global: {
    //                 plugins:[pinia]
    //             }
    //         })

    //         await nextTick()

    //         console.log(wrapper.html())
    //         expect(wrapper.html()).toContain("result 1")
    //         expect(wrapper.html()).toContain("result 2")

    //     })
    // })
})}