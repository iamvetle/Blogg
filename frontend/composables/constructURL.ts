import { useSearchStore } from '~/store/searchStore';

/**
 * Constructs a new URL that we want to fetch post data from, that is based on the correct
 * query parameters. The query specifies and filters through search, tags, categories and more.
 * 
 * This computed property is updated dynamically whenever a value inside changes. Which is either
 * the 'searchPart', or the 'tagFilterPart'
 * 
 * @todo Find out whether I should move this to a pluging or composable or someting
 */
export const constructURL = (fetchURL:string):string => {

    const searchStore = useSearchStore()
	// Construct the URL based on 	the state
	let newURL = fetchURL

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
		newURL += `?${params.join('&')}`;
	}
	console.log(newURL)

	return newURL

}