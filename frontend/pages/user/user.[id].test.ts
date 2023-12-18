import { createTestingPinia } from '@pinia/testing';
import IdVue from './[id].vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import BaseIconMoreOptions from '~/components/base/BaseIconMoreOptions.vue';
import BaseTag from '~/components/base/BaseTag.vue';
import FeedPostPreviewCard from '~/components/modules/Blogg/FeedPostPreviewCard.vue'
import BaseIconSaveArticleSaved from '~/components/base/BaseIconSaveArticleSaved.vue';
import BaseIconSaveArticleUnSaved from '~/components/base/BaseIconSaveArticleUnSaved.vue';
import UserSidebar from '~/components/modules/UserProfile/UserSidebar.vue';
import BaseButtonFollow from '~/components/base/BaseButtonFollow.vue';
import UserFullName from '~/components/modules/UserProfile/UserFullName.vue';
import UserNav from '~/components/modules/UserProfile/UserNav.vue';
import BaseImage from '~/components/base/BaseImage.vue';
import UserPostsList from '~/components/modules/UserProfile/UserPostsList.vue';

let wrapper: any;
let store;
let pinia;

describe('Testing the user id page', () => {


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
                    FeedPostPreviewCard,
                    BaseIconMoreOptions,
                    UserSidebar,
                    BaseButtonFollow,
                    UserFullName,
                    UserNav,
                    BaseImage,
                    UserPostsList
                },
                mocks: {
                    $route: {
                        params: { id: '1' }
                    },
                },
            },
            plugins: [pinia],
            stubs: {
                "FeedPostPreviewCard": true,
                "UserSidebar": true,
                "BaseButtonFollow": true,
                "BaseTag": true,
                "BaseIconSaveArticleSaved": true,
                "BaseIconSaveArticleUnSaved": true,
                "BaseIconMoreOptions": true,
                "UserFullName": true,
                toPlainText: true,
                "UserNav": true,
                "BaseImage":true,
                "UserPostsList":true

            }
        });

        wrapper.vm.normalUserPosts = {
            results: [
                {
                    title: "title_test",
                    content_snippet: "snuppet"
                }
            ]
        }
        wrapper.vm.normalUserProfile = {
            username: "testuser",
            first_name: "test_first_name",
            last_name: "test_last_name",
            num_of_followers: 7
        }


    });


    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });
    test('exists', () => {
        expect(wrapper.findComponent(IdVue).exists()).toBe(true)
    })
    test('The usernav component should be rendered', async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.findComponent({ name: "UserNav" }).exists()).toBe(true)
    })
    test('The baseiimage component should be rendered', async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.findComponent({ name: "BaseImage" }).exists()).toBe(true)
    })
    test('The userpostslist component for listing posts should be rendered', async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.findComponent({ name: "UserPostsList" }).exists()).toBe(true)
    })



});