require(["../../../static/conf/config.js"], function() {
	require(["jquery", "sw"], function($, Swiper) {
		$(".tab-area .cate-item:gt(0)").hover(function() {
			$(this).css("background-color", "#584946");
		}, function() {
			$(this).css("background-color", "#fe6434");
		});

		$(".sort-type li:first").addClass("active");
		$(".sort-type li").on("click", function() {
			$(this).siblings().removeClass("active");
			$(this).addClass("active");
		});
		$(document).scroll(function() {
			if ($(document).scrollTop() > 406) {
				$(".tab-area").addClass("fixed");
				$(".hori-cate-area").addClass("fixed");
			} else {
				$(".tab-area").removeClass("fixed");
				$(".hori-cate-area").removeClass("fixed");
			}
		});
		let cid = window.location.search.split("=")[1];
		let p = 1;
		let sort = "new";
		$(function() {
			$.ajax({
				url: "http://localhost:8000/cate",
				type: "get",
				data: {
					cid: cid,
					sort: sort,
					p: p
				},
				dataType: "json",
				success: function(d) {
					let html = "";
					for (let i = 0; i < d.data.length; i++) {
						if (i % 5 == 4) {
							html += "<div class='zk-item' style='margin:0'>";
						} else {
							html += "<div class='zk-item'>";
						}
						html += "<a class='fl goods-item' href='../deal/index.html?goodId=" + d.data[i].goods_id + "&title=" + d.data[
								i].title +
							"&href=" + d.data[i].click_url +
							"&src=" +
							d.data[i].img_url + "&desc=" + d.data[i].seo_desc + "&yishou=" + d.data[i].volume + "&yuanjia=" + d.data[
								i].org_price + "&price=" +
							d.data[i].price + "'>";
						html += "<img class='img-area' src='" + d.data[i].img_url + "'>";
						html += "<p class='title-area'>";
						if (d.data[i].shop_type == "taobao") {
							html += "<i class='i_taobao'></i>";
						}
						if (d.data[i].shop_type == "tmall") {
							html += "<i class='i_tmall'></i>";
						}
						html += "<span class='post-free'>包邮</span>" + d.data[i].title;
						html += "</p>";
						html += "<div class='raw-price-area'>现价:￥" + d.data[i].org_price;
						html += "<p class='sold fr'>已售" + d.data[i].volume;
						html += "</div>";
						html += "<div class='info'>";
						html += "<div class='price-area'>";
						html += "<span class='price'>";
						html += "￥";
						let number = d.data[i].price.split(".");
						html += "<em class='number-font'>" + number[0] + "</em>"
						html += "<em class='decimal'>." + number[1] + "</em>"
						html += "<i></i>"
						html += "</span>";
						html += "</div>";
						let quan = parseInt(d.data[i].coup_price);
						html += "<span class='coupon-click'>券" + quan + "元";
						html += "</span></div></a></div>";
					}
					$(".zk-list").append(html);
				}
			})
		});
		$(".sort-type li").on("click", function() {
			let clicksort = Array.from($(".sort-type").children());
			clicksort.forEach(function(item) {
				if ($(item).hasClass("active")) {
					sort = $(item).attr("data-sort");
				}
			});
			$(".zk-list").children().remove();
			$.ajax({
				url: "http://localhost:8000/cate",
				type: "get",
				dataType: "json",
				data: {
					cid: cid,
					sort: sort,
					p: p
				},
				success: function(d) {
					let html = "";
					for (let i = 0; i < d.data.length; i++) {
						if (i % 5 == 4) {
							html += "<div class='zk-item' style='margin:0'>";
						} else {
							html += "<div class='zk-item'>";
						}
						html += "<a class='fl goods-item' href='../deal/index.html?goodId=" + d.data[i].goods_id + "&title=" + d.data[
								i].title +
							"&href=" + d.data[i].click_url +
							"&src=" +
							d.data[i].img_url + "&desc=" + d.data[i].seo_desc + "&yishou=" + d.data[i].volume + "&yuanjia=" + d.data[
								i].org_price + "&price=" +
							d.data[i].price + "'>";
						html += "<img class='img-area' src='" + d.data[i].img_url + "'>";
						html += "<p class='title-area'>";
						if (d.data[i].shop_type == "taobao") {
							html += "<i class='i_taobao'></i>";
						}
						if (d.data[i].shop_type == "tmall") {
							html += "<i class='i_tmall'></i>";
						}
						html += "<span class='post-free'>包邮</span>" + d.data[i].title;
						html += "</p>";
						html += "<div class='raw-price-area'>现价:￥" + d.data[i].org_price;
						html += "<p class='sold fr'>已售" + d.data[i].volume;
						html += "</div>";
						html += "<div class='info'>";
						html += "<div class='price-area'>";
						html += "<span class='price'>";
						html += "￥";
						let number = d.data[i].price.split(".");
						html += "<em class='number-font'>" + number[0] + "</em>"
						html += "<em class='decimal'>" + number[1] + "</em>"
						html += "<i></i>"
						html += "</span>";
						html += "</div>";
						let quan = parseInt(d.data[i].coup_price);
						html += "<span class='coupon-click'>券" + quan + "元";
						html += "</span></div></a></div>";
					}
					$(".zk-list").append(html);
				}
			})
		});
		$("#moreCoupon").on("click", function() {
			p += 1;
			$.ajax({
				url: "http://localhost:8000/cate",
				type: "get",
				data: {
					cid: cid,
					sort: sort,
					p: p
				},
				dataType: "json",
				success: function(d) {
					let html = "";
					for (let i = 0; i < d.data.length; i++) {
						if (i % 5 == 4) {
							html += "<div class='zk-item' style='margin:0'>";
						} else {
							html += "<div class='zk-item'>";
						}
						html += "<a class='fl goods-item' href='../deal/index.html?goodId=" + d.data[i].goods_id + "&title=" + d.data[
								i].title +
							"&href=" + d.data[i].click_url +
							"&src=" +
							d.data[i].img_url + "&desc=" + d.data[i].seo_desc + "&yishou=" + d.data[i].volume + "&yuanjia=" + d.data[
								i].org_price + "&price=" +
							d.data[i].price + "'>";
						html += "<img class='img-area' src='" + d.data[i].img_url + "'>";
						html += "<p class='title-area'>";
						if (d.data[i].shop_type == "taobao") {
							html += "<i class='i_taobao'></i>";
						}
						if (d.data[i].shop_type == "tmall") {
							html += "<i class='i_tmall'></i>";
						}
						html += "<span class='post-free'>包邮</span>" + d.data[i].title;
						html += "</p>";
						html += "<div class='raw-price-area'>现价:￥" + d.data[i].org_price;
						html += "<p class='sold fr'>已售" + d.data[i].volume;
						html += "</div>";
						html += "<div class='info'>";
						html += "<div class='price-area'>";
						html += "<span class='price'>";
						html += "￥";
						let number = d.data[i].price.split(".");
						html += "<em class='number-font'>" + number[0] + "</em>"
						html += "<em class='decimal'>." + number[1] + "</em>"
						html += "<i></i>"
						html += "</span>";
						html += "</div>";
						let quan = parseInt(d.data[i].coup_price);
						html += "<span class='coupon-click'>券" + quan + "元";
						html += "</span></div></a></div>";
					}
					$(".zk-list").append(html);
				}
			})
		})
		$(".search-btn").on("click", function() {
			let key = Array.from($(".search-input"))[0].value;
			let searchData = {
				sort: "new",
				p: 1,
				k: key
			};
			window.location = "../search/index.html?k=" + searchData.k + "&sort=" + searchData.sort + "&p=" + searchData.p;
		});
	})
})
