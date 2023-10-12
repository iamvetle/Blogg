import FilterTool from "~/components/utils/FilterTool.vue";
import { VueWrapper, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useGeneralStore } from '~/store/generalStore';
import BaseCheckboxOption from '~/components/base/BaseCheckboxOption.vue';

describe('FilterTool testing', () => {
    let wrapper:VueWrapper
    let store;
    let pinia:any;

    beforeEach(async () => {
        pinia = createTestingPinia();
        store = useGeneralStore(pinia);

        // Set initial state for categories if it comes from the store
        store.allTags = [
            { name: "tag1" },
            { name: "tag2" },
            { name: "tag3" }
        ];

        wrapper = mount(FilterTool, {
            global: {
                plugins: [pinia],
                components: {
                    BaseCheckboxOption
                }
            }
        });
        await wrapper.vm.$nextTick();
    });

    test('exists', () => {
        expect(wrapper.exists()).toBe(true);
    });
    
    // test("tags are being rendered", async () => {
    //     await wrapper.vm.$nextTick();

    //     expect(wrapper.text()).toContain("tag1");
    //     expect(wrapper.text()).toContain("tag2");
    //     expect(wrapper.text()).toContain("tag3");
    // });

    // test("custom tag url can be made", async () => {
    //     // Set new state for selectedCategories
    //     (wrapper.vm as any).selectedCategories = {
    //         tag4: true,
    //         tag5: true,
    //         tag6: true
    //     };

    //     await wrapper.vm.$nextTick();

    //     expect(wrapper.text()).toContain("tags=tag4&tags=tag5&tags=tag6");
    //     expect(wrapper.text()).not.toContain("tags=tag1&tags=tag2&tags=tag3");
    // });
});
