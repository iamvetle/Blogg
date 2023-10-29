import { VueWrapper, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'
import TheNavbar from '~/components/layout/TheNavbar.vue'
import { useGeneralStore } from '~/store/generalStore'

let wrapper: VueWrapper;
let pinia: any;
let generalStore:any;



describe("thenavvbarr testing", () => {

    beforeEach(() => {
        vi.stubGlobal("useRoute", () => {
            return null
        })


        pinia = createTestingPinia()

        generalStore = useGeneralStore(pinia)
        generalStore.isAuthenticated = true


        wrapper = mount(TheNavbar, {
            global: {
                plugins: [pinia],
                stubs: {
                    BaseSearchBar: true,
                    FormKit:true
                },
            },
        })

    })


    test('Should exist', () => {

        expect(wrapper.exists()).toBe(true)
    })

    test("Should render the default navbar text", async () => {
        console.log(generalStore.isAuthenticated)

        await (wrapper.vm as any).$nextTick()


        console.log(wrapper.html())
        console.log(generalStore.isAuthenticated)

        expect(wrapper.text()).toContain("Nytt innlegg")
        expect(wrapper.text()).toContain("Min profil")

    })

})

/**
 * bare ga opp med å ha store.isauthenticated jeg
 */