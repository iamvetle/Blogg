import BaseFollowButton from '~/components/base/BaseFollowButton.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useGeneralStore } from '~/store/generalStore';

describe('testing basefollowbutton', () => {
    let wrapper: VueWrapper;
    let store: any;
    let defaultSlotContent = "<p>this is the default slot</p>"

    beforeEach(() => {
        const pinia = createTestingPinia();
        store = useGeneralStore(pinia);


        wrapper = shallowMount(BaseFollowButton, {
            global: {
                plugins: [pinia],
                components: {},
                mocks: {},
                stubs: {}
            },
            props: {},
            slots: {
                default: defaultSlotContent
            }
        });
    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('component exists', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('slot (default) content is being rendered', () => {
        expect(wrapper.html()).toContain(defaultSlotContent)
    })
    test('slot content input is not being displayed, correctly', async () => {
        wrapper.unmount()

        await nextTick()

        wrapper = shallowMount(BaseFollowButton, {
            global: {
                plugins: [],
                components: {},
                mocks: {},
                stubs: {}
            },
            props: {}
        })
        await wrapper.vm.$nextTick()

        expect(wrapper.html()).not.toContain(defaultSlotContent)
    })

    test('attrs is being passed correctly', async () => {
        wrapper.unmount()

        await nextTick()

        wrapper = shallowMount(BaseFollowButton, {
            global: {
                plugins: [],
                components: {},
                mocks: {},
                stubs: {}
            },
            attrs: {
                class:"bg-red-500"
            },
            slots: {
                default:"<p>something</p>"
            }
        })
        await wrapper.vm.$nextTick()

        const pelement = wrapper.get("[data-test='default-slot']")
        console.log(wrapper.html())

        expect(wrapper.attributes('class')).toBe("bg-red-500")
    })
});