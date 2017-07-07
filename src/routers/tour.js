var tour =[{
		path:'/find_guide',
		component:resolve => {
			require.ensure(['../views/find_guide.vue'],() => {
				resolve(require('../views/find_guide.vue'))
			})
		}
	},
	{
		path:'/find_team',
		component:resolve => {
			require.ensure(['../views/find_team.vue'],() => {
				resolve(require('../views/find_team.vue'))
			})
		}
	},
	{
		name:'new_find_team',//新的找团页面
		path:'/new_find_team',
		component:resolve => {
		  require.ensure(['../views/new_find_team/find_team.vue'], () => {
		    resolve(require('../views/new_find_team/find_team.vue'))
		  })
		}
	}
];
export {tour}