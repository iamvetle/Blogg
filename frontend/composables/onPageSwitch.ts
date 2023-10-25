import { usePostStore } from '~/store/postStore'
import { useSearchStore } from '~/store/searchStore';
import { usePaginationStore } from '~/store/paginationStore';


/**
 * Makes sure that a "fresh" page load happens when a page is
 * for example navigated back to.
 */
export const onPageSwitch = () => {


    const postStore = usePostStore()
    const searchStore = useSearchStore()
    const paginationStore = usePaginationStore()

    /** I don't know whether it is bad to use $reset or not 
     * 
     * This is supposed to just remove anything that is related and affects the
     * index or feed page
    */
    searchStore.$reset
    paginationStore.$reset
    postStore.$reset
}