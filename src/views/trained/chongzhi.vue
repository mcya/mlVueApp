<template>
	<div class="chongzhi">
		<div class="box">
			<div class="shuoming">
				<p class="p1">请选择充值金额</p>
				<p class="p2">当前余额不足，还差<span class="span_red">{{chazhi}}</span>元</p>
			</div>
			<div class="bottom">
				<ul>
					<li @click='click(30)' :class="{btn_checked:checkNum==30}" class="li">30元</li>
					<li @click='click(50)' :class="{btn_checked:checkNum==50}" class="li">50元</li>
					<li @click='click(100)' :class="{btn_checked:checkNum==100}" class="li">100元</li>
					<li @click='click(200)' :class="{btn_checked:checkNum==200}" class="li">200元</li>
					<li @click='click(500)' :class="{btn_checked:checkNum==500}" class="li">500元</li>
					<li @click='click(800)' :class="{btn_checked:checkNum==800}" class="li">800元</li>
					<li @click='click(1000)' :class="{btn_checked:checkNum==1000}" class="li">1000元</li>
					<li @click='click(2000)' :class="{btn_checked:checkNum==2000}" class="li">2000元</li>
				</ul>
			</div>
			<div style="clear:both"></div>
			<div class="button">
				<p @click="wxzhifu">微信支付</p>
			</div>
		</div>
	</div>
</template>
<script>
import $communic from '../../core/communic';
	export default{
		data:function(){
			return{
				checkNum:30,
				amount:0,
				chazhi:0,//余额与打赏金额的差值
				reward_num:0,//用户选择的金额
			}
		},
		mounted:function(){//挂载时执行
			//从路由获取用户点击的金额
			this.reward_num = this.$route.params.reward_num;
			//获取余额
			var self=this;
			$.ajax({
						url:baseUrl+'/shop/get_acc_amount',
//						data:{},
						//type:'POST',
						dataType:'jsonp',
						success:function(datas){
							//alert(datas.data.acc_amount);
							self.amount=datas.data.acc_amount;
							if(self.amount-self.reward_num<=0){
									self.chazhi=self.reward_num-self.amount;
							}
						}
					});
		},
		methods:{
			click:function(jiage){
				console.log(jiage);
				this.checkNum=jiage;
			},
			//微信支付
			wxzhifu:function(){
				console.log('点击了');
				window.wxsuccess=this.wxzhifusuccess;
				var win = window;
				var self=this;
				//调用微信支付方法
				new $communic({
		        fn:'mlxapp.chargeMoney',
		        url:"//weixin.mlxing.com/wechat/indent?trade_type=JSAPI",
		        params:{
		            total_fee:self.checkNum,
		            handle:"wxsuccess"
		        },
		        callback:win.wxsuccess
		     });
			},
			wxzhifusuccess:function(res){
				//alert(res);
				if(res==true){
					alert("充值成功");
				}
				if(res==false){
					alert("充值失败");
				}
			},
		},
	}
</script>
<style lang='scss'>
	.chongzhi{
		
		width: 100%;
		height:607px;
		background-color: #EAEAEA;
		display: inline-block;
		.box{
			width:100%;
			/*margin-left: 14/375*100%;*/
			.shuoming{
				width: 100%;
				height: 78px;
				/*margin-left: 14/375*100%;*/
				p{
					font-size: 16px;
					color: #000000;
					margin-left: 15/375*100%;
				}
				.p1{
					margin-top: 17px;
					margin-bottom: 11px;
					
				}
				.span_red{
					color: #F5594D;
				}
			}
			.bottom{
				/*margin-top: 16px;*/
				width: 100%;
				/*margin-left: 14/375*100%;*/
				
				.li{
					width: 167/375*100%;
					height: 78px;
					background-color: #FFFFFF;
					float:left;
					margin-left: 15/375*100%;
					margin-bottom: 15px;
					line-height: 78px;
					text-align: center;
					color: #000000;
					font-size: 16px;
				}
				.btn_checked{
					background-color:#ff4e4e;
				}
			}
			.button{
				background:#ff4e4e;
				border-radius:4px;
				width:348/375*100%;
				height:47px;
				margin-top: 30px;
				margin-left: 14/375*100%;
				p{
					width: 100%;
					text-align: center;
					line-height: 47px;
					color:#FFFFFF;
				}
			}
			
		}
	}
	
</style>
