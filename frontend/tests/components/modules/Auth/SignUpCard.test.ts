import SignUpCard from '~/components/modules/Auth/SignUpCard.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

let wrapper: any;

const factory = () => {
    return shallowMount(SignUpCard, {
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
    // username
    test('Should have an username field', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_username']")
        expect(field.exists()).toBe(true)

        const formkitField = field.find("formkit")
        expect(formkitField.exists()).toBe(true)
        expect(formkitField.attributes("type")).toBe("text")
        expect(formkitField.attributes("name")).toBe("username")

    })
    // email
    test('Should have an email field', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_email']")
        expect(field.exists()).toBe(true)

        const formkitField = field.find("formkit")
        expect(formkitField.exists()).toBe(true)
        expect(formkitField.attributes("type")).toBe("email")
        expect(formkitField.attributes("name")).toBe("email")

    })
    // password
    test('Should have wrapper around the password set and password confirm that has the correct typpes', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_password']")
        expect(field.exists()).toBe(true)

        const formKitFieldOne = field.find("[data-test='form_password_set']")

        expect(formKitFieldOne.exists()).toBe(true)
        expect(formKitFieldOne.attributes("type")).toBe("password")
        expect(formKitFieldOne.attributes("name")).toBe("password")

        const formKitFieldTwo = field.find("[data-test='form_password_confirm']")

        expect(formKitFieldTwo.exists()).toBe(true)
        expect(formKitFieldTwo.attributes("type")).toBe("password")
        expect(formKitFieldTwo.attributes("name")).toBe("password_confirm")

    })
    // phone_number
    test('Should have a phone number field', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_phone_number']")
        expect(field.exists()).toBe(true)

        const formkitField = field.find("formkit")
        expect(formkitField.exists()).toBe(true)
        expect(formkitField.attributes("type")).toBe("tel")
        expect(formkitField.attributes("name")).toBe("phone_number")
    })
    // date_of_birth
    test('Should have a birth data number field', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_birth_date']")
        expect(field.exists()).toBe(true)

        const formkitField = field.find("formkit")
        expect(formkitField.exists()).toBe(true)

        expect(formkitField.attributes("type")).toBe("date")
        expect(formkitField.attributes("name")).toBe("date_of_birth")

    })
    // gender
    test('Should have a gender number field', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_gender']")
        expect(field.exists()).toBe(true)

        const formkitField = field.find("formkit")
        expect(formkitField.exists()).toBe(true)
        expect(formkitField.attributes("type")).toBe("select")
        expect(formkitField.attributes("name")).toBe("gender")

    })
    // first_name and last_name
    test('There should be an "name" wrapper', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_full_name']")
        expect(field.exists()).toBe(true)

        const formKitFieldOne = field.find("[data-test='form_first_name']")
        const firstName = formKitFieldOne.find("formkit")
        expect(firstName.exists()).toBe(true)

        expect(firstName.attributes("type")).toBe("text")
        expect(firstName.attributes("name")).toBe("first_name")


        const formKitFieldTwo = field.find("[data-test='form_last_name']")
        const lastName = formKitFieldTwo.find("formkit")
        expect(lastName.exists()).toBe(true)

        expect(lastName.attributes("type")).toBe("text")
        expect(lastName.attributes("name")).toBe("last_name")


    })
    test('Should have a submit button to the form', () => {
        wrapper = factory()

        const buttonWrap = wrapper.find("[data-test='form_button_submit']")
        expect(buttonWrap.exists()).toBe(true)

        const kitButton = buttonWrap.find("formkit")
        expect(kitButton.exists()).toBe(true)

        expect(kitButton.attributes("type")).toBe("submit")
    })
    // address
    test('Should have a address field', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_address']")
        expect(field.exists()).toBe(true)

        const formkitField = field.find("formkit")
        expect(formkitField.exists()).toBe(true)
        expect(formkitField.attributes("type")).toBe("text")
        expect(formkitField.attributes("name")).toBe("address")

    })
    // country
    test('Should have a country field', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_country']")
        expect(field.exists()).toBe(true)

        const formkitField = field.find("formkit")
        expect(formkitField.exists()).toBe(true)
        expect(formkitField.attributes("type")).toBe("text")
        expect(formkitField.attributes("name")).toBe("country")
    })
    // postal_code
    test('Should have a postal code field', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_postal_code']")
        expect(field.exists()).toBe(true)

        const formkitField = field.find("formkit")
        expect(formkitField.exists()).toBe(true)
        expect(formkitField.attributes("type")).toBe("text")
        expect(formkitField.attributes("name")).toBe("postal_code")

    })
    // city
    test('Should have a city field', () => {
        wrapper = factory()

        const field = wrapper.find("[data-test='form_city']")
        expect(field.exists()).toBe(true)

        const formkitField = field.find("formkit")
        expect(formkitField.exists()).toBe(true)
        expect(formkitField.attributes("type")).toBe("text")
        expect(formkitField.attributes("name")).toBe("city")

    })
    test('Should match snapshot', () => {
      wrapper = factory()

      expect(wrapper.exists()).toBe(true)
    })

});