export const environment = {
    production: false,

    apiUrl: 'https://backend.thestaymaster.in/api',
    // apiUrl: 'http://localhost:8080/api',

    RAZORPAY_KEY:'rzp_live_18LwkPAEfyB4s4',
  RAZORPAY_SECRET:'hgjDhm0OaHE6y9fndp50OjpA',

  email: {
    provider: 'microsoft',
    sender: 'sharmakrishnapandey@gmail.com',
    enquiryRecipient: 'avii.programmer@gmail.com',
    notificationEndpoint: '/ext/notifications/enquiry-email',
    microsoft: {
      tenantId: '',
      clientId: '',
      clientSecret: ''
    }
  }
};
