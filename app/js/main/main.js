$(document).ready(function() {
	var ie = $.browser.msie;
	var	edge = $.browser.edge;
	var safari = $.browser.safari;
	var scrollbarWidth = $(document).scrollbarWidth();
	var allElements = $('*');
	var windowWidth = $(this).outerWidth();
	var screenSM = windowWidth < 768;
	var screenMD = windowWidth < 992;
	var screenLG = windowWidth < 1230;

	$(window).resize(function (){
		screenSM = windowWidth < 768;
		screenMD = windowWidth < 992;
		screenLG = windowWidth < 1230;

		windowWidth = $(this).outerWidth();
		scrollbarWidth = $(document).scrollbarWidth();
	});


	/* Валидация ------------------------------------------------------------------------------------ */
	/**
	 * валидация формы заполнено ли поле
	 * https://jqueryvalidation.org/documentation/
	 */
	var options = {
				rules: {
					subject: {
								required: true,
								minlength: 2,
						},
					},
					errorPlacement: function(error, element){},

	};

	/**
	 * #form1 -> others.html
	 *
	 * */
	$("#form1").validate(options);

	// маска для телефона
	var tel = $('input[type="tel"]');

	$(tel).mask('9 (999) 999999?999');
	$(tel).on('change focus click', function() {
		$(this)[0].setSelectionRange(0, 0);
	});

	/**
	 * multiple select
	 * множественный выбор по клику
	 * stylegide.html
	 *
	 */

	$("select[multiple]").mousedown(function(e){
		e.preventDefault();

		var select = this;
		var scroll = select.scrollTop;

		e.target.selected = !e.target.selected;

		setTimeout(function(){select.scrollTop = scroll;}, 0);

		$(select).focus();
	}).mousemove(function(e){e.preventDefault()});


	// menu-burger ---------------------------------------------------------------------------------------------------
	var body = $('body');
	var header = $('.header');
	var content = $('.header + *');
	var aside = $('#aside');
	var menuNavHeaderGroup = $('#menu-nav-header-group');

	$(menuNavHeaderGroup).on('show.bs.collapse', function() {
		var menuNavHeader = $(this).parents('.menu-nav-header');

		$(menuNavHeader).addClass('show');
	});

	$(menuNavHeaderGroup).on('hidden.bs.collapse', function() {
		var menuNavHeader = $(this).parents('.menu-nav-header');

		if (!screenSM) $(menuNavHeader).removeClass('show');

	});

	// сворачиваем меню если развернуто
	var rollUp = $('.roll-up');

	$(rollUp).on('click', function() {
		$(document).trigger('scroll');
	});

	// fix bag bs.dropdown для элементов с position: fixed;
	var navMore = $('.nav-more');

	$(navMore).on('show.bs.dropdown', function() {
		$(header).css('transform', 'none');
	});

	$(navMore).on('hide.bs.dropdown', function() {
		$(header).css('transform', '');
	});


	/* ПОДМЕНЮ "СИСТЕМЫ" ----------------------------------------------------------------------------- */
	var headerNavSystem = $('#header-nav');
	var headerNavControl = $('#header-nav-control');
	var paddingTopContent = $(header).actual('outerHeight');
	var headerNavSystemDefault = true;

	if (ie) {
		setInterval(function (){
			if ($(document).scrollTop() <= 0) {
				paddingTopContent = $(header).actual('outerHeight');
			}
		}, 50)
	}

	$(window).bind('load', function (){
		paddingTopContent = $(header).actual('outerHeight');
	});

	// мобильные
	$(window).resize(function (){
		setTimeout(function (){
			if (screenSM) {
				$(headerNavSystem).hideClickAway('collapse');
				$(menuNavHeaderGroup).hideClickAway('collapse');
			} else {
				$(headerNavSystem).hideClickAway();
				$(menuNavHeaderGroup).hideClickAway();
			}
		},500)

	});

	if (screenSM) {
		$(headerNavSystem).collapse('hide');
		$(headerNavControl).removeClass('active');
		$(headerNavSystem).hideClickAway('collapse');
		$(menuNavHeaderGroup).hideClickAway('collapse');

		$(headerNavSystem).removeClass('mobile-hide show');
		// setTimeout(function (){
		// }, 300)
	} else {
		$(headerNavSystem).addClass('show');
		$(headerNavControl).addClass('active');
	}

	$(window).resize(function (){
		if (screenSM) {
			$(headerNavSystem).collapse('hide');
			$(headerNavSystem).removeClass('mobile-hide show');
		} else {
			$(headerNavSystem).collapse('show');
			$(headerNavSystem).addClass('mobile-hide show');
		}
	});



	// системы показываются
	$(headerNavSystem).on('shown.bs.collapse', function () {
		var btn = $(headerNavControl);
		btn.addClass('active')
	});

	// системы скрываются
	$(headerNavSystem).on('hidden.bs.collapse', function () {
		var btn = $(headerNavControl);
		btn.removeClass('active');
	});

	// сохранием отступы при скрытии разворачивании меню "Системы"
	// if (safari || edge) {
		$(headerNavSystem).on('show.bs.collapse', function (){
			var position = $(document).scrollTop();

			if (position <= 0 && !screenSM) {
				if (!$(headerNavSetting).hasClass('show')) {
					$(body).css({overflow: 'hidden', paddingRight: scrollbarWidth});
				}
				$(header).css({'position': 'static'});
				$(content).stop(true).css('padding-top', '');
			}
		});

		$(headerNavSystem).on('shown.bs.collapse', function (){
			var position = $(document).scrollTop();

			if (position <= 0  && !screenSM){
				if (!$(headerNavSetting).hasClass('show')) {
					$(body).css({overflow: '', paddingRight: ''});
				}
				positionContent = $(header).actual('outerHeight');
				$(header).css({'position': ''});
				$(content).stop(true).css('padding-top', positionContent);
			}

			if (position <= paddingTopContent) {
				paddingTopContent = $(header).actual('outerHeight');
				headerNavSystemDefault = $(headerNavSystem).hasClass('show');
			}
		});

		$(headerNavSystem).on('hide.bs.collapse', function (){
			var position = $(document).scrollTop();

			if (position <= 0  && !screenSM) {
				$(body).css({overflow: 'hidden', paddingRight: scrollbarWidth});
				$(header).css({'position': 'static'});
				$(content).stop(true).css('padding-top', '');
			}
		});

		$(headerNavSystem).on('hidden.bs.collapse', function (){
			var position = $(document).scrollTop();

			if (position <= 0  && !screenSM){
				$(body).css({overflow: '', paddingRight: ''});
				positionContent = $(header).actual('outerHeight');
				$(header).css({'position': ''});
				$(content).stop(true).css('padding-top', positionContent);
			}
			if (position <= paddingTopContent) {
				paddingTopContent = $(header).actual('outerHeight');
				headerNavSystemDefault = $(headerNavSystem).hasClass('show');
			}
		});
	// }

	// разворачиваем меню
	var btnDeploy = $('#btn-deploy');
	var menuLeftList = $('#menu-left-list');

	$(btnDeploy).click(function() {
		$(header)
			.removeClass('scroll')
			.addClass('deploy-show')
			.css({
			'position': 'fixed',
			'padding-bottom': '10px'
		});

		$(headerNavSystem).collapse('show');
		// $(menuLeftList).collapse('show');
		$(rollUp).addClass('show');
		return false;
	});

	// настройки показываются
	var headerNavSetting = $('#header-nav-setting');

	$(headerNavSetting).on('show.bs.collapse', function () {
		var headerHeight = $(header).actual('outerHeight');

		// инициализация drag & drop
		var dragAndDrop = $( "#drag-and-drop" );

		addPreloader(body, false, 'fixed');

		$(dragAndDrop).sortable();
		$(dragAndDrop).disableSelection();
		$(dragAndDrop).draggable();

		$(header).css('transform', 'none');

		$(this)
			.parent()
			.append('<div class="overlay"/>')
			.animate({opacity: 'show'}, 400);

		$('#header-nav-setting-control').css({
			position: 'relative',
			zIndex: '1000'
		}).addClass('active');

		// сохраняем отступы
		$(body).css({
			overflow: 'hidden',
			paddingRight: scrollbarWidth,
		});
		if ($(document).scrollTop() <= $(header).actual('outerHeight')) {
			$(body).css({
				marginTop: '-' + $(header).actual('outerHeight')+'px',
			});
		}

		// обертка для header
		$(header).wrap('<div class="extra-wrapper"></div>');

		if ($(header).hasClass('fixed')) {
			$(header).css({
				position: 'static'
			})
		}
		checkboxDisable($(this), 10)
	});

	$(headerNavSetting).on('shown.bs.collapse', function (){
		// сохраняем отступы после завершения анимации
		hidePreloader(body);

		// if ($(document).scrollTop() <= 0 && $(header).hasClass('fixed')) {
		// 	$(body).css({
		// 		overflow: 'hidden',
		// 		paddingRight: scrollbarWidth,
		// 		paddingTop: ''
		// 	});
		// }
		//
		// if ($(header).hasClass('fixed') && $(document).scrollTop() > 0) {
		// 	$(header).css({
		// 		paddingRight: '',
		// 	});
		// }
	});

	// закрытие настроек
	$(headerNavSetting).on('hide.bs.collapse', function () {
		addPreloader(body, false, 'fixed');
		$(header).css('transform', '');
		$('.overlay').animate({
			opacity: 0
		}, 400, function() {
			$(this).detach()
		});

		$(body).css({
			overflow: '',
			paddingRight: '',
			paddingTop: '',
			marginTop: ''
		});

		$(header).css({
			'padding-right': '',
			position: ''
		});
		$(header).unwrap();

		$('#header-nav-setting-control').removeClass('active').removeAttr('style');
	});
	$(headerNavSetting).on('hidden.bs.collapse', function () {
		hidePreloader(body);
	});

	var checkboxes = $('input[type="checkbox"].setting-form-checkbox__input');
	var settingForm = $('.setting-form');
	var defaultCheckboxChecked = checkboxDisable($(settingForm), 10);
	var navSettingWrap = $('.nav-setting-wrap');
	var defaultSettingBoxes = $(navSettingWrap).html();

	// сброс формы

	$(settingForm).on('click', 'button.form-setting-button:reset', function() {

		$(navSettingWrap).html(defaultSettingBoxes);
		checkboxDisable($(this), 10, defaultCheckboxChecked, 0);

	});

	// изменеие checkbox
	$(settingForm).on('change', checkboxes, function(event) {
		var checkbox   = $(event.target),
				checkboxID = checkbox.attr('id');

		if (checkbox.prop('checked')) {
			var el = $('[data-control='+checkboxID+']'),
					elParent = el.parent();

			el.appendTo(elParent).show('400');

		} else {
			$('[data-control='+checkboxID+']').hide('400');
		}

		checkboxDisable($(this), 10)

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
		}).done(function() {

			$('[data-nav-control='+buttons+']').removeClass('active');


		}).fail(function() {
			alert('Ошибка! Обратитесь к администратору.');
		});
		//отмена действия по умолчанию для кнопки submit
		e.preventDefault();
	});

	/**
	 * функция проверяет сколько чекбоксов отмечено
	 * если больше max делает все остальные не отмеченными
	 *
	 * @param {Object} form - елемент в котором ищем активные чекбоксы
	 * @param {number} max - максимальное количество input со значение checked
	 * @param {Object} [checkboxArrDefault=form.find(input[type="checkbox"]:checked)] - изначальное положение элементов
	 * @param {number} [speedArg=400] - скорость анимации
	 * @returns {Object} checkboxArrDefault возвращает изначальное положение элементов
	 */
	function checkboxDisable(form, max, checkboxArrDefault, speedArg) {
		var checkboxChecked,
				checkboxNotChecked,
				checkboxCheckedInch,
				speed = speedArg;

		if (speed === undefined) {
			speed = 400;
		}
		if (checkboxArrDefault === undefined) {
			checkboxChecked = form.find('input[type="checkbox"]:checked');
			checkboxNotChecked = form.find('input[type="checkbox"]:not(:checked)');

		} else {
			checkboxChecked = checkboxArrDefault['defaultCheckboxChecked'];
			checkboxNotChecked = checkboxArrDefault['defaultCheckboxNotCheckedInch'];
		}

		checkboxArrDefault = {
			defaultCheckboxChecked: form.find('input[type="checkbox"]:checked'),
			defaultCheckboxNotCheckedInch: form.find('input[type="checkbox"]:not(:checked)'),
		};

		checkboxCheckedInch = checkboxChecked.length;

		var checkboxNotCheckedArrID = checkboxNotChecked.map(function(index, element){
			return $(element).attr("id");
		});

		var checkboxCheckedArrID = checkboxChecked.map(function(index, element){
			return $(element).attr("id");
		});

		if (checkboxCheckedInch >= max) {
			// если болшье max выключаем не отмеченые checkbox

			// скрываем не отмечене блоки drag & drop
			for (var i = checkboxNotCheckedArrID.length - 1; i >= 0; i--) {
				var itemNotChecked = $('#'+checkboxNotCheckedArrID[i]);

				$('[data-control='+checkboxNotCheckedArrID[i]+']').hide(speed);
				$(itemNotChecked).prop("disabled", true);
				$(itemNotChecked).parent().tooltip('enable');
			}
			for (i = checkboxCheckedArrID.length - 1; i >= 0; i--) {
				var itemChecked = $('#'+checkboxCheckedArrID[i]);

				$('[data-control='+checkboxCheckedArrID[i]+']').show(speed);
				$(itemChecked).prop("disabled", false);
				$(itemChecked).parent().tooltip('disable');
			}



		} else {
			// если меньше max включаем не отмеченые checkbox
			checkboxNotChecked.prop("disabled", false);
			checkboxNotChecked.parent().tooltip('disable');
			checkboxChecked.parent().tooltip('disable');

		}
		return checkboxArrDefault;

	}

	/* START СКРОЛЛИНГ ------------------------------------------------------------------------------- */


	// скрываем элементы во время скроллинга страницы
	var positionContent = $(header).actual('outerHeight');
	var positionOne = $(window).innerHeight();
	var menuLeftListDefault = $(menuLeftList).hasClass('show');
	var positionTwo = positionOne * 2;
	var asideHeight;
	var positionThree =  positionContent; //positionTwo + positionOne;
	var asideWidth = $(aside).parent().width();
	var windowHeight = $(window).outerHeight();
	var windowMoreAside;
	var currentScroll = 0;

	var paddingTopContentMax = $(header).actual('outerHeight');
	var headerOverlay = '<div class="header-overlay"/>';


	var width = $(window).width();
	var height = $(window).height();
	var leftNavigationPseudo = $('#leftNavigationPseudo');

	if (!screenSM) {
		// $(header).before(headerOverlay);
		// addClassScroll($(header));
	}
	$(window).resize(function (){
		setTimeout(function () {

			if ((width !== $(window).width()) || (height !== $(window).height())) {
				var position = $(this).scrollTop();
				width = $(window).width();
				height = $(window).height();

				positionOne = $(window).innerHeight();

				windowHeight = $(window).outerHeight();
				asideWidth = $('#aside').parent().width();

				if (screenSM) {
					// $(menuLeftList).collapse('hide');
					$(header).removeClass('scroll');
					// $('.header-overlay').remove();
				} else {
					if (!$('div').is('.header-overlay')) {

						// $(header).before(headerOverlay);
					}
				}
				$('.widget-slider').slick('refresh');

				if (position <= 0 && $(header).hasClass('fixed')) {
					paddingTopContentMax = $(header).actual('outerHeight');
					// $(menuLeftList).collapse('show');
					$(content).animate({
						paddingTop: paddingTopContentMax
					}, 400)
				}

				if (position > 0) {

					if ($(aside).hasClass('positionTop')) {
						var headerHeight = $(header).actual('outerHeight');

						asideHeight = $(aside).actual('outerHeight') + $(header).actual('outerHeight');
						windowMoreAside = asideHeight < windowHeight;

						$(aside).css('top', headerHeight).removeClass('scrollingTop scrollingBottom ');

						if (windowMoreAside) {
							$(aside).css('bottom:', '').addClass('positionTop');
						}
					}
				}
				$(aside).css({
					width: asideWidth,
				});
				if (!screenSM) {
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
	});

	// запоминаем свернуто ли левок меню


	// var menuLeftListControl = $('#menu-left-list-control');
	// $(menuLeftListControl).on('click', function() {
	// 	var position = $(window).scrollTop();
	// 	if (position <= 0 && !safari) {
	// 		menuLeftListDefault = !menuLeftListDefault;
	// 	}
	// 	if (position < positionThree && safari) {
	// 		menuLeftListDefault = !menuLeftListDefault;
	// 	}
	// });

	// if ($(document).scrollTop() >= positionThree) {
	// 	$(leftNavigationPseudo).collapse('hide');
	// }
	// fix bags scroll
	// if (safari || edge || ie) {
	// 	$(header).css({'position': 'fixed'}).addClass('fixed');
	// }
	$(content).css('padding-top', positionContent);

	// если страница загруужена на середине
	if (!screenMD) $(document).trigger('scroll');

	// var headerDuplicate = $(header).clone();
	// headerDuplicate = $(header).before(headerDuplicate).addClass('scroll').removeClass('show');
	// ie = true;
	var headerBread = $('.header .breadcrumb');
	var dropdownMenu = $('.dropdown-menu');
	var contentBody = $('#content');
	$(document).on('scroll', function() {
		var windowHeight = $(window).outerHeight();
		var position = $(this).scrollTop();
		var positionBottom = position + windowHeight;
		var asideBig = $(aside).outerHeight() > $(contentBody).outerHeight();
		var asideOffsetTop;
		var headerHeight;
		var contentPadding;
		var positionContent = $(header).actual('outerHeight');
		var headerHasScroll = $(header).hasClass('scroll');

		if (paddingTopContentMax < positionContent) paddingTopContentMax = positionContent;

		if (screenSM && $(headerNavSystem).hasClass('show')) {
			$(headerNavSystem).collapse('hide');
		}

		if ($(menuNavHeaderGroup).hasClass('show')) {
			$(menuNavHeaderGroup).collapse('hide');
		}

		// скрываем dropdown при скролле
		if ($(dropdownMenu).hasClass('show')) {
			$(dropdownMenu).removeClass('show');
		}

		if ($(rollUp).hasClass('show')){
			$(rollUp).removeClass('show');
		}
		if ($(header).hasClass('deploy-show')) {
			$(header).removeClass('deploy-show');
		}
		if (!screenLG) {
			if (position > 0) {
				if (!$(headerBread).hasClass('show')) $(headerBread).addClass('show');

				if (position > paddingTopContent) {
					if (!headerHasScroll) {
						$(header).fadeIn(150).addClass('scroll');

						if (!$(headerBread).hasClass('show')) $(headerBread).addClass('show');

						if ($(headerNavSystem).hasClass('show')){
							$(headerNavSystem).removeClass('show');
							$(headerNavControl).removeClass('active');
						}

					}

				} else {
					if (position < currentScroll) {
						if (position < paddingTopContent - $(headerBread).offset().top) {

							$(headerBread).removeClass('show');
						}
					}
					if (headerNavSystemDefault) {
						$(headerNavControl).addClass('active');
						$(headerNavSystem).addClass('show');
					}
					if (!$(header).hasClass('show')){

						$(header)
							.addClass('show')
							.removeClass('scroll')
							.slideDown(200);
					}
					if (headerHasScroll) {
						$(header)
							.addClass('show')
							.removeClass('scroll')
							.slideDown(200);
					}

					$(content).stop(true).animate({paddingTop: paddingTopContent}, 300);
					// $(headerBread).removeClass('show');
				}
			} else {

				if (headerNavSystemDefault) {
					$(headerNavControl).addClass('active');
					$(headerNavSystem).addClass('show');
				}
				if (!$(header).hasClass('show')){

					$(header)
						.addClass('show')
						.removeClass('scroll')
						.slideDown(200);
				}
				if (headerHasScroll) {
					$(header)
						.addClass('show')
						.removeClass('scroll')
						.slideDown(200);
				}

				$(content).stop(true).animate({paddingTop: paddingTopContent}, 300);
				$(headerBread).removeClass('show');
				setTimeout(function (){
				}, 50);
			}
		}
		// aside
		if (!screenSM && !ie) {
				asideHeight = $(aside).actual('outerHeight') + $(header).actual('outerHeight');
				windowMoreAside = asideHeight < windowHeight;

			if (!asideBig) { // боковая меньше контента

				if (position > currentScroll) { // скроллим вниз

					if (position > 0) {
						$(aside).removeClass('scrollingTop');

						if (!$(aside).hasClass('scrollingBottom')) {
							asideOffsetTop = $(aside).offset().top;
							contentPadding = parseInt($(content).css('padding-top'));

							$(aside).addClass('scrollingBottom');
							if (!$(aside).hasClass('positionStatic')) {
								$(aside).css({
									position: '',
									top: '',
									bottom: '',
									marginTop: asideOffsetTop - contentPadding,
								}).removeClass('positionTop positionBottom').addClass('positionStatic');
							}
						}

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

					contentPadding = parseInt($(content).css('padding-top'));

					asideOffsetTop = $(aside).offset().top;
					headerHeight = $(header).actual('outerHeight');

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

						asideOffsetTop = $(aside).offset().top;
						headerHeight = $(header).actual('outerHeight');

						if (asideOffsetTop < position + headerHeight) {

							if ($(aside).hasClass('positionBottom')) {
								$(aside).css({
									position: '',
									top: '',
									bottom: '',
									marginTop: asideOffsetTop - contentPadding,
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

	/*
	* проверка на случай если, высота шапки
	* не совпадает с padding content
	* (напрмер если обновить страницу на середине)
	* */
	setInterval(function (){
		var position = $(document).scrollTop();
		var headerHeight = $(header).actual('outerHeight');
		var headerNavSystemCollapsing = $(headerNavSystem).hasClass('collapsing');
		console.log('position ' + position);
		console.log('paddingTopContent ' + paddingTopContent);
		console.log('headerHeight ' + headerHeight);
		console.log('!screenSM ' + !screenSM);
		console.log('!headerNavSystemCollapsing ' + !headerNavSystemCollapsing);
		if (position <= 0
				&& paddingTopContent < headerHeight
				&& !screenSM
				&& !headerNavSystemCollapsing) {
			paddingTopContent = $(header).actual('outerHeight');
			$(content).stop(true).animate({paddingTop: paddingTopContent}, 300);
		}
	}, 150);

	// плавный скролл до элемента

	$(document).on('click', 'a.event, a.calendar__link', function() {
		var link = $(this).attr('href');
		var elementToScroll = $('#' + link.split('#')[1]);

		if (elementToScroll !== undefined && elementToScroll !== null && elementToScroll !== '') {
			scrollTo(elementToScroll);
		}
	});

	/**
	 * функция скролит до элемента с учетом высоты header
	 *
	 * @param {selector|Object} elementToScroll
	 * @returns {boolean}
	 */
	function scrollTo (elementToScroll) {
		var elementScroll = $(elementToScroll);
		var elementToScrollPos = elementScroll.offset().top;
		var headerHeight = $(header).outerHeight(); // высота хэдера
		if (elementToScrollPos < positionTwo) {
			elementToScrollPos = elementScroll.offset().top - headerHeight - 45;
		} else {
			elementToScrollPos = elementScroll.offset().top - 90;
		}

		if (elementScroll !== undefined) {
			$('html:not(:animated),body:not(:animated)').animate({scrollTop: elementToScrollPos}, 800);
			return false;
		}
	}


	/**
	 * при переходе на страницу события плавный скролл до события
	 * calendar2.html#events-14-10-2018
	 */

	var myHash = location.hash; //получаем значение хеша

	$(window).on('load', function() {
		var headerHeight = $(header).outerHeight(); // высота хэдера
		if(myHash[1] !== undefined && myHash[1] !== '#'){ //проверяем, есть ли в хеше какое-то значение
			var elementToScrolling = $(myHash).offset().top;
			if (elementToScrolling < positionTwo) {
				elementToScrolling = $(myHash).offset().top - headerHeight - 48;
			} else {
				elementToScrolling = $(myHash).offset().top;
			}

			$('html:not(:animated),body:not(:animated)').animate({scrollTop: elementToScrolling}, 800);
		}
	});

	// скролл до самого верха страницы
	$('#btn-up').click(function() {
		$('html:not(:animated),body:not(:animated)').animate({scrollTop: 0 }, 800);
		return false;
	});

	/**
	 * добавляет класс если страница
	 * прокручена больше заданного значения
	 *
	 * @param {Object} element
	 * @param {string} [$class='scroll']
	 * @param {number} [positionMax=200]
	 * @returns {number} возвращает текущее значение scrollTop()
	 */
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


	/* END СКРОЛЛИНГ ------------------------------------------------------------------------------- */

	// левое меню show
	// var navMoreListControl = $('#nav-more-list-control');
	//
	// $(menuLeftList).on('show.bs.collapse', function() {
	// 	var btn = $(menuLeftListControl);
	// 	var position = $(document).scrollTop();
	//
	// 	btn.addClass('active');
	// 	$('.menu-left-more__list').removeClass('show');
	// 	$(navMoreListControl).removeAttr('data-toggle');
	// 	$(navMoreListControl).dropdown('dispose');
	// 	$('.menu-left-more__button>i').animate({opacity: 'hide'}, 400);
	//
	// 	if (position < positionThree && !safari && !edge) {
	// 		$(leftNavigationPseudo).collapse('show')
	// 	}
	// 	if (!edge && !safari) {
	// 		if (position <= 0) {
	// 			$(leftNavigationPseudo).collapse('show')
	// 		}
	// 	}
	// 	if (position <= 0) {
	// 		$(leftNavigationPseudo).collapse('show')
	// 	}
	// });
	//
	// // левое меню hide
	// $(menuLeftList).on('hide.bs.collapse', function() {
	// 	var btn = $(menuLeftListControl);
	// 	btn.removeClass('active');
	// 	$(navMoreListControl).attr('data-toggle', 'dropdown');
	// 	$('.menu-left-more__button>i').animate({opacity: 'show'}, 400);
	// 	$(leftNavigationPseudo).collapse('hide')
	//
	// });
	//
	// var menuLeftListHeight = $(menuLeftList).actual('outerHeight');
	// $(leftNavigationPseudo).html('<div style="height:'+menuLeftListHeight+'px;"></div>');

	// ставим лайки
	$(document).on('click', '.like-button:not(.comment-button)', function() {
		$(this).toggleClass('active');

	});


	// скрываем показываем фильтры
	$('#content-filter-button').on('click', function() {
		var options = {
			direction: 'right'
		};
		$('.content-filter__formbox').toggle('slide', options);
	});

	// ставим текущую дату в фильтре
	var periodDateBuffer = $('[name="period_date_buffer"]');
	var filtersCalendarPeriod = $('#filters-calendar-period');
	var periodDate = $('#period-date');
	var selectedOption = $(filtersCalendarPeriod).find(':selected');

	// сброс формы чтобы открыть каледарь change
	$(filtersCalendarPeriod).click(function (){
		if ($(this).val() === $(periodDateBuffer).val()) $(this).val('');
	});

	// сохраняем ранее выбранную дату
	$(filtersCalendarPeriod).on('focus', function (){
		selectedOption = $(this).find(':selected');
	});

	$(filtersCalendarPeriod).on('focusout', function (){
		if ($(selectedOption).val() === $(periodDateBuffer).val()) {
			$(this).val($(periodDateBuffer).val())
		}
	});

	// выбор даты
	$(filtersCalendarPeriod).on('change', function() {
		selectedOption = $(this).find(':selected');

		if ($(this).val() === 'true-date' || $(this).val() === $(periodDateBuffer).val()) {
			$(periodDateBuffer).datepicker($.datepicker.regional[ "ru" ]);
			$(periodDateBuffer).datepicker('widget').addClass('widget-calendar widget-calendar_filter');
			$(periodDateBuffer).datepicker('option',{
				nextText: '>',
				prevText: '<',
			});
			$(periodDateBuffer).datepicker('show');
		}
	});

	// буфер чтобы показать календарь
	$(periodDateBuffer).on('change', function() {
		$(filtersCalendarPeriod).find('option').removeAttr('selected');
		$(periodDate).val($(this).val());
		$(periodDate).text($(this).val());
		$(periodDate).attr('selected', 'true');
		$(filtersCalendarPeriod).val($(this).val());
	});

	/* ВИДЖЕТЫ -------------------------------------------------------------------------------------- */

	// datepicker

	/**
	 * fix datepicker beforeShow
	 * У inline datepicker не работает метод beforeShow
	 *
	 * https://api.jqueryui.com/datepicker/#option-beforeShow
	 * https://stackoverflow.com/questions/3961963/beforeshow-event-not-firing-on-jqueryui-datepicker
 	 */
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
			date: new Date('03/6/2019'),
			tooltip: "<p>День металлурга</p>",
			link: "/calendar.html",
			eventItem: '#event-6',
			generalItem: '#events-06-10-2018'
		},
		{
			date: new Date('03/14/2019'),
			tooltip: "<p>День металлурга </p><p>День металлурга 2 </p>",
			link: "/calendar2.html",
			eventItem: '#event-14',
			generalItem: '#events-14-10-2018',
		},
		{
			date: new Date('03/24/2019'),
			tooltip: "<p>День металлурга3 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга3 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p><p>День металлурга 5 </p>",
			link: "/calendar3.html",
			eventItem: '#event-24',
			generalItem: '#events-24-10-2018'
		},

	];
	// calendar.html
	// calendar2.html
	// calendar3.html
	$('#page-calendar').datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		inline: true,
		nextText: '>',
		prevText: '<',

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
			var t = this;
			setTimeout(function (){
				addElements($(t));
			}, 110);
			addPreloader(this);
		}

	}).on('click', function (){
		addControlBtn($(this));
	});


	$('#widget-calendar').datepicker({
		showOtherMonths: false,
		selectOtherMonths: true,
		changeMonth: false,
		showWeek: true,
		nextText: '>',
		prevText: '<',

		beforeShow: function (calendar){
			addCustomElementsInWidget(calendar);
		},

		onChangeMonthYear: function (year, month, item){
			var t = this;
			setTimeout(function (){
				addCustomElementsInWidget($(t));
			}, 110);
			addPreloader(this);
		},
		onSelect: function (dateString, item) {
			var dateStringArr = dateString.split('.');
			var dateFormat = dateStringArr[1]+'/'+dateStringArr[0]+'/'+dateStringArr[2];

			var curDate = new Date(dateFormat);
			for (var i = 0; i < eventsDates.length; i++)  {
				var event = eventsDates[i];
				var dayDate = event.date;

				if (curDate.getTime() === dayDate.getTime()) {
					if (event.link !== undefined && event.link !== null) {
						toggleWidgetCalendarEvent(event.eventItem, this)
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

	/**
	 * переключение между событием
	 * выбранной даты и виджетиом календаря
	 *
	 * @param {selector|Object} itemEvent - DOM елемент события по выбранной дате
	 * @param {Object} element - DOM елемент виджет с календарем
	 *
	 * @example toggleWidgetCalendarEvent($('#event-6'), $('#widget-calendar'))
	 */
	function toggleWidgetCalendarEvent(itemEvent, element){
		var dayCurrent = $(this),
			eventElements = $(itemEvent),
			eventElementArr = eventElements.find('.event'),
			el = $(element),
			subtitle = $(el).find('.widget-subtitle span'),
			calendar = $(el).find('.ui-datepicker-calendar'),
			eventElementControl = $(el).parent().find('.event-control');


		$(el).addClass('show-event');
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
		var eventNav = $(el).find('.event-nav'),
			prev = $(eventNav).find('.prev'),
			next = $(eventNav).find('.next'),
			count = $(eventNav).find('.count');

		prev.click(function() {
			var current = eventElements.find('.event.current');
			if ($(current).data('count') === 0) {
				$(count).text(eventElementArr.length + ' из ' + eventElementArr.length);
				$(current).fadeOut('150', function() {
					$(eventElementArr[eventElementArr.length - 1]).fadeIn('150').addClass('current');
				}).removeClass('current');
			} else {
				$(count).text($(current).data('count') + ' из ' + eventElementArr.length)
				$(current).fadeOut('150', function() {
					$(eventElementArr[$(current).data('count') - 1]).fadeIn('150').addClass('current');
				}).removeClass('current');
			}
		});

		next.click(function() {
			var current = eventElements.find('.event.current');
			if ($(current).data('count') === eventElementArr.length - 1) {
				$(count).text('1' + ' из '+eventElementArr.length)
				$(current).fadeOut('150', function() {
					$(eventElementArr[0]).fadeIn('150').addClass('current');
				}).removeClass('current');
			} else {
				$(count).text($(current).data('count')+2 +' из '+eventElementArr.length);
				$(current).fadeOut('150', function() {
					$(eventElementArr[$(current).data('count') + 1]).fadeIn('150').addClass('current');
				}).removeClass('current');
			}
		});

		// нажимаем на кнопку скрыть
		eventElementControl.click(function(event) {
			el.removeClass('show-event');
			el.find('.event-nav').detach();
			eventElements.animate({opacity: 'hide'}, 150);
			eventElementControl.animate({opacity: 'hide'}, 150, function () {
				calendar.animate({opacity: 'show'}, 150);
				eventElementArr.hide()
			});

		});
	}

	/**
	 * добавление кастомных элементов в виджет календаря
	 *
	 * @param {selector|Object} calendar - DOM элемент календаря
	 */
	function addCustomElementsInWidget(calendar){
		addControlBtn(calendar);
		addHeader(calendar, false);
		addPreloader(calendar)
	}

	/**
	 * кастомная подпись
	 *
	 * @param {selector|Object} calendar - DOM элемент календаря
	 */
	function addCustomToday(calendar){
		var today = $(calendar).find('.ui-datepicker-today');

		$(today).append('<span class="card-calendar__caption">Сегодня</span>');
	}

	/**
	 * Tooltip при наведении на дату
	 *
	 * @param {selector|Object} calendar - DOM элемент календаря
	 */
	function addDataTooltip(calendar){
		var cells = $(calendar).find('.ui-datepicker-calendar td');
		$(cells).attr('data-placement', 'right');
		$(cells).attr('data-toggle', 'tooltip');
		$(cells).attr('data-html', 'true');

		setTimeout(function (){
			$(cells).tooltip();
		}, 110);
	}

	/**
	 * кастомная шапка календаря
	 *
	 * @param {selector|Object} calendar - DOM элемент календаря
	 * @param {boolean} [title=true] заголовок
	 */
	function addHeader(calendar, title){
		if (title === undefined) {
			var titleArg = true;
		}
		var header = $(calendar).find('.ui-datepicker-header');
		var year = $(header).find('.ui-datepicker-year').text();
		var month = $(header).find('.ui-datepicker-month').text();
		var headerUiButtons = $(header).find('.ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-title');
		var todayDate = new Date();
		var optionsDay = {day: '2-digit'};
		var todayDateDay = todayDate.toLocaleString("ru", optionsDay).slice(0, 2);
		var monthA = ["Января","Февраля","Марта","Апреля","Мая","Июня",
			"Июля","Августа","Сентября","Октября","Ноября","Декабря" ];
		var todayYear = todayDate.getFullYear();
		var todayDateMonth = monthA[todayDate.getMonth()];
		var uiTitle = $(header).find('.ui-datepicker-title');

		if (titleArg) {

			$(headerUiButtons).wrapAll('<div class="content-subtitle content-subtitle_right"><h3></h3></div>');
			$(header).addClass('content-title');
			$(uiTitle).append('<span class="ui-datepicker-current">Сегодня: ' + todayDateDay + ' ' + todayDateMonth+'</span>');
			$(header).append('<div class="content-subtitle margin-0">\n' +
				'                 <h2>'+month+',<span> '+year+'</span></h2>\n' +
				'               </div>');
		} else {
			$(headerUiButtons).wrapAll('<div class="widget-subtitle"></div>');
			$(uiTitle).append('<span class="ui-datepicker-current">Сегодня ' + todayDateDay + ' ' + todayDateMonth+''+' '+todayYear+'</span>');
		}
	}

	/**
	 * Кастомные кнопки "пред", "след" месяц
	 *
	 * @param {selector|Object} calendar - DOM элемент календаря
	 */
	function addControlBtn(calendar){
		var header = $(calendar).find('.ui-datepicker-header');
		var prev = $(header).find('.ui-datepicker-prev');
		var next = $(header).find('.ui-datepicker-next');
		$(prev).text($(prev).attr('title')).removeAttr('title');
		$(next).text($(next).attr('title')).removeAttr('title');

	}

	/**
	 * Добавляем количество событий в ячейку календаря
	 *
	 * @param {selector|Object} calendar - DOM элемент календаря
	 */
	function addToCell (calendar) {
		$(calendar).find('tbody td').each(function(){
			var calendarText = $(this).attr('title');
			if (calendarText !== undefined) {
				var word = decOfNum($(calendarText).length, ['событие', 'события', 'событий']);
				$(this).append('<span class="card-calendar__caption">'+$(calendarText).length+' '+word+'</span>');
			}
		});
	}

	/**
	 * Прелоадер
	 * если вторым параметром передать false то прелоадер
	 * не уберется, убрать прелоадер можно будет с помощью hidePreloader(item);
	 *
	 * @param {selector|Object} item - DOM элемент к которому добавлем прелоадер
	 * @param {boolean|number} [timeout=400] время через каторое уберется прелоадер
	 * @param {string} [position='absolute'] css position preloader
	 */

	function addPreloader(item, timeout, position){
		var time;
		if (timeout === undefined) {
			time = 400
		} else {
			time = timeout;
		}
		var isTimout = !time;
		var pos = position ? position : 'absolute';
		var preloader = '<div class="preloader"><div class="page-loader-circle"></div></div>';
		preloader = $(preloader).css({
			position: pos,
			width: pos === 'fixed' ? windowWidth : '',
		});
		console.log(windowWidth);
		$(item).append(preloader);
		$(item).css({
			position: 'relative',
		});
		if (!isTimout) {
			setTimeout(function () {
				hidePreloader(item)

			}, time)
		}
	}

	/**
	 * Убирает прелоадер
	 *
	 * @param {selector|Object} item - DOM элемент к которому был добавлен прелоадер
	 */
	function hidePreloader(item){
		$(item)
			.css({
				position: '',
			})
			.find('.preloader')
			.fadeOut('300', function (){
				$(this).remove();
		});
	}

	/**
	 * Спряжение слов (1 событие, 2 события, 5 событий)
	 *
	 * @param {number} number - число по которому спрягаем
	 * @param {array} titles - варианты
	 * @returns {string}
	 */
	function decOfNum(number, titles) {
		var decCache = [],
				decCases = [2, 0, 1, 1, 1, 2];
		if(!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
		return titles[decCache[number]];
	}

	/**
	 * Добавляем кастомные элементы в календарь
	 *
	 * @param {selector|Object} calendar - DOM элемент к которому добавлем прелоадер
	 */
	function addElements(calendar) {
		addCustomToday(calendar);
		addDataTooltip(calendar);
		addControlBtn(calendar);
		addHeader(calendar);
		addToCell(calendar);
		addPreloader(calendar);

	}

	/* TOOLTIPS ------------------------------------------------------------------------------------ */
	$('.calendar__day').tooltip();
	$('.card-calendar td').tooltip();
	$.widget.bridge('uitooltip', $.ui.tooltip);
	$('.tooltip-mouse').uitooltip({
		// placement: 'auto',
		// trigger: 'click',
		// container: 'body',
		track: true,
		tooltipClass: 'tooltip_light',
		close: function () { $(".ui-helper-hidden-accessible > *:not(:last)").remove(); },
		// html: true,
		// template: '<div class="tooltip tooltip_light" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
	});

	$('.sliderBlog').slick();



	/*
	* СЛАЙДЕРЫ sliders
	*
	* index.html
	* gallery.html
	* video.html
	* spoyler.html
	* others.html
	*/
	$('.widget-slider').slick({
		autoplay: true,
		prevArrow: '<div class="slider-arrow slider-arrow__left \
								widget-slider-arrow widget-slider-arrow__left"></div>',
		nextArrow: '<div class="slider-arrow slider-arrow__right \
								widget-slider-arrow widget-slider-arrow__right"></div>',
	});

	/**
	 * нумерация слайдов
	 *
	 * gallery.html
	 */
	var cardFullSliderWrap = $('.card-full-slider-wrap');

	$(cardFullSliderWrap).on('init reInit afterChange',
		function(event, slick, currentSlide){
			var status = $(this).find('.card-slider-number span'),
					slide = $(this).find('.card__imgbox');
			slide.attr('data-current-slide', currentSlide);
			//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
			var i = (currentSlide ? currentSlide : 0) + 1;
			status.text(i + ' / ' + slick.slideCount);
			
	});

	/**
	 * нумерация слайдов в слайдере модерн
	 *
	 * gallery.html
	 */
	var cardModernSliderWrap = $('.card-modern-slider-wrap');

	$(cardModernSliderWrap).on('init reInit afterChange',
		function(event, slick, currentSlide, nextSlide){
			var slider = $(this);
			var status = $(this).find('.card-slider-number_modern span');
			var slide = $(this).find('.card__imgbox');
			slide.attr('data-current-slide', currentSlide);
			//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
			var i = slick.currentSlide;
			var slidesLength = slick.slideCount;
			var numberSlide1 = i + 1 <= slidesLength ? i + 1 : i - (slidesLength - 1);
			var numberSlide2 = i + 2 <= slidesLength ? i + 2 : i - (slidesLength - 2);
			var numberSlide3 = i + 3 <= slidesLength ? i + 3 : i - (slidesLength - 3);
			var numberSlide4 = i + 4 <= slidesLength ? i + 4 : i - (slidesLength - 4);
			switch (slidesLength){
				case 1:
					break;
				case 2:
					status.html('<strong>'+numberSlide1+'</strong>' + '&#8194;' +
						'<span class="slide-num">'+numberSlide2+'</span>' + '&#8194;');
					break;
				case 3:
					status.html('<strong>'+numberSlide1+'</strong>' + '&#8194;' +
						'<span class="slide-num">'+numberSlide2+'</span>' + '&#8194;' +
						'<span class="slide-num">'+numberSlide3+'</span>' + '&#8194;');
					break;
				case 4:
					status.html('<strong>'+numberSlide1+'</strong>' + '&#8194;' +
						'<span class="slide-num">'+numberSlide2+'</span>' + '&#8194;' +
						'<span class="slide-num">'+numberSlide3+'</span>' + '&#8194;' +
						'<span class="slide-num">'+numberSlide4+'</span>' + '&#8194;');
					break;
				default:
					status.html('<strong>'+numberSlide1+'</strong>' + '&#8194;' +
						'<span class="slide-num">'+numberSlide2+'</span>' + '&#8194;' +
						'<span class="slide-num">'+numberSlide3+'</span>' + '&#8194;' +
						'<span class="slide-num">'+numberSlide4+'</span>' + ' ...');
					break;
			}
			status.find('.slide-num').on('click', function() {
				var slideDigit = parseInt($(this).text());
				$(slider).slick('slickGoTo', slideDigit - 1);
			});
	});


	$(cardFullSliderWrap).slick({
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

	/*
	* нумерация текущего слайда в спойлере
	*
	* spoyler.html
	*/
	var spoilerSlider = $('.spoiler-slider');

	$(spoilerSlider).on('init reInit afterChange',
	 function(event, slick, currentSlide, nextSlide){
		 var slider = $(this);
		 var parentSlider = $(slider).parents('.collapse');
		 var headSlider = $('[data-target="#'+$(parentSlider).attr('id')+'"]');
		 var slideCountEl = $(headSlider).find('.slide-count');
		 var i = slick.currentSlide + 1;

		 $(slideCountEl).html('&lt; '+i+' &gt;')
	 });

	/*
	* Show long comment
	*
	* index.html
	* gallery.html
	* */
	
	var commentBox = $('.comment-box');
	var commentHasComment = $('.comment:has(.comment)');

	//показываем кнопку развернуть если у комментария есть вложенные комментарии

	$(commentHasComment).each(function ($key, item){
		$(item).find('.comment__link.more').first().removeClass('hide')
	});

	// разворачиваем свернутые комментарии
	$(commentHasComment).on('click', function (e){
		var elTarget = e.target;
		var commentButton = $(elTarget).parent('.comment__link');
		var commentButtonBox = $(commentButton).parent('.comment__links');
		var commentButtonLess = $(commentButtonBox).find('.comment__link.less');
		var commentButtonMore = $(commentButtonBox).find('.comment__link.more');
		var commentButtonTarget = $($(commentButton).data('target'));

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

	// скрываем часть комментария если высота больше 180px
	for (var i = 0; i < commentBox.length; i++) {
		var	text = $(commentBox[i]).find('.comment__text > *'),
				textHeight = 0;
		for (var x = 0; x < text.length; x++) {
			textHeight = textHeight + $(text[x]).actual('outerHeight')
		}
		
		if (textHeight > 180) {
			$(commentBox[i]).append(
				'<button class="comment-long__showbtn">\
						<span>Развернуть</span>\
						<i class="icon-arrow-down"></i>\
					</button>\
			')
		}
	}

	var elControlDefaultText;

	// разворачиваем длинный комментарий
	$(document).on('click', '.comment-long__showbtn', function() {
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
	
	var formDuplicateShow = false;


	$(document).on('click', '.comment__reply', function(event) {
		var commentFormBox = $('#comment-formbox').clone();
		var commentFormBoxAppend;
		var commentFormBoxOrigin = $('.comment-form-inn');

		var elControl = $(this);
		var elParent = elControl.closest('.comment');

		var formDuplicate = $('.form-duplicate');

		event.stopImmediatePropagation();

		commentFormBoxAppend = commentFormBoxCreate(elControl, commentFormBox);

		if (!elControl.hasClass('form-active')) {
			elControlDefaultText = elControl.text();
		}

		// проверяем где юзер отвечает на коммент
		if (formDuplicateShow && $('.modal-main').hasClass('show')) {
			$(formDuplicate).collapse('hide');
		}

		// меняет разметку после показа копии формы
		$(commentFormBoxAppend).on('shown.bs.collapse', function(event) {
			elControl.addClass('form-active');
			elControl.text('Отменить');
			$(this).collapse('dispose');
			$(this).find('textarea').focus();
			formDuplicateShow = true;
		});

		// возвращает разметку после скрытия копии формы
		$(formDuplicate).on('hidden.bs.collapse', function() {
			var commentReply = $('.comment__reply');

			$(commentReply).text(elControlDefaultText)
				.removeClass('form-active')
				.removeAttr('data-target');

			$('.comment').removeClass('show-form');
			$(this).collapse('dispose');
			formDuplicateShow = false;
			$(this).remove();
		});

		// скрывает стандартную форму
		$(commentFormBoxAppend).on('show.bs.collapse', function(event) {
			commentFormBoxOrigin.collapse('hide');
		});

		
		if (!elControl.hasClass('form-active')) {

			commentFormBoxShow(elControl, commentFormBoxAppend).collapse('show');
			commentFormBoxOrigin.collapse('hide');
			
		} else {
			$(formDuplicate).collapse('hide');
			commentFormBoxOrigin.collapse('show');
		}

		event.preventDefault();

		/**
		 * добавлеет созданю форму в DOM
		 *
		 * @param elControl
		 * @param addElement
		 * @returns {*|jQuery.fn.init|jQuery|HTMLElement}
		 */
		function commentFormBoxShow(elControl, addElement) {
			var eventParent = $(elControl).closest('.comment');

			eventParent.addClass('show-form')
				.find('.comment-box:first')
				.after($(addElement));

			$(elControl).attr('data-target', '#'+$(addElement).attr('id'));
			
			return $(addElement);			
		}

		/**
		 * Создает копию формы
		 *
		 * @param event
		 * @param elClone
		 * @returns {*|jQuery.fn.init|jQuery|HTMLElement}
		 */
		function commentFormBoxCreate(event, elClone) {
			var eventParent = $($(event).parents('.comment-box')),
					eventParentID = elParent.attr('id'),
					eventParentTitle = eventParent.find('.comment__nickname:first').text(),
					
					elementID = $(elClone).attr('id'),
					elementNew = $(elClone);

			$(elClone).removeClass('comment-form-inn show')
				.attr('id', elementID+'_'+eventParentID)
				.attr('data-parent', '#allComentators')
				.addClass('form-duplicate collapse')
				.find('form.comment-form').addClass('comment-form-reply')
				.find('textarea.comment-form__textarea').val(eventParentTitle+', ');
			return elementNew;
		}
	});




	/* modals -------------------------------------------------------------------------------- */

	// header fix bug

	var modals = $($('[data-toggle="modal"]').data('target'));

	// добавлет отступ при открытии модальных окон
	$(modals).on('show.bs.modal', function (){
		if ($(header).hasClass('fixed')){
			$(header).css({
				paddingRight: scrollbarWidth,
			})
		}
	});

	// удаляет отступ
	$(modals).on('hidden.bs.modal', function(event) {
		$(header).css('padding-right', '');
	});

	$('#modal-img-box').on('show.bs.modal', function(event) {
		var modal = $(this);
		var modalContent = modal.find('.modal-main__content');

		var elControl = $(event.relatedTarget);
		var targetContent = $(elControl.data('target-content')).clone();

		modalContent.html(targetContent);
	});

	var modalVideo = $('#modal-video');

	$(modalVideo).on('show.bs.modal', function(event) {
		var modal = $(this),
				modalContent = modal.find('.modal-video iframe'),
				elControl = $(event.relatedTarget),
				src = $(elControl).data('target-content');

		$(modalContent).attr('src', src);
		addPreloader($(modalContent).parent(), 600);
	});

	$(modalVideo).on('hidden.bs.modal', function() {
		var modal = $(this),
			modalContent = modal.find('.modal-video iframe');

		$(modalContent).attr('src', 'http://');
	});


	// нумерация слайдов
	$('.modal-main-slider-wrap').on('init reInit afterChange',
		function(event, slick, currentSlide, nextSlide){
			var status = $('.slider-number'),
					i = (currentSlide ? currentSlide : 0) + 1,
					currentLink = '<span class="card-number-elem">'+'#'+i+'</span>',
					statusInner = currentLink + ' из ' + slick.slideCount;

			status.html(statusInner);			
	});

	// модальное окно со слайдером и комментариями
	var modalContentSlider = $('#modal-content-slider');
	$(modalContentSlider).on('show.bs.modal', function(event) {
		var modal 				= $(this),
				modalContent  = modal.find('.modal-main__content'),

				elControl 		= $(event.relatedTarget),
				elAdd,

				targetContent             = $(elControl.data('target-content')).clone(),
				targetContentSliderTitle  = targetContent.find('.post-info').clone(),

				sliderModal 		= modal.find('.modal-main-slider-wrap'),
				sliderTitle 		= modal.find('.modal-main-slider-title');

		event.stopImmediatePropagation();

		elAdd = getElement(targetContent);

		sliderModal.html(elAdd); // вставляем слайдер

		sliderTitle.html(targetContentSliderTitle); // вставляем заголовок слайдера

		addPreloader(modalContent);

		// сохраняем отступ у хедэра
		if ($(header).hasClass('fixed')){
			$(header).css({
				paddingRight: scrollbarWidth,
			})
		}
		/**
		 * возвращает элементы слайдера
		 *
		 * @param {selector | Object} el
		 * @returns {*|jQuery}
		 */
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

	$(modalContentSlider).on('shown.bs.modal', function(event) {
		var modal 				= $(this),
				body = $('body'),

				elControl 		= $(event.relatedTarget),
				elControlCurrent = elControl.data('current-slide');

		$(body).addClass('modal-main-contents-open');
		modal.css('padding-right', '');

		$('#modal-main-slider-top').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			initialSlide: elControlCurrent,
			asNavFor: '#modal-main-slider-bottom',
			prevArrow: '<div class="slider-arrow \
															slider-arrow__left \
															modal-main-slider-arrow \
															modal-main-slider-arrow__left"></div>',
			nextArrow: '<div class="slider-arrow \
															slider-arrow__right \
															modal-main-slider-arrow \
															modal-main-slider-arrow__right"></div>',
		});

		$('#modal-main-slider-bottom').slick({
			slidesToShow: 7,
			slidesToScroll: 1,
			initialSlide: elControlCurrent,
			focusOnSelect: true,
			centerPadding: '0px',
			infinite: false,
			asNavFor: '#modal-main-slider-top',
			prevArrow: '<div class="slider-arrow \
															slider-arrow__left \
															modal-main-slider-arrow \
															modal-main-slider-arrow__left"></div>',
			nextArrow: '<div class="slider-arrow \
															slider-arrow__right \
															modal-main-slider-arrow \
															modal-main-slider-arrow__right"></div>',
		});
	});

	var modalMainSliderBottom = $('#modal-main-slider-bottom');
	$(modalMainSliderBottom).on('click', '.slick-slide', function() {
		var eventSlide = $(modalMainSliderBottom).slick('slickCurrentSlide');
		$('#modal-main-slider-top').slick('slickGoTo', eventSlide);
	});	

	$(modalContentSlider).on('hidden.bs.modal', function() {
		var modalContent = $(this),
				sliderModal = modalContent.find('.modal-main-slider-wrap');
		modalContent.modal('dispose');
		$(sliderModal).slick('unslick');
		$('.preloader').stop().show();

		// сохраняем отступ у хедэра
		if ($(header).hasClass('fixed')){
			$(header).css({
				paddingRight: '',
			})
		}
	});

	$(document).on('click', '.card-number-elem', function() {
			var elEvent = $(this);

			var textArea = $(modalContentSlider).find('.comment-form__textarea:visible');
			var textAreaPositionTop = textArea.position().top;

			$(modalContentSlider)
				.animate({
					scrollTop: textAreaPositionTop,
				}, 800, function(){
					textArea.focus();
				});
			textArea.val(textArea.val() + elEvent.text()+' ');
			
		});

	$(document).on('click', '.modal-main-comments__curentImg', function(event) {
		var element = $(this);
		$(modalContentSlider)
			.animate({
				scrollTop: 0,
			}, 800, function(){
				$('#modal-main-slider-top').slick('slickGoTo', parseInt(element.attr('href') - 1));
			});

		event.preventDefault();
	});

	/**
	 * Свои иконки меню "Системы"
	 *
	 * profile.html
	 */
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
			if(e.keyCode === 13) {
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

		/**
		 * функция редактирования блока с иконками
		 */
		function editsBlock(){
			$(buttonAddPrimary).prop('disabled', true);
			$(block).addClass('edits');
			$(blocksNotEdits).addClass('disabled');
			$(blockImages).addClass('active');
			$(blockImages).find($('.'+$(buttonIcon).data('icon'))).addClass('active');
		}

		/**
		 * Функция для плавного исчезновения одного элемента DOM
		 * и появление вместо него другого
		 *
		 * @param {selector|Object} elementHide
		 * @param {selector|Object} elementShow
		 */
		function toggleElement(elementHide, elementShow){
			$(elementHide).fadeOut(200, function (){
				$(this).addClass('hide');

				$(elementShow).fadeIn(200, function (){
					$(this).removeClass('hide');
				})
			});
		}
	});

	/*
	 * Форма обращения с произвольным именем
	 *
	 * others.html
	 */
	var defaultTextBtn = $('#form-more-inputs-control').text();
	var formMoreInputs = $('#form-more-inputs');
	var formSender = $('.form-sender');
	var formTitleMain = $('.form__title_main');
	var formTitleAlt = $('.form__title_alt');

	$(formMoreInputs).on('show.bs.collapse', function(event) {
		var elControl = $('#form-more-inputs-control'),
				elControlAltText = elControl.data('alt-text');

		elControl.text(elControlAltText);
		if (screenSM) {
			$(formSender).animate({height: 'hide'},'400');
		} else {
			$(formSender).fadeOut('400');
		}

		$(formTitleMain).fadeOut('400');
		$(formTitleAlt).fadeIn('400', function (){
			$(this).css('position', 'static')
		});
		
	});

	$(formMoreInputs).on('hide.bs.collapse', function(event) {
		var elControl = $('#form-more-inputs-control');

		elControl.text(defaultTextBtn);
		if (screenSM) {
			$(formSender).animate({height: 'show'},'400');
		} else {
			$(formSender).fadeIn('400');
		}

		$(formTitleAlt).fadeOut('400').css('position', '');
		$(formTitleMain).fadeIn('400');

	});

	$('#form-checkbox-slide').on('change', function() {
		var formSlideInput = $('.form-slide-input');
		if (screenSM)  {
			$(formSlideInput).animate({height: 'toggle'}, '400')
		} else {
			$(formSlideInput).toggle('slide');
		}
	});

	/**
	 * спойдлеры
	 * 
	 * spoyler.html
	 */
	var collapsedElement = $('.article.collapse, .card.collapse');

	$(collapsedElement).on('show.bs.collapse', function(event) {
		$(this).find('.card-full-slider-wrap').slick('unslick');
		$('[data-target="#'+ $(this).attr('id') +'"]').addClass('active');
		
	});
	$(collapsedElement).on('shown.bs.collapse', function(event) {
		var element = $(this);
		$(this).find('.card-full-slider-wrap').slick({
			prevArrow: '<div class="slider-arrow slider-arrow__left"></div>',
			nextArrow: '<div class="slider-arrow slider-arrow__right"></div>',
		});
		$('[data-target="#'+ $(this).attr('id') +'"]').addClass('active');
	});

	$(collapsedElement).on('hide.bs.collapse', function(event) {
		$('[data-target="#'+ $(this).attr('id') +'"]').removeClass('active');
		
	});

});

(function($){
	/**
	 * проверяет есть ли атрибут у элемента DOM
	 *
	 * @param {string} attrName
	 * @returns {boolean}
	 */
	jQuery.fn.hasAttr = function(attrName) {
		return this.attr(attrName) !== undefined;
	};

	/**
	 * скрытие элемента при клике не по нему
	 *
	 * @param {string} [bootstrapEvent=unbind]
	 * @returns {this}
	 */
	jQuery.fn.hideClickAway = function(bootstrapEvent){

		var el = $(this);
		var make = function (){
			if (!!bootstrapEvent){
				$(document).mouseup(function (e){ // событие клика по веб-документу
					if (!el.is(e.target) // если клик был не по нашему блоку
						&& el.has(e.target).length === 0) { // не по его дочерним элементам
						switch (bootstrapEvent){ // проверяем событие
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
	/**
	 * возвращает ширину скроллбара
	 *
	 * @returns {number}
	 */
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