import environments from 'environments/environment';


export function getProfileImage(image, index) {
    if (image && image.length) {
        return hasUploadedImages(image, index) ? environments.IMAGE_URL + image[index] : image[0];
    }
    return environments.IMAGE_URL + 'upload/images/img_not_available.png';
}
function hasUploadedImages(image, index) {
    return image[index || 0].indexOf('upload/') > -1;
}
export function hasUploadedImage(image) {
    return image && image.indexOf('upload/') > -1;
}