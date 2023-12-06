import { flushPromises, shallowMount } from '@vue/test-utils'
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
            return {
                path: "/something/"
            }
        })

        pinia = createTestingPinia()
        wrapper = shallowMount(EditorCard, {
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
                    InputText: true
                }
            }
        })
    })

    test('exists', () => {

        expect(wrapper.exists()).toBe(true)
    })
    //     test('Should have a function called publishPost', () => {
    //         const pubFunction = (wrapper.vm as any).publishPost

    //         expect(pubFunction).toBeDefined()

    //         expectTypeOf(pubFunction).toBeFunction()
    //     })
    // test('Should have a function called cancelPublishing', () => {
    //     const pubFunction = (wrapper.vm as any).cancelPublishing

    //     expect(pubFunction).toBeDefined()

    //     expectTypeOf(pubFunction).toBeFunction()
    // })

    // // test('Should have the bubblemeny component', () => {
    // //     const bubble = wrapper.findComponent({name:"EditorBubbleMenu"})

    // //     expect(bubble.exists()).toBe(true)
    // // })

    // test('There should be an editor container that contains the editor content, the top bar, and the floating bar', () => {
    //     const editor_container = wrapper.find("#editor-container")

    //     expect(editor_container.exists()).toBe(true)

    //     const editor_content = editor_container.find("[data-test='direct-editor']")

    //     expect(editor_content.exists()).toBe(true)

    //     const editor_floating_menu_component = editor_container.findComponent({ name: "EditorFloatingMenu" })
    //     expect(editor_floating_menu_component.exists()).toBe(true)

    //     const editor_top_menu_component = editor_container.findComponent({ name: "EditorCardTopMenu" })

    //     expect(editor_top_menu_component.exists()).toBe(true)

    //     const cancel_publish_buttons = editor_container.find("[data-test='cancel_publish_buttons']")
    //     expect(cancel_publish_buttons.exists()).toBe(false)

    // })
    // test('Should have a wrapper around an input (meant for entering title)', () => {
    //   const titleInputWrapper = wrapper.find("[data-test='editor_title_input']")

    //   expect(titleInputWrapper.exists()).toBe(true)

    //   const titleComp = titleInputWrapper.findComponent({ name:"InputText" })
    //   expect(titleComp.exists()).toBe(true)
    // })

    test('Should match snapshot', () => {

        expect(wrapper).toMatchSnapshot()
    })
})