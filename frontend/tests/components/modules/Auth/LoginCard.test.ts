import LoginCard from '~/components/modules/Auth/LoginCard.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

let wrapper: any;

const factory = () => {
    return shallowMount(LoginCard, {
        global: {
            plugins: [],
            components: {
            },
            mocks: {},
            stubs: {
                NuxtLink: true
            },
        },
        props: {},
        slots: {}
    })
};

describe('Testing the logincard component', () => {

    beforeEach(() => {
        // generalStore = useGeneralStore(pinia); 
        // postStore = usePostStore(pinia); 
        // loggedInUserStore = useLoggedInUserStore(pinia); 
        // paginationStore = usePaginationStore(pinia); 

    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });
    test('Should exist', () => {
        wrapper = factory()

        console.log(wrapper.html())

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
    test('Should have a email field', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_email']")
        expect(field.exists()).toBe(true)

        const formkitField = field.find("formkit")
        expect(formkitField.exists()).toBe(true)
        expect(formkitField.attributes("type")).toBe("email")
    })
    test('Should have a phone number field', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_phone_number']")
        expect(field.exists()).toBe(true)

        const formkitField = field.find("formkit")
        expect(formkitField.exists()).toBe(true)
        expect(formkitField.attributes("type")).toBe("tel")
    })
    test('Should have a birth data number field', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_birth_date']")
        expect(field.exists()).toBe(true)

        const formkitField = field.find("formkit")
        expect(formkitField.exists()).toBe(true)

        expect(formkitField.attributes("type")).toBe("date")
    })
    test('There should be an "address" group wrapper', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_address_group']")
        expect(field.exists()).toBe(true)

        const formPost = field.find("[data-test='form_postal_code']")

        const kitCode = formPost.find("formkit")
        expect(kitCode.exists()).toBe(true)

        expect(kitCode.attributes("type")).toBe("text")

        const formCountry = field.find("[data-test='form_country']")

        const kitCountry = formCountry.find("formkit")
        expect(kitCountry.exists()).toBe(true)

        expect(kitCountry.attributes("type")).toBe("text")

    })
    test('Should have a gender number field', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_gender']")
        expect(field.exists()).toBe(true)

        const formkitField = field.find("formkit")
        expect(formkitField.exists()).toBe(true)
        expect(formkitField.attributes("type")).toBe("select")
    })
    test('There should be an "name" wrapper', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_full_name']")
        expect(field.exists()).toBe(true)

        const formKitFieldOne = field.find("[data-test='form_first_name']")
        const firstName = formKitFieldOne.find("formkit")
        expect(firstName.exists()).toBe(true)

        expect(firstName.attributes("type")).toBe("text")

        const formKitFieldTwo = field.find("[data-test='form_last_name']")
        const lastName = formKitFieldTwo.find("formkit")
        expect(lastName.exists()).toBe(true)

        expect(lastName.attributes("type")).toBe("text")


    })
    test('Should have a submit button to the form', () => {
        wrapper = factory()

        const buttonWrap = wrapper.find("[data-test='form_button_submit']")
        expect(buttonWrap.exists()).toBe(true)

        const kitButton = buttonWrap.find("formkit")
        expect(kitButton.exists()).toBe(true)

        expect(kitButton.attributes("type")).toBe("submit")
      
    })

});