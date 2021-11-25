const api_config = {
  //Development URL
  //BASE_URL: 'http://cottontradecentre.com/development/cotton_bid/api/',
  //BASE_URL: 'http://cottontradecentre.com/development/cotton_bid_v1/api/',
  BASE_URL: 'http://cottontradecentre.com/development/cotton_bid_v3/api/',
  // 'http://cottontradecentre.com/development/cotton_bid_v2/api/get_mcx_data'
  //Production URL
  //BASE_URL: 'http://cottontradecentre.com/cotton_bid/api/',

  //APIs Name
  SELLER_REGISTRATION: 'registration_seller',
  GET_SELLER_TYPE: 'seller_type',
  GET_BUSINESS_TYPE: 'business_type',
  GET_REGISTRATION_AS: 'registration_as',
  GET_STATE: 'state_list',
  GET_DISTRICT: 'district_list',
  GET_STATIONNAME: 'station_list',
  GET_CITY: 'city_list',

  LOGIN_SELLER: 'login_seller',
  RESEND_OTP: 'resend_otp_seller',
  VERIFY_OTP: 'otp_verify_seller',
  PRODUCT_LIST: 'product_list',
  PRODUCT_ATTRIBUTE_LIST: 'product_attribute_list',
  POST_TO_SELL: 'post_to_sell',
  MY_ACTIVE_POST:'notification_post_seller_list',
  COMPLETED_DEALS:'completed_deal',
  CANCEL_POST:'cancel_post',
  //NEGOTIATION_LIST: 'negotiation_list',
  //NEGOTIATION_LIST: 'negotiation_list_new',
  NEGOTIATION_LIST: 'negotiation_list_new_v2',
  // SEARCH_TO_SELL: 'search_to_sell',
  SEARCH_TO_SELL: 'search_to_sell_new_v3', //temp

  
  FORGOT_PASSWORD_SELLER:'forgot_password_seller',
  RESET_PASSWORD_SELLER:'reset_password_seller',
  SEARCH_SELLER:'search_buyer',
  NOTIFICATION_TO_SELLER:'notification_to_buy',
  //MAKE_DEAL:'make_deal',
  MAKE_DEAL:'make_deal_new_v2',
  NOTIFICATION_LIST:'notification_to_seller_list',
  REGISTRATION_SCREEN_DROPDOWN_DATA:'sellertype_buyertype_businesstype_registrationas',
  POST_DETAILS:'post_details',
  TRANSMIT_PAYMENT_LAB_LIST:'transmit_payment_lab_list',
  //NEGOTIATION: 'negotiation',
  NEGOTIATION: 'negotiation_new_v2',
  NEGOTIATION_DETAIL_OLD:'negotiation_detail',
  MY_CONTRACT:'my_contract',
  CANCEL_NOTIFICATION:'cancel_notification',
  LOGOUT_SELLER: 'logout_seller',
  UPDATE_TRANSACTION_TRACKING: 'update_transaction_tracking',  
  PROFILE_SELLER: 'profile_seller',
  EDIT_PROFILE_SELLER:'edit_profile_seller',
  NEWS: 'news',
  NEWS_DETAIL: 'news_details',
  BROKER_LIST: 'broker_list_v1',
  NEGOTIATION_DETAIL:'negotiation_detail_new_v2',
  PLAN_LIST:'plan_list',
  MAKE_DEAL_OTP_VERIFY:'make_deal_otp_verify',
  CONTRACT_DETAIL:'contract_details',
  CHANGE_PASSWORD_SELLER:'change_password_seller',
  TRANSACTION_HISTORY:'transaction_history',
  RESEND_DEAL_OTP:'resend_deal_otp',
  ADD_USER_PLAN:'add_user_plan',
  GET_MCX_DATA:"get_mcx_data",
  PARTY_WISE_CONTRACT_REPORT:'party_wise_contract_report',
  PRODUCT_WISE_CONTRACT_REPORT: 'product_wise_contract_report',
  BROKER_WISE_CONTRACT_REPORT: 'broker_wise_contract_report',
  POST_REPORT : 'post_report',
  CONTRACT_PRODUCT_LIST : 'contract_product_list',
  CONTRACT_BROKER_LIST:'contract_broker_list',
  CONTRACT_PARTY_LIST:'contract_party_list'


};

export default api_config;