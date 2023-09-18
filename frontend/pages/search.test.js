import search from '~/pages/search.vue'
import { mount } from '@vue/test-utils'

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

    describe("testing search page", () => {
        
        wrapper = mount(search)

        test("exists", () => {

            expect(wrapper.exists()).toBe(true)            
        })

        test("has a search bar", () => {

            console.log(wrapper.html())
            expect(wrapper.find('input[name="text"][id="search_bar"]').exists()).toBe(true)
        })

        test("has submit search buttin", () => {
            expect(wrapper.find('button[id="search_button"]').exists()).toBe(true);         
        })
        
        test("search variable is defined", () => {
            expect(wrapper.vm.search_input).toBeDefined();
        })

        test("search function exists", () => {
            expect(typeof wrapper.vm.trySearch).toBe('function')
        })

        test("results is passed as prop to child component", async () => {
            
            wrapper.vm.results = {
                result1:"result 1",
                result2:"result 2",
            }

            await nextTick()

            console.log(wrapper.html())
            expect(wrapper.html()).toContain("result 1")
            expect(wrapper.html()).toContain("result 2")

        })
    })
}