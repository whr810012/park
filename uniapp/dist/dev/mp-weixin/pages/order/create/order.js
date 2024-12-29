(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/create/order"],{

/***/ 309:
/*!***************************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Forder%2Fcreate%2Forder"} ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);
__webpack_require__(/*! @dcloudio/uni-stat */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _order = _interopRequireDefault(__webpack_require__(/*! ./pages/order/create/order.vue */ 310));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
createPage(_order.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 310:
/*!******************************************!*\
  !*** ./src/pages/order/create/order.vue ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _order_vue_vue_type_template_id_3292d856___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order.vue?vue&type=template&id=3292d856& */ 311);
/* harmony import */ var _order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./order.vue?vue&type=script&lang=js& */ 313);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./order.vue?vue&type=style&index=0&lang=scss& */ 315);
/* harmony import */ var _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 44);

var renderjs





/* normalize component */

var component = Object(_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _order_vue_vue_type_template_id_3292d856___WEBPACK_IMPORTED_MODULE_0__["render"],
  _order_vue_vue_type_template_id_3292d856___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _order_vue_vue_type_template_id_3292d856___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/order/create/order.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 311:
/*!*************************************************************************!*\
  !*** ./src/pages/order/create/order.vue?vue&type=template&id=3292d856& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_template_id_3292d856___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./order.vue?vue&type=template&id=3292d856& */ 312);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_template_id_3292d856___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_template_id_3292d856___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_template_id_3292d856___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_template_id_3292d856___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 312:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./src/pages/order/create/order.vue?vue&type=template&id=3292d856& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    rfImage: function () {
      return Promise.all(/*! import() | components/rf-image/rf-image */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/rf-image/rf-image")]).then(__webpack_require__.bind(null, /*! @/components/rf-image/rf-image.vue */ 491))
    },
    uniTag: function () {
      return __webpack_require__.e(/*! import() | components/uni-tag/uni-tag */ "components/uni-tag/uni-tag").then(__webpack_require__.bind(null, /*! @/components/uni-tag/uni-tag.vue */ 621))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var m0 = _vm.orderDetail.products
    ? parseInt(_vm.currentShippingType.value, 10) === 1 &&
      _vm.orderDetail.company.length > 0
    : null
  var m1 = _vm.orderDetail.products
    ? parseInt(_vm.currentShippingType.value, 10)
    : null
  var l0 = _vm.orderDetail.products
    ? _vm.__map(_vm.orderDetail.marketing_details, function (item, index) {
        var $orig = _vm.__get_orig(item)
        var m2 =
          (item.discount_money > 0 || item.give_point > 0) &&
          item.marketing_type === "give_point"
            ? _vm.givePoint(item.give_point)
            : null
        return {
          $orig: $orig,
          m2: m2,
        }
      })
    : null
  var m3 =
    _vm.orderDetail.products && _vm.invoiceItem.type
      ? parseInt(_vm.invoiceItem.type, 10)
      : null
  var m4 = parseFloat(_vm.amountGoods)
  var l1 = _vm.__map(_vm.orderDetail.coupons, function (item, index) {
    var $orig = _vm.__get_orig(item)
    var m5 = parseFloat(item.at_least)
    var m6 = parseInt(item.range_type, 10)
    var f0 = _vm._f("time")(item.start_time)
    var f1 = _vm._f("time")(item.end_time)
    var m7 = parseInt(item.range_type, 10)
    return {
      $orig: $orig,
      m5: m5,
      m6: m6,
      f0: f0,
      f1: f1,
      m7: m7,
    }
  })
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      $event.stopPropagation()
      return _vm.clearCoupon($event)
    }
    _vm.e1 = function ($event) {
      $event.stopPropagation()
      return _vm.closeInvoice($event)
    }
    _vm.e2 = function ($event, item) {
      var _temp = arguments[arguments.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        item = _temp2.item
      var _temp, _temp2
      $event.stopPropagation()
      return _vm.handleInvoiceChange(item)
    }
    _vm.e3 = function ($event) {
      $event.stopPropagation()
      $event.preventDefault()
      return _vm.stopPrevent($event)
    }
    _vm.e4 = function ($event, item) {
      var _temp3 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp4 = _temp3.eventParams || _temp3["event-params"],
        item = _temp4.item
      var _temp3, _temp4
      $event.stopPropagation()
      return _vm.selectCoupon(item)
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        m1: m1,
        l0: l0,
        m3: m3,
        m4: m4,
        l1: l1,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 313:
/*!*******************************************************************!*\
  !*** ./src/pages/order/create/order.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_cli_plugin_babel_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./order.vue?vue&type=script&lang=js& */ 314);
/* harmony import */ var _node_modules_vue_cli_plugin_babel_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_plugin_babel_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_cli_plugin_babel_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_cli_plugin_babel_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_cli_plugin_babel_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 314:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./src/pages/order/create/order.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _product = __webpack_require__(/*! @/api/product */ 62);
var _moment = _interopRequireDefault(__webpack_require__(/*! @/common/moment */ 87));
var _vuex = __webpack_require__(/*! vuex */ 41);
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var rfPicker = function rfPicker() {
  __webpack_require__.e(/*! require.ensure | components/rf-picker/index */ "components/rf-picker/index").then((function () {
    return resolve(__webpack_require__(/*! @/components/rf-picker */ 718));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var rfNoData = function rfNoData() {
  Promise.all(/*! require.ensure | components/rf-no-data/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/rf-no-data/index")]).then((function () {
    return resolve(__webpack_require__(/*! @/components/rf-no-data */ 690));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = exports.default = {
  components: {
    rfPicker: rfPicker,
    rfNoData: rfNoData
  },
  data: function data() {
    return {
      maskState: 0,
      // 优惠券面板显示状态
      isFullPayment: 0,
      // 是否全款预定，默认全款预定
      desc: '',
      // 备注
      payType: 1,
      // 1微信 2支付宝
      orderDetail: {},
      pointExchangeType: [],
      loadingType: 'more',
      // 加载更多状态
      pickerShippingType: [],
      btnLoading: false,
      currentShippingType: {
        value: ''
      },
      currentCompany: {},
      currentPickupPoint: {},
      cartIds: null,
      invoiceItem: {},
      addressData: {},
      couponItem: {},
      pointConfig: {},
      product: null,
      shippingMoney: 0,
      isUsePoint: false,
      isUsePointDisabled: false,
      data: {},
      userInfo: {},
      use_point: 0,
      invoiceContent: null,
      loading: true,
      errorInfo: '',
      buyerMessage: '',
      promoCode: '',
      moneySymbol: this.moneySymbol,
      logo: this.$mSettingConfig.appLogo,
      singleSkuText: this.singleSkuText
    };
  },
  computed: {
    // 计算商品金额
    amountGoods: function amountGoods() {
      return this.orderDetail.preview && this.orderDetail.preview.product_money;
    },
    // 计算优惠金额
    discountAmount: function discountAmount() {
      var discountMoney = this.floor((100 - this.couponItem.discount) / 100 * this.amountGoods);
      return parseInt(this.couponItem.type, 10) === 2 ? discountMoney : this.couponItem.money || 0;
    },
    // 计算实付金额
    realAmount: function realAmount() {
      var realAmount = this.amountGoods - this.discountAmount + parseFloat(this.shippingMoney) - (this.isUsePoint ? this.maxUsePointFee : 0);
      return (parseFloat(this.invoiceAmount) + realAmount > 0 ? parseFloat(this.invoiceAmount) + realAmount : 0).toFixed(2);
    },
    // 计算发票税费
    invoiceAmount: function invoiceAmount() {
      var realAmount = this.amountGoods - this.discountAmount - (this.isUsePoint ? this.maxUsePointFee : 0);
      return this.invoiceItem.type ? this.floor(this.orderDetail.invoice.order_invoice_tax / 100 * realAmount) : 0;
    },
    // 计算可用积分
    maxUsePoint: function maxUsePoint() {
      return this.orderDetail.max_use_point > uni.getStorageSync('userInfo').account.user_integral ? uni.getStorageSync('userInfo').account.user_integral : this.orderDetail.max_use_point;
    },
    // 计算最大积分可抵扣金额
    maxUsePointFee: function maxUsePointFee() {
      return this.maxUsePoint * this.pointConfig.convert_rate;
    },
    givePoint: function givePoint() {
      return function (val) {
        if (this.couponItem.discount) {
          return Math.floor(this.couponItem.discount / 100 * val);
        } else {
          return val;
        }
      };
    }
  },
  filters: {
    time: function time(val) {
      return (0, _moment.default)(val * 1000).format('YY/MM/DD HH:mm');
    }
  },
  onShow: function onShow() {
    if (this.addressData && this.addressData.realname) {
      this.getOrderFreightFee();
    }
  },
  onLoad: function onLoad(options) {
    this.initData(options);
  },
  methods: _objectSpread(_objectSpread({}, (0, _vuex.mapMutations)(['setCartNum'])), {}, {
    handleIsFullPayment: function handleIsFullPayment(e) {
      this.isFullPayment = e.detail.value;
    },
    handleInvoiceChange: function handleInvoiceChange(val) {
      this.invoiceContent = val;
    },
    navTo: function navTo(route) {
      this.$mRouter.push({
        route: route
      });
    },
    // 不使用发票
    closeInvoice: function closeInvoice() {
      this.invoiceItem = {};
    },
    // 不使用优惠券
    clearCoupon: function clearCoupon() {
      this.couponItem = {};
    },
    // 向下取整
    floor: function floor(val) {
      return Math.floor(val * 100) / 100;
    },
    // 是否使用积分抵扣
    handleIsUsePoint: function handleIsUsePoint() {
      if (this.isUsePoint) {
        this.isUsePoint = false;
        this.use_point = 0;
      } else {
        this.isUsePoint = true;
        this.use_point = this.maxUsePoint;
      }
    },
    // 选择物流
    showSinglePicker: function showSinglePicker() {
      this.$refs.shippingTypePicker.show();
    },
    // 选择快递公司
    showCompanyPicker: function showCompanyPicker() {
      this.$refs.companyTypePicker.show();
    },
    // 选择自提点
    showPickupPointPicker: function showPickupPointPicker() {
      this.$refs.pickupPointPicker.show();
    },
    // 确定选择物流
    onShippingConfirm: function onShippingConfirm(e) {
      e.value = e.value[0];
      this.currentShippingType = e;
      if (this.currentShippingType.value.toString() === '2') {
        if (parseFloat(this.realAmount) > parseFloat(this.orderDetail.pickup_point_config.pickup_point_freight)) {
          this.shippingMoney = 0;
        } else {
          this.shippingMoney = parseFloat(this.orderDetail.pickup_point_config.pickup_point_fee) || 0;
        }
      } else {
        this.currentCompany = this.orderDetail.company[0];
        this.getOrderFreightFee();
      }
    },
    // 确定选择快递公司
    onCompanyConfirm: function () {
      var _onCompanyConfirm = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              e.value = e.value[0];
              this.currentCompany = e;
              if (!this.orderDetail.is_full_mail) {
                _context.next = 5;
                break;
              }
              this.shippingMoney = 0;
              return _context.abrupt("return");
            case 5:
              this.getOrderFreightFee();
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function onCompanyConfirm(_x) {
        return _onCompanyConfirm.apply(this, arguments);
      }
      return onCompanyConfirm;
    }(),
    // 确定选择自提点
    onPickupPointConfirm: function () {
      var _onPickupPointConfirm = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              e.value = e.value[0];
              this.currentPickupPoint = e;
              if (this.currentPickupPoint) {
                this.shippingMoney = parseFloat(this.orderDetail.pickup_point_config.pickup_point_fee) || 0;
              }
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function onPickupPointConfirm(_x2) {
        return _onPickupPointConfirm.apply(this, arguments);
      }
      return onPickupPointConfirm;
    }(),
    // 计算运费
    getOrderFreightFee: function () {
      var _getOrderFreightFee = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _this = this;
        var params;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              params = {};
              if (this.addressData) {
                params.address_id = this.addressData.id;
              }
              if (this.currentCompany) {
                params.company_id = this.currentCompany.value;
              }
              _context3.next = 5;
              return this.$http.get("".concat(_product.orderFreightFee), _objectSpread(_objectSpread({}, params), this.data)).then(function (r) {
                _this.shippingMoney = r.data.shipping_money || 0;
              });
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function getOrderFreightFee() {
        return _getOrderFreightFee.apply(this, arguments);
      }
      return getOrderFreightFee;
    }(),
    // 数据初始化
    initData: function () {
      var _initData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(options) {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              this.promoCode = options.promo_code;
              _context4.next = 3;
              return JSON.parse(options.data);
            case 3:
              this.data = _context4.sent;
              this.userInfo = uni.getStorageSync('userInfo');
              _context4.next = 7;
              return this.getOrderDetail();
            case 7:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function initData(_x3) {
        return _initData.apply(this, arguments);
      }
      return initData;
    }(),
    // 获取订单详情
    getOrderDetail: function () {
      var _getOrderDetail = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.$http.get("".concat(_product.orderPreview), this.data).then(function (r) {
                _this2.loading = false;
                _this2.orderDetail = r.data;
                _this2.pointConfig = _this2.orderDetail.point_config;
                _this2.addressData = _this2.orderDetail.address;
                _this2.couponItem = _this2.orderDetail && _this2.orderDetail.coupons[0] || {};
                _this2.orderDetail.company.forEach(function (item) {
                  item.label = item.title;
                  item.value = item.id;
                });
                _this2.currentCompany = _this2.orderDetail.company[0];
                _this2.pointExchangeType = [];
                _this2.orderDetail.products.forEach(function (item) {
                  _this2.pointExchangeType.push(item.point_exchange_type);
                });
                _this2.shippingMoney = r.data.preview.shipping_money;
                if (_this2.orderDetail.is_open_logistics === '1') {
                  _this2.pickerShippingType.push({
                    label: '物流配送',
                    value: 1
                  });
                }
                if (_this2.orderDetail.pickup_point_config.buyer_self_lifting === '1') {
                  _this2.orderDetail.pickup_point_config.list.forEach(function (item) {
                    item.label = "".concat(item.contact || '无名', " - ").concat(item.name || '未知', " - ").concat(item.address || '未知');
                    item.value = item.id;
                  });
                  _this2.currentPickupPoint = _this2.orderDetail.pickup_point_config.list[0] || {};
                  _this2.pickerShippingType.push({
                    label: '买家自提',
                    value: 2
                  });
                } else {
                  _this2.orderDetail.pickup_point_config.list = [];
                }
                if (_this2.pickerShippingType.length > 0) {
                  _this2.currentShippingType = _this2.pickerShippingType[0];
                }
              }).catch(function (err) {
                _this2.loading = false;
                _this2.errorInfo = err;
              });
            case 2:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function getOrderDetail() {
        return _getOrderDetail.apply(this, arguments);
      }
      return getOrderDetail;
    }(),
    // 显示优惠券面板
    toggleMask: function toggleMask(type) {
      var _this3 = this;
      if ('combination,wholesale,group_buy'.indexOf(this.data.type) !== -1) {
        this.$mHelper.toast('套餐购买/拼团/团购下单不支持选择购物券');
        return;
      }
      var timer = type === 'show' ? 10 : 300;
      var state = type === 'show' ? 1 : 0;
      this.maskState = 2;
      setTimeout(function () {
        _this3.maskState = state;
      }, timer);
    },
    numberChange: function numberChange(data) {
      this.number = data.number;
    },
    changePayType: function changePayType(type) {
      this.payType = type;
    },
    submit: function () {
      var _submit = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var _this4 = this;
        var params;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (!(this.orderDetail.close_all_logistics === '1')) {
                _context6.next = 3;
                break;
              }
              this.$mHelper.toast('物流配送暂未开启，请联系客服');
              return _context6.abrupt("return");
            case 3:
              if (!(this.pickerShippingType.length === 0)) {
                _context6.next = 6;
                break;
              }
              this.$mHelper.toast('请联系客服开启物流配送');
              return _context6.abrupt("return");
            case 6:
              params = {};
              params.buyer_message = this.buyerMessage;
              if (this.promoCode) {
                params.promo_code = this.promoCode;
              }
              if (this.couponItem && this.couponItem.id) {
                params.coupon_id = this.couponItem.id;
              }
              if (this.invoiceItem && this.invoiceItem.id) {
                params.invoice_id = this.invoiceItem.id;
                params.invoice_content = this.invoiceContent || this.orderDetail.invoice.list[0];
              }
              if (!(this.currentShippingType.value.toString() === '1')) {
                _context6.next = 19;
                break;
              }
              if (this.currentCompany && this.currentCompany.value) {
                params.company_id = this.currentCompany.value;
              }
              if (!(this.addressData && this.addressData.id)) {
                _context6.next = 17;
                break;
              }
              params.address_id = this.addressData.id;
              _context6.next = 19;
              break;
            case 17:
              this.$mHelper.toast('请选择收货地址');
              return _context6.abrupt("return");
            case 19:
              if (this.currentShippingType && this.currentShippingType.value) {
                params.shipping_type = this.currentShippingType.value;
                if (this.currentShippingType.value.toString() === '2') {
                  if (this.currentPickupPoint && this.currentPickupPoint.value) {
                    params.pickup_id = this.currentPickupPoint.value;
                  }
                }
              }
              if (this.use_point) {
                params.use_point = this.use_point;
              }
              this.btnLoading = true;
              _context6.next = 24;
              return this.$http.post("".concat(_product.orderCreate), _objectSpread(_objectSpread({}, params), this.data)).then(function (r) {
                var data = {};
                data.order_id = parseInt(r.data.id, 10);
                if (_this4.data.type === 'cart') _this4.setCartItemCount();
                if (parseInt(r.data.pay_status, 10) === 1) {
                  uni.redirectTo({
                    url: "/pages/user/money/success?type=".concat(_this4.data.type, "&id=").concat(r.data.wholesale_id)
                  });
                } else {
                  uni.redirectTo({
                    url: "/pages/user/money/pay?id=".concat(r.data.id, "&type=").concat(_this4.data.type)
                  });
                }
              }).catch(function () {
                _this4.btnLoading = false;
              });
            case 24:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function submit() {
        return _submit.apply(this, arguments);
      }
      return submit;
    }(),
    // 设置购物车数量角标
    setCartItemCount: function () {
      var _setCartItemCount = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var _this5 = this;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.$http.get("".concat(_product.cartItemCount)).then(function (r) {
                if (parseInt(r.data, 10) > 0) {
                  _this5.setCartNum(r.data);
                } else {
                  uni.removeStorageSync('cartNum');
                  uni.removeTabBarBadge({
                    index: _this5.$mConstDataConfig.cartIndex
                  });
                }
              });
            case 2:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function setCartItemCount() {
        return _setCartItemCount.apply(this, arguments);
      }
      return setCartItemCount;
    }(),
    stopPrevent: function stopPrevent() {},
    selectCoupon: function selectCoupon(item) {
      if (parseFloat(item.at_least) > parseFloat(this.amountGoods)) {
        this.$mHelper.toast('不满足优惠券使用条件~');
        return;
      }
      this.maskState = 0;
      this.couponItem = item;
    }
  })
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 315:
/*!****************************************************************************!*\
  !*** ./src/pages/order/create/order.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??ref--9-oneOf-1-0!../../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--9-oneOf-1-2!../../../../node_modules/postcss-loader/src??ref--9-oneOf-1-3!../../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-4!../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--9-oneOf-1-5!../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./order.vue?vue&type=style&index=0&lang=scss& */ 316);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_4_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_9_oneOf_1_5_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 316:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--9-oneOf-1-2!./node_modules/postcss-loader/src??ref--9-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--9-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./src/pages/order/create/order.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[309,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/order/create/order.js.map