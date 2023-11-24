import InputFile from './InputFile.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

let wrapper: any;

let inputClassProp = "inputclass something"
let classProp = "labelclass something"
let labelProp = "labellabelsomething"

const factory = () => {
    return shallowMount(InputFile, {
        global: {
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {
            inputClass: inputClassProp,
            class: classProp,
            label: labelProp
        }
    })
};

describe('Testing the input file component', () => {

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
    test('Should render the label prop', () => {
        wrapper = factory()

        expect(wrapper.html()).toContain(labelProp)
    })
    test('Should have the inputClass prop', () => {
        wrapper = factory()

        expect(wrapper.props("inputClass")).toBeTruthy()
    })
    test('Should have the class prop', () => {
        wrapper = factory()

        expect(wrapper.props("class")).toBeTruthy()
    })

    test("Should render the input element", () => {
        wrapper = factory()
        const input = wrapper.find("input[data-test='input-file-element']")
        expect(input.exists()).toBe(true)
    })
    test("Should have a label element that contains the input element", () => {
        wrapper = factory()
        const label = wrapper.find("label")

        expect(label.exists()).toBe(true)
        
        const input = wrapper.find("input[data-test='input-file-element']")

        expect(input.exists()).toBe(true)
    })
    test('There should be a handleFileChange function', () => {
        wrapper = factory()

        const handleChangeFunction = wrapper.vm.handleFileChange
        expect(handleChangeFunction).toBeDefined()
    })
    test('Should have a filechange emit', () => {
        wrapper = factory()
        wrapper.vm.$emit("fileChange")

        expect(wrapper.emitted()).toHaveProperty("fileChange")
    })
    test("The input element should have the file type", () => {
        wrapper = factory()
        const input = wrapper.find("input[data-test='input-file-element']")
        expect(input.exists()).toBe(true)

        expect(input.attributes("type")).toBe("file")
        // expect(button.attributes("id")).toBe(atr2)
    })

    test("The label element should have the for attribute set correctly", () => {
        wrapper = factory()
        const label = wrapper.find("label")
        expect(label.exists()).toBe(true)

        const input = wrapper.find("input[data-test='input-file-element']")

        const inputName = input.attributes("id")

        expect(inputName).toBeTruthy()

        expect(label.attributes("for")).toBe(inputName)
        // expect(button.attributes("id")).toBe(atr2)
    })

});