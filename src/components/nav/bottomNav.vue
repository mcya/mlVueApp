<template>
	<transition name='nav-slide' >
		<div  class="pc-fixed c-nav bottomc-nav" v-show='hide' ><!-- :style='{opacity:hide,display:islive?"block":"none"}' -->
			<div class="frosted-glass"></div>
		    <a  :class='{active:active==1}' :href="httpHeader+'/index.html#/players_list'" >
		        <i class="daoyou" ></i>
		        <p class="c-nav-item-text">导游</p>
		    </a>router-link
		    <a href='#/my_moment' :class='{active:active==2}'  class="c-nav-item" @click.stop.prevent='isNotapp($event)'>
		        <i class="quanzi"></i>
		        <p class="c-nav-item-text">圈子</p>
		    </a>

		    <a :class='{active:active==3}' :href="httpHeader+'/index.html#/have_fun'" >
		        <i class="fun"></i>
		        <p class="c-nav-item-text" style="margin-left: 3px">游玩</p>
		    </a>
		     <a :class='{active:active==4}'   href='#/guider_me'>
		        <i class="my_page"></i>
		        <p class="c-nav-item-text" style="margin-left:0px">我</p>
		    </a>
		    <!-- <a href="http://static.mlxing.com/index.html#/tour" style='font-size: 0'>
		        <i class="fond" ></i>
		        <p class="c-nav-item-text" >发现</p>
		    </a>  -->
		</div>
	</transition>
</template>
<script>
	export default{
		data:function(){
			return{
				hide:true,
				islive:true,
				myTime:'',
			}
		},
		computed:{
			httpHeader(){
				return window.staticUrl;
			}
		},
		props:['active'],
		mounted:function(){//2
			var self = this;
			var lastPlace=0;
			var winHeight = $(window).height();
			window.addEventListener('scroll',function(){
				var winTop = $(window).scrollTop();
				if(winTop>lastPlace && self.hide!=false && winHeight<winTop){
					self.myTime=setTimeout(function(){

					},1000)
						self.hide = false;
						self.islive = false;
				}else if(!self.islive && winTop<lastPlace-5 ||winTop<winHeight){
					clearTimeout(self.myTime);
					self.islive = true;
					self.hide = true;
				}
				lastPlace = winTop;
			})
		},
		methods:{
			isNotapp:function(e){//不是app就跳转
				var ua = navigator.userAgent;
				if(ua.search(/MicroMessenger/i)>-1 && !window.isTest){
					location.href='http://front.oss.mlxing.com/front/html/weixin2app/index.html#/home';
				}else{
					this.$router.push({name:'my_moment'});
				}
			}
		}
	}
</script>
<style lang="scss">
	.bottomc-nav{
		border-top:1px solid #ccc;
		.frosted-glass{
            position: absolute;
           	width:100%;height:100%;
           	top:0;left:0;
           	background-color: #fff;
            background-size:100% 100%;
			opacity:0.9;
			z-index:-1;
		}
		transition:all 0.3s ease;
		.active{
			color:rgba(186, 6, 5, 1)!important;
		}
		.active{
			.daoyou{
				background-image: url(../../icon/t_daoyou.png);
			}
			.quanzi{
				background-image: url(../../icon/t_quanzi.png);
			}
			.fun{
				background-image: url(../../icon/t_haowan.png);
			}
			.my_page{
				background-image: url(../../icon/t_index.png);
			}
		}
		font-size: 0px;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		z-index: 10;
		a,b{
			font-weight:200;
			display: block;
			float: left;
			height: 48px;
			width: 25%;
			padding-top: 3px;
			text-align: center;
			color:rgba(137,137,137,1);
			font-size:0;
			p{
				padding-top:2px;
				text-align: center;color:inherit;
				// margin-left:2px;
				font-size:12px;
				transform:scale(0.83);
			}
		}
		i{
			-webkit-background-size: 100% 100%;
	        background-size: 100% 100%;
	        //transform:scale(1.08) translate(1px,2px);
	        display: inline-block;margin-bottom:2px;
		}
		// .fond{
		// 	background-image: url(../../icon/f_my.png);
		// 	transform:scale(1.4) translate(1px,2px);
		// }
		.daoyou{
			width:25px;height:25px;
			background-image: url(../../icon/f_daoyou.png);
		}
		.quanzi{
			width:28px;height:25px;
			background-image: url(../../icon/f_quanzi.png);
		}
		.my_page{
			width:21px;height:25px;
			background-image: url(../../icon/f_index.png);
		}
		.fun{
			width:29px;height:27px;margin-bottom:0px;
			background-image: url(../../icon/f_haowan.png);
		}
	}
</style>
