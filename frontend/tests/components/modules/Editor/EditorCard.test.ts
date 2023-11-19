import { flushPromises, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import EditorCard from '~/components/modules/Editor/EditorCard.vue'
import EditorBubbleMenu from '~/components/modules/Editor/EditorBubbleMenu.vue'
import BaseButton from '~/components/base/BaseButton.vue'
import Modal from '~/components/utils/Modal.vue'

const mockingCancel = vi.fn()
const mockingPublish = vi.fn()
const mockRoute = vi.fn()
const includes = vi.fn()

describe('EditorCard testing', () => {
    let wrapper: any
    let pinia

    beforeEach(() => {

        vi.stubGlobal("useRoute", () => {
            return  {
                path:"/something/"
            }        
        })

        pinia = createTestingPinia()
        wrapper = mount(EditorCard, {
            global: {
                plugins: [pinia],
                mocks: {
                    buttonCancelClick: mockingCancel,
                    buttonTryPublishClick: mockingPublish,
                },
                components: {
                    EditorBubbleMenu,
                    BaseButton,
                    Modal
                },
                stubs: {
                    EditorFloatingMenu: true,
                    EditorContent: true,
                    EditorCardTopMenu: true,
                    Modal: true,
                }
            }
        })
    })

    test('exists', () => {

        expect(wrapper.exists()).toBe(true)
    })
    test('Should have "publish" text', () => {
        expect(wrapper.text()).toContain("Publish")
    })
    test('Should have a "Cancel" text', () => {
        expect(wrapper.text()).toContain("Cancel")
    })
    test('Should have a "cancel" button', async () => {
        const button = wrapper.get("#cancel")

        expect(button.text()).toBe("Cancel")
    })

    test('Should have a "publish" button', async () => {
        const button = wrapper.get("#publish")

        expect(button.text()).toBe("Publish")
    })
    test('The cancel button should call a function when it is clicked', async () => {

        await wrapper.get("#cancel").trigger("click")

        expect(mockingCancel).toHaveBeenCalledOnce()
    })
    test('The publish button should call a function when it is clicked', async () => {
        await wrapper.vm.$nextTick()

        await wrapper.get("#publish").trigger("click")

        expect(mockingPublish).toHaveBeenCalledOnce()
    }),
        test('Should have a function called publishPost', () => {
            const pubFunction = (wrapper.vm as any).publishPost

            expect(pubFunction).toBeDefined()

            expectTypeOf(pubFunction).toBeFunction()
        })
    test('Should have a function called cancelPublishing', () => {
        const pubFunction = (wrapper.vm as any).cancelPublishing

        expect(pubFunction).toBeDefined()

        expectTypeOf(pubFunction).toBeFunction()
    })

    // test('Should have the bubblemeny component', () => {
    //     const bubble = wrapper.findComponent({name:"EditorBubbleMenu"})

    //     expect(bubble.exists()).toBe(true)
    // })

    test('Should have a wrapper around the two cancel and publish buttons, and the two buttons should have the correct text', () => {
        const cancel_publish_buttons = wrapper.find("[data-test='cancel_publish_buttons']")

        expect(cancel_publish_buttons.exists()).toBe(true)

        const cancel_button = cancel_publish_buttons.get("#cancel")
        expect(cancel_button.text()).toBe("Cancel")

        const publish_button = cancel_publish_buttons.get("#publish")
        expect(publish_button.text()).toBe("Publish")


    })
    test('There should be an editor container that contains the editor content, the top bar, and the floating bar', () => {
        const editor_container = wrapper.find("#editor-container")

        expect(editor_container.exists()).toBe(true)

        const editor_content = editor_container.find("[data-test='direct-editor']")

        expect(editor_content.exists()).toBe(true)

        const editor_floating_menu_component = editor_container.findComponent({ name: "EditorFloatingMenu" })
        expect(editor_floating_menu_component.exists()).toBe(true)

        const editor_top_menu_component = editor_container.findComponent({ name: "EditorCardTopMenu" })

        expect(editor_top_menu_component.exists()).toBe(true)

        const cancel_publish_buttons = editor_container.find("[data-test='cancel_publish_buttons']")
        expect(cancel_publish_buttons.exists()).toBe(false)

    })

})