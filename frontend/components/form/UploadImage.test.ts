import UploadImage from './UploadImage.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';

import BaseImage from '~/components/base/BaseImage.vue';

let wrapper: any;

// let inputClassProp = "bg-red-500 text-lg"
// let labelProp = "some label text"

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
                BaseImage: true
            },
            provide: {
                label:"something"
            }
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
    test('Should have the inputfile element', () => {
        wrapper = factory()
        expect(wrapper.findComponent({ name: "InputFile" }).exists()).toBe(true)
    })

    test('Should have a handleFile function', () => {
        wrapper = factory()

        const handleFileFunction = wrapper.vm.handleFile

        expect(typeof handleFileFunction).toBe("function")

    })
    test('Should have an emit, "fileChange"', async () => {
        wrapper = factory()

        wrapper.vm.$emit("fileChange")

        await wrapper.vm.$nextTick()

        expect(wrapper.emitted("fileChange")).toBeTruthy()
    })

    test('Should not have an image element (this is not where the uplaod should be rendered)', () => {
        wrapper = factory()

        expect(wrapper.find("img").exists()).toBe(false)
        expect(wrapper.findComponent({ name: "BaseImage" }).exists()).toBe(false)
    })
    test('Should match snapshot', () => {
        wrapper = factory()

        expect(wrapper).toMatchSnapshot()

    })

})
