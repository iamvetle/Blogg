import UploadImage from './UploadImage.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

import BaseImage from '~/components/base/BaseImage.vue';

let wrapper: any;

let inputClassProp = "bg-red-500 text-lg"
let imageClassProp = "~/src/assets/image.jpeg"

const mockHandleFile = vi.fn()

const factory = () => {
    return shallowMount(UploadImage, {
        global: {
            plugins: [],
            components: {
                BaseImage
            },
            mocks: {
                handleFile: mockHandleFile
            },
            stubs: {
                InputFile: true,
                BaseImage:true
            },
        },
        props: {
            inputClass: inputClassProp,
            imageClass: imageClassProp
        },
        slots: {
        }
    })
};

describe('Testing the uploadimage component', () => {

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
    test('Should have an inputClass prop', () => {
        wrapper = factory()
        expect(wrapper.props("inputClass")).toBeTruthy()
    })
    test('Should have an imageClass prop', () => {
        wrapper = factory()
        expect(wrapper.props("imageClass")).toBeTruthy()
    })
    test('Should have the inputfile element', () => {
        wrapper = factory()
        expect(wrapper.findComponent({ name: "InputFile" }).exists()).toBe(true)
    })

    test('Should have a handleFile function', () => {
        wrapper = factory()

        const handleFileFunction = wrapper.vm.handleFile

        expect(typeof handleFileFunction).toBe("function")
      
    })
    test('Should have the BaseImage component', () => {
        wrapper = factory()

        const baseImage = wrapper.findComponent({ name:"BaseImage" })
        expect(baseImage.exists()).toBe(true)
      
    })
});

