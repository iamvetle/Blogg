import CommentAdd from './CommentAdd.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

let wrapper: any;

const factory = () => {
    return shallowMount(CommentAdd, {
        global: {
            plugins: [],
            components: {},
            mocks: {},
            stubs: {
                InputTextarea:true
            },
        },
        props: {},
        slots: {}
    })
};

describe('Testing the component that adds a commponet', () => {

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

    test('Should match snapshot', () => {

        wrapper = factory()
        expect(wrapper).toMatchSnapshot()
    })
});