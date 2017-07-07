
//*******************核心*****************************
import Zepto from './core/Zepto';
Zepto();
require('core-js/es6/promise')
import Vue from 'vue'
import Vuerouter from './vue-router'
import Vuex from 'vuex'
import fastclick from 'fastclick'
//*******************引入的样式*****************************
import reset from './data/reset.css'
import font from './data/font.css'
import mui from './data/common.css'
import animate from './data/animate.css'
import doubleclick from './widget/doubletouch.js'
//*******************路由*****************************

import {routes} from './Router.js'
//*******************功能*****************************
import $cookie from './core/cookie'
import $base64 from './widget/base64'


fastclick.attach(document.body);
Vue.use(Vuex);
Vue.use(Vuerouter);
Vue.prototype.$t=function(str){
	return str;
}
//***************配置用户信息****************
if($cookie('mlx_ui')){
    $cookie('mid',null);
    $cookie('nickname',null);
    $cookie('headimgurl',null);
    $cookie('is_dy',null);
    var mlx_ui = ($base64($cookie('mlx_ui'))).split('|');
    //数据变对象
    
    for(var i=0;i<mlx_ui.length;i++){
       var arr = mlx_ui[i].split('=');
       $cookie(arr[0],arr[1]);
    }

}else{
    $cookie('mid',"-1");
    $cookie('nickname',"未登录");
    $cookie('headimgurl',"static/img/user_head.png");
    $cookie('is_dy',-1);
}
//*****************全局变量rem*********************
window.rem = (($(window).width()*20)/375);

window.isTest = false;
if(isTest){
	window.baseUrl = 'http://test.weixin.mlxing.com:8321';
	window.staticUrl = 'http://test.static.mlxing.com:8321';
	window.apiUrl = 'http://test.wjapi.mlxing.com:8321';
}else{
	window.baseUrl = 'http://weixin.mlxing.com';
	window.staticUrl = 'http://static.mlxing.com';
	window.apiUrl = 'http://wjapi.mlxing.com';
}

//*****************配置vuex*************************
//这个东西在以后会很有用，弄了一个store文件夹去储存相关文件 
//https://vuex.vuejs.org/zh-cn/   使用文档

const store = new Vuex.Store({
	state: {
		system:'',//操作系统
		address:{
			has:false,
			curCity:'未知',
			longitude:'123.1111111',//经度
			latitude:'123.1111111',//维度
		},
		moments:{//圈子页
			all_dongtai:'',
			dynamicListPage:0,

			leavePlace:0,
			navType:1,
			dynamic_nav_type:1,
			pinglun_card:'',
			joinTop:'',//从话题页跳转回来发布
			joinedTopics:'',//关注的话题
			tag_dongtai_page:1,
			sendMsg:false,//转发或者发送就变true
		},
		mid:'',
		is_dy:'',
		headimgurl:'',
		nickname:'',
		hotTag:[],//热门标签
		hotTagPage:1,//热门标签的页数
    locCity:'未知'
	},
	actions: { 
		  // detailTo ({ commit }) {
		  //  	 commit('detailTo')
		  // }
	},
	mutations: {
		setTopic(state,str){

			state.moments.joinTop = str;
		},
		resetTopic(state){

			state.moments.joinTop = '';
		},
		setHotTag(state,arr){
			for(var i=0;i<arr.length;i++){
				state.hotTag.push(arr[i]);
			}
			state.hotTagPage = state.hotTagPage+1;
		},
		resetHotTag(state){
			state.hotTag=[];
			state.hotTagPage=1;
		},
		changeNavType(state,idx){
			state.moments.navType=idx;
		},
		increment (state) {

		},
	    saveLocCity (state,value) {
	      state.locCity=value||"未知";
	    },
	    increment (state) {
		  
		},
		detailTo (state) {
		  return state.detailShow = !state.detailShow;
		}
	},
	getters:{
    getLocCity (state){
      return state.locCity||"未知";
    }
	}
})

const router = new Vuerouter({
	routes
})
//*****************用户信息存储在vuex******************
store.state.mid = $cookie('mid');
store.state.is_dy = $cookie('is_dy');
store.state.headimgurl = $cookie('headimgurl');
store.state.nickname = $cookie('nickname');
$cookie.remove('mid');
$cookie.remove('headimgurl');
$cookie.remove('is_dy');
$cookie.remove('nickname');
//****************************************************

const app = new Vue({
  router,
  store
}).$mount('#app')

//**********************rem****************************
var winWidth = document.body.clientWidth;
document.getElementsByTagName('html')[0].style.fontSize=((winWidth*20)/375)+'px';

//**********************判断系统****************************
(function(){
	var self={};
	self.prop=['MicroMessenger','iPhone','Android'];
	self.ua = navigator.userAgent;
	if(self.ua.match(/MicroMessenger/i) == self.prop[0]){
		self.system='wx'
		
	}else if(self.ua.match(/iPhone/i) == self.prop[1] ){
		
		self.system='iPhone'
	
	}else if(self.ua.match(/Android/i) == self.prop[2]){
		//console.log('我是安卓')
		self.system='Android'
		
	}
	store.state.system = self.system;
}())
//**************************************************
window.getCurAdr = function (){//获取现在的地址
	if(store.state.system=='Android'){
		var city =arguments[0];
		var lontitude =arguments[1];
		var latitude =arguments[2];
		store.state.curCity=city;
		store.state.longitude=lontitude;
		store.state.latitude=latitude;
		store.state.address.has = true;
	}else if(store.state.system=='iPhone'){ 
		var str = arguments[0];
		try{
			var obj = JSON.parse(str);
			
		}catch(error){
			console.log('address error');
		}
		store.state.address.has = true;
		store.state.curCity=obj.city;
		store.state.longitude=obj.longitude;
		store.state.latitude=obj.latitude;
	}
	if(window.add){
		window.add=null;
	}
	
}
//获得地理坐标信息，存在在vuex
import $communic from './core/communic';
window.add = new $communic({
	fn:'mlxapp.getLocationInfo',
	debug:false,
	params:{
		location:'1',
		handle:'getCurAdr'
	}
})

