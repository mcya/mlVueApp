/**
 * group_note
 * @authors kwun (liangyk@mlxing.com)
 * @date    2017-02-07 14:07:39
 * @version $Id$
 */

<template>
	<div class="group_note">
		<box gap="10px 10px">
			<div class="note-pad">
				<div class="pad-hd">
					<div class="title">
						<h2>出团游</h2>
						<button v-show="!isEdit" @click="edit">编辑</button>
						<button v-show="isEdit" @click="done">完成</button>
					</div>
					<router-link to="add_note">
					<div class="add-note">
						<b>+</b>
						<span>新建出游团</span>
					</div>
					</router-link>
				</div>
				<div class="pad-bd" id="sortBox">
					<router-link :to="isEdit?'':'/add_note'">
					<div class="item" id="1">
						<span v-show="isEdit" class="del">一</span>
						<section>
							<h3>广东肇庆1日游</h3>
							<p>0条笔记</p>
						</section>				
						<span v-show="isEdit" class="drag">三</span>
					</div>
					</router-link>
					<router-link :to="isEdit?'':'/add_note'">
					<div class="item" id="2">
						<span v-show="isEdit" class="del">一</span>
						<section>
							<h3>广东肇庆2日游</h3>
							<p>0条笔记</p>
						</section>				
						<span v-show="isEdit" class="drag">三</span>
					</div>
					</router-link>
					<router-link :to="isEdit?'':'/add_note'">
					<div class="item" id="3">
						<span v-show="isEdit" class="del">一</span>
						<section>
							<h3>广东肇庆3日游</h3>
							<p>0条笔记</p>
						</section>				
						<span v-show="isEdit" class="drag">三</span>
					</div>
					</router-link>
				</div>
				<div class="pad-fd">
					<section>
						<h3>废纸篓</h3>
						<p>0条笔记</p>
					</section>
				</div>
			</div>
		</box>
	</div>
</template>
<script>
	import { Group,Cell,Box } from 'vux'
	import $sort from '../../widget/Sortable.js'
	export default{
		name:'group_note',
		data(){
			return {
				title:"带团助手",
				isEdit:false,
			}
		},
		mounted:function(){
			var foo = document.getElementById("sortBox");
			new $sort(sortBox, {
				handle: ".drag", // Restricts sort start click/touch to the specified element	
			    store: {
			        get: function (sortable) {
			            var order = localStorage.getItem(sortable.options.group.name);
			            return order ? order.split('|') : [];
			        },
			        set: function (sortable) {
			            var order = sortable.toArray();
			            localStorage.setItem(sortable.options.group.name, order.join('|'));
			        }
			    },
			    onUpdate: function (evt) {
			    	var idArr = [];
			        $('.pad-bd .item').each(function(){
			        	idArr.push($(this).attr('id'));
			        })
			        console.log(idArr);
			    },
			});
		},
		created:function(){
			var title = document.getElementsByTagName('title')[0];
			title.innerHTML = this.title;
		},
		computed:{
		},
		components:{
			Group,Cell,Box,
		},
		methods:{
			edit:function(){
				this.isEdit = true;
			},
			done:function(){
				this.isEdit = false;
			}
		}
	}
</script>
<style lang="scss">
.group_note{
	min-height: 100%;
	padding-top: 1px;
	background-color: #eceef3;
	.note-pad{
		//padding: (20/20)+rem;
		.pad-hd{
			border-top-left-radius:(5/20)+rem;
			border-top-right-radius:(5/20)+rem;
			background-color: #fff;
			margin-bottom: (30/20)+rem;
			.title{
				position: relative;
				padding: (10/20)+rem;
				border-bottom: 1px solid #ddd;
				h2{
					font-size:(20/20)+rem;
					text-align: center;
					font-weight:normal;
				}
				button{
					position:absolute;
					top: 50%;
					right: (10/20)+rem;
					color: #f00;
					font-size:(16/20)+rem;
					transform: translateY(-50%);
					-webkit-transform: translateY(-50%);
					border:none;
				}
			}
			.add-note{
				padding: (10/20)+rem (20/20)+rem;
				b{
					display: inline-block;
					width: 24px;
					height: 24px;
					line-height: 24px;
					margin-right: 10px;
					color: #f00;
					text-align: center;
					border:1px solid #f00;
					border-radius: 100%;
				}
				span{
					font-size: (16/20)+rem;
					color: #f00;
				}
			}
		}
		.pad-bd{
			background-color:#fff;
			.item{
				position:relative;
				padding: (5/20)+rem (20/20)+rem;
				border-bottom:1px solid #ddd;
				.del{
					display: inline-block;
					width: 24px;
					height: 24px;
					line-height: 24px;
					margin-right: 10px;
					color: #fff;
					text-align: center;
					border-radius: 100%;
					background-color: #f00;
				}
				.drag{
					position:absolute;
					right: (20/20)+rem;
					top: 50%;
					transform:translateY(-50%);
					-webkit-transform:translateY(-50%);
				}			
			}
		}
		.pad-fd{
			padding: (5/20)+rem (20/20)+rem;
			border-bottom-left-radius:(5/20)+rem;
			border-bottom-right-radius:(5/20)+rem;
			background-color: #fff;
		}
		section{
			display:inline-block;
			vertical-align: middle;
			h3{
				color: #333;
				font-size:(16/20)+rem;
				font-weight: normal;
			}
			p{
				color: #ccc;
			}
		}
	}
}
</style>