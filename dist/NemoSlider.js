"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _modeList = new WeakMap();

var _targetSelector = new WeakMap();

var _element = new WeakMap();

var _elementContents = new WeakMap();

var _elementContentsItems = new WeakMap();

var _currentIndex = new WeakMap();

var _timeInterval = new WeakMap();

var _playing = new WeakMap();

var _init = new WeakSet();

var _run = new WeakSet();

var NemoSlider = function () {
  function NemoSlider(targetSelector, _options) {
    _classCallCheck(this, NemoSlider);

    _classPrivateMethodInitSpec(this, _run);

    _classPrivateMethodInitSpec(this, _init);

    _classPrivateFieldInitSpec(this, _modeList, {
      writable: true,
      value: ['rolling']
    });

    _classPrivateFieldInitSpec(this, _targetSelector, {
      writable: true,
      value: ''
    });

    _defineProperty(this, "options", {
      mode: 'rolling',
      wrapContents: '.ns-wrap-contents',
      itemContents: '.ns-contents-item',
      wrapPagination: '.ns-wrap-pagination',
      itemPagination: '.ns-page-item',
      btnPrev: '.btn-prev',
      btnNext: '.btn-next',
      delay: 2000,
      mouseEnterPlayStop: true
    });

    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: {}
    });

    _classPrivateFieldInitSpec(this, _elementContents, {
      writable: true,
      value: {}
    });

    _classPrivateFieldInitSpec(this, _elementContentsItems, {
      writable: true,
      value: {}
    });

    _classPrivateFieldInitSpec(this, _currentIndex, {
      writable: true,
      value: 0
    });

    _classPrivateFieldInitSpec(this, _timeInterval, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _playing, {
      writable: true,
      value: false
    });

    _classPrivateFieldSet(this, _targetSelector, targetSelector);

    if (_typeof(_options) == 'object') {
      var defaultOptions = this.options;
      this.options = Object.assign(defaultOptions, _options);
    }

    _classPrivateMethodGet(this, _init, _init2).call(this);

    _classPrivateMethodGet(this, _run, _run2).call(this);
  }

  _createClass(NemoSlider, [{
    key: "PLAY",
    value: function PLAY() {
      var _this = this;

      if (_classPrivateFieldGet(_this, _timeInterval) !== null) {
        _this.STOP();
      }

      if (_classPrivateFieldGet(_this, _playing) === true) {
        return this;
      }

      _log(_classPrivateFieldGet(_this, _currentIndex));

      var maxIndex = _classPrivateFieldGet(_this, _elementContentsItems).length;

      _classPrivateFieldSet(_this, _timeInterval, setInterval(function () {
        var _this$currentIndex, _this$currentIndex2;

        _classPrivateFieldSet(_this, _currentIndex, (_this$currentIndex = _classPrivateFieldGet(_this, _currentIndex), _this$currentIndex2 = _this$currentIndex++, _this$currentIndex)), _this$currentIndex2;

        if (_classPrivateFieldGet(_this, _currentIndex) >= maxIndex) {
          _classPrivateFieldSet(_this, _currentIndex, 0);
        }

        _classPrivateFieldGet(_this, _elementContentsItems).forEach(function (itemElement, itemIndex) {
          itemElement.classList.remove('ns-item-active');
        });

        _this.activeItem(_classPrivateFieldGet(_this, _currentIndex));

        _log(_classPrivateFieldGet(_this, _currentIndex));
      }, _this.options.delay));

      _classPrivateFieldSet(_this, _playing, true);

      return this;
    }
  }, {
    key: "STOP",
    value: function STOP() {
      var _this = this;

      if (_this.options.mouseEnterPlayStop === false) {
        return _this;
      }

      clearInterval(_classPrivateFieldGet(_this, _timeInterval));

      _classPrivateFieldSet(_this, _playing, false);

      return _this;
    }
  }, {
    key: "setContentsPosition",
    value: function setContentsPosition() {
      var el_contents = _classPrivateFieldGet(this, _elementContents);

      var el_style = window.getComputedStyle(el_contents);

      if (el_style.position === 'static') {
        el_contents.style.position = 'relative';
      }

      return this;
    }
  }, {
    key: "setOptions",
    value: function setOptions(_options) {
      Object.assign(this.options, _options);
      return this.PLAY();
    }
  }, {
    key: "getModeList",
    value: function getModeList() {
      return _classPrivateFieldGet(this, _modeList);
    }
  }, {
    key: "setMode",
    value: function setMode() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rolling';

      if (_classPrivateFieldGet(this, _modeList).indexOf(mode) < 0) {
        mode = 'rolling';
      }

      this.options.mode = mode;
      return this.PLAY();
    }
  }, {
    key: "getMode",
    value: function getMode() {
      var mode = this.options.mode;

      if (_classPrivateFieldGet(this, _modeList).indexOf(mode) < 0) {
        mode = 'rolling';
      }

      return mode;
    }
  }, {
    key: "activeItem",
    value: function activeItem() {
      var activeItemIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _classPrivateFieldGet(this, _currentIndex);

      var _this = this;

      var el_activeItem = _classPrivateFieldGet(_this, _elementContentsItems)[activeItemIndex];

      el_activeItem.classList.add('ns-item-active');
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

function _init2() {
  var _this = this;

  var mode = this.getMode();

  _classPrivateFieldSet(_this, _element, document.querySelector(_classPrivateFieldGet(_this, _targetSelector)));

  _classPrivateFieldGet(_this, _element).classList.add("ns-mode-".concat(mode));

  _classPrivateFieldSet(_this, _elementContents, _classPrivateFieldGet(_this, _element).querySelector(_this.options.wrapContents));

  _classPrivateFieldGet(_this, _elementContents).classList.add('ns-wrap-contents');

  _classPrivateFieldSet(_this, _elementContentsItems, _classPrivateFieldGet(_this, _element).querySelectorAll("".concat(_this.options.wrapContents, " > *")));

  _this.setContentsPosition();

  _this.activeItem();
}

function _run2() {
  var _this = this;

  var stopEvent = function stopEvent() {
    _this.STOP();

    _log('stopEvent');
  };

  _classPrivateFieldGet(_this, _elementContents).removeEventListener('mouseenter', stopEvent);

  _classPrivateFieldGet(_this, _elementContents).addEventListener('mouseenter', stopEvent);

  var playEvent = function playEvent() {
    _this.PLAY();

    _log('playEvent');
  };

  _classPrivateFieldGet(_this, _elementContents).removeEventListener('mouseleave', playEvent);

  _classPrivateFieldGet(_this, _elementContents).addEventListener('mouseleave', playEvent);

  _log("RUN ".concat(_classPrivateFieldGet(this, _targetSelector)));

  _this.PLAY();
}

_defineProperty(NemoSlider, "version", '1.0.0');

_defineProperty(NemoSlider, "ENVIRONMENT", 'production');

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

function _log() {
  if (NemoSlider.ENVIRONMENT === 'development') {
    var _console;

    (_console = console).log.apply(_console, arguments);
  }
}

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

