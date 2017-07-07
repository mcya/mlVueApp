<template>
	<div class="detail-wrap">
		<div class="detail-bd">
			<div class="result" v-if="billList.audit_status==1" v-show="showBill">
				<div class="step">
					<span></span>
					<b class="orange"></b>
					<b></b>
					<span></span>
				</div>
				<div class="cont">
					<h3 class="orange">提现申请已提交，等待银行处理</h3>
					<p>{{billList.bank_name}}（{{formatNum}}）<br>{{billList.price}}元</p>
					<h3>预计24小时内（{{computeTime}}前）到账</h3>
				</div>
			</div>
			<div class="bill" v-else>
				<h3 v-if="billList.act_type==1">
					<b class="icon_wx"></b>
					<span>微信支付</span>
				</h3>
				<h3 v-else-if="billList.act_type==2">
					<b class="icon_bank"></b>
					<span>{{billList.bank_name}}（{{formatNum}}）</span>
				</h3>
				<h3 v-else-if="billList.act_type==3">
					<b class="icon_redbag"></b>
					<span>美丽行红包</span>
				</h3>
				<h3 v-else>
					<b class="icon_mlx"></b>
					<span>美丽行</span>
				</h3>
				<div class="price">{{billList.price}}</div>
				<p class="status">交易成功</p>
				<div class="section-wrap">
					<section v-if="billList.act_type==2">
						<span class="left">付款方式</span>
						<span class="right">美丽行技术有限公司</span>
					</section>
					<section v-else>
						<span class="left">付款方式</span>
						<span v-if="billList.pay_type==1" class="right">余额支付</span>
						<span v-else class="right">微信支付</span>
					</section>
					<section v-if="billList.act_type==1">
						<span class="left">对方账户</span>
						<span class="right">美丽行技术有限公司</span>
					</section>
				</div>
			</div>
			<div class="bill detail" v-show="showDetail">
				<h3>
					<b class="icon_bank"></b>
					<span>{{billList.bank_name}}</span>
				</h3>
				<div class="price">{{billList.price}}</div>
				<p class="status">交易成功</p>
				<div class="section-wrap">
					<section>
						<span class="left">提现说明</span>
						<span class="right">快速提现</span>
					</section>
					<section class="step-active">
						<span class="left">处理进度</span>
						<span class="right">{{formatTime}}</span>
					</section>
					<section class="step-active">
						<span class="left">&nbsp;</span>
						<span class="right">{{formatTime}}</span>
					</section>
					<section class="step-active">
						<span class="left">&nbsp;</span>
						<span class="right">&nbsp;</span>
					</section>
					<section>
						<span class="left">提现到</span>
						<span class="right">{{billList.bank_name}}（{{formatNum}}）{{billList.bank_account_name}}</span>
					</section>
					<div class="step-wrap">
						<div class="step">
							<span class="one"></span>
							<b class="orange"></b>
							<span class="two"></span>
							<b></b>
							<span class="three"></span>
						</div>
						<div class="cont">
							<p>付款成功</p>
							<p>银行处理中</p>
							<p>到账成功</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="detail-fd" v-show="showBill">
			<span class="center" @click="showBillDetail">去账单查看进度<b></b></span>
		</div>
		<div class="detail-fd" v-show="!showBill">
			<span class="left">创建时间</span>
			<span class="right">{{billList.sys_time}}</span>
		</div>
	</div>
</template>
<script>
	export default{
		name:'result',
		data(){
			return{
				title:'结果详情',
				detialList:[],
				billList:{
					/*"id":"1",
			        "mid":"96",
			        "order_type":"",
			        "order_id":"5819b872601cb9687",
			        "act_type":"1",
			        "pay_type":"1",
			        "bank_no":"4270201234567894125",
			        "bank_name":"工商银行",
			        "bank_account_name":"李四",
			        "price":"50",
			        "sys_time":"2016-11-03 09:10:43",
			        "audit_person":"毛建华",
			        "audit_time":"2017-11-03 09:10:43",
			        "audit_status":"3",*/
				},
				billId:null,
				year:null,
				month:null,
				showBill:true,
				showDetail:false,
			}
		},
		mounted:function(){//挂载器
			this.billId = this.$route.params.id;
			this.year = this.$route.params.year;
			this.month = this.$route.params.month;
			this.getOrderHistory();
			if(this.billList.audit_status == 1){
				this.showBill = true;
			}else{
				this.showBill = false;
			}
		},
		created:function(){
			var title = document.getElementsByTagName('title')[0];
			title.innerHTML = this.title;
		},
		computed:{
			formatTime:function(){
				if(this.billList.id==undefined){
					return false;
				}
				var d = this.billList.sys_time.split(' ')[0];
				var t = this.billList.sys_time.split(' ')[1];
				return d.substring(5)+" "+t.substring(0,5);
			},
			formatNum:function(){
				if(this.billList.id==undefined){
					return false;
				}
				return this.billList.bank_no.substring(this.billList.bank_no.length-4);
			},
			computeTime:function(){
				if(this.billList.id==undefined){
					return false;
				}
				var t = this.billList.sys_time.split(' ')[1];
				return t.substring(0,5);
			},
		},
		methods:{			
			getOrderHistory:function(){
				var self = this;
				var obj = {
					"year":this.year,
					"month":this.month
				}
				$.ajax({
					url: baseUrl +'/order/orderHistory',
					data:{
						data:JSON.stringify(obj),
					},
					dataType:'jsonp',
					success:function(res){
						//if(res.msg){return}
						for (var i=0;i<res.length;i++){
							self.detialList.push(res[i]);
						}
						for(var i=0;i<self.detialList.length;i++){
							if(self.detialList[i].id == self.billId){
								self.billList = res[i];
							}
						}
					},
					error:function(res){
						console.log('ajax error');
					}
				})
			},
			showBillDetail:function(){
				this.showBill = false;
				this.showDetail = true;
			}
		}
	}
</script>
<style lang="scss">
	.detail-wrap{
		min-height: 100%;
		background-color: #ececec;
		.detail-bd{
			padding: (15/20)+rem;
			background-color: #fff;
			.result{
				.step{
					display:inline-block;
					position:absolute;
					left:(30/20)+rem;
					span{
						display:block;
						width: 24px;
						height:24px;
						border-radius:100%;
						background:url(../../icon/icon_money.png) no-repeat center center;
						&:first-child{
							background:url(../../icon/icon_right.png) no-repeat center center #ff5b14;
						}
					}
					b{
						display:block;
						width:4px;
						height:26px;
						margin:0 auto;
						background-color:#ccc;
						&.orange{
							background-color:#ff5b14;
						}
					}
				}
				.cont{
					padding-left: (60/20)+rem;
					h3{
						font-size:16px;
						font-weight: normal;
					}
					p{
						color: #909090;
						margin-bottom:17px;
					}
				}
				.orange{
					color: #ff5b14;
				}
			}
			.bill{
				h3{
					text-align: center;
					b{
						display: inline-block;
						width: 32px;
						height:32px;
						border-radius: 100%;
						vertical-align: top;
						background-color:#ff7358;
						&.icon_wx{
							background:url(../../icon/wx_pay.png) no-repeat center center;
							background-size:100% 100%;
						}
						&.icon_bank{
							background:url(../../icon/icon_bank_gs.png) no-repeat center center #ff7358;
						}
						&.icon_redbag{
							background:url(../../icon/icon_redbag.png) no-repeat center center #ff7358;
						}
						&.icon_mlx{
							background:url(../../icon/icon_mlx.png) no-repeat center center #ff7358;
						}
					}
					span{
						display:inline-block;
						font-size: 16px;
						height: 32px;
						line-height: 32px;
						margin-left:(10/20)+rem;
					}
				}
				.price{
					text-align: center;
					font-size:32px;
					margin-top:(20/20)+rem;
					margin-bottom: (12/20)+rem;
				}
				.status{
					text-align: center;
					font-size: 16px;
					color: #acacac;
				}
				.section-wrap{
					position:relative;
					section{
						position:relative;
						margin-top:18px;
						.right{
							position: absolute;
							right: 0;
						}
						span{
							font-size:15px;
						}
						&.step-active{
							margin-bottom:24px;
							.right{
								font-size:12px;
								color:#acacac;
							}
						}
					}
					.step-wrap{
						position:absolute;
						top:38px;
						left:50%;
						transform:translate(-50%);
						-webkit-transform: translate(-50%);
						.step{
							display:inline-block;
							position:absolute;
							span{
								display:block;
								width: 18px;
								height:18px;
								border-radius:100%;
								background:url(../../icon/icon_right.png) no-repeat center center #acacac;
								background-size: 60% 60%;
								&.one,&.two{
									background-color: #ff5b14;
								}
							}
							b{
								display:block;
								width:2px;
								height:26px;
								margin:0 auto;
								background-color:#ccc;
								&.orange{
									background-color:#ff5b14;
								}
							}
						}
						.cont{
							padding-left: (24/20)+rem;
							p{
								color: #909090;
								margin-bottom:24px;
							}
						}
					}
				}				
			}		
		}
		.detail-fd{
			position:relative;
			padding: (15/20)+rem;
			border-top:1px solid #f4f4f4;
			background-color: #fff;
			.right{
				position:absolute;
				right: (15/20)+rem;
			}
			.center{
				display:inline-block;
				width: 100%;
				font-size:18px;
				color:#ff5b14;
				text-align: center;
				b{
					display:inline-block;
					width: 8px;
					height:14px;
					margin-left: 8px;
					vertical-align:middle;
					background: url(../../icon/arrow-right-orange.png) no-repeat;
				}
			}
		}
	}
</style>