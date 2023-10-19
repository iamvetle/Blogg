
// HUSK no bio is being sent


/**
 * url: /api/<str>:username/
 */
export interface NormalUserProfileType {
	username: string;
	first_name: string;
	last_name: string;
	num_of_followers: number;
	num_of_following: number;
}

/**
 * url: /api/min-side/
 */
export interface LoggedInUserProfileType extends NormalUserProfileType { // Logged In user Type
	email: string;
	age: number | null;
	address: string | null;
	phone_number: string | null;
	nickname: string | null;
	following: FollowingType[]
	followers: FollowerType[]
	saved_posts: PostSavedType[]
	num_of_saved_posts: number;
	
	// NormalUserProfileType ...
}

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
 * The interface nests the common post type inside
 * of @var results, and sorround it with pagination
 */

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

export interface AllPostSavedType {
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
 * url: /api/min-side/followers/
 */
export interface AllFollowersType {
	count: number;
	next: string | null;
	previous: string | null;
	current_page: number | null;
	results: FollowerType[]
}
export interface FollowerType {
	username: string;
}

/**
 * url: /api/min-side/following/
 */
export interface AllFollowingType {
	count: number;
	next: string | null;
	previous: string | null;
	current_page: number | null;
	results: FollowingType[]
}
export interface FollowingType {
	username: string;
}

/**
 * url: /api/tags/
 */
export interface AllTagsType {
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
export interface AllCategoriesType {
	count: number;
	next: string | null;
	previous: string | null;
	current_page: number | null;
	results: CategoryType[]
}
export interface CategoryType {
	name: string
}



// not using ->


/**
 * Not in use
 * @deprecated -> 
 */
export interface RandomAccount {
	id: string,
	uid: string,
	first_name: string,
	last_name: string,
	username: string,
	email: string,
	avatar: string
	gender: string,
	phone_number: string,
	social_inscurance_number: string,
	date_of_birth: string,
	employment: {
		title: string,
		key_skill: string,
	}
	address: {
		city: string,
		street_name: string,
		street_address: string,
		zip_code: string,
		state: string,
		country: string,
	},
	coordinates: {
		lat: number,
		lng: number,
	},
	credit_card: {
		cc_number: string,
	},
	subscription: {
		plan: string,
		status: string,
		payment_method: string,
		term: string,
	}
}

// URL: https://dummyjson.com/posts?skip=5&limit=10 
// max 150 posts

// not using
export interface FakePost {
	limit: number,
	posts: [{
		id: number,
		title: string,
		body: string,
		userID: number,
		tags: {
			0: string,
			1: string,
			2: string,
		},
		reactions: number,
	}],
	skip: number,
	total: number,

}

