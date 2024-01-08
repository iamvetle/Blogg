import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import BaseTag from '~/components/base/BaseTag.vue'

let mockTextProp = "TestTag1Name"
let mockClassProp = "flex article someting tag"

describe('_blank testing', () => {
    let wrapper:VueWrapper;
    let store:any;
    let pinia:any;

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)
        wrapper = mount(BaseTag, {
            global: {
                plugins: [pinia],
            },
            props: {
                text: mockTextProp,
                class: mockClassProp,
            }
        })
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it("Should render the prop", () => {
        expect(wrapper.text()).toBe(mockTextProp)
    })
    test('Should have the class prop', () => {
        expect(wrapper.attributes("class")).toBe(mockClassProp)   
    })
})