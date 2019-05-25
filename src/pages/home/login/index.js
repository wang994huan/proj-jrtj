require(["../../../static/conf/config.js"], function() {
	require(["jquery", "vali", "bootstrap"], function($, v, b) {
		$(".login").bind("click", function() {
			let data = {
				username: $(".username").val(),
				password: $(".password").val(),
			};
			console.log(data);
		})
	});
});
