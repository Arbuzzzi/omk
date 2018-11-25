$(document).ready(function() {
	/* Валидация ---------------------------------------*/
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
		// $('.header').addClass('.scroll');
		$(document).trigger('scroll');

		
	});
	
	$('.btn-group').on('show.bs.dropdown', function() {
		$('.header').css('transform', 'none');
	});

	$('.btn-group').on('hide.bs.dropdown', function() {
		$('.header').css('transform', '');
	});

	$(document).click(function() {
		if (!$(event.target).is("#menuNavMore *")) {
			var current = $('#menuNavMore').find('.current');
			if ($('#menuNavHeaderGroup').hasClass('show')) {
				current.parents('.collapse').collapse('show');
			}
			$('#menuNavHeaderGroup').collapse('hide');
		}
		
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

	function cahgeTrueFalse(argument) {
		if (argument) {
			return false;
		} else {
			return true;
		}
	}

	addClassScroll($('.header'));

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
	// var marker = true;
	// function markerChange (marker){
	// 	if (marker == true) {
	// 		return false;
	// 	} else {
	// 		return true;
	// 	}
	// }
	// скрываем элементы во время скроллинга страницы
	var positionContent = $('.header').actual('outerHeight'),
			positionOne = $(window).innerHeight(),
			menuLeftListDeafult = $('#menuLeftList').hasClass('show'),
			positionTwo = positionOne * 2;
			positionThre =  positionTwo + positionOne;

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
		// меню в обычном состоянии
		$('*').tooltip('hide');
		if (!$('.header').hasClass('.scroll')  && !$('#headerNavSetting').hasClass('show')) {
			addClassScroll($('.header'), 'scroll', positionThre);

			// 1 брэйкпоинт 
			if (position >= positionOne) {
				collapseItemScrollHide($('#menuLeftListControl'), positionOne);
			} else {
				if (position <= 300) {
					collapseItemScrollShow($('#menuLeftListControl'), positionOne);
				}
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
	});

	// плавный скролл
	$(document).on('click', 'a.event', function(event) {
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

	var myHash = location.hash; //получаем значение хеша
	location.hash = ''; //очищаем хеш
	var headerHeight = $('.header').outerHeight(); // высота хэдера

	if(myHash[1] != undefined){ //проверяем, есть ли в хеше какое-то значение
		var elementToScrolling = $(myHash).offset().top;
		if (elementToScrolling < positionTwo) {
			elementToScrolling = $(myHash).offset().top - 150;
		} else {
			elementToScrolling = $(myHash).offset().top;
		}

	  $('html:not(:animated),body:not(:animated)').animate({scrollTop: elementToScrolling}, 800); //скроллим за полсекунды
	};
	$('#btnUp, .calendar__link').click(function() {
		var destination = 0,
				element = $(this).attr('href');
				headerHeight = $('.header').outerHeight();

		if (element !== undefined) {
			destination = $(element).offset().top - headerHeight - 70;

		}
		$('html:not(:animated),body:not(:animated)').animate({
			scrollTop: destination
		}, 800, function () {			
		});
		return false;
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

		$('body').css({
			overflow: 'hidden',
			paddingRight: '17px',
			paddingTop: positionContent
		});

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

	// ---------------------------------------------------------------------------------------------------	

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

	// ставим лайки
	$('.like-button:not(.comment-button)').on('click', function(event) {
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

	// открываем событие на текущей дате
	$('#calendarVidgetBox').on('click', 'a.ui-state-default.ui-state-active', function(e) {
		e.preventDefault();
		var dayCurrent = $(this),
				eventElements = $(dayCurrent.attr('href')),
				eventElementArr = eventElements.find('.event')
				element = $(e.delegateTarget),
				subtitle = element.find('.vidget-subtitle span'),
				calendar = element.find('.ui-datepicker-calendar'),
				eventElementControl = element.find('.event-control');

		eventElementArr.hide();
		calendar.animate({
			opacity: 'hide'},
			150, function() {
			eventElements.animate({opacity: 'show'}, 150);
			eventElementControl.animate({opacity: 'show'}, 150);
		});
		eventElementControl.click(function(event) {
			element.find('.event-nav').detach();
			eventElements.animate({opacity: 'hide'}, 150);
			eventElementControl.animate({opacity: 'hide'}, 150, function () {
				calendar.animate({opacity: 'show'}, 150);
				eventElementArr.hide()
			});

		});
		$(eventElementArr[0]).show().addClass('current');
		for (var i = 0; i < eventElementArr.length; i++) {
			$(eventElementArr[i]).attr('data-count', i);			
		}

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
	});

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
	$('.calendar__day').tooltip();
	$('.sliderBlog').slick();
});