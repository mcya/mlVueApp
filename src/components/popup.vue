<template>
	<div @click='order' class="c_popup">
		<p>{{text||"这是一条提示信息"}}</p>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		props:['text','fn'],
		methods:{
			order:function(){
				this.$emit(this.fn);
			}
		}
	}
</script>
<style lang="scss">
	.c_popup{
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		padding:(60/20)+rem;
		background: rgba(0,0,0,0.68);
		z-index: 9999;
		p{
			position:fixed;
			left:50%;
			top:50%;
			transform: translate(-50%, -50%);
			-webkit-transform: translate(-50%, -50%);
			color: #333;
			padding: 1rem (30/20)+rem;
			border-radius: 5px;
			text-align: center;
			background-color: #fff;
		}
	}
</style>