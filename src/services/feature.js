import { EmailURL } from 'db/url';
import { createAuthenticationHeaders } from "./auth";
import { http } from "./http";

export const sendEmail = async (content, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.post(EmailURL.sendEmail, content, headers, callback);
}
export const sendReportReview = async (content, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.post(EmailURL.sendReviewReport, content, headers, callback);
}