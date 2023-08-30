/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils';
import index from '@/pages/index.vue'
import PostWindow from '@/components/PostWindow.vue'

describe("'Index' page, tests", () => { // creates unit test
    const wrapper = mount(index)          

    it("'PostWindow is rendering", () => {        
        const postwindow = wrapper.findComponent(PostWindow)

        expect(postwindow.exists()).toBe(true);
    })

    it("Static text (p, h2, etc) is rendering", () => {

        expect(wrapper.find("p").exists()).toBeTruthy()
        expect(wrapper.find("h2").exists()).toBeTruthy()
    })
});