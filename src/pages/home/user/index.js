require(["../../../static/conf/config.js"], function() {
	require(["jquery", "sw"], function($, Swiper) {
		$(".tab-area .cate-item:gt(0)").hover(function() {
			$(this).css("background-color", "#584946");
		}, function() {
			$(this).css("background-color", "#fe6434");
			$(".tab-area .active").css("background-color", "#584946");
		});

		$(".sort-type li:first").addClass("active");
		$(".sort-type li").on("click", function() {
			$(this).siblings().removeClass("active");
			$(this).addClass("active");
		});

		$(document).scroll(function() {
			if ($(document).scrollTop() > 417) {
				$(".tab-area").addClass("fixed");
				$(".fluid-left").addClass("fixed");
			} else {
				$(".tab-area").removeClass("fixed");
				$(".fluid-left").removeClass("fixed");
			}
		});

		var mySwiper = new Swiper('.swiper-container', {
			//autoplay: true,
			//loop: true,
			pagination: {
				el: '.swiper-pagination'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		});

		let cid = window.location.search.split("=")[1];
		let p = 1;
		let sort = "new";
		$(function() {
			//疯抢排行榜的数据，只需要sort=new
			$.ajax({
				url: "http://localhost:8000/pdd",
				type: "get",
				data: {
					cid: cid,
					sort: sort,
					p: p
				},
				dataType: "json",
				success: function(d) {
					var list1 = Array.from($(".item"));
					list1.forEach(function(item, i) {
						$(item).children("img").attr("src", d.data[i].img_url);
						$(item).parent().attr("href", "http://zshpldbz.com" + d.data[i].deal_url);
						$(item).children(".title").text(d.data[i].title);
						$(item).children(".price").text("领券后价———" + d.data[i].price);
					});
					var list2 = Array.from($(".item1"));
					list2.forEach(function(item, i) {
						i += 7;
						$(item).children("img").attr("src", d.data[i].img_url);
						$(item).parent().attr("href", "http://zshpldbz.com" + d.data[i].deal_url);
						$(item).children(".title").text(d.data[i].title);
						$(item).children(".price").text("领券后价———" + d.data[i].price);
					});
					var list3 = Array.from($(".item2"));
					list3.forEach(function(item, i) {
						i += 13
						$(item).children("img").attr("src", d.data[i].img_url);
						$(item).parent().attr("href", "http://zshpldbz.com" + d.data[i].deal_url);
						$(item).children(".title").text(d.data[i].title);
						$(item).children(".price").text("领券后价———" + d.data[i].price);
					});
					let html = "";
					for (let i = 0; i < 20; i++) {
						if (i % 5 == 4) {
							html += "<div class='zk-item' style='margin:0'>";
						} else {
							html += "<div class='zk-item'>";
						}
						html += "<a class='fl goods-item' href='http://zshpldbz.com" + d.data[i].deal_url + "'>";
						html += "<img class='img-area' src='" + d.data[i].img_url + "'>";
						html += "<p class='title-area'>";
						html += "<i class='i_pdd'></i>";
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
		$("#moreCoupon").on("click", function() {
			p += 1;
			$(function() {
				//疯抢排行榜的数据，只需要sort=new
				$.ajax({
					url: "http://localhost:8000/pdd",
					type: "get",
					data: {
						cid: cid,
						sort: sort,
						p: p
					},
					dataType: "json",
					success: function(d) {
						let html = "";
						for (let i = 0; i < 20; i++) {
							if (i % 5 == 4) {
								html += "<div class='zk-item' style='margin:0'>";
							} else {
								html += "<div class='zk-item'>";
							}
							html += "<a class='fl goods-item' href='http://zshpldbz.com" + d.data[i].deal_url + "'>";
							html += "<img class='img-area' src='" + d.data[i].img_url + "'>";
							html += "<p class='title-area'>";
							html += "<i class='i_pdd'></i>";
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
				url: "http://localhost:8000/pdd",
				type: "get",
				dataType: "json",
				data: {
					cid: cid,
					sort: sort,
					p: p
				},
				success: function(d) {
					let html = "";
					for (let i = 0; i < 20; i++) {
						if (i % 5 == 4) {
							html += "<div class='zk-item' style='margin:0'>";
						} else {
							html += "<div class='zk-item'>";
						}
						html += "<a class='fl goods-item' href='http://zshpldbz.com" + d.data[i].deal_url + "'>";
						html += "<img class='img-area' src='" + d.data[i].img_url + "'>";
						html += "<p class='title-area'>";
						html += "<i class='i_pdd'></i>";
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
		})
	})
})
