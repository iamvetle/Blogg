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
	last_online:string;
}

export interface SnippetPostType {
	count:number;
	next:string | null;
	previous:string | null;
	results: [
		{
			id: number;
			title: string;
			content: string;
			date_published: string;
			last_modified:string; // TODO: fjern denne senere på backend
			num_of_followers:string;
			author: {
				username: string;
				first_name: string;
				last_name: string;
			}
		}
	]
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
	last_modified: string;
	date_published: string;
}

export interface SinglePostType {
	id:number;
	title:string;
	content:string;
	author: {
		username:string;
		first_name:string;
		last_name:string;
	};
	last_modified:string;
	date_published:string;
}

export interface PersonalUserType {
	id:number;
	email:string;
	username:string;
	first_name:string;
	last_name:string;
	age:number | null;
	address:string | null;
	nickname:string | null;
	last_online:string;
	num_of_followers:number;
}

export interface FollowerType {
	username:string;
}
