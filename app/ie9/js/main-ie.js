// $(document).ready(function (){
// 	var ie = $.browser.msie;
//
// 	if (ie) {
// 		var header = $('.header');
// 		var content = $('.header + *');
// 		var headerBread = $('.header .breadcrumb');
// 		var headerNavSystem = $('#header-nav');
// 		var menuLeft = $('#menu-left-list');
//
// 		var positionContent = $(header).actual('outerHeight');
// 		var positionOne = $(window).innerHeight();
// 		var positionTwo = positionOne * 2;
// 		var positionThree =  positionTwo + positionOne;
// 		var paddingTopContentMax = $(header).actual('outerHeight');
//
// 		// start scrolling
// 		$(document).on('scroll', function() {
// 			var position = $(this).scrollTop();
// 			var headerNavSystemIsShow = $(headerNavSystem).hasClass('show');
//
// 			if (position > 0) {
// 				if ($(headerBread).hasClass('show')) $(headerBread).addClass('show');
// 			} else {
// 				$(content).animate({paddingTop: positionContent}, 300);
// 				$(headerBread).removeClass('show');
// 			}
//
// 		// 	positionContent = $(header).actual('outerHeight');
// 		//
// 		// 	if (paddingTopContentMax < positionContent) paddingTopContentMax = positionContent;
// 		//
// 		// 	if (position > 0 && !$(header).hasClass('scroll-ie')) {
// 		// 		$(header).css({'position': 'fixed'});
// 		// 		$(content).css('padding-top', positionContent);
// 		//
// 		// 		$(header).addClass('scroll-ie');
// 		// 		$(header).addClass('fixed');
// 		// 		$(menuLeft).collapse('hide');
// 		// 		$(headerBread).css('padding-bottom', '15px');
// 		//
// 		// 	} else if (position <= 0){ // скролл самый верх
// 		// 		$(header).removeClass('scroll-ie');
// 		// 		$(menuLeft).collapse('show');
// 		// 		$(headerNavSystem).collapse('show');
// 		// 		$(headerBread).css('padding-bottom', '');
// 		// 		$(content).animate({paddingTop: paddingTopContentMax}, 300);
// 		// 	}
// 		//
// 		// 	if (position > positionThree) { // высота прокрутка больше 2х экранов
// 		// 		if (headerNavSystemIsShow) {
// 		// 			$(headerNavSystem).collapse('hide');
// 		// 		}
// 		// 	} else if(!headerNavSystemIsShow) {
// 		// 		$(headerNavSystem).collapse('show');
// 		// 	}
// 		//
// 		// 	addClassScroll($('.header'), 'scroll', positionThree);
// 		//
// 		//
// 		// 	if ($(header).hasClass('scroll-ie') && $(menuLeft).hasClass('show')) {
// 		// 		$(menuLeft).collapse('hide');
// 		// 	}
// 		// });
// 		//
// 		//
// 		//
// 		// if (header.hasClass('scroll')) {
// 		// 	$(headerNavSystem).collapse('hide');
// 		// 	$(headerBread).css('padding-bottom', '15px');
// 		// }
// 		// // фиксируем хэдер
// 		// $(header).css({'position': 'fixed'}).addClass('fixed');
// 		// $(content).css('padding-top', positionContent);
// 		//
// 		// // добавляем отступ хэдеру при открытии модальных окон
// 		// $($('[data-toggle="modal"]').data('target')).on('show.bs.modal', function (){
// 		// 	var scrollbarWidth = $(document).scrollbarWidth();
// 		// 	if ($(header).hasClass('fixed')){
// 		// 		$(header).css({
// 		// 			paddingRight: scrollbarWidth,
// 		// 		})
// 		// 	}
// 		// });
// 		//
// 		// // разворачивние меню "системы" сохранение отступов
// 		// $(headerNavSystem).on('show.bs.collapse', function (){
// 		// 	var position = $(document).scrollTop();
// 		// 	if (position <= 0) {
// 		// 		$(header).css({'position': 'static'}).addClass('fixed');
// 		// 		$(content).stop(true).css('padding-top', '');
// 		// 	}
// 		// });
// 		//
// 		// $(headerNavSystem).on('shown.bs.collapse', function (){
// 		// 	var position = $(document).scrollTop();
// 		// 	if (position <= 0){
// 		// 		positionContent = $(header).actual('outerHeight');
// 		// 		$(header).css({'position': 'fixed'});
// 		// 		$(content).stop(true).css('padding-top', positionContent);
// 		// 	}
// 		// });
// 		// // сворачивание меню "системы" сохранение отступов
// 		// $(headerNavSystem).on('hide.bs.collapse', function (){
// 		// 	var position = $(document).scrollTop();
// 		// 	if (position <= 0) {
// 		// 		$(header).css({'position': 'static'}).removeClass('fixed');
// 		// 		$(content).stop(true).css('padding-top', '');
// 		// 	}
// 		// });
// 		//
// 		// $(headerNavSystem).on('hidden.bs.collapse', function (){
// 		// 	var position = $(document).scrollTop();
// 		// 	if (position <= 0){
// 		// 		positionContent = $(header).actual('outerHeight');
// 		// 		$(header).css({'position': 'fixed'});
// 		// 		$(content).stop(true).css('padding-top', positionContent);
// 		// 	}
// 		// });
//
// 	}
//
// 	/**
// 	 * добавляет класс если страница
// 	 * прокручена больше заданного значения
// 	 *
// 	 * @param {Object} element
// 	 * @param {string} [$class='scroll']
// 	 * @param {number} [positionMax=200]
// 	 * @returns {number} возвращает текущее значение scrollTop()
// 	 */
// 	function addClassScroll(element, $class, positionMax) {
// 		var position = $(this).scrollTop();
// 		if ($class === undefined) {
// 			$class = 'scroll';
// 		}
// 		if (positionMax === undefined) {
// 			positionMax = 200;
// 		}
// 		if (position >= positionMax) {
// 			element.addClass($class);
// 		} else {
// 			element.removeClass($class);
// 		}
// 		return position;
// 	}
// });