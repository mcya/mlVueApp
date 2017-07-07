const search = [
  {
    name:'city_search',
    path:'/city_search',
    component:resolve =>{
      require.ensure(['../views/search/city_search.vue'], () => {
        resolve(require('../views/search/city_search.vue'))
      })
    }
  },
  {
    name: 'city_search_p2',
    path: '/city_search_p2',
    component: resolve => {
      require.ensure(['../views/search/city_search.vue'], () => {
        resolve(require('../views/search/city_search.vue'))
      })
    }
  }
];

export {search}
