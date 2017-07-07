<template>
	<div class="withdraw">
		<div class="balance">
			<i v-show=false v-on:click="openPop()"><span>?</span></i>
			<div>
				<p>余额账户(元)</p>
				<p><span class="account">{{userInfo.account}}</span></p>
			</div>
		</div>
		<div class="bank-card" v-if="bankList.length>0" :value="bankList.length">
			<ul>
				<li v-for="(list,index) in bankList" v-bind:class="{active:list.use_state==0}" @click="choseCard(index)">
					<i></i>
					<section>
						<p>{{list.bank_name}}</p>
						<span>尾号{{substringNum(list.bank_no)}}储蓄卡</span>
					</section>
					<em></em>
				</li>
			</ul>			
		</div>
		<div v-else class="add-bank" v-on:click="goto('#/add_bank')">
			<b>+</b>
			<span>添加银行卡</span>
			<em></em>
		</div>
		<div class="amount">
			<h3>提现金额</h3>
			<div>
				<span>￥</span>
				<input type="number" id="money" name="amount" maxlength="5">
			</div>
			<p v-show=false>
				<span>可用余额<span class="overage">{{userInfo.overage}}</span>元</span>
				<a v-on:click="allWidthdraw()">全部提现</a>
			</p>
		</div>
		<c-btn text="提现" fn="cfn" @cfn="commitFuc()"></c-btn :alertShow='alertShow'>
		<c-alert show=true :text='alertText' :style='{top:alertShow?"0%":"-15%",transform:"translate(-50%,0)",transition:"all 0.5s ease-in"}'></c-alert>
		<c-popup v-show='popShow' :text='popStr' fn="close" v-on:close="closePop()">			
		</c-popup><c-comfirm  :show='showComfirm' msg="你确定要提现吗" cmfn="cmFuc" @cmFuc="comfirmFuc" cfn="clsFuc" @clsFuc="closeComfirm"></c-comfirm>
	</div>
</template>
<script>
	import c_btn from '../../components/btn.vue'
	import c_alert from '../../components/alert.vue'
	import c_popup from '../../components/popup.vue'
	import c_comfirm from '../../components/comfirm.vue'
	export default{
		name:"withdraw",
		data(){
			return{
				title:'提现',
				alertShow:false,
				alertText:'',
				popShow:false,
				showComfirm:false,
				popStr:'',
				userInfo:{
					id:'1',
					account:'0.00',
					overage:'0.00',
					bank:''
				},
				bankCardIndex:'',
				bankList:[
					/*{
				        "id":"12",
				        "bank_name":"工商银行",
				        "bank_no":"3412",
				        "bank_account_name":"李四",
				        "use_state":"1"
				    },
					{
				        "id":"10",
				        "bank_name":"工商银行",
				        "bank_no":"3410",
				        "bank_account_name":"李四",
				        "use_state":"1"
				    },
					{
				        "id":"11",
				        "bank_name":"工商银行",
				        "bank_no":"3410",
				        "bank_account_name":"李四",
				        "use_state":"1"
				    }*/
				],
			}
		},
		created:function(){
			var title = document.getElementsByTagName('title')[0];
			title.innerHTML = this.title;
		},
		components:{
			"c-btn":c_btn,
			"c-alert":c_alert,
			"c-popup":c_popup,
			"c-comfirm":c_comfirm
		},
		mounted:function(){
			if(localStorage.cardIndex){
				this.bankCardIndex = localStorage.cardIndex;
			}
			this.getAccount();
			this.getBankCardList();
		},
		methods:{
			goto:function(url){
				window.location.href = url;
			},
			getAccount:function(){
				var self = this;
				$.ajax({
					url: baseUrl +'/shop/get_acc_amount',
					type:'post',
					data:{},
					dataType:'jsonp',
					success:function(res){
						//alert(res.data.acc_use_amount);
						self.userInfo.account = res.data.acc_amount;
						self.userInfo.overage = res.data.acc_use_amount;
					},
					error:function(res) {
						/* Act on the event */
						console.log('ajax error');
					}
				})
			},
			getBankCardList:function(){
				var self = this;
				$.ajax({
					url: baseUrl +'/bank_card/bankCardList',
					dataType:'jsonp',
					data:'',
					success:function(res){
						if(res.msg){return}
						for (var i=0;i<res.length;i++){
							self.bankList.push(res[i]);
						}
						self.bankList[self.bankCardIndex].use_state = 0;
					},
					error:function(res){

					}
				})
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
			openPop:function(str){
				this.popShow = true;
				this.popStr = str;
			},
			closePop:function(){
				this.popShow = false
			},
			/*allWidthdraw:function(){
				var overage = $('.overage').text();
				document.getElementById('money').value = overage;
			},*/
			commitFuc:function(){
				var money = $('#money').val();
				var len = $('.bank-card li.active').length;
				if(len==0){
					this.showAlert("请选择银行卡");
					return false;
				}
				if(!money){
					this.showAlert("请输入提现金额");
					return false;
				}else if(money%1 !== 0){
					this.showAlert("提现金额必须是整数");
					return false;
				}else if(money>parseFloat($('.account').text())){
					this.showAlert("提现金额不能超出余额");
					return false;
				}else{
					this.showComfirm = true;
				}
			},
			comfirmFuc:function(){
				var self = this;
				var money = $('#money').val();
				var obj = {}
				for(var i=0;i<this.bankList.length;i++){
					if(this.bankList[i].use_state == 0){
						obj = {
							"bank_name":this.bankList[i].bank_name,
						    "bank_no":this.bankList[i].bank_no,
						    "bank_account_name":this.bankList[i].bank_account_name,
						    "amount":money,
						    "remark":"这是备注"
						}
					}
				}
				$.ajax({
					url: baseUrl +'/withdraw_cash/withdrawCashCreate',
					data:{
						data:JSON.stringify(obj)
					},
					dataType:'jsonp',
					success:function(res){
						if(res.return=='true'){
							self.showComfirm = false;
							self.openPop("提现申请提交成功！");
							setTimeout(function(){
								self.popShow = false;
								self.goto('#/my_wallet')
							},1500)
						}else{
							self.showComfirm = false;
							self.openPop(res.msg);
							setTimeout(function(){
								self.popShow = false;
							},1500)
						}
					},
					error:function(){
						alert("错误");
					}
				})
			},
			closeComfirm:function(){
				this.showComfirm = false;
			},
			choseCard:function(index){
				if(window.localStorage){
					localStorage.cardIndex = index;
				}else{
				 	//alert('This browser does NOT support localStorage');
				}
				for(var i=0;i<this.bankList.length;i++){
					this.bankList[i].use_state = 1;
				}
				this.bankList[index].use_state = 0;
			},
			substringNum:function(num){
				return num.substring(num.length-4);
			}
		}
	}

</script>
<style lang="scss">
	.withdraw{
		min-height:100%;
		padding-bottom: 15px;
		box-sizing: border-box;
		background-color: #eaeaea;
		.balance{
			height:152px;
			background: url(../../icon/wd_bg.png) no-repeat;
			background-size: 100% 100%;
			i{
				position: absolute;
				right:1rem;
				top:1rem;
				display: inline-block;
				font-size: 16px;
				font-style: normal;
				color: #000;
				height:22px;
				line-height: 22px;
				width: 22px;
				text-align: center;
				border-radius: 100%;
				background-color: #fff;
				span{
					font-size:16px;
				}
			}
			div{
				padding-top: (56/20)+rem;
				padding-left: (22/20)+rem;
				p{
					color:#fff;
					font-size:16px;
				}
				span{
					color: #fff;
					font-size:48px;
				}
			}
		}
		.bank-card{
			ul{
				padding:(13/20)+rem 0;
				li{
					position:relative;
					padding: (15/20)+rem;
					background-color: #fff;
					border-bottom:1px solid #ececec;
					i{
						display:inline-block;
						height:37px;
						width:37px;
						margin-right:(15/20)+rem;
						border-radius: 100%;
						vertical-align: top;
						background-color:#ff5b14;
						background:url(../../icon/icon_bank_gs.png) no-repeat center center;
					}
					section{
						width:70%;
						display:inline-block;
						text-align:left;
						vertical-align: top;
						p{
							color: #000;
							font-size:16px;
						}
						span{
							color:#747474;
						}
					}
					em{
						position:absolute;
						right:(16/20)+rem;
						top:(25/20)+rem;
						width:20px;
						height:20px;
						line-height:20px;
						border-radius:100%;
						vertical-align: middle;
						color:#fff;
						font-size:12px;
						text-align: center;
						background:url(../../icon/icon_right.png) no-repeat center center #c5c5c5;
						
					}
					&.active em{
						background-color: #6aaf3d;
					}
				}
			}
		}
		.add-bank{
			margin-top: (12/20)+rem;
			margin-bottom:15px;
			padding:(16/20)+rem 1rem;
			background-color:#fff;
			b{
				display:inline-block;
				font-size:20px;
				margin-right: (10/20)+rem;
			}
			span{
				font-size:15px;
				color:#4f4f4f;
			}
			em{
				position:absolute;
				right:(16/20)+rem;
				display:inline-block;
				width:7px;
				height:22px;
				vertical-align: middle;
				background-image: url(../../icon/arrow-right.png);
				background-repeat: no-repeat;
				background-position: center;
				background-size:100%; 
			}
		}
		.amount{
			padding:(10/20)+rem 0;
			background-color: #eceef3;
			h3{
				font-size:16px;
				color:#000;
				margin-left: (15/20)+rem;
			}
			div{
				margin-top: (19/20)+rem;
				padding:(12/20)+rem 0 (12/20)+rem (15/20)+rem;
				border-bottom: 1px solid #cbcbcb;
				span{
					display:inline-block;
					font-size:45px;
					color:#000;
					line-height: 45px;
					padding-right: 10px;
					border-right: 1px solid #d8d8d8;
				}
				input{
					display:inline-block;
					width:70%;
					padding:0 10px;
					font-size:40px;
				}
			}
			p{				
				margin: 0 (15/20)+rem;
				span{
					font-size:12px;
					color:#747474;
				}
				a{
					position:absolute;
					right:(14/20)+rem;
					font-size:12px;
					color:#f5592d;
				}
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