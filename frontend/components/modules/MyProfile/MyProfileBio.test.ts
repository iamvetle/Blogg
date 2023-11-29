import MyProfileBio from './MyProfileBio.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';

describe('testing the component containing the bio of the logged in user', () => {
    let wrapper: VueWrapper;
    let store: any;
    vi.stubGlobal('definePageMeta', () => {
        return null
    });
    vi.stubGlobal('useRoute', () => {
        return {
            params: {
                id: 1
            }
        }
    });

    beforeEach(() => {
        const pinia = createTestingPinia();
        store = useLoggedInUserStore(pinia);

        store.loggedInUserProfile = {
            bio: "this is test bio"
        }

        wrapper = shallowMount(MyProfileBio, {
            global: {
                plugins: [pinia],
                components: {},
                mocks: {},
                stubs: {}
            },
            props: {}
        });
    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('Should exist', () => {
        expect(wrapper.exists()).toBe(true)
    })
    test('Personal bio is displayed', async () => {
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain("this is test bio")
    })
});