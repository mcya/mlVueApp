const wallet=[
	{
		path:'/my_wallet',
		component:resolve => {
			require.ensure(['../views/wallets/my_wallet.vue'],() => {
				resolve(require('../views/wallets/my_wallet.vue'))
			})
		}
	},
	{
		path:'/recharge',
		component:resolve => {
			require.ensure(['../views/wallets/recharge.vue'],() => {
				resolve(require('../views/wallets/recharge.vue'))
			})
		}
	},
	{
		path:'/withdraw',
		component:resolve => {
			require.ensure(['../views/wallets/withdraw.vue'],() => {
				resolve(require('../views/wallets/withdraw.vue'))
			})
		}
	},
	{
		path:'/history',
		component:resolve => {
			require.ensure(['../views/wallets/history.vue'],() => {
				resolve(require('../views/wallets/history.vue'))
			})
		}
	},
	{
		path:'/my_bank',
		component:resolve => {
			require.ensure(['../views/wallets/my_bank.vue'],() => {
				resolve(require('../views/wallets/my_bank.vue'))
			})
		}
	},
	{
		path:'/add_bank',
		component:resolve => {
			require.ensure(['../views/wallets/add_bank.vue'],() => {
				resolve(require('../views/wallets/add_bank.vue'))
			})
		}
	},
	{
		name:'card_info',
		path:'/card_info/:name/:number',
		component:resolve => {
			require.ensure(['../views/wallets/card_info.vue'],() => {
				resolve(require('../views/wallets/card_info.vue'))
			})
		}
	},
	{
		name:'send_code',
		path:'/send_code/:name/:number/:type/:tel',
		component:resolve => {
			require.ensure(['../views/wallets/send_code.vue'],() => {
				resolve(require('../views/wallets/send_code.vue'))
			})
		}
	},
	{
		path:'/guide_rating',
		component:resolve => {
			require.ensure(['../views/guide_rating.vue'],() => {
				resolve(require('../views/guide_rating.vue'))
			})
		}
	},
	{
		name:'result',
		path:'/result/:id/:year/:month',
		component:resolve => {
			require.ensure(['../views/wallets/result.vue'],() => {
				resolve(require('../views/wallets/result.vue'))
			})
		}
	},
	{
		path:'/test',
		component:resolve => {
			require.ensure(['../views/wallets/test.vue'],() => {
				resolve(require('../views/wallets/test.vue'))
			})
		}
	},
	{
		path:'/lottery',
		component:resolve => {
			require.ensure(['../views/wallets/lottery.vue'],() => {
				resolve(require('../views/wallets/lottery.vue'))
			})
		}
	},
	{
		path:'/lottery_list',
		component:resolve => {
			require.ensure(['../views/wallets/lottery_list.vue'],() => {
				resolve(require('../views/wallets/lottery_list.vue'))
			})
		}
	},
	{
		path:'/lottery_start',
		component:resolve => {
			require.ensure(['../views/wallets/lottery_start.vue'],() => {
				resolve(require('../views/wallets/lottery_start.vue'))
			})
		}
	},
	{
		path:'/chance',
		component:resolve => {
			require.ensure(['../views/wallets/chance.vue'],() => {
				resolve(require('../views/wallets/chance.vue'))
			})
		}
	},

]
export {wallet};