import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import register from '~/pages/registrer.vue'

let wrapper: VueWrapper
let store;
let pinia:any

const factory = () => {
    return mount(register, {
        global: {
            plugins: [pinia],
        },
    })
}

describe('register page testing', () => {


    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)

        vi.stubGlobal("definePageMeta", () => {
            return null
        })

    })
    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })

    test('register page exists', () => {
        wrapper = factory()

        expect(wrapper.exists()).toBe(true)
    })
})