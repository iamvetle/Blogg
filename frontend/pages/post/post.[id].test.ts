import idVue from './[id].vue'
import { VueWrapper, flushPromises, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { usePostStore } from '~/store/postStore';

// Components in the page
import SingleArticleListComments from '~/components/modules/Blogg/SingleArticleListComments.vue';
import ArticleBookmark from '~/components/UI/ArticleBookmark.vue';
import ArticleTags from '~/components/UI/ArticleTags.vue';


const standardPost = {
    id:5,
    title: "testTitle",
    content:"testContent",
    author: {
        username:"testUsername",
        first_name:"testFirstName",
        last_name:"testLastName"
    },
    num_of_comments:6,
    tags:[
        {
            name:"candy",
        },
        {
            name:"fridge"
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
                SingleArticleListComments,
                ArticleBookmark,
                ArticleTags
            },
            mocks: {},
            stubs: {
                ArticleTags:true
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

    test('SingleArticleListComments component should be presetn if all post data is ok', async () => {
        wrapper = factory()

        wrapper.vm.post = standardPost

        await wrapper.vm.$nextTick()

        console.log(wrapper.html())

        const listComments = wrapper.findComponent({ name:"SingleArticleListComments" })
        expect(listComments.exists()).toBe(true)
    })

    test('ArticleBookmark should be present if all post data is ok', async () => {
        wrapper = factory()
        
        wrapper.vm.post = standardPost

        await wrapper.vm.$nextTick()
        
        const bookmark = wrapper.findComponent({ name:"ArticleBookmark" })
        expect(bookmark.exists()).toBe(true)
    })
    test('articletags should be present if all post data is ok', async () => {
        wrapper = factory()
        
        wrapper.vm.post = standardPost

        await wrapper.vm.$nextTick()
        
        const bookmark = wrapper.findComponent({ name:"ArticleTags" })
        expect(bookmark.exists()).toBe(true)
    })

})