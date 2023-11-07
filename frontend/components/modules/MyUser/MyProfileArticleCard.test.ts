import MyProfileArticleCard from './MyProfileArticleCard.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

// import { useGeneralStore } from '~/store/generalStore';
// import { usePostStore } from '~/store/postStore';
// import { useLoggedInUserStore } from '~/store/loggedInUserStore';
// import { usePaginationStore } from '~/store/paginationStore';

let wrapper: VueWrapper;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const mockRedirectToPostPage = vi.fn()
const mockDeletePostRequest = vi.fn()

const factory = () => {
    return shallowMount(MyProfileArticleCard, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {
                redirectToPostPage: mockRedirectToPostPage,
                deletePostRequest: mockDeletePostRequest
            },
            stubs: {},
        },
        props: {
            post: {
                title: "posttesttitle",
                content_snippet: "<div><span><p>postcontentsnippet</p><p>poop poop</p></span></div>",
                date_published: "02-10-2321",
                author: {
                    username: "testusername",
                    first_name: "testfirstname",
                    last_name: "testlastname"
                },
                tags: [
                    {
                        name: "tag1"
                    },
                    {
                        name: "tag2"
                    }
                ],
                categories: [
                    {
                        name: "category1"
                    },
                    {
                        name: "category2"
                    }
                ],
                images: [
                    {
                        name: "~/image/src1.jpg"
                    },
                    {
                        name: "~/image/src2.jpg"
                    }
                ],
                videos: [
                    {
                        name: "~/video/src1.mp4"
                    },
                    {
                        name: "~/video/src2.mp4"
                    }
                ],
                num_of_comments: 8
            }
        },
        slots: {}
    })
};

describe('', () => {

    vi.stubGlobal('definePageMeta', () => {
        return null
    });

    // vi.stubGlobal('useRoute', () => {
    //     return {
    //         params: {
    //             id: 1
    //         }
    //     }
    // });

    beforeEach(() => {
        // generalStore = useGeneralStore(pinia); 
        // postStore = usePostStore(pinia); 
        // loggedInUserStore = useLoggedInUserStore(pinia); 
        // paginationStore = usePaginationStore(pinia); 

    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('Should render post title', () => {
        wrapper = factory()
        expect(wrapper.text()).toContain("posttesttitle")
    })
    test('Should render post content (snippet)', () => {
        wrapper = factory()
        expect(wrapper.text()).toContain("postcontentsnippet")
    })
    test('Should render date published', () => {
        wrapper = factory()
        expect(wrapper.text()).toContain("02-10-2321")
    })
    test("Should NOT render content_snippet (v-html) as direct html")
    wrapper = factory()

    const content = wrapper.get("[data-test='content-html']")

    expect(content.text()).not.toContain("<div><span><p>postcontentsnippet</p><p>poop poop</p></span></div>")
    expect(content.html()).not.toContain("<div><span><p>postcontentsnippet</p><p>poop poop</p></span></div>")
    expect(content.text()).toBe("postcontentsnippetpoop poop")

    test('Should render tags', () => {
        wrapper = factory()

        expect(wrapper.text()).toContain("tag1")
        expect(wrapper.text()).toContain("tag2")
    })

    test('Should have a "read more" field', () => {
        wrapper = factory()

        expect(wrapper.text()).toContain("Les mer")
    })

    test('The read more "button" should call a redirect function', async () => {
        wrapper = factory()

        const read = wrapper.get("[data-test='read']")

        await read.trigger("click")

        await wrapper.vm.$nextTick()

        expect(mockRedirectToPostPage).toHaveBeenCalledOnce()

    })
    test('There should be a delete post button for each post', () => {
        wrapper = factory()

        const del_button = wrapper.find("[data-test='del']")

        expect(del_button.exists()).toBe(true)
    })
    test("There should be a button called delete(slett)", () => {
        wrapper = factory()

        const del_button = wrapper.find("[data-test='del']")

        expect(del_button.element.tagName).toBe("BUTTON")
        expect(del_button.text()).toBe("Slett")
    })
    test('Should be a function meant for (trying) to delete posts', () => {
        wrapper = factory()

        const theDelFunc = (wrapper.vm as any).deletePostRequest

        expect(theDelFunc).toBeDefined()
        expectTypeOf(theDelFunc).toBeFunction()
    })
    test('The button should call a function', () => {
        wrapper = factory()  

        const del_button = wrapper.find("[data-test='del']")
        del_button.trigger("click")


        expect(mockDeletePostRequest).toHaveBeenCalled()
    })






});
