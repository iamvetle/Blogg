import MyProfilePicture from './MyProfilePicture.vue';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import BaseImage from '~/components/base/BaseImage.vue';

import { useLoggedInUserStore } from '~/store/loggedInUserStore';

import UploadImage from '~/components/form/UploadImage.vue';
import placeholder_profile_picture from '~/assets/placeholder-profile-picture.png';

let wrapper: any;
let pinia: any = createTestingPinia();

let loggedInUserStore: any;


let mockHandleFileChange = vi.fn()
let mockHandlePostNewProfileImage = vi.fn()
let mockCancelUpload = vi.fn()

const mockProfile_picture = "~/src/picture.jpeg"

const factory = () => {
    return shallowMount(MyProfilePicture, {
        global: {
            plugins: [pinia],
            components: {
                BaseImage,
                UploadImage
            },
            mocks: {
                handleFileChange: mockHandleFileChange,
                handlePostNewProfileImage: mockHandlePostNewProfileImage,
                cancelUpload: mockCancelUpload
            },
            stubs: {
                BaseImage: true,
                UploadImage: true,
                BaseButton: true
            },
        },
        slots: {}
    })
};

describe('Testing the myprofilepicture component', () => {

    beforeEach(() => {
        loggedInUserStore = useLoggedInUserStore(pinia);
        loggedInUserStore.loggedInUserProfile = {
            profile_picture: mockProfile_picture
        }

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
    test('Should have the basimage component', () => {
        wrapper = factory()
        expect(wrapper.findComponent({ name: "BaseImage" }).exists()).toBe(true)
    })
    test('Should have the uploadimage component', () => {
        wrapper = factory()
        expect(wrapper.findComponent({ name: "UploadImage" }).exists()).toBe(true)
    })
    test('The baseimage component should have a src attribute ', () => {
        wrapper = factory()

        const baseImage = wrapper.findComponent({ name: "BaseImage" })

        expect(baseImage.attributes("src")).toBeTruthy()
    })
    test('When there is no "uploaded image" the already existing profile picture is displayed', () => {
        wrapper = factory()

        const baseImage = wrapper.findComponent({ name: "BaseImage" })

        expect(baseImage.attributes("src")).toBe(mockProfile_picture)
    })
    test('If the user also doesnt already have a profile picture (as well as not having uploaded one) a placeholder one is displayed', async () => {
        wrapper = factory();

        loggedInUserStore.loggedInUserProfile = {
            profile_picture: null
        }

        await wrapper.vm.$nextTick()

        const baseImage = wrapper.findComponent({ name: "BaseImage" })

        expect(baseImage.attributes("src")).not.toBe(mockProfile_picture)
        expect(baseImage.attributes("src")).toBe(placeholder_profile_picture)
    })
    test('If an image has been uploaded, that one is displayed instead', async () => {
        wrapper = factory();

        const uploadedImage = "uploadedimageValue"
        wrapper.vm.uploadedImage_display = uploadedImage

        await wrapper.vm.$nextTick()

        const baseImage = wrapper.findComponent({ name: "BaseImage" })

        expect(baseImage.attributes("src")).not.toBe(mockProfile_picture)
        expect(baseImage.attributes("src")).toBe(uploadedImage)
    })
    test('Should match snapshot', () => {
        wrapper = factory()

        expect(wrapper).toMatchSnapshot()
    })
    test('Should have a (exist) a function to handle file change from uploadimage', () => {
        wrapper = factory()

        expect(wrapper.vm.handleFileChange).toBeDefined()
        expect(typeof wrapper.vm.handleFileChange).toBe("function")
    })
    test('Should call the handleFileChange function when the uploadImage component has selected an image', async () => {
        wrapper = factory()
        loggedInUserStore.loggedInUserProfile = {
            profile_picture: null
        }

        await wrapper.vm.$nextTick()

        const uploadImage = wrapper.getComponent({ name: "UploadImage" })

        await uploadImage.trigger("file-change")

        expect(mockHandleFileChange).toHaveBeenCalledOnce()
    })
    test('Should have a button to submit/send a new profile picture that gets displayed when something is uploaded', async () => {
        wrapper = factory()

        // No uploaded image
        let button = wrapper.find("[data-test='send_selected_image']")

        // the button should then not be shown
        expect(button.exists()).toBe(false)

        // the temp text should also then not be shown
        expect(wrapper.html()).not.toContain("Preview")

        button = wrapper.find("[data-test='send_selected_image']")

        expect(button.exists()).toBe(false)

        // Is uploaded image
        wrapper.vm.uploadedImage_display = "newpicture.jpg"

        await wrapper.vm.$nextTick()

        button = wrapper.find("[data-test='send_selected_image']")

        // should find the button
        expect(button.exists()).toBe(true)

        // Should have the correct text
        expect(button.attributes("text")).toBe("Submit")

        // the temp text should be shown
        expect(wrapper.html()).toContain("Preview")

        button = wrapper.find("[data-test='send_selected_image']")

        expect(button.exists()).toBe(true)


    })
    test('When the submit uploaded picture button is clicked it calls a function', async () => {
        wrapper = factory()
        expect(wrapper.vm.handlePostNewProfileImage).toBeDefined()

        wrapper.vm.uploadedImage_display = "newpicture.jpg"

        await wrapper.vm.$nextTick()
        // No uploaded image
        const button = wrapper.get("[data-test='send_selected_image']")
        expect(wrapper.vm.handlePostNewProfileImage).toBeDefined()

        await button.trigger("click")

        // function should ahve been called
        expect(mockHandlePostNewProfileImage).toHaveBeenCalledOnce()
    })
    test('There should be a "cancel"/"remove" button', async () => {
        wrapper = factory()

        expect(wrapper.find("[data-test='cancel_image_upload_button']").exists()).toBe(false)

        wrapper.vm.uploadedImage_display = "newpicture.jpg"

        await wrapper.vm.$nextTick()

        const cancel_upload_button = wrapper.get("[data-test='cancel_image_upload_button']")

        // should exist
        expect(cancel_upload_button.exists()).toBe(true)

        // Should have the correct text
        expect(cancel_upload_button.attributes("text")).toBe("Cancel")
    })
    test('When the cancel uploaded picture button is clicked it calls a function', async () => {
        wrapper = factory()
        expect(wrapper.vm.cancelUpload).toBeDefined()

        wrapper.vm.uploadedImage_display = "newpicture.jpg"

        await wrapper.vm.$nextTick()
        // No uploaded image
        const button = wrapper.get("[data-test='cancel_image_upload_button']")

        await button.trigger("click")

        // function should ahve been called
        expect(mockCancelUpload).toHaveBeenCalledOnce()
    })
    test('Should have a remove basebutton profile picture file', async () => {
        wrapper = factory()
        // wrapper.vm.uploadedImage_display = "newpicture.jpg"

        await wrapper.vm.$nextTick()

        console.log(wrapper.html())

        expect(wrapper.find('[data-test="delete_profile_image_button"]').exists()).toBe(true)
    
        wrapper.vm.uploadedImage_display = "newpicture.jpg"

        await wrapper.vm.$nextTick()

        console.log(wrapper.html())

        expect(wrapper.find('[data-test="delete_profile_image_button"]').exists()).toBe(false)
    })
    test('There should be a remove profile picture function', () => {
      wrapper = factory()

      expect(wrapper.vm.removeProfileImage).toBeDefined()
    })



});