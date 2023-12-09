import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import LoginCard from '~/components/modules/Auth/LoginCard.vue';

let wrapper: any;

const factory = () => {
    return shallowMount(LoginCard, {
        global: {
            plugins: [],
            components: {},
            mocks: {},
            stubs: {
                NuxtLink:true
            },
        },
        props: {},
        slots: {}
    })
};

describe('Testin the Login card component', () => {

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
    test('Should have a username field', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_username']")
        expect(field.exists()).toBe(true)

        const formkitField = field.find("formkit")
        expect(formkitField.exists()).toBe(true)
        expect(formkitField.attributes("type")).toBe("text")
    })

    test('Should have a password field', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_password']")
        expect(field.exists()).toBe(true)

        const formkitField = field.find("formkit")
        expect(formkitField.exists()).toBe(true)
        expect(formkitField.attributes("type")).toBe("password")
    })
    test('Should have a button submit ', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_button_submit']")
        expect(field.exists()).toBe(true)

        const formkitField = field.find("formkit")
        expect(formkitField.exists()).toBe(true)
        expect(formkitField.attributes("type")).toBe("submit")
    })

});