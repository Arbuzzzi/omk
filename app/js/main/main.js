$(document).ready(function() {
	//todo в инете полно библиотек, которые умеют определять браузер https://github.com/lancedikson/bowser
	var ua = window.navigator.userAgent.toLowerCase();
	var ie = (/trident/gi).test(ua) || (/msie/gi).test(ua);
	var	edge = ((/edge/).test(ua));
	var safari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
	var scrollbarWidth = $(document).scrollbarWidth();
	// safari = true;


	/* Валидация ------------------------------------------------------------------------------------ */
	//todo валидация на что?
	var x = {
				rules: {
						name: {
								required: true,
								minlength: 2,
						},
						email: {
								required: true,
								email: true
						},
						phone: {
								required: true,
								// minlength: 18
						},
						checkbox: {
							required: true,
						},
						email: {
							required: true,
						}
					},
					errorPlacement: function(error, element){},

	};

	//todo что это за формы?
	$("#form1").validate(x);
	$("#form2").validate(x);
	$("#form3").validate(x);

	//todo а это что за обработчик? какая страница, что оно делает?
	$('input[type="checkbox"].policy-chekbox').on('click change', function() {
		var thisInp = $(this);
				inputId = thisInp.attr('id');


		if (thisInp.prop('checked') == false) {
			thisInp.addClass('error');
		} else {
			thisInp.removeClass('error');
		}

		if ($('#' + inputId).hasClass('error') == true) {
			$('label[for='+inputId+']').addClass('label-error')

		}
		if ($('#' + inputId).hasClass('error') != true) {
			$('label[for='+inputId+']').removeClass('label-error')


		}

	})

	// маска для телефона
	$('input[type="tel"]').mask('9 (999) 999999?999');
	$('input[type="tel"]').on('change focus click', function() {
		$(this)[0].setSelectionRange(0, 0);
	});

	// multiple select
	// todo для чего этот обработчик? не для всего же сайта, правильно?
	$("select[multiple]").mousedown(function(e){
		e.preventDefault();

		var select = this;
		var scroll = select.scrollTop;

		e.target.selected = !e.target.selected;

		setTimeout(function(){select.scrollTop = scroll;}, 0);

		$(select).focus();
	}).mousemove(function(e){e.preventDefault()});


	var mobile = false;
	if ($(window).outerWidth() < 768) {
		mobile = true;
	}
	$(window).resize(function (e){
		if ($(this).outerWidth() < 768) {
			mobile = true;
		} else {
			mobile = false;
		}
	});


	//todo удалить все комментарии в коде
	// подпункты меню раскрывается при наведении
	// $('.menu-nav-header__item').on('mouseenter', function(event) {
	// 	var element = $(event.target).parents('.menu-nav-header__item'),
	// 			elementControl = $(element.data('target'));
	// 	if (elementControl.hasClass('collapse')) {
	// 		elementControl.collapse('show');	

	// 		$(this).on('mouseleave', function(event) {
	// 			elementControl.collapse('hide');
	// 		});
	// 	}
	// });


	// menu-burger ---------------------------------------------------------------------------------------------------
	var header = $('.header');
	var content = $('.header + *');

	$('#menu-nav-headerGroup').on('show.bs.collapse', function(e) {
		var menuNavHeader = $(this).parents('.menu-nav-header');

		$(menuNavHeader).addClass('show');


	});

	$('#menu-nav-headerGroup').on('hidden.bs.collapse', function(e) {
		var menuNavHeader = $(this).parents('.menu-nav-header');

		if (!mobile) $(menuNavHeader).removeClass('show');

	});

	//todo rollUp -> roll-up. По стандарту.
	$('.rollUp').on('click', function(event) {
		$(document).trigger('scroll');
	});

	// todo - а если мне понадобится .btn-group в контенте, это ведь тоже сработает. заменить селектор
	$('.btn-group').on('show.bs.dropdown', function() {
		$(header).css('transform', 'none');
	});

    // todo - а если мне понадобится .btn-group в контенте, это ведь тоже сработает. заменить селектор
	$('.btn-group').on('hide.bs.dropdown', function() {
		$(header).css('transform', '');
	});


	/* ПОДМЕНЮ "СИСТЕМЫ" ----------------------------------------------------------------------------- */
	var headerNavSystem = $('#header-nav');


	// мобильные
	$(window).resize(function (){
		setTimeout(function (){
			if (mobile) {
				$('#header-nav').hideClickAway('collapse');
				$('#menu-nav-headerGroup').hideClickAway('collapse');
			} else {
				$('#header-nav').hideClickAway();
				$('#menu-nav-headerGroup').hideClickAway();
			}
		},500)

	});

	if (mobile) {
		$('#header-nav').collapse('hide');
		//todo header-navControl -> header-nav-control
		$('#header-navControl').removeClass('active');
		$('#header-nav').hideClickAway('collapse');
        //todo menu-nav-headerGroup -> menu-nav-header-group
		$('#menu-nav-headerGroup').hideClickAway('collapse');



		setTimeout(function (){
			$('.header-nav-system-wrap').removeClass('mobile-hide');
		}, 300)
	} else {
		$('.header-nav-system-wrap').addClass('show')
        //todo дальше писать не буду. Все селекторы не по стандарту нужно привести к одному виду.
		$('#header-navControl').addClass('active');
	}

	$(window).resize(function (){
		if (mobile) {
			$('#header-nav').collapse('hide');
		} else {
			$('#header-nav').collapse('show');
		}
	});



	// системы показываются
	$('#header-nav').on('shown.bs.collapse', function () {
		var btn = $('#header-navControl');
		btn.addClass('active')
	});

	// системы скрываются
	$('#header-nav').on('hidden.bs.collapse', function () {
		var btn = $('#header-navControl');
		btn.removeClass('active');
	});

	if (safari || edge) {
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
				$(header).css({'position': 'fixed'});
				$(content).css('padding-top', positionContent);
			}
		});

		$(headerNavSystem).on('hide.bs.collapse', function (){
			var position = $(document).scrollTop();
			if (position <= 0) {
				$(header).css({'position': ''});
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

	// разворачиваем меню
	//todo btnDeploy заменить по стандарту на btn-deploy.
	$('#btnDeploy').click(function(event) {
		$(header).removeClass('scroll').css({
			'position': 'fixed',
			'padding-bottom': '10px'
		});

		$('#header-nav').collapse('show');

		//todo по стандарту наименование
		$('#menuLeftList').collapse('show');

        //todo по стандарту наименование
		$('.rollUp').addClass('show');
		return false;
	});

	// настройки показываются
	//todo ниже много кода, который непонятно что делает и зачем. нужно расписать хотя бы комментами, если кодом не получается
	$('#header-navSetting').on('show.bs.collapse', function () {
		var headerHeight = $(header).actual('outerHeight');

		// инициализация drag & drop
		//todo заменить селектор. название не очевидное.
		$( "#sortable" ).sortable();
		$( "#sortable" ).disableSelection();
		$( "#sortable" ).draggable();

		$(header).css('transform', 'none');

		$(this).parent().append('<div class="overlay"/>');
		$('.overlay').animate({opacity: 'show'}, 400);

		$('#header-navSettingControl').css({
			position: 'relative',
			zIndex: '1000'
		}).addClass('active');


		if ($(document).scrollTop() <= 0) {
			$('body').css({
				overflow: 'hidden',
				paddingRight: scrollbarWidth,
				paddingTop: headerHeight
			});
			// if (safari && ie && edge)  {
			// 	$(header).css({
			// 		'padding-right': scrollbarWidth
			// 	});
			// }
		} else {
			$('body').css({
				overflow: 'hidden',
				paddingRight: scrollbarWidth,
			});
		}
		// if ($(header).hasClass('fixed'))

// <<<<<<< HEAD
// 		var headerPositionDeafult = $('.header').css('position');
// 		$('.header').wrap('<div class="extra-wrapper"></div>');
// 		$('.header').css({
// 			position: '',
// 			// 'padding-right': scrollbarWidth'
// 		});
// 		//todo убрать все комменты
// =======
		var headerPositionDeafult = $(header).css('position');
		$(header).wrap('<div class="extra-wrapper"></div>');

		if  ($(header).hasClass('fixed') && $(document).scrollTop() > 0) {
			$(header).css({
				paddingRight: scrollbarWidth
			})
		}
// >>>>>>> header-sticky-safari
		// if (ie) {
		// 	$(header).css({
		// 		paddingRight: scrollbarWidth
		// 	})
		// }

		checkboxDisabl($(this), 10)
	});
	$('#header-navSetting').on('shown.bs.collapse', function (){
		if ($(document).scrollTop() <= 0) {
			$('body').css({
				overflow: 'hidden',
				paddingRight: scrollbarWidth,
				paddingTop: ''
			});
		}

		if  ($(header).hasClass('fixed')) {
			$(header).css({
				paddingRight: scrollbarWidth
			})
		}
	});

// <<<<<<< HEAD
// 	//todo англисйкий - тут и ниже со всеми переменными
// =======
	// настройки скрываются
	$('#header-navSetting').on('hide.bs.collapse', function () {
		$(header).css('transform', '');
		$('.overlay').animate({
			opacity: 0
		}, 400, function() {
			$(this).detach()
		});

		$('body').css({
			overflow: '',
			paddingRight: '',
			paddingTop: ''
		});
		$(header).css({
			'padding-right': '',
			// 'position': headerPositionDeafult
		});
		$(header).unwrap();

		$('#header-navSettingControl').removeClass('active').removeAttr('style');
	})



// >>>>>>> header-sticky-safari
	var checkboxs = $('input[type="checkbox"].setting-form-checkbox__input'),
			checkboxCheckd        = $('.setting-form').find('input[type="checkbox"]:checked'),
			checkboxCheckdInch    = checkboxCheckd.length,
			deafultCheckboxCheckd = checkboxDisabl($('.setting-form'), 10),
			deafultSettingBoxes     = $('.nav-setting-wrap').html();

	// сброс формы

	$('.setting-form').on('click', 'button.form-setting-button:reset', function(event) {

		$('.nav-setting-wrap').html(deafultSettingBoxes);
		checkboxDisabl($(this), 10, deafultCheckboxCheckd, 0);

	});

	// изменеие checkbox
	$('.setting-form').on('change', checkboxs, function(event) {
		var checkbox   = $(event.target),
				checkboxID = checkbox.attr('id');

		if (checkbox.prop('checked')) {
			var el = $('[data-control='+checkboxID+']'),
					elParent = el.parent();

			el.appendTo(elParent).show('400');
			// $('[data-control='+checkboxID+']').show('400');

		} else {
			$('[data-control='+checkboxID+']').hide('400');
		}

		checkboxDisabl($(this), 10)

	});

	// отправка формы settingForm
	$('#settingForm').submit(function(e) {
		var $form = $(this);
		var buttonSubmit  = $(this).find('[type="submit"]'),
				buttons = buttonSubmit.attr('data-nav-control');

		$.ajax({
			type: $form.attr('method'),
			url: $form.attr('action'),
			data: $form.serialize()
		}).done(function(msg) {

			$('[data-nav-control='+buttons+']').removeClass('active');


		}).fail(function(msg) {
			alert('Ошибка! Обратитесь к администратору.');
		});
		//отмена действия по умолчанию для кнопки submit
		e.preventDefault();
	});

	//todo что за название? checkboxDisable может быть?
	//todo и что делает эта функция?
	function checkboxDisabl(form, max, checkboxArrDeafult, speed) {
		// form - елемент в котором ищем активные чекбоксы
		// max - максимальное количество input со значение checked
		// checkboxArrDeafult - изначальное положение элементов
		// speed - скорость анимации
		var checkbox = form.find('input[type="checkbox"]'),
				checkboxCheckd,  //todo это и все что ниже - ошибки в анлг языке - checkboxChecked - вот так правильно.
				checkboxNotCheckd,
				checkboxCheckdInch,
				checkboxNotCheckdInch,
				speed,
				checkboxArrID;

		if (speed === undefined) {
			speed = 400;
		}
		if (checkboxArrDeafult === undefined) {
			checkboxCheckd = form.find('input[type="checkbox"]:checked');
			checkboxNotCheckd = form.find('input[type="checkbox"]:not(:checked)');

		} else {
			checkboxCheckd = checkboxArrDeafult['deafultCheckboxCheckd'];
			checkboxNotCheckd = checkboxArrDeafult['deafultCheckboxNotCheckdInch'];
		}

		checkboxArrDeafult = {
			//todo английский, исправить
			deafultCheckboxCheckd: form.find('input[type="checkbox"]:checked'),
			//todo английский, исправить
			deafultCheckboxNotCheckdInch: form.find('input[type="checkbox"]:not(:checked)'),
		}

		checkboxCheckdInch    = checkboxCheckd.length
		checkboxNotCheckdInch = checkboxNotCheckd.length,

		checkboxNotCheckdArrID = checkboxNotCheckd.map(function(indx, element){
			return $(element).attr("id");
		});

		checkboxCheckdArrID = checkboxCheckd.map(function(indx, element){
			return $(element).attr("id");
		});

		if (checkboxCheckdInch >= max) {
			// если болшье max выключаем не отмеченые checkbox
			// checkboxNotCheckd.prop("disabled", true);

			// скрываем не отмечене блоки drag & drop
			for (var i = checkboxNotCheckdArrID.length - 1; i >= 0; i--) {
				$('[data-control='+checkboxNotCheckdArrID[i]+']').hide(speed);

				//todo тут и везде по коду ниже - ты очень сильно грузишь DOM - когда два раза селектором ищешь элемент. используй переменные. это ко всему коду относится.
				$('#'+checkboxNotCheckdArrID[i]).prop("disabled", true);
				$('#'+checkboxNotCheckdArrID[i]).parent().tooltip('enable');
			}
			for (var i = checkboxCheckdArrID.length - 1; i >= 0; i--) {
				$('[data-control='+checkboxCheckdArrID[i]+']').show(speed);
				$('#'+checkboxCheckdArrID[i]).prop("disabled", false);
				$('#'+checkboxCheckdArrID[i]).parent().tooltip('disable');
			}



		} else {
			// если меньше max включаем не отмеченые checkbox
			checkboxNotCheckd.prop("disabled", false);
			checkboxNotCheckd.parent().tooltip('disable');
			checkboxCheckd.parent().tooltip('disable');

		}
		return checkboxArrDeafult;

	}

	/* START СКРОЛЛИНГ ------------------------------------------------------------------------------- */
	if (!mobile) {
		addClassScroll($(header));
	}
	// скрываем элементы во время скроллинга страницы
	var positionContent = $(header).actual('outerHeight'),
			chekPosContent,
			positionOne = $(window).innerHeight(),
			menuLeftListDeafult = $('#menuLeftList').hasClass('show'),
			positionTwo = positionOne * 2,
			asideHeight,
			positionThree =  positionTwo + positionOne,
			asideWidth = $('#aside').parent().width(),
			windowHeight = $(window).outerHeight(),
			windowMoreAside,
			currentScroll = 0;
	var paddingTopContentMax = $(header).actual('outerHeight');


	var $window = $(window);
	var width = $window.width();
	var height = $window.height();

	setInterval(function () {
		console.log(width +' - '+ $window.width());
		if ((width != $window.width()) || (height != $window.height())) {
			width = $window.width();
			height = $window.height();


			var position = $(this).scrollTop();
			var menuLeft = $('#menuLeftList');
			var meuLeftShown = menuLeft.hasClass('show');


			positionOne = $(window).innerHeight();

			windowHeight = $(window).outerHeight();
			asideWidth = $('#aside').parent().width();

			if (mobile) $('#menuLeftList').collapse('hide');
			$('.widget-slider').slick('refresh');
			if (position <= 0) {
				paddingTopContentMax = $(header).actual('outerHeight');
				$('#menuLeftList').collapse('show');
				// $('#leftNavigationPseudo').css('display', 'block');
				$(content).animate({
					paddingTop: paddingTopContentMax
				}, 400)



			}
			if (position > 0) {

				if ($(aside).hasClass('positionTop')) {
					var headerHeight = $(header).actual('outerHeight');
					$(aside).css('top', headerHeight).removeClass('scrollingTop scrollingBottom ');

					asideHeight = $(aside).actual('outerHeight') + $(header).actual('outerHeight'); // бывает вызыв события scroll
					windowMoreAside = asideHeight < windowHeight;
					if (windowMoreAside) {
						$(aside).css('bottom:', '').addClass('positionTop');
					}
				}
			}
			$(aside).css({
				width: asideWidth,
			});
			if (!mobile) {
				$(aside).css({
					position: '',
					top: '',
					bottom: '',
					width: '',
					marginTop: '',
				}).removeClass('positionTop positionBottom scrollingTop scrollingBottom')
					.addClass('positionStatic');
			}
		}
	}, 800);

	// $(window).resize(function (){
	// 	var position = $(this).scrollTop();
	// 	var menuLeft = $('#menuLeftList');
	// 	var meuLeftShown = menuLeft.hasClass('show');
	//
	//
	// 	positionOne = $(window).innerHeight();
	//
	// 	windowHeight = $(window).outerHeight();
	// 	asideWidth = $('#aside').parent().width();
	//
	// 	if (mobile) $('#menuLeftList').collapse('hide');
	//
	// 	// if (!mobile) {
	// 	// 	$('#header-nav').collapse('hide');
	// 	// 	console.log('!mobile');
	// 	// } else {
	// 	// 	console.log('mobile');
	// 	// 	if (position < positionThree) {
	// 	// 		$('#header-nav').collapse('show');
	// 	// 	} else {
	// 	// 		$('#header-nav').collapse('hide');
	// 	// 	}
	// 	// }
	// 	if (position <= 0) {
	// 		var positionTop = setTimeout(function (){
	// 			paddingTopContentMax = $(header).actual('outerHeight');
	// 			$('#menuLeftList').collapse('show');
	// 			// $('#leftNavigationPseudo').css('display', 'block');
	// 			$(content).animate({
	// 				paddingTop: paddingTopContentMax
	// 			}, 400)
	// 		}, 500)
	//
	//
	//
	// 	}
	// 	clearTimeout(positionTop);
	// 	if (position > 0) {
	//
	// 		setTimeout(function (){
	// 			// paddingTopContentMax = $(header).actual('outerHeight');
	//
	// 			// $(content).animate({
	// 			// 	paddingTop: paddingTopContentMax
	// 			// }, 400);
	// 			if ($(aside).hasClass('positionTop')) {
	// 				var headerHeight = $(header).actual('outerHeight');
	// 				$(aside).css('top', headerHeight).removeClass('scrollingTop scrollingBottom ');
	//
	// 				asideHeight = $(aside).actual('outerHeight') + $(header).actual('outerHeight'); // бывает вызыв события scroll
	// 				windowMoreAside = asideHeight < windowHeight;
	// 				if (windowMoreAside) {
	// 					$(aside).css('bottom:', '').addClass('positionTop');
	// 				}
	// 			}
	// 		},500)
	// 	}
	// 	$(aside).css({
	// 		width: asideWidth,
	// 	});
	// 	if (!mobile) {
	// 		setTimeout(function (){
	// 			$(aside).css({
	// 				position: '',
	// 				top: '',
	// 				bottom: '',
	// 				width: '',
	// 				marginTop: '',
	// 			}).removeClass('positionTop positionBottom scrollingTop scrollingBottom')
	// 				.addClass('positionStatic');
	// 		}, 600)
	// 	}
	//
	// });

	$('#menuLeftListControl').on('click', function() {
		var position = $(window).scrollTop();
		if (position <= 0 && !safari) {
			menuLeftListDeafult = !menuLeftListDeafult;
		}
		if (position < positionThree && safari) {
			menuLeftListDeafult = !menuLeftListDeafult;
		}
	});
	if (safari || edge || ie) {
		$(header).css({'position': 'fixed'}).addClass('fixed');
		$(content).css('padding-top', positionContent);
	}
	if (!ie) {
		var headerBread = $('.header .breadcrumb');
		// var headerNavSystem = $('#header-nav');
		var menuLeft = $('#menuLeftList');
		var aside = $('#aside');

		// var asideHeight;
		
		$(document).on('scroll', function(e) {
			var windowHeight = $(window).outerHeight();
			var position = $(this).scrollTop();
			var positionBottom = position + windowHeight;
			var positionContentEvent = $('.content').offset().top;
			var asideBig = $('#aside').outerHeight() > $('#content').outerHeight();
			var asideOfsetTop;
			var headerHeight;
			var contentPadding;
			var positionContent = $(header).actual('outerHeight');

			if (paddingTopContentMax < positionContent) paddingTopContentMax = positionContent;
			
			if (mobile && $('#header-nav').hasClass('show')) {
				$('#header-nav').collapse('hide');
			}

			if ($('#menu-nav-headerGroup').hasClass('show')
				|| $('.menu-left-navigation-pseudo').hasClass('show')) {
				$('#menu-nav-headerGroup').collapse('hide');
			}

			$('*').tooltip('hide');
			// скрываем dropdown при скролле
			if ($('.dropdown-menu').hasClass('show')) {
				$('.dropdown-menu').removeClass('show');
			}

			// header
			if (!mobile) {
				if (position > 0) {

					if (!edge && !safari) $(header).css({'position': 'fixed'});

					if (!$(header).hasClass('fixed')) {
						$(header).addClass('fixed');
						if (!edge && !safari) $(content).css('padding-top', positionContent);
					}

					//
					// if (!safari) {
					// }
					if (position >= positionThree) {
						$('#header-nav').collapse('hide');
					} else {
						$('#header-nav').collapse('show');
					}

				} else {
					if (!edge && !safari) $(header).css({'position': ''});
					if (!edge && !safari) $(content).css('padding-top', '');
					if (!edge && !safari) $(header).removeClass('fixed');
					$('#header-nav').collapse('show');
				}
			}

			// header
			if (!mobile) addClassScroll($(header), 'scroll', positionThree);

			if (safari || edge) {
				if (position >= positionThree) {
					$('#menuLeftList').collapse('hide');
				} else if(menuLeftListDeafult) {
					$('#menuLeftList').collapse('show');
					if ($(aside).hasClass('positionTop')) $('#leftNavigationPseudo').collapse('show');
					if (position <=0) {
						$(content).animate({paddingTop: paddingTopContentMax}, 300);
						$('#leftNavigationPseudo').collapse('show')
					}
				}
			}


			if (!$(header).hasClass('scroll') && !$('#header-navSetting').hasClass('show') && !mobile){



				if (position > 0 /*&& !asideBig*/){
					// collapseItemScrollHide($('#menuLeftListControl'), 0);
					if (!safari) $('#menuLeftList').collapse('hide');


					// $(content).css('padding-top', positionContent);
					$('#btnUp').animate({bottom: 'show'}, 500);
					$('.header .breadcrumb').css({
						paddingBottom: '15px'
					});


				}else {
					if (!edge && !safari) $(content).css('padding-top', '');
					$('#btnUp').animate({bottom: 'hide', opacity: 'hide'}, 500);
					$('.header .breadcrumb').removeAttr('style')
				}
			}

			// меню свернуто
			if ($(header).hasClass('scroll')){
				$('#header-nav').collapse('hide');
				$('#header-navControl').removeClass('active');
			}

			// scroll top самый верх экана
			if (position <= 0){

				if (!mobile){
					$('#header-nav').collapse('show');
				}
				if (!edge && !safari) $(header).removeAttr('style');
				addClassScroll($(header));
				positionContent = $(header).actual('outerHeight');
			}

			// scroll bottom
			if (position > 0){
				$('.menu-left').removeAttr('style');
				// $('#menu-nav-headerGroup').collapse('hide');
				// $(header).css('padding-bottom', '');

				// развернуть
				if (!$('.rollUp').hasClass('show') && $(header).hasClass('scroll')){
					$('.rollUp').addClass('show');
				}else {
					$('.rollUp').removeClass('show');
				}

				// if (!$(header).hasClass('scroll')){
				// 	if (!edge) $(header).css({'position': 'fixed'});
				// }

			}else {
				$('.rollUp').removeClass('show');
			}
			
			// aside
			if (!mobile) {
					asideHeight = $(aside).actual('outerHeight') + $(header).actual('outerHeight'); // бывает вызыв события scroll
					windowMoreAside = asideHeight < windowHeight;

				if (!asideBig) { // боковая меньше контента

					if (position > currentScroll) { // скроллим вниз

						var hasAsideTop;
						hasAsideTop = $(aside).hasClass('scrollingTop');

						if (position > 0) {
							$(aside).removeClass('scrollingTop');

							if (!$(aside).hasClass('scrollingBottom')) {
								asideOfsetTop = $(aside).offset().top;
								headerHeight = $(header).actual('outerHeight');
								contentPadding = parseInt($('.header + *').css('padding-top'));

								$(aside).addClass('scrollingBottom');
								if (!$(aside).hasClass('positionStatic')/*
									&& $(aside).hasClass('scrollingBottom')
									&& !$(aside).hasClass('scrollingTop')*/) {
									$(aside).css({
										position: '',
										top: '',
										bottom: '',
										marginTop: asideOfsetTop - contentPadding,
									}).removeClass('positionTop positionBottom').addClass('positionStatic');
								}

								// if ($(aside).hasClass('positionStatic')) {
								// 	asideOfsetTop = $(aside).offset().top;
								// 	headerHeight = $(header).actual('outerHeight');
								//
								// 	$(aside).css({
								// 		position: 'fixed',
								// 		top: $(header).actual('outerHeight'),
								// 		bottom: '',
								// 		width: asideWidth,
								// 		marginTop: '',
								// 	}).addClass('positionTop').removeClass('positionStatic');
								// }
							}

							// if ($(aside).hasClass('positionTop')) {
							// 	asideOfsetTop = $(aside).offset().top;
							// 	headerHeight = $(header).actual('outerHeight');
							//
							// 	$(aside).css({
							// 		position: '',
							// 		top: '',
							// 		bottom: '',
							// 		width: '',
							// 		marginTop: asideOfsetTop - position,
							// 	}).addClass('positionStatic').removeClass('positionTop');
							// }

							asideOfsetTop = $(aside).offset().top;
							asideHeight = $(aside).actual('outerHeight') + $(aside).offset().top;

							if (windowMoreAside) {
								$(aside).css({
									position: 'fixed',
									top: $(header).actual('outerHeight'),
									bottom: '',
									marginTop: '',
									width: $('#aside').parent().width(),
								}).addClass('positionTop').removeClass('positionStatic positionBottom');
							}

							if (positionBottom >= asideHeight) { // прилепляем асайд к низу
								if (!windowMoreAside) {
									$(aside).css({
										position: 'fixed',
										top: '',
										bottom: '0px',
										marginTop: '',
										width: $('#aside').parent().width(),
									}).addClass('positionBottom').removeClass('positionTop positionStatic');
								}
							}


						}

					} else { // скролл вверх

						contentPadding = parseInt($('.header + *').css('padding-top'));

						asideOfsetTop = $(aside).offset().top;
						headerHeight = $(header).actual('outerHeight');

						hasAsideTop = $(aside).hasClass('scrollingTop');



						if (position > 0) {

							if (!$(header).hasClass('scroll') && $(aside).hasClass('positionTop')) {
								headerHeight = $(header).actual('outerHeight');
								$(aside).css({
									position: '',
									top: headerHeight,
									bottom: '',
									marginTop: '',
								});
							}

							$(aside).removeClass('scrollingBottom');
							$(aside).addClass('scrollingTop');

							asideOfsetTop = $(aside).offset().top;
							headerHeight = $(header).actual('outerHeight');

							if (asideOfsetTop < position + headerHeight) {

								if ($(aside).hasClass('positionBottom')) {
									$(aside).css({
										position: '',
										top: '',
										bottom: '',
										marginTop: asideOfsetTop - contentPadding,
									}).removeClass('positionBottom positionTop').addClass('positionStatic');
								}

							} else {
								$(aside).css({
									position: 'fixed',
									top: $(header).actual('outerHeight'),
									bottom: '',
									width: asideWidth,
									marginTop: '',
								}).addClass('positionTop').removeClass('positionStatic');
							}

						} else {
							$(aside).css({
								position: '',
								top: '',
								bottom: '',
								width: '',
								marginTop: '',
							}).removeClass('positionTop positionBottom scrollingTop scrollingBottom')
								.addClass('positionStatic');
						}
					}
				}
			}

			currentScroll = position;
		});
	}
	//
	// $('#leftNavigationPseudo').on('hide.bs.collapse', function (){
	// 	$(this).css('display', 'none');
	//
	//
	// });
	//todo т.е. каждые две секунды какой то код на всех страницах сайта будет выполняться? это недопустимо
	setInterval(function() {
		var position = $(document).scrollTop(),
				menuLeft = $('#menuLeftList'),
				meuLeftShown = menuLeft.hasClass('show');

		if (position <= 0 && menuLeftListDeafult && !meuLeftShown) {
			$('#menuLeftList').collapse('show');
		}
	}, 2000)


	// плавный скролл до элемента
	//todo убрать код и использовать https://github.com/cferdinandi/smooth-scroll - нам такой скролл может пригодиться на любых страницах сайта. а не только в календаре
	$(document).on('click', 'a.event, a.calendar__link', function(event) {
		var link = $(this).attr('href');
		var elementToScroll = $('#' + link.split('#')[1]);

		if (elementToScroll !== undefined && elementToScroll !== null && elementToScroll !== '') {
			scrollTo(elementToScroll);
		}
	});

	function scrollTo ($elementToScroll) {
		var elementToScroll = $($elementToScroll);
		var elementToScrollPos = elementToScroll.offset().top;
		var headerHeight = $(header).outerHeight(); // высота хэдера
		if (elementToScrollPos < positionTwo) {
			elementToScrollPos = elementToScroll.offset().top - headerHeight - 45;
		} else {
			elementToScrollPos = elementToScroll.offset().top - 90;
		}

		if (elementToScroll !== undefined) {
			$('html:not(:animated),body:not(:animated)').animate({scrollTop: elementToScrollPos}, 800);
			// event.preventDefault();
			return false;
		}
	}


	// заказчик попросил чтобы при клике на пустую ссылку ничего не происходило
	// todo убрать вообще
	$(document).on('click', 'a', function(event) {
		var el = event.target,
				elHref = $(el).attr('href');
		if (elHref === undefined || elHref === '#' || elHref === '') {
			event.preventDefault();
		}
	});



	var myHash = location.hash; //получаем значение хеша
	//location.hash = ''; //очищаем хеш

	// todo - а это зачем нужно? где это используется и кем?
	$(window).on('load', function() {
		var headerHeight = $(header).outerHeight(); // высота хэдера
		if(myHash[1] !== undefined && myHash[1] !== '#'){ //проверяем, есть ли в хеше какое-то значение
			var elementToScrolling = $(myHash).offset().top;
			if (elementToScrolling < positionTwo) {
				elementToScrolling = $(myHash).offset().top - headerHeight - 48;
			} else {
				elementToScrolling = $(myHash).offset().top;
			}

			$('html:not(:animated),body:not(:animated)').animate({scrollTop: elementToScrolling}, 800,
				function () {

				});
		};

	});


	//todo что за кнопка, что это вообще такое? + btnUp -> btn-up
	$('#btnUp').click(function() {
		var destination = 0;

		$('html:not(:animated),body:not(:animated)').animate({
			scrollTop: destination
		}, 800, function () {
		});
		return false;
	});

	//todo добавить описание
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

    //todo добавить описание
	function removeClassScroll(element, $class) {
		var position = $(this).scrollTop();
		if ($class === undefined) {
			$class = 'scroll';
		}
		if (position >= 200) {
			element.removeClass($class);
		} else {
			element.addClass($class);
		}
		return position;
	}

    //todo добавить описание
	function toggleCollapseScroll(element) {
		var position = $(this).scrollTop();
		if (position >= 200) {
			element.collapse('hide');
		} else {
			element.collapse('show');
		}
		return position;
	}

    //todo добавить описание
	function toggleDropdownScroll(element) {
		var position = $(this).scrollTop();
		if (position >= 200) {
			element.attr('data-toggle', 'dropdown');
			element.find('i').animate({opacity: 'show'}, 400);
		} else {
			element.removeAttr('data-toggle');
			element.dropdown('dispose');
			element.find('i').animate({opacity: 'hide'}, 400);
		}
	}

    //todo добавить описание
	function collapseItemScrollHide(btnControl, hidePosition) {
		var position = $(this).scrollTop(),
				itemControl = $(btnControl.data('target'));

		if (hidePosition === undefined) {
			hidePosition = 0;
		}
		if (position > hidePosition && itemControl.hasClass('show')) {
			itemControl.collapse('hide');
		}
	}

    //todo добавить описание
	function collapseItemScrollShow(btnControl, hidePosition) {
		var position = $(this).scrollTop(),
				itemControl = $(btnControl.data('target'));

		if (hidePosition === undefined) {
			hidePosition = 0;
		}
		if (position < hidePosition && menuLeftListDeafult) {
			itemControl.collapse('show');
		}
	}


	/* END СКРОЛЛИНГ ------------------------------------------------------------------------------- */

	// левое меню show 
	$('#menuLeftList').on('show.bs.collapse', function() {
		var btn = $('#menuLeftListControl');
		var position = $(document).scrollTop();

		btn.addClass('active');
		$('.menu-left-more__list').removeClass('show');
		$('#navMoreListControl').removeAttr('data-toggle');
		$('#navMoreListControl').dropdown('dispose');
		$('.menu-left-more__button>i').animate({opacity: 'hide'}, 400);
		if (position < positionThree && !safari && !edge) {
			// $('#leftNavigationPseudo').animate({height: $(this).actual('innerHeight')}, 300)
			$('#leftNavigationPseudo').collapse('show')
		}
		if (!edge && !safari) {
			if (position <= 0) {
				$('#leftNavigationPseudo').collapse('show')
			}
		}
		if (position <= 0) {
			$('#leftNavigationPseudo').collapse('show')
		}
	});

	// левое меню hide 
	$('#menuLeftList').on('hide.bs.collapse', function() {
		var btn = $('#menuLeftListControl');
		var position = $(document).scrollTop();
		btn.removeClass('active');
		$('#navMoreListControl').attr('data-toggle', 'dropdown')
		$('.menu-left-more__button>i').animate({opacity: 'show'}, 400);
		// $('#leftNavigationPseudo').animate({height: 0}, 300)
		$('#leftNavigationPseudo').collapse('hide')

	});

	var menuLeftList = $('#menuLeftList').actual('outerHeight');
	$('#leftNavigationPseudo').html('<div style="height:'+menuLeftList+'px;"></div>');

	// ставим лайки
	$(document).on('click', '.like-button:not(.comment-button)', function(event) {
		$(this).toggleClass('active');

	});

	// скрываем показываем фильтры
	$('#contentFilterButton').on('click', function(event) {
		var options = {
			direction: 'right'
		}
		$('.content-filter__formbox').toggle('slide', options);
	});
	// ставим текущую дату в фильтре
	$('#filtersCalendarPeriod').on('change click', function(event) {
		if ($(this).val() == 'true-date') {
			$(this).val('');
			$('[name="period_date_buffer"]').datepicker($.datepicker.regional[ "ru" ]);
			$('[name="period_date_buffer"]').datepicker('widget').addClass('widget-calendar widget-calendar_filter');
			$('[name="period_date_buffer"]').datepicker('option',{
				nextText: '>',
				prevText: '<',
			});
			$('[name="period_date_buffer"]').datepicker('show');


		}
	});
	$('[name="period_date_buffer"]').on('change', function(event) {
		$('#filtersCalendarPeriod').find('option').removeAttr('selected');
		$('#period_date').val($(this).val()); //
		$('#period_date').text($(this).val());
		$('#period_date').attr('selected', 'true');
		$('#filtersCalendarPeriod').val($(this).val());
	});

	/* ВИДЖЕТЫ -------------------------------------------------------------------------------------- */

	// hover на виджете с табами
	$('.widget-tabbox').on('mousemove', '.widget-item', function(event) {
		var box = $(event.delegateTarget),
				items = box.find('.widget-item');
				currentItem = box.find('.widget-item.active');
		currentItem.attr('data-current', 'true')
		items.removeClass('active');
		box.on('mouseleave', '.widget-items', function(event) {
			$('.widget-item[data-current="true"]').addClass('active')
		});
		items.click(function() {
			$('.widget-item[data-current="true"]').removeAttr('data-current')
		});

	});

	/* СОБЫТИЯ В ВИДЖЕТЕ "КАЛЕНДАРЬ" ----------------------------------------------------------------- */
    //todo это тут вообще нужно?
	// var setTimer;
	// var setTimerTimeOut = 10000;
	// setInterval(function(){ // открываем событие на текущей дате по таймеру
	// 	if (!$('#widgetCalendar').hasClass('show-event') && !mobile) {
	// 		$('#widgetCalendar .ui-datepicker-today.selected a.ui-state-default').trigger('click');
	// 		setTimer = setTimeout(function () {
	// 			$('.event-control').trigger('click');
	// 			$('#widgetCalendar').removeClass('show-event');
	// 		}, 5000)
	// 	}
	// }, 10000);

	// открываем события на выбранной дате
	// $('#calendarwidgetBox').on('click', 'a.ui-state-default', function(e) {
	// 	e.preventDefault();
	// 	var dayCurrent = $(this),
	// 			eventElements = $(dayCurrent.attr('href')),
	// 			eventElementArr = eventElements.find('.event'),
	// 			element = $(e.delegateTarget),
	// 			subtitle = element.find('.widget-subtitle span'),
	// 			calendar = element.find('.ui-datepicker-calendar'),
	// 			eventElementControl = element.find('.event-control');
	//
	//
	// 	element.addClass('show-event');
	// 	eventElementArr.hide();
	// 	// скрываем календарь
	// 	calendar.animate({
	// 		opacity: 'hide'},
	// 		150, function() {
	// 		eventElements.animate({opacity: 'show'}, 150);
	// 		eventElementControl.animate({opacity: 'show'}, 150);
	// 	});
	//
	// 	// показываем события выбраной даты
	// 	$(eventElementArr[0]).show().addClass('current');
	// 	for (var i = 0; i < eventElementArr.length; i++) {
	// 		$(eventElementArr[i]).attr('data-count', i);
	// 	}
	//
	// 	// если событий больше 1 то делаем их ввиде слайдера
	// 	if (eventElementArr.length > 1) {
	//
	// 		subtitle.after('<div class="event-nav">'+
	// 											'<button class="prev">&lt;&nbsp;</button>'+
	// 											'<span class="count">'+1+'&nbsp;из&nbsp;'+eventElementArr.length+'</span>'+
	// 											'<button class="next">&nbsp;&gt;</button>'+
	// 										'</div>');
	// 	}
	// 	var eventNav = element.find('.event-nav'),
	// 			prev = $(eventNav).find('.prev'),
	// 			next = $(eventNav).find('.next'),
	// 			count = $(eventNav).find('.count');
	//
	// 	prev.click(function() {
	// 		var current = eventElements.find('.event.current');
	// 		if ($(current).data('count') == 0) {
	// 			count.text(eventElementArr.length + ' из ' + eventElementArr.length);
	// 			$(current).fadeOut('150', function() {
	// 				$(eventElementArr[eventElementArr.length - 1]).fadeIn('150').addClass('current');
	// 			}).removeClass('current');
	// 		} else {
	// 			count.text($(current).data('count') + ' из ' + eventElementArr.length)
	// 			$(current).fadeOut('150', function() {
	// 				$(eventElementArr[$(current).data('count') - 1]).fadeIn('150').addClass('current');
	// 			}).removeClass('current');
	// 		}
	// 	});
	//
	// 	next.click(function() {
	// 		var current = eventElements.find('.event.current');
	// 		if ($(current).data('count') == eventElementArr.length - 1) {
	// 			count.text('1' + ' из '+eventElementArr.length)
	// 			$(current).fadeOut('150', function() {
	// 				$(eventElementArr[0]).fadeIn('150').addClass('current');
	// 			}).removeClass('current');
	// 		} else {
	// 			count.text($(current).data('count')+2 +' из '+eventElementArr.length)
	// 			$(current).fadeOut('150', function() {
	// 				$(eventElementArr[$(current).data('count') + 1]).fadeIn('150').addClass('current');
	// 			}).removeClass('current');
	// 		}
	// 	});
	//
	// 	// нажимаем на кнопку скрыть
	// 	eventElementControl.click(function(event) {
	// 		element.removeClass('show-event');
	// 		clearTimeout(setTimer);
	// 		element.find('.event-nav').detach();
	// 		eventElements.animate({opacity: 'hide'}, 150);
	// 		eventElementControl.animate({opacity: 'hide'}, 150, function () {
	// 			calendar.animate({opacity: 'show'}, 150);
	// 			eventElementArr.hide()
	// 		});
	//
	// 	});
	// });


	/* datepicker --------------------------------------------------------------------------------------------- */

	// fix datepicker beforeShow
	//todo напиши, что за багу ты тут решаешь, мы должны понимать это
	$.extend($.datepicker, {
		// Reference the original function so we can override it and call it later
		_inlineDatepicker2: $.datepicker._inlineDatepicker,
		// Override the _inlineDatepicker method
		_inlineDatepicker: function (target, inst) {
			// Call the original
			this._inlineDatepicker2(target, inst);
			var beforeShow = $.datepicker._get(inst, 'beforeShow');
			if (beforeShow) {
				beforeShow.apply(target, [target, inst]);
			}
		}
	});

	var eventsDates = [{
			date: new Date('02/6/2019'),
			tooltip: "<p>День металлурга </p>",
			link: "/calendar.html",
			eventItem: '#event-6',
			generalItem: '#events-06-10-2018'
		},
		{
			date: new Date('02/14/2019'),
			tooltip: "<p>День металлурга </p><p>День металлурга 2 </p>",
			link: "/calendar2.html",
			eventItem: '#event-14',
			generalItem: '#events-14-10-2018',
		},
		{
			date: new Date('02/24/2019'),
			tooltip: "<p>День металлурга3 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга3 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p>",
			link: "/calendar3.html",
			eventItem: '#event-24',
			generalItem: '#events-24-10-2018'
		},

	];

	// $('#pageCalendar').datepicker($.extend({
	// 		inline: true,
	// 		changeYear: true,
	// 		changeMonth: true,
	// 	},
	// 	$.datepicker.regional['ru_con']
	// ));

	$('#pageCalendar').datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		inline: true,
		nextText: '>',
		prevText: '<',
		// showOn: "button",
		// showButtonPanel: true,
		// buttonText: "t",

		beforeShow: addElements,

		onSelect: function (dateString, item) {
			var dateStringArr = dateString.split('.');
			var dateFormat = dateStringArr[1]+'/'+dateStringArr[0]+'/'+dateStringArr[2];

			var curDate = new Date(dateFormat);

			var locationPathname = document.location.pathname;
			for (var i = 0; i < eventsDates.length; i++)  {
				var event = eventsDates[i];
				var dayDate = event.date;

				if (curDate.getTime() === dayDate.getTime()) {
					if (event.link !== undefined && event.link !== null) {
						if (locationPathname === event.link) {
							scrollTo(event.generalItem);
							return false
						} else {
							window.location.href = event.link+event.generalItem;
							return false
						}


					}

				} else {
					// window.location.href = event.link+event.generalItem;
				}
			}
			item.inline = false;
		},

		beforeShowDay: function (date, item) {
			var dateTime = date.getTime();
			for (var i = 0; i < eventsDates.length; i++)  {
				var dateItem = eventsDates[i];
				var dateArrTime = dateItem.date.getTime();
				if (dateTime === dateArrTime) {
					return [true, 'card-calendar__event', dateItem.tooltip];
				}
			}
			return [true, '', ''];
		},
		onChangeMonthYear: function (year, month, item){
			var t = this
			setTimeout(function (){
				addElements($(t));
			}, 110);
			addPreloader(this);
		}

	}).on('click', function (){
		addControlBtn($(this));
	});


	$('#widgetCalendar').datepicker({
		showOtherMonths: false,
		selectOtherMonths: true,
		changeMonth: false,
		showWeek: true,
		nextText: '>',
		prevText: '<',

		beforeShow: function ($calendar){
			addCustomElementsInWidget($calendar);
		},

		onChangeMonthYear: function (year, month, item){
			var t = this
			setTimeout(function (){
				addCustomElementsInWidget($(t));
			}, 110);
			addPreloader(this);
		},
		onSelect: function (dateString, item) {
			var options = {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			};

			var dateStringArr = dateString.split('.');
			var dateFormat = dateStringArr[1]+'/'+dateStringArr[0]+'/'+dateStringArr[2];

			var curDate = new Date(dateFormat);

			for (var i = 0; i < eventsDates.length; i++)  {
				var event = eventsDates[i];
				var dayDate = event.date;

				if (curDate.getTime() === dayDate.getTime()) {
					if (event.link !== undefined && event.link !== null) {
						// document.location.href = event.link;
						showWidgetCalendarEvent(event.eventItem, this)
					}

				}
			}

			item.inline = false;
		},
		beforeShowDay: function (date, item) {
			var dateTime = date.getTime();
			for (var i = 0; i < eventsDates.length; i++)  {
				var dateItem = eventsDates[i];
				var dateArrTime = dateItem.date.getTime();
				if (dateTime === dateArrTime) {
					return [true, 'ui-state-active', ''];
				}
			}
			return [true, '', ''];
		},

	});

	function showWidgetCalendarEvent($itemEvent, $element){
		var dayCurrent = $(this),
			eventElements = $($itemEvent),
			eventElementArr = eventElements.find('.event'),
			element = $($element),
			subtitle = element.find('.widget-subtitle span'),
			calendar = element.find('.ui-datepicker-calendar'),
			eventElementControl = element.parent().find('.event-control');


		element.addClass('show-event');
		eventElements.addClass('active');
		eventElementArr.hide();
		// скрываем календарь
		calendar.animate({
				opacity: 'hide'},
			150, function() {
				eventElements.animate({opacity: 'show'}, 150);
				eventElementControl.animate({opacity: 'show'}, 150);
			});

		// показываем события выбраной даты
		$(eventElementArr[0]).show().addClass('current');
		for (var i = 0; i < eventElementArr.length; i++) {
			$(eventElementArr[i]).attr('data-count', i);
		}

		// если событий больше 1 то делаем их ввиде слайдера
		if (eventElementArr.length > 1) {

			subtitle.after('<div class="event-nav">'+
				'<button class="prev">&lt;&nbsp;</button>'+
				'<span class="count">'+1+'&nbsp;из&nbsp;'+eventElementArr.length+'</span>'+
				'<button class="next">&nbsp;&gt;</button>'+
				'</div>');
		}
		var eventNav = element.find('.event-nav'),
			prev = $(eventNav).find('.prev'),
			next = $(eventNav).find('.next'),
			count = $(eventNav).find('.count');

		prev.click(function() {
			var current = eventElements.find('.event.current');
			setTimerTimeOut = 5000;
			if ($(current).data('count') == 0) {
				count.text(eventElementArr.length + ' из ' + eventElementArr.length);
				$(current).fadeOut('150', function() {
					$(eventElementArr[eventElementArr.length - 1]).fadeIn('150').addClass('current');
				}).removeClass('current');
			} else {
				count.text($(current).data('count') + ' из ' + eventElementArr.length)
				$(current).fadeOut('150', function() {
					$(eventElementArr[$(current).data('count') - 1]).fadeIn('150').addClass('current');
				}).removeClass('current');
			}
		});

		next.click(function() {
			var current = eventElements.find('.event.current');
			setTimerTimeOut = 5000;
			if ($(current).data('count') == eventElementArr.length - 1) {
				count.text('1' + ' из '+eventElementArr.length)
				$(current).fadeOut('150', function() {
					$(eventElementArr[0]).fadeIn('150').addClass('current');
				}).removeClass('current');
			} else {
				count.text($(current).data('count')+2 +' из '+eventElementArr.length)
				$(current).fadeOut('150', function() {
					$(eventElementArr[$(current).data('count') + 1]).fadeIn('150').addClass('current');
				}).removeClass('current');
			}
		});

		// нажимаем на кнопку скрыть
		eventElementControl.click(function(event) {
			element.removeClass('show-event');
			// clearTimeout(setTimer);
			element.find('.event-nav').detach();
			eventElements.animate({opacity: 'hide'}, 150);
			eventElementControl.animate({opacity: 'hide'}, 150, function () {
				calendar.animate({opacity: 'show'}, 150);
				eventElementArr.hide()
			});

		});
	}
	function addCustomElementsInWidget($item){
		addControlBtn($item);
		addHeader($item, false);
		addPreloader($item)
	}

	function addCustomToday($calendar){
		var today = $($calendar).find('.ui-datepicker-today');

		$(today).append('<span class="card-calendar__caption">Сегодня</span>');
	}
	function addDataTooltip($calendar){
		var cells = $($calendar).find('.ui-datepicker-calendar td');
		$(cells).attr('data-placement', 'right');
		$(cells).attr('data-toggle', 'tooltip');
		$(cells).attr('data-html', 'true');

		setTimeout(function (){
			$(cells).tooltip();
		}, 110);
	}

	function addHeader($calendar, $title){
		if ($title === undefined) {
			var title = true;
		}
		var header = $($calendar).find('.ui-datepicker-header');
		var year = $(header).find('.ui-datepicker-year').text();
		var month = $(header).find('.ui-datepicker-month').text();
		var headerUiBtns = $(header).find('.ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-title');
		var todayDate = new Date();
		var optionsDay = {day: '2-digit'};
		var todayDateDay = todayDate.toLocaleString("ru", optionsDay).slice(0, 2);
		var monthA = ["Января","Февраля","Марта","Апреля","Мая","Июня",
			"Июля","Августа","Сентября","Октября","Ноября","Декабря" ];
		var todayYear = todayDate.getFullYear();
		var todayDateMonth = monthA[todayDate.getMonth()];
		var uiTitle = $(header).find('.ui-datepicker-title');

		// $(uiTitle).append('<span class="ui-datepicker-current">Сегодня: ' + todayDateDay + ' ' + todayDateMonth+'</span>');

		if (title) {

			$(headerUiBtns).wrapAll('<div class="content-subtitle content-subtitle_right"><h3></h3></div>');
			$(header).addClass('content-title');
			$(uiTitle).append('<span class="ui-datepicker-current">Сегодня: ' + todayDateDay + ' ' + todayDateMonth+'</span>');
			$(header).append('<div class="content-subtitle margin-0">\n' +
				'                 <h2>'+month+',<span> '+year+'</span></h2>\n' +
				'               </div>');
		} else {
			$(headerUiBtns).wrapAll('<div class="widget-subtitle"></div>');
			$(uiTitle).append('<span class="ui-datepicker-current">Сегодня ' + todayDateDay + ' ' + todayDateMonth+''+' '+todayYear+'</span>');
		}
	}

	function addControlBtn($calendar){
		var header = $($calendar).find('.ui-datepicker-header');
		var prev = $(header).find('.ui-datepicker-prev');
		var next = $(header).find('.ui-datepicker-next');
		$(prev).text($(prev).attr('title')).removeAttr('title');
		$(next).text($(next).attr('title')).removeAttr('title');

	}

	function addCustomElement ($calendar, $inst) {
		$('table.ui-datepicker-calendar tbody td').each(function(){
			var calendarText = $(this).attr('title');
			if (calendarText !== undefined) {
				var word = decOfNum($(calendarText).length, ['событие', 'события', 'событий']);
				$(this).append('<span class="card-calendar__caption">'+$(calendarText).length+' '+word+'</span>');
			}
		});
	}
	function addPreloader(item, timeout){
		var time;
		if (timeout === undefined) {
			time = 400
		} else {
			time = timeout;
		}
		$(item).append('<div class="preloader" style="position: absolute"><div class="page-loader-circle"></div></div>');
		$(item).css('position', 'relative');
		setTimeout(function () {
			$('.preloader').fadeOut('300', function (){
				// $(item).css('position', '');
				$(this).remove();
			});

		}, time)
	}
	function decOfNum(number, titles) {
		var decCache = [],
				decCases = [2, 0, 1, 1, 1, 2];
		if(!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
		return titles[decCache[number]];
	}

	function addElements($calendar) {
		addCustomToday($calendar);
		addDataTooltip($calendar);
		addControlBtn($calendar);
		addHeader($calendar);
		addCustomElement();
		addPreloader($calendar);

	}

	/* СОКРАЩАЕМ ТЕКСТ ------------------------------------------------------------------------------ */
	// $('.card__title').dotdotdot();
	// $('.text-ddd').dotdotdot();
	// $('.text-ddd-210').dotdotdot({
	// 	keep: '.card__more',
	// 	tolerance: 10,
	// 	height: 210,
	// 	callback: function () {
	// 		if ($(this).hasClass('ddd-truncated')) {
	// 			$(this).find('.card__more').css('display', 'table');
	// 			$(this).dotdotdot({tolerance: 0})
	// 		}
	// 	}
	// });
	//
	// $('.text-ddd-260').dotdotdot({
	// 	keep: '.card__more',
	// 	// tolerance: 10,
	// 	height: 260,
	// 	callback: function () {
	// 		if ($(this).hasClass('ddd-truncated')) {
	// 			$(this).find('.card__more').css('display', 'table');
	// 			// $(this).dotdotdot({tolerance: 0})
	// 		}
	// 	}
	// });
	//
	// $('.text-ddd-135').dotdotdot({
	// 	keep: '.card__more',
	// 	tolerance: 10,
	// 	// height: 135,
	// 	callback: function () {
	// 		if ($(this).hasClass('ddd-truncated')) {
	// 			$(this).find('.card__more').css('display', 'table');
	// 			$(this).dotdotdot({tolerance: 0})
	// 		}
	// 	}
	// });
	//
	// $(window).resize(function (){
	// 	setTimeout(function (){
	// 		$('.ddd-truncated').dotdotdot();
	// 		$('.card__title').dotdotdot();
	// 		$('.text-ddd').dotdotdot();
	//
	// 		$('.text-ddd-135').dotdotdot({
	// 			keep: '.card__more',
	// 			tolerance: 10,
	// 			// height: 135,
	// 			callback: function () {
	// 				if ($(this).hasClass('ddd-truncated')) {
	// 					$(this).find('.card__more').css('display', 'table');
	// 					$(this).dotdotdot({tolerance: 0})
	// 				}
	// 			}
	// 		});
	// 	}, 1000)
	//
	// });

	/* TOOLTIPS ------------------------------------------------------------------------------------ */
	$('.calendar__day').tooltip();
	$('.card-calendar td').tooltip();
	$('.sliderBlog').slick();

	/* СЛАЙДЕРЫ sliders ------------------------------------------------------------------------------*/
	$('.widget-slider').slick({
		autoplay: true,
		prevArrow: '<div class="slider-arrow slider-arrow__left \
								widget-slider-arrow widget-slider-arrow__left"></div>',
		nextArrow: '<div class="slider-arrow slider-arrow__right \
								widget-slider-arrow widget-slider-arrow__right"></div>',
	});

	$('.card-full-slider-wrap').on('init reInit afterChange', 
		function(event, slick, currentSlide, nextSlide){
			var status = $(this).find('.card-slider-number span'),
					slide = $(this).find('.card__imgbox');
			slide.attr('data-current-slide', currentSlide);
			//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
			var i = (currentSlide ? currentSlide : 0) + 1;
			status.text(i + ' / ' + slick.slideCount);
			
	});

	$('.card-modern-slider-wrap').on('init reInit afterChange',
		function(event, slick, currentSlide, nextSlide){
			var status = $(this).find('.card-slider-number_modern span'),
					slide = $(this).find('.card__imgbox');
			slide.attr('data-current-slide', currentSlide);
			//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
			var i = slick.currentSlide;
			var slidesLength = slick.slideCount;
			var numberSlide1 = i + 1 <= slidesLength ? i + 1 : i - (slidesLength - 1);
			var numberSlide2 = i + 2 <= slidesLength ? i + 2 : i - (slidesLength - 2);
			var numberSlide3 = i + 3 <= slidesLength ? i + 3 : i - (slidesLength - 3);
			var numberSlide4 = i + 4 <= slidesLength ? i + 4 : i - (slidesLength - 4);

			status.html('<strong>'+numberSlide1+'</strong>' + ' ' +
				numberSlide2 + ' ' +
				numberSlide3 + ' ' +
				numberSlide4 + '...');
	});

	$('.card-full-slider-wrap').slick({
		// onInit: function() {
		// 	$('.card-slider-number span').text(i + '/' + slick.slideCount);
		// },
		prevArrow: '<div class="slider-arrow slider-arrow__left"></div>',
		nextArrow: '<div class="slider-arrow slider-arrow__right"></div>',
	});


	$('.card-half-slider-wrap').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		prevArrow: '<div class="slider-arrow slider-arrow__left"></div>',
		nextArrow: '<div class="slider-arrow slider-arrow__right"></div>',
		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});

	$('.card-third-slider-wrap').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow: '<div class="slider-arrow slider-arrow__left"></div>',
		nextArrow: '<div class="slider-arrow slider-arrow__right"></div>',
		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});

	$('.card-fifth-slider-wrap').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		prevArrow: '<div class="slider-arrow slider-arrow__left"></div>',
		nextArrow: '<div class="slider-arrow slider-arrow__right"></div>',
		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
				}
			}
		]
	});

	// $('.card-modern-slider-wrap').slick({
	// 	prevArrow: '<div class="slider-arrow slider-arrow__left"></div>',
	// 	nextArrow: '<div class="slider-arrow slider-arrow__right"></div>'
	// });


	/* Show long comment ----------------------------------------------------------------------------- */
	
	var commentBox = $('.comment-box'),
			commentHasComment = $('.comment:has(.comment)'),
			commentButtons = $(commentHasComment).find('.comment__link'),
			commentButtonsMore = $(commentHasComment).find('.comment__link.more'),
			commentButtonsLess = $(commentHasComment).find('.comment__link.less');

	$(commentHasComment).each(function ($key, $item){
		$($item).find('.comment__link.more').first().removeClass('hide')
	});

	$(commentHasComment).on('click', function (e){
		var elTarget = e.target,
				commentButton = $(elTarget).parent('.comment__link'),
				commentButtonBox = $(commentButton).parent('.comment__links'),
				commentButtonLess = $(commentButtonBox).find('.comment__link.less'),
				commentButtonMore = $(commentButtonBox).find('.comment__link.more'),
				commentButtonTarget = $($(commentButton).data('target'));
		$(commentButtonTarget).on('show.bs.collapse', function (e){
			e.stopPropagation();
			$(commentButtonMore).fadeOut(150, function (){
				$(this).addClass('hide');
				$(commentButtonLess).fadeIn(150, function (){
					$(this).removeClass('hide');
				})
			})
		});

		$(commentButtonTarget).on('hide.bs.collapse', function (e){
			e.stopPropagation();
			$(commentButtonLess).fadeOut(150, function (){
				$(this).addClass('hide');
				$(commentButtonMore).fadeIn(150, function (){
					$(this).removeClass('hide');
				})
			})
		});
	});

	for (var i = 0; i < commentBox.length; i++) {
		var	text = $(commentBox[i]).find('.comment__text > *'),
				textBlock = $(commentBox[i]).find('.comment__text'),
				textHeight = 0;
		for (var x = 0; x < text.length; x++) {
			textHeight = textHeight + $(text[x]).actual('outerHeight')
		};
		
		if (textHeight > 180) {
			$(commentBox[i]).append(
				'<button class="comment-long__showbtn">\
						<span>Развернуть</span>\
						<i class="icon-arrow-down"></i>\
					</button>\
			')
		}
	}
	// var commentText = $('.comment__text');
	// // var commentTextHeight = $('.comment__text').actual('outerHeight');
	// $(commentText).each(function ($key, $item){
	// 	var commentTextHeight = $($item).actual('outerHeight',{includeMargin : true});
	// });

	// if ($('.comment__text'))
	var elControlDeafultText;


	$(document).on('click', '.comment-long__showbtn', function(event) {
		var el = $(this),
				elParent = el.parents('.comment-box'),
				text = $(elParent).find('.comment__text > *'),
				textBlock = $(elParent).find('.comment__text'),
				textHeight = 0;

		for (var i = 0; i < text.length; i++) {
			textHeight = textHeight + $(text[i]).actual('outerHeight',{ includeMargin : true })
		}
		el.hide();
		textBlock.css('height', textBlock.actual('outerHeight'))
		.css('max-height', 'none')
		.animate({
			height: textHeight
		}, 400)
	});

	/* Ответить на комментарий ----------------------------------------------------------------------- */
	
	var elDeafultText,
			formDuplicateShow = false;


	$(document).on('click', '.comment__reply', function(event) {
		var commentFormbox = $('#commentFormbox').clone(),
				commentFormboxAppend,
				commentFormboxOrigin = $('.comment-form-inn'),

				elControl = $(this),				
				elParent = elControl.closest('.comment'),
				elParentID = elParent.attr('id'),

				formActive = elControl.hasClass('form-active');

		event.stopImmediatePropagation()
		commentFormboxAppend = commentFormboxCreate(elControl, commentFormbox);

		if (!elControl.hasClass('form-active')) {
			elControlDeafultText = elControl.text();
		}

		// проверяем где юзер отвечает на коммент
		if (formDuplicateShow && $('.modal-main').hasClass('show')) {
			$('.form-duplicate').collapse('hide');
		}

		$('.form-duplicate').on('hidden.bs.collapse', function() {
			$('.comment__reply').text(elControlDeafultText);
			$('.comment__reply').removeClass('form-active');
			$('.comment__reply').removeAttr('data-target');
			$('.comment').removeClass('show-form');
			$(this).collapse('dispose');
			formDuplicateShow = false;
			$(this).remove();
		});

		// $('.comment').on('hide.bs.collapse', function (e){
		// 	$('.comment__reply').text(elControlDeafultText);
		// 	$('.comment__reply').removeClass('form-active');
		// 	$('.comment__reply').removeAttr('data-target');
		// 	$('.comment').removeClass('show-form');
		// 	$(this).collapse('dispose');
		// 	formDuplicateShow = false;
		// 	$(this).remove();
		// });

		$(commentFormboxAppend).on('shown.bs.collapse', function(event) {
			elControl.addClass('form-active');
			elControl.text('Отменить');
			$(this).collapse('dispose');
			$(this).find('textarea').focus();
			formDuplicateShow = true;
		});

		
		$(commentFormboxAppend).on('show.bs.collapse', function(event) {
			commentFormboxOrigin.collapse('hide');
		});

		
		if (!elControl.hasClass('form-active')) {

			commentFormboxShow(elControl, commentFormboxAppend).collapse('show');
			commentFormboxOrigin.collapse('hide');
			
		} else {
			$('.form-duplicate').collapse('hide');
			commentFormboxOrigin.collapse('show');
		}

		event.preventDefault();

		function commentFormboxShow(elControl, addElement) {
			var eventParent = elControl.closest('.comment');

			eventParent.addClass('show-form');
			eventParent.find('.comment-box:first').after($(addElement));

			elControl.attr('data-target', '#'+$(addElement).attr('id'));
			
			return $(addElement);			
		}
		function commentFormboxCreate(event, elClone) {
			var eventParent = $($(event).parents('.comment-box'))
					eventParentID = elParent.attr('id'),
					eventParentTitle = eventParent.find('.comment__nickname:first').text(),
					
					elementID = $(elClone).attr('id'),
					elementNew = $(elClone);

			$(elClone).removeClass('comment-form-inn show');
			$(elClone).attr('id', elementID+'_'+eventParentID);
			$(elClone).attr('data-parent', '#allComentators');
			$(elClone).addClass('form-duplicate collapse');
			$(elClone).find('form.comment-form').addClass('comment-form-reply');
			$(elClone).find('textarea.comment-form__textarea').val(eventParentTitle+', ');
			return elementNew;
		}
	});




	/* modals -------------------------------------------------------------------------------- */

	// header fix bug
	$($('[data-toggle="modal"]').data('target')).on('show.bs.modal', function (){
		if ($(header).hasClass('fixed')){
			$(header).css({
				paddingRight: scrollbarWidth,
			})
		}
	});

	$('.modal').on('show.bs.modal', function(event) {
		var position = $(document).scrollTop();
		if (position > 0)  {
			$(header).css('padding-right', scrollbarWidth);
		}
	});
	$('.modal').on('hidden.bs.modal', function(event) {
		$(header).css('padding-right', '');
	});

	$('#modalImgBox').on('show.bs.modal', function(event) {
		var modal 				= $(this),
				modalContent  = modal.find('.modal-main__content'),

				elControl 		= $(event.relatedTarget),
				elAdd,

				targetContent = $(elControl.data('target-content')).clone();
		modalContent.html(targetContent);
	});

	$('#modalVideo').on('show.bs.modal', function(event) {
		var modal = $(this),
				modalContent = modal.find('.modal-video iframe'),
				elControl = $(event.relatedTarget),
				src = $(elControl).data('target-content');

		$(modalContent).attr('src', src);
		addPreloader($(modalContent).parent(), 600);
	});

	$('#modalVideo').on('hidden.bs.modal', function(event) {
		var modal = $(this),
			modalContent = modal.find('.modal-video iframe');

		$(modalContent).attr('src', 'http://');
	});



	$('.modal-main-slider-wrap').on('init reInit afterChange',
		function(event, slick, currentSlide, nextSlide){
			// нумерация слайдов в модалке
			var status = $('.slider-number'),
					slide = $(this).find('.card__imgbox'),
					i = (currentSlide ? currentSlide : 0) + 1,
					currentLink = '<span class="card-number-elem">'+'#'+i+'</span>',
					statusInner = currentLink + ' из ' + slick.slideCount;

			status.html(statusInner);			
	});

	$('#modalContentSlider').on('show.bs.modal', function(event) {
		var modal 				= $(this),
				modalContent  = modal.find('.modal-main__content'),

				elControl 		= $(event.relatedTarget),
				elAdd,

				targetContent             = $(elControl.data('target-content')).clone(),
				targetContentSliderTitle  = targetContent.find('.post-info').clone(),
				// targetComments            = targetContent.find('.comments-dark').clone(),

				sliderModal 		= modal.find('.modal-main-slider-wrap'),
				sliderTitle 		= modal.find('.modal-main-slider-title'),
				sliderComments 	= modal.find('.modal-main-comments');

		event.stopImmediatePropagation();
		// modal.addClass('modal-main-preload');
		elAdd = getElement(targetContent);

		sliderModal.html(elAdd); // вставляем слайдер

		sliderTitle.html(targetContentSliderTitle); // вставляем заголовок слайдера

		// sliderComments.html(targetComments); // вставляем блок комментариев
		addPreloader(modalContent);

		function getElement(el) {
			var element = $(el),
					elements;
			element.find('.slick-cloned').remove();
			elements = $(element.find('.card-image'))
				.wrap('<div class="modal-main-slider__imgbox"></div>')
				.parent()
				.wrap('<div class="modal-main-slider__item"></div>')
				.parent();
			return elements;
		}
	});

	$('#modalContentSlider').on('shown.bs.modal', function(event) {
		var modal 				= $(this),
				modalContent  = modal.find('.modal-main__content'),
				body = $('body'),

				elControl 		= $(event.relatedTarget),
				elControlCurrent = elControl.data('current-slide'),
				elAdd,

				targetContent = $(elControl.data('target-content')).clone(),

				sliderModal 	= modal.find('.modal-main-slider-wrap');

		$(body).addClass('modal-main-contents-open');
		modal.css('padding-right', '');

		// $('.comment').collapse();

		$('#modalMainSliderTop').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			initialSlide: elControlCurrent,
			asNavFor: '#modalMainSliderBottom',
			prevArrow: '<div class="slider-arrow \
															slider-arrow__left \
															modal-main-slider-arrow \
															modal-main-slider-arrow__left"></div>',
			nextArrow: '<div class="slider-arrow \
															slider-arrow__right \
															modal-main-slider-arrow \
															modal-main-slider-arrow__right"></div>',
		});

		$('#modalMainSliderBottom').slick({
			slidesToShow: 7,
			slidesToScroll: 1,
			initialSlide: elControlCurrent,
			focusOnSelect: true,
			// focusOnChange: true,
			// centerMode: true,
			centerPadding: '0px',
			// waitForAnimate: false,
			infinite: false,
			asNavFor: '#modalMainSliderTop',
			prevArrow: '<div class="slider-arrow \
															slider-arrow__left \
															modal-main-slider-arrow \
															modal-main-slider-arrow__left"></div>',
			nextArrow: '<div class="slider-arrow \
															slider-arrow__right \
															modal-main-slider-arrow \
															modal-main-slider-arrow__right"></div>',
		});

		// setTimeout(function () {
		// 	$('.preloader').fadeOut('300');
		// 	modal.removeClass('modal-main-preload');
		// }, 800)

	});

	$('#modalMainSliderBottom').on('click', '.slick-slide', function(event) {
		var eventSlide = $('#modalMainSliderBottom').slick('slickCurrentSlide');
		$('#modalMainSliderTop').slick('slickGoTo', eventSlide);
	});	

	$('#modalContentSlider').on('hidden.bs.modal', function(event) {
		var modal 				= $(this),
				modalContent  = modal.find('.modal-main__content'),

				elControl 		= $(event.relatedTarget),
				elAdd,

				sliderModal 	= modal.find('.modal-main-slider-wrap'),
				targetContent = $(elControl.data('target-content')).clone();

		modal.modal('dispose');
		$(sliderModal).slick('unslick');
		$('.preloader').stop().show();
	});

	$(document).on('click', '.card-number-elem', function(event) {
			var elEvent = $(this),

					textArea = $('#modalContentSlider').find('.comment-form__textarea:visible'),
					textAreaPositionTop = textArea.position().top;

					modalDialog = $('#modalContentSlider').find('.modal-dialog');

			// $('.form-duplicate').collapse('hide');
			$('#modalContentSlider')
				.animate({
					scrollTop: textAreaPositionTop,
				}, 800, function(){
					textArea.focus();
				});
			textArea.val(textArea.val() + elEvent.text()+' ');
			
		});

	$(document).on('click', '.modal-main-comments__curentImg', function(event) {
		var element = $(this);
		$('#modalContentSlider')
			.animate({
				scrollTop: 0,
			}, 800, function(){
				$('#modalMainSliderTop').slick('slickGoTo', parseInt(element.attr('href') - 1));
			});

		event.preventDefault();
	});

	/* Main icons ------------------------------------------------------------------------------------- */
	var iconDefault;
	$('.main-icon').on('click keyup', function (event){
		var elClick = event.target,
				el = this,

				block = $($(elClick).parents('.main-icon__card')),
				blocks = ('.main-icon__card'),
				blocksNotEdits = ('.main-icon__card:not(.edits)'),
				blockImages = $(el).find('.main-icon__images'),
				blockImagesItems = $(el).find('[data-icon-item]'),

				title = $(block).find('.main-icon__title'),

				inputCurrent = $(block).find('.main-icon__input.current'),
				inputs = $(block).find('.main-icon__input'),
				inputsBlock = $(block).find('.main-icon__inputs'),

				images = $(el).find('.main-icon__img'),

				currentBlock = $(el).find('.card-links.edits'),
				currentIconBox = $(el).find('.main-icon__imgbox:has(.main-icon__img.active)'),

				buttonRemove = $(block).find('[data-remove].main-icon__button'),
				buttonIcon = $(block).find('[data-icon].main-icon__img'),
				buttonSave = $(block).find('[data-save].main-icon__button'),
				buttonCancel = $(block).find('[data-cancel].main-icon__button'),
				buttonEdit = $(block).find('[data-edit].main-icon__button'),
				buttonAddPrimary = $(el).find('.main-icon__button_primary'),
				buttonGroup = $(el).find('.main-icon__buttons'),
				buttonAdd = $(el).find('[data-add].main-icon__button_primary');

		// edit
		if ($(elClick).hasAttr('data-edit') && !$(blocks).hasClass('edits')) {
			iconDefault = buttonIcon;
			$(title).fadeOut(200, function (){
				$(this).addClass('hide');
				$(inputsBlock).removeClass('hide').fadeIn(200);
				$(inputCurrent).val($(title).text()).focus();
			});

			editsBlock();
			$(buttonIcon).addClass('active');

			toggleElement(buttonEdit, buttonSave);
			toggleElement(buttonRemove, buttonCancel);


		}

		// edit icon
		if ($(elClick).hasAttr('data-icon-item') && $(blockImages).hasClass('active')) {
			var icon = $(elClick).clone().addClass('active').removeAttr('data-icon-item');
			$(currentIconBox).html(icon);

			$(blockImagesItems).map(function (key, val){
				if (val !== elClick) {
					$(val).removeClass('active')
				} else {
					$(elClick).addClass('active');
				}
			});

		}

		// save keypress"Enter"
		$(inputs).keyup(function(e){
			if(e.keyCode == 13) {
				$(buttonSave).trigger('click');
			}
		});

		// save
		if ($(elClick).hasAttr('data-save')) {
			$(inputsBlock).fadeOut(200, function (){
				$(this).addClass('hide');
				$(title).text($(inputCurrent).val());
				$(title).removeClass('hide').fadeIn(200);
				$(blockImages).removeClass('active');
			});

			toggleElement(buttonSave, buttonEdit);
			toggleElement(buttonCancel, buttonRemove);



			$(blocks).removeClass('disabled');
			$(block).removeClass('edits');
			$(block).removeClass('adds');
			$(images).removeClass('active');
			$('.'+$(buttonIcon).data('icon')).removeClass('active');
			$(buttonAddPrimary).prop('disabled', false);
		}

		//	remove
		if ($(elClick).hasAttr('data-remove') && !$(blocks).hasClass('edits')) {
			$(block).hide('blind', function (){
				$(this).detach()
			});
		}

		// cancel
		if ($(elClick).hasAttr('data-cancel')) {
			$(iconDefault).removeClass('active');
			$(currentIconBox).html(iconDefault);
			if ($(block).hasClass('adds')) {
				$(block).hide('blind', function (){
					$(this).detach()
				});
			} else {
				$(inputsBlock).fadeOut(200, function (){
					$(this).addClass('hide');
					$(inputCurrent).val($(title).text());
					$(title).removeClass('hide').fadeIn(200);
					$(blockImages).removeClass('active');
				});
				toggleElement(buttonSave, buttonEdit);
				toggleElement(buttonCancel, buttonRemove);

			}

			$(blocks).removeClass('disabled');
			$(block).removeClass('edits');

			$('.'+$(buttonIcon).data('icon')).removeClass('active');

			$(images).removeClass('active');
			$(buttonAddPrimary).prop('disabled', false);

		}

		// add
		if ($(elClick).hasAttr('data-add') && !$(elClick).hasAttr('disabled')) {
			$(buttonAdd).prop('disabled', true);
			editsBlock();
			$(blockImages).find('.icon-symbol').addClass('active');
			var nID = $(blocks).length + 1;
			var btnGroup = $(buttonGroup).before('<div class="card card-links main-icon__card margin-bottom-0 padding-bottom-lg-30 padding-bottom-sm-10 edits adds">\n' +
				'          <div class="card-links-wrap">\n' +
				'            <div class="card-links__img">\n' +
				'              <div class="card-links__imgbox main-icon__imgbox"><i class="main-icon__img icon-57 active" data-icon="icon-57"></i></div>\n' +
				'            </div>\n' +
				'            <div class="card-links__items main-icon__items">\n' +
				'              <div class="card-links__item card-links__lnkbox card-links__head main-icon__item">\n' +
				'                <div class="card-links__left">\n' +
				'                  <button class="card-links__lnk main-icon__title hide" type="button" data-edit="true" style=""></button>\n' +
				'                  <div class="main-icon__inputs">\n' +
				'                    <label class="form-label margin-bottom-5 font-size-14" for="mainIconInputTitle-${nID}">Название</label>\n' +
				'                    <input class="form__input main-icon__input margin-bottom-15 current" id="mainIconInputTitle-${nID}" name="title" maxlength="24" placeholder="Название системы">\n' +
				'                    <label class="form-label margin-bottom-5 font-size-14" for="mainIconInputLink-${nID}">Ссылка</label>\n' +
				'                    <input class="form__input main-icon__input margin-bottom-5" id="mainIconInputLink-${nID}" name="title" placeholder="Введите ссылку">\n' +
				'                  </div>\n' +
				'                </div>\n' +
				'                <div class="card-links__right">\n' +
				'                  <button class="card-links__lnk card-links__lnk_small link-special color-thin main-icon__button hide" type="button" data-edit="">Редактировать</button>\n' +
				'                  <button class="card-links__lnk card-links__lnk_small link-special color-thin main-icon__button hide" type="button" data-remove="">Удалить</button>\n' +
				'                  <button class="card-links__lnk card-links__lnk_small link-special color-thin main-icon__button" type="button" data-save="">Сохранить</button>\n' +
				'                  <button class="card-links__lnk card-links__lnk_small link-special color-thin main-icon__button" type="button" data-cancel="">Отменить</button>\n' +
				'                </div>\n' +
				'              </div>\n' +
				'            </div>\n' +
				'          </div>\n' +
				'        </div>');
			var blockUppend = $(btnGroup).prev();
			$(blockUppend).find('.main-icon__input.current').val('Название системы').focus();

		}
		function editsBlock(){
			$(buttonAddPrimary).prop('disabled', true);
			$(block).addClass('edits');
			$(blocksNotEdits).addClass('disabled');
			$(blockImages).addClass('active');
			// $(buttonIcon).addClass('active');
			$(blockImages).find($('.'+$(buttonIcon).data('icon'))).addClass('active');
		}
		function toggleElement($elementHide, $elementShow){
			$($elementHide).fadeOut(200, function (){
				$(this).addClass('hide');

				$($elementShow).fadeIn(200, function (){
					$(this).removeClass('hide');
				})
			});
		}
	});

	/* Forms ------------------------------------------------------------------------------------------ */
	var deafultTextBtn = $('#formMoreInputsControl').text();
	var formMoreInputs = $('#formMoreInputs');

	formMoreInputs.on('show.bs.collapse', function(event) {
		var elControl = $('#formMoreInputsControl'),
				elControlAltText = elControl.data('alt-text');

		elControl.text(elControlAltText);
		if (mobile) {
			$('.form-sender').animate({height: 'hide'},'400');
		} else {
			$('.form-sender').fadeOut('400');
		}

		$('.form__title_main').fadeOut('400');
		$('.form__title_alt').fadeIn('400', function (){
			$(this).css('position', 'static')
		});
		
	});

	formMoreInputs.on('hide.bs.collapse', function(event) {
		var elControl = $('#formMoreInputsControl');

		elControl.text(deafultTextBtn);
		if (mobile) {
			$('.form-sender').animate({height: 'show'},'400');
		} else {
			$('.form-sender').fadeIn('400');
		}

		$('.form__title_alt').fadeOut('400').css('position', '');
		$('.form__title_main').fadeIn('400');

	});

	$('#formCheckbox').on('change', function() {
		if (mobile)  {
			$('.form-slide-input').animate({height: 'toggle'}, '400')
		} else {
			$('.form-slide-input').toggle('slide');
		}

	});

	$('.article.collapse, .card.collapse').on('show.bs.collapse', function(event) {
		$(this).find('.card-full-slider-wrap').slick('unslick');
		// $(this).addClass('modal-main-preload');
		$('[data-target="#'+ $(this).attr('id') +'"]').addClass('active');
		
	});
	$('.article.collapse, .card.collapse').on('shown.bs.collapse', function(event) {
		var element = $(this);
		$(this).find('.card-full-slider-wrap').slick({
			prevArrow: '<div class="slider-arrow slider-arrow__left"></div>',
			nextArrow: '<div class="slider-arrow slider-arrow__right"></div>',
		});
		$('[data-target="#'+ $(this).attr('id') +'"]').addClass('active');
		// setTimeout(function () {
		// 	$('.preloader').fadeOut('300');
		// 	element.removeClass('modal-main-preload');
		// }, 800)
	});

	$('.article.collapse, .card.collapse').on('hide.bs.collapse', function(event) {
		$('[data-target="#'+ $(this).attr('id') +'"]').removeClass('active');
		
	});

	$.fn.hasAttr = function($attrName) {
		return this.attr($attrName) !== undefined;
	};

});

(function($){
	jQuery.fn.hideClickAway = function($bootstrapEvent){
		var el = $(this);
		var make = function (){
			if (!!$bootstrapEvent){
				$(document).mouseup(function (e){ // событие клика по веб-документу
					if (!el.is(e.target) // если клик был не по нашему блоку
						&& el.has(e.target).length === 0) { // не по его дочерним элементам
						switch ($bootstrapEvent){ // проверяем событие
							case 'collapse':
								el.collapse('hide');
								break;
							case 'tooltip':
								el.tooltip('hide');
								break;
							default:
								el.collapse('hide');
								return false;
						}
					}
				});
			} else {
				$(document).unbind('mouseup');
			}
		};

		return this.each(make)

		
	};
	jQuery.fn.scrollbarWidth = function() {
		var block = $('<div>').css({'height':'50px','width':'50px'}),
			indicator = $('<div>').css({'height':'200px'});

		$('body').append(block.append(indicator));
		var w1 = $('div', block).innerWidth();
		block.css('overflow-y', 'scroll');
		var w2 = $('div', block).innerWidth();
		$(block).remove();
		return (w1 - w2);
	};
})(jQuery);

