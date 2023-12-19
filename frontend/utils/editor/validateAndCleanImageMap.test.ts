import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { validateAndCleanImageMap } from './validateAndCleanImageMap';
import { removeImageFromMap } from './removeImageFromMap';
import { Window } from 'happy-dom'

// Mock removeImageFromMap
vi.mock('./removeImageFromMap', () => ({
    removeImageFromMap: vi.fn((id, map) => {
        delete map[id];
        return map;
    }),
}));

let window;
let document;

describe('validateAndCleanImageMap', () => {

    beforeEach(() => {
        // Setup HappyDOM
        window = new Window();
        document = window.document;
        (global as any).DOMParser = window.DOMParser;
    });

    afterEach(() => {
        // Clean up
        (global.DOMParser as any) = undefined;
        vi.clearAllMocks();
    });

    it('should remove images not present in HTML content', () => {
        const htmlContent = `<div><img data="1"></div>`;
        let imageFileMap = { "1": "Image1", "2": "Image2" };

        const result = validateAndCleanImageMap(htmlContent, imageFileMap);

        expect(result).toEqual({ "1": "Image1" });
        expect(removeImageFromMap).toHaveBeenCalledWith("2", imageFileMap);
    });

    // Additional test cases...
});
