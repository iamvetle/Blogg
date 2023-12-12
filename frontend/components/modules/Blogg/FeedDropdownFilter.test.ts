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
                FilterDropdownTags:true
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
        wrapper = factory()

        expect(wrapper).toMatchSnapshot()
    })
    test('Should have filterdropdowntags', () => {
        wrapper = factory()

        expect(wrapper.findComponent({ name: "FilterDropdownTags" }).exists()).toBe(true)
    })


});