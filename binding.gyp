{
  "variables": {
    "JAVA_HOME": "<!(echo $JAVA_HOME)"
  },
  "targets": [
    {
      "target_name": "eigc",
      "sources": [ "binding.cpp" ],
      "include_dirs": [
        "<!(node -e \"require('node-addon-api').include\")",
        "<(JAVA_HOME)/include"
      ],
      "conditions": [
        [ "OS=='mac'", { "include_dirs": [ "<(JAVA_HOME)/include/darwin" ] } ],
        [ "OS=='linux'", { "include_dirs": [ "<(JAVA_HOME)/include/linux" ] } ],
        [ "OS=='win'", { "include_dirs": [ "<(JAVA_HOME)/include/win32" ] } ]
      ],
      "library_dirs": [
        "<(JAVA_HOME)/lib/server"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "libraries": [
        "-L<(JAVA_HOME)/lib/server",
        "-ljvm",
        "-Wl,-rpath,<(JAVA_HOME)/lib/server"
      ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ]
    }
  ]
}
