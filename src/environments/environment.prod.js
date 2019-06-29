let environments = {
    IMAGE_URL: 'https://assets.wonderscale.com/',
    URL: 'https://www.wonderscale.com',
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