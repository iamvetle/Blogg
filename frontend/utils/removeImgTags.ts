/**
 * Removes <img> elements from an HTML string.
 *
 * @param inputString - The HTML string containing <img> elements.
 * @returns - The modified HTML string without <img> elements, or the original string if no modifications are made.
 */
export const removeImgTags = (inputString: string): string => {
    // Create a new DOM element to parse the input string
    let tempElement = document.createElement('div');
    tempElement.innerHTML = inputString;

    // Remove all <img> elements
    let imgElements = tempElement.getElementsByTagName('img');

    // Check if imgElements is not null before entering the loop
    if (imgElements) {
        while (imgElements.length > 0) {
            let imgElement = imgElements[0];
            
            // Check if imgElement's parentNode is not null before removing the element
            if (imgElement.parentNode) {
                imgElement.parentNode.removeChild(imgElement);
            } else {
                // Return the original string if parentNode is null
                return inputString;
            }
        }
    } else {
        // Return the original string if imgElements is null
        return inputString;
    }

    // Return the modified string without <img> elements
    return tempElement.innerHTML;
}
