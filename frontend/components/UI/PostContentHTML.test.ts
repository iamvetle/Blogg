import PostContentHTML from './PostContentHTML.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

const classAttr = "testClass"

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(PostContentHTML, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {
            html: "<"
        },
        slots: {},
        attrs: {
            class: classAttr
        }
    })
};

describe('Testing the Postcontenthtml component', () => {

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
    test('Component should have a "html" prop', () => {
        wrapper = factory()
        expect(wrapper.props("html")).toBeTruthy()
    })
    test('Should render the html passed by the prop', () => {
        wrapper = factory()
        const titleProp = wrapper.props("html")
        expect(wrapper.html()).toContain(titleProp)
    })
    test('Attributes ($attrs) should be on the h1 element', () => {
        wrapper = factory()
        const divHTML = wrapper.find("[data-test='html-content']")
        expect(divHTML.attributes("class")).toBe(classAttr)
    })
    test('Should match snapshot', () => {
        wrapper = factory()

        expect(wrapper).toMatchSnapshot()
    })

});