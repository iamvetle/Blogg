import { describe, it, expect } from 'vitest';
import { removeImageFromMap } from './removeImageFromMap';

describe('removeImageFromMap', () => {
    it('should remove an existing image by its unique ID', () => {
        const uniqueId = 'image1';
        const imageFileMap = {
            'image1': {/* image data */},
            'image2': {/* image data */}
        };

        const result = removeImageFromMap(uniqueId, imageFileMap);
        expect(result.hasOwnProperty(uniqueId)).toBe(false);
        expect(Object.keys(result).length).toBe(1);
    });

    it('should not modify the map if the image ID does not exist', () => {
        const uniqueId = 'nonexistent';
        const imageFileMap = {
            'image1': {/* image data */},
            'image2': {/* image data */}
        };

        const result = removeImageFromMap(uniqueId, imageFileMap);
        expect(result).toEqual(imageFileMap);
    });

    it('should return the same map if uniqueId is falsy', () => {
        const uniqueId = null;
        const imageFileMap = {
            'image1': {/* image data */},
            'image2': {/* image data */}
        };

        const result = removeImageFromMap(uniqueId, imageFileMap);
        expect(result).toEqual(imageFileMap);
    });

    it('should return the same map if imageFileMap is falsy', () => {
        const uniqueId = 'image1';
        const imageFileMap = null;

        const result = removeImageFromMap(uniqueId, imageFileMap);
        expect(result).toBeNull();
    });
});
