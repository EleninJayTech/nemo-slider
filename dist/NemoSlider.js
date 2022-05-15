"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var NemoSlider = function () {
  function NemoSlider(targetSelector, _options) {
    _classCallCheck(this, NemoSlider);

    _defineProperty(this, "version", '1.0.0');

    _defineProperty(this, "targetSelector", '');

    _defineProperty(this, "options", {
      selector: {
        contentsWrap: 'contents-wrap'
      }
    });

    var _this = this;

    _this.targetSelector = targetSelector;

    if (_typeof(_options) == 'object') {
      var defaultOptions = _this.options;
      _this.options = Object.assign(defaultOptions, _options);
    }
  }

  _createClass(NemoSlider, [{
    key: "setOptions",
    value: function setOptions(_options) {
      var _this = this;

      Object.assign(_this.options, _options);
      return _this;
    }
  }], [{
    key: "encodeSelector",
    value: function encodeSelector(selector) {
      var _this = this;

      selector = selector.replace(/\s/gi, "");

      for (var mappingCode in _classStaticPrivateFieldSpecGet(_this, NemoSlider, _encodeSelectorMap)) {
        selector = selector.replaceAll(mappingCode, _classStaticPrivateFieldSpecGet(_this, NemoSlider, _encodeSelectorMap)[mappingCode]);
      }

      selector = encodeURIComponent(selector);
      return selector;
    }
  }]);

  return NemoSlider;
}();

_defineProperty(NemoSlider, "element", {});

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

var NS = function NS() {
  var targetSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

  var _options = arguments.length > 1 ? arguments[1] : undefined;

  var elementSelector = NemoSlider.encodeSelector(targetSelector);

  if (NemoSlider.element[elementSelector]) {
    Object.assign(NemoSlider.element[elementSelector].options, _options);
  } else {
    NemoSlider.element[elementSelector] = new NemoSlider(targetSelector, _options);
  }

  return NemoSlider.element[elementSelector];
};

