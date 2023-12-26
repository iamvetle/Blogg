import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

const defaultPlugins = [createTestingPinia()];
const defaultProvide = {};
const defaultStubs = {};
const defaultMocks = {};
const defaultComponents = {}
const defaultAttrs = {}
const defaultProps = {}
const defaultSlots = {}

export default function shallowFactory (component: any, stubs=defaultStubs, mocks=defaultMocks, attrs=defaultAttrs, 
    plugins=defaultPlugins, components=defaultComponents, props=defaultProps, slots=defaultSlots, provide=defaultProvide  ) {
    
        return shallowMount(component, {
        global: {
            plugins: plugins,
            mocks: mocks,
            provide: provide,
            stubs: stubs,
            components: components,
            // shallow:false,
        },
        // attachTo:"",
        attrs: attrs,
        props: props,
        slots: slots,

    })
}