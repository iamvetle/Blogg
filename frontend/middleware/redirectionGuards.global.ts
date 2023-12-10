
/**
 * ! Does it help make server side rendering work on certain paths?
 * 
 * ---
 * 
 * **First**: Redirection rules
 * 
 * These are "path guards", or redirection rules. 
 * 
 * The redirection rules makes sure that the web client doesn't
 * access paths that they are not allowedd to access, and that they
 * are then redirect to the correct path, "equivelant".
 */

/**
 * This is **GLOBAL middleware** and will be executed BEFORE everything.
 */

//@ts-ignore
export default defineNuxtRouteMiddleware((to, from) => {

	const authStore = useAuthStore()

	// The path we are elaving from
	const fromPath = from.path
	// The path we are trying to access
	const toPath = to.path

	/** 
	 * Checks if the web client is authenticated and then either requets or accepts the path request 
	 * 
	 * If true, ACCEPT the navigation
	 */
	const checkIfAuthenticatedAndRedirect = (): any => {
		if (process.client) {
			authStore.authStoreSetup()

			// checks if the web client is authenticated
			if (authStore.isAuthenticated) {
				// go to the desired path
				return navigateTo(toPath)
			} else {
				// go nowhere - redirect to same path?
				return navigateTo(fromPath)
			}
		}
	}

	/** 
	 * The oppistes of "checkIfAuthenticatedAndRedirect" 
	 * 
	 * If true, STOP the navigation, and redirect
	 * 
	 */
	const checkIfAuthenticatedAndStopRedirect = (): any => {
		if (process.client) {
			authStore.authStoreSetup()

			// checks if the web client is authenticated
			if (authStore.isAuthenticated) {
				// go to the desired path
				return navigateTo(fromPath)
			} else {
				// go nowhere - redirect to same path?
				return navigateTo(toPath)
			}
		}
	}

	/**
	 * * Paths that doesn't need authentication 
	 * 
	 * -- "/"
	 * -- "/[id] (post)"
	 * -- "/[id] (user)"
	 */

	/** Paths that NEED authentication */
	if (to.path === "/minkonto") {
		return checkIfAuthenticatedAndRedirect()
	} else if (to.path === "/newpost") {
		return checkIfAuthenticatedAndRedirect()
	}

	/** Paths that if IS AUTHENTICATED do redirect */
	if (to.path === "/registrer") {
		return checkIfAuthenticatedAndStopRedirect()
	} else if (to.path === "/login") {
		return checkIfAuthenticatedAndStopRedirect()
	} else if (to.path === "/wait") {
		return checkIfAuthenticatedAndStopRedirect()
	}

	/** Just redirect to different place */
	if (to.path === "/loggut") {
		const authStore = useAuthStore()

		if (process.client) {
			// checks if the web client is authenticated
			if (authStore.isAuthenticated) {
				// go to the desired path
				return navigateTo(toPath)
			} else {
				return navigateTo("/login")
			}
		}
	}
});
