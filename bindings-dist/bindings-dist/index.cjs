"use strict";Object.defineProperty(exports, "__esModule", {value: true});





var _chunkSYT4PYHAcjs = require('./chunk-SYT4PYHA.cjs');

// src/main.ts
var { existsSync, readFileSync } = _chunkSYT4PYHAcjs.__require.call(void 0, "fs");
var { join } = _chunkSYT4PYHAcjs.__require.call(void 0, "path");
var { platform, arch } = process;
var nativeBinding = null;
var isLocalFileExist = false;
var loadError = null;
function isMusl() {
  if (!process.report || typeof process.report.getReport !== "function") {
    try {
      const lddPath = _chunkSYT4PYHAcjs.__require.call(void 0, "child_process").execSync("which ldd").toString().trim();
      return readFileSync(lddPath, "utf8").includes("musl");
    } catch (e2) {
      return true;
    }
  } else {
    const { glibcVersionRuntime } = process.report.getReport().header;
    return !glibcVersionRuntime;
  }
}
_chunkSYT4PYHAcjs.__name.call(void 0, isMusl, "isMusl");
switch (platform) {
  case "android": {
    switch (arch) {
      case "arm64": {
        isLocalFileExist = existsSync(
          join(__dirname, "../node/files-rs.android-arm64.node")
        );
        try {
          if (isLocalFileExist) {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.android-arm64.node");
          } else {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-android-arm64");
          }
        } catch (e) {
          loadError = e;
        }
        break;
      }
      case "arm": {
        isLocalFileExist = existsSync(
          join(__dirname, "../node/files-rs.android-arm-eabi.node")
        );
        try {
          if (isLocalFileExist) {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.android-arm-eabi.node");
          } else {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-android-arm-eabi");
          }
        } catch (e) {
          loadError = e;
        }
        break;
      }
      default: {
        console.error(
          `Unsupported architecture on Android ${arch}. Will use javascript version`
        );
        isLocalFileExist = existsSync(
          join(__dirname, "javascript.js")
        );
        try {
          if (isLocalFileExist) {
            nativeBinding = (_chunkSYT4PYHAcjs.init_javascript.call(void 0, ), _chunkSYT4PYHAcjs.__toCommonJS.call(void 0, _chunkSYT4PYHAcjs.javascript_exports));
          } else {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-javascript");
          }
        } catch (e) {
          loadError = e;
        }
      }
    }
    break;
  }
  case "win32": {
    switch (arch) {
      case "x64": {
        isLocalFileExist = existsSync(
          join(__dirname, "../node/files-rs.win32-x64-msvc.node")
        );
        try {
          if (isLocalFileExist) {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.win32-x64-msvc.node");
          } else {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-win32-x64-msvc");
          }
        } catch (e) {
          loadError = e;
        }
        break;
      }
      case "ia32": {
        isLocalFileExist = existsSync(
          join(__dirname, "../node/files-rs.win32-ia32-msvc.node")
        );
        try {
          if (isLocalFileExist) {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.win32-ia32-msvc.node");
          } else {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-win32-ia32-msvc");
          }
        } catch (e) {
          loadError = e;
        }
        break;
      }
      case "arm64": {
        isLocalFileExist = existsSync(
          join(__dirname, "../node/files-rs.win32-arm64-msvc.node")
        );
        try {
          if (isLocalFileExist) {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.win32-arm64-msvc.node");
          } else {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-win32-arm64-msvc");
          }
        } catch (e) {
          loadError = e;
        }
        break;
      }
      default: {
        console.error(
          `Unsupported architecture on Windows: ${arch}. Will use javascript version`
        );
        isLocalFileExist = existsSync(
          join(__dirname, "javascript.js")
        );
        try {
          if (isLocalFileExist) {
            nativeBinding = (_chunkSYT4PYHAcjs.init_javascript.call(void 0, ), _chunkSYT4PYHAcjs.__toCommonJS.call(void 0, _chunkSYT4PYHAcjs.javascript_exports));
          } else {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-javascript");
          }
        } catch (e) {
          loadError = e;
        }
      }
    }
    break;
  }
  case "darwin": {
    isLocalFileExist = existsSync(
      join(__dirname, "../node/files-rs.darwin-universal.node")
    );
    try {
      if (isLocalFileExist) {
        nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.darwin-universal.node");
      } else {
        nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-darwin-universal");
      }
      break;
    } catch (e3) {
    }
    switch (arch) {
      case "x64": {
        console.log(isLocalFileExist);
        try {
          nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.darwin-x64.node");
        } catch (e) {
          loadError = e;
        }
        break;
      }
      case "arm64": {
        isLocalFileExist = existsSync(
          join(__dirname, "../node/files-rs.darwin-arm64.node")
        );
        try {
          if (isLocalFileExist) {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.darwin-arm64.node");
          } else {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-darwin-arm64");
          }
        } catch (e) {
          loadError = e;
        }
        break;
      }
      default: {
        console.error(
          `Unsupported architecture on macOS: ${arch}. Will use javascript version`
        );
        isLocalFileExist = existsSync(
          join(__dirname, "javascript.js")
        );
        try {
          if (isLocalFileExist) {
            nativeBinding = (_chunkSYT4PYHAcjs.init_javascript.call(void 0, ), _chunkSYT4PYHAcjs.__toCommonJS.call(void 0, _chunkSYT4PYHAcjs.javascript_exports));
          } else {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-javascript");
          }
        } catch (e) {
          loadError = e;
        }
      }
    }
    break;
  }
  case "freebsd": {
    if (arch !== "x64") {
      console.error(
        `Unsupported architecture on FreeBSD: ${arch}. Will use javascript version`
      );
      isLocalFileExist = existsSync(
        join(__dirname, "javascript.js")
      );
      try {
        if (isLocalFileExist) {
          nativeBinding = (_chunkSYT4PYHAcjs.init_javascript.call(void 0, ), _chunkSYT4PYHAcjs.__toCommonJS.call(void 0, _chunkSYT4PYHAcjs.javascript_exports));
        } else {
          nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-javascript");
        }
      } catch (e) {
        loadError = e;
      }
    }
    isLocalFileExist = existsSync(
      join(__dirname, "../node/files-rs.freebsd-x64.node")
    );
    try {
      if (isLocalFileExist) {
        nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.freebsd-x64.node");
      } else {
        nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-freebsd-x64");
      }
    } catch (e) {
      loadError = e;
    }
    break;
  }
  case "linux": {
    switch (arch) {
      case "x64": {
        if (isMusl()) {
          isLocalFileExist = existsSync(
            join(
              __dirname,
              "../node/files-rs.linux-x64-musl.node"
            )
          );
          try {
            if (isLocalFileExist) {
              nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.linux-x64-musl.node");
            } else {
              nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-linux-x64-musl");
            }
          } catch (e) {
            loadError = e;
          }
        } else {
          isLocalFileExist = existsSync(
            join(__dirname, "../node/files-rs.linux-x64-gnu.node")
          );
          try {
            if (isLocalFileExist) {
              nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.linux-x64-gnu.node");
            } else {
              nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-linux-x64-gnu");
            }
          } catch (e) {
            loadError = e;
          }
        }
        break;
      }
      case "arm64": {
        if (isMusl()) {
          isLocalFileExist = existsSync(
            join(
              __dirname,
              "../node/files-rs.linux-arm64-musl.node"
            )
          );
          try {
            if (isLocalFileExist) {
              nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.linux-arm64-musl.node");
            } else {
              nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-linux-arm64-musl");
            }
          } catch (e) {
            loadError = e;
          }
        } else {
          isLocalFileExist = existsSync(
            join(
              __dirname,
              "../node/files-rs.linux-arm64-gnu.node"
            )
          );
          try {
            if (isLocalFileExist) {
              nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.linux-arm64-gnu.node");
            } else {
              nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-linux-arm64-gnu");
            }
          } catch (e) {
            loadError = e;
          }
        }
        break;
      }
      case "arm": {
        if (isMusl()) {
          isLocalFileExist = existsSync(
            join(
              __dirname,
              "../node/files-rs.linux-arm-musleabihf.node"
            )
          );
          try {
            if (isLocalFileExist) {
              nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.linux-arm-musleabihf.node");
            } else {
              nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-linux-arm-musleabihf");
            }
          } catch (e) {
            loadError = e;
          }
        } else {
          isLocalFileExist = existsSync(
            join(
              __dirname,
              "../node/files-rs.linux-arm-gnueabihf.node"
            )
          );
          try {
            if (isLocalFileExist) {
              nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.linux-arm-gnueabihf.node");
            } else {
              nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-linux-arm-gnueabihf");
            }
          } catch (e) {
            loadError = e;
          }
        }
        break;
      }
      case "riscv64": {
        if (isMusl()) {
          isLocalFileExist = existsSync(
            join(
              __dirname,
              "../node/files-rs.linux-riscv64-musl.node"
            )
          );
          try {
            if (isLocalFileExist) {
              nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.linux-riscv64-musl.node");
            } else {
              nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-linux-riscv64-musl");
            }
          } catch (e) {
            loadError = e;
          }
        } else {
          isLocalFileExist = existsSync(
            join(
              __dirname,
              "../node/files-rs.linux-riscv64-gnu.node"
            )
          );
          try {
            if (isLocalFileExist) {
              nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.linux-riscv64-gnu.node");
            } else {
              nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-linux-riscv64-gnu");
            }
          } catch (e) {
            loadError = e;
          }
        }
        break;
      }
      case "s390x": {
        isLocalFileExist = existsSync(
          join(__dirname, "../node/files-rs.linux-s390x-gnu.node")
        );
        try {
          if (isLocalFileExist) {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "../node/files-rs.linux-s390x-gnu.node");
          } else {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-linux-s390x-gnu");
          }
        } catch (e) {
          loadError = e;
        }
        break;
      }
      default: {
        console.error(
          `Unsupported architecture on Linux: ${arch}. Will use javascript version`
        );
        isLocalFileExist = existsSync(
          join(__dirname, "javascript.js")
        );
        try {
          if (isLocalFileExist) {
            nativeBinding = (_chunkSYT4PYHAcjs.init_javascript.call(void 0, ), _chunkSYT4PYHAcjs.__toCommonJS.call(void 0, _chunkSYT4PYHAcjs.javascript_exports));
          } else {
            nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-javascript");
          }
        } catch (e) {
          loadError = e;
        }
      }
    }
    break;
  }
  default: {
    console.error(
      `Unsupported OS: ${platform}, architecture: ${arch}. Will use javascript version`
    );
    isLocalFileExist = existsSync(
      join(__dirname, "javascript.js")
    );
    try {
      if (isLocalFileExist) {
        nativeBinding = (_chunkSYT4PYHAcjs.init_javascript.call(void 0, ), _chunkSYT4PYHAcjs.__toCommonJS.call(void 0, _chunkSYT4PYHAcjs.javascript_exports));
      } else {
        nativeBinding = _chunkSYT4PYHAcjs.__require.call(void 0, "files-rs-javascript");
      }
    } catch (e) {
      loadError = e;
    }
  }
}
if (!nativeBinding) {
  if (loadError) {
    throw loadError;
  }
  throw new Error("Failed to load native binding");
}
var main_default = nativeBinding;

// src/index.ts
var copy = /* @__PURE__ */ _chunkSYT4PYHAcjs.__name.call(void 0, (path, outDir) => {
  if (typeof path === "string") {
    main_default.jsCopySingle(path, outDir);
  } else if (Array.isArray(path)) {
    main_default.jsCopyMulty(path, outDir);
  } else {
    throw new Error("path must be string or array of strings");
  }
}, "copy");
var copyGlob = /* @__PURE__ */ _chunkSYT4PYHAcjs.__name.call(void 0, (pattern, outDir) => {
  if (typeof pattern === "string") {
    main_default.jsCopyGlobSingle(pattern, outDir);
  } else if (Array.isArray(pattern)) {
    main_default.jsCopyGlobMulty(pattern, outDir);
  } else {
    throw new Error("pattern must be string or array of strings");
  }
}, "copyGlob");
var src_default = { copy, copyGlob };




exports.copy = copy; exports.copyGlob = copyGlob;module.exports=src_default;
exports.default=module.exports