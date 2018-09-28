$(document).ready(() => {
	$('#isCookerTrue').on('click', () => {
		if($(this).prop("checked", true)){
			$('#form-tupper').stop().slideDown("speed");
		}
	})
	$('#isCookerFalse').on('click', () => {
		if($(this).prop("checked", true)){
			$('#form-tupper').stop().slideUp("speed");
		}
	}) 
});