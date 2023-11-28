import { flushPromises, mount, type VueWrapper } from '@vue/test-utils';
import Modal from './Modal.vue';
import { useGeneralStore } from '~/store/generalStore';
import { createTestingPinia } from '@pinia/testing';

import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
} from '@headlessui/vue'

let wrapper: any
let store: any
let pinia: any

const factory = () => {
    return mount(Modal, {
        global: {
            components: {
                Dialog,
                DialogPanel,
                DialogTitle,
                DialogDescription,
            },
            plugins: [pinia]
        },
        attachTo: document.body
    })
}

describe("Testing the modal utils component", () => {
    pinia = createTestingPinia()

    store = useGeneralStore(pinia)

    test('Should have the headless ui Dialog component present', async () => {
        wrapper = factory()

        const detail = wrapper.findComponent(Dialog)

        console.log(wrapper.html())
        await wrapper.vm.$nextTick()

        expect(detail.exists()).toBe(true)
    })
    test("Should have a button for confirm", async () => {
        wrapper = factory()

        await wrapper.vm.$nextTick()

        const confirm_button = document.getElementById("confirm")

        expect((confirm_button as any).tagName).toBe("BUTTON")
    })
    test('Should have a button for cancel', async () => {
        wrapper = factory()

        await wrapper.vm.$nextTick()

        const cancel_button = document.getElementById("cancel")

        expect((cancel_button as any).tagName).toBe("BUTTON")
    }),
        test('Should not display the ui component when the comfirm button is pressed', async () => {
            wrapper = factory()
            console.log(wrapper.vm.isOpen)


            const detail = wrapper.getComponent(Dialog)
            console.log(detail.html())



            await wrapper.vm.$nextTick()
        })
})

// vi.mock("~/composables/crud/postCreateNewPost", () => ({
//     postCreateNewPost: () => {
//         vi.fn().mockResolvedValue({ status: 200, data: true })
//     }
// }));
