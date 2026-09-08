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

const eigc = require('./build/Release/eigc.node');

class EIGC {

    static GOOGLE_CHROME_DRIVER_VERSION = "130.0.6723.58";
    static validateString(value, defaultValue = "null") {
        return value !== null && value !== undefined && typeof (value) !== "undefined" ? String(value) :
            defaultValue !== null && defaultValue !== undefined && typeof (defaultValue) !== "undefined" ? String(defaultValue) : "null";
    }



    /**
     * Converts HTML to a raster image using the specified arguments.
     *
     * @param {Object} arguements - The arguments for the conversion.
     * @param {string} arguements.input - The input HTML file path.
     * @param {string} arguements.output - The output image file path.
     * @param {string} [arguements.width=1280] - The width of the output image.
     * @param {string} [arguements.height=720] - The height of the output image.
     * @param {string} [arguements.dpi=96] - The DPI (dots per inch) of the output image.
     * @param {string} [arguements.isHeadless=true] - Whether to run the browser in headless mode. (Optional)
     * @param {string} [arguements.isIncognito=true] - Whether to run the browser in incognito mode. (Optional)
     * @param {string} [arguements.isMultiScreen=false] - Whether to enable multi-screen support. (Optional)
     * @param {string} [arguements.isLongScreen=false] - Whether to enable long screen support. (Optional)
     * @param {string} [arguements.currentDomain] - The current domain to be used. (Optional)
     * @param {string} [arguements.replacementDomain] - The domain to replace the current domain. (Optional)
     * @param {string} [arguements.scriptToInject] - The script to inject into the HTML. (Optional)
     * @param {string} [arguements.cssToInject] - The CSS to inject into the HTML. (Optional)
     * @param {string} [arguements.htmlToInject] - The HTML to inject into the document. (Optional)
     * @param {string} [arguements.timeout=5] - The timeout for the conversion process. (Optional)
     * @param {string} [arguements.isDebug=false] - Whether to enable debug mode. (Optional)
     * @param {string} [arguements.cropArea] - cropping an image on certain points like "10,10,200,200". (Optional)
     * @throws {Error} If the Google Chrome Driver version is not set.
     * @returns {Promise} A promise that resolves when the conversion is complete.
     */
    async htmlToRaster(arguements) {
        let { input, output, width, height, dpi, isHeadless, isIncognito, isMultiScreen, isLongScreen, currentDomain, replacementDomain, scriptToInject, cssToInject, htmlToInject, timeout, isDebug, cropArea } = arguements;

        if (EIGC.GOOGLE_CHROME_DRIVER_VERSION === null || EIGC.GOOGLE_CHROME_DRIVER_VERSION === undefined || typeof (EIGC.GOOGLE_CHROME_DRIVER_VERSION) === "undefined") {
            throw new Error("Google Chrome Driver Version is not set. Please set it using EIGC.GOOGLE_CHROME_DRIVER_VERSION like '130.0.6723.58', Note: installed Google Chrome Driver version and installed Google Chrome Browser version must be same");
        }

        if (input.startsWith("http://") || input.startsWith("https://") || input.startsWith("file:///")) {
            //do nothing, it is a valid file or url
        } else {
            input = "file:///" + input.replace(/^[./]+/, "");
        }
        return await eigc.htmlToRaster(
            EIGC.validateString(input),
            EIGC.validateString(output),
            EIGC.validateString(width, "1280"),
            EIGC.validateString(height, "720"),
            EIGC.validateString(dpi, "96"),
            EIGC.validateString(isHeadless, "true"),
            EIGC.validateString(isIncognito, "true"),
            EIGC.validateString(isMultiScreen, "false"),
            EIGC.validateString(isLongScreen, "false"),
            EIGC.validateString(currentDomain),
            EIGC.validateString(replacementDomain),
            EIGC.validateString(scriptToInject),
            EIGC.validateString(cssToInject),
            EIGC.validateString(htmlToInject),
            EIGC.validateString(timeout, "5"),
            EIGC.validateString(isDebug, "false"),
            EIGC.validateString(EIGC.GOOGLE_CHROME_DRIVER_VERSION, "130.0.6723.58"),
            EIGC.validateString(cropArea)
        );
    }

    /**
    * Converts a raster image to another raster format.
    *
    * @param {Object} arguements - The arguments for the conversion.
    * @param {string} arguements.input - The input raster image file path.
    * @param {string} arguements.output - The output raster image file path.
    * @param {string} arguements.format - The format of the output image.
    * @param {string} [arguements.width] - The width of the output image. (Optional)
    * @param {string} [arguements.height] - The height of the output image. (Optional)
    * @param {string} [arguements.dpi=96] - The DPI (dots per inch) of the output image. (Optional)
    * @param {string} [arguements.quality=1.0] - The quality of the output image. (Optional)
    * @returns {Promise} A promise that resolves when the conversion is complete.
    */
    async rasterToRaster(arguements) {
        const { input, output, format, width, height, dpi, quality } = arguements;
        return await eigc.rasterToRaster(
            EIGC.validateString(input),
            EIGC.validateString(output),
            EIGC.validateString(width),
            EIGC.validateString(height),
            EIGC.validateString(dpi, "96"),
            EIGC.validateString(quality, "1.0"),
            EIGC.validateString(format, "png")
        );
    }

    /**
     * Converts a raster image to SVG format.
     *
     * @param {Object} arguements - The arguments object.
     * @param {string} arguements.input - The input file path of the raster image.
     * @param {string} arguements.output - The output file path for the SVG image.
     * @param {string} [arguements.scale="1.0"] - The scale factor for the conversion.(Optional)
     * @param {string} [arguements.colorReduction="64"] - The color reduction factor for the conversion.(Optional)
     * @returns {Promise} A promise that resolves when the conversion is complete.
     */
    async rasterToSvg(arguements) {
        const { input, output, scale, colorReduction } = arguements;
        return await eigc.rasterToSvg(
            EIGC.validateString(input),
            EIGC.validateString(output),
            EIGC.validateString(scale, "1.0"),
            EIGC.validateString(colorReduction, "64")
        );
    }

    /**
     * Converts an SVG file to a raster image format.
     *
     * @param {Object} arguements - The arguments for the conversion.
     * @param {string} arguements.input - The input SVG file path.
     * @param {string} arguements.output - The output raster image file path.
     * @param {string} [arguements.format="png"] - The output image format (e.g., "png", "jpg").
     * @param {number} [arguements.width] - The width of the output image.(Optional)
     * @param {number} [arguements.height] - The height of the output image.(Optional)
     * @param {number} [arguements.dpi=96] - The DPI (dots per inch) for the output image.(Optional)
     * @param {number} [arguements.scale=1.0] - The scale factor for the output image.(Optional)
     * @returns {Promise} A promise that resolves when the conversion is complete.
     */
    async svgToRaster(arguements) {
        const { input, output, format, width, height, dpi, scale } = arguements;
        return await eigc.svgToRaster(
            EIGC.validateString(input),
            EIGC.validateString(output),
            EIGC.validateString(format, "png"),
            EIGC.validateString(dpi, "96"),
            EIGC.validateString(width),
            EIGC.validateString(height),
            EIGC.validateString(scale, "1.0")
        );
    }

    /**
     * Converts an SVG file to a vector format.
     *
     * @param {Object} arguements - The arguments object.
     * @param {string} arguements.input - The input SVG file path.
     * @param {string} arguements.output - The output file path.
     * @param {string} arguements.format - The desired vector format (default is "eps, tiff, ai").
     * @returns {Promise} A promise that resolves when the conversion is complete.
     */
    async svgToVector(arguements) {
        const { input, output, format } = arguements;
        return await eigc.svgToVector(
            EIGC.validateString(input),
            EIGC.validateString(output),
            EIGC.validateString(format, "eps")
        );
    }

    /**
     * Converts a raster image to a vector format.
     *
     * @param {Object} arguements - The arguments for the conversion.
     * @param {string} arguements.input - The input file path of the raster image.
     * @param {string} arguements.output - The output file path for the vector image.
     * @param {string} [arguements.format="svg"] - The format of the output vector image (default is "svg").
     * @param {number} [arguements.scale=1.0] - The scale factor for the conversion (default is 1.0).(Optional)
     * @param {number} [arguements.colorReduction=64] - The color reduction factor for the conversion (default is 64).(Optional)
     * @returns {Promise} A promise that resolves when the conversion is complete.
     */
    async rasterToVector(arguements) {
        const { input, output, format, scale, colorReduction } = arguements;
        return await eigc.rasterToVector(
            EIGC.validateString(input),
            EIGC.validateString(output),
            EIGC.validateString(format, "svg"),
            EIGC.validateString(scale, "1.0"),
            EIGC.validateString(colorReduction, "64")
        );
    }

    /**
     * Converts an SVG file to an image using Inkscape.
     *
     * @param {Object} arguements - The arguments for the conversion.
     * @param {string} arguements.input - The input SVG file path.
     * @param {string} arguements.output - The output image file path.
     * @param {string} [arguements.format="png"] - The output image format (e.g., png, jpg).
     * @param {string} [arguements.dpi=96] - The DPI (dots per inch) for the output image.
     * @param {string} [arguements.width=null] - The width of the output image.
     * @param {string} [arguements.height=null] - The height of the output image.
     * @param {string} [arguements.exportArea=null] - The area of the SVG to export.(Optional)
     * @param {string} [arguements.exportBackground=null] - The background color of the output image.(Optional)
     * @param {string} [arguements.exportBackgroundOpacity=1.0] - The opacity of the background color between 0 to 1.(Optional)
     * @param {string} [arguements.exportPlainSvg=false] - Whether to export a plain SVG.(Optional)
     * @param {string} [arguements.exportMargin=null] - The margin to add around the exported area.(Optional)
     * @param {string} [arguements.exportId=null] - The ID of the element to export.(Optional)
     * @param {string} [arguements.exportIdOnly=false"] - Whether to export only the element with the specified ID.(Optional)
     * @param {string} [arguements.debug=false] - Whether to enable debug mode.(Optional)
     * @param {string} [arguements.additionalOptions="null"] - Additional options for the Inkscape command.(Optional)
     * @returns {Promise} A promise that resolves when the conversion is complete.
     */
    async inkscapeToImage(arguements) {
        const { input, output, format, dpi, width, height, exportArea, exportBackground, exportBackgroundOpacity, exportPlainSvg, exportMargin, exportId, exportIdOnly, debug, additionalOptions } = arguements;
        return await eigc.inkscapeToImage(
            EIGC.validateString(input),
            EIGC.validateString(output),
            EIGC.validateString(format, "png"),
            EIGC.validateString(dpi, "96"),
            EIGC.validateString(width, "null"),
            EIGC.validateString(height, "null"),
            EIGC.validateString(exportArea, "null"),
            EIGC.validateString(exportBackground, "null"),
            EIGC.validateString(exportBackgroundOpacity, "1.0"),
            EIGC.validateString(exportPlainSvg, "false"),
            EIGC.validateString(exportMargin, "null"),
            EIGC.validateString(exportId, "null"),
            EIGC.validateString(exportIdOnly, "false"),
            EIGC.validateString(debug, "false"),
            EIGC.validateString(additionalOptions, "null")
        );
    }
}

module.exports = EIGC;

