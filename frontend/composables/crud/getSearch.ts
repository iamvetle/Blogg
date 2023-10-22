import { useSearchStore } from '~/store/searchStore'

/** Calls the composable 'searchReuqest' and cleans up the search query input field  */

export const doSearch = async (searchInput:string) => {
    const store = useSearchStore()

	/** If the input field is empty, the function is not continued */
	if (searchInput.trim() != "") {

        console.log("not empty", searchInput)

		/** Updates the global "current" search variable for the search function to see later */
		store.baseSearchURL = `http://localhost:8888/api/search/?q=${searchInput}`
		/** Retrieves 'all' posts if no search query was made - normal retrievel */
        await searchRequest()
	} else {
		store.baseSearchURL = `http://localhost:8888/api/feed/`
	}
	/** The composable function that deals with the search logic
	* Takes the value of 'store.baseSearchURL' in to GET request
	*/
	console.log(searchInput) // print to self

    	/** Redirects the web client to the corresponding url of the search query */


}