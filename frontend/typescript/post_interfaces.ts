
/**
 * url: /api/<str>:username/posts/
 */
export interface NormalUserSnippetPostType {
	count: number,
	next: string | null,
	previous: string | null,
	current_page: number | null,
	results: [
		{
			id: number;
			title: string;
			author: AuthorType;
			content_snippet: string;
			date_published: string;
			num_of_followers: string;

			tags: TagType[] | [];

			images: ImageType[] | [];

			num_of_comments: number;
		}
	]
}

/**
 * url: /api/feed/
 */
export interface SnippetPostMultipleType {
	count: number;
	next: string | null;
	previous: string | null;
	// current_page: number | null;
	results: SnippetPostSingleType[]
}
export interface SnippetPostSingleType {
	id: number;
	title: string;
	content_snippet: string;
	date_published: string;
	author: AuthorType;
	tags: TagType[] | [];

	images: ImageType[] | [];
	num_of_comments: number;
}

/**
 * url: /api/post/<int>:post_id/
 */
export interface PostSingleType {
	id: number;
	title: string;
	content: string;
	date_published: string;
	author: AuthorType;
	tags: TagType[] | [];

	images: ImageType[] | [];
	videos: VideoType[] | [];

	num_of_comments: number;
}

/**
 * url: /api/min-side/posts/
 */
export interface LoggedInUserMultiplePostType {
	count: number;
	next: string | null;
	previous: string | null;
	// current_page: number | null;
	results: LoggedInUserSinglePostType[]
}
export interface LoggedInUserSinglePostType extends PostSingleType {
}

/**
 * url: /api/posts/saved/
 */
export interface AllPostSavedType { // With pagination
	count: number;
	next: string | null;
	previous: string | null;
	results: PostSavedType[]
}
export interface PostSavedType {
	post: {
		id: number,
		title: string,
		username: string,
		first_name: string,
		last_name: string,
		// ? img???
	}
}

/**
 * url: /api/tags/
 */
// export interface AllTagsType { // With pagination
// 	count: number;
// 	next: string | null;
// 	previous: string | null;
	// current_page: number | null;
// 	results: TagType[]
// }
export interface TagType {
	id?:number,
	name: string,
	post_count?:number
}

export interface ImageType {
	image: string;
}

export interface VideoType {
	video: string;
}

export interface CommentType {
	id:number;
	post:number,
	content: string;
	author: string;
	date_published: string;
}

export interface AuthorType {
	username: string;
	first_name: string;
	last_name: string;
}