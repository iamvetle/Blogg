import { createTestingPinia } from '@pinia/testing';
import FilterDropdownTags from './FilterDropdownTags.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

let wrapper: any;
let postStore: any
let pinia: any = createTestingPinia

const factory = () => {
    return shallowMount(FilterDropdownTags, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {},
        slots: {}
    })
};

describe('Testing component', () => {


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
    
});