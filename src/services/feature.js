import environments from 'environments/environment';
import { createAuthenticationHeaders } from "./auth";
import { http } from "./http";

export const sendEmail = async (content, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.post(environments.URL + '/api/features/send_email', content, headers, callback);
}
export const sendReportReview = async (content, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.post(environments.URL + '/api/features/send_report', content, headers, callback);
}