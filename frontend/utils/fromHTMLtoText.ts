//@ts-ignore
import {htmlToText} from 'html-to-text'

/**
 * Converts HTML string to plain text.
 * @param htmlString - The HTML string to convert.
 * @returns The plain text representation of the HTML string.
 */
export const fromHTMLtoText = (htmlString: string) => {
    // Creates a "fake" document (that I can use server side)

    return htmlToText(htmlString) || ""
};

