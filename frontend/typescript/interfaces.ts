export interface AccountType {
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	nickname: string;
	age: number;
	address: string;
	phone_number: number;
	num_of_followers: number;
	last_online: string;
}

// plural
export interface ArticlesSnippetsType {
	count: number;
	next: string | null;
	previous: string | null;
	current_page:number;
	results: [
		{
			id: number;
			title: string;
			content_snippet: string;
			date_published: string;
			num_of_followers: string;
			author: {	
				username: string;
				first_name: string;
				last_name: string;
			},
			tags:Array<string>,
			categories:Array<string>
		}
	]
}

// singel
export interface ArticleSnippetSingleType {
	id: number;
	title: string;
	content_snippet: string;
	date_published: string;
	num_of_followers: string;
	author: {
		username: string;
		first_name: string;
		last_name: string;
	},
	tags:Array<string>,
	categories:Array<string>
} 


export interface PersonalPostType {
	id: number;
	title: string;
	content: string;
	author: {
		username: string;
		first_name: string;
		last_name: string;
	};
	date_published: string;
}

export interface SinglePostType {
	id: number;
	title: string;
	content: string;
	author: {
		username: string;
		first_name: string;
		last_name: string;
	};
	date_published: string;
}

export interface PersonalUserType {
	id: number;
	email: string;
	username: string;
	first_name: string;
	last_name: string;
	age: number | null;
	address: string | null;
	nickname: string | null;
	last_online: string;
	num_of_followers: number;
}

export interface FollowerType {
	username: string;
}

// not using
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