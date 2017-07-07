<template>
	<div class='center_input' >
		<div class="overlay" @click='cancelInput'></div>
		<article ref='content'>
			<textarea v-model='msg' :placeholder='text||"请输入内容"' ref='input'></textarea>
			<button @click='send'>发送</button>
		</article>
		
	</div>
</template>
<script>
	export default {
		data:function(){
			return { 
				msg:'',
			}
		},
		mounted:function(){
			var self = this;
			var a=self.$refs.content;
			a.addEventListener('click', function(){
			    self.$refs.input.focus();
			},false);
			a.click();
			// $('#app').children().css({'height':'100%',overflow:'hidden'})
			// $('.center_input').css({'height':'100%',overflow:'hidden'})
			$(window).scrollTop(0)
			var winWidth=$(window).width();
			if(winWidth==375){
				var winHeight = $(window).height();
				$('.center_input article').css('top',winHeight*0.50+'px');
			}
			document.addEventListener('touchmove',this.handle,false);
		},
		props:['fn','limt','syt','text','tips','close'],
		watch:{
			msg:function(newVal,oldVal){
				if(this.limt!=''){
					if(newVal.length>this.limt){
						this.$emit(this.tips);
						this.msg.slice(0,this.limt);
					}	
				}
			}
		},
		destroyed:function(){
			document.removeEventListener('touchmove',this.handle,false);
		},
		methods:{
			handle:function(e){
				e.preventDefault();
			},
			send:function(){
				if(this.msg==''){
					this.cancelInput();
				}else{
					this.$emit(this.fn,this.msg);
					
				}
				
			},
			cancelInput:function(){
				
				this.$emit(this.close);
			}
		}
	}
</script>
<style lang='scss'>
.center_input{
	.overlay{
		width: 100%;height: 100%;background-color: rgba(0,0,0,0.5);
	}
	width: 100%;height:100%;
	position: fixed;
	z-index:1000;
	top:0;left: 0;
	article{
		position: fixed;top: 45%;left: 0;background-color: #f4f4f4;width: 100%;height: 70%;text-align: center;padding-top:8px;
		textarea{

		display: inline-block;background-color: #fff;width:80%;height: 50px;margin:0 auto;border:1px solid #999;
		background:#ffffff;border:1px solid #eaeaea;border-radius:4px;height:27px;display: inline-block;
		line-height: 27px;padding-left: 4px;vertical-align: middle;
		}
		button{
			font-size:16px;display: inline-block;padding: 0;margin:0;border:0;
			color:#2b9bf0;background-color: inherit;vertical-align: middle;
		}
		
	}
	
}
</style>
