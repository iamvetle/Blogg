import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", () => {

  // Local storage
  const isAuthenticated = ref(false);
  const username = ref<string | null>(null);

  // Posts
  const posts = ref<SnippetPostMultipleType | null>(null)

  // [id] user
  const theUser = ref<NormalUserProfileType | null>(null) 

  // Min side
  const personalPosts = ref<SnippetPostMultipleType | null>(null)
  const personalUser = ref<LoggedInUserProfileType | null>(null)

  // Links
  const baseFeedURL = "http://localhost:8888/api/search/"
  const post_snippets_url = ref<string>("http://localhost:8888/api/feed/")
  const personal_post_snippets_url = ref<string>("http://localhost:8888/api/minkonto/posts/")

  const next_page_link = ref<string>("")
  const previous_page_link = ref<string>("")
  const last_page_link = ref<string>("")

  // pagnation
  const total_pages_count = ref<number>(0);
  const number_of_posts_count = ref<number>(0);
  const current_page = ref<number>(1);

  // error pages
  const apiDownError = ref(false);

  //other
  const search_bar_show = ref(false)

  /** Contains names of all the tags possible */
  const allTags = ref<CategoryType[]>([])

  const idArrayOfSavedPosts = ref<number[]>([])

  const changeAuthenticated = (state: boolean) => {
    isAuthenticated.value = state;
  };

  return { posts, allTags, idArrayOfSavedPosts, personalUser, theUser, search_bar_show, personalPosts, personal_post_snippets_url, current_page, baseFeedURL, post_snippets_url, isAuthenticated, apiDownError, username, total_pages_count, number_of_posts_count, next_page_link, previous_page_link, last_page_link, changeAuthenticated };
});
