<template>
	<div v-show="show" class="redbag">
		<div class="mask"></div>
		<div class="wrap animated bounceInDown">
			<div class="box">
				<div class="cont">
					<div class="step-one" v-show="isTrue">
						<h2>认证成功</h2>
						<p>恭喜您！</p>
						<p>获得<span>1</span>个奖品</p>
						<p>已放入您的账户</p>
						<div class="bag">
							<div class="border"></div>
							<div class="icon"></div>
						</div>
						<div class="btn" @click="openBag">点击开奖</div :alertShow='alertShow'>
					</div>
					<div class="step-two" v-show="!isTrue">
						<div class="border-big">
							<div class="top"></div>
							<div class="bottom"></div>
						</div>
						<div class="icon-big animated rotateIn"></div>
						<div class="hd">
							<h3>{{title||'美丽行活动'}}</h3>
							<p>每日做任务现金红包天天拿</p>
						</div>
						<div v-show="isShow" class="price">
							<h3>￥<span>{{price}}</span>元</h3>
							<p>已放入您的账户，可用于提现</p>
						</div>
						<div v-show="!isShow" class="price">
							<h3><span>{{price}}</span></h3>
						</div>
						<a href="#/history">查看我的钱包</a>
					</div>
					<div class="close" @click="order"></div>
				</div>
			</div>
		</div>
		<c-alert show=true :text='alertText' :style='{display:alertShow?"":"none",top:"62%",background:"none",color:"red",fontSize:"16px"}'></c-alert>
	</div>
</template>
<script>
	import c_alert from '../components/alert.vue'
	export default{
		name:'',
		data(){
			return{
				isTrue:true,
				isShow:false,
				price:'',
				title:'',
				mid:'',
				alertShow:false,
			}
		},
		props:["show","activeId","fn"],
		mounted:function(){
		},
		components:{
			"c-alert":c_alert
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
			order:function(){
				var self = this;
				this.$emit(this.fn);
				setTimeout(function(){
					self.isTrue = true;
				},600)				
			},
			openBag:function(){
				var self = this;
				this.isTrue = false;
				$.ajax({
					url:baseUrl+'/sys_biz_set/red_packet_get/'+self.activeId,
					dataType:'jsonp',
					success:function(res){
						//console.log(res);
						//alert(res.msg);
						if(res.return == 'true'){
							self.price = res.msg;
							self.isShow = true;
						}else{
							self.price = '已被抢光';
							self.isShow = false;
						}
					}
				})
			},
		}
	}
</script>
<style lang="scss">
	.redbag{
		.mask{
			position: fixed;
		    top: 0;
		    right: 0;
		    left: 0;
		    bottom: 0;
		    background-color: #373737;
		    background-color: rgba(55, 55, 55, 0.6);
		    height: 100%;
		    filter: alpha(opacity=50);
		    z-index: 1050;
		}
		.wrap{
			position: fixed;
		    overflow: auto;
		    top: 0;
		    right: 0;
		    bottom: 0;
		    left: 0;
		    z-index: 1051;
		    overflow-scrolling: touch;
		    outline: 0;
		    .box{
		    	position:absolute;
		    	top:50%;
		    	left: 50%;
		    	width: (260/20)+rem;
		    	height: (353/20)+rem;
		    	transform:translate(-50%,-50%);
		    	-webkit-transform:translate(-50%,-50%);
		    	border-radius:16px;
		    	text-align: center;
		    	background-color:#fff;
		    	.cont{
			    	position:relative;
			    	height: 100%;
			    	.step-one{
			    		h2{
				    		font-size: (24/20)+rem;
				    		color:#414141;
				    		padding-top: (28/20)+rem;
				    		padding-bottom: (11/20)+rem;
				    	}
				    	p{
				    		font-size:(16/20)+rem;
				    		color:#787878;
				    		line-height: (24/20)+rem;
				    		span{
				    			font-size:16px;
				    			color:#f74d3f;
				    			padding: 0 5px;
				    		}
				    	}
				    	.bag{
				    		position:relative;
				    		width: (80/20)+rem;
				    		height: (110/20)+rem;
				    		margin: (15/20)+rem auto 0;
				    		border-radius:9px;
				    		background-color:#ec3c0d;
				    		overflow:hidden;
				    		.border{
				    			position:absolute;
				    			top: -(80/20)+rem;
				    			left: 50%;
				    			height:(120/20)+rem;
				    			width: (120/20)+rem;
				    			border-radius:100%;
				    			border:3px solid #ffd637;
						    	transform:translate(-50%,0);
						    	-webkit-transform:translate(-50%,0);
				    		}
				    		.icon{
				    			position:absolute;
				    			top:(23/20)+rem;
				    			left: 50%;
				    			width: 30px;
				    			height: 30px;
				    			border-radius:100%;
						    	transform:translate(-50%,0);
						    	-webkit-transform:translate(-50%,0);
				    			background: url(../icon/icon_rb_money.png) no-repeat center center #fcd83b;
				    		}
				    	}
				    	.btn{
				    		position:absolute;
				    		left:50%;
				    		bottom:(18/20)+rem;
				    		color: #fff;
				    		padding:(10/20)+rem (65/20)+rem;
				    		border-radius:(90/20)+rem;
				    		white-space: nowrap;
				    		transform:translate(-50%,-50%);
				    		-webkit-transform:translate(-50%,0);
				    		background-color: #f74d3f;
				    	}
			    	}
			    	.step-two{
			    		position:relative;
			    		width: 100%;
			    		height:100%;
			    		overflow:hidden;
			    		.border-big{
			    			position:relative;
			    			height:(120/20)+rem;
			    			top:-1px;
			    			.top{
			    				height:(20/20)+rem;
				    			border-top-right-radius: 16px;
				    			border-top-left-radius: 16px;
					    		background-color:#ec3c0d;
			    			}
			    			.bottom{
			    				position:absolute;
			    				left: 50%;
			    				top: (19/20)+rem;
			    				height: (100/20)+rem;
			    				width: (265/20)+rem;
				    			border-bottom-right-radius: 100%;
				    			border-bottom-left-radius: 100%;
					    		background-color:#ec3c0d;
						    	transform:translate(-50%,0);
						    	-webkit-transform:translate(-50%,0);
								animation: myanimate 0.2s;
								-moz-animation: myanimate 0.2s;	/* Firefox */
								-webkit-animation: myanimate 0.2s;	/* Safari 和 Chrome */
								-o-animation: myanimate 0.2s;	/* Opera */
			    			}
			    		}
			    		.icon-big{
			    			position:absolute;
			    			top:(95/20)+rem;
			    			left: 50%;
			    			width: (47/20)+rem;
			    			height: (47/20)+rem;
			    			margin-left:-(23/20)+rem;
			    			border-radius:100%;
			    			background: url(../icon/icon_rb_money_big.png) no-repeat center center #fcd83b;
			    			background-size: 48% 63%;
			    		}
			    		.hd{
			    			position:absolute;
			    			width: 100%;
			    			top:(15/20)+rem;
			    			h3{
			    				margin-bottom: (8/20)+rem;
			    				font-size:(20/20)+rem;
			    				color:#fff;
			    			}
			    			p{
			    				font-size:(12/20)+rem;
			    				color:#fff;
			    			}
			    		}
			    		.price{
			    			margin-top: (50/20)+rem;
			    			margin-bottom:(60/20)+rem;
			    			h3{
			    				font-size: (18/20)+rem;
			    				font-weight: 500;
			    				margin-bottom:(10/20)+rem;
			    				span{
			    					padding: 0 5px;
			    					font-size:(40/20)+rem;
			    					white-space:nowrap;
			    					overflow:hidden;
			    					text-overflow:ellipsis;
			    					box-sizing: border-box;
			    				}
			    			}
			    		}
			    	}
			    	a{
			    		position:absolute;
			    		left: 50%;
			    		bottom:20px;
			    		color:#576392;
			    		transform: translate(-50%,0);
			    		-webkit-transform: translate(-50%,0);
			    	}
				    .close{
				    	position:absolute;
				    	top: -25px;
				    	right: -25px;
			    		width: 26px;
			    		height: 26px;
			    		line-height:26px;
				    	text-align: center;
				    	border-radius: 100%;
				    	background:url(../icon/icon_close.png) no-repeat center center #bfbfbf;
				    }
			    }
		    }
		}
	}
	@keyframes myanimate{
		0% {height: (200/20)+rem}
		100% {height:(100/20)+rem}
	}

	@-moz-keyframes myanimate{ /* Firefox */	
		0% {height: (200/20)+rem}
		100% {height:(100/20)+rem}
	}

	@-webkit-keyframes myanimate{ /* Safari 和 Chrome */	
		0% {height: (200/20)+rem}
		100% {height:(100/20)+rem}
	}

	@-o-keyframes myanimate{ /* Opera */	
		0% {height: (200/20)+rem}
		100% {height:(100/20)+rem}
	}
</style>