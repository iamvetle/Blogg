import { usePostStore } from '~/store/postStore'
import { useGeneralStore } from '~/store/generalStore';
import { useSearchStore } from '~/store/searchStore';
import { useLoggedInUserStore } from '~/store/loggedInUserStore';
import { useNormalUserStore } from '~/store/normalUserStore';
import { usePaginationStore } from '~/store/paginationStore';

const postStore = usePostStore()
const generalStore = useGeneralStore()
const searchStore = useSearchStore()
const paginationStore = usePaginationStore()
const loggedInUserStore = useLoggedInUserStore()
const normalUserStore = useNormalUserStore()