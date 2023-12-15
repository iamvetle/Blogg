import { defineStore } from 'pinia';

/**
 * @fileoverview
 * This file defines a Pinia store for managing authentication-related state in a Nuxt 3 application.
 */

export const useAuthStore = defineStore('Auth Store for managing authentication-related state', () => {

    /** Stores the authentication token. */
    const token = ref('');

    /** Stores the username of the logged-in user. */
    const username = ref('');

    /**
     * Computed property reflecting the current authentication status.
     * @returns - The authentication status.
     * 
     * This property is automatically updated based on the presence of the authentication token.
     */
    const isAuthenticated = computed(() => {
        return token.value.length > 1 ? true : false
    });

    /** 
     * Watch for changes in localStorage and update the token accordingly.
     */
    watchEffect(() => {
        if (process.client) {
            const tokenFromStorage = localStorage.getItem('token');

            // Update token if present in localStorage
            if (tokenFromStorage === "") {
                token.value = "";
            } else {
                token.value = tokenFromStorage ?? ""
            }
        }

    });

    /** 
     * Watch for changes in localStorage and update the username accordingly.
     */
    watchEffect(() => {
        if (process.client) {
            const usernameFromStorage = localStorage.getItem('username');

            // Update token if present in localStorage
            if (usernameFromStorage === "") {
                username.value = "";
            } else {
                username.value = usernameFromStorage ?? ""
            }
        }

    });

    /**
     * Sets the authentication token in localStorage.
     * @param tokenInput - The authentication token.
     */
    const setTokenToLocalStorage = (tokenInput: string): void => {
        const tokenValue = tokenInput;
        localStorage.setItem('token', tokenValue);
    }

    /**
     * Sets the username in localStorage.
     * @param usernameInput - The username.
     */
    const setUsernameToLocalStorage = (usernameInput: string): void => {
        const usernameValue = usernameInput;
        localStorage.setItem('username', usernameValue);
    }

    /** 
     * Removes the authentication token from localStorage and sets the authentication state to false.
     */
    const removeTokenFromLocalStorage = (): void => {
        localStorage.removeItem('token');
        token.value = ""
    }

    /** 
     * Removes the username from localStorage.
     */
    const removeUsernameFromLocalStorage = (): void => {
        localStorage.removeItem('username');
        username.value = ""
    }

    /** 
     * Retrieves the authentication token. 
     * * I am doing it this way because there is so many places that depend on exactly this "null or string check if retrieve token thing?"
     * @returns - The authentication token or null if empty.
     */
    const retrieveToken = (): string | null => {
        return token.value === '' ? null : token.value;
    }

    /** 
     * Sets up the initial state based on the localStorage token on component mount.
     */
    const authStoreSetup = (): void => {
        console.log('authStoreSetup is called to check for token');
        if (process.client) {
            console.log('is now on client side');

            const tokenFromLocalStorage = localStorage.getItem('token');
            console.log(tokenFromLocalStorage);

            // Assign an empty string, "", if there was no localStorage token

            if (tokenFromLocalStorage === "") {
                token.value = '';

            } else {
                token.value = tokenFromLocalStorage ?? ""
            }

        }

    };

    /**
     * Removes any data regarding the (now not) logged in user.
     * 
     * Is used for when logging out.
     */
    const resetStore = () => {
        token.value = ""
        removeTokenFromLocalStorage()
        removeUsernameFromLocalStorage()
    }

    /** 
     * Returns the computed property and the reactive variable for external use.
     */
    return {
        isAuthenticated, token, username,
        setUsernameToLocalStorage, setTokenToLocalStorage,
        removeTokenFromLocalStorage, removeUsernameFromLocalStorage,
        retrieveToken, authStoreSetup, resetStore
    };
});
