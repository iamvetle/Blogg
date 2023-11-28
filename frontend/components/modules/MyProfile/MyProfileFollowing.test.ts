import MyProfileFollowing from './MyProfileFollowing.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useLoggedInUserStore } from '~/store/loggedInUserStore';

import Following from '~/components/UI/Following.vue';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
let loggedInUserStore;
// let paginationStore; 

const factory = () => {
    return shallowMount(MyProfileFollowing, {
        global: {
            plugins: [pinia],
            components: {
                Following
            },
            mocks: {},
        },
        props: {},
        slots: {}
    })
};

describe('Testing the MyProfileFollowing component (since myprofile - doesnt take props. note: just straight loggedinuser sore.', () => {

    beforeEach(() => {
        loggedInUserStore = useLoggedInUserStore(pinia);
        loggedInUserStore.idArrayOfLoggedInUserFollowingUsers = [
            "michael",
            "james",
            "bob"
        ]

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
    test('Should have the following  and it should be rendered as many times as the number of users in the array', () => {
        wrapper = factory()

        const followingComponent = wrapper.findAllComponents({ name: "Following" })

        expect(followingComponent.length).toBe(3)
    })
    test('Should match snapshot', () => {
        wrapper = factory()
        expect(wrapper).toMatchSnapshot()
    })


});