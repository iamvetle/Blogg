import { flushPromises, mount, type VueWrapper } from '@vue/test-utils';
import Modal from './Modal.vue';
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
} from '@headlessui/vue'

let wrapper: VueWrapper

function factory() {
    return mount(Modal, {
        global: {
            components: {
                Dialog,
                DialogPanel,
                DialogTitle,
                DialogDescription,
            }
        },
        attachTo: document.body
    })
}

describe("Testing the modal utils component", () => {

    // test('Should have a function that closes and opens', () => {

    //     wrapper = factory()

    //     let openbutton = wrapper.find("button[id='open']")

    //     expect(openbutton.exists()).toBe(true)
    // })
    // test('Should render the text inside of the modal when the button is pressed, AND not be displayed when the modal is closed', async () => {
    //     wrapper = factory();
    //     let openbutton = wrapper.get("button[id='open']")



    //     openbutton.trigger("click")

    //     await wrapper.vm.$nextTick()

    //     let con = (wrapper.vm as any).isOpen

    //     expect(con).toBe(true)


    //     console.log(document.body.innerHTML)

    //     expect(document.body.innerHTML).toContain("Are you ready")

    //     // The button that is INSIDE of the modal should now be shown
    //     // really difficult since I can't access wrapper

    //     expect(document.body.innerHTML).toContain('id="close"')

    //     let closebutton = document.getElementById("close")
    //     await (closebutton as any).click()

    //     con = (wrapper.vm as any).isOpen

    //     expect(con).toBe(false)
    //     expect(document.body.innerHTML).not.toContain("Are you ready")

    // })

    // The modal should be shown immidietly
    test('The modal Should have two buttons available', async () => {
        const wrapper = factory()

        await wrapper.vm.$nextTick()


        console.log(document.body.innerHTML)

        const buttons = document.querySelectorAll("button");

        // start and end of element becomes * 2
        expect(buttons).toHaveLength(4)
    })
    test("Should have a button for confirm", async () => {
        const wrapper = factory()

        await wrapper.vm.$nextTick()

        const confirm_button = document.getElementById("confirm")

        expect((confirm_button as any).tagName).toBe("BUTTON")
    }),
        test('Should have a button for cancel', async () => {
            const wrapper = factory()

            await wrapper.vm.$nextTick()

            const cancel_button = document.getElementById("cancel")

            expect((cancel_button as any).tagName).toBe("BUTTON")
        })
        // test('The confirm button should emit an event when pressed', async () => {
        //     const wrapper = factory()

        //     await wrapper.vm.$nextTick()

        //     document.getElementById("confirm").click()

        //     await wrapper.vm.$nextTick()

        //     console.log(wrapper.emitted())

        //     expect(wrapper.emitted("confirmPublished")).toBeTruthy()

        // })
})

// vi.mock("~/composables/crud/postCreateNewPost", () => ({
//     postCreateNewPost: () => {
//         vi.fn().mockResolvedValue({ status: 200, data: true })
//     }
// }));
