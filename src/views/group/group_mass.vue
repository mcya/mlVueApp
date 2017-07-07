/**
 * group_mass
 * @authors kwun (liangyk@mlxing.com)
 * @date    2017-02-09 15:00:12
 * @version $Id$
 */

<template>
	<div class="group_mass">
		<div class="input-text">
			<div class="tel_group">
				<label>收件人：</label>
				<span>广东肇庆1日游</span>
				<span>广东肇庆2日游</span>
				<span>广东肇庆</span>
				<span>广东肇庆2日游广东肇庆2日游</span>
			</div>
			<span class="add_group">+</span>
		</div>
		<group>
			<x-textarea :max="200" placeholder="在这里输入信息" :height="200" :rows="8" :cols="30"></x-textarea>
		</group>
		<box gap="10px 10px">
			<flexbox>
				<flexbox-item ><div class="flex-item"><x-button type="warn">选择模板</x-button></div></flexbox-item>
				<flexbox-item ><div class="flex-item"><x-button type="warn">发送</x-button></div></flexbox-item>
			</flexbox>
		</box>
	</div>
</template>
<script>
	import { Group,Cell,XTextarea,Box,XButton,Flexbox,FlexboxItem } from 'vux'
	export default{
		name:'group_mass',
		data(){
			return {
				title:'群发短信'
			}
		},
		mounted:function(){
		},
		created:function(){
			var title = document.getElementsByTagName('title')[0];
			title.innerHTML = this.title;
		},
		computed:{
		},
		components:{
			Group, Cell,XTextarea,Box,XButton,Flexbox,FlexboxItem
		},
		methods:{
		}
	}
</script>
<style lang="scss">
.group_mass{
	.input-text{
		position: relative;
		padding: 10px;
		overflow: hidden;
		label{
			float: left;
			padding:3px 0;
			font-size: 14px;
		}
		.tel_group{
			float:left;
			padding-right: 30px;
			span{
				display:inline-block;
				padding:3px 8px;
				max-width: 100px;
				white-space: nowrap;
				word-break: break-all;
				//-webkit-word-break: all-break;
				overflow: hidden;
				text-overflow:ellipsis;
				color: #fff;
				border-radius:12px;
				background-color: #f00;
			}
		}
		.add_group{
			position:absolute;
			display: inline-block;
			right: 10px;
			width: 24px;
			height: 24px;
			line-height: 24px;
			text-align: center;
			color: #f00;
			border:1px solid #f00;
			border-radius:100%;
		}
	}
	.vux-no-group-title{margin-top: 0;}
}
</style>