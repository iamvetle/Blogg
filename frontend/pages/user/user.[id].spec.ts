import IdVue from './[id].vue';
import { VueWrapper, shallowMount, flushPromises } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useGeneralStore } from '~/store/generalStore';


let mockNormalUserProfile = [{
    username:"testuser",
    first_name:"test_first_name",
    last_name:"test_last_name"
}]

let mockNormalUserPosts = true

describe('', () => {
    let wrapper: VueWrapper;
    let store: any;

    beforeEach(() => {
        
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
        vi.stubGlobal('toPlainText', () => {
            return null
        })

        const pinia = createTestingPinia();
        store = useGeneralStore(pinia);

        wrapper = shallowMount(IdVue, {
            global: {
                plugins: [pinia],
                components: {},
                mocks: {
                    $route: {
                        params: { id:'1' }
                    }
                },
                stubs: {
                    "ArticleCard":true,
                    "TheUserSidebar":true,
                }
            },
            props: {}
        });
        
        // store.theUser = [{
        //     posts: [
        //         {
        //             id: 111,
        //             title: "test title 1",
        //             content: "content1",
        //             author: {
        //                 username:"testguy1",
        //                 first_name:"testfirstname1",
        //                 last_name:"testlastname1"
        //             }
        //         },
        //         {
        //             id: 222,
        //             title: "test title 2",
        //             content: "content2",
        //             author: {
        //                 username:"testguy1",
        //                 first_name:"testfirstname1",
        //                 last_name:"testlastname1"
        //             },
        //             num_of_followers: 543,
        //         },
        //     ],
        // }]
        
    });
    

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });
    test('component exists', () => {
        expect(wrapper.findComponent(IdVue).exists()).toBe(true)
    })
    // test("name renders", async () => {
    //     await flushPromises()

    //     console.log(wrapper.html())

    //     expect(wrapper.html()).toContain("testfirstname1")
    // }),
    // test("followers render", async () => {
    //     await flushPromises()
    //     console.log(wrapper.html())

    //     expect(wrapper.html()).toContain(543)
    // })
    test('username renders', async () => {
        wrapper.vm.normalUserPosts.value = mockNormalUserPosts

        wrapper.vm.normalUserProfile.value = mockNormalUserProfile

        await flushPromises()

        console.log(wrapper.html())

        expect(wrapper.text()).toContain('testuser')
    })

});