import FilterTool from "~/components/utils/FilterTool.vue"
import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'
import BaseCheckboxOption from '~/components/base/BaseCheckboxOption.vue';

describe('FilterTool testing', () => {
    let wrapper: VueWrapper
    let store;
    let pinia;

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)

        const categories = ref([
            {
                name: "tag1"
            },
            {
                name:"tag2"
            },
            {
                name:"tag3"
            }
        ]);

        wrapper = mount(FilterTool, {
            global: {
                plugins: [pinia],
                components: {
                    BaseCheckboxOption
                },
                mocks: {
                    categories
                }
            },
        })
        wrapper.vm.$nextTick
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('basecheckoptin exists', () => {
        expect(wrapper.findComponent({ name:"BaseCheckboxOption"}))
    } )
    test("tags are being rendered", () => {
        wrapper.vm.$nextTick


        console.log(wrapper.html())
        expect(wrapper.text()).toContain("tag1")
        expect(wrapper.text()).toContain("tag2")
        expect(wrapper.text()).toContain("tag3")
    })
})