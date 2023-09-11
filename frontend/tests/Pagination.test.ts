import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import Pagination from '~/components/Pagination.vue'

describe("testing Pagniation component", () => {

    test("component exists", () => {
        const wrapper = mount(Pagination, {
            globals: {
                plugins: [createTestingPinia()]
            }
        })

        expect(wrapper.exists()).toBe(true)
    })

    // test("test if correct props are being given", () => {

    //     const wrapper = mount(Pagination, {
    //         globals: {
    //             props: {
    //                 total_number_of_pages: 17
                    
    //             }
    //         }
    //     })
    //     expect(wrapper.props)

    // })
})