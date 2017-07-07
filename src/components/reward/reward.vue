<template>
	<transition name = 'view'>
		<div class="c_reward">
			<transition name='fade'>
			<div class="overlay" v-show='zhifu_show'></div>
			</transition>
			<div class="img_d">
				<img src="../../icon/dashang.gif">
			</div>
			<div class="xie">
				<p>谢谢支持!</p>
			</div>
			<div class="money">
				<ul>
					<li @click='checked(1)' :class="{btn_checked:checkNum==1}" class="li1">￥1</li>
					<li @click='checked(2)' :class="{btn_checked:checkNum==2}" class="li2">￥2</li>
					<li @click='checked(5)' :class="{btn_checked:checkNum==5}" class="li3">￥5</li>
					<li @click='checked(10)' :class="{btn_checked:checkNum==10}" class="li4">￥10</li>
					<li @click='checked(50)' :class="{btn_checked:checkNum==50}" class="li5">￥50</li>
					<li @click='checked(100)' :class="{btn_checked:checkNum==100}" class="li6">￥100</li>
					<!-- <li @click='click(123456)' :class="{btn_checked:checkNum==123456}" class="li6"><input type="text" name="" id="" value="自定义" /></li> -->
				</ul>
			</div>
			<div class="xianshi">
				<p class="xs_p1">我的余额</p>
				<p class="xs_p2">{{amount}}</p>
				<p class="xs_p3" v-on:click="chongzhi" v-if='false'><span>充值</span></p>
			</div>
			<c-btn class='send_pinglun_cancelpl' text='返回' fn='rewardXX' v-on:rewardXX='cancelPay'></c-btn>
			<c-alert :show='danmu_true' :text='danmu_tishi'></c-alert>
			<transition  name="pay" >
					<ul class="zhifu" v-if='zhifu_show'>
						<li v-on:click="yuezhifu"><p>余额支付</p></li>
						<li v-on:click="wxzhifu"><p>微信支付</p></li>
						<li  @click='cancelWin'><p>取消</p></li>
					</ul>
			</transition>
		</div>
	</transition>
</template>
<script>
import c_alert from '../alert';
import c_btn from '../btn';
import $communic from '../../core/communic';
	export default{
		components:{
			'c-alert':c_alert,
			'c-btn':c_btn
		},
		data:function(){
			return{
				reward_num:0,//打赏的金额
				asset_type:1,//支付类型,
				checkNum:'',
				danmu_true:false,//控制提示框显示隐藏
				danmu_tishi:'',//提示框的内容
				amount:"获取中",//账户余额
				zhifu_show:false,
			}
		},
		props:['fn','inf'],
		mounted:function(){
			this.getBalance();
			window.addEventListener('touchmove',this.handle,false)
		},
		destroyed:function(){//挂载时执行
			window.removeEventListener('touchmove',this.handle)
		},
		methods:{
			getBalance:function(){
				var self=this;
				$.ajax({
					url:baseUrl+'/shop/get_acc_amount',
					dataType:'jsonp',
					success:function(datas){
						console.log(datas);
						self.amount='￥'+datas.data.acc_amount;
					},
					error:function(){
						console.log('wrong');
						self.amount='获取失败';
					}
				});	
			},
			cancelPay:function(){
				this.$emit(this.fn);
			},
			handle:function(e){
				e.preventDefault();
			},
			checked:function(jiage){
				this.checkNum=jiage;
				this.zhifu_show=true;
			},
			cancelWin:function(){
				this.checkNum=0;
				this.zhifu_show=false;
			},
			yuezhifu:function(){//余额支付
				var str = (arguments[0]);
				if(str===false){
					this.zhifu_show=false;	
					this.getBalance()
					return
				}
				var self=this;
				var params={
					biz_id:self.inf.biz_id,
					biz_type:self.inf.biz_type,
					reward_user:self.inf.reward_user,
					be_reward_user:self.inf.be_reward_user,
					reward_num:self.checkNum,//打赏数量
					asset_type:self.asset_type,
					location:self.$store.state.address.latitude+','+self.$store.state.address.longitude,
				};
				$.ajax({
						url:self.inf.url,
						data:{
							data:JSON.stringify(params),
						},
						dataType:'jsonp',
						success:function(data){
							self.danmu_true=true;
							if(data.msg.indexOf('reward_num')>-1){
								self.danmu_tishi="您的余额不足";	
							}else{
								self.danmu_tishi=data.msg;
								setTimeout(function(){
									self.$emit(self.fn);
								},1500)
								return
							}
							
							setTimeout(function(){
								self.reward_num = 0;
								self.danmu_true=false;	
								self.zhifu_show=false;	
								self.checkNum = 0;	
													
							},1000);
							self.getBalance()
						},
						error:function(){
							self.danmu_true=true;
							self.danmu_tishi="异常错误";
							setInterval(function(){
								self.danmu_true=false;	
								self.zhifu_show=false;							
							},1000);
						}
					});
			},
			chongzhi:function(){
				var self = this;
				this.$router.push({name:'chongzhi',params:{reward_num:self.reward_num}});
			},
			wxzhifu:function(){
				window.wxsuccess=this.yuezhifu;
				//var win = window;
				var self=this;
				//调用微信支付方法
				new $communic({
		        fn:'mlxapp.chargeMoney',
		        url:baseUrl+"/wechat/indent?trade_type=JSAPI",
		        params:{
		            total_fee:self.checkNum,
		            //total_fee:0.01,
		            handle:"wxsuccess"
		        },
		        callback:window.wxsuccess
		      });

			},
			
		},
	}
</script>
<style lang='scss'>
	.c_reward{
		z-index: 999999;
		.overlay{
			position: fixed;z-index: 2;left: 0;top:0;
			width: 100%;height: 100%;background-color: rgba(0,0,0,0.5);
		}
		.send_pinglun_cancelpl{
			background-color: #ccc;
		}
		.send_pinglun_cancelpl:active{
			background-color: #888;
		}
		min-height: 100%;
		background-color: #fff;
		position: fixed;top:0;left: 0;
		.img_d{
			width: 100%;
			img{
				width: 100%;
			}	
		}
		.xie{
				width: 100%;
				height: 100%;
				margin-top: 24px;
				margin-bottom: 36px;
				p{
					font-size: 17px;
					width: 100%;
					text-align: center;
					color: #6F6F6F;
				}
			}
		.money{
			width: 100%;
			/*border:1px solid #C7C7CC;*/
			height: 105px;
			ul{
				.btn_checked{
					background-color: #F86442;
					color: #FFFFFF;
				}
				margin:0 auto;
				width: 83%;
				li{
					background-color:#ffffff;
					width: 29.58%;
					height: 39px;
					border:1px solid #F86442;
					float: left;
					/*margin-left: 3.46%;*/
					border-radius: 90px;
					margin-bottom: 8px;
					text-align: center;
					color:#F86442;
					font-size: 17px;
					line-height: 39px;
					span{
						color: #F86442;
						font-size: 17px;
						margin-right: 5px;
					}
				}
				.li2,.li5{
					margin: 0 4.18%;
				}
			}
		}
		.xianshi{
			width: 100%;
			.xs_p1{
				width: 100%;
				font-size: 18px;
				text-align: center;
				color: #000000;
				margin-top: 20px;
				margin-bottom: 6px;
			}
			.xs_p2{
				width: 100%;
				font-size: 35px;
				text-align: center;
				color: #000000;
				margin-bottom: 15px;
			}
			.xs_p3{
				background:#ff4e4e;
				border-radius:4px;
				width:348/375*100%;
				height:47px;
				margin-left: 14/375*100%;
				span{
					width: 128px;
					/*margin-left:110/375*100%;*/
					margin: 0 auto;
					font-size: 16px;
					color: white;
					line-height: 47px;
					text-align: center;
					display: block;
				}
			}
		}
		
		.zhifu{
			position: absolute;
			bottom: 0;left: 0;z-index: 1000;width: 100%;height: 30%;padding-top:0.1%;
			li{
				color:#000;font-size: 30px;font-weight: 200;width: 100%;
				height: 33.3%;text-align: center;background-color: #fff;
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