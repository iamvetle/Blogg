import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import BaseIconMoreOptions from '~/components/base/BaseIconMoreOptions.vue';

describe('_blank testing', () => {
    let wrapper:VueWrapper
    let pinia;

    beforeEach(() => {
        pinia = createTestingPinia()
        wrapper = mount(BaseIconMoreOptions, {
            global: {
                plugins: [pinia],
            },
            props: {
                colorProp:"red",
                heightProp:"15",
                widthProp:"54",
            }
        })
    })

    test('Should exist', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('Should match snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
    
})