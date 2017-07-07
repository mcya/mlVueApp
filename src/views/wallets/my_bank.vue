<template>
	<div class="my_bank">
		<div v-show=true class="bank-list">
			<ul>
				<li v-for="list in bankList" @touchstart='startTap($event)' @touchend="endTap(list.id,$event)">
					<section>
						<b></b>
						<div>
							<h3>{{list.bank_name}}</h3>
							<span>储蓄卡</span>
						</div>
					</section>
					<p>**** **** **** <span>{{substringNum(list.bank_no)}}</span></p>
				</li>
			</ul>
		</div>
		<div v-show="bankList.length<5" class="add-bank" v-on:click="goto('#/add_bank')">
			<b>+</b>
			<span>添加银行卡</span>
			<em></em>
		</div>		
		<c-comfirm  :show='showComfirm' msg="请选择要进行的操作" dfn="delFuc" @delFuc="deleteBankCard" cfn="clsFuc" @clsFuc="closeComfirm"></c-comfirm>
		<c-pop v-show=showPopup text="验证成功"></c-pop>
	</div>
</template>
<script>
	import c_comfirm from '../../components/comfirm.vue'
	import c_pop from '../../components/popup.vue'
	export default{
		name:"my_bank",
		data(){
			return{
				title:"我的银行卡",
				startTime:'',
				ennTime:'',
				mytimeout:'',
				showPopup:false,
				showComfirm:false,
				activeId:'',
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
				    },*/
				],
			}
		},
		mounted:function(){//挂载器
			this.getBankCardList();
		},
		created:function(){
			var title = document.getElementsByTagName('title')[0];
			title.innerHTML = this.title;
		},
		components:{
			"c-pop":c_pop,
			"c-comfirm":c_comfirm
		},
		methods:{
			goto:function(url){
				window.location.href = url;
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
					},
					error:function(res){

					}
				})
			},
			startTap:function(event){
				var elem = event.currentTarget;
				this.mytimeout = setTimeout(function(){
					elem.style.opacity = '0.5';
				},500)
				this.startTime = new Date().getTime();
			},
			endTap:function(id,event){
				clearTimeout(this.mytimeout);
				var elem = event.currentTarget;
				elem.style.opacity = '1';
				this.activeId = id;
				this.endTime = new Date().getTime();
				if(this.endTime-this.startTime > 600){ // 600=1秒
					this.showComfirm = true;
				}
				this.startTime = this.endTime = '';
			},
			/*editBankCard:function(){
				var id = this.activeId;
				var index = '';
				for(var i=0;i<this.bankList.length;i++){
					if(id==this.bankList[i].id){
						index = i;
					}
				}
				var name = this.bankList[index].bank_account_name;
				var no = this.bankList[index].bank_no;
				this.goto('#/add_bank/'+name+'/'+no);
			},*/
			deleteBankCard:function(id){
				var self = this;
				var obj = {
					"id":this.activeId
				}
				$.ajax({
					url:'http://weixin.mlxing.com/bank_card/bankCardDelete',
					dataType:'jsonp',
					data:{
						data:JSON.stringify(obj)
					},
					success:function(res){
						if(res.return){
							window.location.reload();
						}
					},
					error:function(res){

					}
				})
			},
			closeComfirm:function(){
				this.showComfirm = false;
			},
			substringNum:function(num){
				return num.substring(num.length-4);
			}
		}
	}
</script>
<style lang="scss">
	body{ -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none;}
	.my_bank{
		min-height: 100%;
		padding-bottom: 15px;
		box-sizing: border-box;
		background-color: #eceef3;
		.bank-list{
			padding: (8/16)+rem;
			padding-bottom: 0;
			ul>li{
				margin-bottom: (8/20)+rem;
				padding:(10/20)+rem;
				border-radius: 4px;
				background: url(../../icon/bank.png) no-repeat (175/20)+rem center #db3838;
				section{
					margin-bottom:(12/20)+rem;
					b{
						display: inline-block;
						width: 37px;
						height:37px;
						border-radius: 100%;
						margin-right: (5/20)+rem;
						vertical-align: top;
						background:url(../../icon/icon_bank_gs.png) no-repeat center center #fff;
						background-size: 80% 80%;
						opacity: 0.7;
					}
					div{
						display:inline-block;
					}
				}
				h3,span,p{
					color: #fff;
				}
				p{
					text-align: right;
					margin-right: (25/20)+rem;
					span{
						font-size: 20px;
						vertical-align:baseline;
					}
				}
			}
		}
		.add-bank{
			margin-top: (12/20)+rem;
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
	}



</style>