import BaseButtonFollow from '~/components/base/BaseButtonFollow.vue';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

let loggedInUserStore:any;
let wrapper:any;
let pinia = createTestingPinia()

describe('testing basefollowbutton', () => {

    beforeEach(() => {
    loggedInUserStore = useLoggedInUserStore(pinia)


        wrapper = shallowMount(BaseButtonFollow, {
            global: {
                plugins: [pinia],
                components: {},
                mocks: {},
                stubs: {}
            },
            props: {},

        });
    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('component exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('This snapchot works?', () => {
        expect(wrapper.html()).toMatchSnapshot()      
    })
});