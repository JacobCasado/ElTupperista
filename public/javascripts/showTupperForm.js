$(document).ready(() => {
	$('#isCookerTrue').on('click', () => {
		if($(this).prop("checked", true)){
			$('#form-tupper').stop().slideDown("slow");
		}
	})
	$('#isCookerFalse').on('click', () => {
		if($(this).prop("checked", true)){
			$('#form-tupper').stop().slideUp("slow");
		}
	}) 
});