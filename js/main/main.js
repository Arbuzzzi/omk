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
		console.log(inputId);

		if (thisInp.prop('checked') == false) {
			thisInp.addClass('error');
		} else {
			thisInp.removeClass('error');
		}

		if ($('#' + inputId).hasClass('error') == true) {
			$('label[for='+inputId+']').addClass('label-error')
			console.log('true')
		} 
		if ($('#' + inputId).hasClass('error') != true) {
			$('label[for='+inputId+']').removeClass('label-error')
			console.log('false')

		}
		
	})

	// маска для телефона
	$('input[type="tel"]').mask('9 (999) 999999?999');
	$('input[type="tel"]').on('change focus click', function() {
		$(this)[0].setSelectionRange(0, 0);
	});
	
	$('.menuNavHeader__item').on('mouseenter', function(event) {
		var element = $(event.target).parents('.menuNavHeader__item'),
				elementControl = $(element.data('target'));
		if (elementControl.hasClass('collapse')) {
			elementControl.collapse('show');	

			$(this).on('mouseleave', function(event) {
				elementControl.collapse('hide');
			});
		}
	});
	
	

	function addClassScroll(element, $class) {
		var position = $(this).scrollTop();
		if ($class === undefined) {
			$class = 'scroll';
		}
		if (position >= 200) {
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

	// скрываем элементы во время скроллинга страницы
	$(document).on('scroll', function(event) {
		var position = $(this).scrollTop();

		if (!$('.header').hasClass('.scroll') && position <= 1000 && !$('#headerNavSetting').hasClass('show')) {
			addClassScroll($('.header'));
		}

		if ($('.header').hasClass('scroll')) {
			$('#headerNav').collapse('hide');
			$('#headerNavControl').removeClass('active');
		}

		if ($('.dropdown-menu').hasClass('show')) {
			$('.dropdown-menu').removeClass('show').dropdown('dispose');
		}

	});

	// возвращаем пользователя наверх
	$('#btnToTop').click(function() {
		var destination = 0;
		$('html:not(:animated),body:not(:animated)').animate({
			scrollTop: destination
		}, 800, function () {
			$('#headerNav').collapse('show');
			$('#menuLeftList').collapse('show');
			
		});
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

		checkboxDisabl($(this), 10)
	})

	// настройки скрываются
	$('#headerNavSetting').on('hide.bs.collapse', function () {
		$('.header').css('transform', '');
		$('.overlay').animate({
			opacity: 0
		}, 400, function() {
			$(this).detach()
		});

		$('#headerNavSettingControl').removeClass('active').removeAttr('style');
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
		
		btn.addClass('active');
		$('.menu-left-more__list').removeClass('show');
		$('#navMoreListControl').removeAttr('data-toggle');
		$('#navMoreListControl').dropdown('dispose');
		$('.menu-left-more__button>i').animate({opacity: 'hide'}, 400);
	});

	// левое меню hide 
	$('#menuLeftList').on('hide.bs.collapse', function() {
		var btn = $('#menuLeftListControl');
		btn.removeClass('active');

		$('#navMoreListControl').attr('data-toggle', 'dropdown')
		$('.menu-left-more__button>i').animate({opacity: 'show'}, 400);
	});

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
});