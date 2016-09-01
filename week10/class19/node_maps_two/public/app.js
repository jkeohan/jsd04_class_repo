$(document).ready(function () {

	$.ajax({
		url: '/geo',
		type: 'GET',
		success: function (response) {
			console.log(response);
		},
		error: function (xhr) {
			console.log(xhr);
		}
	});

})
