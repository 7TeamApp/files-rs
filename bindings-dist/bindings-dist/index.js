import {
  __name,
  __require,
  __toCommonJS,
  init_javascript,
  javascript_exports
} from "./chunk-4TCID4PF.js";

// src/main.ts
var { existsSync, readFileSync } = __require("node:fs");
var { join } = __require("node:path");
var { platform, arch } = process;
var nativeBinding = null;
var isLocalFileExist = false;
var loadError = null;
function isMusl() {
  if (!process.report || typeof process.report.getReport !== "function") {
    try {
      const lddPath = __require("node:child_process").execSync("which ldd").toString().trim();
      return readFileSync(lddPath, "utf8").includes("musl");
    } catch {
      return true;
    }
  } else {
    const { glibcVersionRuntime } = process.report.getReport().header;
    return !glibcVersionRuntime;
  }
}
__name(isMusl, "isMusl");
switch (platform) {
  case "android": {
    switch (arch) {
      case "arm64": {
        isLocalFileExist = existsSync(
          join(__dirname, "../node/files-rs.android-arm64.node")
        );
        try {
          if (isLocalFileExist) {
            nativeBinding = __require("../node/files-rs.android-arm64.node");
          } else {
            nativeBinding = __require("files-rs-android-arm64");
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
            nativeBinding = __require("../node/files-rs.android-arm-eabi.node");
          } else {
            nativeBinding = __require("files-rs-android-arm-eabi");
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
            nativeBinding = (init_javascript(), __toCommonJS(javascript_exports));
          } else {
            nativeBinding = __require("files-rs-javascript");
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
            nativeBinding = __require("../node/files-rs.win32-x64-msvc.node");
          } else {
            nativeBinding = __require("files-rs-win32-x64-msvc");
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
            nativeBinding = __require("../node/files-rs.win32-ia32-msvc.node");
          } else {
            nativeBinding = __require("files-rs-win32-ia32-msvc");
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
            nativeBinding = __require("../node/files-rs.win32-arm64-msvc.node");
          } else {
            nativeBinding = __require("files-rs-win32-arm64-msvc");
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
            nativeBinding = (init_javascript(), __toCommonJS(javascript_exports));
          } else {
            nativeBinding = __require("files-rs-javascript");
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
        nativeBinding = __require("../node/files-rs.darwin-universal.node");
      } else {
        nativeBinding = __require("files-rs-darwin-universal");
      }
      break;
    } catch {
    }
    switch (arch) {
      case "x64": {
        console.log(isLocalFileExist);
        try {
          nativeBinding = __require("../node/files-rs.darwin-x64.node");
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
            nativeBinding = __require("../node/files-rs.darwin-arm64.node");
          } else {
            nativeBinding = __require("files-rs-darwin-arm64");
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
            nativeBinding = (init_javascript(), __toCommonJS(javascript_exports));
          } else {
            nativeBinding = __require("files-rs-javascript");
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
          nativeBinding = (init_javascript(), __toCommonJS(javascript_exports));
        } else {
          nativeBinding = __require("files-rs-javascript");
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
        nativeBinding = __require("../node/files-rs.freebsd-x64.node");
      } else {
        nativeBinding = __require("files-rs-freebsd-x64");
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
              nativeBinding = __require("../node/files-rs.linux-x64-musl.node");
            } else {
              nativeBinding = __require("files-rs-linux-x64-musl");
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
              nativeBinding = __require("../node/files-rs.linux-x64-gnu.node");
            } else {
              nativeBinding = __require("files-rs-linux-x64-gnu");
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
              nativeBinding = __require("../node/files-rs.linux-arm64-musl.node");
            } else {
              nativeBinding = __require("files-rs-linux-arm64-musl");
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
              nativeBinding = __require("../node/files-rs.linux-arm64-gnu.node");
            } else {
              nativeBinding = __require("files-rs-linux-arm64-gnu");
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
              nativeBinding = __require("../node/files-rs.linux-arm-musleabihf.node");
            } else {
              nativeBinding = __require("files-rs-linux-arm-musleabihf");
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
              nativeBinding = __require("../node/files-rs.linux-arm-gnueabihf.node");
            } else {
              nativeBinding = __require("files-rs-linux-arm-gnueabihf");
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
              nativeBinding = __require("../node/files-rs.linux-riscv64-musl.node");
            } else {
              nativeBinding = __require("files-rs-linux-riscv64-musl");
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
              nativeBinding = __require("../node/files-rs.linux-riscv64-gnu.node");
            } else {
              nativeBinding = __require("files-rs-linux-riscv64-gnu");
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
            nativeBinding = __require("../node/files-rs.linux-s390x-gnu.node");
          } else {
            nativeBinding = __require("files-rs-linux-s390x-gnu");
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
            nativeBinding = (init_javascript(), __toCommonJS(javascript_exports));
          } else {
            nativeBinding = __require("files-rs-javascript");
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
        nativeBinding = (init_javascript(), __toCommonJS(javascript_exports));
      } else {
        nativeBinding = __require("files-rs-javascript");
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
var copy = /* @__PURE__ */ __name((path, outDir) => {
  if (typeof path === "string") {
    main_default.jsCopySingle(path, outDir);
  } else if (Array.isArray(path)) {
    main_default.jsCopyMulty(path, outDir);
  } else {
    throw new Error("path must be string or array of strings");
  }
}, "copy");
var copyGlob = /* @__PURE__ */ __name((pattern, outDir) => {
  if (typeof pattern === "string") {
    main_default.jsCopyGlobSingle(pattern, outDir);
  } else if (Array.isArray(pattern)) {
    main_default.jsCopyGlobMulty(pattern, outDir);
  } else {
    throw new Error("pattern must be string or array of strings");
  }
}, "copyGlob");
var src_default = { copy, copyGlob };
export {
  copy,
  copyGlob,
  src_default as default
};
