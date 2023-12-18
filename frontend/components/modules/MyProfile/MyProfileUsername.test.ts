import MyProfileUsername from './MyProfileUsername.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';


import Username from '~/components/UI/Username.vue';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

let loggedInUserStore;

const standardLoggedInUserUsername = "testusername"

const factory = () => {
    return shallowMount(MyProfileUsername, {
        global: {
            plugins: [pinia],
            components: {
                Username
            },
            mocks: {},
            stubs: {},
        },
        props: {},
        slots: {}
    })
};

describe('', () => {

    beforeEach(() => {
        loggedInUserStore = useLoggedInUserStore(pinia);
        loggedInUserStore.loggedInUserProfile = {
            username: standardLoggedInUserUsername
        }
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
    test('Should have the username component', () => {
        wrapper = factory()
        expect(wrapper.findComponent({ name: "Username" }).exists()).toBe(true)
    })
    test('Should render the username of the loggedin user', () => {
        wrapper = factory()
        expect(wrapper.html()).toContain(standardLoggedInUserUsername)
    })
});