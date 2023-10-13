import { mount } from '@vue/test-utils'
import index from '~/pages/index.vue'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'

vi.stubGlobal('setPageLayout', () => {
    return null
})

describe('index page testing', () => {

    
    const pinia = createTestingPinia()

    const store = useGeneralStore(pinia)

    const wrapper = mount(index, {
        global: {
            plugins:[pinia]

        }
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})