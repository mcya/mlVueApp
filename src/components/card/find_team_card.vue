<template>
	<transition name='fade'>
	<div class="find_team-card">
		<div class='bigImg default_bg'></div>
		<article :style='{width:width}'>
			<header>
				<span>{{inf.content.length>35?inf.content.substr(0,32)+'...':inf.content.substr(0,35)}}</span>
			</header>
			<p>
				<span>出发地:{{inf.start}}</span>
				<span>出发时间:{{inf.time}}</span>
			</p>
			<p class='time'><span>{{inf.send_time}}</span></p>
			<footer>导补<b>¥1000</b>元/团 <i>团</i></footer>

		</article>
	</div>
	</transition>
</template>
<script>
	import { Divider } from 'vux'
	
	export default{
		components:{
			Divider
		},
		data:function(){
			return{

			}
		},
		computed:{
			width:function(){
				
				return parseInt($(window).width() - 2*(13/20)*window.rem)-81+'px';
				 
			}
		},
		props:['inf'],
		created:function(){
			console.log(this.width);
		},
		methods:{

		}
	}
</script>
<style lang='scss'>
.find_team-card{
	min-height: 135px;
	background-color: #fff; 
	margin:0;padding:0;
	font-size: 0;
	.bigImg{
		display: inline-block;
		height: 107px;
		width: 76px;
		margin:(13/20)+rem;
		/*background-color: red;*/
	}
	article{
		.time{
			margin:13px 0 5px;
		}
		margin-top:(13/20)+rem;
		display: inline-block;
		border-bottom:1px solid #cbc;
		padding-bottom:13px;
		vertical-align: top;
		color: #000;
		font-size: (16/20)+rem;
		header{
			height: 38px;
			font-size: 0;
			width: (260/268)*100%;
		}
		header:before{
			display: inline-block;
			content: '';
			height: 100%;
			width: 0;
			vertical-align: middle;
		}
		footer i{
			font-style: normal;
			display: inline-block;
			height: 26px;width: 26px;
			border:2px solid #ff4240;
			color:#ff4240;
			position: absolute;
			right: -40px;top:50%;
			font-size: 22px;
			transform:translateY(-50%) scale(0.45) ;
			/*transform:translateY(-50%) scale(0.4) ;*/
			line-height: 26px;text-align: center;
			z-index: 500;
		}
		header span{
			font-size: (15/20)+rem;
		}
		footer{
			font-size: 16px;
		}
		header span,footer{
			
			position: relative;
			line-height: 17px;
			vertical-align: middle;
			display: inline-block;

			color: #000;
			word-break:break-all;
			b{
				font-size:1em;
				color:#ff4240;
				font-weight: 200;
			}
		}
		p{
			span{
				font-size: 12px;
				color: #707070;
			}
		}
	}
}
</style>