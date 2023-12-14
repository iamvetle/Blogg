// Define the base URL for server endpoint for the entire application.
const baseURL = "http://localhost:8888/"

// The base URL for the api endpoint
const baseApiURL = "http://localhost:8888/api/";

// The base URL for the api endpoint
const baseUsersURL = "http://localhost:8888/users/";

// URLs related to the application's API grouped by functionality.

const api = {
    // The status of the server
    status: `${baseApiURL}health_check/`,
    // All URLS related to posts
    posts: {
        feed: `${baseApiURL}posts/feed/`,  // Base main posts - that can later have filters be applied upon
        following: `${baseApiURL}posts/following/`,  // Posts by following users
        myuser: `${baseApiURL}myuser/posts/`, // Posts by logged in user
        saved: `${baseApiURL}saved/`,  // Posts saved by the logged in user,
        /**
         * Returns the correct URL for the posts made by the user based on it's username
         * 
         * @param username - The username of the user
         * @returns - The URL to all of the user's posts
         */
        user: (username: string) => `${baseUsersURL}user/${username}/posts/`,  // Posts by a specific user    
        singlePost: {
            /**
             * Returns the URL to the post based on its unique ID
             * 
             * @param postId - The ID of the post
             * @returns - The URL of the post
             */
            view: (postId: string | number) => `${baseApiURL}post/${postId}/`,  // URL for a specific post.
            // Functions that modify or add something a a post
            action: {
                /**
                 * Returns the URL to edit the post based on the ID of the post
                 * 
                 * @param postId - The ID of the post
                 * @returns - The URL
                 */
                edit: (postId: string | number) => `${baseApiURL}myuser/post/${postId}/edit/`,  // URL for editing a specific post.
                /**
                 * Returns the URL for saving the post
                 * 
                 * @param postId - The ID of the post
                 * @returns - The URL
                 */
                savePost: (postId: string | number) => `${baseApiURL}post/${postId}/save/`,  // URL for saving a specific post.
                /**
                 * Returns the URL for adding a comment to the post based on the ID of the post
                 * 
                 * @param postId - The ID of the post
                 * @returns - The URL
                 */
                addComment: (postId: string | number) => `${baseApiURL}post/${postId}/add-comment/`,  // URL for adding a comment to a post.
                /**
                 * Returns the URL for removing a specific comment from a specific post
                 * 
                 * @param postId - The ID of the post
                 * @param commentId - The ID of the comment
                 * @returns - The URL
                 */
                removeComment: (postId: string | number, commentId: string) =>
                    `${baseApiURL}post/${postId}/remove-comment/${commentId}/`,  // URL for removing a comment from a post.
                newPost: `${baseApiURL}post/newpost/` // URL for adding a new post
            },
            /**
             * Returns the URL for retrieving all of the comments bellonging to a post
             * 
             * @param postId - The ID of the post
             * @returns - The URL
             */
            comments: (postId: string | number) => `${baseApiURL}post/${postId}/comments/`,  // URL for post comments.
        },
        // Filter-related API URLs.
        filter: {
            tags: `${baseApiURL}posts/tags/`,  // URL for tags filtering.
            categories: `${baseApiURL}posts/categories/`,  // URL for categories filtering.
        },

    },
};
// URLs related to user authentication and registration.
const users = {
    auth: {
        login: `${baseUsersURL}login/`,  // URL for user login.
        register: `${baseUsersURL}register/`,  // URL for user registration.
    },
    myUser: {
        profile: `${baseUsersURL}myuser/`,  // Base URL for user-specific operations.
        edit: {
            profilePicture: `${baseUsersURL}profile_picture/edit`,  // URL for editing profile picture.
        },
        following: `${baseUsersURL}myuser/following`,
        followers: `${baseUsersURL}myuser/followers`
    },
    user: {
        /**
         * Returns the URL for showing the profile of a user, based on the user's username
         * 
         * @param username - The username of the user
         * @returns - The URL
         */
        profile: (username: string) => `${baseUsersURL}user/${username}/`,  // URL for accessing a user's profile.

        /**
        * Returns the URL for following a user, based on the user's username
        * 
        * @param username - The username of the user
        * @returns - The URL
        */
        follow: (username: string) => `${baseUsersURL}user/${username}/follow/`,  // URL for following a user.

        /**
        * Returns the URL for unfollowing a user, based on the user's username
        * 
        * @param username - The username of the user
        * @returns - The URL
        */
        unfollow: (username: string) => `${baseUsersURL}user/${username}/unfollow/`,  // URL for unfollowing a user.
    }
};

// Export the defined URLs for use in other parts of the application.
export default { baseURL, baseApiURL, baseUsersURL, api, users };
