<template>
	<div class="recharge">
		<div class="bank-item">
			<div class=" bank-card">
				<i></i>
				<section>
					<p>微信支付</p>
				</section>
				<em></em>
			</div>
			<p class="tips">该卡本次最多可充值<span>1,000.00</span></p>
		</div>
		<div class="cash">
			<label>金额</label>
			<input type="number" id="money" name="money" placeholder="请输入充值金额">
		</div>
		<c-btn text="充值" fn="tfn" @tfn="toRecharge()"></c-btn :alertShow='alertShow'>
		<c-alert show=true :text='alertText' :style='{top:alertShow?"0%":"-15%",transform:"translate(-50%,0)",transition:"all 0.5s ease-in"}'></c-alert>
		<c-popup v-show='popShow' :text='popStr' fn="close" v-on:close="closePop()"></c-popup>
	</div>
</template>
<script>
	import c_btn from '../../components/btn.vue'
	import c_alert from '../../components/alert.vue'
	import c_popup from '../../components/popup.vue'
	import $pay_module from '../../widget/pay/pay_module.js'
	export default{
		name:"recharge",
		data(){
			return{
				title:'账号充值',				
				alertShow:false,
				alertText:'',
				popShow:false,
				popStr:'',
				userInfo:{
					userId:'',
					bank:'',
					maxRecharge:''
				}
			}
		},
		created:function(){
			var title = document.getElementsByTagName('title')[0];
			title.innerHTML = this.title;
		},
		components:{
			"c-btn":c_btn,
			"c-alert":c_alert,
			"c-popup":c_popup
		},
		methods:{
			showAlert:function(str){
				var self = this;
				this.alertShow = true;
				this.alertText = str;
				setTimeout(function(){
					self.alertShow = false;
					self.alertText = "";
				},1500)
			},
			wxPay:$pay_module,
			closePop:function(){
				this.popShow = false;
			},
			wxPaySuccess:function(res){
				if(res){
					setTimeout(function(){
						window.location.href= staticUrl + '/zhaotuan/index.html#/guider_me';
					},0)
			    }else{
			    	setTimeout(function(){
				      	alert('支付未成功');
				    },0)
			    }
			},
			toRecharge:function(){
				window.wxSuccess = this.wxPaySuccess;
				var win = window;
				var self = this;
				var money = parseFloat(document.getElementById('money').value);
				var max = parseFloat($('.tips span').text().split('.')[0].replace(",",""));
				if(!money || money<0.00){
					this.showAlert("充值金额不正确");
				}else if(money>max){
					this.showAlert("不能超出最大充值金额");
				}else{
					this.wxPay({
				        fn:'mlxapp.chargeMoney',
				        url: baseUrl +"/wechat/indent?trade_type=JSAPI",
				        params:{
				            total_fee:money,
				            handle:"wxSuccess"
				        },
				        callback:win.wxSuccess //需要全局方法才能调用回调函数
			      	})
				}
			}
		}
	}
	
</script>
<style lang="scss">
	.recharge{
		min-height: 100%;
		background-color: #eaeaea;
		.bank-item{
			padding-top: (13/20)+rem;
			.bank-card{
				height:37px;
				line-height:37px;
				padding: (10/20)+rem;
				padding-left: (19/20)+rem;
				background-color: #fff;
				i{
					display:inline-block;
					height:37px;
					width:37px;
					margin-right:(15/20)+rem;
					border-radius: 100%;
					vertical-align: top;
					background:url(../../icon/wx_pay.png) no-repeat;
				}
				section{
					width:70%;
					height:37px;
					line-height:37px;
					display:inline-block;
					text-align:left;
					vertical-align: top;
					p{
						color: #000;
						font-size:18px;
					}
					span{
						color:#747474;
					}
				}
				em{
					position:absolute;
					right:(16/20)+rem;
					display:inline-block;
					width:7px;
					height:37px;
					vertical-align: middle;
					background-image: url(../../icon/arrow-right.png);
					background-repeat: no-repeat;
					background-position: center;
					 background-size: 100%;
				}
			}
			.tips{
				margin-left: (15/20)+rem;
				margin-bottom: (8/20)+rem;
				color:#747474;
			}
		}
		.cash{
			height:37px;
			line-height:37px;
			padding: (10/20)+rem;
			padding-left: (19/20)+rem;
			background-color: #fff;
			label{
				font-size:16px;
				color: #000;
				margin-right: 1rem;
			}
			input{
				font-size:16px;
				width:70%;
			}
		}
		.commit-btn{
			height: 47px;line-height: 47px;
			width: (348/375)*100%;text-align: center;background-color: rgba(245,89,77,1);
			margin:0 auto;color:#fff;font-size: 18px;border-radius: 3px;margin-top: 25px;
		}
		.commit-btn:active{
			background-color: rgba(255,78,78,0.8);
		}
	}
</style>