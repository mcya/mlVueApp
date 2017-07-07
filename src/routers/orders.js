var orders=[
{
	name:'dingdan',
	path:'/dingdan',
	component:resolve => {
	  require.ensure(['../components/my_order/order.vue'], () => {
	    resolve(require('../components/my_order/order.vue'))
	  })
	}
   },
   {
	 name:'detail',
	 path:'/detail',
	 component:resolve => {
		 require.ensure(['../components/detail/detail.vue'],() => {
			 resolve(require('../components/detail/detail.vue'))
		 })
	 }
    }
];
export {orders} 