import NumOfFollowers from './NumOfFollowers.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';


let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

const customNumOfFollowersProp = 81243

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(NumOfFollowers, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        slots: {}
    })
};

describe('Testing if the NumofFollowers component is rendering and receiving props correctly', () => {

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
    test('It should have the num_of_followers prop be 0 if no value is given', () => {
        wrapper = factory()

        expect(wrapper.props("num_of_followers")).toBe(0)
    })
    test('Should be able to pass a custom num of followers down', async () => {
        wrapper = factory()
        await wrapper.setProps({ num_of_followers: customNumOfFollowersProp })
        expect(wrapper.props("num_of_followers")).toBe(customNumOfFollowersProp)
        expect(wrapper.text()).toContain(customNumOfFollowersProp)

    })
    test('If there is only ONE follower the text should be singular - "follower"', async () => {
        wrapper = factory()
        await wrapper.setProps({ num_of_followers: 1 })
        expect(wrapper.props("num_of_followers")).toBe(1)

        const textPlace = wrapper.find("[data-test='num_of_followers']")
        expect(textPlace.text()).toBe("1 follower")
    })
    test('If there is only ONE followers the text should be "followers"', async () => {
        wrapper = factory()
        await wrapper.setProps({ num_of_followers: 0 })
        expect(wrapper.props("num_of_followers")).toBe(0)

        const textPlace = wrapper.find("[data-test='num_of_followers']")
        expect(textPlace.text()).toBe("0 followers")
    })
    test('If there is MORE than one follower the text should be "followers"', async () => {
        wrapper = factory()
        await wrapper.setProps({ num_of_followers: customNumOfFollowersProp })
        expect(wrapper.props("num_of_followers")).toBe(customNumOfFollowersProp)
       
        const textPlace = wrapper.find("[data-test='num_of_followers']")
        expect(textPlace.text()).toBe(`${customNumOfFollowersProp} followers`)
    })

});