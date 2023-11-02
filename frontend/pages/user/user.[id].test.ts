import { createTestingPinia } from '@pinia/testing';
import IdVue from './[id].vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { useGeneralStore } from '~/store/generalStore';
import BaseIconMoreOptions from '~/components/base/BaseIconMoreOptions.vue';
import BaseTag from '~/components/base/BaseTag.vue';
import ArticleCard from '~/components/modules/Blogg/ArticleCard.vue';
import BaseIconSaveArticleSaved from '~/components/base/BaseIconSaveArticleSaved.vue';
import BaseIconSaveArticleUnSaved from '~/components/base/BaseIconSaveArticleUnSaved.vue';
import TheUserSidebar from '~/components/modules/UserProfile/TheUserSidebar.vue';
import BaseFollowButton from '~/components/base/BaseFollowButton.vue';

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



        vi.stubGlobal('save', () => {
            return null
        })


        vi.stubGlobal('unsave', () => {
            return null
        })

        vi.stubGlobal('redirect_to_post_page', () => {
            return null
        })

        
        vi.stubGlobal('check_if_following_user', () => {
            return true
        })



        wrapper = shallowMount(IdVue, {
            global: {
                components: {
                    BaseTag,
                    BaseIconSaveArticleSaved,
                    BaseIconSaveArticleUnSaved,
                    ArticleCard,
                    BaseIconMoreOptions,
                    TheUserSidebar,
                    BaseFollowButton
                },
                mocks: {
                    $route: {
                        params: { id: '1' }
                    },
                },
            },
            plugins: [pinia],
            stubs: {
                "ArticleCard": true,
                "TheUserSidebar": true,
                "BaseFollowButton": true,
                "BaseTag": true,
                "BaseIconSaveArticleSaved": true,
                "BaseIconSaveArticleUnSaved": true,
                "BaseIconMoreOptions": true,
                toPlainText: true,
            }
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

    test('Should render first and last name', async () => {
        
        
        ;await wrapper.vm.$nextTick()


        const mockNormalUserPosts = ref({
            results: [
                {
                    title: "title_test",
                    content_snippet: "snuppet"
                }
            ]
        });

        const mockNormalUserProfile = ref({
            username: "testuser",
            first_name: "test_first_name",
            last_name: "test_last_name",
            num_of_followers: 7
        });

            (wrapper.vm as any).normalUserPosts = mockNormalUserPosts.value;
            (wrapper.vm as any).normalUserProfile = mockNormalUserProfile.value;

        await wrapper.vm.$nextTick()

            ; //console.log(wrapper.html()) // print to self
        expect(wrapper.text()).toContain('test_first_name')
        expect(wrapper.text()).toContain('test_last_name')
    })
    test('Should render all the components', async () => {
        const mockNormalUserPosts = {
            results: [
                {
                    title: "title_test",
                    content_snippet: "snuppet"
                }
            ]
        }

        const mockNormalUserProfile = {
            username: "testuser",
            first_name: "test_first_name",
            last_name: "test_last_name",
            num_of_followers: 7
        }

            ; (wrapper.vm as any).normalUserPosts = mockNormalUserPosts
            ; (wrapper.vm as any).normalUserProfile = mockNormalUserProfile

        await wrapper.vm.$nextTick()

            ; console.log(wrapper.html())

        const articleCard = wrapper.findComponent({ name:"ArticleCard" });
        const usersidebar = wrapper.findComponent({ name:"TheUserSidebar" });

        expect(articleCard.exists()).toBe(true);
        expect(usersidebar.exists()).toBe(true);
    })



});