import { usePostStore } from '~/store/postStore';
import { useSearchStore } from '~/store/searchStore';
import { usePaginationStore } from '~/store/paginationStore';

/**
 * Constructs a new URL that we want to fetch post data from, that is based on the correct
 * query parameters. The query specifies and filters through search, tags, categories and more.
 * 
 * This computed property is updated dynamically whenever a value inside changes. Which is either
 * the 'searchPart', or the 'tagFilterPart'
 * 
 * @todo Find out whether I should move this to a pluging or composable or someting
 */
export const constructURL = async () => {

    const postStore = usePostStore()
    const searchStore = useSearchStore()
    const paginationStore = usePaginationStore()
	// Construct the URL based on 	the state
	let url = postStore.baseFetchURL

	let params = [];

	if (searchStore.searchPart) {
		console.log(searchStore.searchPart)
		params.push(`search=${searchStore.searchPart}`);
	}
	if (searchStore.tagFilterPart && searchStore.tagFilterPart.length > 0) {
		for (let tag of searchStore.tagFilterPart) {
			params.push(`tags=${tag}`)
		}
	}
	if (params.length > 0) {
		url += `?${params.join('&')}`;
	}
	console.log(url)

	paginationStore.activeFetchURL = url

}