Things I want to implement into my Blogg project
================================================

There are stuff I want the web client to be able to do, that I have not yet implemented. There are also things I want my blogg application to be able to do.

I am focusing on **frontend** at the moment.

## Backend

### models.py

- **CustomUser** -> 
  - [ ] new field: profile picture upload / img upload
- [ ] Make it possible to save images in code editor to database here
  - Find out how to do this
- [x] Make a '**tag**' model and connect to the '**post**' model through a manytomany field on
- [x] **Tag** : new model. Create a new 'tag' model and connect it to CustomUser (and or post?)
- [x] **Categories** : new model. Connect to CustomUser (or post?)
- [ ] Make it so users can **save posts** for reading later. Might need another model for that
- (Do I need a new field in models.py? Does it need to be connected to a user?)

- [ ] Make the api return '**following**'

(I want users to be able to 'like' other posts.
(Share? - much later in project at least))

## Frontend

>Try to use 'red (fail), green (barely work), refactor (work)' - TTD

- [x] Render the created posts in '[id]' with propper html. So it can actually display each post correctly.

### min-side
- [ ] Change the **personal posts** that are received in 'min-side' to be snippets
- [ ] Put pagnation there if the users have a lot of posts
- [ ] Give users the ability to edit their own posts

---

### index
- [ ] The post snippet or short description of the post **renders the elements** \<h1\> and such which they are not supposed to do. Fix that.
- [ ] Place a temperary profile picture in the user sidebar (the same on as in min-side)
- [ ] There is a '**date_published**' problem that interfers with ordering that I need to fix

### text editor
- [ ] When ***making a post*** I want the styling to be the same
  - [ ] Also the width. So when creating the post it looks like it will be rendered.
- Make it possible for the user to **add pictures** when making post
  - I don't want to focus on adding and rendering images until later
- Maybe remove 'title' input field and just use 'content'

---

### General

- [ ] Expand the registration form to include more information options

### thoughts

There are features I generally want to implement, but not sure how.

- Comments have no functionality right now

- Text editor for publishing posts
- maybe relevant [simplemde](https://simplemde.com/)

Not so important right now:
- Make the loading, and ***lazyloading*** much better

- [ ] Find out how I want implement "**text editor**"
- Should I continue with **TiptapEditor** or use something else like **simplemde**?
- Should I remove the images that are listed on the feed/index