

There are two ways that I can mirror the api request I make to the backend, and the (local) route url in the browser

Either I can:

- Construct the api request based on the browser URL
OR
- Construct the browser URL based on the api request

Right now I am basically making the api request first, and then construct the browser URL. I think that is the wrong way to do it.

**I should construct the API request URL out of the route url that I have in the browser**

The difficult part is making trying to figure out how I can construct the browser URL on the run. I want to have a better overview.

I think the best way for me is to use ***api/server/*** routes. Something I have not tried before, but that might help. This way, I think, 
I will be able to make it more easier to construct the **api url** *from* the route browser URL instead.


*! ALSO: **I SHOULD MAYBE REVERT TO THE START, OR AT LEAST A WHILE BACK, IN THE GIT COMMITS, BECAUSE I HAVE NO OVERVIEW OVER WHERE FETCHING IS DONE**
