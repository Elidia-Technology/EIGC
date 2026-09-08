# Contributing to EIGC

We welcome contributions to the Elite India Graphics Converter (EIGC) project! This document provides guidelines for contributing to the project.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Setup](#development-setup)
3. [Making Changes](#making-changes)
4. [Testing](#testing)
5. [Submitting Changes](#submitting-changes)
6. [Code Standards](#code-standards)
7. [Reporting Issues](#reporting-issues)

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- Java 11 or higher (OpenJDK recommended)
- Python 3.x for native module compilation
- Git
- A C++ compiler (GCC, Clang, or MSVC)
- node-gyp build tools

### Development Dependencies

```bash
npm install -g node-gyp
```

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/EIGC-NPM.git
   cd EIGC-NPM
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Environment Variables**
   ```bash
   export EIGC_CLASSPATH=/usr/local/bin/eigc_lib/*:./lib/*
   export JAVA_HOME=/path/to/your/java
   ```

4. **Build the Project**
   ```bash
   npm run build
   ```

5. **Test Installation**
   ```bash
   node sample.js
   ```

## Making Changes

### Branch Naming Convention

- Feature branches: `feature/description-of-feature`
- Bug fixes: `fix/description-of-bug`
- Documentation: `docs/description-of-change`
- Refactoring: `refactor/description-of-change`

### Development Workflow

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow the existing code style
   - Add appropriate comments
   - Update documentation if needed

3. **Test Your Changes**
   ```bash
   npm run build
   npm test
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: description of your changes"
   ```

## Testing

### Manual Testing

1. **Basic Functionality Test**
   ```bash
   node sample.js
   ```

2. **Build Test**
   ```bash
   npm run clean
   npm run build
   ```

3. **Environment Test**
   ```bash
   npm run setup
   ```

### Test Cases to Cover

When making changes, ensure these scenarios work:

- HTML to image conversion (local file and URL)
- Image format conversions (PNG, JPG, GIF)
- SVG processing (to/from raster and vector)
- Error handling for invalid inputs
- Cross-platform compatibility

### Example Test Script

```javascript
const { EIGC } = require('./index.js');

async function runTests() {
    EIGC.GOOGLE_CHROME_DRIVER_VERSION = "130.0.6723.58";
    const converter = new EIGC();
    
    try {
        // Test HTML to raster
        await converter.htmlToRaster({
            input: "https://example.com",
            output: "/tmp/test.png",
            width: "800",
            height: "600"
        });
        console.log("✓ HTML to raster test passed");
        
        // Add more tests as needed
        
    } catch (error) {
        console.error("✗ Test failed:", error);
    }
}

runTests();
```

## Submitting Changes

### Pull Request Process

1. **Update Documentation**
   - Update README.md if needed
   - Update API.md for API changes
   - Add entries to CHANGELOG.md

2. **Create Pull Request**
   - Use a clear, descriptive title
   - Provide detailed description of changes
   - Reference any related issues

3. **PR Description Template**
   ```markdown
   ## Description
   Brief description of the change

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement
   - [ ] Code refactoring

   ## Testing
   - [ ] Manual testing completed
   - [ ] Cross-platform testing (if applicable)
   - [ ] No breaking changes

   ## Related Issues
   Fixes #(issue number)
   ```

## Code Standards

### JavaScript/Node.js

- Use ES6+ features where appropriate
- Follow existing indentation (4 spaces)
- Use meaningful variable and function names
- Add JSDoc comments for functions
- Handle errors gracefully

```javascript
/**
 * Converts HTML to raster image
 * @param {Object} args - Conversion arguments
 * @param {string} args.input - Input HTML path or URL
 * @param {string} args.output - Output image path
 * @returns {Promise<string>} Conversion result
 */
async function htmlToRaster(args) {
    // Implementation
}
```

### C++ (Native Bindings)

- Follow existing naming conventions
- Use appropriate error handling
- Add comments for complex logic
- Ensure memory management is correct

```cpp
// ✅ Good: Clear function name and error handling
jobject GetEigcInstance() {
    jclass eigcClass = env->FindClass("com/dh/sa/gtogcapture/Eigc");
    if (!eigcClass) {
        std::cerr << "❌ Eigc Class Not Found in JAR!" << std::endl;
        return nullptr;
    }
    // ... rest of implementation
}
```

### TypeScript Definitions

- Provide comprehensive type definitions
- Include JSDoc comments with parameter descriptions
- Use appropriate optional/required parameter markings

```typescript
/**
 * Converts HTML to raster image
 * @param arguements Configuration object
 * @returns Promise that resolves when conversion is complete
 */
htmlToRaster(arguements: {
    /** Input HTML file path or URL */
    input: string;
    /** Output image file path */
    output: string;
    // ... other parameters
}): Promise<string>;
```

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Environment Information**
   - Operating System
   - Node.js version
   - Java version
   - Package version

2. **Steps to Reproduce**
   - Clear, numbered steps
   - Sample code if applicable
   - Input files (if possible)

3. **Expected vs Actual Behavior**
   - What you expected to happen
   - What actually happened
   - Error messages or logs

4. **Additional Context**
   - Screenshots if relevant
   - Configuration details
   - Workarounds attempted

### Feature Requests

For feature requests, please provide:

1. **Use Case Description**
   - What problem does this solve?
   - Who would benefit from this feature?

2. **Proposed Solution**
   - How should it work?
   - API design suggestions

3. **Alternatives Considered**
   - Other ways to solve the problem
   - Why this approach is preferred

## Development Tips

### Debugging Native Code

1. **Enable Debug Mode**
   ```javascript
   await converter.htmlToRaster({
       input: "test.html",
       output: "output.png",
       isDebug: "true"
   });
   ```

2. **Check Java Logs**
   ```bash
   # Enable JVM debugging
   export JAVA_OPTS="-Xdebug -verbose:jni"
   ```

3. **Verify Classpath**
   ```bash
   echo $EIGC_CLASSPATH
   java -cp $EIGC_CLASSPATH com.dh.sa.gtogcapture.Eigc
   ```

### Common Issues

1. **Build Failures**
   - Ensure all dependencies are installed
   - Check JAVA_HOME is set correctly
   - Try `npm run clean && npm run build`

2. **Runtime Errors**
   - Verify EIGC_CLASSPATH includes all JAR files
   - Check file permissions
   - Ensure Chrome Driver version matches Chrome browser

### IDE Configuration

For Visual Studio Code users, recommended extensions:

- C/C++ Extension Pack
- Node.js Extension Pack
- Java Extension Pack (if modifying Java components)

## Release Process

For maintainers releasing new versions:

1. **Version Bump**
   ```bash
   npm version patch  # or minor/major
   ```

2. **Update Documentation**
   - Update CHANGELOG.md
   - Update README.md if needed
   - Update API.md for API changes

3. **Build and Test**
   ```bash
   npm run clean
   npm run build
   npm test
   ```

4. **Create Release**
   - Tag the release in Git
   - Create GitHub release with changelog
   - Publish to npm (if applicable)

## License

By contributing to EIGC, you agree that your contributions will be licensed under the MIT License.

---

Thank you for your interest in contributing to EIGC! Your contributions help make this project better for everyone.

© 2025-2026 Elite India. All rights reserved.