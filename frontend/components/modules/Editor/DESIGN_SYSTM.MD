
## Aproprate function names

### When buttons call functions

"handle" + Function + "Method"

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