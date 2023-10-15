import MyProfileCard from '~/components/modules/MyUser/MyProfileCard.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useGeneralStore } from '~/store/generalStore';

describe('testing myprofilecard', () => {
  let wrapper: VueWrapper;
  let store: any;

  beforeEach(() => {
    const pinia = createTestingPinia();
    store = useGeneralStore(pinia);

    wrapper = shallowMount(MyProfileCard, {
      global: {
        plugins: [pinia],
        mocks: {},
        stubs: {}
      },
      props: {
        profilePictureProp: "~/src/something.jpg"
      }
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  test("props are being passed correctly", () => {
    const ell = wrapper.get("[data-test='imgprop']")

    expect(ell.attributes("src")).toBe("~/src/something.jpg")

    expect(wrapper.text()).toMatchSnapshot()

  })
});