# EIGC - Elidia Technology Pvt Ltd Graphics Converter

![Version](https://img.shields.io/npm/v/eigc)
![License](https://img.shields.io/npm/l/eigc)
![Node.js](https://img.shields.io/node/v/eigc)

A powerful Node.js native add-on for EIGC (Elidia Technology Pvt Ltd Graphics Converter) that provides comprehensive image and document conversion capabilities through Java-based processing.

## 🚀 Features

- **HTML to Raster**: Convert HTML pages to high-quality images (PNG, JPG, etc.)
- **Raster Conversion**: Convert between different raster image formats
- **SVG Processing**: Convert SVG to raster and vector formats
- **Vector Conversion**: Transform raster images to vector formats
- **Inkscape Integration**: Advanced image processing using Inkscape
- **Batch Processing**: Support for multiple file conversions
- **Headless Browser**: Chrome-based HTML rendering

## 📦 Installation

### Prerequisites

- **Node.js** 14.x or higher
- **Java** 11 or higher (OpenJDK recommended)
- **Python** 3.x (for native module compilation)
- **node-gyp** build tools
- **Google Chrome** (for HTML to image conversion)

### Install via npm

```bash
npm install eigc
```

### Manual Installation

```bash
git clone https://github.com/SaleemLww/EIGC-NPM.git
cd EIGC-NPM
npm install
npm run build:signed  # Build with code signing (recommended)
# or
npm run build        # Standard build (unsigned)
```

### Code Signing (macOS)

For macOS users, code signing is recommended to avoid security restrictions:

```bash
# Build with code signing
npm run build:signed

# Clean rebuild with signing
npm run rebuild:signed
```

📖 **See [CODE_SIGNING.md](CODE_SIGNING.md) for detailed setup instructions**

## ⚙️ Environment Setup

### 1. Set Environment Variables

```bash
# Linux/macOS
export EIGC_CLASSPATH=/usr/local/bin/eigc_lib/*:./lib/*:./node_modules/eigc/lib/*:$EIGC_CLASSPATH
export JAVA_HOME=/path/to/your/java

# Windows
set EIGC_CLASSPATH=C:\eigc_lib\*;.\lib\*;.\node_modules\eigc\lib\*
set JAVA_HOME=C:\Program Files\Java\jdk-11
```

### 2. Chrome Driver Setup

Download and install the appropriate Chrome Driver version that matches your Chrome browser version.

## 📖 API Documentation

### Initialize EIGC

```javascript
const { EIGC } = require('eigc');

// Set Chrome Driver version (required for HTML conversion)
EIGC.GOOGLE_CHROME_DRIVER_VERSION = "130.0.6723.58";

const converter = new EIGC();
```

### HTML to Raster Conversion

Convert HTML pages to image formats.

```javascript
await converter.htmlToRaster({
    input: "https://example.com",           // URL or file path
    output: "/path/to/output.png",          // Output file path
    width: "1920",                          // Optional: viewport width
    height: "1080",                         // Optional: viewport height
    dpi: "300",                            // Optional: DPI resolution
    isHeadless: "true",                    // Optional: headless mode
    isIncognito: "true",                   // Optional: incognito mode
    timeout: "10",                         // Optional: timeout in seconds
    cropArea: "0,0,800,600"               // Optional: crop area (x,y,width,height)
});
```

### Raster to Raster Conversion

Convert between different raster image formats.

```javascript
await converter.rasterToRaster({
    input: "/path/to/input.jpg",
    output: "/path/to/output.png",
    width: "800",                          // Optional: resize width
    height: "600",                         // Optional: resize height
    dpi: "300",                           // Optional: DPI
    quality: "0.9",                       // Optional: quality (0.1-1.0)
    format: "png"                         // Output format
});
```

### Raster to SVG Conversion

Convert raster images to SVG format.

```javascript
await converter.rasterToSvg({
    input: "/path/to/input.png",
    output: "/path/to/output.svg",
    scale: "1.0",                         // Optional: scale factor
    colorReduction: "32"                  // Optional: color reduction
});
```

### SVG to Raster Conversion

Convert SVG files to raster images.

```javascript
await converter.svgToRaster({
    input: "/path/to/input.svg",
    output: "/path/to/output.png",
    format: "png",                        // Output format
    width: "800",                         // Optional: width
    height: "600",                        // Optional: height
    dpi: "300",                          // Optional: DPI
    scale: "1.0"                         // Optional: scale factor
});
```

### SVG to Vector Conversion

Convert SVG to other vector formats.

```javascript
await converter.svgToVector({
    input: "/path/to/input.svg",
    output: "/path/to/output.eps",
    format: "eps"                         // eps, ai, pdf, etc.
});
```

### Raster to Vector Conversion

Convert raster images to vector formats.

```javascript
await converter.rasterToVector({
    input: "/path/to/input.png",
    output: "/path/to/output.svg",
    format: "svg",                        // svg, eps, ai, etc.
    scale: "1.0",                         // Optional: scale factor
    colorReduction: "64"                  // Optional: color reduction
});
```

### Inkscape-based Conversion

Advanced image processing using Inkscape.

```javascript
await converter.inkscapeToImage({
    input: "/path/to/input.svg",
    output: "/path/to/output.png",
    format: "png",                        // Output format
    dpi: "300",                          // DPI resolution
    width: "800",                        // Optional: width
    height: "600",                       // Optional: height
    exportArea: "0:0:100:100",           // Optional: export area
    exportBackground: "#ffffff",          // Optional: background color
    exportBackgroundOpacity: "1.0"       // Optional: background opacity
});
```

## 🛠️ Build Scripts

```bash
# Build the native module
npm run build

# Setup environment
npm run setup

# Clean build
npm run clean && npm run build
```

## 🔧 Troubleshooting

### Common Issues

1. **Java Not Found**
   ```bash
   export JAVA_HOME=/path/to/java
   export PATH=$JAVA_HOME/bin:$PATH
   ```

2. **Chrome Driver Issues**
   - Ensure Chrome Driver version matches your Chrome browser
   - Download from: https://chromedriver.chromium.org/

3. **Build Failures**
   ```bash
   npm install -g node-gyp
   npm rebuild
   ```

4. **Permission Issues**
   ```bash
   sudo chmod +x compile_install.sh
   ```

## 📄 TypeScript Support

This package includes TypeScript definitions. No additional installation required.

```typescript
import { EIGC } from 'eigc';

const converter = new EIGC();
// Full type support available
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Changelog

### v1.0.0
- Initial release
- Complete GTGC to EIGC migration
- MIT License adoption
- Comprehensive documentation
- TypeScript support

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution  
- ✅ Private use
- ❌ Liability
- ❌ Warranty

## �🔗 Links

- [Repository](https://github.com/SaleemLww/EIGC-NPM)
- [Issues](https://github.com/SaleemLww/EIGC-NPM/issues)
- [NPM Package](https://www.npmjs.com/package/eigc)
- [Code Signing Guide](CODE_SIGNING.md)
- [Issues](https://github.com/SaleemLww/EIGC-NPM/issues)
- [NPM Package](https://www.npmjs.com/package/eigc)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Saleem Ahmad**  
Elidia Technology Pvt Ltd  
📧 [Contact](mailto:saleem@eliteindia.com)

---

© 2025-2026 Elidia Technology Pvt Ltd. All rights reserved.