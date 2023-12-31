import { createTestingPinia } from '@pinia/testing'
import { VueWrapper, mount } from '@vue/test-utils'
import loggut from '~/pages/loggut.vue'

vi.stubGlobal("navigateTo", () => {
    return null
})

vi.stubGlobal("definePageMeta", () => {
    return null
})

let wrapper:VueWrapper
let store
const pinia = createTestingPinia()

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