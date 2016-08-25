$(document).ready(function () {

	$.ajax({
		url: '/geo',
		type: 'GET',
		success: function (response) {
			console.log("this is from ajax",response);
		},
		error: function (xhr) {
			console.log(xhr);
		}
	});

})
