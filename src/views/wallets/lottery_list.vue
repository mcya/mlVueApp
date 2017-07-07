<template>
	<div class="lottery-list">
		<!-- <h1>美丽行国际旅行社2017年会</h1> -->
		<div class="logo"></div>
		<div class="contWrap">
			<div class="price-list" v-show=false>
				<h3>奖品设置</h3>
				<ul>
					<li v-for="list in myPrizes">
						<span>{{list.actName}}</span>
						<span>{{list.name}}</span>
						<span>数量：{{list.qtyNum}}</span>
					</li>
					<!-- <li>
						<span>幸运奖</span>
						<span>iPhone 7 Plus</span>
						<span>数量：20</span>
					</li> -->
				</ul>
			</div>
			<div class="name-list">
				<h3>{{activityName}} 获奖名单 (奖品：{{activityPrizeName}})</h3>
				<div class="table-hd">
					<p></p>
				</div>
				<div class="table-bd">
					<!-- <div class="top">
						<span>名称</span>
						<span>所获奖品</span>
					</div> -->
					<div id="scrollWrap">
						<div id="scroller">
							<ul>
								<li>
									<span v-for="list in prizeList"> 
										<b  :style='{backgroundImage:groupImg(list.headimgurl,{bg:true,width:44,center:true})}' ></b>
										<p>
											<em>美丽行ID:{{list.userNo}}</em>
											<em>{{list.nickname || '&nbsp;'}}</em>
										</p>										
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="code" v-show=false>
				<b></b>
				<p>扫二维码奖品等你来拿</p>
			</div>
		</div>
	</div>
</template>
<script>
	import $iscroll from '../../widget/iscroll-lite.js'
	import $handleImg from '../../widget/handleImg.js'
	export default{
		data(){
			return{
				activityList:null,
				activityId:null,
				activityName:null,
				activityPrizeName:null,
				prizeList:[],
				userInfo:[],
				midArray:[],
				myPrizes:[],
			}
		},
		mounted:function(){			
			this.getActivityList();
			this.getActivityCurId();
		},
		created:function(){
			this.myInterval();
		},
		methods:{
			groupImg:$handleImg,
			getActivityList:function(){
				var self = this;
				$.get('http://mall.mlxing.com/api/prize/getActivity/?flag=2',function(res){
					console.log(res);
					self.activityList = null;
					self.myPrizes = [];
					self.activityList = res.response;

					for(var i=0;i<res.response.length;i++){
						for(var j=0;j<res.response[i].prizes.length;j++){
							if(res.response[i].prizes[j].qtyNum != -1){
								res.response[i].prizes[j].actName = res.response[i].name;
								self.myPrizes.push(res.response[i].prizes[j])
							}							
						}
					}

					/*self.activityId = res.response.id
					self.prizeLevel = res.response.name;
					self.prizes.push(res.prizes);*/
				},'jsonp')
			},
			getActivityCurId:function(){
				var self = this;
				$.get('http://mall.mlxing.com/api/prize/getActivity/?flag=1',function(res){
					self.activityId = self.activityName = self.activityPrizeName = null;
					self.activityId = res.response.id;
					self.activityName = res.response.name;
					for(var i=0;i<res.response.prizes.length;i++){
						if(res.response.prizes[i].qtyNum != -1 ){
							self.activityPrizeName = res.response.prizes[i].name
						}
					}
					self.getPrizeList();					
				},'jsonp')
			},
			getPrizeList:function(){
				var self = this;
				$.ajax({
					url:'http://mall.mlxing.com/api/prize/getLotteryInfoList',
					data:{
						activityId:self.activityId
					},
					dataType:'jsonp',
					success:function(res){
						if(res.code==0){
							self.prizeList = [];
							self.midArray = [];
							for(var i=0;i<res.response.length;i++){
								var obj={									
									nickname:'',
									headimgurl:'',
									prizeName:'',
									userNo:'',
								}
								obj.prizeName=res.response[i].prizeName;
								obj.userNo=res.response[i].userNo;
								self.prizeList.unshift(obj);
								console.log(res);								
								self.midArray.push(res.response[i].userNo);
							}
							self.prizeList.sort(function(a,b){
								return a.userNo - b.userNo;
							})
							self.getUserInfo();							
						}
					},
					error:function(res){
						console.log('ajax error')
					}
				})
			},
			getUserInfo:function(){
				var self = this;
				var obj = this.midArray.sort(function(a,b){
					return a-b;
				});
				console.log(obj);
				$.ajax({
					url:'http://weixin.mlxing.com/shop/find_headimgurl',
					data:{
						mid:obj.join(",")
					},
					dataType:'jsonp',
					success:function(res){
						for(var i=0;i<res.length;i++){
							self.prizeList[i].nickname = res[i].nickname;
							self.prizeList[i].headimgurl = res[i].headimgurl;
						}
						//console.log(self.prizeList);
					},
					error:function(res){

					}
				})
			},
			myInterval:function(){
				var self = this;
				setInterval(self.myFunction,5000);//开始倒计时
			},
			myFunction:function(){
				this.getActivityList();
				this.getActivityCurId();
			},
			clearData:function(){				
				this.activityList=null
				this.activityId=null
				this.activityName=null
				this.activityPrizeName=null
				this.prizeList=[]
				this.userInfo=[]
				this.midArray=[]
				this.myPrizes=[]
			}
		}
	}
</script>
<style lang="scss">
	body{background:#d92032}
	.lottery-list{
		position: absolute;
		//top:0;right:0;bottom: 0;left:0;
		width: 100%;
		min-height: 100%;
		background:url(../../data/annual.jpg) no-repeat center top #d92032;
		background-size: 100%;
		//background-size: cover;
		h1{
			margin: 62px auto;
			font-size:40px;
			color: #fff;
			text-align: center;
		}
		.logo{
			position:absolute;
			left: 50%;
			//top:32%;
			margin-top:5px;
			width: 372px;
			height: 100px;
			transform:translate(-50%,0);
			-webkit-transform:translate(-50%,0);
			background:url(../../data/mlxing_logo.png) no-repeat center center;
			background-size:50% 50%;
		}
		.contWrap{
			position:absolute;
			left:50%;
			top:38%;
			//width: 1660px;
			width: 800px;
	    	transform:translate(-50%,0);
	    	-webkit-transform:translate(-50%,0);

		}
		.price-list{
			display: inline-block;
			/* position:absolute;
			left: 10%; */
			margin-right: 30px;
			vertical-align: bottom;
			h3{
				font-size: 20px;
				color: #fff;
				margin-bottom: 12px;
				text-align:center;
			}
			ul{
				width:389px;
				height:auto;
				//padding: 18px 30px;
				//background:#ffd817;
				li{
  					display: flex;
					display: -webkit-flex; /* Safari */
					width:100%;
					height:32px;
					line-height: 32px;
					padding:0 20px;
					margin: 12px 0;
					border-radius:4px;
					background:#fddd55;
					box-sizing: border-box;
					box-shadow:0 2px 4px 0 rgba(0,0,0,0.04);
					&:last-child{
						margin-bottom:0;
					}
					span{
						color:#410a0a;
					    -webkit-box-flex: 1;
					    -webkit-flex: 1;
					    flex: 1;
						&:nth-child(2){
							-webkit-box-flex: 2;
						    -webkit-flex-grow: 2;
				    		flex-grow: 2;
						}
					}
				}
			}
		}
		.name-list{
			display: inline-block;
			/* position:absolute;
			left: 50%;
			bottom:50px;
			transform:translate(-50%,0);
	    	-webkit-transform:translate(-50%,0); */
	    	padding-bottom: 20px;
			h3{
				font-size: 20px;
				color: #fff;
				margin-bottom: 12px;
				text-align:center;				
			}
			.table-hd{
				position:relative;
				width:800px;
				height:32px;
				padding-top:8px;
				border-radius:9px;
				background:#373737;
				box-sizing: border-box;
				box-shadow:0 2px 4px 0 rgba(0,0,0,0.50), inset 0 3px 3px 0 rgba(0,0,0,0.50);
				z-index:12;
				p{
					width:800px;
					height:9px;
					opacity:0.13;
					border-radius:1px;
					background:#ffffff;
				}
			}
			.table-bd{
				position:relative;
				height: 390px;
				margin:0 12px;
				background:#fff;
				.top{
					display: -webkit-flex; /* Safari */
					display: flex;
					height:45px;
					line-height:45px;
					text-align: center;
					border-bottom: 1px solid #ccc;
					background-color: #eaeaea;
					span{
						-webkit-box-flex: 1;
					    -webkit-flex: 1;
					    flex: 1;
				    	border-right:1px solid #afafaf;
					    &:last-child{
					    	border-right:none;
					    }
					}
				}
				#scrollWrap{
					position: absolute;
					z-index: 1;
					top: 0;
					bottom: 0;
					left: 0;
					width: 100%;
					overflow: hidden;
					background:url(../../data/mark.png) no-repeat center center;
					#scroller {
						position: absolute;
						z-index: 1;
						-webkit-tap-highlight-color: rgba(0,0,0,0);
						width: 100%;
						-webkit-transform: translateZ(0);
						-moz-transform: translateZ(0);
						-ms-transform: translateZ(0);
						-o-transform: translateZ(0);
						transform: translateZ(0);
						-webkit-touch-callout: none;
						-webkit-user-select: none;
						-moz-user-select: none;
						-ms-user-select: none;
						user-select: none;
						-webkit-text-size-adjust: none;
						-moz-text-size-adjust: none;
						-ms-text-size-adjust: none;
						-o-text-size-adjust: none;
						text-size-adjust: none;
						ul{
							li{
								line-height:32px;
								overflow: hidden;
								//padding: 10px 0;
								//border-top:1px solid #f0f0f0;
								//border-bottom:1px solid #f0f0f0;
								span{
									float: left;
									display:inline-block;
									width: 25%;
									padding-left:15px;
									margin:10px 0;
									box-sizing: border-box;
									b{
										position:relative;
										top:5px;
										display:inline-block;
										width: 45px;
										height: 45px;
										border-radius: 100%;
										background-size:100% 100%;
										vertical-align:baseline;
									}
									p{
										display:inline-block;
										text-align:left;
										margin-left:10px;
										em{
											font-style: normal;
											display:block;
											height:24px;
											line-height: 24px;
										}
									}
									&:last-child{
										font-size:20px;
										line-height:56px;
										padding-left:0;
										text-align: center;
									}
								}
								/* &:nth-child(odd){
									background-color:rgba(240, 240, 240, 1);
								} */
							}
						}
					}
				}
				
			}
		}
		.code{
			/* position:absolute;
			right: 100px;
			bottom:50px ;*/
			display:inline-block;
			text-align: center;
			margin-left: 30px;
			padding-right: 200px;
			vertical-align:bottom;
			b{
				display:inline-block;
				padding:10px;
				height: 133px;
				width: 133px;
				background:url(../../data/code.png) no-repeat center center;
				background-size: 100% 100%;
			}
			p{
				font-size:20px;
				color: #dfff55;
				margin-top:10px;
			}
		}
	}
</style>