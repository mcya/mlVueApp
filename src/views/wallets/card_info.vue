<template>
	<div class="card_info">
		<p class="disc">请绑定持卡人本人的银行卡</p>
		<ul>
			<li>
				<label>发卡行</label>
				<input type="text" name="name" placeholder="如：工商银行">
			</li>
			<li>
				<label>手机号</label>
				<input type="number" name="number" placeholder="请输入银行预留手机号">
			</li>
			<li>
				<span><input type="checkbox" id="agree" name="agree"> <label for="agree">同意</label></span><a href="#">《用户协议》</a>
			</li>
		</ul>
		<c-btn text="下一步" fn="clickFuc" v-on:clickFuc="nextStep()"></c-btn :alertShow='alertShow'>
		<c-alert show=true :text='alertText' :style='{top:alertShow?"0%":"-15%",transform:"translate(-50%,0)",transition:"all 0.5s ease-in"}'></c-alert>
	</div>
</template>
<script>
	import c_btn from '../../components/btn.vue'
	import c_alert from '../../components/alert.vue'
	export default{
		name:"card_info",
		data(){
			return{
				title:"填写银行卡信息",
				alertShow:false,
				alertText:'',
				cardName:'',
				cardNum:'',
			}
		},
		mounted:function(){
			this.cardName = this.$route.params.name;
			this.cardNum = this.$route.params.number;
		},
		created:function(){
			var title = document.getElementsByTagName('title')[0];
			title.innerHTML = this.title;
		},
		components:{
			"c-btn":c_btn,
			"c-alert":c_alert
		},
		methods:{
			goto:function(url){
				window.location.href = url;
			},
			showAlert:function(str){
				var self = this;
				this.alertShow = true;
				this.alertText = str;
				setTimeout(function(){
					self.alertShow = false;
					self.alertText = "";
				},1500)
			},
			nextStep:function(){
				var type= $('input[name="name"]').val();
				var tel = $('input[name="number"]').val();
				var checked = $('input[name="agree"]').is(':checked');
				var telreg = /^1[34578]\d{9}$/;
				if(!type){
					this.showAlert("请输入正确的卡号类型");
					return false;
				}
				if(!telreg.test(tel)){
					this.showAlert("请输入正确的手机号");
					return false;
				}
				if(!checked){
					this.showAlert("请同意用户协议");
					return false;
				}
				this.goto('#/send_code/'+this.cardName+'/'+this.cardNum+'/'+type+'/'+tel);
			}
		}
	}
</script>
<style lang="scss">
	::placeholder{
		color:#7b7b7b;
	}
	.card_info{
		min-height: 100%;
		background-color: #ececec;
		.disc{
			padding:(10/20)+rem (15/20)+rem;
			font-size: 12px;
			color: #909090;
		}
		ul{
			li{
				padding:(16/20)+rem;
				margin-bottom: (30/20)+rem;
				background-color:#fff;
				label{
					display: inline-block;
					width: 52px;
					font-size:17px;
					color:#4f4f4f;
					margin-right:(15/20)+rem;
				}
				input{
					width: 70%;
					font-size: 17px;
					color:#7b7b7b;
				}
				&:nth-child(2){
					margin-bottom: 0;
				}			
				&:last-child{
					margin:0;
					background-color:#ececec;
					span{
						font-size:17px;
						input{
							position: relative;
							top:2px;
							width:15px;
							height: 15px;
						}
						label{
							width:auto;
							margin-right:0;
						}
					}
					a{
						font-size:17px;
						color:#8eb1e5;
					}
				}
			}
		}
	}
</style>