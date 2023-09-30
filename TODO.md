Things I want to implement into my Blogg project
================================================

There are stuff I want the web client to be able to do, that I have not yet implemented. There are also things I want my blogg application to be able to do.

I will try to focus on **backend** for now.

## Backend

### models.py
* **CustomUser** -> new field: profile picture upload / img upload
* Make a '**tag**' model and connect to the '**post**' model through a manytomany field on
* Find out how I can create an option to 'save article'
* * Do I need a new field in models.py? Does it need to be connected to a user?
* **Tag** : new model. Create a new 'tag' model and connect it to CustomUser (and or post?)
* **Categories** : new model. Connect to CustomUser (or post?)
* Make it so users can **save posts** for reading later. Might need another model for that

I want users to be able to 'like' other posts.
(Share? - much later in project at least)

## Frontend
>Try to use 'red (fail), green (barely work), refactor (work)' - TTD
* Remove some old pages and components that are not in use
* Expand the registration form to include more information options
* Make the loading, and *lazyloading* much better
* * Make the api return 'following'

