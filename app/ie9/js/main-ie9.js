$(document).ready(function (){
	$(function(){
		setTimeout(function (){
			$('[data-toggle="tooltip"]').tooltip('dispose');

		}, 100)
		$('[data-toggle="tooltip"]').each(function (i, item){
			var title = $($(this).data('original-title')).text();
			$(this).attr('title', title)
		})
	});

	// hide select arrow
 	var selectWrapper = '<div/>';
	var selectHide = '<span/>';
	var select = $('select');
	var selectInnerHeight = $(select).actual('innerHeight', { display: 'inline-block' });
	var selectWidth = $(select).actual('width');
	var selectInnerWidth = $(select).actual('innerWidth');
	var selectDisplay = $(select).css('display');

	selectWrapper = $(selectWrapper).css({
		position: 'relative',
		display: selectDisplay,
		zIndex: 0
	});

	selectHide = $(selectHide).css({
		position: 'absolute',
		right: selectInnerWidth - selectWidth,
		top: '50%',
		height: selectInnerHeight - 1,
		width: '1.7em',
		marginTop: '1px',
		transform: 'translateY(-50%)',
		background: '#fff',
		zIndex: '5',
	});
	// selectWrapper = $(selectWrapper);
	$(select).css({
		zIndex: 1,
	});

	$(select).wrap(selectWrapper).parent().append(selectHide)

})