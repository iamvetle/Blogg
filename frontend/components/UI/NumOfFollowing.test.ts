import NumOfFollowing from './NumOfFollowing.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';


let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

const customNumOfFollowingProp = 81243

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(NumOfFollowing, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        slots: {}
    })
};

describe('Testing if the NumofFollowing component is rendering and receiving props correctly', () => {

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
    test('It should have the num_of_following prop be 0 if no value is given', () => {
        wrapper = factory()

        expect(wrapper.props("num_of_following")).toBe(0)
    })
    test('Should be able to pass a custom num of following down', async () => {
        wrapper = factory()
        await wrapper.setProps({ num_of_following: customNumOfFollowingProp })
        expect(wrapper.props("num_of_following")).toBe(customNumOfFollowingProp)
        expect(wrapper.text()).toContain(customNumOfFollowingProp)

    })
    test('If there is only ONE following the text should be singular - "following"', async () => {
        wrapper = factory()
        await wrapper.setProps({ num_of_following: 1 })
        expect(wrapper.props("num_of_following")).toBe(1)

        const textPlace = wrapper.find("[data-test='num_of_following']")
        expect(textPlace.text()).toBe("1 following")
    })
    test('Should render the text "following"', async () => {
        wrapper = factory()
        await wrapper.setProps({ num_of_following: customNumOfFollowingProp })
        expect(wrapper.props("num_of_following")).toBe(customNumOfFollowingProp)
       
        const textPlace = wrapper.find("[data-test='num_of_following']")
        expect(textPlace.text()).toBe(`${customNumOfFollowingProp} following`)
    })

});