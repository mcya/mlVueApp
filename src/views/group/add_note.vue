/**
 * add_note
 * @authors kwun (liangyk@mlxing.com)
 * @date    2017-02-08 10:28:21
 * @version $Id$
 */

<template>
	<div class="add_note">
		<group title="笔记本名称">
	      	<x-input placeholder="新建笔记本"></x-input>
	    </group>
		<box gap="10px 10px">
  			<x-button type="warn">完成</x-button>
  		</box>
	</div>
</template>
<script>
	import { XInput, Group, Box, XButton, Cell } from 'vux'
	export default{
		name:'add_note',
		data(){
			return {
				title:"新建出游团",
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
			XInput, Group, Box, XButton, Cell
		},
		methods:{
		}
	}
</script>
<style lang="scss">
.add_note{
	min-height: 100%;
	padding-top: 1px;
	background-color: #eceef3;
	.weui_input{
		font-size: 18px;
	}
}
</style>