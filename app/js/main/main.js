$(document).ready(function() {
	var ua = window.navigator.userAgent.toLowerCase(), 
		ie = (/trident/gi).test(ua) || (/msie/gi).test(ua);
	/* Валидация ------------------------------------------------------------------------------------ */
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
	$("#form1").validate(x);
	$("#form2").validate(x);
	$("#form3").validate(x);

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
	$("select[multiple]").mousedown(function(e){
		e.preventDefault();

		var select = this;
		var scroll = select.scrollTop;

		e.target.selected = !e.target.selected;

		setTimeout(function(){select.scrollTop = scroll;}, 0);

		$(select).focus();
	}).mousemove(function(e){e.preventDefault()});


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
	$('#menu-nav-headerGroup').on('show.bs.collapse', function(e) {
		var menuNavHeader = $(this).parents('.menu-nav-header');

		$(menuNavHeader).addClass('show');


	});

	$('#menu-nav-headerGroup').on('hidden.bs.collapse', function(e) {
		var menuNavHeader = $(this).parents('.menu-nav-header');

		if (!mobile) $(menuNavHeader).removeClass('show');

	});

	$('.rollUp').on('click', function(event) {
		$(document).trigger('scroll');
	});

	$('.btn-group').on('show.bs.dropdown', function() {
		$('.header').css('transform', 'none');
	});

	$('.btn-group').on('hide.bs.dropdown', function() {
		$('.header').css('transform', '');
	});

	// $(document).click(function(event) {
	// 	if (event !== undefined) {
	// 		if (!$(event.target).is("#menu-nav-more *")) {
	// 			var current = $('#menu-nav-more').find('.current');
	// 			if ($('#menu-nav-headerGroup').hasClass('show')) {
	// 				current.parents('.collapse').collapse('show');
	// 			}
	// 			$('#menu-nav-headerGroup').collapse('hide');
	// 		}
	// 	}
	// });

	function cahgeTrueFalse(argument) {
		return !argument;
	}

	/* ПОДМЕНЮ "СИСТЕМЫ" ----------------------------------------------------------------------------- */
	var mobile = false;
	if ($(window).outerWidth() < 768) {
		mobile = true;
	}
	$(window).on('resize', function (e){
		if ($(this).outerWidth() < 768) {
			mobile = true;
		}
	});
	if (mobile) {
		$('#header-nav').collapse('hide');
	}
	if (mobile) {
		$('#header-navControl').removeClass('active');
		setTimeout(function (){
			$('.header-nav-system-wrap').removeClass('mobile-hide');
		}, 300)
	}
	if (!mobile) {
		$('.header-nav-system-wrap').addClass('show')
		$('#header-navControl').addClass('active');
	}
	// системы показываются
	$('#header-nav').on('shown.bs.collapse', function () {
		var btn = $('#header-navControl');
		btn.addClass('active')
	});

	// системы скрываются
	$('#header-nav').on('hidden.bs.collapse', function () {
		var btn = $('#header-navControl');
		btn.removeClass('active')
	});

	$(document).on('click', function(e){
		var el = e.target;
		var headerNav = $(el).parents('#header-nav');

		if (mobile && !$(headerNav).hasClass('header-nav-system-wrap')) {
			$('#header-nav').collapse('hide');
		}
	});


	// разворачиваем меню
	$('#btnDeploy').click(function(event) {
		// var header = $('.header'),
		// 		headerNavSustem = $('.header-nav-system');
		$('.header').removeClass('scroll').css({
			'position': 'fixed',
			'padding-bottom': '10px'
		});

		$('#header-nav').collapse('show');
		$('#menuLeftList').collapse('show');

		$('.rollUp').addClass('show');
		return false;
	});

	// настройки показываются
	$('#header-navSetting').on('show.bs.collapse', function () {
		var headerHeight = $('.header').actual('outerHeight');

		// инициализация drag & drop
		$( "#sortable" ).sortable();
		$( "#sortable" ).disableSelection();
		$( "#sortable" ).draggable();

		$('.header').css('transform', 'none');

		$(this).parent().append('<div class="overlay"/>');
		$('.overlay').animate({opacity: 'show'}, 400);

		$('#header-navSettingControl').css({
			position: 'relative',
			zIndex: '1000'
		}).addClass('active');

		if ($(document).scrollTop() <= 0) {
			$('body').css({
				overflow: 'hidden',
				paddingRight: '17px',
				paddingTop: headerHeight
			});
		} else {
			$('body').css({
				overflow: 'hidden',
				paddingRight: '17px',
			});
		}

		var headerPositionDeafult = $('.header').css('position')
		$('.header').wrap('<div class="extra-wrapper"></div>')
		$('.header').css({
			position: '',
			// 'padding-right': '17px'
		});

		checkboxDisabl($(this), 10)
		// настройки скрываются
		$('#header-navSetting').on('hide.bs.collapse', function () {
			$('.header').css('transform', '');
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
			$('.header').css({
				'padding-right': '',
				'position': headerPositionDeafult
			});
			$('.header').unwrap();

			$('#header-navSettingControl').removeClass('active').removeAttr('style');
		})
	})

	var checkboxs = $('input[type="checkbox"].setting-form-checkbox__input');
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

	function checkboxDisabl(form, max, checkboxArrDeafult, speed) {
		// form - елемент в котором ищем активные чекбоксы
		// max - максимальное количество input со значение checked
		// checkboxArrDeafult - изначальное положение элементов
		// speed - скорость анимации
		var checkbox = form.find('input[type="checkbox"]'),
				checkboxCheckd,
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
			deafultCheckboxCheckd: form.find('input[type="checkbox"]:checked'),
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
		addClassScroll($('.header'));
	}
	// скрываем элементы во время скроллинга страницы
	var positionContent = $('.header').actual('outerHeight'),
			chekPosContent,
			positionOne = $(window).innerHeight(),
			menuLeftListDeafult = $('#menuLeftList').hasClass('show'),
			positionTwo = positionOne * 2;
			positionThre =  positionTwo + positionOne,
			currentScroll = 0;

	$('#menuLeftListControl').on('click', function() {
		var position = $(window).scrollTop();
		if (position < positionOne) {
			menuLeftListDeafult = cahgeTrueFalse(menuLeftListDeafult);
		}
	});
  if (!ie) {

  }
	$(document).on('scroll', function(event) {
		var position = $(this).scrollTop(),
				heightHeader = $('.header:not(.header.scroll)').outerHeight(),
				positionContentEvent = $('.content').offset().top,
				asideBig = $('#aside').outerHeight() > $('#content').outerHeight();
		$('*').tooltip('hide');

		if (mobile && $('#header-nav').hasClass('show')) {
			$('#header-nav').collapse('hide');
		}

		if (!asideBig && !ie) {
			if (position > currentScroll) { //скроллим вниз
				if ($('#aside').css('margin-top') == '1px') {
					$('#aside').css({
						position: '',
						marginTop: $('#aside').offset().top-(position-currentScroll)-$('.header').outerHeight(),
					});
				}

				if (position>=$('#aside').offset().top+$('#aside').outerHeight()-positionOne) {
					$('#aside').css({
						position: 'fixed',
						bottom: '0px',
						width: $('#aside').parent().width(),
						marginTop: '',
						top: ''
					});

				}
			} else { // скроллим вверх

				if($('#aside').css('margin') == '0px' && position > positionTwo){
					$('#leftNavigationPseudo').height(0)
					$('#aside').css({
						position: '',
						marginTop: $('#aside').offset().top-(position-currentScroll)-$('.header').outerHeight(),
					});

				} else if($('#aside').offset().top+200 >= position && position > 300) {
					$('#leftNavigationPseudo').height(0)
					$('#aside').css({
						position: 'fixed',
						top: $('.header').outerHeight(),
						bottom: '',
						marginTop: '1px',
						width: $('#aside').parent().width(),
					});

				} else if (position <= 0) {
					$('#aside').removeAttr('style')
				}
			}

			if (position > 0) {
				if (mobile) $('.header + *').css('padding-top', positionContent);

			} else {
				if (mobile) $('.header + *').css('padding-top', '');
			}
		}



		// var positionScrollBottom = position+positionOne,
		// 		asidePositionBottom = parseInt($('#aside').css('margin-top'))+$('#aside').outerHeight();

		// if (positionScrollBottom < asidePositionBottom && currentScroll > position) {
		// 	$('#aside').css({
		// 		position: 'fixed',
		// 		bottom: 0,
		// 		top: 'auto',
		// 		marginTop: 0,
		// 		width: '270px',
		// 	});
		// }
		// меню в обычном состоянии

		if (!$('.header').hasClass('.scroll')  && !$('#header-navSetting').hasClass('show') && !mobile) {
			addClassScroll($('.header'), 'scroll', positionThre);

			// 1 брэйкпоинт
			if (position > 0) {
				collapseItemScrollHide($('#menuLeftListControl'), 0);
			} else {
				// if (position <= 300) {
				// 	collapseItemScrollShow($('#menuLeftListControl'), positionOne);
				// }
			}

			// сохраняем отступ
			if (position > 0) {
				if (chekPosContent !== positionContent) {
					$('.header + *').css('padding-top', positionContent);
					setTimeout(function (){
						chekPosContent = positionContent;
					},100)

				}

				$('#btnUp').animate({bottom: 'show'}, 500);
				$('.header .breadcrumb').css({
					paddingBottom: '15px'});


			} else {
				$('.header + *').css('padding-top', '');
				$('#btnUp').animate({bottom: 'hide', opacity: 'hide'}, 500);
				$('.header .breadcrumb').removeAttr('style')
			}
		}

		// меню свернуто
		if ($('.header').hasClass('scroll')) {
			$('#header-nav').collapse('hide');
			$('#header-navControl').removeClass('active');
		}

		// scroll top самый верх экана
		if (position <= 0) {
			if (!mobile) {
				$('#header-nav').collapse('show');
			}
			$('.header').removeAttr('style');
			addClassScroll($('.header'));
			positionContent = $('.header').actual('outerHeight');
		}
		// if (position <= 0 && menuLeftListDeafult) {
		// 	$('#menuLeftList').collapse('show');
		// }

		// scroll bottom
		if (position > 0) {
			$('.menu-left').removeAttr('style');
			$('#menu-nav-headerGroup').collapse('hide');
			$('.header').css('padding-bottom', '')

			// развернуть
			if (!$('.rollUp').hasClass('show') && $('.header').hasClass('scroll')) {
				$('.rollUp').addClass('show');
			} else {
				$('.rollUp').removeClass('show');
			}

			if (!$('.header').hasClass('scroll')) {
				$('.header').css({'position': 'fixed'});
			}

		} else {
			$('.rollUp').removeClass('show');
		}

		// скрываем dropdown при скролле
		if ($('.dropdown-menu').hasClass('show')) {
			$('.dropdown-menu').removeClass('show');
		}
		currentScroll = position;
	});

	setInterval(function() {
		var position = $(document).scrollTop(),
				menuLeft = $('#menuLeftList'),
				meuLeftShown = menuLeft.hasClass('show');

		if (position <= 0 && menuLeftListDeafult && !meuLeftShown) {
			$('#menuLeftList').collapse('show');
		}
	}, 2000)


	// плавный скролл до элемента
	$(document).on('click', 'a.event, a.calendar__link', function(event) {
		var link = $(this).attr('href');
		var elementToScroll = $('#' + link.split('#')[1]);

		if (elementToScroll !== undefined && elementToScroll !== null && elementToScroll !== '') {
			scrollTo(elementToScroll);
		}
		// var elementToScrollPos = elementToScroll.offset().top;
		// var headerHeight = $('.header').outerHeight(); // высота хэдера
		// if (elementToScrollPos < positionTwo) {
		// 	elementToScrollPos = elementToScroll.offset().top - headerHeight - 45;
		// } else {
		// 	elementToScrollPos = elementToScroll.offset().top - 90;
		// }
		//
		// if (elementToScroll !== undefined) {
		// 	$('html:not(:animated),body:not(:animated)').animate({scrollTop: elementToScrollPos}, 800);
		// 	// event.preventDefault();
		// 	return false;
		// }
	});

	function scrollTo ($elementToScroll) {
		var elementToScroll = $($elementToScroll);
		var elementToScrollPos = elementToScroll.offset().top;
		var headerHeight = $('.header').outerHeight(); // высота хэдера
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
	$(document).on('click', 'a', function(event) {
		var el = event.target,
				elHref = $(el).attr('href');
		if (elHref === undefined || elHref === '#' || elHref === '') {
			event.preventDefault();
		}
	});



	var myHash = location.hash; //получаем значение хеша
	//location.hash = ''; //очищаем хеш
	$(window).on('load', function() {
		var headerHeight = $('.header').outerHeight(); // высота хэдера
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

	$('#btnUp').click(function() {
		var destination = 0;
		// 		element = $(this).attr('href');
		// 		headerHeight = $('.header').outerHeight();
		// if ($(element).offset() !== undefined) {
		// 	destination = $(element).offset().top - headerHeight;

		// }
		$('html:not(:animated),body:not(:animated)').animate({
			scrollTop: destination
		}, 800, function () {
		});
		return false;
	});

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

	function toggleCollapseScroll(element) {
		var position = $(this).scrollTop();
		if (position >= 200) {
			element.collapse('hide');
		} else {
			element.collapse('show');
		}
		return position;
	}

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
		if (position < positionOne) {
			$('#leftNavigationPseudo').animate({height: $(this).actual('innerHeight')}, 300)
		}
	});

	// левое меню hide 
	$('#menuLeftList').on('hide.bs.collapse', function() {
		var btn = $('#menuLeftListControl');
		var position = $(document).scrollTop();
		btn.removeClass('active');
		$('#navMoreListControl').attr('data-toggle', 'dropdown')
		$('.menu-left-more__button>i').animate({opacity: 'show'}, 400);
		if (position < positionOne) {
			$('#leftNavigationPseudo').animate({height: 0}, 300)
		}
	});
	var menuLeftList = $('#menuLeftList').actual('outerHeight');
	$('#leftNavigationPseudo').html('<div style="height:'+menuLeftList+'px;"></div>');
	// $('#menuLeftListControl').on('click', function(event) {
	// 	$('#leftNavigationPseudo').collapse('toggle');
	// });

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
			$('[name="period_date_buffer"]').datepicker('widget').addClass('widget-calendar');
			$('[name="period_date_buffer"]').datepicker('show');

		}
	});
	$('[name="period_date_buffer"]').on('change', function(event) {
		$('#filtersCalendarPeriod').find('option').removeAttr('selected');
		$('#period_date').val($(this).val());
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
	$('.card__title *').dotdotdot();
	$('.text-ddd').dotdotdot();

	$('.text-ddd-210').dotdotdot({
		keep: '.card__more',
		tolerance: 10,
		height: 210,
		callback: function () {
			if ($(this).hasClass('ddd-truncated')) {
				$(this).find('.card__more').css('display', 'table');
				$(this).dotdotdot({tolerance: 0})
			}
		}
	});

	$('.text-ddd-260').dotdotdot({
		keep: '.card__more',
		// tolerance: 10,
		height: 260,
		callback: function () {
			if ($(this).hasClass('ddd-truncated')) {
				$(this).find('.card__more').css('display', 'table');
				// $(this).dotdotdot({tolerance: 0})
			}
		}
	});
	
	$('.text-ddd-135').dotdotdot({
		keep: '.card__more',
		tolerance: 10,
		height: 135,
		callback: function () {
			if ($(this).hasClass('ddd-truncated')) {
				$(this).find('.card__more').css('display', 'table');
				$(this).dotdotdot({tolerance: 0})
			}
		}
	});

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
		if (textHeight > 170) {
			$(commentBox[i]).append(
				'<button class="comment-long__showbtn">\
						<span>Развернуть</span>\
						<i class="icon-arrow-down"></i>\
					</button>\
			')
		}
	}
	var elControlDeafultText;

	$(document).on('click', '.comment-long__showbtn', function(event) {
		var el = $(this),
				elParent = el.parents('.comment-box'),
				text = $(elParent).find('.comment__text > *'),
				textBlock = $(elParent).find('.comment__text'),
				textHeight = 0;

		for (var i = 0; i < text.length; i++) {
			textHeight = textHeight + $(text[i]).actual('outerHeight')
		}
		el.hide();
		textBlock.css('height', 170);
		textBlock.css('max-height', 'none');
		textBlock.animate({
			height: textHeight + 25
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

	$('.modal').on('show.bs.modal', function(event) {
		var position = $(document).scrollTop();
		if (position > 0)  {
			$('.header').css('padding-right', '17px');
		}
	});
	$('.modal').on('hidden.bs.modal', function(event) {
		$('.header').css('padding-right', '');
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
	$('#formMoreInputs').on('show.bs.collapse', function(event) {
		var elControl = $('#formMoreInputsControl'),
				elControlAltText = elControl.data('alt-text');

		elControl.text(elControlAltText);
		$('.form-sender').fadeOut('400');
		$('.form__title_main').fadeOut('400');
		$('.form__title_alt').fadeIn('400');
		
	});

	$('#formMoreInputs').on('hide.bs.collapse', function(event) {
		var elControl = $('#formMoreInputsControl');

		elControl.text(deafultTextBtn);
		$('.form-sender').fadeIn('400');
		$('.form__title_alt').fadeOut('400');
		$('.form__title_main').fadeIn('400');
		
	});
	$('#formCheckbox').on('change', function() {
			$('.form-slide-input').toggle('slide')
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
	$.fn.hasAttr = function(name) {
		return this.attr(name) !== undefined;
	};

	$(window).resize(function (){
		$(document).triggerHandler('ready');

	})
});
