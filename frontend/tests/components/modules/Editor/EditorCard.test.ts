import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import EditorCard from '~/components/modules/Editor/EditorCard.vue'

const mockingCancel = vi.fn()
const mockingPublish = vi.fn()

describe('EditorCard testing', () => {
    let wrapper:VueWrapper
    let pinia

    beforeEach(() => {
        pinia = createTestingPinia()
        wrapper = mount(EditorCard, {
            global: {
                plugins: [pinia],
                mocks: {
                    cancelClick:mockingCancel,
                    tryToPublishClick:mockingPublish
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
})