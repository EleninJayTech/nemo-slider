class NemoSlider{
	/**
	 * 버전
	 * @type {string}
	 */
	version='1.0.0';

	/**
	 * 기능 모드 종류
	 * @type {[string]}
	 */
	#modeList=['rolling'];

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
	 * @type {{mode: string, itemPagination: string, btnPrev: string, btnNext: string, itemContents: string, wrapContents: string, wrapPagination: string}}
	 */
	options={
		// 기능 모드
		mode:'rolling'

		// 선택자 : 메인 콘텐츠 영역
		, wrapContents:'.ns-wrap-contents'
		// 선택자 : 메인 콘텐츠
		, itemContents:'.ns-contents-item'

		// 선택자 : 페이지 네이션 영역
		, wrapPagination:'.ns-wrap-pagination'
		// 선택자 : 페이지
		, itemPagination:'.ns-page-item'

		// 선택자 : 이전 버튼
		, btnPrev:'.btn-prev'
		// 선택자 : 다음 버튼
		, btnNext:'.btn-next'
	};

	/**
	 * 선택된 대상 엘리먼트 변수 기록
	 * @type {NodeListOf<*>}
	 */
	#element=null;

	/**
	 *
	 * @type {{}}
	 */
	#elementContents={};

	/**
	 *
	 * @type {{}}
	 */
	#elementContentsItems={};

	/**
	 * 현재 표시할 아이템 index
	 * @type {number}
	 */
	currentIndex=0;

	/**
	 * 선택자에 사용되는 특수 문자
	 * @type {{"#": string, "(": string, ")": string, ":": string, "-": string, ">": string, ".": string}}
	 */
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

		this.#init();
		this.#run();
	}

	/**
	 * 초기 설정
	 */
	#init(){
		let _this = this;
		let mode = this.getMode();

		_this.#element = document.querySelectorAll(_this.targetSelector);
		_this.#element.forEach(function(_element, elementIndex){
			// 현재 영역에 모드 class 추가
			_element.classList.add(`ns-mode-${mode}`);

			// 콘텐츠 영역
			_this.#elementContents[elementIndex] = _element.querySelector(_this.options.wrapContents);
			_this.#elementContents[elementIndex].classList.add('ns-wrap-contents');

			// 콘텐츠 아이템
			_this.#elementContentsItems[elementIndex] = _element.querySelectorAll(`${_this.options.wrapContents} > *`);

			_this.setContentsPosition(elementIndex);
		});
	}

	/**
	 * 실행
	 */
	#run(){
		console.log(`RUN ${this.targetSelector}`);
		return this;
	}

	/**
	 * 콘텐츠 영역이 static 일 경우 relative 로 변경
	 * @param {number} elementIndex
	 * @returns {NemoSlider}
	 */
	setContentsPosition(elementIndex){
		let el_contents = this.#elementContents[elementIndex];
		let el_style = window.getComputedStyle(el_contents);

		if( el_style.position === 'static' ){
			el_contents.style.position = 'relative';
		}

		return this;
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

	/**
	 * 모드 종류
	 * @returns {string[]}
	 */
	getModeList(){
		return this.#modeList;
	}

	/**
	 * 모드 설정 함수
	 * @param mode
	 * @returns {NemoSlider}
	 */
	setMode(mode='rolling'){
		if( this.#modeList.indexOf(mode) < 0 ){
			mode = 'rolling';
		}

		this.options.mode = mode;
		return this;
	}

	/**
	 * 현재 설정된 모드 확인
	 * @returns {string}
	 */
	getMode(){
		let mode = this.options.mode;
		if( this.#modeList.indexOf(mode) < 0 ){
			mode = 'rolling';
		}

		return mode;
	}

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