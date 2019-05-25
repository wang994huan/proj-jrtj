require(["../../../static/conf/config.js"], function() {
	require(["jquery", "sw"], function($, Swiper) {
		$(".tab-area .cate-item:gt(0)").hover(function() {
			$(this).css("background-color", "#584946");
		}, function() {
			$(this).css("background-color", "#fe6434");
		});

		$(document).scroll(function() {
			if ($(document).scrollTop() > 400) {
				$(".tab-area").addClass("fixed");
			} else {
				$(".tab-area").removeClass("fixed");
			}
		});
		let goods = window.location.search;
		let goodId = window.location.search.split("goodId=")[1].split("&")[0];
		$(function() {
			$.ajax({
				url: "http://localhost:8000/deal",
				type: "get",
				dataType: "json",
				data: {
					goodId: goodId,
				},
				success: function(d) {
					$(".picture").attr("src", "http://" + goods.split("src=")[1].split("&")[0].split("//")[1].split(".jpg")[0] +
						".jpg");
					$(".zk-content .title h1").text(decodeURI(window.location.search.split("title=")[1].split("&")[0]));
					$(".recommend").text(decodeURI(window.location.search.split("desc=")[1].split("&")[0]));
					$(".small-img1").attr("src", "http://" + goods.split("src=")[1].split("&")[0].split("//")[1].split(".jpg")[
						0] + ".jpg");
					$(".platform .count").text(goods.split("yishou=")[1].split("&")[0]);
					$(".oprice").text("原价 ￥" + goods.split("yuanjia=")[1].split("&")[0]);
					$(".int").text("￥" + goods.split("price=")[1].split("&")[0].split(".")[0]);
					$(".decimal").text("." + goods.split("price=")[1].split("&")[0].split(".")[1]);
					$.ajax({
						url: d.data,
						type: "get",
						dataType: "jsonp",
						jsonpCallback: "mtopjsonp1",
						success: function(su) {
							let data = su.data.wdescContent.pages;
							let length = data.length;
							let html = "";
							su.data.wdescContent.pages.forEach(function(item, i) {
								let src = "";
								if (item.indexOf("https://") != -1) {
									src += item.split("https://")[1].split("<")[0];
									html += "<img style='margin: 1px 5px;width:98%;' src='http://" + src + "'>";
								} else if (item.indexOf(">//") != -1) {
									src += item.split(">//")[1].split("<")[0];
									html += "<img style='margin: 1px 5px;width:98%;' src='http://" + src + "'>";
								} else {
									html +="";
								}
							});
							$(".picture-content").append(html);
						}
					})
				}
			});
		});
		$(".item-list-top span").on("click",function(){
			if($(".picture-content").css("display") == "none"){
				$(".picture-content").css("display","block");
			}else{
				$(".picture-content").css("display","none");
			}
		});

	})
})
