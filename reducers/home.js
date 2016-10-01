const initial = {
  topics:[{
    content: '那是在很久很久以前，很久以前',
    addons: [{
      type: 'image',
      src: 'https://img3.doubanio.com/view/photo/thumb/public/p2328680655.jpg'
    }],
    author:{
      nickname: '谢天笑',
      avatarUrl: require('../assets/avatar.png'),
      id: ''
    },
    location: {
      long:12,
      lat:12
    },
    genre: 'public',
    updated: (new Date()).toLocaleTimeString(),
    heat: 143
  },{
    content: '人潮人海中，又看到你，一样迷人一样美丽。慢慢的放松，慢慢的抛弃，装作整齐面带笑容',
    addons: [{
      type: 'image',
      src: 'https://img3.doubanio.com/view/photo/thumb/public/p2328680655.jpg'
    }],
    author:{
      nickname: '窦唯',
      avatarUrl: require('../assets/avatar.png'),
      id: ''
    },
    location: {
      long:12,
      lat:12
    },
    genre: 'public',
    updated: (new Date()).toLocaleTimeString(),
    heat: 13
  },{
    content: '我穿着大头皮鞋，想着我的爷爷，走过雪山草地',
    addons: [{
      type: 'image',
      src: 'https://img3.doubanio.com/view/photo/thumb/public/p2328680655.jpg'
    }],
    author:{
      nickname: '崔健',
      avatarUrl: require('../assets/avatar.png'),
      id: ''
    },
    location: {
      long:12,
      lat:12
    },
    genre: 'public',
    updated: (new Date()).toLocaleTimeString(),
    heat: 13
  },{
    content: '把爱情留给我身边最珍惜的姑娘，你为我流浪，你为我闯荡，为我两败俱伤',
    addons: [{
      type: 'image',
      src: 'https://img3.doubanio.com/view/photo/thumb/public/p2328680655.jpg'
    }],
    author:{
      nickname: '郑钧',
      avatarUrl: require('../assets/avatar.png'),
      id: ''
    },
    location: {
      long:12,
      lat:12
    },
    genre: 'public',
    updated: (new Date()).toLocaleTimeString(),
    heat: 13
  },{
    content: '原谅我这一生不羁放荡爱自由，也会怕有一天会跌倒',
    addons: [{
      type: 'image',
      src: 'https://img3.doubanio.com/view/photo/thumb/public/p2328680655.jpg'
    }],
    author:{
      nickname: 'Beyond',
      avatarUrl: require('../assets/avatar.png'),
      id: ''
    },
    location: {
      long:12,
      lat:12
    },
    genre: 'public',
    updated: (new Date()).toLocaleTimeString(),
    heat: 13
  },{
    content: '皇后大道东，皇后大道西，皇后大道...',
    addons: [{
      type: 'image',
      src: 'https://img3.doubanio.com/view/photo/thumb/public/p2328680655.jpg'
    }],
    author:{
      nickname: '罗大佑',
      avatarUrl: require('../assets/avatar.png'),
      id: ''
    },
    location: {
      long:12,
      lat:12
    },
    genre: 'public',
    updated: (new Date()).toLocaleTimeString(),
    heat: 13
  },{
    content: '孤独的人是可耻的',
    addons: [{
      type: 'image',
      src: 'https://img3.doubanio.com/view/photo/thumb/public/p2328680655.jpg'
    }],
    author:{
      nickname: '张楚',
      avatarUrl: require('../assets/avatar.png'),
      id: ''
    },
    location: {
      long:12,
      lat:12
    },
    genre: 'public',
    updated: (new Date()).toLocaleTimeString(),
    heat: 13
  }]
}
export default function home(state=initial,action){
  switch(action.type){
    default:
      return state
  }
}