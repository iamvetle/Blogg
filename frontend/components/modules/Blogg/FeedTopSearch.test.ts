// ! made by copilot
//@ts-ignore
import { render, screen } from '@testing-library/vue';
import FeedTopSearch from './FeedTopSearch.vue';
import { createTestingPinia } from '@pinia/testing';

let pinia = createTestingPinia()
describe('FeedTopSearch', () => {
  it('renders search results when searchPart is not null', () => {
    const searchPart = 'example';
    const searchStore = useSearchStore(pinia);
    searchStore.searchPart = searchPart;

    render(FeedTopSearch);

    expect(screen.getByText(`Søkeresultater for '${searchPart}'`)).toBeTruthy();
  });

  it('does not render search results when searchPart is null', () => {
    const searchStore = useSearchStore(pinia);
    searchStore.searchPart = null;

    render(FeedTopSearch);

    expect(screen.queryByTestId('search-results')).toBeNull();
  });
});