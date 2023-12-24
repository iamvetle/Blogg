import UserFullName from './UserFullName.vue';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';


let wrapper: any;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

let firstNameProp = "test_first_name"
let lastNameProp = "test_last_name"

const factory = () => {
    return shallowMount(UserFullName, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {
                Name: true
            },
        },
        props: {
            first_name: firstNameProp,
            last_name: lastNameProp
        },
        slots: {}
    })
};

describe('Testing the userfullname component that is used inside of the id user page', () => {

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
    test('Should have h2 element', () => {
        wrapper = factory()

        expect(wrapper.find("h2").exists()).toBe(true)
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

        const targetElement = wrapper.find("[data-test='user-full-name']")
        expect(targetElement.text()).toBe(`${firstProp} ${lastProp}`)
    })
    test('Should match snapshot', () => {
        wrapper = factory()

        expect(wrapper.html()).toMatchSnapshot()
    })

});