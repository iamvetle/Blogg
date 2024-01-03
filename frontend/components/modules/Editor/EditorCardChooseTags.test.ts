import EditorCardChooseTags from './EditorCardChooseTags.vue'
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

let wrapper: any;
let tagStore:any;
let pinia:any = createTestingPinia()

const allTags = [
    {
        name:"tag1",
        post_count:"3"
    },
    {
        name:"tag2",
        post_count:"2"
    },
    {
        name:"tag3",
        post_count:"9"
    }
]

const factory = () => {
    return shallowMount(EditorCardChooseTags, {
        global: {
            plugins: [pinia],
            components: {},
            mocks: {},
            stubs: {},
        },
        props: {},
        slots: {}
    })
};

describe('Testing component', () => {

    beforeEach(() => {
        tagStore = useTagStore(pinia)
    });

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
        }
        vi.clearAllMocks()

    });

    test('Should exist', () => {
        wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })
    test('Should have the USelectMenu', () => {
        wrapper = factory()
        
        expect(wrapper.find("USelectMenu").exists()).toBe(true)
    }) 
    test('The menu should be searchable', () => {
        wrapper = factory()

        const selectMenu = wrapper.find("USelectMenu")
        // just checking if it has a searchplaceholder..
        expect(selectMenu.attributes("searchable-placeholder")).toBeTruthy()  
    })
    test('The options should be the same as the ones in post store', async () => {
        tagStore.allTags = allTags

        wrapper = factory()

        await wrapper.vm.$nextTick()

        const selectMenu = wrapper.find("USelectMenu")
        expect(selectMenu.attributes("options")).toBeTruthy()
    })
    test('If there are no tag options in storem there should be no options in select menu either', async () => {
        tagStore.allTags = null

        wrapper = factory()

        await wrapper.vm.$nextTick()

        const selectMenu = wrapper.find("USelectMenu")
        expect(selectMenu.attributes("options")).toContain("No tags to choose from")
    })  
});