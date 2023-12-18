import MyProfileNumOfFollowing from './MyProfileNumOfFollowing.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';


import NumOfFollowing from '~/components/UI/NumOfFollowing.vue';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

let loggedInUserStore;

const standardNumOfFollowing = 871321421

const factory = () => {
    return shallowMount(MyProfileNumOfFollowing, {
        global: {
            plugins: [pinia],
            components: {
                NumOfFollowing
            },
            mocks: {},
            stubs: {},
        },
        props: {},
        slots: {}
    });
};

describe('Should render', () => {

    beforeEach(() => {
        loggedInUserStore = useLoggedInUserStore(pinia);
        loggedInUserStore.loggedInUserProfile = {
            num_of_following: 871321421
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
    test('Should have the num of following component', () => {
        wrapper = factory()

        const numOfFollowingComp = wrapper.findComponent({ name: "NumOfFollowing" })

        expect(numOfFollowingComp.exists()).toBe(true)
    })
    test('Should render the num of following', () => {
        wrapper = factory()
        const numOfFollowingComp = wrapper.findComponent({ name: "NumOfFollowing" })

        expect(numOfFollowingComp.html()).toContain(standardNumOfFollowing)
    })
});