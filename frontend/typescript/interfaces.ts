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

export interface PostType {
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
	};
}

export interface FollowerType {
	username:string;
}