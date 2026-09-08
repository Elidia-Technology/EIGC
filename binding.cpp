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

#include <jni.h>
#include <node.h>
#include <iostream>
#include <vector>
#include <sstream>
#include <cstdlib>

// Ensure correct filesystem inclusion
#if __has_include(<filesystem>)
    #include <filesystem>
    namespace fs = std::filesystem;
#elif __has_include(<experimental/filesystem>)
    #include <experimental/filesystem>
    namespace fs = std::experimental::filesystem;
#else
    #error "No filesystem support"
#endif


using namespace v8;

JavaVM *jvm = nullptr;
JNIEnv *env = nullptr;


std::string GetJarPath() {
    namespace fs = std::filesystem;
    
    std::vector<std::string> possiblePaths = {
        "./lib/EIGCLibrary-3.0.0.jar",
        "./node_modules/eigc/lib/EIGCLibrary-3.0.0.jar",
        "/usr/local/bin/eigc_lib/EIGCLibrary-3.0.0.jar"
    };

    // Check paths directly
    for (const std::string &path : possiblePaths) {
        if (fs::exists(path)) {
            return path;
        }
    }

    // Check inside EIGC_CLASSPATH
    const char* eigcClasspath = std::getenv("EIGC_CLASSPATH");
    if (eigcClasspath) {
        std::istringstream pathStream(eigcClasspath);
        std::string path;
        while (std::getline(pathStream, path, ':')) {
            std::string jarFile = path + "/EIGCLibrary-3.0.0.jar";
            if (fs::exists(jarFile)) {
                return jarFile;
            }
        }
    }

    std::cerr << "❌ JAR file not found!" << std::endl;
    exit(EXIT_FAILURE);
}


// ✅ Create JVM with proper error handling
void CreateJVM() {
    if (jvm == nullptr) {
        JavaVMInitArgs vm_args;
        JavaVMOption options[2];



        std::string jarPath = GetJarPath();
        std::string classPathOption = "-Djava.class.path=" + jarPath;
        options[0].optionString = const_cast<char*>(classPathOption.c_str());  // ✅ Fix memory issue
        options[1].optionString = (char*)"-Xrs";
        vm_args.version = JNI_VERSION_1_8;
        vm_args.nOptions = 2;
        vm_args.options = options;
        vm_args.ignoreUnrecognized = false;
        jint res = JNI_CreateJavaVM(&jvm, (void**)&env, &vm_args);
        if (res != JNI_OK) {
            std::cerr << "❌ JVM Creation Failed! Exiting..." << std::endl;
            exit(EXIT_FAILURE);
        } else {
            std::cout << "✅ JVM Initialized Successfully." << std::endl;
        }
    }
}

// ✅ Retrieve Java class instance
jobject GetEigcInstance() {
    jclass eigcClass = env->FindClass("com/elite/india/sa/eigc/Eigc");
    if (!eigcClass) {
        std::cerr << "❌ Eigc Class Not Found in JAR!" << std::endl;
        return nullptr;
    }
    jmethodID constructor = env->GetMethodID(eigcClass, "<init>", "()V");
    jobject eigcInstance = env->NewObject(eigcClass, constructor);
    env->DeleteLocalRef(eigcClass);
    return eigcInstance;
}

// ✅ Convert Node.js arguments to JNI-compatible arguments
void ConvertArgs(const FunctionCallbackInfo<Value>& args, std::vector<jvalue>& jniArgs, Isolate* isolate) {
    for (int i = 0; i < args.Length(); i++) {
        jvalue jniArg = {};
        String::Utf8Value strValue(isolate, args[i]->ToString(isolate->GetCurrentContext()).ToLocalChecked());
        jniArg.l = env->NewStringUTF(*strValue);
        jniArgs.push_back(jniArg);
    }
}

// ✅ Call Java function and handle exceptions
void CallJavaFunction(const FunctionCallbackInfo<Value>& args, const char* methodName, const char* methodSignature) {
    Isolate* isolate = args.GetIsolate();
    CreateJVM();
    jobject eigcObj = GetEigcInstance();
    jclass eigcClass = env->GetObjectClass(eigcObj);
    jmethodID method = env->GetMethodID(eigcClass, methodName, methodSignature);
    std::vector<jvalue> jniArgs;
    ConvertArgs(args, jniArgs, isolate);
    jstring result = (jstring)env->CallObjectMethodA(eigcObj, method, jniArgs.data());
    
    if (env->ExceptionCheck()) {
        std::cerr << "❌ Java Exception Occurred!" << std::endl;
        env->ExceptionDescribe(); // Log exception details
        env->ExceptionClear();
        args.GetReturnValue().Set(String::NewFromUtf8(isolate, "{}" ).ToLocalChecked());
        return;
    }
    
    if (result == nullptr) {
        std::cerr << "❌ Java returned NULL result!" << std::endl;
        args.GetReturnValue().Set(String::NewFromUtf8(isolate, "{}" ).ToLocalChecked());
        return;
    }
    
    const char *resultStr = env->GetStringUTFChars(result, NULL);
    if (resultStr == nullptr) {
        std::cerr << "❌ Failed to retrieve Java string!" << std::endl;
        args.GetReturnValue().Set(String::NewFromUtf8(isolate, "{}" ).ToLocalChecked());
    } else {
        args.GetReturnValue().Set(String::NewFromUtf8(isolate, resultStr).ToLocalChecked());
        env->ReleaseStringUTFChars(result, resultStr);
    }
    
    env->DeleteLocalRef(eigcObj);
    env->DeleteLocalRef(eigcClass);
    env->DeleteLocalRef(result);
    for (jvalue jval : jniArgs) {
        if (jval.l) env->DeleteLocalRef(jval.l);
    }
}

// ✅ Define exposed Node.js functions
void HtmlToRaster(const FunctionCallbackInfo<Value>& args) {
    CallJavaFunction(args, "htmlToRaster", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;");
}

void RasterToRaster(const FunctionCallbackInfo<Value>& args) {
    CallJavaFunction(args, "rasterToRaster", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;");
}

void RasterToSvg(const FunctionCallbackInfo<Value>& args) {
    CallJavaFunction(args, "rasterToSvg", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;");
}

void SvgToRaster(const FunctionCallbackInfo<Value>& args) {
    CallJavaFunction(args, "svgToRaster", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;");
}

void SvgToVector(const FunctionCallbackInfo<Value>& args) {
    CallJavaFunction(args, "svgToVector", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;");
}

void RasterToVector(const FunctionCallbackInfo<Value>& args) {
    CallJavaFunction(args, "rasterToVector", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;");
}

void InkscapeToImage(const FunctionCallbackInfo<Value>& args) {
    CallJavaFunction(args, "inkscapeToImage", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;");
}

// ✅ Initialize module
void Initialize(Local<Object> exports) {
    NODE_SET_METHOD(exports, "htmlToRaster", HtmlToRaster);
    NODE_SET_METHOD(exports, "rasterToRaster", RasterToRaster);
    NODE_SET_METHOD(exports, "rasterToSvg", RasterToSvg);
    NODE_SET_METHOD(exports, "svgToRaster", SvgToRaster);
    NODE_SET_METHOD(exports, "svgToVector", SvgToVector);
    NODE_SET_METHOD(exports, "rasterToVector", RasterToVector);
    NODE_SET_METHOD(exports, "inkscapeToImage", InkscapeToImage);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)
