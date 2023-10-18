import { createTestingPinia } from '@pinia/testing';
import IdVue from './[id].vue';
import { VueWrapper, flushPromises, shallowMount } from '@vue/test-utils';
import { useGeneralStore } from '~/store/generalStore';


describe('', () => {
    let wrapper: VueWrapper;
    let store;
    let pinia;

    beforeEach(() => {
        pinia = createTestingPinia()
        store = useGeneralStore(pinia)
        
        vi.stubGlobal('definePageMeta', () => {
            return null
        })

        
        vi.stubGlobal('useRoute', () => {
            return {
                params: {
                    id: 1
                }
            }
        })

        vi.stubGlobal('getNormalUserPosts', () => {
            return null
        })

        vi.stubGlobal('getNormalUserProfile', () => {
            return null
        })

        
        vi.stubGlobal('save', () => {
            return null
        })

        
        vi.stubGlobal('unsave', () => {
            return null
        })
        
        vi.stubGlobal('redirect_to_post_page', () => {
            return null
        })

        wrapper = shallowMount(IdVue, {
            global: {
                components: {},
                mocks: {
                    $route: {
                        params: { id:'1' }
                    },
                },
                plugins:[pinia],
                stubs: {
                    "ArticleCard":true,
                    "TheUserSidebar":true,
                    toPlainText:true,
                },


            },
            props: {}
        });
        
    });
    

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });
    test('exists', () => {
        expect(wrapper.findComponent(IdVue).exists()).toBe(true)
    })

    test('does not render username', async () => {

        console.log(wrapper.html())

        expect(wrapper.text()).not.toContain('testuser')
    })
    test('Should render full name', async () => {
        
        const mockNormalUserProfile = {
            username:"testuser",
            first_name:"test_first_name",
            last_name:"test_last_name"
        };

        const mockNormalUserPosts = true;

        (wrapper.vm as any).normalUserProfile = mockNormalUserProfile;
        (wrapper.vm as any).normalUserPosts = mockNormalUserPosts;


        await wrapper.vm.$nextTick()
        
        console.log(wrapper.html())

        expect(wrapper.text()).toContain('test_first_name')
        expect(wrapper.text()).toContain('test_last_name')

    })
    


});