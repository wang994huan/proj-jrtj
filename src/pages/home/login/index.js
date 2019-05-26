require(["../../../static/conf/config.js"], function() {
	require(["jquery", "vali", "bootstrap"], function($, v, b) {
		$(".login").bind("click", function() {
			let data = {
				username: $(".username").val(),
				password: $(".password").val(),
				login : true
			};
			var array = [];
			let pass = true;
			if (localStorage.getItem("yonghu")) {
				array = JSON.parse(localStorage.getItem("yonghu"));
				for (var i = 0; i < array.length; i++) {
					if (array[i].username == data.username) {
						pass = false;
						alert("用户名或者密码错误");
					} 
				}
			}
			if(pass){
				array.push(data);
			}
			window.localStorage.setItem("yonghu", JSON.stringify(array));
		})
	});
});
