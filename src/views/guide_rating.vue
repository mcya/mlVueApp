<template>
	<div class="guide_rating">
		<h3>分值和分值标签</h3>
		<table>
			<tr>
				<th>级别</th>
				<th>星级分</th>
				<th>分值</th>
				<th>标签内容</th>
			</tr>
			<tr v-for="(list,index) in tagList">
				<td v-html="list.star"></td>
				<td v-if="1 < index && index <5" v-html="level"></td>
				<td v-else>{{list.level}}</td>
				<td v-html="list.score"></td>
				<td class="normal">{{list.content}}</td>
			</tr>			
		</table>
		<section>
			<p>三星分值每1000分升一级（根据活跃度大约2-3+个月晋升为四星导游）</p>
			<p>四星分值每2000分升一级（根据活跃度大约3-6+个月晋升为五星导游）</p>
			<p>五星分值每5000分升一级（根据活跃度最少一个月晋升一级）</p>
		</section>
		<h3>升星加分明细</h3>
		<table>
			<tr>
				<th>升级流程</th>
				<th>升级标签</th>
				<th>分值</th>
				<th>备注</th>
			</tr>
			<tr v-for="(list,index) in detailList">
				<td>{{index+1}}</td>
				<td class="normal">{{list.label}}</td>
				<td>{{list.score}}</td>
				<td class="normal">{{list.remark}}</td>
			</tr>
		</table>
		<section>
			<p>备注：标签分值不叠加，标签重复后按后续分数相加。</p>
		</section>
	</div>
</template>
<script>
	export default{
		name:'guide_rating',
		data(){
			return{
				title:'导游评分制度',
				level:"LV1<br/>LV2<br/>LV3<br/>LV4<br/>LV5<br/>LV6<br/>LV7<br/>LV8<br/>LV9<br/>LV10",
				/*score1:"1000-1999<br/>2000-2999<br/>3000-3999<br/>4000-4999<br/>5000-5999<br/>6000-6999<br/>7000-7999<br/>8000-8999<br/>9000-9999<br/>10000-10999",
				score2:"11000-12999<br/>13000-14999<br/>15000-16999<br/>17000-18999<br/>19000-20999<br/>21000-22999<br/>23000-24999<br/>25000-26999<br/>27000-28999<br/>29000-30999",
				score3:"31000-35999<br/>36000-40999<br/>41000-45999<br/>46000-50999<br/>51000-55999<br/>56000-60999<br/>61000-65999<br/>66000-70999<br/>71000-75999<br/>76000-80999",*/
				tagList:[
					{"star":"★","level":"-","score":"0-499","content":"注册导游、完善资料、上传证件"},
					{"star":"★★","level":"-","score":"500-999","content":"注册领队、3年经验导游证"},
					{"star":"★★★","level":"-","score":"1000-1999<br/>2000-2999<br/>3000-3999<br/>4000-4999<br/>5000-5999<br/>6000-6999<br/>7000-7999<br/>8000-8999<br/>9000-9999<br/>10000-10999","content":"5年-8年经验导游证"},
					{"star":"★★★★","level":"-","score":"11000-12999<br/>13000-14999<br/>15000-16999<br/>17000-18999<br/>19000-20999<br/>21000-22999<br/>23000-24999<br/>25000-26999<br/>27000-28999<br/>29000-30999","content":"地级市导游大赛奖状，中级导游员，8年以上经验导游证（满足其中一项达到后另加2000分）"},
					{"star":"★★★★★","level":"-","score":"31000-35999<br/>36000-40999<br/>41000-45999<br/>46000-50999<br/>51000-55999<br/>56000-60999<br/>61000-65999<br/>66000-70999<br/>71000-75999<br/>76000-80999","content":"省级导游大赛奖状，高级导游员，15年以上经验导游证（满足其中一项达到后另加5000分）"},
					{"star":"★★★★★<br/>(珀金级)","level":"-","score":"指定","content":"旅游行业行尊、旅游老师，国家级导游大赛奖状、特级导游员"},
				],
				detailList:[
					{"label":"注册导游、上传导游证、身份证资料、邮箱、紧急联系人资料。","score":"400","remark":"标签分值"},
					{"label":"注册领队、3年经验导游证","score":"500","remark":"标签分值（满足其中一项后另加300分）"},
					{"label":"5年-8年经验导游证","score":"5000","remark":"标签分值"},
					{"label":"地级市导游大赛奖状，中级导游员，8年以上经验导游证","score":"11000","remark":"标签分值（满足其中一项后另加2000分）"},
					{"label":"省级导游大赛奖状，高级导游员，15年以上经验导游证","score":"31000","remark":"标签分值满足其中一项后另加5000分）"},
					{"label":"带团助手吸粉丝，每增加一个","score":"10","remark":"-"},
					{"label":"导游日历表标记出团时间和地方(APP每天签到)","score":"20","remark":"每月30日计算全勤另加100分"},
					{"label":"导游日历发导游圈图片，每发一条","score":"50","remark":"每天封顶100分每月封顶2000分"},
					{"label":"导游圈获点赞一次","score":"0.1","remark":"每月不封顶"},
					{"label":"成功接团一次","score":"100","remark":"-"},
					{"label":"带团助手每团点评一次(5星）","score":"10","remark":"每团封顶200分"},
					{"label":"带团助手每团点评一次(4星）","score":"5","remark":"每团封顶200分"},
					{"label":"带团助手每团点评一次(3星）","score":"0","remark":"每团封顶200分"},
					{"label":"带团助手每团点评一次(2星）","score":"-20","remark":"投诉点评扣分封顶200分，可申诉"},
					{"label":"带团助手每团点评一次(1星）","score":"-100","remark":"投诉点评扣分封顶200分，可申诉"},
					{"label":"标准培训课（1节时）","score":"100","remark":"-"},
					{"label":"精品培训课（1节时）","score":"50","remark":"-"},
					{"label":"点评培训课程","score":"10","remark":"每个课程封顶点评3次（不可刷屏）"},
					{"label":"点赞培训课程","score":"10","remark":"-"},
				]
			}
		},
		created:function(){
			var title = document.getElementsByTagName('title')[0];
			title.innerHTML = this.title;
		},
	}
</script>
<style lang="scss">
	.guide_rating{
		padding:10px;
		background-color:#ececec;
		h3{
			margin-bottom: 8px;
		}
		table{
			width: 100%;
			background-color:#fff;
			th,td{
				white-space: nowrap;
				padding: 2px 5px;
				text-align: center;
				/* border-top:1px solid #ddd;
				border-bottom:1px solid #ddd; */
				border:1px solid #ddd;
			}
			th{
				background-color: #f8f8f8;
			}
			td.normal{
				white-space:normal;
			}
		}
		section{
			margin: 5px 0;
			background-color:#f9f9f9;
			p{
				line-height: 24px;
				font-size: 12px;
			}
		}
	}
</style>