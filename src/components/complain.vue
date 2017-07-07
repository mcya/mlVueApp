<template>
	<div  class='c_complain' >
		<c-alert :text='alertText' :show='alertShow'></c-alert>
		<div class="overlay" v-if='init' @click='cancel'></div>
		<div @click='appear' class="logo"></div>
		<transition v-if='init' name="slide-fade" mode="out-in" appear>
			<ul>
				<li @click='checked(radioValue1)'><p>{{radioValue1}}</p></li>
				<li @click='checked(radioValue2)'><p>{{radioValue2}}</p></li>
				<li @click='checked(radioValue3)'><p>{{radioValue3}}</p></li>
				<li @click='cancel'><p>{{radioValue4}}</p></li>
			</ul>
		</transition>
	</div> 
	
</template>
<script>
	import c_alert from './alert.vue';
	export default{
		data:function(){
			return{
				radioValue1:'不感兴趣',
				radioValue2:'内容质量差',
				radioValue3:'举报',
				radioValue4:'取消',
				init:false,
				alertShow:false,
				alertText:'',
			}
		},
		components:{
			'c-alert':c_alert
		},
		props:{
			url:'',
			biz_type:{
				type:String,
				require:true,
			},
			biz_id:{
				type:String,
				require:true,
			},
			jubao:'',
		},
		watch:{
			init:function(value){
				if(value==true){
					document.addEventListener('touchmove',this.handle,false);
				}else{
					document.removeEventListener('touchmove',this.handle,false);


				}
			}
		},
		methods:{
			handle:function(e){
				e.preventDefault();
			},
			appear:function(){
				if(location.hash=='#/my_moment'){
					this.$emit(this.jubao);
				}else{
					this.init = true;
				}
				
			},
			checked:function(value){//提交投诉
				var self = this;
				if(this.alertShow==true){
					return
				}
				if(self.$store.state.mid=='-1'){
					this.alertShow=true;
					this.alertText='请登录';
					setTimeout(function(){
						self.alertShow=false;
						self.init=false;
					},1000)
					return
				}
				
				this.alertShow=true;
				this.alertText='正在提交';
				var params = {
							"biz_id":self.biz_id,
							"biz_type":self.biz_type,
							"content":value,
							"mid":self.$store.state.mid,
						};
				$.ajax({
					url:self.url,
					data:{data:JSON.stringify(params)},
					dataType:'jsonp',
					success:function(res){
						self.alertText='感谢你的反馈，工作人员将会尽快核实。';
						setTimeout(function(){
							self.alertShow=false;
							self.init = false;
						},2000)
					},
					error:function(){
						self.alertText='提交失败';
						setTimeout(function(){
							self.alertShow=false;
						},1000)
					}
				})
			},
			checkedInput:function(e){
				e.srcElement.previousElementSibling.click();
			},
			cancel:function(){
				this.init=false;
			}
		}
	}
</script>
<style lang='scss'>
.c_complain{

	.logo{
		height: 20px;width: 20px;background-image: url(../icon/jubao.png);-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
		opacity: 0.45;
	}
	.overlay{
		position: fixed;z-index: 999;left: 0;top:0;
		width: 100%;height: 100%;background-color: rgba(0,0,0,0.5);
	}
	ul{
		position: fixed;
		bottom: 0;left: 0;z-index: 1000;width: 100%;height: 38%;padding-top:0.1%;
		background-color: #ddd;
		li{
			color:#000;font-size: 30px;font-weight: 200;width: 100%;
			height: 24.9%;text-align: center;background-color: #fff;
			border-bottom: 1px solid #e8e8e8;

		}
		li:before{
			display: inline-block;content:'';height: 100%;
			width: .1px;vertical-align: middle;

		}
		li:nth-of-type(4){
			margin-top: 2px;
		}
		p{
				display: inline-block;vertical-align: middle;font-size: 16px;
			}
		li:active{
			background-color: #e0e0e0;
		}
	}
}

</style>