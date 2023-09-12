import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'
import folgere from '~/pages/folgere.vue'
import { OneFollower } from '~/components/OneFollower.vue'

describe('folgere page testing', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(folgere)
    })

    test('renders followers', () => {
        expect(wrapper.findComponent({ name: OneFollower}))
    })
})