export function registration_api(sellerType,sellerName,password,postalAddress,contactPerson,contactNumber,email,propriterShipValue,millRegNo,millRegistrationDate,valueRMSME,firstFYTurnOver,firstFYTurnOverYear,secondFYTurnOver,secondFYTurnOverYear,thirdFYTurnOver,thirdFYTurnOverYear,cottonTradeExperience,gstNo,panNo,stateID,districtID,stationID,bankName,accountHolderName,branchAddress,ifscCode,referralCode,fcmToken) {

  let registration_param = {
    user_type:"seller",
    seller_buyer_type:sellerType,
    device_type:"android",
    name:sellerName,
    password:password,
    address:postalAddress,
    name_of_contact_person:contactPerson,
    mobile_number:contactNumber,
    email:email,
    business_type:propriterShipValue,
    registration_no:millRegNo,
    registration_date:millRegistrationDate,
    registration_as_msme:valueRMSME,
    turnover_year_one:firstFYTurnOver,
    turnover_date_one:firstFYTurnOverYear,
    turnover_year_two:secondFYTurnOver,
    turnover_date_two:secondFYTurnOverYear,
    turnover_year_three:thirdFYTurnOver,
    turnover_date_three:thirdFYTurnOverYear,
    oper_in_cotton_trade:cottonTradeExperience,
    gst_no:gstNo,
    pan_no_of_buyer:panNo,
    country_id:"1",
    state_id:stateID,
    city_id:districtID,
    station_id:stationID,
    bank_name:bankName,
    account_holder_name:accountHolderName,
    branch_address:branchAddress,
    ifsc_code:ifscCode,
    referral_code:referralCode,
    fcm_token:fcmToken
  }

  return registration_param
}
