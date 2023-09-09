import Navbar from '~/components/Element/Navbar.vue'
import { shallowMount } from "@vue/test-utils"
import { createTestingPinia } from '@pinia/testing'
import { useGeneralStore } from "~/store/generalStore"

describe("testing NavbarLoggedIn", () => {
    const wrapper = shallowMount(Navbar, {
        globals: {
            plugins: [createTestingPinia()]
        }
    });

    const store = useGeneralStore()
    store.isAuthenticated = false

    test("exists", () => {
        expect(wrapper.exists()).toBe(true)
    })
})