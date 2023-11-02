import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import EditorCard from '~/components/modules/Editor/EditorCard.vue'

describe('EditorCard testing', () => {
    let wrapper:VueWrapper
    let pinia;

    beforeEach(() => {
        pinia = createTestingPinia()
        wrapper = mount(EditorCard, {
            global: {
                plugins: [pinia],
            },
        })
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})