<template>
	<div class="c_to_top" @click='topTop' :style='sty' :class='{isCroll:isCroll}'>
		<b></b>
		<i></i>
		<p></p>
	</div>
</template>
<script>
	export default{
		data:function(){
			return{
				isCroll:false,
				myTime:'',
			}
		},
		mounted:function(){
			var self = this;
			window.addEventListener('scroll',function(){
				self.isCroll=true;
				clearTimeout(self.myTime);
				self.myTime = setTimeout(function(){
					self.isCroll=false;
				},200)
			},false);
		},
		methods:{
			topTop:function(){
				$(window).scrollTop(0);
			}
		},
		props:['sty']
	}
</script>
<style lang='scss'>  
.c_to_top{ 
	transition: all 0.2s ease-out;
	position: fixed;
	bottom: 30px;right: 3px;
	width: 50px;height: 50px;
	border:1px solid #000;
	opacity: 0.3;
	z-index: 200;
	transform: scale(0.7);
	b{
		display: block;position: absolute;
		top:50%;left: 50%;
		width: 5px;height: 30px;border:1px solid #000;
		transform:translate(-50%,-50%);
		-webkit-transform:translate(-50%,-50%);
		background-color: #000;
	}
	i{
		display: block;position: absolute;
		top:40%;left: 55%;
		width: 7px;height: 25px;
		transform-origin: top;
		-webkit-transform-origin: top;
		transform:translate(-50%,-50%) rotate(45deg);
		-webkit-transform:translate(-50%,-50%) rotate(45deg);
		background-color: #000;
	}
	p{
		display: block;position: absolute;
		top:40%;left: 45%;
		width: 7px;height: 25px;
		transform-origin: top;
		-webkit-transform-origin: top;
		transform:translate(-50%,-50%) rotate(-45deg);
		-webkit-transform:translate(-50%,-50%) rotate(-45deg);
		background-color: #000;
	}
}
.c_to_top:active{
	opacity: 1;
}
.c_to_top.isCroll{
	opacity: 0!important;
}
</style>