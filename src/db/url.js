import environments from 'environments/environment';

export class URL {
    static AUTH_USER_URL = environments.URL + '/api/auth-users/users';
    static REVIEW_URL = environments.URL + '/api/reviews';
    static REVIEW_USER_URL = environments.URL + '/api/auth-users/review-users';
    static VOUCHER_USER_URL = environments.URL + '/api/auth-users/voucher-users';
    static PROMOTION_USER_URL = environments.URL + '/api/promotions';
    static USER_URL = environments.URL + '/api/users';
    static FEATURE_URL = environments.URL + '/api/features';
    static ITEM_URL = environments.URL + '/api/items';
    static PROMOTION_URL = environments.URL + '/api/promotions'; 
    static SHOP_URL = environments.URL + '/api/shops';
    static CATEGORY_URL = environments.URL + '/api/categories';
    static RECRUITMENT_URL = environments.URL+ '/api/recruitments';
}

export class ShopURL{
    static getShopByUsernameUrl = URL.SHOP_URL + '/username';
    static getShopWithNewItemsUrl = URL.SHOP_URL + '/shop-with-new-items';
    static getSellerByItemIdUrl = URL.SHOP_URL + '/item';
    static rejectShopUrl = URL.SHOP_URL + '/reject';
    static getNearShopsByPointUrl = URL.SHOP_URL + '/nearshop';
}
export class RecruitmentURL{
    static getRecruitmentByIdUrl = URL.RECRUITMENT_URL;
    static getRecruitmentByShopIdUrl = URL.RECRUITMENT_URL + '/shopid';
    static getRecruitmentsFromNearestShop = URL.RECRUITMENT_URL + '/nearestshops';
}
export class AuthUserURL{
    static getUserUrl = URL.AUTH_USER_URL + '/profile' ;
    static getNewsFeedUrl = URL.AUTH_USER_URL + '/newsfeed';
    static editProfileUrl = URL.AUTH_USER_URL + '/edit/profile';
    static editUserInfoUrl = URL.AUTH_USER_URL + '/edit/userinfo';
    static editNameUrl = URL.AUTH_USER_URL + '/edit/name';
    static editTelUrl = URL.AUTH_USER_URL + '/edit/tel';
    static editGenderUrl = URL.AUTH_USER_URL + '/edit/gender';
    static editBirthdayUrl = URL.AUTH_USER_URL + '/edit/birthday';
    static unblockUrl = URL.AUTH_USER_URL + '/unblock';
    static changePasswordUrl = URL.AUTH_USER_URL + '/changepassword';
    static getFollowShopsUrl = URL.AUTH_USER_URL + '/follow/shops';
    static getFollowShopsIdUrl = URL.AUTH_USER_URL + '/follow/shopsid';
    static getFollowItemsUrl = URL.AUTH_USER_URL + '/follow/items';
    static getFollowItemsIdUrl = URL.AUTH_USER_URL + '/follow/itemsid';
    static isFollowItemUrl = URL.AUTH_USER_URL + '/isfollowitem';
    static isFollowShopUrl = URL.AUTH_USER_URL + '/isfollowshop';
    static likeShopUrl = URL.AUTH_USER_URL + '/like/shop';
    static unlikeShopUrl = URL.AUTH_USER_URL + '/unlike/shop';
    static isLikeShopUrl = URL.AUTH_USER_URL + '/islikeshop';
    static followShopUrl = URL.AUTH_USER_URL + '/add/followshop';
    static followItemUrl = URL.AUTH_USER_URL + '/add/followitem';
    static unfollowShopUrl = URL.AUTH_USER_URL + '/remove/followshop';
    static unfollowItemUrl = URL.AUTH_USER_URL + '/remove/followitem';
    static logoutUrl = URL.AUTH_USER_URL + '/logout';
}

export class AuthReviewURL{
    static addItemReviewUrl = URL.REVIEW_USER_URL + '/item-review/add';
    static addShopReviewUrl = URL.REVIEW_USER_URL + '/shop-review/add';
    static editItemReviewUrl = URL.REVIEW_USER_URL + 'item-review/edit';
    static editShopReviewUrl = URL.REVIEW_USER_URL + '/shop-review/edit';
    static removeItemReviewUrl = URL.REVIEW_USER_URL + '/item-review/remove';
    static removeShopReviewUrl = URL.REVIEW_USER_URL + '/shop-review/remove';
}
export class AuthVoucherURL{
    static getPromotionsByShopIdUrl = URL.PROMOTION_USER_URL + '/shopid';
    static claimVoucherUrl = URL.VOUCHER_USER_URL + '/claim';
    static getUserAvailableClaimedVouchersUrl = URL.VOUCHER_USER_URL + '/user-email/available';
    static getUserUnavailableClaimedVouchersUrl = URL.VOUCHER_USER_URL + '/user-email/unavailable';
    static getVoucherWithPromotionUrl = URL.VOUCHER_USER_URL + '/with-promotion';
    static redeemVoucherUrl = URL.VOUCHER_USER_URL + '/redeem';
}

export class UserURL{
    static onSignInWithoutActivatedUrl = URL.USER_URL + '/login-without-activated';
    static loginUrl = URL.USER_URL +  '/login';
    static getUserByEmailUrl = URL.USER_URL + '/profile';
    static getUserByIdUrl = URL.USER_URL + '/profileid';
    static addUserUrl = URL.USER_URL + '/add';
    static addUserByFbUrl = URL.USER_URL + '/add-by-fb'
    static addUserByGoogleUrl = URL.USER_URL + '/add-by-google'
    static activateAccountUrl = URL.USER_URL + '/activate';
    static savePasswordUrl = URL.USER_URL + '/save/password'
    static checkEmailUrl = URL.USER_URL + '/checkemail';
    static resendActivationEmailConfirmationUrl = URL.USER_URL + '/resend/activation-email'
    static resendActivationEmailUrl = URL.USER_URL + '/resend/activation-email'
    static sendPasswordLinkToEmailUrl = URL.USER_URL + '/reset/password'
    static resetUserFromLinkUrl = URL.USER_URL + '/reset/password'
    
}
export class CategoryURL{
    static getCategoriesByShopIdUrl = URL.CATEGORY_URL;
}
export class EmailURL{
    static sendEmail = URL.FEATURE_URL + '/send/email';
    static sendReviewReport = URL.FEATURE_URL + '/send/report';
}
export class ItemURL{
    static getSimilarItemsUrl = URL.ITEM_URL + '/similar';
    static getItemWithSellerByItemIdUrl = URL.ITEM_URL + '/item-with-seller';
    static getPublicItemsByCategoryIdUrl = URL.ITEM_URL + '/public/items';
    static getAllPublicItemsByShopIdUrl = URL.ITEM_URL + '/public/items/all';
    static getPublicNewItemsByShopIdUrl = URL.ITEM_URL + '/public/items/new';
    static getPublicDiscountItemsByShopIdUrl = URL.ITEM_URL + '/public/items/discount';
    static getSearchItemByTextUrl = URL.ITEM_URL + '/public/items/search/shopid';
    static getShopsThroughShopIdsUrl = URL.ITEM_URL + '/public/items/search/shops/ids';
}
export class PromotionURL{
    static getPromotionsByShopIdUrl = URL.PROMOTION_URL + '/shopid';
    static getPromotionByIdUrl = URL.PROMOTION_URL;
}

export class ReviewURL{
    static getShopReviewRatingUrl = URL.REVIEW_URL + '/shop-rating';
    static getShopReviewByIdUrl = URL.REVIEW_URL + '/shopid';
    static getItemReviewByIdUrl = URL.REVIEW_URL + '/itemid';
}