import FeedTopChoiceFollowingOptionButton from './FeedTopChoiceFollowingOptionButton.vue';          
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

let wrapper: any;

const factory = () => {
    return shallowMount(FeedTopChoiceFollowingOptionButton, {
        global: {
            plugins: [],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {
            showAsSelected:true
        },
        slots: {}
    })
};

describe('Testing the all posts feed button', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
        vi.clearAllMocks()

    });

    test('Should exist', () => {
        wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })
    test('Should have basebutton', () => {
        wrapper = factory()
        expect(wrapper.find("[data-test='following_option']").exists()).toBe(true)
        
    })
    test('Should have a selected prop', () => {
        wrapper = factory()
        expect(wrapper.props("showAsSelected")).toBeTruthy()        
    })
    test('The button should emit when clicked', async () => {
        wrapper = factory()
        const button = wrapper.find("[data-test='following_option']")
        
        await button.trigger("click")
        expect(wrapper.emitted("showFollowingPosts")).toBeTruthy()
    })
    test('The button should have the correct text', async () => {
        wrapper = factory()
        const button = wrapper.find("[data-test='following_option']")
        expect(button.attributes("text")).toBe("Following")
    })
    test('Should match snapshot', () => {
        wrapper = factory()
        expect(wrapper).toMatchSnapshot()
    })
    
    
});