
const testSinglePostSaved = {
    post: {
        id: 14,
        title: 'Just testing',
        username: 'barney16',
        first_name: "Barney",
        last_name: "Hansen",
        //?img???
    }
}

const testAuthor = {
    username: "kingOfMario23",
    first_name: "Timmy",
    last_name: "Bakke",
}

const testTag1 = {
    id:9,
    name:"Development",
    post_count:32   
}

const testTag2 = {
    id:52,
    name:"Music",
    post_count:4
}

const testTags = [
    testTag1,
    testTag2,
]

const testImage1 = {
    image:"http://localhost:9999/testapi/media/image1.jpg"
}

const testImage2 = {
    image:"http://localhost:9999/testapi/media/image2.png"
}

const testImages = [
    testImage1,
    testImage2
]

const testVideo1 = {
    video:"http://localhost:9999/testapi/media/video1.mp4"
}

const testVideo2 = {
    video:"http://localhost:9999/testapi/media/video2.mp4"
}

const testVideos = [
    testVideo1,
    testVideo2
]

const testSnippetPostSingle: SnippetPostSingleType = {
    id: 14,
    title: 'Just testing',
    content_snippet: '<h2>something that should be processed</h2><p class="prose">Body content goes here</p>',
    date_published: '2023-23-2',
    author: testAuthor,
    tags: testTags,
    images:testImages,
    num_of_comments: 5
}

const testPostSingle: PostSingleType = {
    id: 9,
    title: 'Just testing',
    content: '<p>This is some random text in HTML</p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, tortor nec lacinia ultrices, nisl velit ullamcorper justo, id ultricies nunc risus et nunc. Nulla facilisi. Sed id nunc at nunc tincidunt aliquam. Fusce id metus auctor, tincidunt nunc a, aliquet nunc. Sed euismod, tortor nec lacinia ultrices, nisl velit ullamcorper justo, id ultricies nunc risus et nunc. Nulla facilisi. Sed id nunc at nunc tincidunt aliquam. Fusce id metus auctor, tincidunt nunc a, aliquet nunc.</h1>',
    date_published: '2023-23-2',
    author: testAuthor,
    tags: testTags,
    images:testImages,
    videos:testVideos,
    num_of_comments: 7
}

const feedPostsURL = "http://localhost:8888/api/posts/feed/"
const feedPostsURLPreviousPage = `${feedPostsURL}?page=2`
const feedPostsURLNextPage = `${feedPostsURL}?page=5`

const testMultipleSnippetPost: SnippetPostMultipleType = {
    // total amount of posts on the blogg
    count:2712,
    next:feedPostsURLNextPage,
    previous:feedPostsURLPreviousPage,
    results: [testSnippetPostSingle]
}

const testLoggedInUserInfo: LoggedInUserProfileType = {
    "email": "person@gmail.com",
    "date_of_birth": "06-11-2001",
    "profile_picture":"http://localhost:8888/api/media/profile_picture123someUser.jpg",
    "username": "iamperson",
    "first_name": "iamfirstname",
    "last_name": "iamlastname",
    "address": null,
    "phone_number": null,
    "following": [
        {
            "username": "michael90"
        }
    ],
    "num_of_following": 1,
    "followers": [
        {
            "username": "bob3"
        }
    ],
    "num_of_followers": 1,
    "saved_posts": [
        {
            "post": {
                "id": 1,
                "title": " saved1testtitle",
                "username": "saved1guy",
                "first_name": "saved1guyfirstname",
                "last_name": "saved1guylastname",
            }
        },
        {
            "post": {
                "id": 2,
                "title": " saved2testtitle",
                "username": "saved2guy",
                "first_name": "saved2guyfirstname",
                "last_name": "saved2guylastname",
            }
        },
    ],
    "num_of_saved_posts": 192
}

export { testSinglePostSaved, testPostSingle, testSnippetPostSingle, testMultipleSnippetPost, testLoggedInUserInfo }


