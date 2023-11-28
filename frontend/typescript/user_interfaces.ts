// HUSK no bio is being sent, or user picture field . or customizations


/**
 * url: /api/<str>:username/
 */
export interface NormalUserProfileType {
	username: string;
	first_name: string;
	last_name: string;
	num_of_followers: number;
	num_of_following: number;
	profile_picture:string;
}

/**
 * url: /api/min-side/
 * 
 * Extends the interface for the regular user - the logged-in user has
 * more fields to it.
 */
export interface LoggedInUserProfileType extends NormalUserProfileType {
	email: string;
	date_of_birth: null | string;
	address: string | null;
	phone_number: string | null;
	following: FollowingType[]
	followers: FollowerType[]
	saved_posts: PostSavedType[]
	num_of_saved_posts: number;
	
	// rest of NormalUserProfileType ...
}

/**
 * url: /api/min-side/followers/
 */
export interface AllFollowersType { // With pagination
	count: number;
	next: string | null;
	previous: string | null;
	current_page: number | null;
	results: FollowerType[]
}

/**
 * url: /api/min-side/following/
 */
export interface AllFollowingType { // With pagination
	count: number;
	next: string | null;
	previous: string | null;
	current_page: number | null;
	results: FollowingType[]
}
export interface FollowingType {
	username: string;
}

export interface FollowerType {
	username: string;
}