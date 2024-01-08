import BaseImage from './BaseImage.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

let mockAltProp = "Description of testing image"
let mockSourceProp = "~/test/test.jpeg"

const factory = () => {
    return shallowMount(BaseImage, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {
            src: mockSourceProp,
            alt: mockAltProp
        },
        slots: {}
    })
};

describe('Testing BaseImage component', () => {

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
        wrapper = factory()
        expect(wrapper.props("src")).toBe(mockSourceProp)
    })
    test('Should have a alt prop', () => {
        wrapper = factory()
        expect(wrapper.props("alt")).toBe(mockAltProp)
    })
    test('Component should essentialy be an img element', () => {
        wrapper = factory()
        expect(wrapper.element.tagName).toBe("IMG")
        
    })
});