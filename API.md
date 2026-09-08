/*
 * The MIT License
 * Copyright (c) 2025-2026 Elite India
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

# EIGC API Documentation

## Table of Contents

1. [Getting Started](#getting-started)
2. [Configuration](#configuration)
3. [API Methods](#api-methods)
4. [Error Handling](#error-handling)
5. [Examples](#examples)
6. [Best Practices](#best-practices)

## Getting Started

### Basic Setup

```javascript
const { EIGC } = require('eigc');

// Initialize converter
const converter = new EIGC();

// Set Chrome Driver version (required for HTML conversion)
EIGC.GOOGLE_CHROME_DRIVER_VERSION = "130.0.6723.58";
```

### Environment Variables

```bash
# Required for Java integration
export EIGC_CLASSPATH=/usr/local/bin/eigc_lib/*:./lib/*:./node_modules/eigc/lib/*
export JAVA_HOME=/path/to/java/home

# Optional: JVM options
export JAVA_OPTS="-Xmx2g -Xms512m"
```

## Configuration

### Chrome Driver Setup

The `GOOGLE_CHROME_DRIVER_VERSION` must match your installed Chrome browser version:

```javascript
// Check your Chrome version: chrome://version/
EIGC.GOOGLE_CHROME_DRIVER_VERSION = "130.0.6723.58";
```

### Java Classpath

Ensure the Java library is accessible:

```bash
# Verify classpath
echo $EIGC_CLASSPATH

# Test Java availability
java -version
```

## API Methods

### htmlToRaster(arguments)

Converts HTML pages or URLs to raster images.

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `input` | string | - | **Required.** HTML file path or URL |
| `output` | string | - | **Required.** Output image file path |
| `width` | string/number | "1280" | Viewport width in pixels |
| `height` | string/number | "720" | Viewport height in pixels |
| `dpi` | string/number | "96" | Image resolution |
| `isHeadless` | string/boolean | "true" | Run browser in headless mode |
| `isIncognito` | string/boolean | "true" | Use incognito mode |
| `isMultiScreen` | string/boolean | "false" | Enable multi-screen capture |
| `isLongScreen` | string/boolean | "false" | Capture full page height |
| `currentDomain` | string | null | Domain to replace |
| `replacementDomain` | string | null | Replacement domain |
| `scriptToInject` | string | null | JavaScript code to inject |
| `cssToInject` | string | null | CSS code to inject |
| `htmlToInject` | string | null | HTML code to inject |
| `timeout` | string/number | "5" | Timeout in seconds |
| `isDebug` | string/boolean | "false" | Enable debug mode |
| `cropArea` | string | null | Crop area "x,y,width,height" |

#### Example

```javascript
const result = await converter.htmlToRaster({
    input: "https://example.com",
    output: "/path/to/screenshot.png",
    width: "1920",
    height: "1080",
    dpi: "300",
    isLongScreen: "true",
    timeout: "10"
});
```

### rasterToRaster(arguments)

Converts between raster image formats with optional resizing and quality adjustment.

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `input` | string | - | **Required.** Input image file path |
| `output` | string | - | **Required.** Output image file path |
| `format` | string | - | **Required.** Output format (png, jpg, gif, etc.) |
| `width` | string/number | null | Output width |
| `height` | string/number | null | Output height |
| `dpi` | string/number | "96" | Image resolution |
| `quality` | string/number | "1.0" | Image quality (0.1-1.0) |

#### Example

```javascript
await converter.rasterToRaster({
    input: "/path/to/input.png",
    output: "/path/to/output.jpg",
    format: "jpg",
    width: "800",
    height: "600",
    quality: "0.9"
});
```

### rasterToSvg(arguments)

Converts raster images to SVG vector format.

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `input` | string | - | **Required.** Input raster image path |
| `output` | string | - | **Required.** Output SVG file path |
| `scale` | string/number | "1.0" | Scale factor (0.1-2.0) |
| `colorReduction` | string/number | "64" | Number of colors for vectorization |

#### Example

```javascript
await converter.rasterToSvg({
    input: "/path/to/photo.png",
    output: "/path/to/vector.svg",
    scale: "1.5",
    colorReduction: "32"
});
```

### svgToRaster(arguments)

Converts SVG files to raster images.

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `input` | string | - | **Required.** Input SVG file path |
| `output` | string | - | **Required.** Output image file path |
| `format` | string | "png" | Output format |
| `width` | string/number | null | Output width |
| `height` | string/number | null | Output height |
| `dpi` | string/number | "96" | Image resolution |
| `scale` | string/number | "1.0" | Scale factor |

#### Example

```javascript
await converter.svgToRaster({
    input: "/path/to/logo.svg",
    output: "/path/to/logo.png",
    format: "png",
    width: "512",
    height: "512",
    dpi: "300"
});
```

### svgToVector(arguments)

Converts SVG to other vector formats.

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `input` | string | - | **Required.** Input SVG file path |
| `output` | string | - | **Required.** Output vector file path |
| `format` | string | - | **Required.** Output format (eps, ai, pdf) |

#### Example

```javascript
await converter.svgToVector({
    input: "/path/to/drawing.svg",
    output: "/path/to/drawing.eps",
    format: "eps"
});
```

### rasterToVector(arguments)

Converts raster images to vector formats.

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `input` | string | - | **Required.** Input raster image path |
| `output` | string | - | **Required.** Output vector file path |
| `format` | string | "svg" | Output format |
| `scale` | string/number | "1.0" | Scale factor |
| `colorReduction` | string/number | "64" | Color reduction |

#### Example

```javascript
await converter.rasterToVector({
    input: "/path/to/image.png",
    output: "/path/to/vector.svg",
    format: "svg",
    colorReduction: "16"
});
```

### inkscapeToImage(arguments)

Advanced image conversion using Inkscape with extensive customization options.

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `input` | string | - | **Required.** Input SVG file path |
| `output` | string | - | **Required.** Output image file path |
| `format` | string | "png" | Output format |
| `dpi` | string/number | "96" | Image resolution |
| `width` | string/number | null | Output width |
| `height` | string/number | null | Output height |
| `exportArea` | string | null | Export area coordinates |
| `exportBackground` | string | null | Background color (hex) |
| `exportBackgroundOpacity` | string/number | "1.0" | Background opacity |
| `exportPlainSvg` | string/boolean | "false" | Export as plain SVG |
| `exportMargin` | string/number | null | Export margin |
| `exportId` | string | null | Export specific element ID |
| `exportIdOnly` | string/boolean | "false" | Export only specified ID |
| `debug` | string/boolean | "false" | Enable debug mode |
| `additionalOptions` | string | null | Additional Inkscape options |

#### Example

```javascript
await converter.inkscapeToImage({
    input: "/path/to/complex.svg",
    output: "/path/to/export.png",
    format: "png",
    dpi: "300",
    width: "1024",
    height: "768",
    exportBackground: "#ffffff",
    exportId: "layer1"
});
```

## Error Handling

### Common Error Scenarios

```javascript
try {
    await converter.htmlToRaster({
        input: "https://example.com",
        output: "/invalid/path/output.png"
    });
} catch (error) {
    if (error.message.includes('Java Exception')) {
        console.error('Java processing error:', error);
    } else if (error.message.includes('Chrome Driver')) {
        console.error('Chrome Driver issue:', error);
    } else {
        console.error('Conversion failed:', error);
    }
}
```

### Validation

```javascript
// Validate inputs before conversion
function validateInput(args) {
    if (!args.input || !args.output) {
        throw new Error('Input and output paths are required');
    }
    
    if (args.input.startsWith('http') && !EIGC.GOOGLE_CHROME_DRIVER_VERSION) {
        throw new Error('Chrome Driver version must be set for URL inputs');
    }
}
```

## Examples

### Batch HTML to Image Conversion

```javascript
const urls = [
    'https://example.com',
    'https://google.com',
    'https://github.com'
];

for (const [index, url] of urls.entries()) {
    await converter.htmlToRaster({
        input: url,
        output: `/output/screenshot_${index}.png`,
        width: "1920",
        height: "1080"
    });
}
```

### Image Processing Pipeline

```javascript
// Convert HTML to PNG
await converter.htmlToRaster({
    input: 'https://example.com',
    output: '/tmp/webpage.png'
});

// Convert PNG to SVG
await converter.rasterToSvg({
    input: '/tmp/webpage.png',
    output: '/tmp/webpage.svg'
});

// Convert SVG to high-res PNG
await converter.svgToRaster({
    input: '/tmp/webpage.svg',
    output: '/final/webpage_hires.png',
    dpi: "300",
    width: "3840"
});
```

### Dynamic Content Injection

```javascript
await converter.htmlToRaster({
    input: 'https://example.com',
    output: '/output/modified.png',
    scriptToInject: `
        document.querySelector('h1').style.color = 'red';
        document.body.style.backgroundColor = '#f0f0f0';
    `,
    cssToInject: `
        .advertisement { display: none !important; }
        body { font-family: Arial, sans-serif; }
    `,
    timeout: "15"
});
```

## Best Practices

### Performance Optimization

1. **Reuse Converter Instance**
   ```javascript
   // Good: Single instance
   const converter = new EIGC();
   
   // Use converter for multiple operations
   ```

2. **Set Appropriate Timeouts**
   ```javascript
   // For simple pages
   timeout: "5"
   
   // For complex pages with heavy JS
   timeout: "15"
   ```

3. **Use Appropriate DPI**
   ```javascript
   // Screen display
   dpi: "96"
   
   // Print quality
   dpi: "300"
   
   // High resolution
   dpi: "600"
   ```

### Error Prevention

1. **Validate Paths**
   ```javascript
   const fs = require('fs');
   const path = require('path');
   
   // Ensure output directory exists
   const outputDir = path.dirname(outputPath);
   if (!fs.existsSync(outputDir)) {
       fs.mkdirSync(outputDir, { recursive: true });
   }
   ```

2. **Handle Network Issues**
   ```javascript
   const maxRetries = 3;
   let retryCount = 0;
   
   while (retryCount < maxRetries) {
       try {
           await converter.htmlToRaster(args);
           break;
       } catch (error) {
           retryCount++;
           if (retryCount === maxRetries) throw error;
           await new Promise(resolve => setTimeout(resolve, 1000));
       }
   }
   ```

### Memory Management

```javascript
// For large batch operations
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    // Worker process handles conversions
    const converter = new EIGC();
    // Process conversion tasks
}
```

---

© 2025-2026 Elite India. All rights reserved.