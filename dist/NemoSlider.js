"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NemoSlider = /*#__PURE__*/function () {
  /**
   * 버전
   * @type {string}
   */

  /**
   * 사용된 개체 기록
   * todo 명칭 면경 필요
  	 * @type {{}}
   */

  /**
   * 대상 선택자
  	 * @type {string}
   */

  /**
   * 기본 옵션
   * @type {{aa: number, bb: number, cc: number}}
   */

  /**
   * 생성자
   * @param {string} targetSelector
   * @param {object} [_options]
   */
  function NemoSlider(targetSelector, _options) {
    _classCallCheck(this, NemoSlider);

    _defineProperty(this, "version", '1.0.0');

    _defineProperty(this, "targetSelector", '');

    _defineProperty(this, "options", {
      aa: 1,
      bb: 2,
      cc: 3
    });

    var _this = this;

    _this.targetSelector = targetSelector; // 옵션 설정 시 기본 옵션에 업데이트

    if (_typeof(_options) == 'object') {
      var defaultOptions = _this.options;
      _this.options = Object.assign(defaultOptions, _options);
    }
  }
  /**
   * 추가 옵션 할당
   * @param {object} _options
   * @returns {NemoSlider}
   */


  _createClass(NemoSlider, [{
    key: "setOptions",
    value: function setOptions(_options) {
      var _this = this;

      Object.assign(_this.options, _options);
      return _this;
    }
  }]);

  return NemoSlider;
}();
/**
 * todo 명칭 수정
 * @param {string} targetSelector
 * @param {object} [_options]
 * @returns {NemoSlider}
 * @constructor
 */


_defineProperty(NemoSlider, "element", {});

var NS = function NS(targetSelector, _options) {
  if (NemoSlider.element[targetSelector]) {
    Object.assign(NemoSlider.element[targetSelector].options, _options);
  } else {
    NemoSlider.element[targetSelector] = new NemoSlider(targetSelector, _options);
  }

  return NemoSlider.element[targetSelector];
};

