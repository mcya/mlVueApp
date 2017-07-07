<template>
	<div class="lottery">
		<red-bag-two :show="isShow" fn="clsFn" @clsFn="closeFun"></red-bag-two>
	</div>
</template>
<script>
	import c_btn from '../../components/btn.vue'
	import redbag from '../../components/redbag2.vue'
	export default{
		name:'lottery',
		data(){
			return {
				//myScroll:null,
				isShow:true,
			}
		},
		mounted:function(){
		},
		components:{
			"c-btn":c_btn,
			"red-bag-two":redbag
		},
		methods:{
			showFun:function(){
				$('.wrap').addClass("bounceInDown").removeClass("bounceOutUp");
				this.isShow = true;
			},
			closeFun:function(){
				var self = this;
				$('.wrap').addClass("bounceOutUp").removeClass("bounceInDown");
				setTimeout(function(){
					self.isShow = false;
				},600)
			}
		}
	}
</script>
<style lang="scss">
	.lottery{
		position: absolute;
		top:0;right:0;bottom:0;left:0;
		background: url(../../data/annual_mobile.jpg) no-repeat center top;
		background-size: 100% 100%;
	}

</style>