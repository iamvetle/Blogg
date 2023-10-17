# Things I want to implement into my Blogg project

There are stuff I want the web client to be able to do, that I have not yet implemented. There are also things I want my blogg application to be able to do.

Det jeg tenker aller mest på at jeg savner i blogg-appen min, er evnen til å sortere etter tags. 
Det er den tingen jeg savner mest og hva jeg ønsker å fokusere på.

### Implementere tags sortering/søk
- [ ] Jeg trenger å finne ut hvordan jeg kan lage **dropdown** meny

---

- [x] Jeg ønsker å få **admin panel** til å bli en inspirasjon på hvordan jeg ønsker å ha bloggen min.

## Backend

### models.py

- **CustomUser** ->
- [ ] new field: profile picture upload / img upload

---

- [ ] Make it possible to save images in code editor to database here

---

- [x] Make a '**tag**' model and connect to the '**post**' model through a manytomany field on
- [x] **Tag** : new model. Create a new 'tag' model and connect it to CustomUser (and or post?)
- [x] **Categories** : new model. Connect to CustomUser (or post?)
- [x] Make it so users can **save posts** for reading later.
- [x] --and unsave
  - [x] Lage en ny modell (saved_post) \*models.py
    - [x] Registrer den i admin.py
  - [x] Lage en ny serializer for den modellen
  - [x] urls.py
  - [x] views.py
  - [x] views.py for den
  - [x] Legge rute fram til viewen slik at man kan nå den
    - [x] Få det til å fungere med postman

---

### Serializers og views

- [x] Endre navnene til dem til noen mer RELEVANTE og mer passende. Så jeg forstår bedre

---

**Postman**

Vil dokumentere flere api endpointer for meg selv, slik at jeg kan få større oversikt.
- [x]

---

### admin.py - Admin Panel

- [x] Få tags og categories som er assosiert med en post til å vises i post list i admin panel

---

## Frontend


**'fetchen' på api personlig bruker backend**

- [x] **Antallet** lagrede innlegg inkluderes
- [x] **Tittelen** og **forfatteren** må også returneres
- [x] API backend trenger å returnere postene som bru|keren har **lagret**
- [x] Make the api return '**following**'
  - [x] and **who** I am followoing

> Try to use 'red (fail), green (barely work), refactor (work)' - TTD

- [x] Render the created posts in '[id]' with propper html. So it can actually display each post correctly.
- [ ] Fjern 'searchRequest' og 'searchPagnation' (det som er igjen)
- [ ] Implementere en pop-window som kommer når visse handlinger blir gjort. Trykker 'post', sender inn skjema, registrerer, osv.
- [ ] Fikse en type **historie** for å holde postene og artiklene på plass når web client ytter side
  - keep-alive?

---

### ListArticlesSidebar

- **Vis korrekt, av og for brukeren**:
  - [x] Antallet lagrede posts
  - [x] Lagrede posts
  - [x] Antall _følgere_
  - [x] Antall _jeg følger_
  - [x] Brukerne, navnene til de jeg følger
  - [ ] Finne ut av hva jeg skal gjøre med "**_les mer_**" feltet. Skal jeg bli 'redirected' et sted?
    - [ ] Legge til (x), '***total antall***'
  - [x] make it possible to go to the posts that I have saved


---

### [id] single post

- [ ] Vise alle **taggene** som er assosierte med posten
- [ ] Mulighet til å **følge** forfatteren derifra
- [ ] Muligheten til å **lagre post** derifra også
- [ ] Kan se kommentarer
- [ ] Kan lage kommentar
  - Kan kikke rund på andre blogg-lignende plattformerer og **_se hvordan de har 'kommentarer'_**
- Recommendations/post av samme fyr på bunnen?

### [id] user page

- [ ] Fix api fetching so it becomes correct 
- [x] Pengjøre veldig og rydd opp.
- [~] Fjern spor av tidligere prop og slett den gamle component.
- [ish] Ønsker å få den **følg** og **slutt å følg** funksjonen til å fungere
- [ ] Lage en ordentlig side for den
- [ ] fix pagnation - find out if it is necesarry, and if how to have it in that case
  - should I make a new one? or take an old one

---

### min-side

- [x] Change the **personal posts** that are received in 'min-side' to be snippets
- [ ] Put pagnation there if the users have a lot of posts
- [ ] Give users the ability to edit their own posts
  - How?
    - i should probebly make it possible to make propper posts first
  - 
- [ ] Fix the pagnation bottom bar that currently has no functionality

---

### index

- [x] The post snippets **renders the elements** \<h1\> and such which they are not supposed to do. Fix that.
  - But far from perfect!!
- [x] Place a temperary profile picture in the user sidebar (the same on as in min-side)
- [x] There is a '**date_published**' problem that interfers with ordering that I need to fix.

  - [x] Split '**aside**' from 'ListArticles', so it becomes two components instead.

- [x] Ønsker at en post i listen ved feed kan fortelle, "si" om den har blir lagret av den aktuelle brukeren eller ikke
  - "**mørkere icon**" hvis lagret

---

- [ ] Hvis en post har blitt lagret med et bilde ønsker jeg at bilde tas med i post snippets, men hvis ikke den har bilde, listes den uten

---

- [x] -> Implementere "tags" eller categories inn i "search" eller "sorter"
  - Sorter og søk kan kanskje være det samme. Tags og categories kan kanskje også være det.

---

**Sortere/finne artikler etter tags/categories**

- [x]ish Først lage en prototype hvor jeg lister **alle tagsa** og så kan jeg velge **én** som jeg kan sortere etter
  - deretter øke derifra
  - kanskej dropdown
  - kanskje velge flere eller bare en,
  - favoritter, eller populære?

---

- [X] Gi en bruker muligheten, en knapp de kan trykke på
  - Helt svart hvis lagret, delvis hvit hvis ikke lagret. ide
    hver post, for å **lagre** en post
  - [X] Trenger å lage en **_fetch call_** for den
- [X] Muligheten for en bruker til å **fjerne** en post som de har lagret

### text editor

- [x] When **_making a post_** I want the styling to be the same
  - [x] Also the width. So when creating the post it looks like it will be rendered.
- [ ] The **posting functionality** i want it to be obvious when a post was SUCCESSFULL, or when it FAILED.
- Make it possible for the user to **add pictures** when making post
  - I don't want to focus on adding and rendering images until later
- idea but probebly not: Maybe remove 'title' input field and just use 'content'

---

## General

- [ ] Expand the registration form to include more information options
- [ ] Fix the emit between new post and editorcard when it comes to border color and such
- [ ] fix the connection bettwen the search composables and the related components, integrate more, properly
- [ ] Rydde opp i alle composables
- [ ] Dele opp stores

### thoughts

There are features I generally want to implement, but not sure how.

- Comments have no functionality right now

  - What kind of backend api-endpoints do I need for that? I need to be able to:
    - Retrieve all comments to a post.
      - Se på medium.com

- Hva skjedde med _likes_?

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
