
<template>
	<div class='c-moment-bubble' :style='style'>
		<header></header>
	</div>
</template>
<script>
	export default {
		data:function(){
			return{

			}
		},
		props:['sty'],
		computed:{
			style:function(){
				if(typeof this.sty =='object'){
					return this.sty;
				}else if(this.sty !== undefined){
					var obj = JSON.parse(this.sty);
					return obj;
				}
			}
		}
	}
</script>
<style lang='scss'>
.c-moment-bubble{
	$bgc:#f4f4f4;
	margin-top: 9px;
	background-color: $bgc;
	height: 72px;
	margin-right: 0.6rem;
	position: relative;z-index: 1;
	border-radius: 4px;
	header{
		position: absolute;
		height: 0;width: 0;
		top:-18px;left:1.1rem;
		border-width: 9px;
		border-style: solid;
		border-color: transparent  transparent $bgc transparent;
	}
}

</style>