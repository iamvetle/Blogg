
# Working on my Blogg project

## On creating my blogg application

I am getting a lot of inspiration from the site "medium.com", and I have implemented a lot of the functionalities that it has.
However, there is also things I want my Blogg application to do, that "medium.com" does not have.

I find the text editor that is used in "Notion" to be much more like I want my own text editor to be, than google docs or word.

I do not want to work with no progress. My workflow is as follows. I do small commits often and I try as best as I can to make sure that
the tests work when I am commiting. I try to make a new branch when I am trying to create a big new feature. I try to solve one thing at a time.
I am no going to use time to perfect one thing at a time, and I am definetly not going to use time to focus on the visual aspect of my application.
I focus on integrating the functionalities I want each page to have and to make the options availible to use. However I do not focus on making it
look pretty.

I use and follow best practices, and do not create huge technical debt.

The admin panel should be a rough representation on which functionalities I want each page to have on my frontend. I then have to use *inlines*, and
customize *functions* and *custom admin classes*

### Sites that I am getting inspiration from

- Medium.com
- Notion.io

### User stories

- ? What really is user stories?


## Big current problems

---

# The Frontend

## The pages

This is the pages that I have on my frontend. Here are the functionalities I have and the ones that are missing.

### Index

I supposed to: List all avaible posts and have the option to filter and search through the posts
to find the ones that the web client is interrested in.

There is also a user sidebar where the currently saved posts are, and some other general information about the user.

**TODO**

- [ ] Make the whole URL reflect on all of the filters used - and the search done
  - [ ] Should maybe have an array in a store that saves all of the options taken
  - [ ] Should have a *watcher* that makes sure that all of the query parameters the url have is being stored
    - [ ] And somehow then reflect that in checkboxes? - dont know how
  - [ ] Should have a watcher that reflects the changes made by filters into the URL so it's a **two way** communication



## The Backend

### Search and filter functionality


### models.py

**CustomUser** ->
- [ ]

---

- [ ] Make it possible to save images in code editor to database here

---



---

### Serializers og views



---

**Postman**



---

### admin.py - Admin Panel


---

### General


---

## The Frontend




> Try to use 'red (fail), green (barely work), refactor (work)' - TTD (and don't mock in components - just do direct manipulation (it is not best practise, but most benefiel here))

---

### ListArticlesSidebar

- **Vis korrekt, av og for brukeren**:



---

### [id] single post




### [id] user page



---

### min-side


---

### index



---



---



### text editor


---

### API

- [ ] Make a ***common method*** for POST, GET, DELETE, PATCH that the composables can use - this is so I can use a different api
  fetch later if I would want to do that.
- [x] Take all of the **API fetching on the page level**
- [ ] use a method to access and save to local storage easoer
- [ ] make get(crud) composables to use a common library that is of a composable, so if I want to change from 'axios' to something else, it'll be easy
- [ ] Maybe move the api logic to the store?

- When i am retrieving tokens from **LocalStorage**, all of my fetching becomes on the client side.
  - The means *initial load* can be very slow
- Put fetching at PAGE-LEVEL
  - I should fetch my api data at the page level, so I centralize the data-fetching logic and makes it easier to **manage state**
- If a component required data that ISN'T shared with other components, it might be best to just have it there, inside the component
- Seperate the api fetching into: place fetching.., function that does the fetching
- Follow having a hybrid apporach to where to placing the api logic.
  - one main for common API, logic, headers, configurations, maybe tokens
  - another for specific areas (maybe the different endpoints)
- Follow DRY (Don't Repeat Yourself) for API
- Fetching data on the **server-side** is best for performance and SEO
- Use state management, pinia

---

## General

- [~] Ta code snippets som du bruker med **Vue Test Utils**, og i **Postman** og legg dem systematisk på Notion
- [~ jobber med det] Documentere ordentlig alle sidene og composables
- [ ] Expand the registration form to include more information options
- [x] Fix the emit between new post and editorcard when it comes to border color and such
- [ ] Rydde opp i alle composables
- [x] Dele opp stores
- [ ] Find a workaround for **the problem that all of the fetching is happening from the client side**
  - [ ] split the onMounted hooks for ones reqairing auth, and the ones not requiring it
    - But all require it..
    - Or maybe cachin in some hay?
- [ ] Gi en error message som sier at "denne brukeren fins ikke" når noen prøver å access */user/enbrukersomikkefins*

---

### Composables

- [ ] Slette ubrukte composables
- [ ] Lage en "hybrid appraoch" til composables
  - [ ] Sette sammen composables slik at det blir mer enklere

### thoughts

There are features I generally want to implement, but not sure how.

- there is no mobile support

- Comments have no functionality right now

  - What kind of backend api-endpoints do I need for that? I need to be able to:
    - Retrieve all comments to a post.
      - Se på medium.com

- Hva skjedde med _likes_?

- I want to avoid layout shifts when fetching from api:
  - I can do v-if="all of the api variables"
  - Skeleton loaders

- Text editor for publishing posts
- maybe relevant [simplemde](https://simplemde.com/)

- i should try to follow the best practice for pinia and store
  - that might be to have all the logic, all of the functions inside the store and not do **store.functionOrVariable = something**

Not so important right now:

- Make the loading, and **_lazyloading_** much better

- [ ] Find out how I want implement "**text editor**"
  - I have to fix/tweak the editor to be able to provide a smooth user experience when trying to make a post
  - ~~Should I continue with **TiptapEditor** or use something else like **simplemde**?~~
- Should I remove the images that are listed on the feed/index

(I want users to be able to 'like' other posts.
(Share? - much later in project at least))

- new posts by the people you follow? - in listarticlessidebar? idea

- Vil bruke 

ide:

- hover or a title og så kommer content descirption under?
- second title? / brief description

---

---

### In medium

- **For you** | **Following** - | Cybersecurity | Society | Coding | Mental Health | Psychology | Equality | Web Development | Deep Learning | Mindfulness | Spirituality | Philosophy | Data Visualization | Math | Science | Self Improvment | Data Science | Programming
