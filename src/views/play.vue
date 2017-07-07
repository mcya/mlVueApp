<template>
	<div class="Play-page">
		<transition name='view'>
		<c-send-msg v-if='sendpl' fn='xxx'  v-on:xxx='pinglunCallback'  biz_type='t_course_info' :id='id'>
		</c-send-msg>
		</transition>
		<header>
			<div class="picture" v-if='media_type==2'>
				<img :src="covers_url">
				<div class="barrage" id="ul_li" :hidden="zhezhaoceng_ul">
					<ul>
						<li v-on:click="dianzan"><img src="../data/点赞.png"><span class="dianzan" >{{parse_num}}</span></li>
						<li v-on:click="shouchang"><img src="../data/收藏.png"><span class="shouchuang" >{{collect_num}}</span></li>
						<li class="iconfont" v-on:click="pinlun_click" >&#xe61f;<span class="pinglun" >{{pinlun_shu}}</span></li>
						<li id="fenxiang" v-on:click="fenxiang" v-if='false'><img src="../icon/分享 copy.png"></li>
						<li v-on:click="jianjie_dashang"><img src="../data/Group.png"></li>
					</ul>
				</div>
				<div class="arrows"><span class="iconfont" v-on:click="return_trained">&#xe622;</span></div>
			</div>
		</header>
		<main>
			<div class="play"  v-if='media_type==2'>
				<div class="progress-bar">
					<div class="progress_color"></div>
					<div class="progress_yuan"></div>
				</div>
				<div class="play_time">
					<span class="left">{{bofangshichang}}</span>
					<span class="right">{{time_len}}</span>
				</div>
				<div class="play1">
					<ul>
						<li class="iconfont" v-on:click="retreat">&#xe60c;</li>
						<li class="play-pause"><img :src="imgsrc" v-on:click="click_play"></li>
						<li class="iconfont" v-on:click="forward">&#xe60b;</li>
						<li class="iconfont" >&#xe611;</li>
					</ul>
				</div>
				<div>
					<audio id="adoMain" :src="content_url"></audio>
				</div>
				
			</div>
			<div v-if='media_type==1' id="iframe">
				<iframe height=200 width=100% :src="content_url" frameborder=0 allowfullscreen v-on:click="shiping"></iframe>
				<div class="picture">
					<div class="barrage" style="position: absolute;top:-2px">
						<ul>
							<li class="iconfont" v-on:click="dianzan">&#xe603;<span class="dianzan" >{{parse_num}}</span></li>
							<li class="iconfont" v-on:click="shouchang">&#xe601;<span class="shouchuang" >{{collect_num}}</span></li>
							<li class="iconfont" v-on:click="pinlun_click" >&#xe61f;<span class="pinglun" >{{pinlun_shu}}</span></li>
							<li id="fenxiang" v-on:click="fenxiang" v-if='false'><img src="../icon/分享 copy.png"></li>
							<li v-on:click="jianjie_dashang"><img src="../data/Group.png" style="width: 24px;height: 24px;"></li>
						</ul>
					</div>
					<!--<div class="arrows"><span class="iconfont" v-on:click="return_trained">&#xe622;</span></div>-->
				</div>
			</div>
			<div class="xian"></div>
			<div class="intro">
				<div class="int1">
					<ul>
						<li class="img_width"><img :src="res"></li>
						<li v-if='content.has'>
							<p class="int1_p1">{{content.teacher}} </p>
							<p class="yans"><span></span>{{content.browse_num}}人学过</p>
						</li>
						<li v-on:click="chakanjj">大咖风采
						</li>
						<li> {{content.title}}</li>
						<li>发布时间  <span class="fabu_time">11.21</span></li>
						<!--<div>
							<span>{{content.title}}</span>
						</div>-->
					</ul>
				</div>
				<div class="clearfloat"></div>
				<div class="xian"></div>
				<div class="int2">
					<h3 >简介</h3>
					<div>
						<p class="p1"></p><span class="span"></span>
					</div>
					<p  class="intro-p">{{content.intro}}</p>
				</div>
				<div class="int3">
					<h3>讲稿</h3>
					<div>
						<p class="p1"></p><span class="span"></span>
					</div>
					
					<div class="swiper-container ppt">
						<div class="swiper-wrapper" >
							<div v-for="ppt in ppts" class="swiper-slide"><img :src="ppt_img_url+ppt"></div>
							
						</div>
						<!--<div class="swiper-pagination"></div>-->
					</div>
					
				</div>
			</div>
			<div style="clear:both"></div>
			<div class="xian2"></div>
			<div class="jiang">
				<h3>推荐课程</h3>
				<div>
					<p class="p2"></p><span></span>
				</div>
				<!--<div class="dl1" v-on:click="jiang_click">
					<dl>
						<dt class="img_width"><img :src="res"></dt>
						<dd>
							<p>{{content.teacher}}</p>
						</dd>
					</dl>
					<span></span>
				</div>-->
				<div class="xiang">
					<!--<div class="x1">
						<h3>相关课程</h3>
						<div>
							<p class="p1"></p><span></span>
						</div>
						<div class="clearfloat"></div>
					</div>-->
					<div class="x1" v-for="recommend in recommends"  v-on:click="go_play(recommend,recommends)">
						<dl>
							<dt>
								<div class="teacher_img"><img :src="img_url+recommend.icon_url"/></div>
								<div class="mf">
									<p v-on:click="go_zhifu(recommend,recommends)">{{recommend.price}}</p>
								</div>
							</dt>
							<dd>
								<h3>大咖：{{recommend.teacher}}</h3>
								<h3 style="color: #707070;font-size: 14px;">{{recommend.title}}</h3>
								<p> {{recommend.browse_num}}人学过</p>
							</dd>
						</dl>
						<div class="xian3"></div>
					</div>
				</div>
			</div>
		</main>
			<div class="comment">
			<div class="com">
				<div class="xian"></div>
				<div class="content" v-for='pin in pinlun'>
					<div class="left"><img :src="pinlun_headimg+pin.headimgurl"></div>
					<div class="right">
						<ul>
							<li v-on:click="pinlun_click">{{pin.comment_user}}<span class="shijian">{{pin.comment_time}}</span><span class="iconfont span_font">&#xe603;  {{praise_num}}</span></li>
							<li v-on:click="pinlun_click"></li>
							<li v-on:click="pinlun_click">{{pin.comment_content}}</li>
							<li class="huifuclass">
							<p v-on:click="fs_huifu(pin,pinlun)"><span id="huifu_ba">{{chakanhuifu}}</span>
								<div v-show='huifuxianshi'>
									<div v-for='inf in pin.reply' class="huifu_font">{{nickname}}:{{inf.comment_content}}</div>
								</div>
							</p>
							<!--<ol >
								<li v-for='inf in pin.reply'>{{inf.comment_content}}</li>
							</ol>-->
							</li>
						</ul>
						<div class="xixian"></div>
					</div>
				</div>
			</div>
			<div class="genduo" v-on:click="genduo" >
				<p>查看更多评论</p>
			</div>
			<!--<div class="btm">
				<div class="left">
					<ul>
						<li></li>
						<li>试听</li>
						<li>您只能试听十分钟</li>
					</ul>
				</div>
				<div class="right">
					<ul>
						<li>购买</li>
						<li>￥199</li>
					</ul>
				</div>
			</div>-->
		</div>
		<div class="zhezhaoceng" :hidden='zhezhaoceng'>
			<p class="zhezhaoceng_p1">您可以试听180秒，听完整版请</p>
			<p class="zhezhaoceng_p2" v-on:click="go_goumai">立即购买</p>
		</div>
		<div class="zhezhao" v-if='f_t' v-on:click="zhezhao">
			<p>点击右上角三个点的按钮分享给好友</p>
		</div>
		<c-alert :show='danmu_true' :text='danmu_tishi'></c-alert>
	</div>
</template>

<style>

	@font-face {
		font-family: "iconfont";
		src: url('../font/iconfont.eot');
		/* IE9*/
		src: url('../font/iconfont.eot#iefix') format('embedded-opentype'), /* IE6-IE8 */
		url('../font/iconfont.woff') format('woff'), /* chrome, firefox */
		url('../font/iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
		url('../font/iconfont.svg#iconfont') format('svg');
		/* iOS 4.1- */
	}
	
	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}
	.Play-pause{
		width: 100%;
		overflow-x: hidden;
	}
	.Play-page #iframe{
		width: 100%;
		height: 248px;
	}
	.Play-page #video1 {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 188px;
		z-index: 0;
	}
	
	.Play-page .barrage {
		height: 45px;
		width: 100%;
		background: #000000;
		opacity: 0.4;
		position: absolute;
		top: 144px;
		left: 0px;
		z-index: 2;
	}
	
	.Play-page .barrage li {
		height: 45px;
		list-style: none;
		float: left;
		font-size: 25px;
		font-weight: 500;
		width: 25%;
		text-align: center;
		line-height: 45px;
		color: white;
	}
	#ul_li img{
		width: 22px;
		height: 22px;
	}
	.Play-page .barrage li span{
		position: absolute;
		top: -12px;
		font-size:11px;
		color: white;
		font-weight: none;
		
	}
	
	.Play-page .arrows {
		position: absolute;
		top: 12px;
		left: 15px;
	}
	
	.Play-page .arrows span {
		color: white;
		font-size: 18px;
	}
	
	.Play-page .play-pause {
		margin-top: 5px;
	}
	
	.Play-page .play-pause img {
		width: 31px;
		height: 31px;
	}
	
	/** {
		margin: 0;
		padding: 0;
	}*/
	
	.Play-page .picture {
		width: 100%;
		/*height: 100%;*/
		position: relative;
		/*overflow: hidden;*/
	}
	
	.Play-page .picture img {
		width: 100%;
		height: 188px;
	}
	
	.Play-page .progress-bar {
		width: 62%;
		height: 5px;
		background: #eaeaea;
		position: absolute;
		top: 21px;
		left: 24.5%;
	}
	.Play-page .progress_color{
		width: 0px;
		height: 5px;
		background: #f5594d;
	}
	.Play-page .progress_yuan{
		width: 14px;
		height: 14px;
		border-radius: 50%;
		position: absolute;
		top: -5px;
		left: 0px;
		background: #FFFFFF;
		z-index: 111;
		/*-webkit-box-shadow:0 2 4 #000000;*/
		 -webkit-box-shadow:0 0 10px rgba(0, 0, 0, .5);
	}
	.Play-page .play {
		width: 100%;
		height: 44px;
		position: relative;
		
	}
	.Play-page .play_time{height: 15px;}
	.Play-page .play_time span{font-size:10px;color: #828282;margin-top: 7px;}
	.Play-page .play_time .left{position: absolute;top: 9px;left: 14.66%;}
	.Play-page .play_time .right{position: absolute;top: 9px;left: 88%;}
	.Play-page .play1 {
		width: 100%;
	}
	
	.Play-page .play1 li {
		list-style: none;
		/*height: 80px;*/
		float: left;
		/*line-height: 65px;*/
		color: #f5594d;
	}
	
	.Play-page .play1 li:nth-of-type(1) {
		font-size: 19px;
		margin-left: 23%;
		margin-right: 13%;
		display: none;
	}
	
	.Play-page .play1 li:nth-of-type(2) {
		/*margin-left: 31%;*/
		position: absolute;
		top: 2px;
		left: 2.466%;
	}
	
	.Play-page .play1 li:nth-of-type(3) {
		margin-right: 9%;
		font-size: 19px;
		display: none;
	}
	
	.Play-page .play1 li:nth-of-type(4) {
		font-size: 27px;
		display: none;
		
	}
	
	#fenxiang img{
		width: 22px;
		height: 22px;
	}
	.Play-page .xian {
		height: 13px;
		width: 100%;
		background: #eaeaea;
	}
	
	.Play-page .intro {
		/*height: 350px;*/
		width: 100%;
		/*padding: 3%;*/
	}
	
	.Play-page .intro-p {
		text-indent: 20px;
		width: 100%;
		margin-top: 10px;
	}
	
	.Play-page .int1 {
		width: 94%;
		/*height: 160px;*/
		/*position: relative;*/
		padding: 3%;
	}
	.Play-page .int1 .img_width img{
		width: 38px;
		height: 38px;
		border-radius: 5px;
	}
	.Play-page .int1_p1{
		width: 100px;
		text-overflow:ellipsis;overflow:hidden;white-space:nowrap;
		font-size:13px;
		color: #000000;
	}
	.Play-page .int1 li {
		list-style: none;
		float: left;
		font-size: 10px;
		color: #1d1d1d;
	}
	.clearfloat{clear:both} 
	.Play-page .int1 li:nth-of-type(1) {
		width: 38px;
		height: 38px;
		background: #d8d8d8;
		border: 1px solid #D8D8D8;
		border-radius: 5px;
	}
	
	.Play-page .int1 li:nth-of-type(2) {
		margin-left: 11px;
		line-height: 20px;
	}
	
	.Play-page .int1 li:nth-of-type(3) {
		width: 74px;
		height: 23px;
		border: 1px solid #f25949;
		border-radius: 32px;
		text-align: center;
		line-height: 23px;
		color: #FF4E4E;
		margin-top: 10px;
		float: right;
		font-size: 12px;
		margin-right: 5px;
	}
	.Play-page .int1 li:nth-of-type(4){
		/*position: absolute;
		top: 62px;*/
		font-size: 17px;
		width: 92%;
		margin-top: 25px;
		
	}
	.Play-page .int1 li:nth-of-type(5){
		margin-top: 11px;
		margin-bottom: 14px;
	}
	.Play-page .fabu_time{
		margin-left: 10px;
	}
	.Play-page .int2 {
		width: 95%;
		/*height: 128px;*/
		/*margin-left: 10px;*/
		padding: 2%;	
	}
	
	main h3 {
		font-size: 17px;
		margin-bottom: 5px;
		font-weight: normal;
		color: #000000;
		width: 180px;
	}
	
	.Play-page .p1 {
		width: 38px;
		height: 3px;
		background: #FF4E4E;
	}
	
	.Play-page .int2 span {
		width: 100%;
		height: 1px;
		float: left;
		background: #e8e8e8;
	}
	
	.Play-page .int2 p {
		line-height: 18px;
	}
	
	.Play-page .int3 {
		/*height: 161px;*/
		margin-top: 0px;
		padding:10px;
	}
	
	.Play-page .int3 h3 {
		font-size: 16px;
		margin-bottom: 5px;
	}
	
	.Play-page .int3 .span {
		width: 100%;
		height: 1px;
		float: left;
		background: #d8d8d8;
		margin-bottom: 3px;
	}
	.Play-page .int3 span{
		background: white;
	}
	.Play-page .ppt {
		width: 100%;
		/*height: 126px;*/
		/*background: #d8d8d8;*/
		/*margin-top: 5px;*/
	}

	.Play-page .ppt img{
		width: 100%;
		height: 188px;
	}
	.Play-page .xian2 {
		width: 100%;
		height: 12px;
		background: #EAEAEA;
	}
	
	.Play-page .jiang {
		width: 96%;
		/*height: 187px;*/
		margin-left: 10px;
		margin-top: 10px;
	}
	
	.Play-page .jiang span {
		width: 100%;
		height: 1px;
		float: left;
		background: #d8d8d8;
	}
	
	.Play-page .p2 {
		width: 61px;
		height: 4px;
		background: #f5594d;
	}
	
	.Play-page .dl1 {
		height: 56px;
		width: 100%;
		margin-top: 6px;
	}
	
	.Play-page .dl1 dt {
		width: 46px;
		height: 46px;
		background: #D8D8D8;
		float: left;
		border: 1px solid #D8D8D8;
		border-radius: 5px;
	}
	.Play-page .dl1 dt img{
		width: 46px;
		height: 46px;
	}
	
	.Play-page .dl1 dd {
		margin-top: 2px;
		float: left;
		margin-left: 12px;
	}
	
	.Play-page .dl1 p {
		font-size: 10px;
		line-height: 15px;
	}
	
	.Play-page .dl1 span {
		margin-left: 58px;
		width: 83%;
		margin-top: 8px;
	}
	
	.Play-page .yans {
		color: #8a8a8a;
		font-size: 11px;
	}
	
	
	
	.comment .xian{
		width: 100%;
		height: 10px;
		background: #EAEEF1;
	}
	.comment .content{
		width: 100%;
		height: 75px;
		margin-top: 15px;
	}
	.comment .content img{
		width: 38px;
		height: 38px;
		border-radius: 50%;
	}
	.comment .content .left{
		float: left;
		width: 38px;
		height: 38px;
		background: #D8D8D8;
		border-radius: 50%;
		margin-left: 15px;
	}
	.comment .content .right{
		float: left;
		margin-left: 15px;
		width: 77%;
		margin-bottom: 10px;
	}
	.comment .content .span_font{
		font-size: 13px;
		margin-left:5.33%;
		color: #D8D8D8;
	}
	.comment .content .right .shijian{
		font-size: 12px;
		color: #ABABAB;
		margin-left:10%;
	}
	.comment .content .right li:nth-of-type(1){
		color: #F74D3F;
		font-size: 14px;
	}
	.comment .content .right li:nth-of-type(2){
		color: #ABABAB;
		font-size: 12px;
		
	}
	.comment .content .right li:nth-of-type(3){
		color: #2A2A2A;
		font-size: 15px;
		margin-top: 10px;
	}
	.comment .content .right li:nth-of-type(4){
		width: 95%;
		/*height: 32px;*/
		background: #F7F7F7;
		line-height: 32px;
		padding-left: 10px;
		margin-top: 12px;
		margin-bottom: 12px;
		font-size: 14px;
		color: #b2cded;
	}
	.comment .to_comment{
		width: 100%;
		height: 46px;
		background: #F4F4F4;
		position: fixed;
		bottom: 0;
	}
	.comment .to_comment input{
		width: 300px;
		height: 27px;
		background: white;
		font-size: 16px;
		color: #AFAFAF;
		margin-top: 10px;
		margin-left: 15px;
	}
	.comment .genduo{
		width: 99.5%;
		height: 45px;
		border: 1px solid #E0E0E0;
		/*position: fixed;*/
		/*bottom: 0;*/
		background: white;
		clear: both;
	}
	.comment .genduo p{
		font-size: 15px;
		color: #D8D8D8;
		height: 45px;
		line-height: 45px;
		width: 143px;
		margin: 0 auto;
		text-align: center;
	}
	.comment .btm{
		width: 100%;
		height: 45px;
	}
	.comment .btm .left{
		float: left;
		width: 60%;
		height: 45px;
		background: #E3E3E3;
	}
	.comment .btm .right{
		float: left;
		width: 40%;
		height: 100%;
		background: #FF4E4E;
	}
	.comment .btm li{
		float: left;
		height: 45px;
		line-height: 45px;
	}
	.comment .btm .left li:nth-of-type(2){
		font-size: 16px;
		color: #2C2C2C;
		margin-left: 30px;
	}
	.comment .btm .left li:nth-of-type(3){
		font-size: 12px;
		color: #575757;
		margin-left: 10px;
	}
	.comment .btm .right li{
		font-size: 16px;
		color: white;
		height: 45px;
		line-height: 45px;
	}
	.comment .btm .right li:nth-of-type(1){
		margin-left: 35px;
	}
	
	
	.Play-page .zo{
	width: 95%;
	height: 100%;
	padding-left: 15px;
	
}
.Play-page .jian h3{ font-size: 15px;margin-top: 16px;}
.Play-page .jian .p1{
	height: 3px;width: 37px;background: orangered;margin-top: 10px;
}
.Play-page .jian .jianjie{
	height: 10px;
	margin-top: 10px;
	font-size: 10px;
	margin-left: 20px;
	width: 450px;
}
.Play-page .jian span{ width: 90%;height: 1px;background:#d8d8d8;float: left;}
.Play-page .clearfloat{clear:both}

.Play-page .xiang{width: 100%; height: 100%; /*margin-top: 46px;*/}
.Play-page .zo .xiang h3{
	font-size: 15px;margin-bottom: 14px;width: 162px;
	text-overflow:ellipsis;overflow:hidden;white-space:nowrap;
}
.Play-page .xiang .p1{
	height: 3px;width: 67px;background: orangered;margin-top: 10px;
}
.Play-page .x1{
	/*border-bottom: 1px solid #D8D8D8;*/
	height: 100%;
	display: inline-block;
	width: 100%;
	}
.Play-page .xian3{
	width: 82%;
	/*color: #E8E8E8;*/
	margin-left: 19%;
	height: 1px;
	background: #E8E8E8;
	margin-top: 16px;
}	
.Play-page .xiang span{ width: 100%;height: 1px;background:#d8d8d8;float: left;}
.Play-page .xiang dl{margin-top: 16px;width: 100%;height: 100%;display: inline-block;position: relative;}
.Play-page .xiang dt{
	width: 70px;
	height: 91px;
	background: #D8D8D8;
	border: 1px solid #D8D8D8;
	border-radius:5px;
	float: left;
	margin-left: 10px;
}
.Play-page .xiang dd{
	float: left;
	margin-left: 14px;
	/*margin-bottom: 44px;*/
}
.Play-page .xiang dd p{
	font-size: 10px;
	color: #707070;
}
.Play-page .xiang .mf{
	width: 89px;
	height: 23px;
	background:#ff4e4e;
	position: absolute;
	top: 70px;
	left: 71%;
	border: 1 solid #FF4E4E;
	border-radius:3px;
}
.Play-page .mf p{ font-size: 13px;line-height: 25px;height: 26px;color: white;width: 100%;text-align: center;}
.Play-page .teacher_img img{
	width: 70px;
	height: 91px;
}
.Play-page .int1 h3{
	width: 220px;
}
.Play-page .zhezhao{
	width: 100%;
	height: 1000px;
	position: absolute;
	top: 0px;
	background: #000000;
	z-index: 999;
	opacity: 0.5;
}
.Play-page .zhezhao p{
	width: 100%;
	text-align: center;
	margin-top: 27px;
	color: white;
	font-size: 20px;
}
.zhezhaoceng{
	height: 45px;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    /*opacity: 0.4;*/
    position: absolute;
    top: 144px;
    left: 0px;
    z-index: 2;
}
.zhezhaoceng p{
	/*line-height: 45px;*/
	/*width: 100%;*/
	text-align: center;
	float: left;
	color: #FFFFFF;
}
.zhezhaoceng_p1{
	width: 64%;
	line-height: 45px;
	margin-left: 4%;
}
.zhezhaoceng .zhezhaoceng_p2{
	/*line-height: 45px;*/
	border:1px solid #f5594d;
	border-radius:4px;
	width:72px;
	height:25px;
	margin-top: 9px;
	line-height: 23px;
	margin-left: 8%;
	color: #F5594D;
}
#huifu_ba{
	display: block;
	width: 97%;
	height: 20px;
	color: white;
	background: #b2cded;
	line-height: 20px;
	margin-bottom: 5px;
	padding-left: 5px;
}
</style>
<script>
	
	import play_btn from '../data/play_btn.png';
	import pause_btn from '../data/play_zt.png';
	import $cookie from '../core/cookie';
	import SwiperCSS from '../widget/swiper/swiper.min.css';
	import Swiper from '../widget/swiper/swiper.min.js';
	import $headerimg from '../icon/find_team.png';
	import $communic from '../core/communic';
	import $wx from '../widget/wx_share/wx.js';
	import c_alert from '../components/alert';
	import c_send_msg from '../components/send_msg/send_pinglun.vue';
	export default {
		name:'play',
		components:{
			'c-alert':c_alert,
			'c-send-msg':c_send_msg,
		},
		data: function() {

			return {
				sendpl:false,
				resource:'',
				results: [],
				pan: false,
				play: '&#xe706;',
				pause: '&#xe669;',
				title: '',
				intro: '',
				imgsrc: play_btn,
				forward_backwards: '',
				true_f: true,
				music: ['http://cdn5.lizhi.fm/audio/2016/11/10/2567350273222237190_hd.mp3', 'http://cdn5.lizhi.fm/audio/2016/11/16/2568463689578034182_hd.mp3', 'http://cdn5.lizhi.fm/audio/2016/11/28/2570700901536721926_hd.mp3'],
				num: '',
				id: 268,//课程id
				content:{has:false},
				img_url:'http://mlx.oss-cn-hangzhou.aliyuncs.com/',
				ppt_img_url:'http://mlx.oss-cn-hangzhou.aliyuncs.com/',
				ppts:[],
				covers_url:'',//封面图片
				headimgurl:'',//老师头像
				teacher_lists:[],
				audio_time_scale:30*60,
				parse_num:'',//点赞数
				collect_num:'',//收藏数
				mid:'',//用户id
				teacher_id:'',
				audio_video:false,
				no_ppts:[],
				comment_user:'用户名',
				comment_time:'2016.12.14',
				comment_content:'内容11',
				praise_num:'0',
				pinlun:[],
				pinlun_page:'',
				content_url:'',
				pinlun_shu:0,//评论数
				time_length:'',//音频视频时长
				res:'',//图片连接，用于处理图片
				media_type:'',//判断文件是视频还是音频  1为视频，2为音频
				time_len:10,//处理过的时间
				fenx_url:'',//分享
				f_t:false,
				recommends:'',
				danmu_true:false,//弹幕提示
				danmu_tishi:'',//弹幕内容
				bofangshichang:'0.00',
				jindu:'',//当页面跳转时的播放进度
				arr_jindu:[],//用于存储每个课程，[{id:,time:}]
				teacher:'',//老师名
				buy_status:false,//用于判断是否购买了课程
				zhezhaoceng:true,//用于判断播放遮罩层是否隐藏
				zhezhaoceng_ul:false,//用于判断播放ul的隐藏
				price:1,//课程价格
				pinlun_headimg:'http://mlx.oss-cn-hangzhou.aliyuncs.com/',//评论列表头像图片
				nickname:'',//评论用的用户名
				huifuxianshi:false,//回复显示隐藏
				chakanhuifu:'查看回复',
			}
		},
		mounted: function() { //挂载时候执行的函数
			//获取评论数
			this.huoqupunlunshu();
			//处理是否购买了课程
			if(this.buy_status==false){
				this.zhezhaoceng=false;
				this.zhezhaoceng_ul=true;
			}
			//获取用户名
			this.nickname=this.$store.state.nickname;
			
			//alert('进入页面了');
			var self=this;
			this.id = this.$route.params.id;
			//从cookie中获取用户id
			this.mid = this.$store.state.mid;
			this.display(this.id,this);
			$(window).scrollTop(0);
			//显示上次播放时长
			//alert(this.id);
//			if(localStorage.arr_bofanga){
				/*
				var time=0;
				var arr_bbb=localStorage.arr_bofanga;
					var arr_ccc=JSON.parse(arr_bbb);
					for(var j=0;j<arr_ccc.length;j++){
						if(self.id==arr_ccc[j].id){
							//console.log(self.id);
							
							time=arr_ccc[j].time;
							//console.log(arr_ccc[j].time);
						}
					}*/
//				var time=localStorage.jindu;
//				
				var time=this.getTime(self.id);
				
				
				time=parseInt(time);
				var	miao=time%10;
				var	shimiao=parseInt(time/10)%6;
				var	fen=parseInt(time/60)%10;
				var	shifen=fen%10;
				//拼接时分秒
				var	sfm=fen+':'+shimiao+miao;
				console.log(sfm);
				this.bofangshichang=sfm;
//				if(this.bofangshi=='NaN'){
//					this.bofangshichang='0:00';
//				}
				
			window.onhashchange = function(){clearInterval(self.adf);};
			this.saveCache('CurrentPlayID',this.id);
//			console.log('CurrentPlayID:'+this.getCache('CurrentPlayID'));
			//监听用户是否离开页面
//			setTimeout(function(){
				
				/*
				function myFunction() {
					clearInterval(self.adf);
					
					this.setTime(self.id,self.jindu);
					
					
	    			
	    			//alert(localStorage.jindu+"kechengid"+localStorage.kecheng_id);
	    			//console.log(self.id);
	    			if(localStorage.arr_bofanga){
	    			var obj={id:self.id,time:self.jindu};
	    			var arr_zfc=localStorage.arr_bofanga;
	    			console.log(arr_zfc);
	    			//将JSON字符串转换成数组
	    			var arr_sz=JSON.parse(arr_zfc);
	    			console.log(arr_sz);
	    			var a=true;
	    			for(var i=0;i<arr_sz.length;i++){
	    				if(self.id==arr_sz[i].id){
	    					console.log('已经存在此id');
	    					a=false;
	    					arr_sz[i].time=self.jindu;
	    				}else{
	    					console.log('不存在此id');
	    				}
	    			}
	    			if(a==true){
	    				arr_sz.push(obj);
	    			}
	    			console.log(arr_sz);
	    			//此时转为字符串存入localStorage.arr_bofang
	    			var arr_zzz=JSON.stringify(arr_sz);
	    			localStorage.arr_bofanga=arr_zzz;
	    			}else{
	    			//第一次进入播放页面时
	    			var obj={id:self.id,time:self.jindu};
	    			self.arr_jindu.push(obj);
	    			console.log(self.arr_jindu);
	    			//转换成字符串
	    			var zfc = JSON.stringify(self.arr_jindu)
	    			console.log(zfc);
	    			localStorage.arr_bofanga=zfc;
	    			}
				}*/
//			},10);
			
		},
		
		methods: {
			//播放与暂停 true为播放，false为暂停
			display:function(oid,self){
				
				
			//alert(this.mid);
			//打印当前链接
			//self = this;
			self.id=oid;
			// console.log(this.id);
			$.ajax({
				url: baseUrl+'/course_info/course_details',
				data: {
					id: self.id
				},
				dataType: 'jsonp',
				async: true,
				success: function(data) {
					console.log(data);
					//alert(self.id);
					self.content.teacher = data.content.teacher;
					self.teacher=self.content.teacher;
					self.buy_status=data.content.buy_status;
					//console.log(data.content);
					//处理限时收听，显示隐藏
					if(self.buy_status==true){
						self.zhezhaoceng=true;
						self.zhezhaoceng_ul=false;
					}
					console.log(self.buy_status);
					self.content.title = data.content.title;
					self.title=self.content.title;
					self.content.intro = data.content.intro;
					self.content.browse_num = data.content.browse_num;
					self.ppts = data.content.ppt;
					self.covers_url=self.img_url+data.content.covers_url;
					self.parse_num=data.content.parse_num;
					self.collect_num=data.content.collect_num;
					self.teacher_id=data.content.mid;
					self.content_url=data.content.content_url;
					console.log(self.content_url);
					self.headimgurl=data.content.headimgurl;
					self.media_type=data.content.media_type;
					
					self.res=self.chuliimg(self.headimgurl);
					self.time_length=data.content.time_length;
					self.price=data.content.price;
					console.log(self.price);
					//处理当课程为免费时，显示显示隐藏
					if(self.price=='0.00'){
						self.zhezhaoceng=true;
						self.zhezhaoceng_ul=false;
					}
					//处理视频播放限制
					if(self.price != '0.00'){
						if(self.media_type==1){
							setTimeout(function(){
							location.hash='#/trained';
							},180000);
						}
					}
					
					self.content.has=true;
					// console.log(self.collect_num);
					if(self.ppts.length==0){
						self.ppt_img_url='';
						self.ppts=['/static/img/travel.05ff22d.jpg','/static/img/guangz.f57477c.jpg','/static/img/ocean.8293eb7.png'];
						// console.log(self.ppts);
						
					};
						setTimeout(function(){
							var mySwiper = new Swiper('.swiper-container', {
								autoplay: 5000,//可选选项，自动滑动
								autoplayDisableOnInteraction : false,
								paginationClickable :true,
								pagination: '.swiper-pagination',
							});
						},0)
						
						if(self.media_type==2)self.time_cl();
					}
				});
			
			self.num = 1;
			self.adoMain = $('#adoMain');
//			this.video=$('#video1');
			//this.adoMain[0].src = this.content_url;
			//获取评论列表数据
			
			//开始把self.pinlun_page设为1
			self.pinlun_page=1;
			//console.log(self.pinlun_page);
			// console.log('todo')
			$.ajax({
					url:baseUrl+"/course_info/comment_list",
					data:{
						page:self.pinlun_page,
						data:'{"biz_id":' +self.id +', "biz_type": "t_course_info"}'
					},
					dataType:'jsonp',
					async: true,
					success:function(data){
						//alert(123); 
						// console.log(data);
						for(var i=0;i<data.length;i++){
							
							self.pinlun.push(data[i]);
							
							for(var j=0;j<self.pinlun.length;j++){
								if(self.pinlun[j].headimgurl==null){
									self.pinlun[j].headimgurl='mlx/Fr3SQF35D3.jpg';
								}
								if(self.pinlun[j].headimgurl.indexOf('http:')>-1){
									//self.pinlun_headimg='';
									//self.pinlun_headimg='';
									self.pinlun[j].headimgurl='mlx/Fr3SQF35D3.jpg';
								}
							}
						}
						console.log(self.pinlun);
					}	
			});
			console.log('{ "biz_id":' +self.id+', "biz_type": "t_course_info"}');
			//记录浏览量
			//alert(self.mid);
			//alert('{"biz_type":'+'"t_course_info"'+',"biz_id":'+self.id+',"browse_user":'+self.mid+'}');
			$.ajax({
			url:baseUrl+'/browse/browse_log',
				data:{
					data:'{"biz_type":'+'"t_course_info"'+',"biz_id":'+self.id+',"browse_user":'+self.mid+'}',	
		
				},
				dataType:'jsonp',
				success:function(data){
					//alert(JSON.stringify(data.msg));
				}	
			});
			//获取评论数
			$.ajax({
					url:baseUrl+"/course_info/comment_row",
					data:{
						
						data:'{"biz_id":' +self.id +', "biz_type": "t_course_info"}'
					},
					dataType:'jsonp',
					success:function(data){
						//console.log(data.row);
						self.pinlun_shu=data.row;
						console.log(self.pinlun_shu);
					}	
				});
			//获取teacher_details
			//this.num=localStorage.getItem('trained_teacher_id');
			$.ajax({
				url:baseUrl+'/course_info/lists',
				data:{
					is_recommend:true,
					page:1	
				},
				dataType:'jsonp',
				//async:false,
				//
				success:function(data){
					console.log(data);
					self.data=data;
					//产生随机数
					self.recommends=[];
					var time = new Date();
					time=time.getSeconds() % 10;
					//console.log(time % 10);
					var k=time;
					for(var i=k;i<k+3;i++){
						self.recommends.push(data.result[i]);
					}
					console.log(self.recommends);
					for(var z=0;z<self.recommends.length;z++){
						if(self.recommends[z].price=='0.00'){
							self.recommends[z].price='免费';
							
						}
					}
					
				}	
			});
			console.log(self.img_url);
			},
			
			click_play: function() {
				// console.log('click-play:'+this.content_url);
				//alert(123);
				this.adoMain = $('#adoMain');
				
				if(this.true_f == true) {
					this.imgsrc = pause_btn;
					this.true_f = false;
//					if(){
//						
//					}
//					this.adoMain[0].src =this.content_url;
//					this.video[0].src =this.content_url;
//					this.video[0].play();
/*
					var self=this;
					if(localStorage.arr_bofanga){
						
							var arr_bbb=localStorage.arr_bofanga;
							var arr_ccc=JSON.parse(arr_bbb);
							for(var j=0;j<arr_ccc.length;j++){
								if(self.id==arr_ccc[j].id){
									console.log(self.id);
									 //var adoMain=$('#adoMain');
									self.adoMain[0].currentTime=arr_ccc[j].time;
									//alert(arr_ccc[j].time);
								}
							}
					}
					*/
					var self=this;
					self.adoMain[0].currentTime=self.getTime(self.id);
					self.adoMain[0].play();
					
					
					
				/*
					this.adf=setInterval(function(){
						var jindu=self.adoMain[0].currentTime;
						self.jindu=self.adoMain[0].currentTime;
						console.log(jindu);
						//存储对应的课程和离开页面时的进度
//						localStorage.jindu=jindu;
//						localStorage.kecheng_id=self.id;
					},1000);
					*/
					if(this.media_type==2){
						this.play_time();
						this.progress_bar();
					}
				} else {
					this.imgsrc = play_btn;
					this.true_f = true;
					//this.video[0].pause();
					this.adoMain[0].pause();
				
					
				}
			},
			//上一首
			retreat: function() {
				if(this.num > 0) {
					this.num = this.num - 1;
					this.adoMain[0].src = this.music[this.num];
					// console.log("播放下一曲");
					this.imgsrc = pause_btn;
					this.adoMain[0].play();
					this.true_f = false;
				} else {
					this.imgsrc = pause_btn;
					this.adoMain[0].play();
					this.true_f = false;
				} 
//				else {
//					alert('没有音乐了');
//				}
			},
			//下一首
			forward: function() {
				if(this.num < 2) {
					this.num = this.num + 1;
					this.adoMain[0].src = this.music[this.num];
					// console.log("播放上一曲");
					this.imgsrc = pause_btn;
					this.adoMain[0].play();
					this.true_f = false;
					// console.log(this.num);
				} else {
					// console.log("没有音乐了");
				}
			},
			//回到trained页面
			return_trained:function(){
				location.hash='#/trained';
			},
			//音乐播放计时
			play_time:function(){
				var audio=$('audio')[0];
				var play_time=$('.left');
				var miao=0;
				var shimiao=0;
				var fen=0;
				var shifen=0;
				var sfm=0;
				var self=this;
			self.adf=setInterval(function(){
					var time=audio.currentTime;
					time=parseInt(time);
					miao=time%10;
					shimiao=parseInt(time/10)%6;
					fen=parseInt(time/60)%10;
					shifen=fen%10;
					//拼接时分秒
					sfm=fen+':'+shimiao+miao;
					play_time.text(sfm);
					
					//处理未购买限制
					if(self.price != '0.00'){
							console.log(self.buy_status);
							if(self.buy_status==false){
							console.log(self.adoMain[0].currentTime);
							if(self.adoMain[0].currentTime>=180){
								self.adoMain[0].pause();
								self.imgsrc = play_btn;
								self.danmu_true=true;
								self.danmu_tishi='试听时间结束';
								var a = setInterval(function(){
									self.danmu_true=false;
									if(self.danmu_true == false){
										clearInterval(a);
										clearInterval(self.adf);
									}
								},1000);
							}
						}
					}
					
					
					self.setTime(self.id,time);
					
				},1000);
				
			},
			
			//播放器进度条
			progress_bar:function(){
				var audio=$('audio')[0];
				var width=screen.width;
					width=width*0.65;
				var proportion=width/this.time_length;
				var $progress=$('.progress_color');
				var $yuan=$('.progress_yuan');
				// console.log(width);
				// console.log(width);
				setInterval(function(){
					var play_time=audio.currentTime;
					var present_width=proportion * play_time;
					var progress_yuan=proportion * play_time;
					$progress.css('width',present_width);
					$yuan.css('left',present_width);
				},1000);
			},
			pinlun_click:function(){
				location.hash='#/comment';
				//this.sendpl = true;
				//console.log(123);
			},
			pinglunCallback:function(){
				this.sendpl = false;
			},
			//点赞功能
			dianzan:function(){
					self=this;
					//alert('点击了');
					// console.log(self.id);
					// self.mid=53012;
					//alert(111+'{ "biz_id":' +self.id+', "biz_type": "t_course_info", "praise_user":'+ self.mid+', "be_praise_user":' +self.teacher_id+ '}');
					$.ajax({
					url: baseUrl+'/sys_biz_set/praise_insert',
					data: {
						data: '{ "biz_id":' +self.id+', "biz_type": "t_course_info", "praise_user":'+ self.mid+', "be_praise_user":' +self.teacher_id+ '}'
					},
					dataType: 'jsonp',
					success: function(data) {
						
						//alert(data.msg);
						if(data.return=='true'){
							//alert(123);
							var dianzan=$('.dianzan');
							dianzan.css('color','red');
							var num=parseInt(self.parse_num)+1;
							dianzan.html(num);
							// console.log(num);
							self.danmu_true=true;
							self.danmu_tishi=data.msg;
						}else{
							//alert('您已经点过啦');
							self.danmu_true=true;
							if(data.msg.indexOf('praise_user')>-1){
								self.danmu_tishi='您已经点过啦';
							}else{
								self.danmu_tishi=data.msg;
							}
							setTimeout(function(){
								self.danmu_true=false;
							},1000);
						}
					}
				});
				
			},
			//收藏功能
			shouchang:function(){
				//alert('点击了');
				//取页面跳转时存在$route的数据
				this.id = this.$route.params.id;
				//alert(this.id);
				var self=this;
				//self.mid=53012;
				console.log(self.mid);
				//alert("biz_id": +self.id+', "biz_type": "t_course_info", "biz_user":'+ self.mid);
				$.ajax({
					url: baseUrl+'/sys_biz_set/collect_insert',
					data: {
//						"biz_id":"self.id",
//  					"biz_type":"t_course_info",
//  					"biz_user":97
    					data: '{ "biz_id":' +self.id+', "biz_type": "t_course_info", "biz_user":'+ self.mid+ '}'
					},
					dataType: 'jsonp',
					success: function(data) {
						//alert(data.msg);
							self.danmu_true=true;
							
							setTimeout(function(){
							self.danmu_true=false;
						},1000);
						if(data.return=='true'){
							//alert(data.return);
							self.danmu_tishi=data.msg;
							var shouchuang=$('.shouchuang');
							shouchuang.css('color','red');
							var numa=parseInt(self.collect_num)+1;
							shouchuang.html(numa);
							// console.log(numa);
						}else{
							//alert('您已经点过啦');
							if(data.msg.indexOf('biz_user')>-1){
								self.danmu_tishi='您已经收藏过了';
							}else{
								self.danmu_tishi=data.msg;	
							}	
						}
					}
				});
			},
			//点击获取更多
			genduo:function(){
				var self=this;
				self.pinlun_page=self.pinlun_page+1;
				//alert(self.pinlun_page);
					$.ajax({
						url:baseUrl+"/course_info/comment_list",
						data:{
							page:self.pinlun_page,
							data:'{"biz_id":' +self.id +', "biz_type": "t_course_info"}'
						},
						dataType:'jsonp',
						success:function(data){
							//alert(123); 
							// console.log(data);
							for(var i=0;i<data.length;i++){
								
								self.pinlun.push(data[i]);
								//console.log(self.pinlun);
								for(var j=0;j<self.pinlun.length;j++){
									if(self.pinlun[j].headimgurl==null){
										self.pinlun[j].headimgurl='mlx/Fr3SQF35D3.jpg';
									}
								}
							}
							
						}	
				});
			},
			chakanjj:function(){
				// console.log(this.teacher_id);
				localStorage.setItem("trained_teacher_id",this.teacher_id);
				
				location.hash='#/intro';
			},
			//处理图片
			
			chuliimg:function(res){
				// console.log('chuliimg');
				if(res==null || res==''){
					
					return $headerimg;
				}else{
					if(res.indexOf('http')>-1){//有具体链接
						
						if(res.indexOf('oss')){//是阿里的图片
							if(res.indexOf('?')){//已经处理
								return res;
							}else{
								return res+'?x-oss-process=image/resize,w_'+54;
							}
						}else{//非阿里
							return	res;
						}
					}else{
						// console.log('come');
						return 'http://mlx.oss.mlxing.com/'+res+'?x-oss-process=image/resize,w_'+54;
					}
					
				}
				
			},
			time_cl:function(){
					//把时长转换
		            console.log(this.time_length);
					//alert(self.time_length);
					var time=parseInt(this.time_length);
					var time_miao=time%10;
					var time_shimiao=parseInt(time/10)%6;
					var time_fen=parseInt(time/60)%10;
					var time_shifen=parseInt(time/60);
					this.time_len=time_shifen+time_fen+':'+time_shimiao+time_miao;
					
			},
			jiang_click:function(){
				location.hash='#/intro';
			},
			shareCallback:function(res){
				// console.log(res);
			},
			fenxiang:function(){
				
				var self=this;
				window.vmplay = this;
				this.fenx_url=location.href;
				//console.log(location.href);
				console.log('begin To share');
				var ua = navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i) == "micromessenger"){
					this.f_t=true;
					$wx({
				        title : '大咖讲堂:'+self.content.title,
				        desc : self.content.intro,
				        link: self.fenx_url, //默认是本页
				        imgUrl: 'http://static.mlxing.com/static/img/demo/logo.png',
				        type: 'link'
			    	});
				}else{
					new $communic({
						fn:'mlxapp.share',
						debug:true,
						params:{
							id:'0',
							title:'大咖讲堂:'+self.content.title,
							desc:self.content.intro,
							url:self.fenx_url,
							handle:'window.vmplay.shareCallback',
						}
					})
				}	
			},
			zhezhao:function(){
				this.f_t=false;
			},
			go_play:function(course){
//				localStorage.setItem("trained_course_id",course.id);
//				console.log(localStorage.getItem('trained_course_id'));
			//页面跳转
//				location.href="#/play/"+course.id;
				//this.$route.push({name:"play",params:{'id':course.id}});
				//location.hash="#/play/"+course.id;
//				this.$router.push({name:'play',params:{id:course.id}});
				this.display(course.id,this);
				$(window).scrollTop(0);
			},
			jianjie_dashang:function(){
//				location.hash='#/reward';
				var self = this;
				this.$router.push({name:'reward',params:{biz_id:self.id,be_reward_user:self.teacher_id,teacher:self.teacher,title:self.title}});
			},
			setTime:function(id,time){
				//存时间
				var arr_sz=this.getCache('PlayTimeCache')||{};
				arr_sz['id'+id]=time;
				console.log(arr_sz);
    			this.saveCache('PlayTimeCache',arr_sz);
			},
			getTime:function(id){
				//取时间
				var time=0;
				var arr_ccc=this.getCache('PlayTimeCache')||{};
				var otime=arr_ccc['id'+id];
				return otime!=null?otime:time;
			},
			getCache:function(k){
				var v = localStorage.getItem(k);
				var o=JSON.parse(v);
				return o;
			},
			saveCache:function(k,v){
				var o=JSON.stringify(v);
    			localStorage.setItem(k,o);
			},
			go_goumai:function(){
				var self=this;
				this.$router.push({name:'zhifu',params:{teacher:self.teacher,title:self.title,price:self.price,biz_id:self.id}});
			},
			shiping:function(){
				alert(123);
			},
			huoqupunlunshu:function(){
				var self= this;
				$.ajax({
					url:baseUrl+"/course_info/comment_row",
					data:{
						
						data:'{"biz_id":' +self.id +', "biz_type": "t_course_info"}'
					},
					dataType:'jsonp',
					success:function(data){
						//console.log(data.row);
						//self.pinlun_shu=data.row;
						//console.log(self.pinlun_shu);
					}	
				});
			},
			go_zhifu:function(recommend){
				console.log(recommend);
				if(recommend.price != '免费'){
					this.$router.push({name:'zhifu',params:{teacher:recommend.teacher,title:recommend.title,price:recommend.price,biz_id:recommend.id}});	
				}
			},
			fs_huifu:function(){
				this.huifuxianshi=!this.huifuxianshi;
//				alert(123);
				if(this.huifuxianshi==true){
					this.chakanhuifu='收起';
				}
				if(this.huifuxianshi==false){
					this.chakanhuifu='查看回复';
				}
			}
		},
	}
</script>

