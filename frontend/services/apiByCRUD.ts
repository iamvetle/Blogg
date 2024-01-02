/**
 * getMethod sends a GET request to a specified url, with a possibly custom header
 * 
 * @param url The url that the request is going to
 * @param header The header that is going to be passed together with the fetch
 */
export const getMethod = async (url: string, headers?: object): Promise<AxiosResponse | null> => {
    try {
        const response: AxiosResponse = await axios.get(url, { headers })
        // console.log(toRaw(response)) // print to self

        if (response.status !== null) {
            // console.log(`Request to ${url} returned ${response.status}`) // print to self
        }

        if (response.data === null) {
            // console.error(`The request to ${url} was returned with 'null' data:`, response.data) // | verbose | print to self
            console.error(`The request to ${url} was returned with 'null' data`) // print to self
        }

        /**
         * The response is returned together with the DATA and STATUS code:
         * 
         * response.data
         * response.status
         * 
         * Regardless of whatever was received. As long as the *request* was successfull
         * the response is returned  
         */
        return response
    } catch (e: unknown) {
        // console.error(`An error occured when trying to send a get request to ${url}`, e) // | verbose | print to self
        console.error(`An error occured when trying to send a get request to ${url}`) // print to self
        console.error('The headers used was:', headers) // print to self

        /**
         * If the request is failed, the error is returned.
         */
        return null
    }
}

/**
 * getMethod sends a GET request to a specified url, with a possibly custom header
 * 
 * @param url The url that the request is going to
 * @param header The header that is going to be passed together with the fetch
 */

export const deleteMethod = async (url: string, headers?: object): Promise<AxiosResponse | null> => {

    try {
        const response: AxiosResponse = await axios.delete(url, { headers })
        // console.log(toRaw(response)) // print to self

        if (response.status !=null) {
            // console.log(`Request to ${url} returned ${response.status}`) // print to self
        }

        if (response.data === null) {
            // console.error(`The request to ${url} was returned with 'null' data:`, response.data) // | verbose | print to self
            console.error(`The request to ${url} was returned with 'null' data:`) // print to self
        }

        /**
         * The response is returned together with the DATA and STATUS code:
         * 
         * response.data
         * response.status
         * 
         * Regardless of whatever was received. As long as the *request* was successfull
         * the response is returned  
         */
        return response
    } catch (e: unknown) {
        console.error(`An error occured when trying to send a delete request to ${url}`, e)
        console.error('The headers used was:', headers)

        /**
         * If the request is failed, the error is returned.
         */
        return null
    }
}

export const postMethod = async (url: string, formData: object, headers?: object): Promise<AxiosResponse | null> => {

    try {
        const response: AxiosResponse = await axios.post(url, formData, { headers })
        // console.log(toRaw(response)) // print to self

        if (response.status != null) {
            console.log(`Request to ${url} returned ${response.status}`) // print to self
        }

        if (response.data === null) {
            console.log(`The request to ${url} was returned with 'null' data:`, response.data) // print to self
        }

        /**
         * The response is returned together with the DATA and STATUS code:
         * 
         * response.data
         * response.status
         * 
         * Regardless of whatever was received. As long as the *request* was successfull
         * the response is returned  
         */
        return response
    } catch (e: unknown) {
        console.error(`An error occured when trying to send a post request to ${url}`, e)
        console.error('The headers used was:', headers)

        /**
         * If the request is failed, the error is returned.
         */
        return null
    }
}

export const patchMethod = async (url: string, formData: object, headers?: object): Promise<AxiosResponse | null> => {

    try {
        const response: AxiosResponse = await axios.patch(url, formData, { headers })
        // console.log(toRaw(response)) // print to self

        if (response.status != null) {
            // console.log(`Request to ${url} returned ${response.status}`) // print to self
        }

        if (response.data === null) {
            // console.error(`The request to ${url} was returned with 'null' data:`, response.data) // | verbose | print to self
            console.error(`The request to ${url} was returned with 'null' data:`) // print to self
        }

        /**
         * The response is returned together with the DATA and STATUS code:
         * 
         * response.data
         * response.status
         * 
         * Regardless of whatever was received. As long as the *request* was successfull
         * the response is returned  
         */
        return response
    } catch (e: unknown) {
        // console.error(`An error occured when trying to send a patch request to ${url}`, e) | verbose | // print to self
        console.error(`An error occured when trying to send a patch request to ${url}.`)
        console.error('The headers used was:', headers)

        /**
         * If the request is failed, the error is returned.
         */
        return null
    }
}
