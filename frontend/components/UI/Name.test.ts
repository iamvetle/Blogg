import Name from './Name.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

let wrapper: any;
let pinia: any = createTestingPinia();

let firstNameProp = "test_first_name"
let lastNameProp = "test_last_name"

const factory = () => {
    return shallowMount(Name, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {
            first_name: firstNameProp,
            last_name: lastNameProp
        },
        slots: {}
    })
};

describe('Testing the name component', () => {

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
    test('Should have two name props', () => {
        wrapper = factory()

        expect(wrapper.props("first_name")).toBeTruthy()
        expect(wrapper.props("last_name")).toBeTruthy()
    })
    test('The first name prop should be correct ', () => {
        wrapper = factory()

        expect(wrapper.props("first_name")).toBe(firstNameProp)
    })
    test('The last name prop should be correct ', () => {
        wrapper = factory()

        expect(wrapper.props("last_name")).toBe(lastNameProp)
    })
    test('Should render the props', () => {
        wrapper = factory()

        const firstProp = wrapper.props("first_name")
        const lastProp = wrapper.props("last_name")
        
        expect(wrapper.text()).toContain(firstProp)
        expect(wrapper.text()).toContain(lastProp)
    })
    test('Should render the entire name', () => {
        wrapper = factory()

        const firstProp = wrapper.props("first_name")
        const lastProp = wrapper.props("last_name")

        const targetElement = wrapper.find("[data-test='name']")
        expect(targetElement.text()).toBe(`${firstProp} ${lastProp}`)
    })
    test('Should match snapshot', () => {
      wrapper = factory()

      expect(wrapper).toMatchSnapshot()
    })
});