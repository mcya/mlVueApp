<template>
	<div class='toBigImg '>
		<div class="close icon-cha iconfont" v-on:click='close()'></div>
		<div class='swiper-container'>
			<ul class='swiper-wrapper'>
				<li class='swiper-slide ' v-for='(img,index) in images' ref='imgPage'>
					<div class="swiper-zoom-container">
						<img v-bind:data-src="img" class="swiper-lazy " >
					</div>
				</li>
			</ul>
			<div class="swiper-pagination"></div>
		</div>
	</div>
</template>
<script>
//http://www.swiper.com.cn/api/start/2014/1218/140.html 文档
import SwiperCSS from '../widget/swiper/swiper.min.css'
import Swiper from '../widget/swiper/swiper.min.js'
import loadingIcon from '../icon/loading.png'
	export default{
		data:function(){
			return {
				swiper:'',
			}
		},
		mounted:function(){
			var self = this;
			this.option=true;
			setTimeout(function(){
				if(self.option!=undefined){
					self.swiper = new Swiper('.toBigImg .swiper-container', {
						initialSlide:self.index||0,//初始位置
						pagination : self.isSinger(),
						zoom : self.option.zoom|| true ,//放大
						lazyLoading : true,
					})
				}
			},0)
		},
		methods:{
			close:function(){
				this.$emit(this.closefn);
			},
			isSinger:function(){
				if(this.images.length<=1){
					return false;
				}else{
					return '.swiper-pagination';
				}
			},
		},
		props:['images','index','closefn'],//初始的位置，关闭时候执行的函数，配置swiper的参数。
		
	}
</script>
<style lang='scss'>
	.swiper-slide .swiper-zoom-container:before{
		display: inline-block;width: 0;height: 100%;vertical-align: middle;content: '';
	}
	.toBigImg{
		position: fixed;width: 100%;z-index: 9999;top:0;left:0;
		height: 100%;font-size: 0;background-color: #000;
	}
	.toBigImg .swiper-container{
		width: 100%;height: 100%;
	}
	.toBigImg li:after{
		background-image: url('../icon/loading.png');height: 60px;width: 60px;display: block;position: absolute;top:50%;left: 50%;margin-left: -30px;margin-top: -30px;content: '';background-size: cover;z-index: -1;
		animation: rotate 1s linear infinite;-webkit-animation: rotate 1s linear infinite;
	}
	@keyframes rotate{
		0%{transform: rotate(0deg);-webkit-transform: rotate(0deg);}
		100%{transform: rotate(360deg);-webkit-transform: rotate(360deg);}
	}
	@-webkit-keyframes rotate{
		0%{transform: rotate(0deg);-webkit-transform: rotate(0deg);}
		100%{transform: rotate(360deg);-webkit-transform: rotate(360deg);}
	}
	.toBigImg  .close{
		width: 30px;height: 30px;background-color: #fff;line-height: 32px;text-align: center;border-radius: 50%;font-size: 20px;z-index: 10;opacity: 0.3;
		position: absolute;right: 20px;top:20px;border:2px solid #555;
	}
	.toBigImg .swiper-pagination-bullet{
		background-color: #fff;
	}
	.toBigImg img{
		width: 100%;vertical-align: middle;max-height: 100%;
	}
	.toBigImg ul{
		top:0;left: 0;
	}
	.swiper-slide{
		font-size: 0;
	}
	.toBigImg .swiper-zoom-container{
		font-size: 0;
	}
</style>
<!-- 1、黑色背景
2、图片居中，不拉伸，宽100%；
3、右上角有关闭按钮 -->