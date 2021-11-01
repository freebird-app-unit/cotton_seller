import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AppState,
  TouchableWithoutFeedback,
  Alert,
  PermissionsAndroid,
  RefreshControl,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import {theme} from '../core/theme';
import api_config from '../Api/api';
import axios from 'axios';
import defaultMessages from '../helpers/defaultMessages';
import NoRecordsFound_Icon from '../assets/NoRecodsFound';
import EncryptedStorage from 'react-native-encrypted-storage';
import styles from './Styles';

import RNFetchBlob from 'rn-fetch-blob';

import PropTypes from 'prop-types';
// import {   ActivityIndicator, ScrollView } from 'react-native';
import RNOtpVerify from 'react-native-otp-verify';
import { Appbar } from 'react-native-paper';
import { GenericStyles } from '../styles/GenericStyles';
import {
  NavigationHeader,
  CustomScreenContainer,
  CustomText,
  CustomTextInput,
  CustomButton,
  FullButtonComponent,
} from '../lib';
import ErrorBoundary from '../common/ErrorBoundary';
import colors from '../common/colors';
import { isAndroid, logErrorWithMessage } from '../utilities/helperFunctions';
import TimerText from '../components/otp/TimerText';
// import api_config from '../Api/api';
// import axios from 'axios';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { useNavigation } from '@react-navigation/native';

const RESEND_OTP_TIME_LIMIT = 30; // 30 secs
const AUTO_SUBMIT_OTP_TIME_LIMIT = 4; // 4 secs

let resendOtpTimerInterval;
let autoSubmitOtpTimerInterval;
import VerifyOtpIcon from '../assets/VerifyOtp';

import Modal from 'react-native-modal'
import { heightPercentageToDP, widthPercentageToDP } from '../components/responsive-ratio';


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      loading: 'true',
      refreshing: false,
      isLoading: true,
      userID: 0,
      isNewsFeed: false,
      isProfile: false,
      ProfileData: [],
      spinner: false,
      jsonData: {},
      set:false,
      dropdownPlaceholder: '',
      balesCount: 100,
      displayBalesCount: 100,
      balesPrice: '',
      productJsonData: {},
      productAttributeList: {},
      myActivePost: {},
      arrNegotiationList: [],
      arrNotificationList: {},
      myContractListArray: {},
      txtSpinningMillName: '',
      attributeValue: [{}],
      selectedProductID: 0,
      selectedProductName: '',
      inputData: [],
      LengthinputData: [],
      attributeArry: [],
      balespriceFocus: false,
      token: '',
      otpArray : ['', '', '', '', '', ''],
      otpArrayMail: ['', '', '', '', '', ''],
      resendButtonDisabledTime: RESEND_OTP_TIME_LIMIT,
      autoSubmitOtpTime: AUTO_SUBMIT_OTP_TIME_LIMIT,
      deal_Id:'',
      balesPriceError: '',
      isHomeVisible: true,
      isCustomerVisible: true,
      isAllBid: true,
      isBided: false,
      isDeal: false,
      isMenuOpen: false,
      openState: false,
      deOpenState: false,
      isMyPostActiveClicked: true,
      isMyPostCompletedClicked: false,
      value: null,
      productItem: [],
      submittingOtp:false,
      deValue: null,
      items: [
        {label: 'Maharashtra', value: '1'},
        {label: 'Rajasthan', value: '2'},
        {label: 'Punjab', value: '3'},
        {label: 'Karnatak', value: '4'},
      ],
      deList: [
        {label: 'Domestic', value: 'Domestic'},
        {label: 'Export', value: 'Export'},
      ],
      deName: 'Domestic',
      buyForList: [
        {label: 'Self', value: 'Self'},
        {label: 'Other', value: 'Other'},
      ],
      isShowBuyForDrpDown: true,
      isShowSpinningName: false,
      buyForDropDownValue: 'Self',
      arrProductAttributeValue: [
        {label: 'Maharashtra', value: '1'},
        {label: 'Rajasthan', value: '2'},
        {label: 'Punjab', value: '3'},
        {label: 'Karnatak', value: '4'},
      ],
      isPostToSell: false,
      isSearchToSell: false,
      isNotificationToBuyer: false,
      isDashboard: true,
      isCalculator: false,
      isWallet: false,
      isMyContracts: false,
      titleOfScreen: 'Dashboard',
      dealTabStyle1: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#69BA53',
        marginLeft: 0,
        marginRight: 5,
        marginTop: 10,
        borderRadius: 5,
      },
      dealTabStyle2: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F5F9',
        marginLeft: 5,
        marginRight: 0,
        marginTop: 10,
        borderRadius: 5,
      },
      dealTabTextBox1: {
        height: 40,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontFamily: 'Poppins-Regular',
      },
      dealTabTextBox2: {
        height: 40,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        color: theme.colors.textColor,
        fontFamily: 'Poppins-Regular',
      },
      btnActiveContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.primary,
      },
      btnCompletedContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        opacity: 0.5,
      },
      btnActiveTextColor: theme.colors.primary,
      btnCompletedTextColor: 'gray',
    };

    this.firstTextInputRefMail = React.createRef();
    this.secondTextInputRefMail = React.createRef();
    this.thirdTextInputRefMail = React.createRef();
    this.fourthTextInputRefMail = React.createRef();
    this.fifthTextInputRefMail = React.createRef();
    this.sixthTextInputRefMail = React.createRef();

    this.firstTextInputRef =React.createRef();
    this.secondTextInputRef =React.createRef();
    this.thirdTextInputRef =React.createRef();
    this.fourthTextInputRef =React.createRef();
    this.fifthTextInputRef =React.createRef();
    this.sixthTextInputRef =React.createRef();


  

    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      // Prevent default action
      this.setState({
        arrNegotiationList: [],
        arrNotificationList: [],
      });

      this.getMyContracts()
      this.getProductListAPI()
    });
  }
  componentDidMount() {
    console.log('hellow', this.props);
    this.getMyContracts();
    //this.getProductListAPI()
  }

  getProductListAPI = () => {
    console.log('bhaiband');
    try {
      var self = this;
      axios({
        url: api_config.BASE_URL + api_config.PRODUCT_LIST,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('response :>>>', response.data);
          if (response.status == 200) {
            console.log('response :>>><<<<', response.data);

            let productList = response.data.data;
            let firstProductID = '';
            var arrProductList = [];
            self.setState({
              items: [],
            });
            for (let i = 0; i < productList.length; i++) {
              if (i == 0) {
                self.setState({dropdownPlaceholder: productList[i].name});
                firstProductID = productList[i].id;
              }
              arrProductList.push({
                label: productList[i].name,
                value: productList[i].id,
              });
            }
            self.setState({productItem: arrProductList});
            self.props.navigation.setParams({
              productList: arrProductList,
            });
            console.log('ths', self.props);
            // self.getProductAttributeAPI(firstProductID);
          } else {
            alert('hi', response.data.message);
          }
        })
        .catch(function (error) {
          console.log('error', error);
          self.setState({
            spinner: false,
            message: 'Something bad happened ' + error,
          }),
            alert('hi wezz' + defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
    }
  };

  getMyContracts = async () => {
    console.log('contract');
    try {
      var self = this;
      self.setState({
        spinner: true,
      });

      let data = {
        seller_buyer_id: await EncryptedStorage.getItem('user_id'),
        user_type: 'seller',
      };

      // console.log('My Contract Request---' + JSON.stringify(data));

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.MY_CONTRACT,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log(
            'search to sell response ccontract :' + JSON.stringify(response),
          );

          if (response.data.status == 200) {
            //REDIRECT TO SEARCH SCREEN
            self.setState({
              spinner: false,
              refreshing:false
            });
            if (response.data.data.length > 0) {
              self.setState({myContractListArray: response.data.data});
            }
          } else if (response.data.status == 404) {
            self.setState({
              spinner: false,
            });
          } else {
            self.setState({
              spinner: false,
            });
            alert(response.message);
          }
        })
        .catch(function (error) {
          self.setState({
            spinner: false,
          });
          alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  onClickContractDetail = dealDetail => {
    try {
      this.props.navigation.navigate('MyContractDetails', {data: dealDetail});
    } catch (error) {
      console.log(error);
    }
  };

  onClickDownload = async pdfURL => {
    if (pdfURL == '') {
      alert('PDF not available');
      this.setState({spinner: false});
      return;
    }

    if (Platform.OS === 'ios') {
      this.downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          this.setState({spinner: true});
          this.downloadFile(pdfURL);
          // console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  downloadFile = pdfURL => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = pdfURL;
    // Function to get extention of the file url
    let file_ext = this.getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        // console.log('res -> ', res.data);
        this.setState({spinner: false});
        const android = RNFetchBlob.android;
        android.actionViewIntent(res.data, 'application/pdf');
        console.log('File Downloaded Successfully.');
      });
  };

  getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  createMyContractUI = () => {
    try {
      let displayDate = '';
      let arrDealDetails = [];

      if (this.state.myContractListArray.length > 0) {
        return this.state.myContractListArray.map(
          (el, i) => (
            (arrDealDetails = []),
            //displayDate = el.deal_final_date.split(','),
            (displayDate = el.deal_date),
            (arrDealDetails = el.deal_details.filter(dl => dl.lab_report_status != "fail_with_renegotiation")),

            // (arrDealDetails = el.deal_details),
            (
              //console.log("Hello Bhavin Thakkar: " + arrDealDetails.length),

              <View>
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View
                    style={{
                      flex: 1,
                      marginLeft: '5%',
                      marginRight: '5%',
                      height: 40,
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: theme.colors.textColor,
                        fontSize: 14,
                        opacity: 0.5,
                        textAlignVertical: 'center',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {displayDate}
                    </Text>
                  </View>
                </View>

                {arrDealDetails.map((dd, j) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => { (dd.is_buyer_otp_verify == 1 && dd.is_seller_otp_verify == 1 && dd.is_broker_otp_verify == 1) && this.onClickContractDetail(dd)}}>
                      <View style={{flexDirection: 'row', width: '100%'}}>
                        <View
                          style={{
                            flex: 1,
                            marginLeft: '5%',
                            marginRight: '5%',
                            height: 40,
                          }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              flex: 1,
                              color: theme.colors.textColor,
                              fontSize: 16,
                              textAlignVertical: 'center',
                              fontFamily: 'Poppins-Medium',
                            }}>
                            {dd.product_name}
                          </Text>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row', width: '100%'}}>
                        <View
                          style={{
                            flex: 1,
                            marginLeft: '5%',
                            marginTop: 10,
                            marginRight: '5%',
                            height: 40,
                          }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              flex: 1,
                              color: theme.colors.textColor,
                              fontSize: 12,
                              opacity: 0.5,
                              textAlignVertical: 'center',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            Buyer
                          </Text>

                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              flex: 1,
                              color: theme.colors.textColor,
                              fontSize: 12,
                              textAlignVertical: 'center',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {dd.buyer_name}
                          </Text>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            marginLeft: '5%',
                            marginTop: 10,
                            marginRight: '5%',
                            height: 40,
                          }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              flex: 1,
                              color: theme.colors.textColor,
                              fontSize: 12,
                              fontFamily: 'Poppins-SemiBold',
                              textAlignVertical: 'center',
                            }}>
                            Price
                          </Text>

                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              flex: 1,
                              color: theme.colors.textColor,
                              fontSize: 12,

                              textAlignVertical: 'center',
                              fontFamily: 'Poppins-SemiBold',
                            }}>
                            ₹ {dd.sell_price}({dd.sell_bales})
                          </Text>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            width: '100%',
                            marginLeft: '1%',
                            marginTop: 10,
                            marginRight: '5%',
                            height: 35,
                          }}>
                          {/* <TouchableOpacity onPress={() => this.onClickDownload()}> */}
                        
                          {(dd.is_buyer_otp_verify == 1 && dd.is_seller_otp_verify == 1 && dd.is_broker_otp_verify == 1) ? (<TouchableOpacity onPress={() => this.onClickDownload(dd.url)}>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{
                                width: '100%',
                                height: '100%',
                                fontSize: 14,
                                textAlign: 'center',
                                alignItems: 'center',
                                color: 'white',
                                borderRadius: 5,
                                backgroundColor: '#69BA53',
                                textAlignVertical: 'center',
                              }}>
                              Download
                            </Text>
                          </TouchableOpacity>) : 
                          (<TouchableOpacity 
                            disabled={ dd.is_seller_otp_verify == 1 }
                          onPress={() => 
                              {
                                ( dd.is_seller_otp_verify == 0 ) && this.setState({ set: true, deal_Id: dd.deal_id })
                          }}>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{
                                width: '100%',
                                height: '100%',
                                fontSize: 14,
                                textAlign: 'center',
                                alignItems: 'center',
                                color: 'white',
                                borderRadius: 5,
                                backgroundColor: (dd.is_seller_otp_verify == 1) ? 'rgba(105, 186, 83, 0.5)' :  '#69BA53',
                                textAlignVertical: 'center',
                              }}>
                              Pending Verification
                            </Text>
                          </TouchableOpacity>)}
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '90%',
                        left: '5%',
                        height: 1,
                        marginTop: 10,
                        backgroundColor: '#D1D1D1',
                      }}></View>
                  </View>
                ))}
              </View>
            )
          ),
        );
      }
      return (
        <View
          style={{
            height: '90%',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}>
          <NoRecordsFound_Icon />
          <Text style={{fontSize: 14, fontFamily: 'Poppins-Regular'}}>
            Sorry, no records available
          </Text>
        </View>
      );
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (this.state.resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
        this.setState({
          resendButtonDisabledTime: RESEND_OTP_TIME_LIMIT
        })
      } else {
        this.setState({
          resendButtonDisabledTime: this.state.resendButtonDisabledTime - 1
        })
        // setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };
  onOtpChangeMail = index => {
    return value => {
      if (isNaN(Number(value))) {
        // do nothing when a non digit is pressed
        return;
      }
      const { otpArrayMail } = this.state;
      const otpArrayCopy = otpArrayMail.concat();
      otpArrayCopy[index] = value;
      this.setState({
        otpArrayMail: otpArrayCopy
      })
      // setOtpArray(otpArrayCopy);

      for (var i = 0; i < otpArrayCopy.length; i++) {
        if (otpArrayCopy[i] == '') {
          this.setState({
            submittingOtpMail: true
          })
        } else {
          this.setState({
            submittingOtpMail: false
          })
        }
      }
      console.log('this.', this.secondTextInputRefMail)
      if (value !== '') {
        if (index === 0) {
          this.secondTextInputRefMail.current.focus();
        } else if (index === 1) {
          this.thirdTextInputRefMail.current.focus();
        } else if (index === 2) {
          this.fourthTextInputRefMail.current.focus();
        } else if (index === 3) {
          this.fifthTextInputRefMail.current.focus();
        } else if (index === 4) {
          this.sixthTextInputRefMail.current.focus();
        }
      }

    };
  };

  onOtpKeyPressMail = index => {
    return ({ nativeEvent: { key: value } }) => {
      // auto focus to previous InputText if value is blank and existing value is also blank

      if (value === 'Backspace' && this.state.otpArrayMail[index] === '') {
        console.log(' this.firstTextInputRefMail', this.firstTextInputRefMail)
        if (index === 1) {
          this.firstTextInputRefMail.current.focus();
        } else if (index === 2) {
          this.secondTextInputRefMail.current.focus();
        } else if (index === 3) {
          this.thirdTextInputRefMail.current.focus();
        } else if (index === 4) {
          this.fourthTextInputRefMail.current.focus();
        } else if (index === 5) {
          this.fifthTextInputRefMail.current.focus();
        } else if (index === 6) {
          this.sixthTextInputRefMail.current.focus();
        }

        /**
         * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
         * doing this thing for us
         * todo check this behaviour on ios
         */

        if (isAndroid && index > 0) {
          const otpArrayCopy = this.state.otpArrayMail.concat();
          otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
          this.setState({
            otpArrayMail: otpArrayCopy
          })
          // setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  refCallbackMail = textInputRef => node => {
    // console.log
    // console.log('node', node)
    textInputRef.current = node;
  };
  
  onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        // do nothing when a non digit is pressed
        return;
      }
      const {otpArray} = this.state;
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      this.setState({
        otpArray: otpArrayCopy
      })
      // setOtpArray(otpArrayCopy);

      for (var i = 0; i < otpArrayCopy.length; i++) {
        if (otpArrayCopy[i] == '') {
          this.setState({
            submittingOtp:true})
        } else {
          this.setState({
            submittingOtp: false
          })
        }
      }

      // auto focus to next InputText if value is not blank

      console.log('this.',this.secondTextInputRef)
      if (value !== '') {
        if (index === 0) {
          this.secondTextInputRef.current.focus();
        } else if (index === 1) {
          this.thirdTextInputRef.current.focus();
        } else if (index === 2) {
          this.fourthTextInputRef.current.focus();
        } else if (index === 3) {
          this.fifthTextInputRef.current.focus();
        } else if (index === 4) {
          this.sixthTextInputRef.current.focus();
        }
      }

    };
  };

  onOtpKeyPress = index => {
    return ({ nativeEvent: { key: value } }) => {
      // auto focus to previous InputText if value is blank and existing value is also blank

      if (value === 'Backspace' && this.state.otpArray[index] === '') {

        if (index === 1) {
          this.firstTextInputRef.current.focus();
        } else if (index === 2) {
          this.secondTextInputRef.current.focus();
        } else if (index === 3) {
          this.thirdTextInputRef.current.focus();
        } else if (index === 4) {
          this.fourthTextInputRef.current.focus();
        } else if (index === 5) {
          this.fifthTextInputRef.current.focus();
        } else if (index === 6) {
          this.sixthTextInputRef.current.focus();
        }

        /**
         * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
         * doing this thing for us
         * todo check this behaviour on ios
         */

        if (isAndroid && index > 0) {
          const otpArrayCopy = this.state.otpArray.concat();
          otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
          this.setState({
            otpArray: otpArrayCopy
          })
          // setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  refCallback = textInputRef => node => {
    // console.log
    textInputRef.current = node;
  };

  onSubmitButtonPress = () => {
    // API call
    // todo
    var self = this;
    self.setState({
      spinner: true,
    });
    let otpString = '';
    let otpMailString = '';

    const { otpArray,otpArrayMail } = this.state

    for (var i = 0; i < otpArray.length; i++) {
      otpString += otpArray[i];
    }

    
    for (var i = 0; i < otpArrayMail.length; i++) {
      otpMailString += otpArrayMail[i];
    }
    console.log('todo: Submit OTP: ' + otpString);
    let data = { deal_id: this.state.deal_Id, user_type: 'seller',email_otp:otpMailString, mobile_otp: otpString }


    const formData = new FormData();
    formData.append('data', JSON.stringify(data));


    console.log('data',data)

    axios({
      url: api_config.BASE_URL + api_config.MAKE_DEAL_OTP_VERIFY,
      method: 'POST',
      data: formData,
      headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data', "cache-control": "no-cache", }
    })
      .then(function (response) {
        self.setState({
          spinner: false,
        });
        console.log("response :", response.data.status);
        if (response.data.status == 200) {
          self.getMyContracts();
          self.setState({ set: false })
          alert(response.data.message)

        } else {
          alert(response.data.message)
          // navigation.navigate('LoginScreen')
          // navigation.navigate('RegisterPlan')

        }
      })
      .catch(function (error) {
        console.log('error......>>', JSON.stringify(error), error)

        self.setState({
          spinner: false,
        });
        // alert(defaultMessages.en.serverNotRespondingMsg);
      })
  };
  onResendOtpButtonPress = () => {
    // clear last OTP
    if (this.firstTextInputRef) {
     this.setState({
       OtpArray: ['', '', '', '', '', ''],
         OtpArrayMail: ['', '', '', '', '', '']
     })
    

      this.firstTextInputRefMail.current.focus();
    }
    this.setState({
      resendButtonDisabledTime: RESEND_OTP_TIME_LIMIT
    })

    // setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    this.resendOTPApiCall();

    // resend OTP Api call
    // todo
    console.log('todo: Resend OTP');
  };

  resendOTPApiCall = () => {
    this.startResendOtpTimer();
    var self = this;

    self.setState({
      spinner: true,
    });
    let data = { deal_id: this.state.deal_Id, user_type:'seller' }

    const formData = new FormData();
    formData.append('data', JSON.stringify(data));

    axios({
      url: api_config.BASE_URL + api_config.RESEND_DEAL_OTP,
      method: 'POST',
      data: formData,
      headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data', }
    })
      .then(function (response) {
        self.setState({
          spinner: false,
        });
        console.log("response :", response.data.status);
        if (response.data.status == 200) {
          alert('sent you code on your mail and mobile number')
          //getOTPText();
        } else {
          alert(response.data.message)
        }
      })
      .catch(function (error) {
        console.log('error',JSON.stringify(error))
        self.setState({
          spinner: false,
        });
        alert(defaultMessages.en.serverNotRespondingMsg);
      })
  };


  _onRefresh = () => {
   this.setState({
     refreshing:true
   })
    this.getMyContracts()
    // getCallNews(1);

  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          paddingBottom: 30,
          marginTop: 10,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <Spinner visible={this.state.spinner} color="#085cab" />
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        ><Modal isVisible={this.state.set}
          onBackdropPress={() => this.setState({ set: false })}
        >
            <View style={{ backgroundColor: '#fff', justifyContent: 'center', borderRadius: heightPercentageToDP(1), paddingHorizontal: 20, paddingVertical: heightPercentageToDP(7) }}>
              <View style={{ justifyContent: 'center', marginLeft: widthPercentageToDP(10), alignItems: 'center', marginBottom: 30 }}>
                <VerifyOtpIcon></VerifyOtpIcon>
              </View>
              <CustomText>
                Write Down The Code Sent You by Registered Mail
              </CustomText>
              <View style={[GenericStyles.row, GenericStyles.mt12, GenericStyles.mb12]}>
                {[
                  this.firstTextInputRefMail,
                  this.secondTextInputRefMail,
                  this.thirdTextInputRefMail,
                  this.fourthTextInputRefMail,
                  this.fifthTextInputRefMail,
                  this.sixthTextInputRefMail
                ].map((textInputRef, index) => (
                  <CustomTextInput
                    containerStyle={[GenericStyles.fill], { margin: 5, flex: 1 }}
                    value={this.state.otpArrayMail[index]}
                    onKeyPress={this.onOtpKeyPressMail(index)}
                    onChangeText={this.onOtpChangeMail(index)}
                    keyboardType={'numeric'}
                    maxLength={1}
                    style={[styles.otpText, GenericStyles.centerAlignedText]}
                    autoFocus={index === 0 ? true : undefined}
                    refCallback={this.refCallbackMail(textInputRef)}
                    key={index}
                  />
                ))}
              </View>
              <CustomText>
                Write Down The Code Sent You by Mobile Number

              </CustomText>
              <View style={[GenericStyles.row, GenericStyles.mt12]}>
                {[
                  this.firstTextInputRef,
                  this.secondTextInputRef,
                  this.thirdTextInputRef,
                  this.fourthTextInputRef,
                  this.fifthTextInputRef,
                  this.sixthTextInputRef
                ].map((textInputRef, index) => (
                  <CustomTextInput
                    containerStyle={[GenericStyles.fill], { margin: 4, flex: 1 }}
                    value={this.state.otpArray[index]}
                    onKeyPress={this.onOtpKeyPress(index)}
                    onChangeText={this.onOtpChange(index)}
                    keyboardType={'numeric'}
                    maxLength={1}
                    style={[styles.otpText, GenericStyles.centerAlignedText]}
                    autoFocus={index === 0 ? true : undefined}
                    refCallback={this.refCallback(textInputRef)}
                    key={index}
                  />
                ))}
              </View>
              <FullButtonComponent
                type={'fill'}
                text={'Verify'}
                textStyle={styles.submitButtonText}
                buttonStyle={GenericStyles.mt24}
                onPress={this.onSubmitButtonPress}
                disabled={this.state.submittingOtp && this.state.submittingOtpMail}
              />
              {this.state.resendButtonDisabledTime < 30 ? (
                <TimerText text={'Resend OTP in'} time={this.state.resendButtonDisabledTime} />
              ) : (
                            <CustomButton
                                type={'link'}
                                text={'Resend'}
                                buttonStyle={styles.otpResendButton}
                                textStyle={styles.otpResendButtonText}
                                onPress={this.onResendOtpButtonPress}
                            />
              )}
             
            </View>

          </Modal>
          <View style={{marginTop: 20}}>{this.createMyContractUI()}</View>
        </ScrollView>
      </View>
    );
  }
}
