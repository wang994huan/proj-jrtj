require(["../../../static/conf/config.js"],function(){
	require(["jquery","sw"],function($,Swiper){
		$(".tab-area .cate-item:gt(1)").hover(function() {
			$(this).addClass("active");
		}, function() {
			$(this).removeClass("active");
		});
		
		$(document).scroll(function(){ 
			if($(document).scrollTop() > 417){
				$(".tab-area").addClass("fixed");
				$(".fluid-left").addClass("fixed");
			}else{
				$(".tab-area").removeClass("fixed");
				$(".fluid-left").removeClass("fixed");
			}
		});
		let cid = window.location.search.split("=")[1];
		let p = 1;
		$(function() {
			//疯抢排行榜的数据，只需要sort=new
			$.ajax({
				url: "http://localhost:8000/rank",
				type: "get",
				data: {cid : cid,sort : "new",p : p},
				dataType: "json",
				success: function(d) {
					let html = "";
						for(let i=0;i<d.data.length;i++){
							html += "<div>"
							html += "<div class='item'>";
							html += "<a  target='_black' href='../deal/index.html?goodId=" + d.data[i].goods_id + "&title=" + d.data[
								i].title +
							"&href=" + d.data[i].click_url +
							"&src=" +
							d.data[i].img_url + "&desc=" + d.data[i].seo_desc + "&yishou=" + d.data[i].volume + "&yuanjia=" + d.data[
								i].org_price + "&price=" +
							d.data[i].price  + "'>";
							html += "<div class='img-area'>";
							html += "<img  src='" +d.data[i].img_url + "'></div></a>";
							html += "<a target='_black' href='../deal/index.html?goodId=" + d.data[i].goods_id + "&title=" + d.data[
								i].title +
							"&href=" + d.data[i].click_url +
							"&src=" +
							d.data[i].img_url + "&desc=" + d.data[i].seo_desc + "&yishou=" + d.data[i].volume + "&yuanjia=" + d.data[
								i].org_price + "&price=" +
							d.data[i].price  + "'>";
							html += "<div class='content'>";
							html += "<div class='title'>"+d.data[i].title+"</div>";
							html += "<div claaa='desc'>"+d.data[i].rec_desc+"</div>"
							if(d.data[i].shop_type == "taobao"){
								html += "<i class='i_taobao'></i>- 2小时销量" + d.data[i].volume + "件";
							}
							if(d.data[i].shop_type == "tmall"){
								html += "<i class='i_tmall'></i>- 2小时销量" + d.data[i].volume + "件";
							}
							html += " <div class='price'><span class='normal'>券后价&nbsp;&nbsp;</span>" + d.data[i].price;
							html += "</div></div></a>";
							html += "<div class='right'><div class='btn'><a href='http://zshpldbz.com"+d.data[i].deal_url+"'target='_blank'>"
							html += d.data[i].coup_price+"元券</a></div></div></div></div>";
						}
					$("#couponList").append(html);
				}
			})
		});
		$("#moreCoupon").on("click",function(){
			p += 1;
			$(function() {
				//疯抢排行榜的数据，只需要sort=new
				$.ajax({
					url: "http://localhost:8000/rank",
					type: "get",
					data: {cid : cid,sort : "new",p : p},
					dataType: "json",
					success: function(d) {
						let html = "";
							for(let i=0;i<d.data.length;i++){
								html += "<div>"
								html += "<div class='item'>";
								html += "<a  target='_black' href='../deal/index.html?goodId=" + d.data[i].goods_id + "&title=" + d.data[
								i].title +
							"&href=" + d.data[i].click_url +
							"&src=" +
							d.data[i].img_url + "&desc=" + d.data[i].seo_desc + "&yishou=" + d.data[i].volume + "&yuanjia=" + d.data[
								i].org_price + "&price=" +
							d.data[i].price  + "'>";
								html += "<div class='img-area'>";
								html += "<img  src='" +d.data[i].img_url + "'></div></a>";
								html += "<a target='_black' href='../deal/index.html?goodId=" + d.data[i].goods_id + "&title=" + d.data[
								i].title +
							"&href=" + d.data[i].click_url +
							"&src=" +
							d.data[i].img_url + "&desc=" + d.data[i].seo_desc + "&yishou=" + d.data[i].volume + "&yuanjia=" + d.data[
								i].org_price + "&price=" +
							d.data[i].price  + "'>";
								html += "<div class='content'>";
								html += "<div class='title'>"+d.data[i].title+"</div>";
								html += "<div claaa='desc'>"+d.data[i].rec_desc+"</div>"
								if(d.data[i].shop_type == "taobao"){
									html += "<i class='i_taobao'></i>- 2小时销量" + d.data[i].volume + "件";
								}
								if(d.data[i].shop_type == "tmall"){
									html += "<i class='i_tmall'></i>- 2小时销量" + d.data[i].volume + "件";
								}
								html += " <div class='price'><span class='normal'>券后价&nbsp;&nbsp;</span>" + d.data[i].price;
								html += "</div></div></a>";
								html += "<div class='right'><div class='btn'><a href='http://zshpldbz.com"+d.data[i].deal_url+"'target='_blank'>"
								html += d.data[i].coup_price+"元券</a></div></div></div></div>";
							}
						$("#couponList").append(html);
					}
				})
			});
		});
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