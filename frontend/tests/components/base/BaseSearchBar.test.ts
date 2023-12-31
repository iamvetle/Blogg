import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import BaseSearchbar from '~/components/base/BaseSearchBar.vue'

describe('Testing the BaseSearchBar component', () => {
    let wrapper:VueWrapper
    let store;
    let pinia;

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)
        wrapper = shallowMount(BaseSearchbar, {
            global: {
                plugins: [pinia],
            },
        })
    })

    test('Should exists', () => {
        expect(wrapper.exists()).toBe(true)
    })

    test('Should have an input event that triggers an event (once) when input is placed and keyup enter is pressed with the correct payload', async () => {
        
        const emitInput = wrapper.get('input')
        
        await emitInput.setValue("inputtext")
        
        await wrapper.vm.$nextTick()
        
        await emitInput.trigger('keyup.enter')

        await wrapper.vm.$nextTick()
        
        
        expect(wrapper.emitted()).toHaveProperty("searchAction")
        expect(wrapper.emitted('searchAction')).toHaveLength(1)
        expect((wrapper.emitted('searchAction') as any)[0]).toEqual(["inputtext"])
    })
})