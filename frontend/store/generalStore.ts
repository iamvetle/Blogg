import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", () => {

  // local storage
  const isAuthenticated = ref(false);
  const username = ref<string | null>(null);

  // posts
  const posts = ref<SnippetPostType | null>(null)
  const theUser = ref(null) 
  const personalPosts = ref<SnippetPostType | null>(null)

  const searchPosts = ref(null)

  const lastSearch = ref("")

  // links
  const baseFeedURL = "http://localhost:8888/api/feed/"
  const post_snippets_url = ref<string>("http://localhost:8888/api/feed/")
  const personal_post_snippets_url = ref<string>("http://localhost:8888/api/min-side/posts/")
  

  const next_page_link = ref<string | null>(null)
  const previous_page_link = ref<string | null>(null)
  const last_page_link = ref<string | null>(null)

  // pagnation
  const total_pages_count = ref<number | null>(null);
  const number_of_posts_count = ref<number | null>(null);
  const current_page = ref<number | null>(null);

  // error pages
  const apiDownError = ref(false);

  //other
  const search_bar_show = ref(false)

  const changeAuthenticated = (state: boolean) => {
    isAuthenticated.value = state;
  };

  return { posts, lastSearch, searchPosts, theUser, search_bar_show, personalPosts, personal_post_snippets_url, current_page, baseFeedURL, post_snippets_url, isAuthenticated, apiDownError, username, total_pages_count, number_of_posts_count, next_page_link, previous_page_link, last_page_link, changeAuthenticated };
});
