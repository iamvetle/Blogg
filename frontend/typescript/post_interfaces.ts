
/**
 * url: /api/<str>:username/posts/
 */
export interface NormalUserSnippetPostType {
	count: number,
	next: string | null,
	previous: string | null,
	current_page: number | null,
	results: [{
		id: number;
		title: string;
		author: {
			username: string;
			first_name: string;
			last_name: string;
		},
		content_snippet: string;
		date_published: string;
		num_of_followers: string;

		tags: string[];
		categories: string[];
	}]
}

/**
 * url: /api/feed/
 */
export interface SnippetPostMultipleType {
	count: number;
	next: string | null;
	previous: string | null;
	current_page: number | null;
	results: SnippetPostSingleType[]
}
export interface SnippetPostSingleType {
	id: number;
	title: string;
	content_snippet: string;
	date_published: string;
	author: {
		username: string;
		first_name: string;
		last_name: string;
	},
	tags: null | TagType[],
	categories: null | CategoryType[]
}

/**
 * url: /api/post/<int>:post_id/
 */
export interface PostSingleType {
	id: number;
	title: string;
	content: string;
	date_published: string;
	author: {
		username: string;
		first_name: string;
		last_name: string;
	};
	tags: null | TagType[],
	categories: null | CategoryType[]
}

/**
 * url: /api/min-side/posts/
 */
export interface LoggedInUserMultiplePostType {
	count: number;
	next: string | null;
	previous: string | null;
	current_page: number | null;
	results: LoggedInUserSinglePostType[]
}
export interface LoggedInUserSinglePostType {
	id: number;
	title: string;
	content_snippet: string;
	date_published: string;
	author: {
		username: string;
		first_name: string;
		last_name: string;
	},
	tags: null | TagType[],
	categories: null | CategoryType[]
}

/**
 * url: /api/posts/saved/
 */
export interface AllPostSavedType { // With pagination
	count: number;
	next: string | null;
	previous: string | null;
	current_page: number | null;
	results: PostSavedType[]
}
export interface PostSavedType {
	post: {
		id:number,
		title: string,
		username: string,
		first_name: string,
		last_name: string,
	}
}

/**
 * url: /api/tags/
 */
export interface AllTagsType { // With pagination
	count: number;
	next: string | null;
	previous: string | null;
	current_page: number | null;
	results: TagType[]
}
export interface TagType {
	name: string
}

/**
 * url: /api/categories/
 */
export interface AllCategoriesType { // With pagination
	count: number;
	next: string | null;
	previous: string | null;
	current_page: number | null;
	results: CategoryType[]
}
export interface CategoryType {
	name: string
}