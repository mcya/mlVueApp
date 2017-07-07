<template>
		<div v-show='show' class="c_alert">
				{{text}}
		</div>
</template>
<script>
		export default{
			data:function(){
				return{
					
				}
			},
			props:['show','text']
		}
</script>
<style>
	.c_alert{
		position: fixed;display: inline-block;
		left: 50%;top:45%;
		border-radius: 4px;
		font-size: 12px;line-height: 28px;color: #fff;text-align: center;
		background-color: rgba(0,0,0,0.68);
		padding:4px 10px;z-index: 9999;
		transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);
		min-width: 80%;
	}
</style>