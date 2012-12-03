$(function() {

	/**
	 * Listeners
	 */
	$('#resume-sections a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	})

	
	/**
	 * Onload Actions
	 */
	$('#resume-sections a:first').tab('show');
});