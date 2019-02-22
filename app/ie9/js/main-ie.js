$(document).ready(function (){
	var ua = window.navigator.userAgent.toLowerCase();
	var ie = (/trident/gi).test(ua) || (/msie/gi).test(ua);
	var edge = ((/edge/).test(ua));
	if (ie) {

		var header = $('.header');
		var content = $('.header + *');
		var headerNavSystem = $('#header-nav');
		var menuLeft = $('#menuLeftList');

		var chekPosContent;
		var menuLeftListDeafult = menuLeft.hasClass('show');

		var positionContent = header.actual('outerHeight');
		var positionOne = $(window).innerHeight();
		var positionTwo = positionOne * 2;
		var positionThree =  positionTwo + positionOne;

		var asideHeight;
		var asideWidth = $('#aside').parent().width();
		var windowHeight = $(window).outerHeight();
		var windowMoreAside;

		var currentScroll = 0;

		$(document).on('scroll', function(event) {
			var position = $(this).scrollTop(),
				heightHeader = $('.header:not(.header.scroll)').outerHeight(),
				positionContentEvent = $('.content').offset().top,
				asideBig = $('#aside').outerHeight() > $('#content').outerHeight();

			if (position > 0 && !header.hasClass('scroll-ie')) {
				header.addClass('scroll-ie');
				header.css({'position': 'fixed'});
				content.css('padding-top', positionContent);
				menuLeft.collapse('hide');

			} else if (position <= 0){
				header.removeClass('scroll-ie');
				header.css({'position': ''});
				content.css('padding-top', '');
				menuLeft.collapse('show')
				headerNavSystem.collapse('show');
			}

			if (position > positionTwo && headerNavSystem.hasClass('show') ) {
				headerNavSystem.collapse('hide');
			}
			addClassScroll($('.header'), 'scroll', positionThree);
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