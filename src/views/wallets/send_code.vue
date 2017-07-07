<template>
	<div class="send_code">
		<p class="disc">绑定银行卡需要短信确认，验证码已发送至手机：{{maskNub}}， 请按提示操作。</p>
		<div class="send-box">
			<input type="number" name="code" placeholder="填写验证码">
			<span v-show="btnShow" @click="sendMsg">获取验证码</span>
			<span v-show="!btnShow" class="disabled">{{timer}}s 重新获取</span>
		</div>
		<c-btn text="下一步" fn="clickFuc" v-on:clickFuc="nextStep()"></c-btn :alertShow='alertShow'>
		<c-alert show=true :text='alertText' :style='{top:alertShow?"0%":"-15%",transform:"translate(-50%,0)",transition:"all 0.5s ease-in"}'></c-alert>
		<div class="no-code"><a>收不到验证码？</a></div>
		<c-pop v-show=popupShow :text="popupText"></c-pop>
	</div>
</template>
<script>
	import c_btn from '../../components/btn.vue'
	import c_alert from '../../components/alert.vue'
	import c_pop from '../../components/popup.vue'
	export default{
		name:"send_code",
		data(){
			return{
				title:"填写银行卡信息",
				maskNub:'136****0000',
				alertShow:false,
				alertText:"",
				popupShow:false,
				btnShow:true,
				popupText:'提示信息',
				timer:60,		//默认倒数60秒
				timeStop:false, //默认是停止的，但界面加载之后会变成false
				Interval:null,	//setInterval的对象
				cardName:'',
				cardNum:'',
				cardType:'',
				tel:''
			}
		},
		mounted:function(){
			this.cardName = this.$route.params.name;
			this.cardNum = this.$route.params.number;
			this.cardType = this.$route.params.type;
			this.tel = this.$route.params.tel;
			if(this.tel){
				this.maskNub = this.tel.substring(0,3)+"****"+this.tel.substring(7,11);
			}			
		},
		created:function(){
			var title = document.getElementsByTagName('title')[0];
			title.innerHTML = this.title;
		},
		components:{
			"c-btn":c_btn,
			"c-alert":c_alert,
			"c-pop":c_pop
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
			showPopup:function(str,url){
				var self = this;
				self.popupShow = true;
				self.popupText = str;
				setTimeout(function(){
					self.popupShow = false;
					if(url){
						self.goto(url);
					}
				},1500)
			},
			nextStep:function(){
				var self = this;
				var code = $('input[name="code"]').val();
				if(!code){
					this.showAlert("验证码不能为空");
					return false;
				}
				var obj = {
					bank_name:this.cardType,//开卡银行
				    bank_no:this.cardNum,//卡号
				    bank_account_name:this.cardName,//银行卡持有人
				    phone:this.tel,
				    verification_code:code,//手机验证码
				}
				$.ajax({
					url: baseUrl +'/bank_card/bankCardCreate',
					data:{
					 	data:JSON.stringify(obj)
					},
					dataType:'jsonp',
					success:function(res){
						console.log(obj);
						if(res.return =='true'){
							self.showPopup('银行卡添加成功','#/my_bank');
						}else{
							self.showPopup(res.msg);
						}						
					},
					error:function(res){
						console.log('error:'+res.msg);
					}
				})				
			},
			sendMsg:function(){
				var self = this;
				this.btnShow = false;
				this.timer = 60; //设置倒计时时间
				this.Interval = setInterval(this.countDown,1000);//开始倒计时
				$.ajax({
					url: baseUrl +'/login/mmsverify/',
					type:'get',
					data:{
						mobile:this.tel,
					},
					dataType:'jsonp',
					success:function(res){
						self.showAlert(res.msg)
					},
					error:function(res){
						self.showAlert(res.msg)
					}
				})	
			},
			countDown:function(){
				if(this.timer <= 1){
                    this.timer = 60;
                    this.btnShow = true;
                    clearInterval(this.Interval);
                }else{
                    this.timer--;
                }
			}
		}
	}
</script>
<style lang="scss">
	.send_code{
		min-height:100%;
		background-color: #ececec;
		.disc{
			padding:(10/20)+rem (15/20)+rem;
			color: #909090;
		}
		.send-box{
			padding:(10/20)+rem (13/20)+rem;
			border-top:1px solid #dbdbdb;
			border-bottom:1px solid #dbdbdb;
			input{
				width:50%;
				padding:(12/20)+rem;
				font-size: 16px;
				border-radius:5px;
				border:1px solid #c9c7cd;
				background:#ffffff;
			}
			span{
				position: absolute;
				right:(12/20)+rem;
				display: inline-block;
				padding:(12/20)+rem;
				font-size: 16px;
				color: #fff;
				white-space: nowrap;
				border-radius: 2px;
				background-color:#f88484;
				&.disabled{
					color:#909090;
					background-color:#e7e7e7;
				}
			}
		}
		.no-code{
			width: (350/375)*100%;
			margin:0 auto;
			margin-top: (13/20)+rem;
			text-align: right;
			a{
				font-size:14px;
				color:#8eb1e5;
			}
		}	
	}
</style>