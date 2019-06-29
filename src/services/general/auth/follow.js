import { follow, isFollowing, isLike, like, unfollow, unlike } from 'services/http/auth-user/follow';
export async function likeShop(id) {
    try {
        let { result } = await like({ id, type: 'shops' });
        return result;
    }
    catch (err) {
        return Promise.reject(err);
    }
}
export async function unlikeShop(id) {
    try {
        let { result } = await unlike({ id, type: 'shops' });
        return !result;
    }
    catch (err) {
        return Promise.reject(err);
    }

}
export async function followShop(id) {
    try {
        let { result } = await follow({ id, type: 'shops' });
        return result;
    }
    catch (err) {
        return Promise.reject(err);
    }
}
export async function unfollowShop(id) {
    try {
        let { result } = await unfollow({ id, type: 'shops' });
        return !result;
    }
    catch (err) {
        return Promise.reject(err);
    }
}
export async function likeItem(id) {
    try {
        let { result } = await like({ id, type: 'items' });
        return result;
    }
    catch (err) {
        return Promise.reject(err);
    }
}
export async function unlikeItem(id) {
    try {
        let { result } = await unlike({ id, type: 'items' });
        return !result;
    }
    catch (err) {
        return Promise.reject(err);
    }
}

export async function followItem(id) {
    try {
        let { result } = await unfollow({ id, type: 'items' });
        return result;
    }
    catch (err) {
        return Promise.reject(err);
    }
}
export async function unfollowItem(id) {
    try {
        let { result } = await unfollow({ id, type: 'items' });
        return !result;
    }
    catch (err) {
        return Promise.reject(err);
    }
}
export async function isLikeShop(id) {
    try {
        let { result } = await isLike({ id, type: 'shops' });
        return result;
    }
    catch (err) {
    }
}
export async function isFollowingShop(id) {
    try {
        let { result } = await isFollowing({ id, type: 'shops' });
        return result;
    }
    catch (err) {
    }
}