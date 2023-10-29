import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import EditorCard from '~/components/modules/Editor/EditorFloatingMenu.vue'

describe('Floating menu for editor card testing', () => {
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