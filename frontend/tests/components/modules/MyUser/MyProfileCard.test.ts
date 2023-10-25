import MyProfileCard from '~/components/modules/MyUser/MyProfileCard.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';

describe('testing myprofilecard', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(MyProfileCard, {
      global: {
        mocks: {},
        stubs: {},
      },
      slots: {
        username:"testusername",
        "full-name":"test_fulltnavn",
        "amount-of-followers":"243",
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