import ArticleBookmark from './ArticleBookmark.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useGeneralStore } from '~/store/generalStore';
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePaginationStore } from '~/store/paginationStore';
import BaseIconSaveArticleSaved from '~/components/base/BaseIconSaveArticleSaved.vue';
import BaseIconSaveArticleUnSaved from '~/components/base/BaseIconSaveArticleUnSaved.vue';

let wrapper: any;
let pinia: any = createTestingPinia();

// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(ArticleBookmark, {
        global: {
            plugins: [pinia],
            components: {
                BaseIconSaveArticleSaved,
                BaseIconSaveArticleUnSaved
            },
            mocks: {},
            stubs: {
                BaseIconSaveArticleSaved: true,
                BaseIconSaveArticleUnSaved: true
            },
        },
        props: {
            post: 3
        },
        slots: {}
    })
};

describe('Testing the articlebookmark component', () => {

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

    test('Should exist', () => {
        wrapper = factory()

        expect(wrapper.exists()).toBe(true)
    })
    test("Should exist component for when article is saved", () => {
        wrapper = factory()

        expect(wrapper.findComponent({ name: "BaseIconArticleSaved" }))
    })
    test("Should exist component for when article is unsaved", () => {
        wrapper = factory()

        expect(wrapper.findComponent({ name: "BaseIconArticleUnSaved" }))
    })

    test('Should have a prop with the id of the post passed', () => {
        wrapper = factory()

        expect(wrapper.props("post")).toBeTruthy()
    })
    test('The postid prop should be a number', () => {
        wrapper = factory()

        const idProp = wrapper.props("post")

        expect(typeof idProp).toBe("number")
    })
    
});
