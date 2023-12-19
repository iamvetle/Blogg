/**
 * The function removes the image that has the id of uniqueId
 * 
 * @param uniqueId - The id that is going to be used to find the correct image
 * @param imageFileMap - The list of images
 * @returns - The new list of images after the correct one has been deleted
 */
export const removeImageFromMap = (uniqueId: any, imageFileMap:any) => {
	// Check if the image with the given ID exists in the map
    if (uniqueId && imageFileMap) {
        if (imageFileMap.hasOwnProperty(uniqueId)) {
            delete imageFileMap[uniqueId]; // Remove the image from the map
            return imageFileMap
        } else {
            return imageFileMap
        }
    }

    return imageFileMap
}