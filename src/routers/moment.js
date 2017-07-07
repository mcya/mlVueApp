import my_moment from '../views/moments/my_moment.vue'//发表评论
var moments=[
	{

		name:'tag_list',
		//path:'/tag_list/:msg/:tags',
		path:'/tag_list/:msg',
		component:resolve => {
		  require.ensure(['../views/moments/tag_list.vue'], () => {
		    resolve(require('../views/moments/tag_list.vue'))
		  })
		}
	},
	{
		path:'/my_moment',
		name:'my_moment',
		component:my_moment
	},
	{
		name:'pinglun_list',//评论列表
		path:'/pinglun_list/:id',
		component:resolve => {
		  require.ensure(['../views/moments/pinglun_list.vue'], () => {
		    resolve(require('../views/moments/pinglun_list.vue'))
		  })
		}
	},
	{
		name:'share_dongtai',//分享圈子
		//path:'/share_dongtai/:msg/:pics/:nickname/:id/:trans_msg',
		path:'/share_dongtai/:id',
		component:resolve => {
		  require.ensure(['../views/moments/share_dongtai.vue'], () => {
		    resolve(require('../views/moments/share_dongtai.vue'))
		  })
		}
	},
	{
		path:'/send_pinglun',
		component:resolve => {
			require.ensure(['../views/moments/send_pinglun.vue'],() => {
				resolve(require('../views/moments/send_pinglun.vue'))
			})
		}
	},
	{
		path:'/create_quanzi',
		component:resolve => {
			require.ensure(['../views/moments/create_quanzi.vue'],() => {
				resolve(require('../views/moments/create_quanzi.vue'))
			})
		}
	}
];



export {moments}