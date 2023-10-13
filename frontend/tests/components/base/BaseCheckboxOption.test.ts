import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'
import BaseCheckboxOption from '~/components/base/BaseCheckboxOption.vue'

describe('basecheckboxoption base comp testing', () => {
    let wrapper:VueWrapper;
    let store;
    let pinia;

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)
        wrapper = mount(BaseCheckboxOption, {
            global: {
                plugins: [pinia],
            },
            props: {
                value:"option",
                titleOption:"testtitle",
                type:"checkbox",
                modelValue:true
            }
        })
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('input element is there', () => {
        const inputElement = wrapper.find('input')
        expect(inputElement.exists()).toBe(true) 
    })
    test('has a prop that passes the value to the checkbox', ()  => {
        console.log(wrapper.html())
        const inputElement = wrapper.find('input')

        expect(inputElement.attributes('value')).toBe('option')
    })
    test('has title associated', () => {
        expect(wrapper.html()).toContain("testtitle")
    })
})