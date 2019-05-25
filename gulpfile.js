const gulp = require("gulp");
const webserver = require("gulp-webserver");
const express = require("express");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const autoprefixer = require("gulp-autoprefixer");
const https = require("https");
const http = require("http");

gulp.task("compileJS", () => {
	gulp.src("src/scripts/**/*.js")
		.pipe(babel({
			presets: ["@babel/env"]
		}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/scripts"))
	gulp.src("src/pages/**/*.js")
		.pipe(babel({
			presets: ["@babel/env"]
		}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/pages"))
	gulp.src("src/static/**/*").pipe(gulp.dest("dist/static"));
})
gulp.task("compileCSS", () => {
	gulp.src("src/styles/**/*.scss")
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(csso())
		.pipe(gulp.dest("dist/styles"))
})
gulp.task("compileHTML", () => {
	gulp.src("src/pages/**/*.html")
		.pipe(gulp.dest("dist/pages"))
})


gulp.task("server", function() {
	//静态资源服务器 : 9999
	gulp.src("dist")
		.pipe(webserver({
			livereload: true,
			port: 9999
		}))
	gulp.watch("src/pages/**/*.js", ["compileJS"]);
	gulp.watch("src/scripts/**/*.js", ["compileJS"]);
	gulp.watch("src/styles/**/*.scss", ["compileCSS"]);
	gulp.watch("src/pages/**/*.html", ["compileHTML"])

	//接口代理服务器
	let app = express();
	app.get("/", (req, res) => {
		res.setHeader("Access-Control-Allow-Origin", "*"); //cors
		res.setHeader("Content-Type", "text/plain; charset=utf8")
		res.end("welcom");
	})
	app.get("/home", (req, res) => {
		res.setHeader("Access-Control-Allow-Origin", "*"); //cors
		res.setHeader("Content-Type", "text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "zshpldbz.com",
			path: "/index/choicegoods",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	
	//首页
	//http://zshpldbz.com/jiu/list.html?k=&sort=new&size=21&p=1
	app.get("/index", (req, res) => {
		let sort = req.query.sort;
		let p = req.query.p;
		let cid = req.query.cid;
		/* req.setHeader("User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36");
		req.setHeader("X-Requested-With","XMLHttpRequest"); */
		res.setHeader("Access-Control-Allow-Origin", "*"); //cors
		res.setHeader("Content-Type", "text/plain; charset=utf8");
		
		let proxy = http.request({
			hostname: "zshpldbz.com",
			path: "/index/choicegoods.html?k=&cid=" + cid + "&sort=" + sort + "&size=20&p=" + p,
			//path: "/jiu/list.html?k=&sort=" + sort + "&size=21&p="+p,
			method: 'get',
			headers:{
				"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
				"X-Requested-With": "XMLHttpRequest"
			}
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	//分类查询
	//http://zshpldbz.com/cate/list.html?k=&cid=1&sort=new&size=20&p=1   18个分类
	app.get("/cate", (req, res) => {
		let cid = req.query.cid;
		let sort = req.query.sort;
		let p = req.query.p;
		res.setHeader("Access-Control-Allow-Origin", "*"); //cors
		res.setHeader("Content-Type", "text/plain; charset=utf8")

		let proxy = http.request({
			hostname: "zshpldbz.com",
			path: "/cate/list.html?k=&cid=" + cid + "&sort=" + sort + "&size=20&p=" + p,
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	});
	//疯抢排行榜
	//http://zshpldbz.com/rank/list.html?sort=new&size=20&p=1  疯抢排行榜
	app.get("/rank", (req, res) => {
		let cid = req.query.cid;
		let sort = req.query.sort;
		let p = req.query.p;
		res.setHeader("Access-Control-Allow-Origin", "*"); //cors
		res.setHeader("Content-Type", "text/plain; charset=utf8");
		let proxy = http.request({
				hostname: "zshpldbz.com",
				path: "/rank/list.html?k=&cid=" + cid + "&sort=" + sort + "&size=20&p=" + p,
				method: 'get'
			}, (response) => {
				response.pipe(res);
			});
		proxy.end();
	});
	//九块九包邮
	app.get("/jiu", (req, res) => {
		let sort = req.query.sort;
		let p = req.query.p;
		console.log("======="+sort,p);
		res.setHeader("Access-Control-Allow-Origin", "*"); //cors
		res.setHeader("Content-Type", "text/plain; charset=utf8")

		let proxy = http.request({
			hostname: "zshpldbz.com",
			path: "/jiu/list.html?k=&sort=" + sort + "&size=20&p=" + p,
			//path: "/jiu/list.html?k=&sort=" + sort + "&size=21&p="+p,
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	//拼多多
	app.get("/pdd", (req, res) => {
		let cid = req.query.cid;
		let sort = req.query.sort;
		let p = req.query.p;
		res.setHeader("Access-Control-Allow-Origin", "*"); //cors
		res.setHeader("Content-Type", "text/plain; charset=utf8");
		let proxy = http.request({
				hostname: "zshpldbz.com",
				path: "/rank/list.html?k=&cid=" + cid + "&sort=" + sort + "&size=20&p=" + p,
				method: 'get'
			}, (response) => {
				response.pipe(res);
			});
		proxy.end();
	});
	//京东
	app.get("/jd", (req, res) => {
		let cid = req.query.cid;
		let sort = req.query.sort;
		let p = req.query.p;
		res.setHeader("Access-Control-Allow-Origin", "*"); //cors
		res.setHeader("Content-Type", "text/plain; charset=utf8");
		let proxy = http.request({
				hostname: "zshpldbz.com",
				path: "/rank/list.html?k=&cid=" + cid + "&sort=" + sort + "&size=20&p=" + p,
				method: 'get'
			}, (response) => {
				response.pipe(res);
			});
		proxy.end();
	});
	//搜索
	//http://zshpldbz.com/search/list.html?k=%E8%BE%A3%E6%9D%A1&sort=new&size=20&p=1
	//http://zshpldbz.com/search/index.html?sort=new&p=1&k=%E8%BE%A3%E6%9D%A1
	app.get("/search", (req, res) => {
		let sort = req.query.sort;
		let p = req.query.p;
		let k = req.query.k;
		
		res.setHeader("Access-Control-Allow-Origin", "*"); //cors
		res.setHeader("Content-Type", "text/plain; charset=utf8");
		let proxy =  http.request({
				hostname: "zshpldbz.com",
				path: "/search/list.html?k=" + k + "&sort=" + sort + "&size=20&p=" + p,
				method: 'get',
				/* headers :{
					"Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
				} */
			}, (response) => {
				response.pipe(res);
			});
		proxy.end();
	});
	
	//商品详情
	app.get("/deal", (req, res) => {
		let goodId = req.query.goodId;
		res.setHeader("Access-Control-Allow-Origin", "*"); //cors
		res.setHeader("Content-Type", "text/plain; charset=utf8");
		let proxy =  http.request({
				hostname: "zshpldbz.com",
				path: "/deal/gooddesc.html?goodId=" + goodId ,
				method: 'get',
				/* headers :{
					"Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
				} */
			}, (response) => {
				response.pipe(res);
			});
		proxy.end();
	});
	
	//商品详情
	/* app.get("/goods", (req, res) => {
		let url = req.query.url;
		console.log("------"+url);
		res.setHeader("Access-Control-Allow-Origin", "*"); //cors
		res.setHeader("Content-Type", "text/plain; charset=utf8");
		let proxy =  http.request({
				hostname: "zshpldbz.com",
				path: "/deal/gooddesc.html?goodId=" + goodId ,
				method: 'get',
			}, (response) => {
				response.pipe(res);
			});
		proxy.end();
	}); */
	
	app.listen(8000);
})


gulp.task("build", ["compileJS", "compileCSS", "compileHTML"])
