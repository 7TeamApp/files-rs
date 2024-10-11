"use strict";Object.defineProperty(exports, "__esModule", {value: true});var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/javascript.ts
var javascript_exports = {};
__export(javascript_exports, {
  jsCopyGlobMulty: () => jsCopyGlobMulty,
  jsCopyGlobSingle: () => jsCopyGlobSingle,
  jsCopyMulty: () => jsCopyMulty,
  jsCopySingle: () => jsCopySingle
});
var jsCopyGlobMulty, jsCopyGlobSingle, jsCopyMulty, jsCopySingle;
var init_javascript = __esm({
  "src/javascript.ts"() {
    jsCopyGlobMulty = exports.jsCopyGlobMulty = /* @__PURE__ */ __name((pattern, outDir) => {
    }, "jsCopyGlobMulty");
    jsCopyGlobSingle = exports.jsCopyGlobSingle = /* @__PURE__ */ __name((pattern, outDir) => {
    }, "jsCopyGlobSingle");
    jsCopyMulty = exports.jsCopyMulty = /* @__PURE__ */ __name((path, outDir) => {
    }, "jsCopyMulty");
    jsCopySingle = exports.jsCopySingle = /* @__PURE__ */ __name((path, outDir) => {
    }, "jsCopySingle");
  }
});











exports.__name = __name; exports.__require = __require; exports.__toCommonJS = __toCommonJS; exports.jsCopyGlobMulty = jsCopyGlobMulty; exports.jsCopyGlobSingle = jsCopyGlobSingle; exports.jsCopyMulty = jsCopyMulty; exports.jsCopySingle = jsCopySingle; exports.javascript_exports = javascript_exports; exports.init_javascript = init_javascript;
