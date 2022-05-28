"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _run = new WeakSet();

var NemoSlider = function () {
  function NemoSlider(targetSelector, _options) {
    _classCallCheck(this, NemoSlider);

    _classPrivateMethodInitSpec(this, _run);

    _defineProperty(this, "version", '1.0.0');

    _defineProperty(this, "targetSelector", '');

    _defineProperty(this, "options", {
      wrapContents: '.wrap-contents',
      itemContents: '.item-contents',
      wrapPagination: '.wrap-pagination',
      itemPagination: '.item-page',
      btnPrev: '.btn-prev',
      btnNext: '.btn-next'
    });

    this.targetSelector = targetSelector;

    if (_typeof(_options) == 'object') {
      var defaultOptions = this.options;
      this.options = Object.assign(defaultOptions, _options);
    }

    _classPrivateMethodGet(this, _run, _run2).call(this);
  }

  _createClass(NemoSlider, [{
    key: "setOptions",
    value: function setOptions(_options) {
      Object.assign(this.options, _options);
      return this;
    }
  }], [{
    key: "encodeSelector",
    value: function encodeSelector(selector) {
      selector = selector.replace(/\s/gi, "");

      for (var mappingCode in _classStaticPrivateFieldSpecGet(this, NemoSlider, _encodeSelectorMap)) {
        selector = selector.replaceAll(mappingCode, _classStaticPrivateFieldSpecGet(this, NemoSlider, _encodeSelectorMap)[mappingCode]);
      }

      selector = encodeURIComponent(selector);
      return selector;
    }
  }]);

  return NemoSlider;
}();

function _run2() {
  console.log("RUN ".concat(this.targetSelector));
  return this;
}

_defineProperty(NemoSlider, "instance", {});

var _encodeSelectorMap = {
  writable: true,
  value: {
    '#': '_s_',
    '>': '_n_',
    '.': '_d_',
    ':': '_dd_',
    '-': '_da_',
    '(': '_9_',
    ')': '_0_'
  }
};

function NS() {
  var targetSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

  var _options = arguments.length > 1 ? arguments[1] : undefined;

  var instanceSelector = NemoSlider.encodeSelector(targetSelector);

  if (NemoSlider.instance[instanceSelector]) {
    Object.assign(NemoSlider.instance[instanceSelector].options, _options);
  } else {
    NemoSlider.instance[instanceSelector] = new NemoSlider(targetSelector, _options);
  }

  return NemoSlider.instance[instanceSelector];
}

;

