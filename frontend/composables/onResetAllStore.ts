import { usePostStore } from '~/store/postStore'
import { useSearchStore } from '~/store/searchStore';
import { usePaginationStore } from '~/store/paginationStore';


/**
 * Makes sure that a "fresh" page load happens when a page is
 * for example navigated back to.
 */
export const onResetAllStore = () => {


    const postStore = usePostStore();
    const searchStore = useSearchStore();
    const paginationStore = usePaginationStore();



    /** I don't know whether it is bad to use $reset or not 
     * 
     * This is supposed to just remove anything that is related and affects the
     * index or feed page
    */


    postStore.posts = null;

    paginationStore.all_pages_count = 0;
    paginationStore.current_page_number = 0;
    paginationStore.activeFetchURL = postStore.baseFetchURL;
    paginationStore.next_page = "";
    paginationStore.previous_page = "";
    paginationStore.last_page_link = "";

    searchStore.searchPart = null;
    searchStore.tagFilterPart = null;
    searchStore.authorFilterPart = null;
    searchStore.categoryFilterPart = null;

}