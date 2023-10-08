import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", () => {

  // Local storage
  const isAuthenticated = ref(false);
  const username = ref<string | null>(null);

  // Posts
  const posts = ref<ArticlesSnippetsType | null>(null)

  // [id] user
  const theUser = ref<AccountType | null>(null) 

  // Min side
  const personalPosts = ref<ArticlesSnippetsType | null>(null)
  const personalUser = ref<PersonalUserType | null>(null)

  // Links
  const baseFeedURL = "http://localhost:8888/api/search/"
  const post_snippets_url = ref<string>("http://localhost:8888/api/feed/")
  const personal_post_snippets_url = ref<string>("http://localhost:8888/api/min-side/posts/")

  const next_page_link = ref("")
  const previous_page_link = ref("")
  const last_page_link = ref("")

  // pagnation
  const total_pages_count = ref(0);
  const number_of_posts_count = ref(0);
  const current_page = ref(1);

  // error pages
  const apiDownError = ref(false);

  //other
  const search_bar_show = ref(false)

  const changeAuthenticated = (state: boolean) => {
    isAuthenticated.value = state;
  };

  return { posts, personalUser, theUser, search_bar_show, personalPosts, personal_post_snippets_url, current_page, baseFeedURL, post_snippets_url, isAuthenticated, apiDownError, username, total_pages_count, number_of_posts_count, next_page_link, previous_page_link, last_page_link, changeAuthenticated };
});
