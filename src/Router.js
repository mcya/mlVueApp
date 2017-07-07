
import {tour} from './routers/tour.js';
import {moments} from './routers/moment.js';
import {wallet} from './routers/wallet.js';
import {personal} from './routers/personal.js';
import {search} from './routers/search.js';
import {orders} from './routers/orders.js';
import {group} from './routers/group.js';
const routes = [
	...moments,
	...wallet,
  ...personal,
  ...search,
  ...orders,
  ...group,
  ...tour,
	{
		name:'intro',
		path:'/intro',
		component:resolve => {
			require.ensure(['./views/intro.vue'],() => {
				resolve(require('./views/intro.vue'))
			})
		}
	},
	{
		name:'play',
		path:'/play/:id',
		component:resolve => {
			require.ensure(['./views/play.vue'],() => {
				resolve(require('./views/play.vue'))
			})
		}
	},
	{
		path:'/trained',
		component:resolve => {
			require.ensure(['./views/trained.vue'],() => {
				resolve(require('./views/trained.vue'))
			})
		}
	},
	{
		path:'/my_page',
		component:resolve => {
		  require.ensure(['./views/my_page.vue'], () => {
		    resolve(require('./views/my_page.vue'))
		  })
		}
	},
	{
		path:'/go_team',
		component:resolve => {
		  require.ensure(['./views/go_team.vue'], () => {
		    resolve(require('./views/go_team.vue'))
		  })
		}
	},
	{
		path:'/profile',
		component:resolve => {
		  require.ensure(['./views/profile.vue'], () => {
		    resolve(require('./views/profile.vue'))
		  })
		}
	},
	{
		path:'/comment',
		component:resolve => {
		  require.ensure(['./views/comment.vue'], () => {
		    resolve(require('./views/comment.vue'))
		  })
		}
	},
	{
		name:'js_gengduo',
		path:'/js_gengduo',
		component:resolve => {
		  require.ensure(['./views/trained/js_gengduo.vue'], () => {
		    resolve(require('./views/trained/js_gengduo.vue'))
		  })
		}
	},
	{
		name:'kc_gengduo',
		path:'/kc_gengduo',
		component:resolve => {
		  require.ensure(['./views/trained/kc_gengduo.vue'], () => {
		    resolve(require('./views/trained/kc_gengduo.vue'))
		  })
		}
	},
	{
		name:'reward',
		path:'/reward/:biz_id/:be_reward_user/:teacher/:title',
		component:resolve => {
		  require.ensure(['./views/trained/reward.vue'], () => {
		    resolve(require('./views/trained/reward.vue'))
		  })
		}
	},
	{
		name:'baoming',
		path:'/baoming',
		component:resolve => {
		  require.ensure(['./views/my_course/baoming.vue'], () => {
		    resolve(require('./views/my_course/baoming.vue'))
		  })
		}
	},
	{
		name:'zhifu',
		path:'/zhifu/:teacher/:title/:price/:biz_id',
		component:resolve => {
		  require.ensure(['./views/trained/zhifu.vue'], () => {
		    resolve(require('./views/trained/zhifu.vue'))
		  })
		}
	},
	{
		name:'chongzhi',
		path:'/chongzhi/:reward_num',
		component:resolve => {
		  require.ensure(['./views/trained/chongzhi.vue'], () => {
		    resolve(require('./views/trained/chongzhi.vue'))
		  })
		}
	}
]

export {routes}


