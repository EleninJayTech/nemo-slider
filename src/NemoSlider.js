class NemoSlider{
	/**
	 * 버전
	 * @type {string}
	 */
	version='1.0.0';

	/**
	 * 사용된 개체 기록
	 * todo 명칭 면경 필요
 	 * @type {{}}
	 */
	static element={};

	/**
	 * 대상 선택자
 	 * @type {string}
	 */
	targetSelector='';

	/**
	 * 기본 옵션
	 * @type {{aa: number, bb: number, cc: number}}
	 */
	options={
		aa:1,
		bb:2,
		cc:3
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
}

/**
 * todo 명칭 수정
 * @param {string} targetSelector
 * @param {object} [_options]
 * @returns {NemoSlider}
 * @constructor
 */
let NS = function(targetSelector, _options){
	if( NemoSlider.element[targetSelector] ){
		Object.assign(NemoSlider.element[targetSelector].options, _options);
	} else {
		NemoSlider.element[targetSelector] = new NemoSlider(targetSelector, _options);
	}

	return NemoSlider.element[targetSelector];
};