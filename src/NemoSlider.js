class NemoSlider{
	/**
	 * 버전
	 * @type {string}
	 */
	version='1.0.0';

	/**
	 * 사용된 객체 기록
 	 * @type {{}}
	 */
	static element={};

	/**
	 * 대상 선택자 container
 	 * @type {string}
	 */
	targetSelector='';

	/**
	 * 기본 옵션
	 * @type {{aa: number, bb: number, cc: number}}
	 */
	options={
		// 선택자
		selector:{
			// 메인 콘텐츠 영역
			contentsWrap:'contents-wrap'
		}
	};

	/**
	 * 생성자
	 * @param {string} targetSelector
	 * @param {object} [_options]
	 */
	constructor(targetSelector, _options) {
		let _this = this;
		_this.targetSelector = targetSelector;

		// 옵션 설정 시 기본 옵션에 업데이트
		if (typeof _options == 'object') {
			let defaultOptions = _this.options;
			_this.options = Object.assign(defaultOptions, _options);
		}
	}

	/**
	 * 추가 옵션 할당
	 * @param {object} _options
	 * @returns {NemoSlider}
	 */
	setOptions(_options){
		let _this = this;
		Object.assign(_this.options, _options);
		return _this;
	}

	static #encodeSelectorMap = {
		'#':'_s_',
		'>':'_n_',
		'.':'_d_',
		':':'_dd_',
		'-':'_da_',
		'(':'_9_',
		')':'_0_'
	};
	static encodeSelector(selector){
		let _this = this;
		// 공백 제거
		selector = selector.replace(/\s/gi,"");

		// 특수 문자 변경
		for(let mappingCode in _this.#encodeSelectorMap){
			selector = selector.replaceAll(mappingCode, _this.#encodeSelectorMap[mappingCode]);
		}

		selector = encodeURIComponent(selector);
		return selector;
	}
}

/**
 * 중복 생성 방지 익명 함수
 * @param {string} targetSelector
 * @param {object} [_options]
 * @returns {NemoSlider}
 * @constructor
 */
let NS = function(targetSelector = 'body', _options){
	let elementSelector = NemoSlider.encodeSelector(targetSelector);
	if( NemoSlider.element[elementSelector] ){
		Object.assign(NemoSlider.element[elementSelector].options, _options);
	} else {
		NemoSlider.element[elementSelector] = new NemoSlider(targetSelector, _options);
	}

	return NemoSlider.element[elementSelector];
};