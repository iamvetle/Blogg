import FeedDropdownFilter from './FeedDropdownFilter.vue'
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

const factory = () => {
    return shallowMount(FeedDropdownFilter, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {
                FilterBox:true
            },
        },
        props: {},
        slots: {}
    })
};

describe('Testing FeedDropdownFilter', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('Should exist', () => {
      wrapper = factory()

      expect(wrapper.exists()).toBe(true)
    })
    test('Should match snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })


});