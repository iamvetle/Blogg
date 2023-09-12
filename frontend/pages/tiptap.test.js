import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'
import tiptap from '~/pages/tiptap.vue'

describe('tiptap page testing', () => {
    let wrapper;
    let store;
    let pinia;

    beforeEach(() => {
        wrapper = mount(tiptap)
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})