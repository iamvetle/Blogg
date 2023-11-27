import Username from './Username.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

const standardUsername = "testusername"

const factory = () => {
    return shallowMount(Username, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {
            username: standardUsername
        },
        slots: {}
    })
};

describe('Testing the username component', () => {

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

    test('Should have the username prop', () => {
        wrapper = factory()

        expect(wrapper.props("username")).toBeTruthy()
    })
    test('Should render the username prop', () => {
        wrapper = factory()

        expect(wrapper.text()).toContain(standardUsername)
    })
    test('Should match snapshot', () => {
        wrapper = factory()

        expect(wrapper).toMatchSnapshot()
      
    })
});