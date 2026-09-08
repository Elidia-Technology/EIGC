# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-12

### Added
- Complete migration from GTGC to EIGC naming convention
- MIT License adoption across all source files
- Comprehensive API documentation
- TypeScript definitions with detailed JSDoc comments
- Enhanced README with installation and usage instructions
- API documentation file with examples and best practices
- Support for all image conversion formats:
  - HTML to Raster conversion
  - Raster to Raster format conversion
  - Raster to SVG vectorization
  - SVG to Raster rendering
  - SVG to Vector format conversion
  - Raster to Vector conversion
  - Inkscape-based advanced processing

### Changed
- Package name from `gtgc` to `eigc`
- Class name from `GTGC` to `EIGC`
- Environment variable from `GTGC_CLASSPATH` to `EIGC_CLASSPATH`
- Java class references updated to use EIGC naming
- License changed from ISC to MIT
- Enhanced package.json with better metadata
- Improved error handling and validation

### Fixed
- TypeScript definitions accuracy and completeness
- Build script compatibility
- Environment variable handling
- Java classpath resolution

### Documentation
- Comprehensive README with badges and examples
- Detailed API documentation with parameter tables
- TypeScript definitions with JSDoc comments
- Installation and setup instructions
- Troubleshooting guide
- Best practices recommendations

### Technical Details
- Native C++ bindings updated for EIGC
- Java integration maintained with EIGCLibrary-3.0.0.jar
- Chrome Driver integration for HTML conversion
- Cross-platform compatibility (Linux, macOS, Windows)
- Node.js 14+ compatibility

---

## Migration Guide from GTGC to EIGC

If you're migrating from the previous GTGC package:

### Code Changes Required

```javascript
// Old GTGC usage
const { GTGC } = require('gtgc');
GTGC.GOOGLE_CHROME_DRIVER_VERSION = "130.0.6723.58";
const converter = new GTGC();

// New EIGC usage
const { EIGC } = require('eigc');
EIGC.GOOGLE_CHROME_DRIVER_VERSION = "130.0.6723.58";
const converter = new EIGC();
```

### Environment Variables

```bash
# Old
export GTGC_CLASSPATH=/usr/local/bin/gtgc_lib/*:./lib/*

# New
export EIGC_CLASSPATH=/usr/local/bin/eigc_lib/*:./lib/*
```

### Package Installation

```bash
# Uninstall old package
npm uninstall gtgc

# Install new package
npm install eigc
```

All method signatures and functionality remain the same - only naming has changed.

---

© 2025-2026 Elite India. All rights reserved.