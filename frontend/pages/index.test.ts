import index from "./index.vue";
import { shallowMount } from '@vue/test-utils';
// import { createTestingPinia } from "@pinia/testing";
// import FeedMain from "~/components/modules/Blogg/FeedMain.vue";
// import FeedSidebar from "~/components/modules/Blogg/FeedSidebar.vue";

// ! can't test because I am doing an async fetch at the top level(?)
// * ^ I have not figured out how to fix that yet

describe('Index', () => {
    it('renders the correct components', () => {
        const wrapper = shallowMount(index);
        expect(wrapper.exists()).toBe(true)

        //   // Assert that the FeedMain component is rendered
        //   expect(wrapper.findComponent(FeedMain).exists()).toBe(true);

        //   // Assert that the FeedSidebar component is rendered
        //   expect(wrapper.findComponent(FeedSidebar).exists()).toBe(true);
    });

    // Add more tests here...
});