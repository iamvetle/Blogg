
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
- dev.?

### User stories

- ? What really is user stories?

## Big advances

- [ ] Make the whole URL reflect on all of the filters used - and the search done


## Big current problems

---

# The Frontend

## The pages

This is the pages that I have on my frontend. Here are the functionalities I have and the ones that are missing.

### Index

I supposed to: List all avaible posts and have the option to filter and search through the posts
to find the ones that the web client is interrested in.

There is also a user sidebar where the currently saved posts are, and some other general information about the user.

## URL Reflection

- [ ] Make the whole URL reflect on all of the filters used - and the search done
  - [ ] ? Should maybe have an array in a store that saves all of the options taken
  - [ ] Should have a *watcher* that makes sure that all of the query parameters the url have is being stored
    - [ ] And somehow then reflect that in checkboxes? - dont know how
  - [ ] Should have a watcher that reflects the changes made by filters into the URL so it's a **two way** communication

---

### /[id] single post

**when web clients not logged in**

- [ ] Can still read posts
- [ ] Can NOT make comment
- [ ] Can NOT save post

- * * 

- [ ] Implement **skeleton loader**

---

### /[id] user page

**when web clients not logged in**

Implement these:

- [ ] Can view all the posts the user has made
- [ ] Can NOT follow user
- [ ] Can NOT follow user
- [ ] Can NOT save any of the posts

- * * 

- [ ] Implement **skeleton loader**

---

### /minkonto

- [ ] Implement **skeleton loader**

---

### feed/index

- [x] Find out how I want implement "**text editor**"
  - [ ] I have to fix/tweak the editor to be able to provide a smooth user experience when trying to make a post
    - dont know how yet

---

**when web clients not logged in**

Implement these:

- [ ] Can still read the feed posts
- [ ] But doesn't have a sidebar
- [ ] Can't save posts
- [ ] The navbar doesnt have icons such as "new post"

- * *

- [ ] Implement **skeleton loader**

---

### /newpost - text editor

- [ ] Implement **skeleton loader**


---

### /registrer - text editor

- [x] Expand the registration form to include more information options
(do i want it to be more like notion - notion editor and wordish editors are very different)

- * *

- [ ] Implement **skeleton loader**

---

### API

- [x] Make a ***common method*** for POST, GET, DELETE, PATCH that the composables can use - this is so I can use a different api
  fetch later if I would want to do that.
- [x] Take all of the **API fetching on the page level**
- [x] use a composable to access and save to local storage easoer


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

### Composables

- [x] Slette ubrukte composables
- [x] Lage en "hybrid appraoch" til composables hvor jeg seperate axios fetching to a different file

---

## General

- [~] Ta code snippets som du bruker med **Vue Test Utils**, og i **Postman** og legg dem systematisk på Notion
- [~ jobber med det] Documentere ordentlig alle sidene og composables
- [x] Fix the emit between new post and editorcard when it comes to border color and such
- [x] Rydde opp i alle composables
- [x] Dele opp stores

- [ ] Gi en error message som sier at "denne brukeren fins ikke" når noen prøver å access */user/enbrukersomikkefins*

---

# The Backend

---

### models.py

---

### regarding the text editor logic on the backend

- [x] Make it possible to save images in code editor to database here
  - [x] Convert the img elements sources to have the correct local database sources
  - [x] Compress and turn into webp format
  - [x] Through copy pasting in text editor
  - [x] And through file upload

---

> Try to use 'red (fail), green (barely work), refactor (work)' - TTD (and don't mock in components - just do direct manipulation (it is not best practise, but most benefiel here))

---

### thoughts

- should I django test the backend with unittest?
- should I do DRF type of testing?

- there is no mobile support (unsure how to implement..)

- Do I want *likes*?

- Should I switch do a different authentication system?
  - TODO: Find out if I still have to do the fetching on the client side - with onMounted

- am I following the best **pinia** practices?

- When i am retrieving tokens from **LocalStorage**, all of my fetching becomes on the client side.
  - The means *initial load* can be very slow

**Not so important right now:**

- Make the loading, and **_lazyloading_** much better


- Should I remove the images that are listed on the feed/index

(I want users to be able to 'like' other posts.
(Share? - much later in project at least))

- new posts by the people you follow? - in listarticlessidebar? idea

- Vil bruke 
- hover or a title og så kommer content descirption under?
- second title? / brief description

---

### In medium

- **For you** | **Following** - | Cybersecurity | Society | Coding | Mental Health | Psychology | Equality | Web Development | Deep Learning | Mindfulness | Spirituality | Philosophy | Data Visualization | Math | Science | Self Improvment | Data Science | Programming

