/**
 * group_detail
 * @authors kwun (liangyk@mlxing.com)
 * @date    2017-02-08 11:34:32
 * @version $Id$
 */

<template>
	<div class="group_detail">      		
		<div class="header">
			<box gap="10px 10px">
				<flexbox>
					<flexbox-item :span="7/12">
						<div class="flex-item">
							<datetime @on-change="change" v-model="value" format="YYYY-MM-DD HH:mm" :title="$t('中文')" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="确定" cancel-text="取消">
								<x-button><icon type="info_circle"></icon>提醒</x-button></div>
							</datetime>						
					</flexbox-item>
					<flexbox-item ><div class="flex-item">通讯录</div></flexbox-item>
					<flexbox-item ><div class="flex-item">分房</div></flexbox-item>
				</flexbox>				
			</box>
			<alert v-model="show" title="111"> {{ $t('Your Message is sent successfully~') }}</alert>
		</div>
		<div class="container">
			<box class="contBox" gap="10px 10px">
				<div id="wrapper">
					<div id="scroller">
						<section class="item" v-for="list in 2">
							<div class="item-scroller">
								<div class="msgBox">
									<p class="type">记事</p>
									<div class="cont">
										<p>12:00之前收集12名游客收集信息</p>
									</div>
									<p class="time">2017-02-08</p>
								</div><div class="control">
									<flexbox>
										<flexbox-item ><div class="flex-item" @click.stop="note()">通知</div></flexbox-item>
										<flexbox-item ><div class="flex-item" @click.stop="del()">删除</div></flexbox-item>
									</flexbox>
								</div>
							</div>
						</section>
						<section class="item">
							<div class="item-scroller">
								<div class="msgBox">
									<p class="type">记事</p>
									<div class="cont">
										<p>12:00之前收集12名游客收集信息之前收集12名游客收集信息之前收集12名游客收集信息之前收集12名游客收集信息之前收集12名游客收集信息之前收集12名游客收集信息</p>
									</div>
									<p class="time">2017-02-08</p>
								</div><div class="control">
									<flexbox>
										<flexbox-item ><div class="flex-item" @click.stop="note()">通知</div></flexbox-item>
										<flexbox-item ><div class="flex-item" @click.stop="del()">删除</div></flexbox-item>
									</flexbox>
								</div>
							</div>
						</section>
					</div>
				</div>
			</box>
		</div>
		<div class="footer">
		    <flexbox>
		      	<flexbox-item><div class="code">1</div></flexbox-item>
		      	<flexbox-item><div class="add">+</div></flexbox-item>
		      	<flexbox-item><div class="message">3</div></flexbox-item>
		    </flexbox>
		</div>		
	</div>
</template>
<script>
	import { Flexbox, FlexboxItem, Box, XButton, Icon, Alert, Datetime } from 'vux'
	import $jroll from '../../widget/JRoll.js'
	export default{
		name:'group_detail',
		data(){
			return {
				title:"出团游名称",//需获取后台返回title
				//show:true,

			}
		},
		mounted:function(){
			var jroll = new $jroll("#wrapper", {
	            scrollBarY:true,scrollBarY:false
	        });
	        var items = document.querySelectorAll(".item");
	        var current = null; //保存当前滑开的item

	        for (var i=0,l=items.length; i<l; i++) {
	        	items[i].childNodes[0].childNodes[1].style.height = items[i].offsetHeight +'px';
	            var j = new JRoll(items[i], {
	                scrollX:true,
	                bounce:false
	            });

	            j.on("scrollStart", function() {
	            	$(this.wrapper).addClass('edit')
	                if (current && current !== this) {
	                    current.scrollTo(0, 0, 100);
	                    current = null;
	                }
	            });

	            j.on("scroll", function(e) {
	            	$(this.wrapper).addClass('edit')
	                if (this.x === 0 && !current) {
	                    this.call(jroll, e);
	                } else {
	                    current = this;
	                }
	            });

	            j.on("scrollEnd", function() {
	                if (this.x > -50) {
	                    this.scrollTo(0, 0, 100);
	                    current = null;
	                	$(this.wrapper).removeClass('edit')
	                } else {
	                    this.scrollTo(this.maxScrollX, 0, 100);
	            		$(this.wrapper).addClass('edit')
	                }
	            })
	        };

	        //添加点击删除按钮的事件
	        /*jroll.scroller.addEventListener("click", function(e) {
	            if (e.target.className === "del") {
	                alert("点击删除");
	            }
	        }, false);*/

		},
		created:function(){
			var title = document.getElementsByTagName('title')[0];
			title.innerHTML = this.title;
		},
		computed:{
		},
		components:{
			Flexbox,FlexboxItem,Box,XButton,Icon,
			Alert,Datetime,
		},
		methods:{
			change:function(){

			},
			note:function(){
				console.log("通知");
			},
			del:function(){
				console.log("删除");
			}
		}
	}
</script>
<style lang="scss">
.group_detail{	
	min-height: 100%;
	background-color: #fff;
	.header{
		padding: 1px 0;
		background-color: #eceef3;
		.flex-item{
			text-align:center;
			.weui_cell{
				padding:0;
			}
			button{
				text-align:left;
				.weui_icon{
					position:relative;
					top: -2px;
					display: inline-flex;
					vertical-align: middle;
					margin-right: 10px;
				}
			}
		}
	}
	.container{
		padding: 1px 0;
		background-color: #fff;
		.contBox{
			overflow: hidden;
		}
		#wrapper{
			position: absolute;
            top: 84px;
            bottom: (90/20)+rem;
            left:10px;
            right: 10px;
		}
		section{
			//height: 100%;
			// height:58px;
			margin-bottom: 15px;
			white-space: nowrap;
			&.edit{
				.msgBox{
					border-top-right-radius:0;
					border-bottom-right-radius:0;
				}
			}
			.item-scroller{
				width: 130%;
			}
			.msgBox{
				position:relative;
				display:inline-block;
				width: 77%;
				border-radius: 5px;
				border:1px solid #ddd;
				padding: 5px 15px;
				box-sizing: border-box;
				.type{
					position:absolute;
					right: 10px;
					color: #bbb;
				}
				.cont{
					padding-top: 5px;
					padding-right: 30px;
					p{
						font-size:16px;
						line-height:24px;
						white-space:normal;
					}
				}
				.time{
					color:#ccc;
				}
			}
			.control{
				display:inline-block;
				height: 100%;
				//min-height:58px;
				width: 23%;
				border-top-right-radius:5px;
				border-bottom-right-radius:5px;
				box-sizing: border-box;
				vertical-align:top;
				background-color: #f00;
				.vux-flex-row{
					height: 100%;
				}
				.flex-item{
					color: #fff;
					text-align:center;
				}
			}
		}
	}
	.footer{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: (75/20)+rem;
		border-top: 1px solid #ddd;
		background-color: #fff;
		.add{
			position:absolute;
			bottom:0px;
			width: (112/20)+rem;
			height: (85/20)+rem;
			line-height: (85/20)+rem;
			margin: 0 auto;
			color: #fff;
			font-size: (80/20)+rem;
			text-align: center;
			border-top-left-radius:(10/20)+rem;
			border-top-right-radius:(10/20)+rem;
			background-color: #f00;
		}
	}
}
@keyframes mySlideLeft{
	from {transform:translateX(0px);}
	to {transform:translateX(-150px);}
}
@-moz-keyframes mySlideLeft{ /* Firefox */
	from {transform:translateX(0px);}
	to {transform:translateX(-150px);}
}
@-webkit-keyframes mySlideLeft{ /* Safari 和 Chrome */
	from {transform:translateX(0px);}
	to {transform:translateX(-150px);}
}
@-o-keyframes mySlideLeft{ /* Opera */
	from {transform:translateX(-150px);}
	to {transform:translateX(0px);}
}
@keyframes mySlideRight{
	from {transform:translateX(-150px);}
	to {transform:translateX(0px);}
}
@-moz-keyframes mySlideRight{ /* Firefox */
	from {transform:translateX(-150px);}
	to {transform:translateX(0px);}
}
@-webkit-keyframes mySlideRight{ /* Safari 和 Chrome */
	from {transform:translateX(-150px);}
	to {transform:translateX(0px);}
}
@-o-keyframes mySlideRight{ /* Opera */
	from {transform:translateX(-150px);}
	to {transform:translateX(0px);}
}
</style>