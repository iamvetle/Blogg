import axios, { type AxiosResponse } from 'axios'
/**
 * getMethod sends a GET request to a specified url, with a possibly custom header
 * 
 * @param url The url that the request is going to
 * @param header The header that is going to be passed together with the fetch
 */
export const getMethod = async (url:string, headers?:object): Promise<AxiosResponse | null> => {
    
    try {
        let response:AxiosResponse = await axios.get(url, { headers })
        // console.log(toRaw(response)) // print to self

        if(response.status !== null) {
            // console.log(`Request to ${url} returned ${response.status}`) // print to self
        }

        if(response.data === null) {
            // console.log(`The request to ${url} was returned with 'null' data:`, response.data) // print to self
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
    } catch (e:unknown) {
        console.error(`An error occured when trying to send a request to ${url}`, e)
        // console.error('The headers used was:', headers)

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

export const deleteMethod = async (url:string, headers?:object): Promise<AxiosResponse | null> => {
    
    try {
        let response:AxiosResponse = await axios.delete(url, { headers })
        // console.log(toRaw(response)) // print to self

        if(response.status !== null) {
            // console.log(`Request to ${url} returned ${response.status}`) // print to self
        }

        if(response.data === null) {
            // console.log(`The request to ${url} was returned with 'null' data:`, response.data) // print to self
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
    } catch (e:unknown) {
        console.error(`An error occured when trying to send a request to ${url}`, e)
        // console.error('The headers used was:', headers)

        /**
         * If the request is failed, the error is returned.
         */
        return null
    }
} 