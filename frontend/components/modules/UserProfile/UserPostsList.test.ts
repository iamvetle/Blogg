import UserPostsList from './UserPostsList.vue';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useGeneralStore } from '~/store/generalStore';
import { usePostStore } from '~/store/postStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { usePaginationStore } from '~/store/paginationStore';

import FeedPostPreviewCard from '../Blogg/FeedPostPreviewCard.vue';

let wrapper: any;
let pinia: any = createTestingPinia();

const mockUserposts = [
    {
        "id": 17,
        "title": "This is a title that is made by bob",
        "author": {
            "username": "bob",
            "first_name": "Bob",
            "last_name": "Smith",
        },
        "content_snippet": "Lorem ipsum...",
        "date_published": "08-12-2021",
        "num_of_comments": 526,
        "images": [
            {
                "image": "~/src/something/image.jpeg"
            },
            {
                "image": "~/src/fruit/life.png"
            }
        ]
    },
    {
        "id": 19,
        "title": "This is a title James",
        "author": {
            "username": "jammy",
            "first_name": "James",
            "last_name": "Brown",
        },
        "content_snippet": "Test content content yes",
        "date_published": "18-10-2022",
        "num_of_comments": 98,
        "images": [
            {
                "image": "~/src/africa/elefant.jpeg"
            },
            {
                "image": "~/src/vegetables/pingpong.png"
            }
        ]
    }
]


// let generalStore; 
// let postStore; 
// let loggedInUserStore; 
// let paginationStore; 

const factory = () => {
    return shallowMount(UserPostsList, {
        global: {
            plugins: [pinia],
            components: {
                FeedPostPreviewCard
            },
            mocks: {},
            stubs: {
                "FeedPostPreviewCard":true
            },
        },
        props: {
            user_posts: mockUserposts
        }
    })
};

describe('Testing the component that holds and renders all of the posts in the user id page', () => {

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
    test('Should render the post preview cards the components', async () => {
        wrapper = factory()

        await wrapper.vm.$nextTick()

        console.log(wrapper.html())

        const articleCard = wrapper.findComponent({ name: "FeedPostPreviewCard" });

        expect(articleCard.exists()).toBe(true);
    })


});