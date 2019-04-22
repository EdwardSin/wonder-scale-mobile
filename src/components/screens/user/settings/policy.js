import { LoadingSpinner } from 'components/modals/ws-modals';
import React from 'react';
import { WebView } from 'react-native';


 const html = "<div style='padding-left:20px; padding-right:20px'><strong>Last Updated: October 20, 2018</strong><br/><br/>Thank you for using <strong>Wonder Scale</strong>. These Terms govern your use of our website <strong>Wonder Scale</strong> and mobile applications. Please read the Terms of Use carefully before using the services offered by <strong>Wonder Scale</strong>. By using our services, you agree to all of the terms and conditions contained herein.<br/><br/><h5>1. Our Services</h5>We work hard to provide the best possible Services and to specify clear guidelines for everyone who uses them. Our mission is to offer enterprise services and consumer services.1.We determine your location that may help you to search for restaurants or other venues and to provide you with your own special experience. 2.We make suggestions for you by inferring your interests and preferences.3.We design our Services so that the sponsored content you see is relevant and useful to you.4.We show you the upcoming events and promotions on every page.5.We always appreciate your feedback about our Services to improve the effectiveness of the advertising performance and consumer services. <br/><br/><h5>2. Our Policy</h5><br/><h6>Consent to Collection of Data:</h6>By accessing or using our Services, you are consenting to our collection, use, disclosure, retention, and protection of your information. We analyse the data and understand your needs to operate and improve Our Services.<br/><br/><h6>Policies are Subject to Change:</h6>We may amend or update these Terms at our own discretion and we will communicate with you, including by email, text (only if you opt-in), or in our Apps about the changes. However, you shall be responsible for checking these Terms from time to time and ensure continued compliance with these Terms. By continuing to access or use our Services after any such change in the Terms shall be deemed as acceptance to such amended Terms and you also agree to be bound by such amended Terms.<br/><br/><h6>Permission to Update Software:</h6>If you download or use our software, you give us permission to install upgrades and additional features to further develop it in order to accurately reflect our Services. Any updates or upgrades provided to you by us under the Terms shall be considered part of the Services.<br/><br/><h6>Limits on Liability:</h6>We are not responsible for the actions, content or data of third parties and you release us from any claims and damages, known or unknown, arising out of or in any way connected with any claim that you have against any such third parties.<br/><br/><h6>Indemnification Claim:</h6>If anyone brings a claim, cause of action or dispute against us, which is related to your actions, content or information on our app or website, you are deemed to agree to indemnify us against all damages, losses and expenses of any kind related to any such claim, cause of action or dispute.<br/><br/><h5>3. Enterprise Policy</h5><br/><h6>Data Use Restrictions:</h6>Ensure that any advert data collected, received or derived from your Page is only shared with someone acting on your behalf, such as your service provider. You are responsible for maintaining the confidentiality and security of your account.<br/><br/><h6>Business in Compliance with Law:</h6>You hereby agree and assure us that our Platform shall be used for lawful purposes only and that you will not promote products, services or activities which are unlawful, illegal, misleading, discriminatory or fraudulent, including gambling, drugs, weapons or firearms, adult services, third-party infringement, and prohibited financial services. Failure to comply may result in termination of your account.<br/><br/><h6>Business Pages:</h6>Pages are special profiles that may only be used to promote a business. You may only administer a Page if you are an authorized representative of the subject of the Page (seller). Sellers have to upload content including description, images, videos, and marketing materials to your Page in order to help consumers discover and learn about information, locations, and upcoming events that are relevant to them. Sellers are not allowed to establish terms beyond those set forth in these Terms to govern the use of the Page you administer.<br/><br/><h6>Advert Content:</h6>You are responsible for ensuring that any content you post on your Page, shall comply with all applicable laws, rules and regulations and these Terms of Use, and any advertising, marketing, privacy, or other self-regulatory codes applicable to your industry.<br/><br/>(i) Advertisers must not create lead adverts questions to request sensitive personal data without our prior written permission. This includes direct or indirect assertions or implications about a person's race or ethnicity, religion, sexual orientation, usernames or passwords, account numbers, financial information, trade union membership, criminal record, physical or mental health condition.<br/>(ii) Adverts must also not contain inappropriate content such as violence and adult content. This includes nudity, depictions of people in explicit or suggestive positions or activities that are sexually provocative.<br/>(iii) All other adverts and landing pages must not use our copyrights, trademarks or any confusingly similar marks, except with our prior written permission.<br/>(iv) Adverts must also not contain software viruses or any other computer codes, files, worms, logic bombs or programs that are designed or intended to disrupt, disable, damage, limit or interfere with the proper function of any software, hardware, or telecommunications equipment or to damage or obtain unauthorized access to any system, data, password or other information of our Services or any third party.<br/><br/><h6>Reserve the Right to Remove:</h6>We reserve the right to approve, reject or remove any advert for any reason, at our sole discretion, including adverts that negatively affect our relationship with our users or that promote content, services or activities contrary to our competitive position, interests or advertising philosophy. To help support our community, we encourage consumers to report content that you believe violates our Terms and Policies.<br/><br/><h6>Misuse of Tag:</h6>If we learn of conduct where sellers misuse of this feature, we will take action against your account to protect our Services, including by suspending access to your account or disabling it.<br/><br/><h6>Third Party Sites and Services:</h6>Our Service may permit you to link to other websites or resources on the Internet. However, when you access third party websites, you do so at your own risk. These other websites are not under our control, and you acknowledge that we are not responsible or liable for the content, functions, accuracy, legality, appropriateness or any other aspect of such websites or resources. You further acknowledge and agree that we shall not be responsible or liable for any damage or loss caused or alleged to be caused by or in connection with the use of any such Content or services available through any such website or resource.<br/><br/><h6>User Feedback:</h6>User reviews or ratings for business do not reflect our opinion. It is pertinent to state that every review posted on our Services is the personal opinion of the reviewer only. Our Services is a neutral platform, which solely provides a means of communication between sellers and consumers. However, in case if someone writes a review that the business page does not consider to be true, or if the business page representative believes that any particular user's review violates any of our policies, the business page representative may contact the reviewer or post a public response in order to clear up any misunderstandings, or write to us at <strong>info@wonderscale.com</strong> and bring such violation to our attention. We reserve the right to remove the review at our discretion if review is in violation of the Terms or Policies or otherwise harmful to the Services.<br/><br/><h5>4. Consumer Policy</h5><br/><h6>Provide Information Needed</h6>Consumers shall provide accurate information of your name, email address, phone number, birthday, gender, IP address, usage details, information collected through cookies, web beacons and other tracking technologies.<br/><br/><h6>Automatic Collection of Uploaded Information:</h6>As you use our Services, we may also collect other Data that you directly provide to us, which may include pictures that you choose to upload to your account, any restaurant or other venue searches you make, any of your likes, any comments you make, any pages you view, your access times, and any other Data that you voluntarily provide to us.<br/><br/><h6>Enabling Location Services:</h6>If you use our Apps and have enabled background location services in our Apps, you have permitted us to collect the above Data about you in the background even when you do not have the Apps open. You may turn off location services at any time by going to your device settings and toggling off background location.<br/><br/><h6>Ratings & Reviews:</h6>You may rate or review on the Page after visiting the business place to help the enterprise with their business improvements.<br/><br/><h6>Cybercrime is Prohibited:</h6>The content uploaded by consumers must not contain software viruses or any other computer codes, files, worms, logic bombs or programs that are designed or intended to disrupt, disable, damage, limit or interfere with the proper function of any software, hardware, or telecommunications equipment or to damage or obtain unauthorized access to any system, data, password or other information of our Services or any third party.<br/><br/><h5>5. Contact Us</h5>If you have any questions or concerns regarding this Policy, please send a message to <strong>info@wonderscale.com</strong>. We will make every effort to resolve your concerns.<br/><br/><strong>Effective Date: January 1, 2019</strong></div>";
export default class PolicyScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            html: null
        };
    }
    render() {
        return (
            <WebView source={{html:html}} renderLoading={() => (<LoadingSpinner />)} />
        );
    }
}