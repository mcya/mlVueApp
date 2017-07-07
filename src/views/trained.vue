<template>
	<div class="trained">
		<div class="swiper-container lunb">
			<div class="swiper-wrapper">
			    <div class="swiper-slide"><img src="../data/guangz.jpg"></div>
			    <div class="swiper-slide"><img src="../data/ocean.png"></div>
			    <div class="swiper-slide"><img src="../data/travel.jpg"></div>
			</div>
			<div class="swiper-pagination xiaoyuan"></div>
		</div>
		<div class="intro1">
			<h1>视频课程</h1>
			<p>讲师：朱莲</p>
			<p>58期：怎么利用心理学和自身优势</p>
			<button>立即报名</button>
		</div>
		<div class="nav">
			<ul>
				<li id="tuijian"  v-on:click="tuij">推荐</li>
				<li class="tab2" v-on:click="kech">课程</li>
			</ul>
			<!--<div class="qiehuan"></div>-->
			<div class="qiehuan2"></div>
		</div>
		<div class="xian"></div>
		<div class="main" id="main1" v-show="pan">
			<div class="m" v-for="result in results" >
				<a  style="font-size:0px;">
					<div class="m1" v-on:click="click1(result,results)"><img :src="imgHead(img_url+result.covers_url) "></div>
					<!--<div class="play_tubiao"><img src="../data/Group Copy 14.png"></div>-->
					<div class="m2">
						
						<dl>
							<dt v-on:click="click1(result,results)">
								<p class="teacher_p huise"><span class="m2_img tu_shipin" v-if='result.media_type==1'><img src="../data/Shape.png"></span>
									<span class="m2_img" v-if='result.media_type==2'><img src="../data/Combined_Shape.png"></span>大咖：{{result.teacher}} {{result.title}}</p>
								<p>{{result.browse_num}}人学过</p>
								<div style="clear:both;"></div>
							</dt>
							<dd v-bind:style="{ marginTop: activepx}" v-on:click="go_zhifu(result,results)"><span v-text="result.price"></span></dd>
						</dl>
						<div style="clear:both;"></div>
					</div>
				</a>
			</div>	
		</div>
		<footer>
			<div class="foo">
				<ul>
					<li v-on:click="go_daka">
						<p class="icon-red"><img :src="daka_tu_red"></p>
						<p class="icon-red">大咖课堂</p>
					</li>
					<li v-on:click="playCurrent"><img src="../data/play_bb.png"></li>
					<a href="http://static.mlxing.com/travelApp/html/index.html">
						<li>
							<p><img src="../data/考级题库.svg" style="color: red;"></p>
							<p>题库练习</p>
						</li>
					</a>
					<li v-on:click="go_my_course">
						<p><img src="../data/我的课程.svg"></p>
						<p>我的课堂</p>
					</li>
				</ul>
			</div>
		</footer>
		<div class="tuijian" v-show=!pan>
			<div class="jiangshi">
				<div class="js1">
					<ul>
						<li>热门大咖</li>
						<li><span class="span3" v-on:click='go_gengduo'>更多</span><span><img src="../data/jiantou2.gif"></span></li>
					</ul>
				</div>
				<div class="js2 demo-iframe">
					<a href="#/intro">
					<div class="box">
						<div class="js2-1" v-for="recommend_teacher in recommend_teachers" v-on:click="click2(recommend_teacher,recommend_teachers)">
							<dl>
								<dt><img :src="imgHead(recommend_teacher.headimgurl)"><span class="xb"><img src="../data/Group 2.png"></span></dt>
								<dd v-text="recommend_teacher.truename"></dd>
							</dl>
						</div>
					</div>
					</a>
				</div>
			</div>
			<div class="xian"></div>
			
			
			<div class="kecheng">
				<div class="jiangshi" id="h">
					<div class="js1">
						<ul>
							<li>推荐课程</li>
							<li><span class="span3" v-on:click='go_kc_gengduo'>更多</span><span><img src="../data/jiantou2.gif"></span></li>
						</ul>
					</div>
				</div>
				<div class="main">
			<div class="m" v-for="result in results" >
				<!--<a href="#/play">-->
					<div class="m1" v-on:click="click1(result,results)"><a :href="result.content_url"><img :src="imgHead(result.covers_url)"></a></div>
					<!--<div class="play_tubiao"><img src="../data/Group Copy 14.png"></div>-->
					<div class="m2">
						<dl>
							<dt v-on:click="click1(result,results)">
								<p class="teacher_p huise"><span class="m2_img tu_shipin" v-if='result.media_type==1'><img src="../data/Shape.png"></span>
									<span class="m2_img" v-if='result.media_type==2'><img src="../data/Combined_Shape.png" style="width: 20px;height: 20px;"></span>{{result.title}}</p>
								<p>{{result.browse_num}}人学过</p>
							</dt>
							<dd v-on:click="go_zhifu(result,results)"><span v-text="result.price"></span></dd>
							<div style="clear:both;"></div>
						</dl>
						<div style="clear:both;"></div>
					</div>
				<!--</a>-->
			</div>

		</div>
			</div>
		</div>
		<div class="chuli"></div>
		<c-alert :show='danmu_true' :text='danmu_tishi'></c-alert>
	</div>
</template>
<style lang='scss'>
@font-face {font-family: "iconfont";
      src: url('../font/iconfont.eot'); /* IE9*/
      src: url('../font/iconfont.eot#iefix') format('embedded-opentype'), /* IE6-IE8 */
      url('../font/iconfont.woff') format('woff'), /* chrome, firefox */
      url('../font/iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
      url('../font/iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
    }

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.clearfloat{clear:both} 
*{
	margin: 0;
	padding: 0;
}
/*body{
	max-width: 640px;
	height: 100%;
	margin: 0 auto;
}*/
a{
	font-size:0px;
}
.trained .swiper-pagination span{
	background: #FFFFFF;
}
.trained{position: relative;}
.trained li{list-style: none;}
.trained .dak{
	width: 100%;
	height: 47px;
	background: #6e6e6e;
	position: fixed;
	top: 0;
}
.trained .dak img{
	height: 16px;
	margin-left: 14px;
	position: relative;
}
.trained .dak1{
	position: absolute;
	top: 16px;
	left: 0;
}
.trained .dak2{
	width: 71px;
	height: 100%;
	margin: 0 auto;
	
}
.trained .span2{
	height: 47px;
	margin-top: 10px;
	display: block;
	line-height: 50px;
	font-size: 17px;
	color: white;
	font-weight: bold;
}
.trained .lunb{
	width: 100%;
	/*height: (138/20)+rem;*/
	/*margin-top: 46px;*/
	overflow: hidden;
	position: relative;
}
.trained .lunb li{
	position: absolute;
	top: 0;
	left: 0;
}
.trained .lunb img{
	width: 100%;
	height: 188px;
}
.trained .intro1{
	position: absolute;
	top: (17/20)+rem;
	left: (15/20)+rem;
	width: 60%;
	z-index: 1000;
	/*text-shadow: [Color,X-offset,Y-offset,Blur];*/
	 text-shadow:rgba(0,0,0,0.5) 0px 2px 4px; 	
}
.trained .intro1 h1{font-size: (14/20)+rem;margin-bottom: 0.5rem;color: white;}
.trained .intro1 p{line-height: (20/20)+rem;color: white;font-size: 12px;}
.trained .intro1 button{width: 98px;height: 27px;line-height:12px; background: #fd5a5d;border: 1px solid #fd5a5d;border-radius:4px;font-size: 12px;color: white;margin-top: 0.3rem;}

.xiaoyuan span{
	 margin-left: 13px;
}

.trained .span1{margin-left: 0px;color: white;font-size: 15px;}
.trained .span2{margin: 0 auto;}
.trained .nav{
	width: 100%;
	height: 44px;
	position: relative;
}
.trained .nav li{
	float: left;
	width: 10%;
	text-align: center;
	line-height:44px ;
	font-weight: bold;
}
.trained .nav li:nth-of-type(1){
	margin-left: 31.2%;
}
.trained .nav li:nth-of-type(2){
	margin-left: 20%;
}
.trained .qiehuan{
	width: 60px;
	height: 1px;
	background: #FF4500;
	position: absolute;
	top: 43px;
	left: 28%;
}
.trained .qiehuan2{
	width: 60px;
	height: 1px;
	background: #FF4500;
	position: absolute;
	top: 43px;
	left: 28%;
}
.trained .xian{
	width: 100%;
	height: 13px;
	background: #EAEAEA;
}
.trained .main{
	width: 95.5%;
	height: 100%;
	padding: 7px;
}
.trained .m{
	width: 100%;
	min-height: (150/20)+rem;
	margin-bottom: 0.437rem;
	position: relative;
}
.trained .m1{
	width: 100%;
	min-height: 100%;
	font-size: 0px;
}
.trained .m1 img{
	width: 100%;
	/*max-height: (250/20)+rem;*/
	height: 103px;
	border-radius:4px 4px 0 0;
}
.trained .m2{ 
	width: 99%;
	/*height: 40px;*/
	background: #e5e5e5;
	border:2px solid #e5e5e5;
	border-bottom-right-radius:5px;
	border-bottom-left-radius:5px;
	padding-bottom: 5px;
	}
.trained .m2 dd,dt{
	float: left;
	font-size: 13px;	
}
.trained .m2 dd{
	height: 100%;
}
.trained .m2 p{
	color: #727272;
	line-height: 21px;
	/*text-indent:10px;*/
	margin-left: 10px;
}
.trained .m2_img img{
	height: 20px;
	width: 20px;
    position: absolute;
    top: 7px;
    left: 7px;
}
.trained .tu_shipin img{
	width: 20px;
	height: 15px;
}
.trained .teacher_p{
	width: 11rem;
	/*text-overflow:ellipsis;overflow:hidden;white-space:nowrap;*/
}
.trained .m2 .huise{
	color: #000000;
}
.trained .m2 dd{float: right;margin-right: 10px;
		height: 23px;
		width: 89px;
		text-align: center;
		line-height: 23px;
		margin-top: 10px;
		font-size: 13px;
		color: white;
		background: #FF4E4E;
		border: 1px solid #FF4E4E;
		border-radius: 5px;
}
.trained .m2 dd span{ color: white;}
.trained .play_tubiao{
	position: absolute;
	top: 32px;
	left: 42.4%;
}
.trained .play_tubiao img{
	width: 42px;
	height: 43px;
	
}
.trained .foo{
	width: 100%;
	height: 50px;
	position: fixed;
	bottom: 0;
	z-index: 1111;
	background: white;
}
.trained .foo li{
	width: 25%;
	float: left;
	text-align: center;
	line-height: 12px;
	font-size: 10px;
	color: #727272;
	font-size:12px;
}
.trained .foo p{
	margin-top: 5px;
	font-size:12px;
}
.trained .foo li:nth-of-type(1) img{
	height: 19px;
	
}
.trained .foo .icon{
	font-size: 19px;
}
.trained .foo .icon-red{
	color:#f2503b;
}
.trained .foo li:nth-of-type(2) img{
	width: 80%;
	display: block;
	width: 60px;
	height: 60px;
	border: 5px solid white;
	border-radius: 50%;
	position: relative;
	top: -28px;
}
.trained .chuli{
	height: 35px;
}


.trained .tuijian{
	width: 100%;
	height: 100%;
}
.trained .jiangshi{
	width: 100%;
	height: 160px;
	/*margin-left: 13px;*/
	margin-top: 11px;
	overflow: hidden;
}
.trained .jiangshi li:nth-of-type(1){
	float: left;
	font-size: 15px;
	color: #010101;
	/*font-weight: bold;*/
	/*margin-top: 5px;*/
	margin-left: 13px;
}
.trained .jiangshi li:nth-of-type(2){
	float: right;
	margin-right: 15px;
	font-size: 12px;
	color: #6f6f6f;
}
.trained .jiangshi li img{
	height: 14px;
	vertical-align:middle;
	margin-bottom: 4px;
}
.trained .span3{
	margin-right: 6px;
	line-height: 1px;
	color: #7e7e7e;
}
.trained .js1{
	height: 28px;
	margin-bottom: 15px;
}
.trained .js2{
	width: 100%;
	height: 200px;
	overflow-y:auto;
}
.trained .js2-1{
	width:79px;
	float: left;
	margin-right: 23px;
	/*margin-right:6.5%;*/
}
.trained .js2-1 dt{
	width:79px;
	height: 79px;
	/*border: 1px solid #d8d8d8;*/
	background: #d8d8d8;
	border-radius: 50%;
	margin-bottom: 5px;
}
.trained .js2-1 dt img{
	width: 79px;
	height: 79px;
	border-radius: 50%;
}
.trained .js2-1 dt span{
	position: relative;
	top: -24px;
	left: 64px;
	width: 15px;
	height: 15px;
	/*border: 1px solid white;*/
	border-radius: 50%;
	/*background: #3588ba;*/
	color: white;
	font-size: 10px;
	/*-webkit-transform: scale(0.75);
	transform: scale(0.75);*/
	display: block;
	text-align: center;
}
.trained .js2-1 dt span img{
	width: 16px;
	height: 16px;
}
.trained .js2-1 dd{
	width: 100%;
	text-align: center;
	line-height: 26px;
	font-size: 12px;
	font-weight: 600;
}
.trained .box{
	width: 100000px;
	/*需要动态获取*/
}
.trained #h{
	height: 25px;
}
</style>
<script>
import SwiperCSS from '../widget/swiper/swiper.min.css'
import Swiper from '../widget/swiper/swiper.min.js'
import $headerimg from '../icon/find_team.png';
import c_alert from '../components/alert';
import daka_tu_red from  '../data/daka_red.svg';

	export default{
		components:{
			'c-alert':c_alert,
		},
		name:'trained',
		data:function(){
			return {
				results:[],
				pan:false,
				img_url:'',
				recommend_teachers:[],
				media_type:'',
				page:1,
				qiehuan_num:28,//切换的数值
				danmu_true:false,//弹幕提示
				danmu_tishi:'已经加载完了',//弹幕内容
				daka_tu_red:daka_tu_red,//大咖红色图标
				activepx:'',
				biz_id:1,//课程id
			}
		},
		name:'trained',
		mounted:function(){//挂载时候执行的函数
			var self=this;
			this.ajax();
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: 5000,//可选选项，自动滑动
				autoplayDisableOnInteraction : false,
				paginationClickable :true,
				pagination: '.swiper-pagination',
			});
			
			var title=document.getElementsByTagName('title')[0];
			title.innerHTML = '大咖讲堂';
			$.ajax({
					url:baseUrl+'/course_info/teacher_lists',
					data:{page:1},
					dataType:'jsonp',
					success:function(data){
						console.log(data);
						self.recommend_teachers=data.result;
						$.each(self.recommend_teachers,function(index,item){
							if(item.headimgurl == null)
							{
								item.headimgurl=$headerimg;
							}
						});
//						console.log(self.recommend_teachers);
						
					}	
			});
			//懒加载
			window.onscroll=function(){
				var t =document.documentElement.scrollTop||document.body.scrollTop;
				//获取整张页面高度
				var height=$(document).height();
				t=height-t;
				if(t<=1200){
					self.page=self.page+1;
					self.ajax();
					
				}
			var scrollTop = $(this).scrollTop();
		　　var scrollHeight = $(document).height();
		　　var windowHeight = $(this).height();
			　　if(scrollTop + windowHeight == scrollHeight){
			　　　　//alert("已经到最底部了！");
					self.danmu_true=true;
					self.danmu_tishi='已经加载完了';
					//height=10000;
					self.f=setInterval(function(){
						self.danmu_true=false;
						//window.clearInterval(f);
						//self.f=2;
						},3000);
			　　}
				if(scrollTop + windowHeight != scrollHeight){
					self.danmu_true=false;
					window.clearInterval(self.f);
				}
			}
			
		},
		methods:{
			imgHead:function(res){
				var oss='?x-oss-process=image/resize,w_'+$(window).width();
				
				if(res.indexOf('http')>-1){
					return res+oss
				}else{
					return 'http://mlx.oss.mlxing.com/'+res+oss;
				}
			},
			tuij:function(){
				console.log('tuij');
				this.pan=false;
				this.results=[];
				this.page=1;
				this.ajax();
				var $qiehuan=$('.qiehuan2');
				this.qiehuan_num=28;
				$qiehuan.css('left',this.qiehuan_num+'%');
			},
			kech:function(){
				var self=this;
				console.log('kech');
				this.pan=true;
				this.results=[];
				this.page=1;
				this.ajax();
				var $qiehuan=$('.qiehuan2');
//				this.f=setInterval(function(){
//					self.qiehuan_num=self.qiehuan_num+10;
//					if(self.qiehuan_num>=58){
//						self.qiehuan_num=58;
//						window.clearInterval(self.f);
//					}
//				},1000);
				
				this.qiehuan_num=58;
				$qiehuan.css('left',this.qiehuan_num+'%');
			},
			click1:function(result_obj){
				console.log(result_obj);
				console.log("click1");
				//localStorage 存储id
				 localStorage.setItem("trained_course_id",result_obj.id);
				 console.log(localStorage.getItem('trained_course_id'));
				 this.play_id=result_obj.id;
				 console.log(result_obj);
				 var self=this;
				this.$router.push({name:'play',params:{id:self.play_id}});
			},
			click2:function(result_obj){
				
				console.log(result_obj);
				//localStorage 存储id
				 localStorage.setItem("trained_teacher_id",result_obj.mid);
				 console.log(localStorage.getItem('trained_teacher_id'));
			},
			go_play:function(){
				location.hash="#/play";
			},
			ajax:function(){
				var ft=this.pan;
				var self=this;
					$.ajax({
					url:baseUrl+'/course_info/course_lists',
					data:{is_recommend:!ft,page:self.page},
					dataType:'jsonp',
					async:true,
					success:function(data){
//						self.results=data.result;
						console.log(data.result);
						
						for(var j=0;j<data.result.length;j++){
							self.results.push(data.result[j]);
						}
						
						//处理price价格为0.00时
						for(var i=0;i<self.results.length;i++){
								if(self.results[i].price=="0.00"){
								self.results[i].price='免费';
							}
						}
//						setTimeout(function(){
//							var height=$('.m2').height();
//							$('.m2').css('background','red');
//							console.log(height);
//							},100);
						
					}	
				})
			},
			go_play:function(){
				
			},
			go_gengduo:function(){
				location.hash="#/js_gengduo";
			},
			go_kc_gengduo:function(){
				location.hash="#/kc_gengduo";
			},
			go_my_course:function(){
				location.hash="#/baoming";
			},
			go_daka:function(){
				
			},
			getCache:function(k){
				var v = localStorage.getItem(k);
				var o=JSON.parse(v);
				return o;
			},
			saveCache:function(k,v){
				var o=JSON.stringify(v);
    			localStorage.setItem(k,o);
			},
			playCurrent:function()
			{
				var currID=this.getCache('CurrentPlayID');
				if(currID==null)
				{
					//
					return;
				}
				this.$router.push({name:'play',params:{id:currID}});
			},
			go_zhifu:function(obj){
				console.log(obj.price);
				if(obj.price != '免费'){
					this.$router.push({name:'zhifu',params:{teacher:obj.teacher,title:obj.title,price:obj.price,biz_id:obj.id}});	
				}
				if(obj.price == '免费'){
					this.$router.push({name:'play',params:{id:obj.id}});
				}
				//this.$router.push({name:'zhifu',params:{teacher:obj.teacher,title:obj.title,price:obj.price,biz_id:obj.id}});
			}
		},
	}	
</script>