import BaseImage from './BaseImage.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

const factory = () => {
    return shallowMount(BaseImage, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {
            src:"~/test/test.jpeg"
        },
        slots: {}
    })  
};

describe('Testing baseimage', () => {

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
    test('Should have a src prop', () => {
      expect(wrapper.props("src")).toBeTruthy()
    })
});