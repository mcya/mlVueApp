<template>
	<div class='c_sanjiao' :style='styl'>
		
	</div>
</template>
<script>

	export default{
		data:function(){
			return{

			}
		},
		props:['sty'],
		computed:{
			styl:function(){
				if(typeof this.sty=='object'){
					return this.sty;
				}else{
				
					return JSON.parse(this.sty);
					
				}
			}
		}
	}
</script>
<style lang='scss'>
.c_sanjiao{
	display: inline-block;
	width: 0;height: 0;
	border-style: solid;
	border-width: 5px;
	border-color: #c4c4c4 transparent transparent transparent;
}
</style>
