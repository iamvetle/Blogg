import { createTestingPinia } from '@pinia/testing'
import { VueWrapper, mount } from '@vue/test-utils'
import loggut from '~/pages/loggut.vue'
import { useGeneralStore } from '~/store/generalStore'

vi.stubGlobal("navigateTo", () => {
    return null
})

let wrapper:VueWrapper
let store
let pinia = createTestingPinia()

describe('loggut page testing', () => {
    store = useGeneralStore(pinia)

    beforeEach(() => {
        wrapper = mount(loggut, {
            global: {
                plugins:[pinia]
            }
        })
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
})