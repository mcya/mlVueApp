var group =[{
		path:'/group_note',
		component:resolve => {
			require.ensure(['../views/group/group_note.vue'],() => {
				resolve(require('../views/group/group_note.vue'))
			})
		}
	},
	{
		path:'/add_note',
		component:resolve => {
			require.ensure(['../views/group/add_note.vue'],() => {
				resolve(require('../views/group/add_note.vue'))
			})
		}
	},
	{
		path:'/group_detail',
		component:resolve => {
			require.ensure(['../views/group/group_detail.vue'],() => {
				resolve(require('../views/group/group_detail.vue'))
			})
		}
	},
	{
		path:'/group_mass',
		component:resolve => {
			require.ensure(['../views/group/group_mass.vue'],() => {
				resolve(require('../views/group/group_mass.vue'))
			})
		}
	},
  {
    path:'/contact_list',
    component:resolve => {
      require.ensure(['../views/group/contact_list.vue'],() => {
        resolve(require('../views/group/contact_list.vue'))
      })
    }
  },
  {
    path:'/test_search',
    component:resolve => {
      require.ensure(['../views/group/test_search.vue'],() => {
      resolve(require('../views/group/test_search.vue'))
      })
    }
  }
];
export {group}
