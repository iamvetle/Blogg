//@ts-ignore
import { JSDOM } from 'jsdom'

/**
 * The function takes the html input and returns only the raw text
 *
 * @param - The actual post content (not title) the should be turned into just raw text
 *
 * @returns - the raw text of the html
 */
export default function (htmlContent: string) {
    // Creates a "fake" document (that I can use server side)
	const dom = new JSDOM(htmlContent);
	const rawText = dom.window.document.body.textContent
	return rawText
};