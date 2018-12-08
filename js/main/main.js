$(document).ready(function() {
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


	// подпункты меню раскрывается при наведении
	// $('.menuNavHeader__item').on('mouseenter', function(event) {
	// 	var element = $(event.target).parents('.menuNavHeader__item'),
	// 			elementControl = $(element.data('target'));
	// 	if (elementControl.hasClass('collapse')) {
	// 		elementControl.collapse('show');	

	// 		$(this).on('mouseleave', function(event) {
	// 			elementControl.collapse('hide');
	// 		});
	// 	}
	// });

	$('.rollUp').on('click', function(event) {
		$(document).trigger('scroll');		
	});
	
	$('.btn-group').on('show.bs.dropdown', function() {
		$('.header').css('transform', 'none');
	});

	$('.btn-group').on('hide.bs.dropdown', function() {
		$('.header').css('transform', '');
	});

	$(document).click(function() {
		if (event !== undefined) {
			if (!$(event.target).is("#menuNavMore *")) {
				var current = $('#menuNavMore').find('.current');
				if ($('#menuNavHeaderGroup').hasClass('show')) {
					current.parents('.collapse').collapse('show');
				}
				$('#menuNavHeaderGroup').collapse('hide');
			}
		}		
	});

	function cahgeTrueFalse(argument) {
		return !argument;
	}

	/* ПОДМЕНЮ "СИСТЕМЫ" ----------------------------------------------------------------------------- */
	// системы показываются
	$('#headerNav').on('show.bs.collapse', function () {
		var btn = $('#headerNavControl');
		btn.addClass('active')
	});

	// системы скрываются
	$('#headerNav').on('hide.bs.collapse', function () {
		var btn = $('#headerNavControl');
		btn.removeClass('active')
	});
	
	// разворачиваем меню
	$('#btnDeploy').click(function(event) {
		var header = $('.header'),
				headerNavSustem = $('.headerNavSystem');
		$('.header').removeClass('scroll').css({
			'position': 'fixed',
			'padding-bottom': '10px'
		});

		$('#headerNav').collapse('show');
		$('#menuLeftList').collapse('show');

		$('.rollUp').addClass('show');
		return false;
	});	

	// настройки показываются
	$('#headerNavSetting').on('show.bs.collapse', function () {
		var headerHeight = $('.header').actual('outerHeight');

		// инициализация drag & drop
		$( "#sortable" ).sortable();
		$( "#sortable" ).disableSelection();

		$('.header').css('transform', 'none');

		$(this).parent().append('<div class="overlay"/>');
		$('.overlay').animate({opacity: 'show'}, 400);

		$('#headerNavSettingControl').css({
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
		$('#headerNavSetting').on('hide.bs.collapse', function () {
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

			$('#headerNavSettingControl').removeClass('active').removeAttr('style');
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
	addClassScroll($('.header'));
	// скрываем элементы во время скроллинга страницы
	var positionContent = $('.header').actual('outerHeight'),
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

	$(document).on('scroll', function(event) {
		var position = $(this).scrollTop(),
				heightHeader = $('.header:not(.header.scroll)').outerHeight(),
				positionContentEvent = $('.content').offset().top;

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

		// меню в обычном состоянии
		$('*').tooltip('hide');
		if (!$('.header').hasClass('.scroll')  && !$('#headerNavSetting').hasClass('show')) {
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
				$('.header + *').css('padding-top', positionContent);
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
			$('#headerNav').collapse('hide');
			$('#headerNavControl').removeClass('active');
		}

		// scroll top самый верх экана
		if (position <= 0) {
			$('#headerNav').collapse('show');
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
			$('#menuNavHeaderGroup').collapse('hide');
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
	}, 3000)


	// плавный скролл до элемента
	$(document).on('click', 'a.event, a.calendar__link', function(event) {
		var link = $(this).attr('href');
		var elementToScroll = $('#' + link.split('#')[1]);
		var elementToScrollPos = elementToScroll.offset().top;
		var headerHeight = $('.header').outerHeight(); // высота хэдера
		if (elementToScrollPos < positionTwo) {
			elementToScrollPos = elementToScroll.offset().top - headerHeight - 45;
		} else {
			elementToScrollPos = elementToScroll.offset().top - 90;
		}
		if (elementToScroll !== undefined) {
			event.preventDefault();
			$('html:not(:animated),body:not(:animated)').animate({scrollTop: elementToScrollPos}, 800);
		}
	});	

	

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
		console.log('test');		
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
			$('[name="period_date_buffer"]').datepicker('widget').addClass('vidget-calendar');
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
	$('.vidget-tabbox').on('mousemove', '.vidget-item', function(event) {
		var box = $(event.delegateTarget),
				items = box.find('.vidget-item');
				currentItem = box.find('.vidget-item.active');
		currentItem.attr('data-current', 'true')
		items.removeClass('active');
		box.on('mouseleave', '.vidget-items', function(event) {
			$('.vidget-item[data-current="true"]').addClass('active')
		});
		items.click(function() {
			$('.vidget-item[data-current="true"]').removeAttr('data-current')
		});
		
	});

	// подсветка текущего дня в виджете календарь
	// var nowDay = $.datepicker.formatDate('dd', new Date());
	// var dateArr = $('#calendarVidgetBox .ui-state-default');

	// for (var i = 0; i < dateArr.length; i++) {
	// 	if ($(dateArr[i]).text() == nowDay) {
	// 		$(dateArr[i]).parent().addClass('ui-datepicker-today');
	// 	} else {
	// 		$(dateArr[i]).parent().removeClass('ui-datepicker-today');
	// 	}
	// }

	/* СОБЫТИЯ В ВИДЖЕТЕ "КАЛЕНДАРЬ" ----------------------------------------------------------------- */
	
	var setTimer;
	setInterval(function(){ // открываем событие на текущей дате по таймеру
		if (!$('#calendarVidgetBox').hasClass('show-event')) {
			$('#calendarVidgetBox .ui-datepicker-today.selected a.ui-state-default').trigger('click')
			setTimer = setTimeout(function () {
				$('.event-control').trigger('click');
				$('#calendarVidgetBox').removeClass('show-event');
			}, 5000)
		}
	}, 10000);

	// открываем события на выбранной дате
	$('#calendarVidgetBox').on('click', 'a.ui-state-default', function(e) {
		e.preventDefault();
		var dayCurrent = $(this),
				eventElements = $(dayCurrent.attr('href')),
				eventElementArr = eventElements.find('.event')
				element = $(e.delegateTarget),
				subtitle = element.find('.vidget-subtitle span'),
				calendar = element.find('.ui-datepicker-calendar'),
				eventElementControl = element.find('.event-control');
		element.addClass('show-event');

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
			clearTimeout(setTimer);
			element.find('.event-nav').detach();
			eventElements.animate({opacity: 'hide'}, 150);
			eventElementControl.animate({opacity: 'hide'}, 150, function () {
				calendar.animate({opacity: 'show'}, 150);
				eventElementArr.hide()
			});

		});
	});
	

	/* СОКРАЩАЕМ ТЕКСТ ------------------------------------------------------------------------------ */
	$('.card__title *').dotdotdot();
	$('.cardTwoThirds__text').dotdotdot({
		keep: '.card__more',
		tolerance: 10,
		callback: function () {
			if ($(this).hasClass('ddd-truncated')) {
				$(this).find('.card__more').css('display', 'table');
				$(this).dotdotdot({tolerance: 0})
			}
		}
	});
	
	$('.cardHalf__text').dotdotdot({
		keep: '.card__more',
		// tolerance: 10,
		callback: function () {
			if ($(this).hasClass('ddd-truncated')) {
				$(this).find('.card__more').css('display', 'table');
				// $(this).dotdotdot({tolerance: 0})
			}
		}
	});
	
	$('.cardMinOther__text').dotdotdot({
		keep: '.card__more',
		tolerance: 10,
		callback: function () {
			if ($(this).hasClass('ddd-truncated')) {
				$(this).find('.card__more').css('display', 'table');
				$(this).dotdotdot({tolerance: 0})
			}
		}
	});

	/* TOOLTIPS ------------------------------------------------------------------------------------ */
	$('.calendar__day').tooltip();
	$('.sliderBlog').slick();

	/* СЛАЙДЕРЫ -------------------------------------------------------------------------------------*/
	$('.vidget-slider').slick({
		autoplay: true,
		prevArrow: '<div class="slider-arrow slider-arrow__left \
								vidget-slider-arrow vidget-slider-arrow__left"></div>',
		nextArrow: '<div class="slider-arrow slider-arrow__right \
								vidget-slider-arrow vidget-slider-arrow__right"></div>',
	});

	$('.cardFull-slider-wrap').on('init reInit afterChange', 
		function(event, slick, currentSlide, nextSlide){
			var status = $(this).find('.card-slider-number span'),
					slide = $(this).find('.card__imgbox');
			slide.attr('data-current-slide', currentSlide);
			//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
			var i = (currentSlide ? currentSlide : 0) + 1;
			status.text(i + ' / ' + slick.slideCount);
			
	});

	$('.cardFull-slider-wrap').slick({
		// onInit: function() {
		// 	$('.card-slider-number span').text(i + '/' + slick.slideCount);
		// },
		prevArrow: '<div class="slider-arrow slider-arrow__left"></div>',
		nextArrow: '<div class="slider-arrow slider-arrow__right"></div>',
	});


	$('.cardHalf-slider-wrap').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		prevArrow: '<div class="slider-arrow slider-arrow__left"></div>',
		nextArrow: '<div class="slider-arrow slider-arrow__right"></div>',
	});

	$('.cardThird-slider-wrap').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow: '<div class="slider-arrow slider-arrow__left"></div>',
		nextArrow: '<div class="slider-arrow slider-arrow__right"></div>',
	});

	$('.cardFifth-slider-wrap').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		prevArrow: '<div class="slider-arrow slider-arrow__left"></div>',
		nextArrow: '<div class="slider-arrow slider-arrow__right"></div>',
	});


	/* Show long comment ----------------------------------------------------------------------------- */
	
	var commentBox = $('.comment-box');
	for (var i = 0; i < commentBox.length; i++) {
		var	text = $(commentBox[i]).find('.comment__text > *'),
				textBlock = $(commentBox[i]).find('.comment__text'),
				textHeight = 0;
		for (var x = 0; x < text.length; x++) {
			textHeight = textHeight + $(text[x]).actual('outerHeight')
		};
		if (textHeight > 170) {
			$(commentBox[i]).append('<button class="comment-long__showbtn">\
																	<span>Развернуть</span>\
																	<i class="icon-arrow-down"></i>\
																</button>')
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

				elControl = $(this),				
				elParent = elControl.closest('.comment'),
				elParentID = elParent.attr('id'),

				formActive = $(elControl).hasClass('form-active');

		event.stopImmediatePropagation()
		commentFormboxAppend = commentFormboxCreate(elControl, commentFormbox);

		if (!elControl.hasClass('form-active')) {
			elControlDeafultText = elControl.text();
		}

		// проверяем где юзер отвечает на коммент
		if (formDuplicateShow && $('.modalMain').hasClass('show')) { 
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

		$(commentFormboxAppend).on('shown.bs.collapse', function(event) {
			elControl.addClass('form-active');
			elControl.text('Отменить');
			$(this).collapse('dispose');
			$(this).find('textarea').focus();
			formDuplicateShow = true;
		});
		
		if (!elControl.hasClass('form-active')) {

			commentFormboxShow(elControl, commentFormboxAppend).collapse('show');
			
			
		} else {
			$('.form-duplicate').collapse('hide');
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
					console.log(eventParent);

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
		$('.header').css('padding-right', '17px');
	});
	$('.modal').on('hidden.bs.modal', function(event) {
		$('.header').css('padding-right', '');
	});

	$('#modalImgBox').on('show.bs.modal', function(event) {
		var modal 				= $(this),
				modalContent  = modal.find('.modalMain__content'),

				elControl 		= $(event.relatedTarget),
				elAdd,

				targetContent = $(elControl.data('target-content')).clone();
		modalContent.html(targetContent);
	});

	$('.modalMain-slider-wrap').on('init reInit afterChange', 
		function(event, slick, currentSlide, nextSlide){
			// нумерация слайдов в модалке
			var status = $('.slider-number'),
					slide = $(this).find('.card__imgbox'),
					i = (currentSlide ? currentSlide : 0) + 1,
					currentLink = '<span class="slider-number-elem">'+'#'+i+'</span>',
					statusInner = currentLink + ' из ' + slick.slideCount;

			status.html(statusInner); 
			
	});

	$('#modalContentSlider').on('show.bs.modal', function(event) {
		var modal 				= $(this),
				modalContent  = modal.find('.modalMain__content'),

				elControl 		= $(event.relatedTarget),
				elAdd,

				targetContent 					 = $(elControl.data('target-content')).clone(),
				targetContentSliderTitle = targetContent.find('.post-info').clone(),
				targetComments					 = targetContent.find('.comments-dark').clone(),

				sliderModal 		= modal.find('.modalMain-slider-wrap'),
				sliderTitle 		= modal.find('.modalMain-slider-title'),
				sliderComments 	= modal.find('.modalMain-comments');

		event.stopImmediatePropagation();

		modal.addClass('modalMain-preload');
		elAdd = getElement(targetContent);

		sliderModal.html(elAdd); // вставляем слайдер

		sliderTitle.html(targetContentSliderTitle); // вставляем заголовок слайдера

		sliderComments.html(targetComments); // вставляем блок комментариев


		function getElement(el) {
			var element = $(el),
					elements;
			element.find('.slick-cloned').remove();
			elements = $(element.find('.card-image'))
				.wrap('<div class="modalMain-slider__imgbox"></div>')
				.parent()
				.wrap('<div class="modalMain-slider__item"></div>')
				.parent();
			return elements;
		}
	});

	$('#modalContentSlider').on('shown.bs.modal', function(event) {
		var modal 				= $(this),
				modalContent  = modal.find('.modalMain__content'),

				elControl 		= $(event.relatedTarget),
				elControlCurrent = elControl.data('current-slide'),
				elAdd,

				targetContent = $(elControl.data('target-content')).clone(),

				sliderModal 	= modal.find('.modalMain-slider-wrap');


		modal.css('padding-right', '');

		$('#modalMainSliderTop').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			initialSlide: elControlCurrent,
			asNavFor: '#modalMainSliderBottom',
			prevArrow: '<div class="slider-arrow \
															slider-arrow__left \
															modalMain-slider-arrow \
															modalMain-slider-arrow__left"></div>',
			nextArrow: '<div class="slider-arrow \
															slider-arrow__right \
															modalMain-slider-arrow \
															modalMain-slider-arrow__right"></div>',
		});

		$('#modalMainSliderBottom').slick({
			slidesToShow: 7,
			slidesToScroll: 1,
			initialSlide: elControlCurrent,
			focusOnSelect: true,
			asNavFor: '#modalMainSliderTop',
			prevArrow: '<div class="slider-arrow \
															slider-arrow__left \
															modalMain-slider-arrow \
															modalMain-slider-arrow__left"></div>',
			nextArrow: '<div class="slider-arrow \
															slider-arrow__right \
															modalMain-slider-arrow \
															modalMain-slider-arrow__right"></div>',
		});
		setTimeout(function () {
			$('.preloader').fadeOut('300');
			modal.removeClass('modalMain-preload');
		}, 800) 

	});

	$('#modalContentSlider').on('hidden.bs.modal', function(event) {
		var modal 				= $(this),
				modalContent  = modal.find('.modalMain__content'),

				elControl 		= $(event.relatedTarget),
				elAdd,

				sliderModal 	= modal.find('.modalMain-slider-wrap'),
				targetContent = $(elControl.data('target-content')).clone();
		modal.modal('dispose');
		$(sliderModal).slick('unslick');
		$('.preloader').stop().show();
	});

	$(document).on('click', '.slider-number-elem', function(event) {
			var elEvent = $(this),

					textArea = $('#modalContentSlider').find('.comment-form__textarea'),
					textAreaPositionTop = textArea.position().top;

					modalDialog = $('#modalContentSlider').find('.modal-dialog');
			$('.form-duplicate').collapse('hide');	
			$('#modalContentSlider')
				.animate({
					scrollTop: textAreaPositionTop,
				}, 800, function(){
					textArea.focus();
				});
			textArea.val(elEvent.text()+' ');
			
		});
	$(document).on('click', '.modalMain-comments__curentImg', function(event) {
		var element = $(this);
		console.log(element.attr('href') - 1);
		$('#modalContentSlider')
			.animate({
				scrollTop: 0,
			}, 800, function(){
				$('#modalMainSliderTop').slick('slickGoTo', parseInt(element.attr('href') - 1));
			});

		event.preventDefault();
	});
});