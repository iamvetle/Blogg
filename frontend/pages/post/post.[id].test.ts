import idVue from './[id].vue'
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { usePostStore } from '~/store/postStore';

// Components in the page
import SinglePostCommentsList from '~/components/modules/Blogg/SinglePostCommentsList.vue';
import PostBookmark from '~/components/UI/PostBookmark.vue';
import TagsList from '~/components/UI/TagsList.vue';
import PostTitle from '~/components/UI/PostTitle.vue';
import BaseImage from '~/components/base/BaseImage.vue';
import PostContentHTML from '~/components/UI/PostContentHTML.vue';
import BaseButton from '~/components/base/BaseButton.vue';
import SinglePostComments from '~/components/modules/Blogg/SinglePostComments.vue';


const standardPost = {
    id: 5,
    title: "testTitle",
    content: "testContent",
    author: {
        username: "testUsername",
        first_name: "testFirstName",
        last_name: "testLastName"
    },
    num_of_comments: 6,
    tags: [
        {
            name: "candy",
        },
        {
            name: "fridge"
        }
    ]
}

let wrapper: any;
let pinia: any = createTestingPinia();

// let generalStore; 
let postStore;
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(idVue, {
        global: {
            plugins: [pinia],
            components: {
                SinglePostCommentsList,
                PostBookmark,
                TagsList,
                PostTitle,
                BaseImage,
                PostContentHTML,
                BaseButton,
                SinglePostComments
            },
            mocks: {},
            stubs: {
                TagsList: true,
                SinglePostComments:true
            },
        },
        props: {},
        slots: {}
    })
};

describe('', () => {

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
        // generalStore = useGeneralStore(pinia); 
        postStore = usePostStore(pinia);
        // loggedInUserStore = useLoggedInUserStore(pinia); 
        // paginationStore = usePaginationStore(pinia); 

    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    test('Page should exist', () => {
        wrapper = factory()

        expect(wrapper.exists()).toBe(true)
    })
    test('Should match snapshot', () => {
        wrapper = factory()

        expect(wrapper).toMatchSnapshot()
    })

    test('PostBookmark should be present if all post data is ok', async () => {
        wrapper = factory()

        wrapper.vm.post = standardPost

        await wrapper.vm.$nextTick()

        const bookmark = wrapper.findComponent({ name: "PostBookmark" })
        expect(bookmark.exists()).toBe(true)
    })
    test('articletags should be present if all post data is ok', async () => {
        wrapper = factory()

        wrapper.vm.post = standardPost

        await wrapper.vm.$nextTick()

        const bookmark = wrapper.findComponent({ name: "TagsList" })
        expect(bookmark.exists()).toBe(true)
    })
    test('Should have a title prop', async () => {
        wrapper = factory()
        wrapper.vm.post = standardPost
        await wrapper.vm.$nextTick()
        expect(wrapper.findComponent({ name: "PostTitle" }).exists()).toBe(true)
    })
    test('Should render the title from the post', async () => {
        wrapper = factory()
        wrapper.vm.post = standardPost
        await wrapper.vm.$nextTick()

        const postTitleDiv = wrapper.find("[data-test='post-title']")
        expect(postTitleDiv.exists()).toBe(true)

        expect(postTitleDiv.html()).toContain(standardPost.title)
    })
    test('Should have the image component', async () => {
        wrapper = factory()
        wrapper.vm.post = standardPost
        await wrapper.vm.$nextTick()
        expect(wrapper.findComponent({ name: "BaseImage" }).exists()).toBe(true)
    })
    test('Should have the component that renders the html input from prop', async () => {
        wrapper = factory()
        wrapper.vm.post = standardPost
        await wrapper.vm.$nextTick()
        expect(wrapper.findComponent({ name: "PostContentHTML" }).exists()).toBe(true)
    })
    test('Should render the basebutton, back button, on page', async () => {
        wrapper = factory()
        wrapper.vm.post = standardPost
        await wrapper.vm.$nextTick()
        expect(wrapper.findComponent({ name: "BaseButton" }).exists()).toBe(true)
    })
    test('Should render the comments component', async () => {
        wrapper = factory()
        wrapper.vm.post = standardPost
        await wrapper.vm.$nextTick()
        expect(wrapper.findComponent({ name: "SinglePostComments" }).exists()).toBe(true)

    })


})