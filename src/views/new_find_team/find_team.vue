<template>
	<div class="new_find_team">
		<header>
			<ol>
				<li class="vertical">
					<span>全部分类</span>
					<c-sanjiao sty='{"vertical-align":"middle","margin":"5px 0 0 3px"}'></c-sanjiao>
				</li>
				<li class="vertical middle">
					<i></i>
					<span>综合排序</span>
					<c-sanjiao sty='{"vertical-align":"middle","margin":"5px 0 0 3px"}'></c-sanjiao>
					<i></i>
				</li>
				<li class="vertical">
					<span>品质/价格</span>
					<c-sanjiao sty='{"vertical-align":"middle","margin":"5px 0 0 3px"}'></c-sanjiao>
				</li>
			</ol>
		</header>
		<nav>
			<ul class="vertical">
				<li class="vertical"><p class="vertical"><span>广州出发</span></p></li>
				<li class="vertical"><p class="vertical" @click='date_value=true'><span>{{choseDate||'出发日期'}}</span></p></li>
				<li class="vertical"><p class="vertical"><span>行程天数</span></p></li>
				<li class="vertical"><p class="vertical"><span>主题</span></p></li>
			</ul>
		</nav>
		<!-- ******************轮播图 ******************-->
		
		<div class='swiper-container'>
			<ul class='swiper-wrapper'>
				<li class='swiper-slide '>
					<div class="swiper-zoom-container banner default_bg" style="padding-top:50%;">
						
					</div>
				</li>
				<li class='swiper-slide '>
					<div class="swiper-zoom-container banner default_bg" style="padding-top:50%;">
						
					</div>
				</li>
				<li class='swiper-slide '>
					<div class="swiper-zoom-container banner default_bg" style="padding-top:50%;">
						
					</div>
				</li>
			</ul>
			<div class="swiper-pagination"></div>
		</div>
		
		<!-- ******************内容区 ******************-->
		<div style='background-color:#fff'>
			<c-card  v-for='item in list' :inf='item'></c-card>
		</div>
		<datelist v-model='date_value' fn='abc' @on-date-hide='date_value=false' @on-check-date='checkdate'></datelist>
	</div>
</template>

<script>
// t_publish
	import c_sanjiao from '../../components/icon/sanjiao.vue'
	import c_card from '../../components/card/find_team_card.vue'
	import datelist from '../../components/datelist.vue'
	import SwiperCSS from '../../widget/swiper/swiper.min.css'
	import Swiper from '../../widget/swiper/swiper.min.js'
	export default{
		data:function(){
			return{
				choseDate:'',
				date_value:false,
				list:[
					{content:'泰国曼谷＋芭提雅6天5晚团游1251241241241342241241342241241342241241342241241342241241342342341241342342342',start:'广州',time:'12-1',send_time:'1小时前',price:'1000'},
					{content:'广东肇庆2日游需要一名男导游',start:'深圳',time:'1-13',send_time:'5小时前',price:'400'},
					{content:'泰国曼谷＋芭提雅6天5晚团游1251241241241342241241342241241342241241342241241342241241342342341241342342342',start:'广州',time:'12-1',send_time:'1小时前',price:'1000'},
					{content:'广东肇庆2日游需要一名男导游',start:'深圳',time:'1-13',send_time:'5小时前',price:'400'},
					{content:'泰国曼谷＋芭提雅6天5晚团游1251241241241342241241342241241342241241342241241342241241342342341241342342342',start:'广州',time:'12-1',send_time:'1小时前',price:'1000'},
					{content:'广东肇庆2日游需要一名男导游',start:'深圳',time:'1-13',send_time:'5小时前',price:'400'},
				]
			}
		},
		components:{
			'c-sanjiao':c_sanjiao,
			'c-card':c_card,
			datelist
		},
		methods:{
			checkdate(value){
				this.date_value=false;
				this.choseDate=value;
			}
		},
		mounted(){
			var self = this;
			setTimeout(function(){
				
				self.swiper = new Swiper('.new_find_team .swiper-container', {
					initialSlide:0,//初始位置
					autoplay: 2000,
					pagination : '.swiper-pagination',
					autoplayDisableOnInteraction:false
				})
				
			},0)
		}
	}
</script>
<style lang='scss'>
.new_find_team{
	min-height: 100%;
	background-color: #f0f0f0;
	.swiper-pagination-bullet{
		background-color: #fff;
	}
	>nav{
		ul{font-size: 0;height: 42px;background-color: #f0f0f0;}
		li{
			background-color: #f0f0f0;
			display: inline-block;
			width: 25%;
			vertical-align: middle;
			text-align: center;
			p{
				display: inline-block;
				background-color: #fff;
				height: 29px;
				width: (76/(375*0.25))*100%;
				span{
					display: inline-block;
					line-height: 12px;
					font-size: 12px;
					color: #585858;
				}
			}
		}
	}
	>header{
		background-color: #fff;
		height: 42px;
		ol{font-size: 0;height: 100%;}
		.middle i{
			display: block;
			width: 1px;
			height: 18px;
			background-color: #cbcbcb;
			margin-top: 12px;
		}
		.middle i:nth-of-type(1){
			float: left;

		}
		.middle i:nth-of-type(2){
			float: right;
		}
		li{
			height: 100%;width:33.3%;
			display: inline-block;
			font-size: 0px;
			
			text-align: center;
			vertical-align: middle;
			span{
				display: inline-block;
				vertical-align: middle;
				height: 13px;
				color: #585858;
				font-size: 13px;
				line-height: 13px;
			}
		}
		
	}
}
</style>