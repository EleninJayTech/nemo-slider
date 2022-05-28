class NemoSlider{
	/**
	 * 버전
	 * @type {string}
	 */
	version='1.0.0';

	/**
	 * NS 생성된 객체 기록
 	 * @type {{}}
	 */
	static instance={};

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
		// 선택자 : 메인 콘텐츠 영역
		wrapContents:'.wrap-contents'
		// 선택자 : 메인 콘텐츠
		, itemContents:'.item-contents'

		// 선택자 : 페이지 네이션 영역
		, wrapPagination:'.wrap-pagination'
		// 선택자 : 페이지
		, itemPagination:'.item-page'

		// 선택자 : 이전 버튼
		, btnPrev:'.btn-prev'
		// 선택자 : 다음 버튼
		, btnNext:'.btn-next'
	};

	/**
	 * 생성자
	 * @param {string} targetSelector
	 * @param {object} [_options]
	 */
	constructor(targetSelector, _options) {
		this.targetSelector = targetSelector;

		// 옵션 설정 시 기본 옵션에 업데이트
		if (typeof _options == 'object') {
			let defaultOptions = this.options;
			this.options = Object.assign(defaultOptions, _options);
		}

		this.#run();
	}

	/**
	 * 추가 옵션 할당
	 * @param {object} _options
	 * @returns {NemoSlider}
	 */
	setOptions(_options){
		Object.assign(this.options, _options);
		return this;
	}

	// 선택자에 사용되는 특수 문자
	static #encodeSelectorMap = {
		'#':'_s_',
		'>':'_n_',
		'.':'_d_',
		':':'_dd_',
		'-':'_da_',
		'(':'_9_',
		')':'_0_'
	};

	/**
	 * 선택자의 특수문자를 매핑
	 * @param selector
	 * @returns {string}
	 */
	static encodeSelector(selector){
		// 공백 제거
		selector = selector.replace(/\s/gi,"");

		// 특수 문자 변경
		for(let mappingCode in this.#encodeSelectorMap){
			selector = selector.replaceAll(mappingCode, this.#encodeSelectorMap[mappingCode]);
		}

		selector = encodeURIComponent(selector);
		return selector;
	}

	// todo 포지션 css 확인 후 수정

	// todo 모드에 따라 콘텐츠 위치 배열

	/**
	 * 실행
	 */
	#run(){
		console.log(`RUN ${this.targetSelector}`);
		return this;
	}
}

/**
 * 함수형 실행 간편 인스턴스
 * @param {string} targetSelector
 * @param {object} [_options]
 * @returns {NemoSlider}
 * @constructor
 */
function NS(targetSelector = 'body', _options){
	let instanceSelector = NemoSlider.encodeSelector(targetSelector);
	if( NemoSlider.instance[instanceSelector] ){
		Object.assign(NemoSlider.instance[instanceSelector].options, _options);
	} else {
		NemoSlider.instance[instanceSelector] = new NemoSlider(targetSelector, _options);
	}

	return NemoSlider.instance[instanceSelector];
};