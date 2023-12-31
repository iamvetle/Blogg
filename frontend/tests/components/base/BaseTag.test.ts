import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import BaseTag from '~/components/base/BaseTag.vue'

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
                text: {
                    name: "test prop"
                }
            }
        })
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it("should render prop", () => {
        expect(wrapper.text()).toContain("test prop")
    })
})