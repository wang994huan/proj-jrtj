require(["../../../static/conf/config.js"], function() {
	require(["jquery", "vali", "bootstrap"], function($, v, b) {
		$(".regis").bind("click", function() {
			let data = {
				username: $(".username").val(),
				password: $(".password").val(),
				login : false,
				goodslist : {}
			};
			var array = [];
			let pass = true;
			if (localStorage.getItem("yonghu")) {
				console.log(localStorage.getItem("yonghu"));
				array = JSON.parse(localStorage.getItem("yonghu"));
				console.log(array);
				for (var i = 0; i < array.length; i++) {
					if (array[i].username == data.username) {
						console.log(array[i].username);
						console.log(data.username);
						pass = false;
						alert("用户名已存在")
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
