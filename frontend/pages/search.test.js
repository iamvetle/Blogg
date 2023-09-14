import search from '~/pages/search.vue'
import { mount } from '@vue/test-utils'

if (import.meta.vitest) {

let wrapper

    

    describe("testing search page", () => {
        
        wrapper = mount(search)

        test("exists", () => {
            const wrapper = mount(search)


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

        test("click button and function works", async () => {
            
            await wrapper.find('button').trigger('click')
            
            // expect(wrapper.vm.trySearch).

        })

        test("results are displayed if there are results", async () => {
            
            wrapper.vm.results = {
                result1:"result 1",
                result2:"result 2",
            }

            await nextTick()

            expect(wrapper.text()).toContain("result 1")
            expect(wrapper.text()).toContain("result 2")

        })
    })
}