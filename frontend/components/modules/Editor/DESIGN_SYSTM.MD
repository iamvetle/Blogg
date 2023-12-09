
https://vueschool.io/articles/vuejs-tutorials/how-to-structure-a-large-scale-vue-js-application/

### Other

Try to make the component names replecate the route

### Naming basic elements 

- All basic elements goes inside of a component with a "Base" prefix.

*Base* + Element

- Button
  - BaseButton
- Image
  - BaseImage

They are all in the **base** directory.

An **exeption** to this is input elements:

*Input* + Type

- Input(type of text)
  - InputText 
- Input(type of password)
  - InputPassword 
- Input(type of textarea)
  - InputTextarea

They are all in the **form** directory.


## Events

### BaseElements + allmost all other elements 

Events that come from BaseElements should be named like this.

*handle* + TheEmitName/ThePurpose + *method*

So a *click* event from a BaseElements gets named like this:

- handleAddItemClick

Or if it is by a different method:

- handleShowModalRightClick

**InputTypes**

It is slightly different with input types.

Events that comes from inputs should be named like this

*input* + *type* + TheEmitName/ThePurpose

- InputTextAddName
- InputPasswordRenameDog

## Emits

The name of emits should be just be the exact purpose of the emit.

An event that calls a function that will call an emit is named differently.

If a BaseButton calles a function that emits a "renameDog" for example

*do* + theStandardNamingConvention

- doHandleRenameDogClick

**modals**

Modals are not base elements, but still get ***handle** infront.

Modals often emit yes or no events. They should always + *confirm* or *cancel*/*abort*

modals follow the same convention except as normal but always *modal* as second/third name. The emit 

- doHandleModalConfirmDelete
- handleModalDeleteComment

### Controlling the state of models

All states controlling a modal should start with 

*show* + the name of the modal

- showConfirmDeletePost


## Aproprate function names

**handle_Click**

For example:

- handleAddImageClick()
- handleConfirmClick() 

### emit events and functions naming

**the child component**

Calling a function *calling* the emit:

"do" + (emit)Function

For example:

- doConfirmPublication()
  
**the actual emit**:

    - confirmPublication

**the parent component**

function + "Message"

**the parent component - but from a modal**

function + "Modal" + "Message"

### Showing and hidding things

is always "state"

show + ThingToHide


### In general:

**naming functions**

first: most specific
second: general
third: element
fourth: method (click for example)

**url**

always URL at the end


function + URL

or

const + URL

**modals**

show + Modal

always

**emits that are going to spawn a modal**

try + functioname + message


## Composables

If api related

the method first

for example:

- post
- get


## $refs - or template refs

always have "ref" at the end

## Typescript

Try to NOT use <any> as much as possible