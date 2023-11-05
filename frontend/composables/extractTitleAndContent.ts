interface TitleAndContentType {
    title:string | null;
    body: string | null;    
}

/**
 * Turns html data input and seperates the first element based on criteria.
 * The title and body are then returned.
 * 
 * @param htmlFromEditor - The HTML that is going to be processed
 * @returns - Either null or an object of instance TitleAndContentType
 */
export const extractTitleAndContent = (htmlFromEditor: string): TitleAndContentType | null => {
    
    /** If a different primitive than string was provided null(s) is returned*/
    if (typeof htmlFromEditor !== "string" ) {
        const title = null
        const body = null
        console.log("The input was not a string") // print to self
        alert("theinput was not a string")
        return { title, body }
    };

    const domParser = new DOMParser();
    const doc = domParser.parseFromString(htmlFromEditor, "text/html");

    let title:string | null = '';
    let body: string | null = '';

    /** The tags the the title element is allowed to be */
    const allowedTags = ['H1', 'H2', 'H3']

    /** Assigns the first element of the document (htmlFromEditor) */
    const firstElement = doc.body.firstChild;
    alert(firstElement)
//@ts-ignore
    // Checks if that element is a part of the allowed elements list //@ts-ignore
    if (firstElement && allowedTags.includes(firstElement.tagName)) {
        /** It takes the element and returns only the text part of it with the tag (h1, h2, h3) */
        title = firstElement.textContent;

        /** The 'title' part is then removed from the doc */
        firstElement.remove();

        /** 
         * This makes it so that only the HTML within the body element
         * <body> It all of the html in here and assign it as the new body</body>
         */
        body = doc.body.innerHTML;
    }
    /** 
     * The title is returned as one of the elements in allowedTags,
     * while body is the rest of the document
     * 
    */
    return { title, body };
}
