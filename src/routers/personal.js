const personal = [
  {
    name:'guider_me', //“我的”页面
    path:'/guider_me',
    component:resolve =>{
      require.ensure(['../views/guider_me.vue'], () => {
        resolve(require('../views/guider_me.vue'))
      })
    }
  }
];

export {personal}
