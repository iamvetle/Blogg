import LoggedInUserProfileCard from '~/components/modules/MyProfile/LoggedInUserProfileCard.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';

describe('testing LoggedInUserProfileCard.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(LoggedInUserProfileCard, {
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
      }
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });
  test('Should exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
});