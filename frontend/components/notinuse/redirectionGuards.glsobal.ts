
// /**
//  * ! Effective and IN-USE?????
//  * 
//  * ---
//  * 
//  * **First**: Redirection rules
//  * 
//  * These are "path guards", or redirection rules. 
//  * 
//  * The redirection rules makes sure that the web client doesn't
//  * access paths that they are not allowedd to access, and that they
//  * are then redirect to the correct path, "equivelant".
//  */

// /**
//  * This is **GLOBAL middleware** and will be executed BEFORE everything.
//  */

// //@ts-ignore
// export default defineNuxtRouteMiddleware((to, from) => {


// 	/**
// 	 * * Paths where authentication needs to be checked:
// 	 * 
// 	 * - "/minkonto"
// 	 * - "/newpost"
// 	 * - "/loggut"
// 	 * 
// 	 * * Paths that I can fetch on the server side (they dont need authentication) - the only ones where I don't need to do process.client
// 	 * 
// 	 * - "/"
// 	 * - "[id] (post)"
// 	 * - "[id] (user)"
// 	 * 
// 	 * * Redirection
// 	 * 
// 	 * * If authenticated:
// 	 * 
// 	 * - "/login" -> "/"
// 	 * - "/wait" -> "/"
// 	 * - "/registrer" -> "/"
// 	 * 
// 	 * - "/loggut" -> "/login"
// 	 * 
// 	 * * If NOT authenticated
// 	 * 
// 	 * - "/loggut" -> "/login"
// 	 * - Everyything basically -> "/login"
// 	 * - 
// 	 */

// 	const authStore = useAuthStore()

// 	const fromPath = from.path;
// 	const toPath = to.path

// 	const pathIsTheSame = fromPath === toPath;

// 	console.log("Want to go to:", toPath) // print to self
// 	console.log("Leaving from:", fromPath) // print to self
// 	console.log("Path is the same:", pathIsTheSame) // print to self

// 	/**
// 	 * @description Checks if the web client is authenticated and redirects
// 	 * 
// 	 * If web client is authenticated they get redirected to the provided param,
// 	 * if not they stay where they are.
// 	 * 
// 	 * @param redirectPath - The path to be redirected to
// 	 */
// 	const ifAuthRedirect = (redirectPath: string) => {
// 		console.log("ifAuthRedirect function is called, where the desired path is:", redirectPath) // print to self

// 		if (process.client) {

// 			console.log("The store said that the user was NOT authenticated - so have to do an extra check with the authStore funtion") // print to self

// 			/**
// 			 * @function authStore.authStoreSetup()
// 			 * 
// 			 * Goes on the client side (process.client) and retrieves token from localStorage
// 			 * Then makes @var authStore.isAuthenticated true or not based on
// 			 * the token value.
// 			 * 
// 			 * the function has process.client inside of it, so it may not be necesarry to use process.client under - but that is not obvious, therefor it is still there
// 			 */
// 			authStore.authStoreSetup()
// 			// Makes sure we are on the client side
// 			console.log("Inside of a client process") // print to self

// 			// remember - use navigateTo() to REDIRECT, not to proceed
// 			// If the user is authentiacted they are navigated to the redirect link
// 			if (authStore.isAuthenticated) {
// 				console.log("REDIRECTED: The store - AFTER a check (withing client side) - says that the user IS authenticated (true).  So redirected to ->", redirectPath, authStore.isAuthenticated) // print to self
// 				return navigateTo(redirectPath)
// 			} else {
// 				console.log("NOT REDIRECT: The store - AFTER a check (withing client side) - says that the user is NOT authenticated (false):", authStore.isAuthenticated) // print to self
// 			}

// 		}
// 	}




// 	/**
// 	 * @description Checks if the web client is UNauthenticated and redirects
// 	 * 
// 	 * If the web client is NOT authenticated they get redirected to the provided param,
// 	 * if not they stay where they are.
// 	 * 
// 	 * @param redirectPath - The path to be redirected to
// 	 */
// 	const ifNotAuthRedirect = (redirectPath: string) => {
// 		console.log("ifNotAuthRedirect function is called, where the desired path is:", redirectPath) // print to self
// 		if (process.client) {
// 			// it is more like "if there is NOT information about whether the user is authenticated or not (although it is initially false, so...)"
// 			// first checks whether there if the user is authenticated - it automatically get's updated when it doesnt have information _-- this is hard to explain
// 			if (authStore.isAuthenticated === false) {
// 				console.log("The store said that the user was NOT authenticated - so have to do an extra check with the authStore funtion") // print to self
// 				/**
// 				 * @function authStore.authStoreSetup()
// 				 * 
// 				 * Goes on the client side (process.client) and retrieves token from localStorage
// 				 * Then makes @var authStore.isAuthenticated true or not based on
// 				 * the token value.
// 				 * 
// 				 * the function has process.client inside of it, so it may not be necesarry to use process.client under - but that is not obvious, therefor it is still there
// 				 */
// 				authStore.authStoreSetup()
// 				// Makes sure we are on the client side
// 				if (process.client) {
// 					console.log("Inside of a client process") // print to self

// 					// remember - use navigateTo() to REDIRECT, not to proceed
// 					// If the user is authentiacted they are navigated to the redirect link
// 					if (authStore.isAuthenticated === false) {
// 						console.log("REDIRECTED: The store - AFTER a check (withing client side) - says that the user is NOT authenticated (false). So redirected to ->", redirectPath, authStore.isAuthenticated) // print to self
// 						return navigateTo(redirectPath)
// 					} else {
// 						console.log("NOT REDIRECT: The store - AFTER a check (withing client side) - says that the user IS authenticated (true):", authStore.isAuthenticated) // print to self
// 					}
// 				}
// 			} else {
// 				console.log("REDIRECTED: The store said that the user was authenticated - so there is NO NEED to go 'client-side' to check further (true). So redirected to ->", redirectPath, authStore.isAuthenticated) // print to self
// 				return navigateTo(redirectPath)
// 			}

// 		}

// 	}

// 	const needToCheckAuthFirst = ["/wait", "/registrer", "/login", "/minkonto", "/wait", "/newpost", "/wait", "/loggut"]

// 	// If authenticated
// 	if (toPath === "/wait") {
// 		ifAuthRedirect("/")
// 	} else if (toPath === "/register") {
// 		ifAuthRedirect("/")
// 	} else if (toPath === "/login") {
// 		ifAuthRedirect("/")
// 	}

// 	// If NOT authenticated
// 	if (toPath === "/minkonto") {
// 		ifNotAuthRedirect("/wait")
// 	} else if (toPath === "/newpost") {
// 		ifNotAuthRedirect("/wait")
// 	} else if (toPath === "/loggut") {
// 		ifNotAuthRedirect("/login")
// 	}
// });

