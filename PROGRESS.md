# Things I want to implement into my Blogg project

There are stuff I want the web client to be able to do, that I have not yet implemented. There are also things I want my blogg application to be able to do.

I am focusing on **frontend** at the moment.

## Backend

### models.py

- **CustomUser** ->
- [ ] new field: profile picture upload / img upload
- [ ] Make it possible to save images in code editor to database here

---

- [x] Make a '**tag**' model and connect to the '**post**' model through a manytomany field on
- [x] **Tag** : new model. Create a new 'tag' model and connect it to CustomUser (and or post?)
- [x] **Categories** : new model. Connect to CustomUser (or post?)
- [ ] Make it so users can **save posts** for reading later.
  - [x] Lage en ny modell (saved_post) *models.py
    - [x] Registrer den i admin.py
  - [x] Lage en ny serializer for den modellen
  - [x] urls.py
  - [x] views.py
  - [x] views.py for den
  - [x] Legge rute fram til viewen slik at man kan nå den
    - [x] Få det til å fungere med postman

---

- [ ] Ønsker at en post i **listen ved feed** kan fortelle, "si" om den har blir lagret av den aktuelle brukeren eller ikke
  - "***stjerne***" hvis lagret 

###  

***'fetchen' på api personlig bruker backend***:

- [x] **Antallet** lagrede innlegg inkluderes
- [x] **Tittelen** og **forfatteren** må også returneres 
- [x] API backend trenger å returnere postene som brukeren har **lagret** 
- [x] Make the api return '**following**'
  - [x] and **who** I am followoing

## Frontend

> Try to use 'red (fail), green (barely work), refactor (work)' - TTD

- [x] Render the created posts in '[id]' with propper html. So it can actually display each post correctly.
- [ ] Fjern 'searchRequest' og 'searchPagnation' (det som er igjen)
- [ ] Implementere en pop-window som kommer når visse handlinger blir gjort. Trykker 'post', sender inn skjema, registrerer, osv.

### ListArticlesSidebar 

- **Vis korrekt, av og for brukeren**:
  - [x] Antallet lagrede posts
  - [x] Lagrede posts
  - [x] Antall *følgere*
  - [x] Antall *jeg følger*
  - [x] Brukerne, navnene til de jeg følger
- [ ] Gi en bruker muligheten, en knapp de kan trykke på hver post, for å **lagre** en post
- [ ] Muligheten for en bruker til å **fjerne** en post som er lagret

---

### [id] user page

- [ ] Pengjøre veldig og rydd opp.
- [ ] Fjern spor av tidligere prop og slett den gamle component.

---

### min-side

- [x] Change the **personal posts** that are received in 'min-side' to be snippets
- [ ] Put pagnation there if the users have a lot of posts
- [ ] Give users the ability to edit their own posts

---

### index

- [x] The post snippets **renders the elements** \<h1\> and such which they are not supposed to do. Fix that.
  - But far from perfect!!
- [x] Place a temperary profile picture in the user sidebar (the same on as in min-side)
- [x] There is a '**date_published**' problem that interfers with ordering that I need to fix.
  - [x] Split '**aside**' from 'ListArticles', so it becomes two components instead.

### text editor

- [x] When **_making a post_** I want the styling to be the same
  - [x] Also the width. So when creating the post it looks like it will be rendered.
- [ ] The **posting functionality** i want it to be obvious when a post was SUCCESSFULL, or when it FAILED.
- Make it possible for the user to **add pictures** when making post
  - I don't want to focus on adding and rendering images until later
- Maybe remove 'title' input field and just use 'content'

---

### General

- [ ] Expand the registration form to include more information options
- [ ] Fix the emit between new post and editorcard when it comes to border color and such

### thoughts

There are features I generally want to implement, but not sure how.

- Comments have no functionality right now

- Text editor for publishing posts
- maybe relevant [simplemde](https://simplemde.com/)

Not so important right now:

- Make the loading, and **_lazyloading_** much better

- [ ] Find out how I want implement "**text editor**"
- Should I continue with **TiptapEditor** or use something else like **simplemde**?
- Should I remove the images that are listed on the feed/index


(I want users to be able to 'like' other posts.
(Share? - much later in project at least))

---

---

### In medium

+ **For you** | **Following** - | Cybersecurity | Society | Coding | Mental Health | Psychology | Equality | Web Development | Deep Learning | Mindfulness | Spirituality | Philosophy | Data Visualization | Math | Science | Self Improvment | Data Science | Programming