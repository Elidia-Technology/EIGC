/*
 * The MIT License
 * Copyright (c) 2025-2026 Elidia Technology Pvt Ltd
 *
 * Author: Saleem Ahmad
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

declare module 'eigc' {
    /**
     * Elidia Technology Pvt Ltd Graphics Converter - Main class for image and document conversion
     */
    export class EIGC {
        /** Google Chrome Driver version for HTML to image conversion */
        static GOOGLE_CHROME_DRIVER_VERSION: string;
        
        /** Utility method to validate and convert values to strings */
        static validateString(value: any, defaultValue?: string): string;

        /**
         * Converts HTML pages to raster images
         * @param arguements - Configuration object for HTML to raster conversion
         * @returns Promise that resolves when conversion is complete
         */
        htmlToRaster(arguements: {
            /** Input HTML file path or URL */
            input: string;
            /** Output image file path */
            output: string;
            /** Viewport width in pixels (default: 1280) */
            width?: string | number;
            /** Viewport height in pixels (default: 720) */
            height?: string | number;
            /** DPI resolution (default: 96) */
            dpi?: string | number;
            /** Run browser in headless mode (default: true) */
            isHeadless?: string | boolean;
            /** Run browser in incognito mode (default: true) */
            isIncognito?: string | boolean;
            /** Enable multi-screen support (default: false) */
            isMultiScreen?: string | boolean;
            /** Enable long screen capture (default: false) */
            isLongScreen?: string | boolean;
            /** Current domain to replace */
            currentDomain?: string;
            /** Replacement domain */
            replacementDomain?: string;
            /** JavaScript code to inject */
            scriptToInject?: string;
            /** CSS code to inject */
            cssToInject?: string;
            /** HTML code to inject */
            htmlToInject?: string;
            /** Timeout in seconds (default: 5) */
            timeout?: string | number;
            /** Enable debug mode (default: false) */
            isDebug?: string | boolean;
            /** Crop area as "x,y,width,height" */
            cropArea?: string;
        }): Promise<string>;

        /**
         * Converts between different raster image formats
         * @param arguements - Configuration object for raster to raster conversion
         * @returns Promise that resolves when conversion is complete
         */
        rasterToRaster(arguements: {
            /** Input raster image file path */
            input: string;
            /** Output raster image file path */
            output: string;
            /** Output image format (png, jpg, gif, etc.) */
            format: string;
            /** Output width in pixels */
            width?: string | number;
            /** Output height in pixels */
            height?: string | number;
            /** DPI resolution (default: 96) */
            dpi?: string | number;
            /** Image quality 0.1-1.0 (default: 1.0) */
            quality?: string | number;
        }): Promise<string>;

        /**
         * Converts raster images to SVG format
         * @param arguements - Configuration object for raster to SVG conversion
         * @returns Promise that resolves when conversion is complete
         */
        rasterToSvg(arguements: {
            /** Input raster image file path */
            input: string;
            /** Output SVG file path */
            output: string;
            /** Scale factor 0.1-2.0 (default: 1.0) */
            scale?: string | number;
            /** Number of colors for vectorization (default: 64) */
            colorReduction?: string | number;
        }): Promise<string>;

        /**
         * Converts SVG files to raster images
         * @param arguements - Configuration object for SVG to raster conversion
         * @returns Promise that resolves when conversion is complete
         */
        svgToRaster(arguements: {
            /** Input SVG file path */
            input: string;
            /** Output raster image file path */
            output: string;
            /** Output format (png, jpg, etc.) (default: png) */
            format?: string;
            /** Output width in pixels */
            width?: string | number;
            /** Output height in pixels */
            height?: string | number;
            /** DPI resolution (default: 96) */
            dpi?: string | number;
            /** Scale factor (default: 1.0) */
            scale?: string | number;
        }): Promise<string>;

        /**
         * Converts SVG files to other vector formats
         * @param arguements - Configuration object for SVG to vector conversion
         * @returns Promise that resolves when conversion is complete
         */
        svgToVector(arguements: {
            /** Input SVG file path */
            input: string;
            /** Output vector file path */
            output: string;
            /** Output vector format (eps, ai, pdf, etc.) (default: eps) */
            format: string;
        }): Promise<string>;

        /**
         * Converts raster images to vector formats
         * @param arguements - Configuration object for raster to vector conversion
         * @returns Promise that resolves when conversion is complete
         */
        rasterToVector(arguements: {
            /** Input raster image file path */
            input: string;
            /** Output vector file path */
            output: string;
            /** Output vector format (svg, eps, ai, etc.) (default: svg) */
            format?: string;
            /** Scale factor 0.1-2.0 (default: 1.0) */
            scale?: string | number;
            /** Number of colors for vectorization (default: 64) */
            colorReduction?: string | number;
        }): Promise<string>;

        /**
         * Advanced image conversion using Inkscape
         * @param arguements - Configuration object for Inkscape-based conversion
         * @returns Promise that resolves when conversion is complete
         */
        inkscapeToImage(arguements: {
            /** Input SVG file path */
            input: string;
            /** Output image file path */
            output: string;
            /** Output format (png, jpg, pdf, etc.) (default: png) */
            format?: string;
            /** DPI resolution (default: 96) */
            dpi?: string | number;
            /** Output width in pixels */
            width?: string | number;
            /** Output height in pixels */  
            height?: string | number;
            /** Export area coordinates */
            exportArea?: string;
            /** Background color (hex format) */
            exportBackground?: string;
            /** Background opacity 0.0-1.0 (default: 1.0) */
            exportBackgroundOpacity?: string | number;
            /** Export as plain SVG (default: false) */
            exportPlainSvg?: string | boolean;
            /** Export margin in pixels */
            exportMargin?: string | number;
            /** ID of specific element to export */
            exportId?: string;
            /** Export only the specified ID (default: false) */
            exportIdOnly?: string | boolean;
            /** Enable debug mode (default: false) */
            debug?: string | boolean;
            /** Additional Inkscape command options */
            additionalOptions?: string;
        }): Promise<string>;
    }

    export default EIGC;
}
