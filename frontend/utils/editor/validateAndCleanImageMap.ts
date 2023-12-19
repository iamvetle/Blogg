import { removeImageFromMap } from "./removeImageFromMap";

/**
 * The function goes through the images in imageFileMap and removes the ones that does not have an id
 * that is mentioned in an "alt" attribute in an "img" element
 * 
 * @param htmlContent - The html content
 * @param imageFileMap - The list containing the object of image files
 */
export const validateAndCleanImageMap = (htmlContent: any, imageFileMap:any) => {
	let parser = new DOMParser();
	let doc = parser.parseFromString(htmlContent, 'text/html');
	let imagesInContent = doc.querySelectorAll('img');

	// Create a set of all image IDs present in the HTML content
	let imageIdsInContent = new Set();
	imagesInContent.forEach(img => {
		let imageId = img.getAttribute('data'); // Assuming 'data' is used for storing the image ID
		if (imageId) {
			imageIdsInContent.add(imageId);
		}
	});

	// Iterate over the keys in imageFileMap
	Object.keys(imageFileMap).forEach(imageId => {
		// Check if the image ID is not present in the HTML content
		if (!imageIdsInContent.has(imageId)) {
			// Remove the image from imageFileMap as it's not in the editor
			imageFileMap = removeImageFromMap(imageId, imageFileMap);
			console.log(`Image with ID ${imageId} has been removed from imageFileMap.`);
		}
	});
	return imageFileMap
}