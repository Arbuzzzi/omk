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


})