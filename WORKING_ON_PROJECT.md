Things I want to implement into my Blogg project
================================================

There are stuff I want the web client to be able to do, that I have not yet implemented. There are also things I want my blogg application to be able to do.

I am focusing on **frontend** at the moment.

## Backend

### models.py

- [ ] **CustomUser** -> new field: profile picture upload / img upload
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
>
>Try to use 'red (fail), green (barely work), refactor (work)' - TTD

- [ ] Render the created posts in '[id]' with propper html. So it can actually display each post correctly.
- [ ] Remove some old pages and components that are not in use
- [ ] Expand the registration form to include more information options
- [ ] Make it possible for the user to **add pictures** when making post

### text editor

- Maybe remove 'title' input field and just use 'content'

---

- [ ] Find out how I want implement "**text editor**"
- Should I continue with **TiptapEditor** or use something else like **simplemde**?



## General / else

There are features I generally want to implement, but not sure how.

- Text editor for publishing posts
  - maybe relevant [simplemde](https://simplemde.com/)

Not so important right now:
- Make the loading, and ***lazyloading*** much better
