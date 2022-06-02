class NemoSlider{
	/**
	 * 버전
	 * @type {string}
	 */
	static version='1.0.0';

	/**
	 * ENVIRONMENT
	 * development|production
	 * @type {string}
	 */
	static ENVIRONMENT='production';

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
	#targetSelector='';

	/**
	 * 기본 옵션
	 * @type {{mode: string, delay: number, btnPrev: string, mouseEnterPlayStop: boolean, btnNext: string, wrapContents: string}}
	 */
	options={
		// 기능 모드
		mode:'rolling'

		// 선택자 : 메인 콘텐츠 영역
		, wrapContents:'.ns-wrap-contents'
		// 선택자 : 메인 콘텐츠
		// , itemContents:'.ns-contents-item'

		// 선택자 : 페이지 네이션 영역
		// , wrapPagination:'.ns-wrap-pagination'
		// 선택자 : 페이지
		// , itemPagination:'.ns-page-item'

		// 선택자 : 이전 버튼
		, btnPrev:'.btn-prev'
		// 선택자 : 다음 버튼
		, btnNext:'.btn-next'

		// 변경되는 시간 1,000 = 1초
		, delay:2000
		
		// 마우스 enter 시 동작 멈춤
		, mouseEnterPlayStop:true

		, appendEvent:null
	};

	/**
	 * 선택된 대상 엘리먼트 변수 기록
	 * @type {{}}
	 */
	element=null;

	/**
	 * element contents wrap
	 * @type {{}}
	 */
	elementContents=null;

	/**
	 * element contents item
	 * @type {{}}
	 */
	elementContentsItems=null;

	/**
	 * 현재 표시할 아이템 index
	 * @type {number}
	 */
	#currentIndex=0;

	/**
	 * timeInterval 기록
	 * @type {null}
	 */
	#timeInterval = null;

	/**
	 * 플레이 중
	 * @type {boolean}
	 */
	#playing=false;

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

	event={
		contents:{
			mouseenter:null
			, mouseleave:null
		},
		btnNext:{
			mouseenter:null
			, mouseleave:null
			, click:null
		},
		btnPrev:{
			mouseenter:null
			, mouseleave:null
			, click:null
		}
	};

	/**
	 * 생성자
	 * @param {string} targetSelector
	 * @param {object} [_options]
	 */
	constructor(targetSelector, _options) {
		this.#targetSelector = targetSelector;

		// 옵션 설정 시 기본 옵션에 업데이트
		if (typeof _options == 'object') {
			let defaultOptions = this.options;
			this.options = Object.assign(defaultOptions, _options);
		}

		this.init();
		this.play();
	}

	/**
	 * 초기 설정
	 */
	init(){
		let _this = this;
		let mode = this.getMode();

		_this.element = document.querySelector(_this.#targetSelector);
		if( !_this.element ){
			_log('ERR Target Selector check');
		}

		// 현재 영역에 모드 class 추가
		_this.element.classList.add(`ns-mode-${mode}`);

		// 콘텐츠 영역
		_this.elementContents = _this.element.querySelector(_this.options.wrapContents);
		if( !_this.elementContents ){
			_log('ERR wrapContents check');
		}
		_this.elementContents.classList.add('ns-wrap-contents');

		// 콘텐츠 아이템
		_this.elementContentsItems = _this.element.querySelectorAll(`${_this.options.wrapContents} > *`);

		_this.setContentsPosition();

		// current index 아이템에 ns-item-active 추가
		_this.activeItem();

		// 콘텐츠 영역 이벤트
		_this.event.contents.mouseenter = function(){
			_log('Event contents.mouseenter');
			_this.stop();
		}
		_this.event.contents.mouseleave = function(){
			_log('Event contents.mouseleave');
			_this.play();
		}
		_this.addEventContents();

		// 다음 버튼 이벤트
		_this.event.btnNext.mouseenter = function(){
			_log('Event btnNext.mouseenter');
			_this.stop();
		}
		_this.event.btnNext.mouseleave = function(){
			_log('Event btnNext.mouseleave');
			_this.play();
		}
		_this.event.btnNext.click = function(e){
			_log('Event btnNext.click');
			_this.#currentIndex++;
			_this.#currentIndex = _this.checkIndex(_this.#currentIndex);
			_this.motion();
			e.preventDefault();
		}
		// 이전 버튼 이벤트
		_this.event.btnPrev.mouseenter = function(){
			_log('Event btnPrev.mouseenter');
			_this.stop();
		}
		_this.event.btnPrev.mouseleave = function(){
			_log('Event btnPrev.mouseleave');
			_this.play();
		}
		_this.event.btnPrev.click = function(e){
			_log('Event btnPrev.click');
			_this.#currentIndex--;
			_this.#currentIndex = _this.checkIndex(_this.#currentIndex);
			_this.motion();
			e.preventDefault();
		}
		_this.addEventBtnNextAndPrev();
		
		// 추가 커스텀 이벤트
		if( typeof _this.options.appendEvent === 'function' ){
			_this.options.appendEvent(_this);
		}
	}

	/**
	 * 기존 이벤트 제거 콘텐츠 영역
	 * @returns {NemoSlider}
	 */
	removeEventContents(){
		let _this = this;

		for(let eventKey in _this.event.contents){
			_this.elementContents.removeEventListener(`${eventKey}`, _this.event.contents[eventKey]);
		}

		return _this;
	}

	/**
	 * 이벤트 추가 콘텐츠 영역
	 * @param {function} [eventFunc]
	 * @returns {NemoSlider}
	 */
	addEventContents(eventFunc){
		let _this = this;

		if( typeof eventFunc === 'function' ){
			eventFunc(_this);
		}

		for(let eventKey in _this.event.contents){
			_this.elementContents.addEventListener(`${eventKey}`, _this.event.contents[eventKey]);
		}

		return _this;
	}

	/**
	 * 기존 이벤트 제거 이전 다음 버튼
	 * @returns {NemoSlider}
	 */
	removeEventBtnNextAndPrev(){
		let _this = this;

		let el_btnNext = _this.element.querySelector(_this.options.btnNext);
		let el_btnPrev = _this.element.querySelector(_this.options.btnPrev);

		if( !el_btnNext || !el_btnPrev ){
			return _this;
		}

		for(let eventKey in _this.event.btnNext){
			el_btnNext.removeEventListener(`${eventKey}`, _this.event.btnNext[eventKey]);
		}

		for(let eventKey in _this.event.btnPrev){
			el_btnPrev.removeEventListener(`${eventKey}`, _this.event.btnPrev[eventKey]);
		}

		return _this;
	}

	/**
	 * 이벤트 추가 이전 다음 버튼
	 * @param {function} [eventFunc]
	 * @returns {NemoSlider}
	 */
	addEventBtnNextAndPrev(eventFunc){
		let _this = this;

		let el_btnNext = _this.element.querySelector(_this.options.btnNext);
		let el_btnPrev = _this.element.querySelector(_this.options.btnPrev);

		if( !el_btnNext || !el_btnPrev ){
			return _this;
		}

		if( typeof eventFunc === 'function' ){
			eventFunc(_this);
		}

		for(let eventKey in _this.event.btnNext){
			el_btnNext.addEventListener(`${eventKey}`, _this.event.btnNext[eventKey]);
		}

		for(let eventKey in _this.event.btnPrev){
			el_btnPrev.addEventListener(`${eventKey}`, _this.event.btnPrev[eventKey]);
		}

		return _this;
	}

	/**
	 * PLAY
	 * @returns {NemoSlider}
	 */
	play(){
		let _this = this;

		if( _this.#timeInterval !== null ){
			_this.stop();
		}

		if( _this.#playing === true ){
			return this;
		}

		// 설정된 시간 후 index 1 추가
		_this.#timeInterval = setInterval(function(){
			_this.#currentIndex++;
			_this.#currentIndex = _this.checkIndex(_this.#currentIndex);
			_this.motion();
		}, _this.options.delay);

		_this.#playing = true;
		return this;
	}

	/**
	 * STOP
	 */
	stop(){
		let _this = this;
		if( _this.options.mouseEnterPlayStop === true ){
			clearInterval(_this.#timeInterval);
			_this.#playing = false;
		}
	}

	/**
	 * 움직임
	 */
	motion(){
		let _this = this;

		if( _this.options.mode === 'rolling' ){
			// item 전체 active 삭제
			_this.elementContentsItems.forEach(function (itemElement, itemIndex){
				itemElement.classList.remove('ns-item-active');
			});
			// 현재 index item active
			_this.activeItem(_this.#currentIndex);
		}
	}

	/**
	 * 콘텐츠 영역이 static 일 경우 relative 로 변경
	 */
	setContentsPosition(){
		let el_contents = this.elementContents;
		let el_style = window.getComputedStyle(el_contents);

		if( el_style.position === 'static' ){
			el_contents.style.position = 'relative';
		}
	}

	/**
	 * 추가 옵션 할당
	 * @param {object} _options
	 * @returns {NemoSlider}
	 */
	setOptions(_options){
		Object.assign(this.options, _options);
		return this.play();
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
		return this.play();
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

	/**
	 * 아이템에 ns-item-active 추가
	 * @param activeItemIndex
	 */
	activeItem(activeItemIndex=this.#currentIndex){
		let _this = this;
		let el_activeItem = _this.elementContentsItems[activeItemIndex];
		el_activeItem.classList.add('ns-item-active');
	}

	/**
	 * index 확인
	 * @param targetIndex
	 * @returns {number}
	 */
	checkIndex(targetIndex=this.#currentIndex){
		let _this = this;
		let maxIndex = _this.elementContentsItems.length - 1;

		if( targetIndex < 0 ){
			targetIndex = maxIndex;
		}
		if( targetIndex > maxIndex ){
			targetIndex = 0;
		}

		return targetIndex;
	}
}

/**
 * console.log
 * @param data
 * @private
 */
function _log(...data){
	if( NemoSlider.ENVIRONMENT === 'development' ){
		console.log(...data);
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