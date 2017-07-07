<template>
	<div class="my_wallet">
		<!--************************ 总资产 ******************************-->
		<c-loading v-show="loading"></c-loading>
		<div class="total-assets">
			<ul class="total">
				<li v-for="list in moneyList">
					<span>{{list.title}}(元)</span>
					<b>{{list.money}}</b>
				</li>
			</ul>
		</div>
		<!--************************充值提现******************************-->
		<div class="recharge">
			<ul>
				<li v-on:click="goto('#/recharge')">
					<i></i>
					<span>充值</span>
				</li>
				<li v-on:click="goto('#/withdraw')">
					<i></i>
					<span>提现</span>
				</li>
			</ul>
		</div>
		<!--************************功能列表******************************-->
		<div class="tool-list">
			<ul>
				<li v-on:click="goto('#/history')">
					<i></i>
					<span>交易记录</span>
				</li>
				<li v-on:click="goto('#/my_bank')">
					<i></i>
					<span>银行卡管理</span>
				</li>
			</ul>
		</div>
	</div>	
</template>
<script>
	import $handleImg from '../../widget/handleImg.js'
	import c_loading from '../../components/loading/loading.vue'
	export default{
		name:"my_wallet",
		data(){
			return{
				title:"我的钱包",
				mid:'',
				loading:true,
				moneyList:[{"title":"当前总资产","money":"0.00"}],
				toolList:[]
			}
		},
		created:function(){
			var title = document.getElementsByTagName('title')[0];
			title.innerHTML = this.title;
		},
		mounted:function(){
			this.getMoneyList();
		},
		components:{
			"c-loading":c_loading,
		},
		methods:{
			goto:function(url){
				window.location.href = url;
			},
			groupImg:$handleImg,
			getMoneyList:function(){
				var self = this;
				$.ajax({
					url: baseUrl +'/shop/get_acc_amount',
					type:'post',
					data:{},
					dataType:'jsonp',
					success:function(res){
						self.moneyList = [
							{"title":"当前总资产","money":res.data.acc_amount}			
						]
						self.loading = false;
					},
					error:function(){
						self.loading = false;
						console.log("ajax error !!!");
					}
				})
				
			}
		}
	}

</script>
<style lang="scss">
	.my_wallet{
		min-height: 100%;
		background-color: #eceef3;
		.total-assets{
			padding-top: (18/20)+rem;
			text-align:center;
			background-color:#f86442;
			background-image: url(../../icon/m_total_bg_1.png);
			background-repeat: no-repeat;
			background-size: 100% 80%;
			background-position: bottom right;
			ul{
				background-image: url(../../icon/m_total_bg_2.png);
				background-repeat: no-repeat;
				background-size: 100% 80%;
				background-position: bottom right;
				li:nth-child(1){
					width: 100%;
					margin-bottom: (30/20)+rem;
					b{
						font-size: (45/20)+rem;
						font-weight: 300;
					}
				}
			}
			ul>li{
				width: 50%;
				display: inline-block;
				margin-bottom: (10/20)+rem;
				span,b{
					display: block;
					color:#fff;
				}
				b{
					font-size: (21/20)+rem;
					font-weight: 400;
				}
			}
		}
		.recharge{
			background-color:#fff;
			overflow: hidden;
			margin-bottom: (11/20)+rem;
			ul>li{
				width:50%;
				float: left;
				display: inline-block;
				text-align: center;
				margin: (7/20)+rem 0;
				box-sizing: border-box;
				&:first-child{
					border-right: 1px solid #e9e9e9;
					i{						
						background-image: url(../../icon/icon_recharge.png);
					}
				}
				i{
					display:inline-block;
					height:34px;
					width:34px;
					margin:(2/20)+rem 0;
					vertical-align: middle;
					background-image: url(../../icon/icon_withdraw.png);
					background-size:100% 100%;
				}
				span{
					font-size: (16/20)+rem;
					margin-left:(9/20)+rem;
				}
			}
		}
		.tool-list{
			li{
				border-top: 1px solid #f4f4f4;
				background-color:#fff;
				&:first-child{
					i{
						background-image:url(../../icon/icon_history.png);
					}
				}
				i{
					display:inline-block;
					height:34px;
					width:34px;
					margin:(9/20)+rem (15/20)+rem (9/20)+rem (26/20)+rem;
					border-radius: 100%;
					vertical-align: middle;
					background-color:#ff5b14;
					background-image:url(../../icon/icon_card.png);
					background-repeat:no-repeat;
					background-position:center center;
				}
				span{
					font-size: (15/20)+rem;
					color: #4f4f4f;
				}
			}
		}
	}
</style>