"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _modeList = new WeakMap();

var _targetSelector = new WeakMap();

var _currentIndex = new WeakMap();

var _timeInterval = new WeakMap();

var _playing = new WeakMap();

var NemoSlider = function () {
  function NemoSlider(targetSelector, _options) {
    _classCallCheck(this, NemoSlider);

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
      btnPrev: '.ns-btn-prev',
      btnNext: '.ns-btn-next',
      delay: 2000,
      mouseEnterPlayStop: true,
      appendEvent: null
    });

    _defineProperty(this, "element", null);

    _defineProperty(this, "elementContents", null);

    _defineProperty(this, "elementContentsItems", null);

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

    _defineProperty(this, "event", {
      contents: {
        mouseenter: null,
        mouseleave: null
      },
      btnNext: {
        mouseenter: null,
        mouseleave: null,
        click: null
      },
      btnPrev: {
        mouseenter: null,
        mouseleave: null,
        click: null
      }
    });

    _classPrivateFieldSet(this, _targetSelector, targetSelector);

    if (_typeof(_options) == 'object') {
      var defaultOptions = this.options;
      this.options = Object.assign(defaultOptions, _options);
    }

    this.init();
    this.play();
  }

  _createClass(NemoSlider, [{
    key: "init",
    value: function init() {
      var _this = this;

      var mode = this.getMode();
      _this.element = document.querySelector(_classPrivateFieldGet(_this, _targetSelector));

      if (!_this.element) {
        _log('ERR Target Selector check');
      }

      _this.element.classList.add("ns-mode-".concat(mode));

      _this.elementContents = _this.element.querySelector(_this.options.wrapContents);

      if (!_this.elementContents) {
        _log('ERR wrapContents check');
      }

      _this.elementContents.classList.add('ns-wrap-contents');

      _this.elementContentsItems = _this.element.querySelectorAll("".concat(_this.options.wrapContents, " > *"));

      _this.setContentsPosition();

      _this.activeItem();

      _this.event.contents.mouseenter = function () {
        _log('Event contents.mouseenter');

        _this.stop();
      };

      _this.event.contents.mouseleave = function () {
        _log('Event contents.mouseleave');

        _this.play();
      };

      _this.addEventContents();

      _this.event.btnNext.mouseenter = function () {
        _log('Event btnNext.mouseenter');

        _this.stop();
      };

      _this.event.btnNext.mouseleave = function () {
        _log('Event btnNext.mouseleave');

        _this.play();
      };

      _this.event.btnNext.click = function (e) {
        var _this$currentIndex, _this$currentIndex2;

        _log('Event btnNext.click');

        _classPrivateFieldSet(_this, _currentIndex, (_this$currentIndex = _classPrivateFieldGet(_this, _currentIndex), _this$currentIndex2 = _this$currentIndex++, _this$currentIndex)), _this$currentIndex2;

        _classPrivateFieldSet(_this, _currentIndex, _this.checkIndex(_classPrivateFieldGet(_this, _currentIndex)));

        _this.motion();

        e.preventDefault();
      };

      _this.event.btnPrev.mouseenter = function () {
        _log('Event btnPrev.mouseenter');

        _this.stop();
      };

      _this.event.btnPrev.mouseleave = function () {
        _log('Event btnPrev.mouseleave');

        _this.play();
      };

      _this.event.btnPrev.click = function (e) {
        var _this$currentIndex3, _this$currentIndex4;

        _log('Event btnPrev.click');

        _classPrivateFieldSet(_this, _currentIndex, (_this$currentIndex3 = _classPrivateFieldGet(_this, _currentIndex), _this$currentIndex4 = _this$currentIndex3--, _this$currentIndex3)), _this$currentIndex4;

        _classPrivateFieldSet(_this, _currentIndex, _this.checkIndex(_classPrivateFieldGet(_this, _currentIndex)));

        _this.motion();

        e.preventDefault();
      };

      _this.addEventBtnNextAndPrev();

      if (typeof _this.options.appendEvent === 'function') {
        _this.options.appendEvent(_this);
      }
    }
  }, {
    key: "removeEventContents",
    value: function removeEventContents() {
      var _this = this;

      for (var eventKey in _this.event.contents) {
        _this.elementContents.removeEventListener("".concat(eventKey), _this.event.contents[eventKey]);
      }

      return _this;
    }
  }, {
    key: "addEventContents",
    value: function addEventContents(eventFunc) {
      var _this = this;

      if (typeof eventFunc === 'function') {
        eventFunc(_this);
      }

      for (var eventKey in _this.event.contents) {
        _this.elementContents.addEventListener("".concat(eventKey), _this.event.contents[eventKey]);
      }

      return _this;
    }
  }, {
    key: "removeEventBtnNextAndPrev",
    value: function removeEventBtnNextAndPrev() {
      var _this = this;

      var el_btnNext = _this.element.querySelector(_this.options.btnNext);

      var el_btnPrev = _this.element.querySelector(_this.options.btnPrev);

      if (!el_btnNext || !el_btnPrev) {
        return _this;
      }

      for (var eventKey in _this.event.btnNext) {
        el_btnNext.removeEventListener("".concat(eventKey), _this.event.btnNext[eventKey]);
      }

      for (var _eventKey in _this.event.btnPrev) {
        el_btnPrev.removeEventListener("".concat(_eventKey), _this.event.btnPrev[_eventKey]);
      }

      return _this;
    }
  }, {
    key: "addEventBtnNextAndPrev",
    value: function addEventBtnNextAndPrev(eventFunc) {
      var _this = this;

      var el_btnNext = _this.element.querySelector(_this.options.btnNext);

      var el_btnPrev = _this.element.querySelector(_this.options.btnPrev);

      if (!el_btnNext || !el_btnPrev) {
        return _this;
      }

      if (typeof eventFunc === 'function') {
        eventFunc(_this);
      }

      for (var eventKey in _this.event.btnNext) {
        el_btnNext.addEventListener("".concat(eventKey), _this.event.btnNext[eventKey]);
      }

      for (var _eventKey2 in _this.event.btnPrev) {
        el_btnPrev.addEventListener("".concat(_eventKey2), _this.event.btnPrev[_eventKey2]);
      }

      return _this;
    }
  }, {
    key: "play",
    value: function play() {
      var _this = this;

      if (_classPrivateFieldGet(_this, _timeInterval) !== null) {
        _this.stop();
      }

      if (_classPrivateFieldGet(_this, _playing) === true) {
        return this;
      }

      _classPrivateFieldSet(_this, _timeInterval, setInterval(function () {
        var _this$currentIndex5, _this$currentIndex6;

        _classPrivateFieldSet(_this, _currentIndex, (_this$currentIndex5 = _classPrivateFieldGet(_this, _currentIndex), _this$currentIndex6 = _this$currentIndex5++, _this$currentIndex5)), _this$currentIndex6;

        _classPrivateFieldSet(_this, _currentIndex, _this.checkIndex(_classPrivateFieldGet(_this, _currentIndex)));

        _this.motion();
      }, _this.options.delay));

      _classPrivateFieldSet(_this, _playing, true);

      return this;
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this = this;

      if (_this.options.mouseEnterPlayStop === true) {
        clearInterval(_classPrivateFieldGet(_this, _timeInterval));

        _classPrivateFieldSet(_this, _playing, false);
      }
    }
  }, {
    key: "motion",
    value: function motion() {
      var _this = this;

      if (_this.options.mode === 'rolling') {
        _this.elementContentsItems.forEach(function (itemElement, itemIndex) {
          itemElement.classList.remove('ns-item-active');
        });

        _this.activeItem(_classPrivateFieldGet(_this, _currentIndex));
      }
    }
  }, {
    key: "setContentsPosition",
    value: function setContentsPosition() {
      var el_contents = this.elementContents;
      var el_style = window.getComputedStyle(el_contents);

      if (el_style.position === 'static') {
        el_contents.style.position = 'relative';
      }
    }
  }, {
    key: "setOptions",
    value: function setOptions(_options) {
      Object.assign(this.options, _options);
      return this.play();
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
      return this.play();
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

      var el_activeItem = _this.elementContentsItems[activeItemIndex];
      el_activeItem.classList.add('ns-item-active');
    }
  }, {
    key: "checkIndex",
    value: function checkIndex() {
      var targetIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _classPrivateFieldGet(this, _currentIndex);

      var _this = this;

      var maxIndex = _this.elementContentsItems.length - 1;

      if (targetIndex < 0) {
        targetIndex = maxIndex;
      }

      if (targetIndex > maxIndex) {
        targetIndex = 0;
      }

      return targetIndex;
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

