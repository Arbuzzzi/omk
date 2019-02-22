$(document).ready(function (){
	var ua = window.navigator.userAgent.toLowerCase();
	var ie = (/trident/gi).test(ua) || (/msie/gi).test(ua);
	var edge = ((/edge/).test(ua));

	if (ie) {

		var header = $('.header');
		var content = $('.header + *');
		var headerBread = $('.header .breadcrumb');
		var headerNavSystem = $('#header-nav');
		var menuLeft = $('#menuLeftList');

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

		$(document).on('scroll', function(event) {
			var position = $(this).scrollTop(),
				heightHeader = $('.header:not(.header.scroll)').outerHeight(),
				positionContentEvent = $('.content').offset().top,
				asideBig = $('#aside').outerHeight() > $('#content').outerHeight();

			// if (positionContent !== $(header).actual('outerHeight')
			// 	&& position <= $(header).actual('outerHeight')) {
			// 	$(content).animate({paddingTop: $(header).actual('outerHeight')},300)
			// }

			if (position > 0 && !header.hasClass('scroll-ie')) {
				$(header).css({'position': 'fixed'});
				$(content).css('padding-top', positionContent);

				$(header).addClass('scroll-ie');
				$(menuLeft).collapse('hide');
				$(headerBread).css('padding-bottom', '15px');

			} else if (position <= 0){
				$(header).removeClass('scroll-ie');
				$(menuLeft).collapse('show');
				$(headerNavSystem).collapse('show');

				// positionContent = $(header).actual('outerHeight');
				//
				// $(content).css('padding-top', positionContent);
				// $(content).animate({paddingTop: positionContentDefault}, 300);
				$(headerBread).css('padding-bottom', '');
			}

			if (position > positionTwo && headerNavSystem.hasClass('show') ) {
				$(headerNavSystem).collapse('hide');
			}
			addClassScroll($('.header'), 'scroll', positionThree);
		});



		if (header.hasClass('scroll')) {
			$(headerNavSystem).collapse('hide');
			$(headerBread).css('padding-bottom', '15px');
		}
		$(header).css({'position': 'fixed'});
		$(content).css('padding-top', positionContent);

		$(headerNavSystem).on('show.bs.collapse', function (){
			var position = $(document).scrollTop();
			if (position <= 0) {
				$(header).css({'position': ''});
				$(content).css('padding-top', '');
			}
		});

		$(headerNavSystem).on('shown.bs.collapse', function (){
			var position = $(document).scrollTop();
			if (position <= 0){
				positionContent = $(header).actual('outerHeight');
				header.css({'position': 'fixed'});
				content.css('padding-top', positionContent);
			}
		});

		$(headerNavSystem).on('hide.bs.collapse', function (){
			var position = $(document).scrollTop();
			if (position <= 0) {
				header.css({'position': ''});
				content.css('padding-top', '');
			}
		});

		$(headerNavSystem).on('hidden.bs.collapse', function (){
			var position = $(document).scrollTop();
			if (position <= 0){
				positionContent = $(header).actual('outerHeight');
				header.css({'position': 'fixed'});
				content.css('padding-top', positionContent);
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