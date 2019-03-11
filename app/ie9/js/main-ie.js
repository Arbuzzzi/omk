$(document).ready(function (){
	var ua = window.navigator.userAgent.toLowerCase();
	var ie = (/trident/gi).test(ua) || (/msie/gi).test(ua);
	var edge = ((/edge/).test(ua));
	var ie9 = 	document.all && !window.atob;

	if (ie) {
		var header = $('.header');
		var content = $('.header + *');
		var headerBread = $('.header .breadcrumb');
		var headerNavSystem = $('#header-nav');
		var menuLeft = $('#menu-left-list');

		var chekPosContent;
		var menuLeftListDeafult = $(menuLeft).hasClass('show');

		var positionContent = $(header).actual('outerHeight');
		var positionContentDefault = positionContent;
		var positionOne = $(window).innerHeight();
		var positionTwo = positionOne * 2;
		var positionThree =  positionTwo + positionOne;

		var asideHeight;
		var asideWidth = $('#aside').parent().width();
		var windowHeight = $(window).outerHeight();
		var windowMoreAside;

		var currentScroll = 0;

		// start scrolling
		$(document).on('scroll', function(event) {
			var position = $(this).scrollTop(),
				heightHeader = $('.header:not(.header.scroll)').outerHeight(),
				positionContentEvent = $('.content').offset().top,
				asideBig = $('#aside').outerHeight() > $('#content').outerHeight(),
				headerNavSystemIsShow = $(headerNavSystem).hasClass('show');


			if (position > 0 && !$(header).hasClass('scroll-ie')) {
				$(header).css({'position': 'fixed'});
				$(content).css('padding-top', positionContent);

				$(header).addClass('scroll-ie');
				$(header).addClass('fixed');
				$(menuLeft).collapse('hide');
				$(headerBread).css('padding-bottom', '15px');

			} else if (position <= 0){
				$(header).removeClass('scroll-ie');
				$(menuLeft).collapse('show');
				$(headerNavSystem).collapse('show');
				$(headerBread).css('padding-bottom', '');
			}

			if (position > positionThree) {
				if (headerNavSystemIsShow) {
					$(headerNavSystem).collapse('hide');
				}
			} else if(!headerNavSystemIsShow) {
				$(headerNavSystem).collapse('show');
			}

			addClassScroll($('.header'), 'scroll', positionThree);


			if ($(header).hasClass('scroll-ie') && $(menuLeft).hasClass('show')) {
				$(menuLeft).collapse('hide');
			}
		});



		if (header.hasClass('scroll')) {
			$(headerNavSystem).collapse('hide');
			$(headerBread).css('padding-bottom', '15px');
		}
		$(header).css({'position': 'fixed'}).addClass('fixed');
		$(content).css('padding-top', positionContent);

		$($('[data-toggle="modal"]').data('target')).on('show.bs.modal', function (){
			var scrollbarWidth = $(document).scrollbarWidth();
			if ($(header).hasClass('fixed')){
				$(header).css({
					paddingRight: scrollbarWidth,
				})
			}
		});

		$(headerNavSystem).on('show.bs.collapse', function (){
			var position = $(document).scrollTop();
			if (position <= 0) {
				$(header).css({'position': 'static'}).addClass('fixed');
				$(content).css('padding-top', '');
			}
		});

		$(headerNavSystem).on('shown.bs.collapse', function (){
			var position = $(document).scrollTop();
			if (position <= 0){
				positionContent = $(header).actual('outerHeight');
				$(header).css({'position': 'fixed'});
				$(content).css('padding-top', positionContent);
			}
		});

		$(headerNavSystem).on('hide.bs.collapse', function (){
			var position = $(document).scrollTop();
			if (position <= 0) {
				$(header).css({'position': 'static'}).removeClass('fixed');
				$(content).css('padding-top', '');
			}
		});

		$(headerNavSystem).on('hidden.bs.collapse', function (){
			var position = $(document).scrollTop();
			if (position <= 0){
				positionContent = $(header).actual('outerHeight');
				$(header).css({'position': 'fixed'});
				$(content).css('padding-top', positionContent);
			}
		});

	}

	function addClassScroll(element, $class, positionMax) {
		var position = $(this).scrollTop();
		if ($class === undefined) {
			$class = 'scroll';
		}
		if (positionMax === undefined) {
			positionMax = 200;
		}
		if (position >= positionMax) {
			element.addClass($class);
		} else {
			element.removeClass($class);
		}
		return position;
	}
});