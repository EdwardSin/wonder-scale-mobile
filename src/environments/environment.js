let environments = {
    IMAGE_URL: 'https://assets.wonderscale.com/',
    URL: 'http://192.168.1.103:3000',
    item_id: '5cf61aa01916191f903794ca',
    shop_id: '5cf4baf1e4845d66b431a467',
    recruitment_id: '5c9b809df3c74366b1d92e67',
    promotion_id: '5c90c59ceb0f220f45712e39',
    category_id: '5cc01752e6522d2e64dc154d',
    review_id: '5c206234be79581030d38331',
    HERE_APP_API: 'h9LLOE7i3CG3y1OKhWxw',
    HERE_APP_CODE: 'ERx9SWBfCHLlbN1vKOvlng',
    FB_API: '246047829574930',
    GOOGLE_ANDROID_API: '783575719474-il6tb6ac701ugae1cfc0v0pt4trmr5rd.apps.googleusercontent.com',
    GOOGLE_IOS_API: '783575719474-onrf7g2prkrl5d0kqegcq4eb4b39s16f.apps.googleusercontent.com',
};

environments = {
    ...environments,
    Image: {
        Default_Shop: require('../' + 'assets/immutable/shop.png'),
        Default_Banner: require('../' + 'assets/immutable/shop.png'),
        Home_Page: require('../' + 'assets/immutable/craft-cafe.jpg'),
    }
}

export default environments;