import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from '~/store/generalStore'
import SignUpCard from '~/components/modules/Auth/SignUpCard.vue'

describe('FormRegister page testing', () => {
    let wrapper:VueWrapper
    let store;
    let pinia;

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)
        wrapper = shallowMount(SignUpCard, {
            global: {
                plugins: [pinia],
            },
        })
    })

    test('exists', () => {
        expect(wrapper.exists()).toBe(true)
    })

    test('FormKit is rendered', () => {
        expect(wrapper.findComponent({ name:"FormKit" }))
    })

    test('suksess burde vises etter at en konto har blitt laget', async () => {
        console.log(wrapper.html())

        wrapper.vm.submitted = true
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain("Suksess")
    })
})