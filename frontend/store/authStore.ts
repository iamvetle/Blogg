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
        return Boolean(token.value);
    });

    /** 
     * Watch for changes in localStorage and update the token accordingly.
     */
    watchEffect(() => {
        if (process.client) {
            const tokenFromStorage = localStorage.getItem('token');

            // Update token if present in localStorage
            token.value = tokenFromStorage ?? '';
        }

    });

    /** 
     * Watch for changes in localStorage and update the username accordingly.
     */
    watchEffect(() => {
        if (process.client) {
            const usernameFromStorage = localStorage.getItem('username');

            // Update username if present in localStorage
            username.value = usernameFromStorage ?? '';
        }

    });

    /**
     * Sets the authentication token in localStorage.
     * @param tokenInput - The authentication token.
     */
    const setTokenToLocalStorage = (tokenInput: string): void => {
        const tokenValue = tokenInput ?? '';
        localStorage.setItem('token', tokenValue);
    }

    /**
     * Sets the username in localStorage.
     * @param usernameInput - The username.
     */
    const setUsernameToLocalStorage = (usernameInput: string): void => {
        const usernameValue = usernameInput ?? '';
        localStorage.setItem('username', usernameValue);
    }

    /** 
     * Removes the authentication token from localStorage and sets the authentication state to false.
     */
    const removeTokenFromLocalStorage = (): void => {
        localStorage.removeItem('token');
    }

    /** 
     * Removes the username from localStorage.
     */
    const removeUsernameFromLocalStorage = (): void => {
        localStorage.removeItem('username');
    }

    /** 
     * Retrieves the authentication token.
     * @returns - The authentication token or null if empty.
     */
    const retrieveToken = (): string | null => {
        return token.value === '' ? null : token.value;
    }

    /** 
     * Sets up the initial state based on the localStorage token on component mount.
     */
    const authStoreSetup = (): void => {
        console.log('authStoreSetup was actually called');
        const tokenFromLocalStorage = localStorage.getItem('token');
        console.log(tokenFromLocalStorage);

        // Assign an empty string, "", if there was no localStorage token
        token.value = tokenFromLocalStorage ?? '';
    };

    /** 
     * Returns the computed property and the reactive variable for external use.
     */
    return {
        isAuthenticated, token, username,
        setUsernameToLocalStorage, setTokenToLocalStorage,
        removeTokenFromLocalStorage, removeUsernameFromLocalStorage,
        retrieveToken, authStoreSetup
    };
});
