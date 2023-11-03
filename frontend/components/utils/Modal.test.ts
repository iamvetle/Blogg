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
        attachTo:document.body
    })
}

describe("Testing the modal utils component", () => {

    afterEach(() => {
        wrapper.unmount()
    })

    test('Should have a function that closes and opens', () => {

        wrapper = factory()

        let openbutton = wrapper.find("button[id='open']")

        expect(openbutton.exists()).toBe(true)
    })
    test('Should render the text inside of the modal when the button is pressed, AND not be displayed when the modal is closed', async () => {
        wrapper = factory();
        let openbutton = wrapper.get("button[id='open']")

        

        openbutton.trigger("click")

        await wrapper.vm.$nextTick()

        let con = (wrapper.vm as any).isOpen

        expect(con).toBe(true)


        console.log(document.body.innerHTML)

        expect(document.body.innerHTML).toContain("Are you ready")

        // The button that is INSIDE of the modal should now be shown
        // really difficult since I can't access wrapper

        expect(document.body.innerHTML).toContain('id="close"')

        let closebutton = document.getElementById("close")
        await (closebutton as any).click()

        con = (wrapper.vm as any).isOpen

        expect(con).toBe(false)
        expect(document.body.innerHTML).not.toContain("Are you ready")



        

    })
})