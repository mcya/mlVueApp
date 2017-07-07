<template>
	<div class="history">
		<div class="control">			
			<!-- <h3><span class="year"></span>年<span class="month"></span>月</h3> -->
			<h3>{{formatDate}}</h3>
			<p>支出￥{{order}} 收入￥{{total}}</p>		
  			<div class="datetime">
  				<group>
		      		<datetime format="YYYY-MM" @on-change="change" :title="$t('选择日期')" confirm-text="确定" cancel-text="取消">选择日期</datetime>
		    	</group>
  			</div>						
		</div>
		<div class="detail-list">
			<ul>
				<li v-show="detialList.length==0">暂无交易记录</li>
				<li v-for="list in detialList" @click="goto('#/result/'+list.id)">
					<i v-if="list.act_type==1" class="icon-recharge"></i>
					<i v-else-if="list.act_type==2" class="icon-withdraw"></i>
					<i v-else-if="list.act_type==3" class="icon-withdraw"></i>
					<i v-else-if="list.act_type==4" class="icon-redbag"></i>
					<i v-else-if="list.act_type==5" class="icon-redbag"></i>
					<i v-else-if="list.act_type==6" class="icon-withdraw"></i>
					<i v-else-if="list.act_type==7" class="icon-withdraw"></i>
					<section>	
						<!-- <h3>{{list.act_type}}</h3>-->				
						<h3 v-if="list.act_type==1">充值</h3>
						<h3 v-else-if="list.act_type==2">提现</h3>
						<h3 v-else-if="list.act_type==3">支付</h3>
						<h3 v-else-if="list.act_type==4">红包</h3>
						<h3 v-else-if="list.act_type==5 && list.price>0">打赏收入</h3>
						<h3 v-else-if="list.act_type==5 && list.price<0">打赏支出</h3>
						<h3 v-else-if="list.act_type==6">活动抽奖</h3>
						<h3 v-else-if="list.act_type==7">返现</h3>
						<p>{{formatTime(list.sys_time)}}</p>
						<p v-if="list.remark !='' ">备注:{{list.remark}}</p>
					</section>
					<div class="right">
						<p v-if="list.act_type==1" class="orange">{{formatPrice(list.price)}}</p>
						<p v-else-if="list.act_type==5 && list.price>0" class="orange">{{list.price}}</p>
						<p v-else-if="list.act_type==5 && list.price<0" >{{list.price}}</p>
						<p v-else>-{{formatPrice(list.price)}}</p>
						<p v-if="list.audit_status==2" class="status">审核通过</p>
						<!-- <span v-if="list.audit_status==1" class="status">未审核</span>
						<span v-else-if="list.audit_status==2" class="status">审核通过</span>
						<span v-else class="status">审核未通过</span> -->
					</div>
				</li>
			</ul>
		</div>
		<!-- <date-picker :show="dateShow" clfn="clFn" v-on:clFn="clsoePicker" cofn="coFn" @coFn="pickerDate"></date-picker> -->
	</div>
</template>
<script>
	import $handleImg from '../../widget/handleImg.js'
	import date_picker from '../../components/date-picker'
	import { Group,Datetime } from 'vux'
	export default{
		name:"history",
		data(){
			return{
				title:'交易记录',
				total:0,
				order:0,
				dateValue:'2017-02',
				myScroll:null,
				detialList:[
					/*{"id":"1","act_type":"1","sys_time":"2016-11-03 09:10:43","price":'-----0.02',"audit_status":'1'},
					{"id":"2","act_type":"2","sys_time":"2016-11-03 09:10:43","price":'56',"audit_status":'2'},
					{"id":"3","act_type":"3","sys_time":"2016-11-03 09:10:43","price":'12',"audit_status":'3'},
					{"id":"4","act_type":"4","sys_time":"2016-11-03 09:10:43","price":'10',"audit_status":'4'},*/
				],
			}
		},
		components:{
			"date-picker":date_picker,
			Group,Datetime,
		},
		mounted:function(){//挂载器
			var year = new Date().getFullYear();
			var month = new Date().getMonth()+1;
			this.dateValue = year+"-"+month
			this.getOrderHistory(year,month);
		},
		created:function(){
			var title = document.getElementsByTagName('title')[0];
			title.innerHTML = this.title;
		},
		computed:{
			formatDate:function(){
				return this.dateValue.split('-')[0]+"年"+this.dateValue.split('-')[1]+"月"
			}
		},
		methods:{
			change:function(value) {
				this.dateValue = value;
				this.getOrderHistory(this.dateValue.split('-')[0],this.dateValue.split('-')[1]);
		      	//console.log('change', value)
		    },
		    clearValue:function(value) {
		      	this.$data.value = ''
		    },
		    setToday:function(value) {
		      	let now = new Date()
		      	let cmonth = now.getMonth() + 1
		      	let day = now.getDate()
		      	if (cmonth < 10) cmonth = '0' + cmonth
		      	if (day < 10) day = '0' + day
		      	this.$data.value7 = now.getFullYear() + '-' + cmonth + '-' + day
		      	console.log('set today ok')
		    },
			goto:function(url){
				var year = this.dateValue.split('-')[0];
				var month = this.dateValue.split('-')[1];
				window.location.href = url+"/"+year+"/"+month;
			},
			groupImg:$handleImg,
			/*showPicker:function(){
				this.dateShow = true;				
			},
			clsoePicker:function(){
				this.dateShow = false;
			},
			pickerDate:function(){
				var self = this;
				var year = $('#yearWrapper .picker-item-selected').text();
				var month = $('#monthWrapper .picker-item-selected').text();
				$('.year').text(year);
				$('.month').text(month);
				this.getOrderHistory(year,month);
				this.dateShow = false;
			},*/
			getOrderHistory:function(year,month){
				var self = this;
				var obj = {
					"year":year,
					"month":month
				}
				$.ajax({
					url: baseUrl +'/order/orderHistory',
					data:{
						data:JSON.stringify(obj)
					},
					dataType:'jsonp',
					success:function(res){
						self.detialList = [];
						console.log(res);
						for (var i=0;i<res.length;i++){
							self.detialList.push(res[i]);
						}
						self.countPrice();
					},
					error:function(res){
						console.log('ajax error');
					}
				})
			},
			countPrice:function(){
				this.total = this.order = 0;
				for(var i=0;i<this.detialList.length;i++){
					if(this.detialList[i].act_type == 1 ){
						this.total += parseFloat(Math.abs(this.detialList[i].price));
					}else if(this.detialList[i].act_type == 5 && this.detialList[i].price >0 ){
						this.total += parseFloat(Math.abs(this.detialList[i].price));
					}else if(this.detialList[i].act_type == 5 && this.detialList[i].price <0 ){
						this.order -= parseFloat(Math.abs(this.detialList[i].price));
					}else{
						this.order -= parseFloat(Math.abs(this.detialList[i].price));
					}
				}
				this.total = this.total.toFixed(2);
				this.order = this.order.toFixed(2)
			},
			formatTime:function(str){
				return str.split(' ')[0] +" "+ str.split(' ')[1].split(':')[0] +":"+ str.split(' ')[1].split(':')[1];
			},
			formatPrice:function(str){
				return str.replace(/\-/g,"")
			}
		}
	}
</script>
<style lang="scss">
	.history{
		min-height: 100%;
		background-color: #fff;
		.control{
			padding: (12/20)+rem 1rem;
			background-color:#ececec;
			h3{
				font-size: 14px;
				color:#000;
				.year,.month{
					color: #000;
				}
			}
			p{
				font-size:13px;
				color:#909090;
			}
			.datetime{
				position: absolute;
				right:(17/20)+rem;
				top:(17/20)+rem;
				display: inline-block;
				width: 22px;
				height: 25px;
				background-image:url(../../icon/calendar.png);
				overflow: hidden;
				.vux-no-group-title{
					margin-top: 0;
				}
				.weui_cells{
					background-color: rgba(0,0,0,0);
					a{
						text-indent: -9999px;
					}
				}
			}
			#date{
				position:absolute;
				right:(17/20)+rem;
				top:(17/20)+rem;
				width:50px;
				height:25px;
				opacity: 0;
				z-index:12;		
			}
		}
		.detail-list{
			ul{
				li{
					position:relative;
					padding: (15/20)+rem 1rem;
					border-bottom: 1px solid #f4f4f4;
					i{
						display:inline-block;
						width:42px;
						height:42px;
						margin-right:(12/20)+rem;
						vertical-align: top;
					}
					.icon-recharge{
						background-image:url(../../icon/icon_recharge.png);
					}
					.icon-withdraw{
						background-image:url(../../icon/icon_withdraw.png);
					}
					.icon-chutuan{
						background-image:url(../../icon/icon_chutuan.png);
					}
					.icon-redbag{
						background-image:url(../../icon/icon_redbag.png);
					}
					section{
						display:inline-block;
						width: 79%;
						h3{
							font-size:15px;
							color: #000;
						}
						p{
							font-size:15px;
							color:#909090;
						}
					}
					.right{
						display:inline-block;
						position:absolute;
						right:1rem;
						top:(10/20)+rem;
						p{
							color:#000;
							font-size:18px;
							text-align: right;
							//transform:translate(0,-50%);
						}
						p.orange{
							color:#ffb200;
						}
						p.status{
							//top:(55/20)+rem;
							font-size:15px;
						}
					}
					
				}
			}

		}
	}
</style>