import MyProfileNumOfFollowers from './MyProfileNumOfFollowers.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';


import NumOfFollowers from '~/components/UI/NumOfFollowers.vue';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

let loggedInUserStore;

const standardNumOfFollowers = 871321421

const factory = () => {
    return shallowMount(MyProfileNumOfFollowers, {
        global: {
            plugins: [pinia],
            components: {
                NumOfFollowers
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
            num_of_followers: 871321421
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
    test('Should have the num of followers component', () => {
      wrapper = factory()

    const numOfFollowersComp = wrapper.findComponent({ name:"NumOfFollowers" })

      expect(numOfFollowersComp.exists()).toBe(true)
    })
    test('Should render the num of followers', () => {
        wrapper = factory()
        const numOfFollowersComp = wrapper.findComponent({ name:"NumOfFollowers" })

        expect(numOfFollowersComp.html()).toContain(standardNumOfFollowers)
    })
});