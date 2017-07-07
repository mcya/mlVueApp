<template><!-- 模板 -->
	<div class='c_btn' @click='order' v-bind:style='style'>
		{{text || "提交"}}
	</div>
	
</template>
<script>/*JS*/ 
	export default{
		data:function(){
			return {
				
			}
		},
		props:['text','fn','sty'],
		methods:{
			order:function(){
				this.$emit(this.fn);
			}
		},
		computed:{
			style:function(){
				if(!this.sty){
					return '';
				}
				if(typeof this.sty =='object'){
					return this.sty
				}else{
					return JSON.parse(this.sty);
				}
			},
		},
		created:function(){
			
		}
	}
</script>
<style lang='scss'>/*样式*/
	.c_btn{
		height: 47px;line-height: 47px;
		width: (348/375)*100%;text-align: center;background-color: rgba(255,78,78,0.65);
		margin:0 auto;color:#fff;font-size: 18px;border-radius: 3px;margin-top: 25px;
	}
	.c_btn:active{
		background-color: rgba(255,78,78,1);
	}
</style>