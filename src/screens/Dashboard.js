// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Image,
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   AppState,
//   TouchableWithoutFeedback,
//   Alert,
//   PermissionsAndroid, RefreshControl 
// } from 'react-native';
// import { baseUrl } from '../components/Global';
// import { fontSizeMyPostCenterText } from '../components/Global';
// import { vLineMyPostStyle } from '../components/Global';
// import { wfrInNegotiation } from '../components/Global';

// import Background from '../components/Background';
// import Header from '../components/Header';
// import { Card } from 'react-native-elements';
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import { Appbar, Searchbar, Button, Badge } from 'react-native-paper';
// import AsyncStorage from '@react-native-community/async-storage';
// import Spinner from 'react-native-loading-spinner-overlay';
// import Icon from 'react-native-vector-icons/Ionicons';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { theme } from '../core/theme';
// import TextInput from '../components/TextInput';
// import api_config from '../Api/api';
// import axios from 'axios';
// import Plus from '../assets/Plus';
// import Bell_Icon from '../assets/Bell';
// import History_Icon from '../assets/History';
// import Newsfeed_Icon from '../assets/NewsFeed';
// import MCX_Icon from '../assets/MCX';
// import Calculator_Icon from '../assets/Calculator';
// import ChangePassword_Icon from '../assets/ChangePassword';
// import Profile_Icon from '../assets/Profile';
// import Reports_Icon from '../assets/Reports';
// import TransactionTracking_Icon from '../assets/TransactionTracking';
// import { fieldValidator } from '../helpers/fieldValidator';
// import { priceValidator } from '../helpers/priceValidator';
// import MyPostGreen_Icon from '../assets/MyPostGreen';
// import defaultMessages from '../helpers/defaultMessages';
// import { Picker } from '@react-native-picker/picker';
// //svgs
// import Home from '../assets/Home';
// import NoRecordsFound_Icon from '../assets/NoRecodsFound';
// import SearchToSell_Icon from '../assets/SearchToSell';
// import PostToSell_Icon from '../assets/PostToSell';
// import MyPost_Icon from '../assets/MyPost';
// import MyContracts_Icon from '../assets/MyContracts';
// import Logout_Icon from '../assets/Logout';
// import NotificationToBuyer_Icon from '../assets/NotificationToBuyer';
// import Employee from '../assets/Employee';
// import EmployeeGray from '../assets/EmployeeGray';
// import CustomerIcon from '../assets/CustomerIcon';
// import FilterSettings from '../assets/FilterSettings';
// import Minus from '../assets/Minus';
// import MPIcon1 from '../assets/MPIcon1';
// import MPIcon2 from '../assets/MPIcon2';
// import PlusRound from '../assets/PlusRound';
// import MinusRound from '../assets/MinusRound';
// import SetPassword from '../assets/SetPassword';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import SelectDropdown from 'react-native-select-dropdown';
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import NewsFeedView from '../components/NewsFeedView';
// import Profile from '../components/Profile'
// import Wallet from '../components/Wallet';
// import CalculatorView from '../components/CalculatorView';
// import io from "socket.io-client";

// if (!window.location) {
//   // App is running in simulator
//   window.navigator.userAgent = 'ReactNative';
// }

// const socket = io.connect('http://cottontradecentre.com:6001', { transports: ['websocket'] }); //live

// import {
//   handleAndroidBackButton,
//   removeAndroidBackButtonHandler
// } from '../helpers/backHandler'
// import {
//   exitAlert
// } from '../helpers/customAlert';
// import RNFetchBlob from 'rn-fetch-blob';

// class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       appState: AppState.currentState,
//       loading: 'true',
//       refreshing: false,
//       isLoading: true,
//       userID: 0,
//       isNewsFeed: false,
//       isProfile: false,
//       ProfileData: [],
//       spinner: false,
//       jsonData: {},
//       dropdownPlaceholder: '',
//       balesCount: 100,
//       displayBalesCount: 100,
//       balesPrice: '',
//       productJsonData: {},
//       productAttributeList: {},
//       myActivePost: {},
//       arrNegotiationList: [],
//       arrNotificationList: {},
//       myContractListArray: {},
//       txtSpinningMillName: '',
//       attributeValue: [{}],
//       selectedProductID: 0,
//       selectedProductName: '',
//       inputData: [],
//       LengthinputData:[],
//       attributeArry: [],
//       balespriceFocus: false,
//       token: '',
//       balesPriceError: '',
//       isHomeVisible: true,
//       isCustomerVisible: true,
//       isAllBid: true,
//       isBided: false,
//       isDeal: false,
//       isMenuOpen: false,
//       openState: false,
//       deOpenState: false,
//       isMyPostActiveClicked: true,
//       isMyPostCompletedClicked: false,
//       value: null,
//       productItem: [],
//       deValue: null,
//       items: [
//         { label: 'Maharashtra', value: '1' },
//         { label: 'Rajasthan', value: '2' },
//         { label: 'Punjab', value: '3' },
//         { label: 'Karnatak', value: '4' },
//       ],
//       deList: [
//         { label: 'Domestic', value: 'Domestic' },
//         { label: 'Export', value: 'Export' }
//       ],
//       deName: 'Domestic',
//       buyForList: [
//         { label: 'Self', value: 'Self' },
//         { label: 'Other', value: 'Other' }
//       ],
//       isShowBuyForDrpDown: true,
//       isShowSpinningName: false,
//       buyForDropDownValue: 'Self',
//       arrProductAttributeValue: [
//         { label: 'Maharashtra', value: '1' },
//         { label: 'Rajasthan', value: '2' },
//         { label: 'Punjab', value: '3' },
//         { label: 'Karnatak', value: '4' },
//       ],
//       isPostToSell: false,
//       isSearchToSell: false,
//       isNotificationToBuyer: false,
//       isDashboard: true,
//       isCalculator: false,
//       isWallet:false,
//       isMyContracts: false,
//       titleOfScreen: 'Dashboard',
//       dealTabStyle1: {
//         flex: 1,
//         width: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#69BA53',
//         marginLeft: 0,
//         marginRight: 5,
//         marginTop: 10,
//         borderRadius: 5,
//       },
//       dealTabStyle2: {
//         flex: 1,
//         width: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F0F5F9',
//         marginLeft: 5,
//         marginRight: 0,
//         marginTop: 10,
//         borderRadius: 5,
//       },
//       dealTabTextBox1: {
//         height: 40,
//         width: '100%',
//         textAlign: 'center',
//         alignItems: 'center',
//         textAlignVertical: 'center',
//         color: 'white',
//         fontFamily: "Poppins-Regular"
//       },
//       dealTabTextBox2: {
//         height: 40,
//         width: '100%',
//         textAlign: 'center',
//         alignItems: 'center',
//         textAlignVertical: 'center',
//         color: theme.colors.textColor,
//         fontFamily: "Poppins-Regular"
//       },
//       btnActiveContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderBottomWidth: 2,
//         borderBottomColor: theme.colors.primary,
//       },
//       btnCompletedContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderBottomWidth: 1,
//         borderBottomColor: 'gray',
//         opacity: 0.5,
//       },
//       btnActiveTextColor: theme.colors.primary,
//       btnCompletedTextColor: 'gray',
//     };

//     this.setValue = this.setValue.bind(this);
//     this.setOpenState = this.setOpenState.bind(this);
//     this.setItemsState = this.setItemsState.bind(this);

//     this.setDEValue = this.setDEValue.bind(this);
//     this.setDEOpenState = this.setDEOpenState.bind(this);
//     this.setDEItemsState = this.setDEItemsState.bind(this);
//   }

//   _onRefresh = () => {
//     this.setState({ refreshing: true });
//    }

//   ProfileData = async (item) => {
//     console.log('item', item.user_id, item.api_token)
//     try {
//       var self = this;
//       let data = {
//         user_id: item.user_id,
//       };
//       // console.log("data>>>>>>>>>>>>>",data);
//       // console.log('Negotiation Request Param: ' + JSON.stringify(data));
//       const formData = new FormData();
//       formData.append('data', JSON.stringify(data));
//       // console.log('formdata',formData)

//       axios({
//         url: api_config.BASE_URL + api_config.PROFILE_SELLER,
//         method: 'POST',
//         data: formData,
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//           'Authorization': 'Bearer ' + item.api_token
//         },
//       })
//         .then(function (response) {
//           // console.log(
//           //   'my negotiation list response :>>>>>>>>>>>>>>>>>>><<<<<<',
//           //   response
//           // );
//           if (response.data.status == 200) {
//             self.setState({ ProfileData: response.data.data, spinner: false, });
//           } else {
//             console.log(response.data.message);
//           }
//         })
//         .catch(function (error) {
//           self.setState({
//             spinner: false,
//             message: 'Something bad happened ' + error,
//           }),
//             alert(defaultMessages.en.serverNotRespondingMsg);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   onClickCalculator = () => {
//     this.setState({
//       isMenuOpen: false,
//       isDashboard: false,
//       isPostToBuy: false,
//       isSearchToBuy: false,
//       isCalculator: true,
//       isWallet:false,
//       isNotificationToSeller: false,
//       isMyPost: false,
//       isMyContracts: false,
//       isProfile: false,
//       isNewsFeed: false,
//       titleOfScreen: 'Calculator',
//       balesPrice: '',
//       displayBalesCount: 100,
//     });
//     // handleAndroidBackButton(this.setDashboardFlag);
//   };
//   onClickWallet = () => {
//     this.setState({
//       isMenuOpen: false,
//       isDashboard: false,
//       isPostToBuy: false,
//       isSearchToBuy: false,
//       isCalculator: false,
//       isWallet: true,
//       isNotificationToSeller: false,
//       isMyPost: false,
//       isMyContracts: false,
//       isProfile: false,
//       isNewsFeed: false,
//       titleOfScreen: 'Wallet',
//       balesPrice: '',
//       displayBalesCount: 100,
//     });
//     // handleAndroidBackButton(this.setDashboardFlag);
//   };

//   onclickNewsFeed = () => {
//     this.setState({
//       isMenuOpen: false,
//       isDashboard: false,
//       isPostToSell: false,
//       isSearchToSell: false,
//       isCalculator: false,
//       isWallet: false,

//       isNotificationToBuyer: false,
//       isProfile: false,
//       isNewsFeed: true,
//       isMyPost: false,
//       isMyContracts: false,
//       titleOfScreen: 'News Feed',
//       displayBalesCount: 100,
//       balesPrice: '',
//       inputData: [],
//       LengthinputData: [],
//     });
//     // handleAndroidBackButton(this.setDashboardFlag);
//   }

//   onClickProfile = async () => {
//     let data = await EncryptedStorage.getItem('user_data');
//     this.ProfileData(JSON.parse(data));


   
//     this.setState({
//       isMenuOpen: false,
//       isDashboard: false,
//       isPostToSell: false,
//       isSearchToSell: false,
//       isNotificationToBuyer: false,
//       isProfile: true,
//       isNewsFeed: false,
//       isMyPost: false,
//       isWallet:false,
//       isCalculator: false,
//       isMyContracts: false,
//       titleOfScreen: 'Profile',
//       displayBalesCount: 100,
//       balesPrice: '',
//       LengthinputData: [],
//       inputData: [],
//     });
//     // handleAndroidBackButton(this.setDashboardFlag);
//   }

//   async componentDidMount() {
//     let data = await EncryptedStorage.getItem('user_data');
//     // console.log('data', data)

//     socket.on('connect', () => console.log('connected socket'))
//     socket.on('error', console.log('error'))
//     socket.on('connect_error', console.log('error>>>>>>>'))

//     this.setState({
//       spinner: !this.state.spinner,
//       isDashboard: true
//     });
//     this.ProfileData(JSON.parse(data));
//     this.getNegotiationListData();
//     this.getNotificationListData();
//     this.getProductListAPI();
//     this.getMyActivePost();
//     // handleAndroidBackButton(exitAlert);
//   }

//   componentWillUnmount() {
//     removeAndroidBackButtonHandler();
//   }

//   getNegotiationListData = async () => {
//     try {
//       var self = this;
//       self.setState({
//         seller_id: await EncryptedStorage.getItem('user_id'),
//       })
//       let data = { seller_id: await EncryptedStorage.getItem('user_id'),offset:'0',
//       limit: '50'};
//       // console.log("Negotiation request: " + JSON.stringify(data))
//       const formData = new FormData();
//       formData.append('data', JSON.stringify(data));

//       axios({
//         url: api_config.BASE_URL + api_config.NEGOTIATION_LIST,
//         method: 'POST',
//         data: formData,
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//         .then(function (response) {
//           // console.log('my negotiation list response :', JSON.stringify(response.data.data));
//           self.setState({
//             arrNegotiationList: [],
//             spinner: false
//           })
//           if (response.data.status == 200) {

//             self.setState({ arrNegotiationList: response.data.data });
//           } else {
//             console.log(response.data.message);
//           }
//         })
//         .catch(function (error) {
//           self.setState({
//             spinner: false,
//             message: 'Something bad happened ' + error,
//           }),
//             alert(defaultMessages.en.serverNotRespondingMsg);
//         });
//     } catch (error) {
//       console.log(error)
//     }
//   };

//   getNotificationListData = async () => {
//     try {
//       var self = this;
//       self.setState({
//         userID: await EncryptedStorage.getItem('user_id')
//       })
//       let data = { seller_id: await EncryptedStorage.getItem('user_id') };

//       const formData = new FormData();
//       formData.append('data', JSON.stringify(data));

//       axios({
//         url: api_config.BASE_URL + api_config.NOTIFICATION_LIST,
//         method: 'POST',
//         data: formData,
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//         .then(function (response) {
//           // console.log('my notification list response :', JSON.stringify(response));
//           self.setState({
//             arrNotificationList: {},
//             spinner: false
//           })
//           if (response.data.status == 200) {

//             self.setState({ arrNotificationList: response.data.data });
//           } else {
//             console.log(response.data.message);
//           }
//         })
//         .catch(function (error) {
//           self.setState({
//             spinner: false,
//             message: 'Something bad happened ' + error,
//           }),
//           alert(defaultMessages.en.serverNotRespondingMsg);
//         });
//     } catch (error) {
//       console.log(error)
//     }
//   };

//   getMyActivePost = async () => {
//     try {
//       var self = this;
//       let data = { seller_id: await EncryptedStorage.getItem('user_id') };

//       const formData = new FormData();
//       formData.append('data', JSON.stringify(data));

//       axios({
//         url: api_config.BASE_URL + api_config.MY_ACTIVE_POST,
//         method: 'POST',
//         data: formData,
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//         .then(function (response) {
//           // console.log('my active post list response :', response.data.data);
//           self.setState({
//             myActivePost: [],
//             spinner: false
//           })
//           if (response.data.status == 200) {
//             self.setState({ myActivePost: response.data.data });
//           } else {
//             console.log(response.data.message);
//           }
//         })
//         .catch(function (error) {
//           self.setState({
//             spinner: false,
//             message: 'Something bad happened ' + error,
//           }),
//           alert(defaultMessages.en.serverNotRespondingMsg);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   getMyCompletedPost = async () => {
//     try {
//       var self = this;
//       let data = {
//         seller_id: await EncryptedStorage.getItem('user_id'),
//         user_type: 'seller',
//         type: 'post'
//       };

//       const formData = new FormData();
//       formData.append('data', JSON.stringify(data));
//       // console.log("Completed post request: " + JSON.stringify(data))
//       axios({
//         url: api_config.BASE_URL + api_config.COMPLETED_DEALS,
//         method: 'POST',
//         data: formData,
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//         .then(function (response) {
//           // console.log('my completed post list response :', response.data.data);
//           self.setState({ myActivePost: [], spinner: false });
//           if (response.data.status == 200) {

//             self.setState({ myActivePost: response.data.data });

//           } else {
//             alert(response.data.message);
//           }
//         })
//         .catch(function (error) {
//           self.setState({
//             spinner: false,
//             message: 'Something bad happened ' + error,
//           }),
//           alert(defaultMessages.en.serverNotRespondingMsg);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   getProductListAPI = () => {
//     try {
//       var self = this;
//       axios({
//         url: api_config.BASE_URL + api_config.PRODUCT_LIST,
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//         .then(function (response) {
//           console.log('response :', response.data);
//           if (response.data.status == 200) {
//             let productList = response.data.data;
//             let firstProductID = '';
//             var arrProductList = [];
//             self.setState({
//               items: [],
//             });
//             for (let i = 0; i < productList.length; i++) {
//               if (i == 0) {
//                 self.setState({ dropdownPlaceholder: productList[i].name });
//                 firstProductID = productList[i].id;
//               }
//               arrProductList.push({
//                 label: productList[i].name,
//                 value: productList[i].id,
//               });
//             }
//             self.setState({ productItem: arrProductList });
//             self.getProductAttributeAPI(firstProductID);
//           } else {
//             alert(response.data.message);
//           }
//         })
//         .catch(function (error) {
//           self.setState({
//             spinner: false,
//             message: 'Something bad happened ' + error,
//           }),
//           alert(defaultMessages.en.serverNotRespondingMsg);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   getProductAttributeAPI = productID => {
//     try {
//       this.setState({ selectedProductID: productID });
//       // console.log('Bhavin: ' + productID);
//       var self = this;
//       let data = { product_id: productID };

//       const formData = new FormData();
//       formData.append('data', JSON.stringify(data));

//       axios({
//         url: api_config.BASE_URL + api_config.PRODUCT_ATTRIBUTE_LIST,
//         method: 'POST',
//         data: formData,
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//         .then(function (response) {
//           // console.log('response PRODUCT_ATTRIBUTE_LIST:', response.data);
//           if (response.data.status == 200) {
//             self.setState({
//               productAttributeList: response.data.data,
//               spinner: false,
//             });
//           } else {
//             alert(response.data.message);
//           }
//         })
//         .catch(function (error) {
//           self.setState({
//             spinner: false,
//             message: 'Something bad happened ' + error,
//           }),
//           alert(defaultMessages.en.serverNotRespondingMsg);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   onclickMenu = () => {
//     this.setState({
//       isMenuOpen: true,
//     });
//   };

//   onClickVerifyOtp = () => { };

//   onClickHome = () => {
//     this.setState({
//       isMenuOpen: false,
//       isDashboard: true,
//       isPostToSell: false,
//       isSearchToSell: false,
//       isNotificationToBuyer: false,
//       isMyPost: false,
//       isProfile: false,
//       isWallet:false,
//       isCalculator: false,
//       isNewsFeed: false,
//       isMyContracts: false,
//       titleOfScreen: 'Dashboard',
//       attributeArry: [],
//       LengthinputData: [],
//       inputData: [],
//       txtSpinningMillName: '',
//       displayBalesCount: 100,
//       spinner: true
//     });
//     this.getNegotiationListData();
//     this.getNotificationListData();
//     this.getProductListAPI();
//     this.getMyActivePost();
//   };

//   onClickHomeClose = () => {
//     this.setState({
//       isMenuOpen: false,
//     });
//   };

//   onClickChangePassword = () => {
//     this.setState({
//       isMenuOpen: false,
//     });
//     this.props.navigation.navigate('ChangePasswordScreen');
//   };

//   logout = async () => {
//     try {
//       var self = this;

//       self.setState({
//         spinner: true,
//       });

//       let data = {
//         user_id: await EncryptedStorage.getItem('user_id'),
//       };

//       const formData = new FormData();
//       formData.append('data', JSON.stringify(data));

//       axios({
//         url: api_config.BASE_URL + api_config.LOGOUT_SELLER,
//         method: 'POST',
//         data: formData,
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//         .then(function (response) {
//           self.setState({
//             spinner: false,
//           });
//           if (response.data.status == 200) {
//             self.logoutSuccess();
//           }
//         })
//         .catch(function (error) {
//           self.setState({
//             spinner: false,
//             message: 'Something bad happened ' + error,
//           }),
//             alert('Something went wrong');
//         });
//     } catch (error) {
//       console.log('Error: ' + error);
//     }
//   };

//   logoutSuccess = async () => {
//     await EncryptedStorage.setItem('isLogout', JSON.stringify(true));
//     await EncryptedStorage.setItem('user_id',null)
//     this.props.navigation.reset({
//       index: 0,
//       routes: [{name: 'LoginScreen'}],
//     });
//   };

//   onClickLogout = async () => {
//     Alert.alert(
//       'E-Cotton',
//       defaultMessages.en.confirmationDialog.replace('{1}', 'logout'),
//       [
//         {
//           text: 'Cancel',
//           onPress: () => console.log('Cancel Pressed'),
//           style: 'cancel',
//         },
//         {text: 'OK', onPress: () => this.logout()},
//       ],
//     );
//   };

//   setOpenState(openState) {
//     this.setState({
//       openState,
//     });
//   }

//   setDEOpenState(deOpenState) {
//     this.setState({
//       deOpenState,
//     });
//   }

//   setValue(callback) {
//     this.setState(state => ({
//       value: callback(state.value),
//     }));
//   }

//   setDEValue(callback) {
//     this.setState(state => ({
//       deValue: callback(state.deValue),
//     }));
//   }

//   setItemsState(callback) {
//     this.setState(state => ({
//       items: callback(state.items),
//     }));
//   }

//   setDEItemsState(callback) {
//     this.setState(state => ({
//       deList: callback(state.deList),
//     }));
//   }
//   setBuyForItemsState(callback) {
//     this.setState(state => ({
//       buyForList: callback(state.deList),
//     }));
//   }

//   setProductAttrValueState(callback) {
//     this.setState(state => ({
//       arrProductAttributeValue: callback(state.items),
//     }));
//   }

//   onPostPressed = () => {
//     this.setState({
//       isAllBid: false,
//       isBided: false,
//       isDeal: true,
//     });
//   };

//   onClickActive = () => {
//     this.setState({
//       isMyPostActiveClicked: true,
//       isMyPostCompletedClicked: false,
//       myActivePost: [],
//       spinner: true,
//       btnActiveContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderBottomWidth: 2,
//         borderBottomColor: theme.colors.primary,
//       },
//       btnCompletedContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderBottomWidth: 1,
//         borderBottomColor: 'gray',
//         opacity: 0.5,
//       },
//       btnActiveTextColor: theme.colors.primary,
//       btnCompletedTextColor: 'gray',
//     });

//     this.getMyActivePost();
//   };

//   onClickCompleted = () => {
//     this.setState({
//       isMyPostActiveClicked: false,
//       isMyPostCompletedClicked: true,
//       spinner: true,
//       myActivePost: [],
//       btnActiveContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderBottomWidth: 1,
//         borderBottomColor: 'gray',
//         opacity: 0.5,
//       },
//       btnCompletedContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderBottomWidth: 2,
//         borderBottomColor: theme.colors.primary,
//       },
//       btnActiveTextColor: 'gray',
//       btnCompletedTextColor: theme.colors.primary,
//     });
//     this.getMyCompletedPost();
//   };

//   onClickPostToBuy = () => {
//     this.setState({
//       isMenuOpen: false,
//       isDashboard: false,
//       isPostToSell: true,
//       isWallet:false,
//       isCalculator: false,
// isProfile:false,
// isNewsFeed:false,
//       isSearchToSell: false,
//       isNotificationToBuyer: false,
//       isMyPost: false,
//       isMyContracts: false,
//       titleOfScreen: 'Post to sell',
//       attributeArry: [],
//       LengthinputData: [],
//       inputData: [],
//       balesPrice: '',
//       displayBalesCount: 100,
//     });

//     //this.setDEFlages({"label": "Domestic", "value": "Export"})

//     this.state.productItem.map((el, i) => {
//       if (i == 0) {
//         return (
//           this.setState({ dropdownPlaceholder: el.label }),
//           this.getProductAttributeAPI(el.value)
//         );
//       }
//     });

//   };

//   setProductState = (productName, productID) => {
//     //alert(productName+":"+productID);
//     //this.setState({key: value}, callback)
//     this.setState(
//       { dropdownPlaceholder: productName, selectedProductID: productID, selectedProductName: productName },
//       this.success(),
//     );
//     //this.getProductAttributeAPI(el.value);
//   };

//   success = () => {
//     //alert("Done: " + this.state.dropdownPlaceholder)
//   };

//   onClickSearchToBuy = () => {
//     this.setState({
//       isMenuOpen: false,
//       isDashboard: false,
//       isProfile: false,
//       isWallet:false,
//       isCalculator: false,
//       isNewsFeed: false,
//       isPostToSell: false,
//       isSearchToSell: true,
//       isNotificationToBuyer: false,
//       isMyPost: false,
//       isMyContracts: false,
//       titleOfScreen: 'Search Buyer',
//       displayBalesCount: 100,
//       LengthinputData: [],
//       inputData: [],
//       balesPrice: '',
//     });
//     // handleAndroidBackButton(this.setDashboardFlag);
//   };

//   onClickNotificationToSeller = () => {
//     this.setState({
//       isMenuOpen: false,
//       isDashboard: false,
//       isPostToSell: false,
//       isProfile: false,
//       isWallet:false,
//       isCalculator: false,

//       isNewsFeed: false,
//       isSearchToSell: false,
//       isNotificationToBuyer: true,
//       isMyPost: false,
//       isMyContracts: false,
//       titleOfScreen: 'Notification to Buyer',
//       displayBalesCount: 100,
//       balesPrice: '',
//       LengthinputData: [],
//       inputData: [],
//     });
//     // handleAndroidBackButton(this.setDashboardFlag);
//   };

//   onClickMyPost = () => {
//     this.setState({
//       isMyPostActiveClicked: true,
//       isMyPostCompletedClicked: false,
//       isMenuOpen: false,
//       isWallet:false,
//       isCalculator: false,
//       isDashboard: false,
//       isPostToSell: false,
//       isSearchToSell: false,
//       isProfile: false,
//       isNewsFeed: false,
//       isNotificationToBuyer: false,
//       isMyPost: true,
//       isMyContracts: false,
//       titleOfScreen: 'My Post',
//       attributeArry: [],
//       LengthinputData: [],
//       inputData: [],
//       myActivePost: [],
//       spinner: true,
//       btnActiveContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderBottomWidth: 2,
//         borderBottomColor: theme.colors.primary,
//       },
//       btnCompletedContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderBottomWidth: 1,
//         borderBottomColor: 'gray',
//         opacity: 0.5,
//       },
//       btnActiveTextColor: theme.colors.primary,
//       btnCompletedTextColor: 'gray'
//     });
//     // handleAndroidBackButton(this.setDashboardFlag);
//     this.getMyActivePost()
//   };

//   setDashboardFlag = () => {
//     this.setState({
//       isMenuOpen: false,
//       isDashboard: true,
//       isWallet:false,
//       isCalculator: false,
//       isPostToBuy: false,
//       isSearchToBuy: false,
//       isProfile: false,
//       isNewsFeed: false,
//       isNotificationToSeller: false,
//       isMyPost: false,
//       isMyContracts: false,
//       titleOfScreen: 'Dashboard',
//     });
//     // handleAndroidBackButton(exitAlert);
//   }

//   onClickMyContracts = () => {
//     this.setState({
//       isMenuOpen: false,
//       isDashboard: false,
//       isPostToSell: false,
//       isSearchToSell: false,
//       isWallet:false,
//       isCalculator: false,
//       isProfile: false,
//       isNewsFeed: false,
//       isNotificationToBuyer: false,
//       isMyPost: false,
//       isMyContracts: true,
//       titleOfScreen: 'My Contract',
//       myContractListArray: {}
//     });
//     // handleAndroidBackButton(this.setDashboardFlag);
//     this.getMyContracts()
//   };

//   getMyContracts = async () => {
//     try {
//       var self = this;
//       self.setState({
//         spinner: true,
//       });

//       let data = {
//         seller_buyer_id: await EncryptedStorage.getItem('user_id'),
//         user_type: 'seller'
//       };

//       // console.log('My Contract Request---' + JSON.stringify(data));

//       const formData = new FormData();
//       formData.append('data', JSON.stringify(data));

//       axios({
//         url: api_config.BASE_URL + api_config.MY_CONTRACT,
//         method: 'POST',
//         data: formData,
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//         .then(function (response) {
//           // console.log('search to sell response :' + JSON.stringify(response));

//           if (response.data.status == 200) {
//             //REDIRECT TO SEARCH SCREEN
//             self.setState({
//               spinner: false,
//             });
//             if (response.data.data.length > 0) {
//               self.setState({ myContractListArray: response.data.data });
//             }
//           } else if (response.data.status == 404) {
//             self.setState({
//               spinner: false,
//             });
//           } else {
//             self.setState({
//               spinner: false,
//             });
//             alert(response.message);
//           }
//         })
//         .catch(function (error) {
//           self.setState({
//             spinner: false,
//           });
//           alert(defaultMessages.en.serverNotRespondingMsg);
//         });
//     } catch (error) {
//       console.log("Error: " + error)
//     }
//   }

//   onClickContractDetail = (dealDetail) => {
//     try {
//       this.props.navigation.navigate('MyContractDetails', { data: dealDetail });
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   onClickDownload = async (pdfURL) => {
//     if(pdfURL == "") {
//       alert("PDF not available")
//       this.setState({spinner:false})
//       return
//     }
    
//     if (Platform.OS === 'ios') {
//       this.downloadFile();
//     } else {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: 'Storage Permission Required',
//             message:
//               'Application needs access to your storage to download File',
//           }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           // Start downloading
//           this.setState({spinner: true})
//           this.downloadFile(pdfURL);
//           // console.log('Storage Permission Granted.');
//         } else {
//           // If permission denied then show alert
//           Alert.alert('Error','Storage Permission Not Granted');
//         }
//       } catch (err) {
//         // To handle permission related exception
//         console.log("++++"+err);
//       }
//     }
//   };

//   downloadFile = (pdfURL) => {
//     // Get today's date to add the time suffix in filename
//     let date = new Date();
//     // File URL which we want to download
//     let FILE_URL = pdfURL;    
//     // Function to get extention of the file url
//     let file_ext = this.getFileExtention(FILE_URL);
   
//     file_ext = '.' + file_ext[0];
   
//     // config: To get response by passing the downloading related options
//     // fs: Root directory path to download
//     const { config, fs } = RNFetchBlob;
//     let RootDir = fs.dirs.DownloadDir;
//     let options = {
//       fileCache: true,
//       addAndroidDownloads: {
//         path:
//           RootDir+
//           '/file_' + 
//           Math.floor(date.getTime() + date.getSeconds() / 2) +
//           file_ext,
//         description: 'downloading file...',
//         notification: true,
//         // useDownloadManager works with Android only
//         useDownloadManager: true,   
//       },
//     };
//     config(options)
//       .fetch('GET', FILE_URL)
//       .then(res => {
//         // Alert after successful downloading
//         // console.log('res -> ', res.data);
//         this.setState({spinner: false})
//         const android = RNFetchBlob.android;
//         android.actionViewIntent(res.data, 'application/pdf');
//         console.log('File Downloaded Successfully.');
//       });
//   }

//   getFileExtention = fileUrl => {
//     // To get the file extension
//     return /[.]/.exec(fileUrl) ?
//              /[^.]+$/.exec(fileUrl) : undefined;
//   };

//   onClickRespond = (el) => {
//     let data = {};
//     if(el.negotiation_type == 'post') {
//       data = {
//         cameFrom: 'Negotiation',
//         post_id: el.post_detail[0].post_notification_id,
//         buyerId: el.post_detail[0].buyer_id,
//         current_price: el.post_detail[0].current_price,
//         current_no_of_bales: el.post_detail[0].current_no_of_bales,
//         payment_condition: el.post_detail[0].payment_condition,
//         transmit_condition: el.post_detail[0].transmit_condition,
//         lab: el.post_detail[0].lab,
//         type: el.negotiation_type
//       };
//     } else {
//       data = {
//         cameFrom: 'Negotiation',
//         post_id: el.notification_detail[0].post_notification_id,
//         buyerId: el.notification_detail[0].buyer_id,
//         current_price: el.notification_detail[0].current_price,
//         current_no_of_bales: el.notification_detail[0].current_no_of_bales,
//         payment_condition: el.notification_detail[0].payment_condition,
//         transmit_condition: el.notification_detail[0].transmit_condition,
//         lab: el.notification_detail[0].lab,
//         type: el.negotiation_type
//       };
//     }
//     this.props.navigation.navigate('DealDetails', {
//       data: data,
//       cameFrom: 'Negotiation',
//       type: el.negotiation_type,
//       prevScrName: 'Dashboard',
//     });
//   };
//   onClickNotificationView = (el) => {
//     let data = { cameFrom: 'Notification', post_id: el.notification_id, type: 'notification', buyerId: el.seller_buyer_id, current_price: el.price, current_no_of_bales: el.no_of_bales, payment_condition: '', transmit_condition: '', lab: '' }
//     this.props.navigation.navigate('DealDetails', { data: data, type: 'notification', prevScrName: 'Dashboard',cameFrom: 'notification' });
//   };

//   onClickWaitingForResponse = (el) => {
//     //this.props.navigation.navigate('NegotiateDetails',{data:el,type:el.negotiation_type,post_id:el.post_notification_id,buyerId:el.buyer_id});
//     this.props.navigation.navigate('NegotiateDetails', { data: el, type: el.negotiation_type, post_id: el.post_notification_id, sellerId: el.seller_id, prevScrName: 'Dashboard',cameFrom: 'Dashboard' });
//   };

//   onClickMinusPTB = () => {
//     try {
//       if (this.state.displayBalesCount - this.state.balesCount != 0) {
//         if (this.state.displayBalesCount > 0) {
//           this.state.displayBalesCount =
//             this.state.displayBalesCount - this.state.balesCount;
//           this.setState({ displayBalesCount: this.state.displayBalesCount });
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   onClickPlusPTB = () => {
//     try {
//       this.state.displayBalesCount =
//         this.state.displayBalesCount + this.state.balesCount;
//       this.setState({ displayBalesCount: this.state.displayBalesCount });
//     } catch (error) {
//       console.log(error);
//     }

//   }

//   setDEFlages = (selectedItem) => {
//     this.setState({ deName: selectedItem.label })

//     if (selectedItem.label == "Domestic") {
//       this.setState({ isShowBuyForDrpDown: true })
//     } else {
//       this.setState({ isShowBuyForDrpDown: false })
//       this.setState({ isShowSpinningName: false })
//     }
//   }

//   setSpinningnameFlages = (selectedItem) => {
//     this.setState({ buyForDropDownValue: selectedItem.label })

//     if (selectedItem.label == "Other") {
//       this.setState({ isShowSpinningName: true })
//     } else {
//       this.setState({ isShowSpinningName: false })
//     }
//   }

//   onClickNotification = () => {
//     this.setState({
//       dealTabStyle2: {
//         flex: 1,
//         width: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#69BA53',
//         marginLeft: 5,
//         marginRight: 0,
//         marginTop: 10,
//         borderRadius: 5,
//       },
//       dealTabStyle1: {
//         flex: 1,
//         width: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F0F5F9',
//         marginLeft: 0,
//         marginRight: 5,
//         marginTop: 10,
//         borderRadius: 5,
//       },
//       dealTabTextBox2: {
//         height: 40,
//         width: '100%',
//         textAlign: 'center',
//         alignItems: 'center',
//         textAlignVertical: 'center',
//         color: 'white',
//         fontFamily: "Poppins-Regular"
//       },
//       dealTabTextBox1: {
//         height: 40,
//         width: '100%',
//         textAlign: 'center',
//         alignItems: 'center',
//         textAlignVertical: 'center',
//         color: theme.colors.textColor,
//         fontFamily: "Poppins-Regular"
//       },
//     });
//     this.setState({ spinner: true })
//     this.getNotificationListData()
//   };

//   onClickNegotiation = () => {
//     this.setState({
//       spinner: true,
//       dealTabStyle1: {
//         flex: 1,
//         width: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#69BA53',
//         marginLeft: 0,
//         marginRight: 5,
//         marginTop: 10,
//         borderRadius: 5,
//       },
//       dealTabStyle2: {
//         flex: 1,
//         width: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F0F5F9',
//         marginLeft: 5,
//         marginRight: 0,
//         marginTop: 10,
//         borderRadius: 5,
//       },
//       dealTabTextBox1: {
//         height: 40,
//         width: '100%',
//         textAlign: 'center',
//         alignItems: 'center',
//         textAlignVertical: 'center',
//         color: 'white',
//         fontFamily: "Poppins-Regular"
//       },
//       dealTabTextBox2: {
//         height: 40,
//         width: '100%',
//         textAlign: 'center',
//         alignItems: 'center',
//         textAlignVertical: 'center',
//         color: theme.colors.textColor,
//         fontFamily: "Poppins-Regular"
//       },
//     });

//     this.getNegotiationListData();
//   };

//   onClickSelectSeller = async () => {
//     //this.props.navigation.navigate('NotificationSelectSeller');
//     /*
//     {"seller_buyer_id":"2",
//     "product_id":"1",
//     "price":"50000",
//     "no_of_bales":"50",
//     "d_e":"export",
//     "buy_for":"other",
//     "spinning_meal_name":"test",
//     "country_id":"1",
//     "state_id":"1",
//     "city_id":"1",
//     "station_id":"1",
//     "sellers":[{"id":"1","type":"default"}],
//     "attribute_array":[{"attribute":"uhml","attribute_value":"28.3"},
//     {"attribute":"rd","attribute_value":"21.3"}]}
//     */
//     try {
//       if (this.checkValidation()) {
//         let data = {
//           type: 'notification',
//           seller_buyer_id: await EncryptedStorage.getItem('user_id'),
//           product_id: this.state.selectedProductID,
//           price: this.state.balesPrice,
//           no_of_bales: this.state.displayBalesCount,
//           attribute_array: this.getProductAttributeArray(),
//           d_e: this.state.deName,
//           buy_for: this.state.buyForDropDownValue,
//           spinning_meal_name: this.state.txtSpinningMillName
//         };

//         await EncryptedStorage.setItem("notification_product_detail", JSON.stringify(data));
//         this.props.navigation.navigate('NotificationSelectSeller', { dataObj: data });

//       }
//     } catch (error) {
//       console.log(error)
//     }

//   }

//   addValues = (text, label, itemId, index) => {
//     let dataArray = this.state.inputData;
//     let checkBool = false;
//     if (dataArray.length !== 0) {
//       dataArray.forEach(element => {
//         if (element.index === index) {
//           element.attribute_value = text;
//           checkBool = true;
//         }
//       });
//     }
//     if (checkBool) {
//       this.setState({
//         inputData: dataArray,
//       });
//     } else {
//       dataArray.push({
//         attribute: label,
//         attribute_value: text,
//         index: index,
//         itemId: itemId,
//       });
//       this.setState({
//         inputData: dataArray,
//       });
//     }
//     console.log('Add Values: ' + JSON.stringify(this.state.inputData));
//   };
//   Fromselectmarg = (item, from) => {
//     console.log('item', item, from)
//     if (item < from) {
//       alert('please select smallert value than to value or change the to value')
//       this.fromselectRef.openDropdown()
//     }
//     else if (item == from) {
//       alert('please select deiffrent')
//       this.fromselectRef.openDropdown()
//     }
//     else { }

//     // (item > from) ? null :  this.fromselectRef.openDropdown();
//   }

//   selectmarg = (item, selected) => {
//     console.log('item', item, selected)

//     if (item > selected)
//       alert('please select bigger value than from value or change the from value')
//     else
//       alert('please select deiffrent')

//     this.selectRef.openDropdown();
//   }
//   addValuesSearchBuyer = (text, label, itemId, index, rangeType) => {
//     if (label === 'Length(mm)') {
//       let dataArray = this.state.LengthinputData;
//       let checkBool = false;
//       if (dataArray.length !== 0) {
//         dataArray.forEach(element => {

//           if (element.index === index) {
//             if (rangeType == 'from') {
//               element.from = text;
//               checkBool = true;
//             } else if (element.hasOwnProperty('from')) {
//               console.log('element.from>>>>', element.from)

//               if (parseFloat(element.from) >= parseFloat(text) || parseFloat(element.from) === parseFloat(text)) {
//                 alert("Invalid selection")
//                 element.to = 0;
//                 return
//               } else {
//                 element.to = text;
//                 checkBool = true;
//               }
//             } else {
//               alert("please select first from")

//             }
//           }
//         });
//       }
//       if (checkBool) {
//         this.setState({
//           LengthinputData: dataArray,
//         });
//       } else {

//         if (rangeType == 'from') {
//           dataArray.push({
//             attribute: label,
//             attribute_value: text,
//             index: index,
//             itemId: itemId,
//             from: text,
//             to: 0
//           });
//         }
//         else {
//           alert('please select starting value first')
//         }
//         this.setState({
//           LengthinputData: dataArray,
//         });
//       }
//     } else {
//     let dataArray = this.state.inputData;
//     let checkBool = false;
//     if (dataArray.length !== 0) {
//       dataArray.forEach(element => {
//         if (element.index === index) {
//           if(rangeType == 'from') {
//             element.from = text;
//             checkBool = true;
//           } else {
//             if(parseFloat(element.from) >= parseFloat(text)){
//               alert("Invalid selection")
//               element.to = 0;
//             } else {
//               element.to = text;
//               checkBool = true;
//             }
//           }
//         }
//       });
//     }
//     if (checkBool) {
//       this.setState({
//         inputData: dataArray,
//       });
//     } else {

//       if(rangeType == 'from') {
//         dataArray.push({
//           attribute: label,
//           attribute_value: text,
//           index: index,
//           itemId: itemId,
//           from: text,
//           to: 0
//         });
//       }
//       this.setState({
//         inputData: dataArray,
//       });
//     }
//     console.log('Add Values: ' + JSON.stringify(this.state.inputData));
//   }
//   };

//   createMyContractUI = () => {
//     try {
//       let displayDate = ""
//       let arrDealDetails = [];

//       if (this.state.myContractListArray.length > 0) {
//         return this.state.myContractListArray.map((el, i) => (
//           arrDealDetails = [],
//           //displayDate = el.deal_final_date.split(','),
//           displayDate = el.deal_date,
//           arrDealDetails = el.deal_details,
//           //console.log("Hello Bhavin Thakkar: " + arrDealDetails.length),

//           <View><View style={{ flexDirection: 'row', width: '100%' }}>
//             <View
//               style={{
//                 flex: 1,
//                 marginLeft: '5%',
//                 marginRight: '5%',
//                 height: 40,
//               }}>
//               <Text
//                 numberOfLines={1}
//                 ellipsizeMode="tail"
//                 style={{
//                   flex: 1,
//                   color: theme.colors.textColor,
//                   fontSize: 14,
//                   opacity: 0.5,
//                   textAlignVertical: 'center',
//                   fontFamily:'Poppins-Regular'
//                 }}>
//                 {displayDate}
//               </Text>
//             </View>
//           </View>

//             {arrDealDetails.map((dd, j) => (
//               <View>
//                 <TouchableOpacity onPress={() => this.onClickContractDetail(dd)}>
//                   <View style={{ flexDirection: 'row', width: '100%' }}>
//                     <View
//                       style={{
//                         flex: 1,
//                         marginLeft: '5%',
//                         marginRight: '5%',
//                         height: 40,
//                       }}>
//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           flex: 1,
//                           color: theme.colors.textColor,
//                           fontSize: 16,
//                           textAlignVertical: 'center',
//                           fontFamily:'Poppins-Medium'
//                         }}>
//                         {dd.product_name}
//                       </Text>
//                     </View>
//                   </View>

//                   <View style={{ flexDirection: 'row', width: '100%' }}>
//                     <View
//                       style={{
//                         flex: 1,
//                         marginLeft: '5%',
//                         marginTop: 10,
//                         marginRight: '5%',
//                         height: 40,
//                       }}>
//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           flex: 1,
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           opacity: 0.5,
//                           textAlignVertical: 'center',
//                           fontFamily:'Poppins-Regular'
//                         }}>
//                         Buyer
//                       </Text>

//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           flex: 1,
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           textAlignVertical: 'center',
//                           fontFamily:'Poppins-Regular'
//                         }}>
//                         {dd.buyer_name}
//                       </Text>
//                     </View>

//                     <View
//                       style={{
//                         flex: 1,
//                         marginLeft: '5%',
//                         marginTop: 10,
//                         marginRight: '5%',
//                         height: 40,
//                       }}>
//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           flex: 1,
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           fontFamily:'Poppins-SemiBold',
//                           textAlignVertical: 'center',
//                         }}>
//                         Price
//                       </Text>

//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           flex: 1,
//                           color: theme.colors.textColor,
//                           fontSize: 12,
                          
//                           textAlignVertical: 'center',
//                           fontFamily:'Poppins-SemiBold'
//                         }}>
//                         ₹ {dd.sell_price}({dd.sell_bales})
//                       </Text>

//                     </View>


//                     <View
//                       style={{
//                         flex: 1,
//                         width: '100%',
//                         marginLeft: '1%',
//                         marginTop: 10,
//                         marginRight: '5%',
//                         height: 35,
//                       }}>
//                       {/* <TouchableOpacity onPress={() => this.onClickDownload()}> */}
//                       <TouchableOpacity onPress={() => this.onClickDownload(dd.url)}>
//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             width: '100%',
//                             height: '100%',
//                             fontSize: 14,
//                             textAlign: 'center',
//                             alignItems: 'center',
//                             color: 'white',
//                             borderRadius: 5,
//                             backgroundColor: '#69BA53',
//                             textAlignVertical: 'center',
//                             fontFamily:'Poppins-Regular'
//                           }}>
//                           Download
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </TouchableOpacity><View
//                   style={{
//                     width: '90%',
//                     left: '5%',
//                     height: 1,
//                     marginTop: 10,
//                     backgroundColor: '#D1D1D1',
//                   }}></View>
//               </View>
//             ))}
//           </View>
//         ));
//       }
//       return (
//         <View
//           style={{
//             height: '90%',
//             flex: 1,
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginTop: '50%'
//           }}>
//           <NoRecordsFound_Icon />
//           <Text style={{fontSize:14,fontFamily:'Poppins-Regular'}}>Sorry, no records available</Text>
//         </View>
//       );
//     } catch (error) {
//       console.log("Error: " + error)
//     }
//   }

//   createMyPostAttribute = attributeArray => {
//     try {
//       if (attributeArray.length > 0) {
//         return attributeArray.map((el, i) => (
//           <View style={{ flex: 1 }}>
//             <Text
//               numberOfLines={1}
//               ellipsizeMode="tail"
//               style={{
//                 flex: 1,
//                 color: theme.colors.textColor,
//                 fontSize: fontSizeMyPostCenterText,
//                 textAlign: 'center',
//                 textAlignVertical: 'center',
//                 fontFamily:'Poppins-Regular'
//               }}>
//               {el.attribute}
//             </Text>

//             <Text
//               numberOfLines={1}
//               ellipsizeMode="tail"
//               style={{
//                 flex: 1,
//                 color: theme.colors.textColor,
//                 fontSize: fontSizeMyPostCenterText,
//                 fontWeight: 'bold',
//                 textAlign: 'center',
//                 textAlignVertical: 'center',
//                 fontFamily:'Poppins-Regular'
//               }}>
//               {el.attribute_value}(mm)
//             </Text>
//           </View>

//           // <View style={vLineMyPostStyle}></View>
//         ));
//       }
//       return (
//         <View
//           style={{
//             height: '90%',
//             flex: 1,
//             flexDirection: 'column',
//             //backgroundColor: 'red',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginTop: '40%'
//           }}>
//           <NoRecordsFound_Icon />
//           <Text style={{fontSize:14,fontFamily:'Poppins-Regular'}}>Sorry, no records available</Text>
//         </View>
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   crateProductAttributeUI = () => {
//     try {
//       if (this.state.isPostToSell) {
//         return this.state.productAttributeList.map((el, i) => (
//           <View
//             style={{
//               flexDirection: 'row',
//               marginLeft: '5%',
//               marginTop: 10,
//               marginRight: '5%',
//               height: 50,
//               alignItems: 'center',
//             }}>
//             <Text style={{ width: '35%', color: theme.colors.textColor,fontFamily:'Poppins-Regular' }}>
//               {el.label}
//             </Text>
//             <View
//               style={{
//                 width: '65%',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               {/* <TextInput
//                 style={{width: '100%', height: 46}}
//                 placeholder={el.label}
//                 returnKeyType="next"
//                 autoCapitalize="none"
//                 autoCompleteType="off"
//                 textContentType="none"
//                 keyboardType="numeric"
//                 onChangeText={text => this.addValues(text, i, el.label)}
//               />       */}
//               <SelectDropdown
//                 data={el.value}
//                 onSelect={(selectedItem, j) => {
//                   console.log(selectedItem)
//                   //this.addValues(selectedItem.label, el.label)
//                   this.addValues(
//                     selectedItem.label,
//                     el.label,
//                     selectedItem.value,
//                     i,
//                   );
//                 }}

//                 buttonStyle={styles.dropdown3BtnStyle}
//                 renderCustomizedButtonChild={(selectedItem, index) => {
//                   return (
//                     <View style={styles.dropdown3BtnChildStyle}>
//                       <Text style={styles.dropdown3BtnTxt}>
//                         {selectedItem ? selectedItem.label : "Select " + el.label}
//                       </Text>
//                     </View>
//                   );
//                 }}
//                 renderDropdownIcon={() => {
//                   return (
//                     <FontAwesome name="chevron-down" color={"black"} size={14} style={{ marginRight: 20 }} />
//                   );
//                 }}
//                 dropdownIconPosition={"right"}

//                 dropdownStyle={styles.dropdown3DropdownStyle}
//                 rowStyle={styles.dropdown3RowStyle}
//                 renderCustomizedRowChild={(item, index) => {
//                   return (
//                     <View style={styles.dropdown3RowChildStyle}>

//                       <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
//                     </View>
//                   );
//                 }}
//               />
//             </View>
//           </View>
//         ));
//       } else if (this.state.isSearchToSell) {
//         return this.state.productAttributeList.map((el, i) => (
//           console.log('kai nai',el.id),
//           <View
//             style={{
//               flexDirection: 'row',
//               marginLeft: '5%',
//               marginTop: 10,
//               marginRight: '5%',
//               height: 50,
//               alignItems: 'center',
//             }}>
//             <Text style={{ width: '35%', color: theme.colors.textColor,fontFamily:'Poppins-Regular' }}>
//               {el.label}
//             </Text>
//             <View
//               style={{
//                 width: '65%',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
              
//               {el.label !== 'Micronnaire' && el.label !== 'RD' && el.label !== 'Trash(%)' && el.label !== 'Moisture(%)' ? <SelectDropdown
//                 data={el.value}
//                 onSelect={(selectedItem, j) => {
//                   console.log(selectedItem)
//                   this.addValuesSearchBuyer(selectedItem.label,
//                     el.label,
//                     selectedItem.value,
//                     i,
//                     'from')
//                 }}

//                 buttonStyle={styles.dropdown3BtnStyle}
//                 renderCustomizedButtonChild={(selectedItem, index) => {
//                   return (
//                     <View style={styles.dropdown3BtnChildStyle}>
//                       <Text style={styles.dropdown3BtnTxt}>
//                         {selectedItem ? selectedItem.label : "Select " + el.label}
//                       </Text>
//                     </View>
//                   );
//                 }}
//                 renderDropdownIcon={() => {
//                   return (
//                     <FontAwesome name="chevron-down" color={"black"} size={14} style={{ marginRight: 20 }} />
//                   );
//                 }}
//                 dropdownIconPosition={"right"}

//                 dropdownStyle={styles.dropdown3DropdownStyle}
//                 rowStyle={styles.dropdown3RowStyle}
//                 renderCustomizedRowChild={(item, index) => {
//                   return (
//                     <View style={styles.dropdown3RowChildStyle}>

//                       <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
//                     </View>
//                   );
//                 }}
//               /> : <View style={{flexDirection: 'row',
//               marginLeft: '0%',
//               marginRight: '0%',
//               marginTop: 0,}}><View style={{flex: 1, marginRight: 3}}>
//                 <SelectDropdown
//                 data={el.value}
//                       ref={e => this.fromselectRef = e}
//                 onSelect={(selectedItem, j) => {
//                   this.state.inputData.length > 0 && this.state.inputData.map(item => {
//                     console.log('item', this.state.inputData.find(it => it.attribute === el.label))
//                     let find = this.state.inputData.find(it => it.attribute === el.label)
//                     if (find) {
//                       // console.log('this.select', this.selectRef)
//                       find.to <= selectedItem.label ? this.Fromselectmarg(find.to, selectedItem.label) : this.addValuesSearchBuyer(selectedItem.label,
//                         el.label,
//                         selectedItem.value,
//                         i,
//                         'from')
//                     } else {
//                       this.addValuesSearchBuyer(selectedItem.label,
//                         el.label,
//                         selectedItem.value,
//                         i,
//                         'from')

//                     }
//                   })
//                   this.state.inputData.length <= 0 && this.addValuesSearchBuyer(selectedItem.label,
//                     el.label,
//                     selectedItem.value,
//                     i,
//                     'from')
//                 }}

//                 buttonStyle={styles.dropdown3BtnStyle}
//                 renderCustomizedButtonChild={(selectedItem, index) => {
//                   return (
//                     <View style={styles.dropdown3BtnChildStyle}>
//                       <Text style={styles.dropdown3BtnTxt}>
//                         {selectedItem ? selectedItem.label : "Select " + el.label}
//                       </Text>
//                     </View>
//                   );
//                 }}
//                 renderDropdownIcon={() => {
//                   return (
//                     <FontAwesome name="chevron-down" color={"black"} size={14} style={{ marginRight: 20 }} />
//                   );
//                 }}
//                 dropdownIconPosition={"right"}

//                 dropdownStyle={styles.dropdown3DropdownStyle}
//                 rowStyle={styles.dropdown3RowStyle}
//                 renderCustomizedRowChild={(item, index) => {
//                   return (
//                     <View style={styles.dropdown3RowChildStyle}>

//                       <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
//                     </View>
//                   );
//                 }}
//               />
//                 </View>
//                 <View style={{flex: 1, marginRight: 0}}>
//                   <SelectDropdown
//                 data={el.value}
//                       ref={e => this.selectRef = e}

//                 onSelect={(selectedItem, j) => {
//                   this.state.inputData.length > 0 && this.state.inputData.map((item, index) => {
//                     console.log('item', this.state.inputData.find(it => it.attribute === el.label))
//                     let find = this.state.inputData.find(it => it.attribute === el.label)
//                     if (find)

//                     // if (item.attribute === el.label )
//                     {
//                       // console.log('this.select',this.selectRef)
//                       find.from >= selectedItem.label ? this.selectmarg(find.from, selectedItem.label) : this.addValuesSearchBuyer(selectedItem.label,
//                         el.label,
//                         selectedItem.value,
//                         i,
//                         'to')
//                     }
//                     else {
//                       alert('please select starting value')
//                     }
//                   })
//                   if (this.state.inputData.length <= 0) {
//                     alert('please select starting value')
//                   }
//                 }}

//                 buttonStyle={styles.dropdown3BtnStyle}
//                 renderCustomizedButtonChild={(selectedItem, index) => {
//                   return (
//                     <View style={styles.dropdown3BtnChildStyle}>
//                       <Text style={styles.dropdown3BtnTxt}>
//                         {selectedItem ? selectedItem.label : "Select " + el.label}
//                       </Text>
//                     </View>
//                   );
//                 }}
//                 renderDropdownIcon={() => {
//                   return (
//                     <FontAwesome name="chevron-down" color={"black"} size={14} style={{ marginRight: 20 }} />
//                   );
//                 }}
//                 dropdownIconPosition={"right"}

//                 dropdownStyle={styles.dropdown3DropdownStyle}
//                 rowStyle={styles.dropdown3RowStyle}
//                 renderCustomizedRowChild={(item, index) => {
//                   return (
//                     <View style={styles.dropdown3RowChildStyle}>

//                       <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
//                     </View>
//                   );
//                 }}
//               />
//                   </View>
//                   </View>
//                 }
              
//             </View>
//           </View>
//         ));
//       } else if (this.state.isNotificationToBuyer) {
//         return this.state.productAttributeList.map((el, i) => (
//           <View
//             style={{
//               flexDirection: 'row',
//               marginLeft: '5%',
//               marginTop: 10,
//               marginRight: '5%',
//               height: 50,
//               alignItems: 'center',
//             }}>
//             <Text style={{ width: '35%', color: theme.colors.textColor,fontFamily:'Poppins-Regular' }}>
//               {el.label}
//             </Text>
//             <View
//               style={{
//                 width: '65%',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               {/* <TextInput
//                 style={{width: '100%', height: 46}}
//                 placeholder={el.label}
//                 returnKeyType="next"
//                 autoCapitalize="none"
//                 autoCompleteType="off"
//                 textContentType="none"
//                 keyboardType="numeric"
//                 onChangeText={text => this.addValues(text, i, el.label)}
//               />       */}
//               <SelectDropdown
//                 data={el.value}
//                 onSelect={(selectedItem, j) => {
//                   console.log(selectedItem)
//                   this.addValues(
//                     selectedItem.label,
//                     el.label,
//                     selectedItem.value,
//                     i,
//                   );
//                 }}

//                 buttonStyle={styles.dropdown3BtnStyle}
//                 renderCustomizedButtonChild={(selectedItem, index) => {
//                   return (
//                     <View style={styles.dropdown3BtnChildStyle}>
//                       <Text style={styles.dropdown3BtnTxt}>
//                         {selectedItem ? selectedItem.label : "Select " + el.label}
//                       </Text>
//                     </View>
//                   );
//                 }}
//                 renderDropdownIcon={() => {
//                   return (
//                     <FontAwesome name="chevron-down" color={"black"} size={14} style={{ marginRight: 20 }} />
//                   );
//                 }}
//                 dropdownIconPosition={"right"}

//                 dropdownStyle={styles.dropdown3DropdownStyle}
//                 rowStyle={styles.dropdown3RowStyle}
//                 renderCustomizedRowChild={(item, index) => {
//                   return (
//                     <View style={styles.dropdown3RowChildStyle}>

//                       <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
//                     </View>
//                   );
//                 }}
//               />
//             </View>
//           </View>
//         ));
//       }

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   onClickMultipleNegotiation = (el) => {
//     this.props.navigation.navigate('MultipleNegotiationList', {
//       data: el,
//       prevScrName: 'Dashboard',
//     });
//   }
  
//   createDashboardInNegotiationListUI = () => {
//     try {
//       // console.log(
//       //   'Negotiation list: ' + JSON.stringify(this.state.arrNegotiationList),
//       // );
//       if (this.state.arrNegotiationList.length > 0) {
//         return this.state.arrNegotiationList.map((el, i) => (
//           //alert(el.best_price),
//           <View>
//             {el.best_price === '' ? (
//               <View>
//                 <View style={{flexDirection: 'row', width: '100%'}}>
//                   <View
//                     style={{
//                       flex: 1,
//                       marginLeft: '5%',
//                       marginRight: '5%',
//                       height: 40,
//                     }}>
//                     {el.negotiation_type == 'notification' ? (
//                       <View
//                         style={{
//                           flex: 1,
//                           height: 40,
//                           marginLeft: '5%',
//                           marginRight: '5%',
//                         }}>
//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             flex: 1,
//                             marginTop: 18,
//                             color: theme.colors.textColor,
//                             fontSize: 16,
//                             textAlignVertical: 'center',
//                             fontFamily: "Poppins-Medium"
//                           }}>
//                           {el.product_name}
//                         </Text>
//                       </View>
//                     ) : (
//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           flex: 1,
//                           marginTop: 18,
//                           color: theme.colors.textColor,
//                           fontSize: 16,
//                           textAlignVertical: 'center',
//                           fontFamily: "Poppins-Medium"
//                         }}>
//                         {el.product_name}
//                       </Text>
//                     )}
//                   </View>

//                   <View
//                     style={{
//                       flex: 1,
//                       marginLeft: '5%',
//                       marginTop: 10,
//                       marginRight: '5%',
//                       height: 40,
//                     }}>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{
//                         flex: 1,
//                         color: theme.colors.textColor,
//                         fontSize: 12,
//                         opacity: 0.5,
//                         textAlignVertical: 'center',
//                         fontFamily: "Poppins-Regular"
//                       }}>
//                       Prev
//                     </Text>
//                     {el.negotiation_type == 'notification' ? (
//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           flex: 1,
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           textAlignVertical: 'center',
//                           fontFamily: "Poppins-Regular"
//                         }}>
//                         ₹ {el.notification_detail[0].prev_price} (
//                         {el.notification_detail[0].prev_no_of_bales})
//                       </Text>
//                     ) : (
//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           flex: 1,
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           textAlignVertical: 'center',
//                           fontFamily: "Poppins-Regular"
//                         }}>
//                         ₹ {el.post_detail[0].prev_price} (
//                         {el.post_detail[0].prev_no_of_bales})
//                       </Text>
//                     )}
//                   </View>

//                   {el.negotiation_type == 'notification' ? (
//                     el.notification_detail[0].negotiation_by == 'seller' ? (
//                       <View
//                         style={{
//                           flex: 1.2,
//                           width: '100%',
//                           marginLeft: '1%',
//                           marginTop: 10,
//                           marginRight: '5%',
//                           height: 35,
//                         }}>
//                         <TouchableOpacity
//                           onPress={() => this.onClickWaitingForResponse(el)}>
//                           <Text
//                             numberOfLines={1}
//                             ellipsizeMode="tail"
//                             style={{
//                               width: '100%',
//                               height: '100%',
//                               fontSize: 10,
//                               textAlign: 'center',
//                               alignItems: 'center',
//                               color: '#69BA53',
//                               borderRadius: 5,
//                               textAlignVertical: 'center',
//                               fontFamily: "Poppins-Regular"
//                             }}>
//                             Waiting for response
//                           </Text>
//                         </TouchableOpacity>
//                       </View>
//                     ) : (
//                       <View
//                         style={{
//                           flex: 1,
//                           width: '100%',
//                           marginLeft: '5%',
//                           marginTop: 10,
//                           marginRight: '5%',
//                           height: 35,
//                         }}>
//                         <TouchableOpacity
//                           onPress={() => this.onClickRespond(el)}>
//                           <Text
//                             numberOfLines={1}
//                             ellipsizeMode="tail"
//                             style={{
//                               width: '100%',
//                               height: '100%',
//                               fontSize: 14,
//                               textAlign: 'center',
//                               alignItems: 'center',
//                               color: 'white',
//                               borderRadius: 5,
//                               backgroundColor: '#69BA53',
//                               textAlignVertical: 'center',
//                               fontFamily: "Poppins-Regular"
//                             }}>
//                             Respond
//                           </Text>
//                         </TouchableOpacity>
//                       </View>
//                     )
//                   ) : el.post_detail[0].negotiation_by == 'seller' ? (
//                     <View
//                       style={{
//                         flex: 1.2,
//                         width: '100%',
//                         marginLeft: '1%',
//                         marginTop: 10,
//                         marginRight: '5%',
//                         height: 35,
//                       }}>
//                       <TouchableOpacity
//                         onPress={() => this.onClickWaitingForResponse(el)}>
//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             width: '100%',
//                             height: '100%',
//                             fontSize: 10,
//                             textAlign: 'center',
//                             alignItems: 'center',
//                             color: '#69BA53',
//                             borderRadius: 5,
//                             textAlignVertical: 'center',
//                             fontFamily: "Poppins-Regular"
//                           }}>
//                           Waiting for response
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   ) : (
//                     <View
//                       style={{
//                         flex: 1,
//                         width: '100%',
//                         marginLeft: '5%',
//                         marginTop: 10,
//                         marginRight: '5%',
//                         height: 35,
//                       }}>
//                       <TouchableOpacity onPress={() => this.onClickRespond(el)}>
//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             width: '100%',
//                             height: '100%',
//                             fontSize: 14,
//                             textAlign: 'center',
//                             alignItems: 'center',
//                             color: 'white',
//                             borderRadius: 5,
//                             backgroundColor: '#69BA53',
//                             textAlignVertical: 'center',
//                             fontFamily: "Poppins-Regular"
//                           }}>
//                           Respond
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   )}
//                 </View>

//                 <View style={{flexDirection: 'row', width: '100%'}}>
//                   <View
//                     style={{
//                       flex: 1,
//                       marginLeft: '5%',
//                       marginTop: 10,
//                       marginRight: '5%',
//                       height: 40,
//                     }}>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{
//                         flex: 1,
//                         color: theme.colors.textColor,
//                         fontSize: 12,
//                         opacity: 0.5,
//                         textAlignVertical: 'center',
//                         fontFamily: "Poppins-Regular"
//                       }}>
//                       Posted by
//                     </Text>

//                     {el.negotiation_type == 'notification' ? (
//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           flex: 1,
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           textAlignVertical: 'center',
//                           fontFamily: "Poppins-Regular"
//                         }}>
//                         {el.name}
//                       </Text>
//                     ) : (
//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           flex: 1,
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           textAlignVertical: 'center',
//                           fontFamily: "Poppins-Regular"
//                         }}>
//                         {el.name}
//                       </Text>
//                     )}
//                   </View>

//                   <View
//                     style={{
//                       flex: 1,
//                       marginLeft: '5%',
//                       marginTop: 10,
//                       marginRight: '5%',
//                       height: 40,
//                     }}>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{
//                         flex: 1,
//                         color: theme.colors.textColor,
//                         fontSize: 12,
//                         textAlignVertical: 'center',
//                         fontFamily: "Poppins-SemiBold"
//                       }}>
//                       New
//                     </Text>
//                     {el.negotiation_type == 'notification' ? (
//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           flex: 1,
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           fontWeight: 'bold',
//                           textAlignVertical: 'center',
//                           fontFamily: "Poppins-SemiBold"
//                         }}>
//                         {el.notification_detail[0].current_price} (
//                         {el.notification_detail[0].current_no_of_bales})
//                       </Text>
//                     ) : (
//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           flex: 1,
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           fontWeight: 'bold',
//                           textAlignVertical: 'center',
//                           fontFamily: "Poppins-SemiBold"
//                         }}>
//                         {el.post_detail[0].current_price} (
//                         {el.post_detail[0].current_no_of_bales})
//                       </Text>
//                     )}
//                   </View>

//                   <View
//                     style={{
//                       flex: 1,
//                       width: '100%',
//                       marginLeft: '5%',
//                       marginTop: 10,
//                       marginRight: '5%',
//                       height: 35,
//                     }}></View>
//                 </View>
//                 <View
//                   style={{
//                     width: '90%',
//                     left: '5%',
//                     height: 1,
//                     marginTop: 10,
//                     backgroundColor: '#D1D1D1',
//                   }}></View>
//               </View>
//             ) : (
//               <TouchableOpacity onPress={() => this.onClickMultipleNegotiation(el)}>
//                 <View
//                   style={{
//                     flex: 1,
//                     flexDirection: 'column',
//                     marginTop: 10,
//                   }}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                       marginLeft: '5%',
//                       marginRight: '5%',
//                     }}>
//                     <Text
//                       style={{
//                         color: theme.colors.textColor,
//                         fontSize: 16,
//                         margin: 0,
//                         fontFamily: 'Poppins-SemiBold',
//                       }}>
//                       {el.product_name}
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 10,
//                         color: theme.colors.primary,
//                         fontFamily: 'Poppins-Regular',
//                       }}>
//                       {el.count} Negotiation
//                     </Text>
//                   </View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                     }}>
//                     <View
//                       style={{
//                         flexDirection: 'column',
//                         alignItems: 'flex-start',
//                         marginLeft: '5%',
//                         marginRight: '5%',
//                         width:'30%'
//                       }}>
//                       <Text
//                         style={{
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           marginTop: 10,
//                           opacity: 0.5,
//                           fontFamily: 'Poppins-Regular',
//                         }}>
//                         Best Deal
//                       </Text>
//                       <Text
//                         style={{
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           fontFamily: 'Poppins-Regular',
//                         }}>
//                         {el.best_name}
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         flexDirection: 'column',
//                         alignItems: 'flex-start',
//                         marginLeft: '5%',
//                         marginRight: '5%',
//                         marginTop: 10,
//                       }}>
//                       <Text
//                         style={{
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           opacity: 0.5,
//                           fontFamily: 'Poppins-Regular',
//                         }}>
//                         Base
//                       </Text>
//                       <Text
//                         style={{
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           fontFamily: 'Poppins-Regular',
//                         }}>
//                         {el.price} ({el.no_of_bales})
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         flexDirection: 'column',
//                         alignItems: 'flex-start',
//                         marginLeft: '5%',
//                         marginRight: '5%',
//                         marginTop: 10,
//                       }}>
//                       <Text
//                         style={{
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           fontFamily: 'Poppins-Bold',
//                         }}>
//                         Deal
//                       </Text>
//                       <Text
//                         style={{
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           fontFamily: 'Poppins-Bold',
//                         }}>
//                         {el.best_price} ({el.best_bales})
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         flex: 1,
//                         width: '100%',
//                         marginLeft: '5%',
//                         marginTop: 10,
//                         marginRight: '5%',
//                         height: 35,
//                       }}></View>
//                   </View>
//                   <View
//                     style={{
//                       width: '90%',
//                       left: '5%',
//                       height: 1,
//                       marginTop: 10,
//                       backgroundColor: '#D1D1D1',
//                     }}></View>
//                 </View>
//               </TouchableOpacity>
//             )}
//           </View>
//         ));
//       }
//       return (
//         <View
//           style={{
//             height: '90%',
//             flex: 1,
//             flexDirection: 'column',
//             //backgroundColor: 'red',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginTop: '40%',
//           }}>
//           <NoRecordsFound_Icon />
//           <Text style={{fontSize:14,fontFamily: "Poppins-Regular"}}>Sorry, no records available</Text>
//         </View>
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   createDashboardNotificationListUI = () => {
//     try {
//       console.log('createDashboardNotificationListUI' + JSON.stringify(this.state.arrNotificationList))
//       //let = await EncryptedStorage.getItem('user_id');
//       if (this.state.arrNotificationList.length > 0) {
//         return this.state.arrNotificationList.map((el, i) => (
//           <View style={{ backgroundColor: 'white' }}>
//             <View style={{ flexDirection: 'row', width: '100%' }}>
//               <View
//                 style={{
//                   flex: 1,
//                   marginLeft: '5%',
//                   marginRight: '5%',
//                   height: 40,
//                 }}>
//                 <Text
//                   numberOfLines={1}
//                   ellipsizeMode="tail"
//                   style={{
//                     flex: 1,
//                     marginTop: 18,
//                     color: theme.colors.textColor,
//                     fontSize: 16,
//                     textAlignVertical: 'center',
//                     fontFamily: "Poppins-Medium"
//                   }}>
//                   {el.product_name}
//                 </Text>
//               </View>
//             </View>

//             <View style={{ flexDirection: 'row', width: '100%' }}>
//               <View
//                 style={{
//                   flex: 1,
//                   marginLeft: '5%',
//                   marginTop: 10,
//                   marginRight: '5%',
//                   height: 40,
//                 }}>
//                 <Text
//                   numberOfLines={1}
//                   ellipsizeMode="tail"
//                   style={{
//                     flex: 1,
//                     color: theme.colors.textColor,
//                     fontSize: 12,
//                     opacity: 0.5,
//                     textAlignVertical: 'center',
//                     fontFamily: "Poppins-Regular"
//                   }}>
//                   Send by
//                 </Text>

//                 <Text
//                   numberOfLines={1}
//                   ellipsizeMode="tail"
//                   style={{
//                     flex: 1,
//                     color: theme.colors.textColor,
//                     fontSize: 12,
//                     textAlignVertical: 'center',
//                     fontFamily: "Poppins-Regular"
//                   }}>
//                   {el.send_by}
//                 </Text>
//               </View>

//               <View
//                 style={{
//                   flex: 1,
//                   marginLeft: '5%',
//                   marginTop: 10,
//                   marginRight: '5%',
//                   height: 40,
//                 }}>
//                 <Text
//                   numberOfLines={1}
//                   ellipsizeMode="tail"
//                   style={{
//                     flex: 1,
//                     color: theme.colors.textColor,
//                     fontSize: 12,
//                     opacity: 0.5,
//                     textAlignVertical: 'center',
//                     fontFamily: "Poppins-Regular"
//                   }}>
//                   Price
//                 </Text>

//                 <Text
//                   numberOfLines={1}
//                   ellipsizeMode="tail"
//                   style={{
//                     flex: 1,
//                     color: theme.colors.textColor,
//                     fontSize: 12,
//                     textAlignVertical: 'center',
//                     fontFamily: "Poppins-Regular"
//                   }}>
//                   ₹ {el.price} ({el.no_of_bales})
//                 </Text>
//               </View>

//               <View
//                 style={{
//                   flex: 1,
//                   width: '100%',
//                   marginLeft: '1%',
//                   marginTop: 10,
//                   marginRight: '5%',
//                   height: 35,
//                 }}>
//                 <TouchableOpacity
//                   onPress={() => this.onClickNotificationView(el)}>
//                   <Text
//                     numberOfLines={1}
//                     ellipsizeMode="tail"
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       fontSize: 14,
//                       textAlign: 'center',
//                       alignItems: 'center',
//                       color: 'white',
//                       borderRadius: 5,
//                       backgroundColor: '#69BA53',
//                       textAlignVertical: 'center',
//                       fontFamily: "Poppins-Regular"
//                     }}>
//                     View
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         ));
//       }
//       return (
//         <View
//           style={{
//             height: '90%',
//             flex: 1,
//             flexDirection: 'column',
//             //backgroundColor: 'red',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginTop: '40%'
//           }}>
//           <NoRecordsFound_Icon />
//           <Text style={{fontSize:14,fontFamily: "Poppins-Regular"}}>Sorry, no records available</Text>
//         </View>
//       );
//     } catch (error) {
//       console.log(error)
//     }
//   }


//   setAttributeValueDropdown = (data, index) => {
//     try {
//       return (<DropDownPicker
//         placeholder={'test'}
//         open={this.state.openState}
//         value={data.value}
//         items={data}
//         setOpen={this.setOpenState}
//         setValue={this.setValue}
//         setItems={this.setProductAttrValueState}
//         containerStyle={{ height: 50, width: '100%', marginTop: 15 }}
//         listMode="MODAL"
//         scrollViewProps={{
//           decelerationRate: "fast"
//         }} />)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   onClickCancelPost = async (postID, type) => {
//     try {
//       this.setState({
//         spinner: true,
//       });
//       var self = this;
//       let api_url = "";
//       let data;

//       if (type == "post") {
//         data = {
//           seller_buyer_id: await EncryptedStorage.getItem('user_id'),
//           user_type: 'seller',
//           post_id: postID,
//         };
//         api_url = api_config.BASE_URL + api_config.CANCEL_POST
//       } else {
//         data = {
//           seller_buyer_id: await EncryptedStorage.getItem('user_id'),
//           user_type: 'seller',
//           notification_id: postID,
//         };
//         api_url = api_config.BASE_URL + api_config.CANCEL_NOTIFICATION
//       }
//       console.log(JSON.stringify(data));

//       const formData = new FormData();
//       formData.append('data', JSON.stringify(data));

//       axios({
//         url: api_url,
//         method: 'POST',
//         data: formData,
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//         .then(function (response) {
//           console.log('delete post response :', response.status);
//           if (response.status == 200) {
//             alert("Post cancelled successfully.");
//             self.getMyActivePost();
//           } else {
//             self.setState({
//               spinner: false,
//             });
//             alert(response.data.message);
//           }
//         })
//         .catch(function (error) {
//           self.setState({
//             spinner: false,
//             message: 'Something bad happened ' + error,
//           }),
//             console.log(error);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   onClickMyPostDetails = (obj, status) => {
//     console.log('MypostDetails -' + JSON.stringify(obj));
//     this.props.navigation.navigate('MyPostDetails', { data: obj, status: status });
//   }

//   createMyPostUI = () => {
//     try {
//       if (this.state.isMyPostActiveClicked) {
//         if (this.state.myActivePost.length > 0) {
//           return this.state.myActivePost.map((el, i) => (

//             <TouchableOpacity onPress={() => this.onClickMyPostDetails(el, 'active')}>
//               <View style={{ width: '100%' }}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     marginLeft: '5%',
//                     marginRight: '5%',
//                     height: 40,
//                   }}>
//                   <View style={{ marginTop: 5, marginRight: 10 }}>
//                     {el.type == 'notification' ? <View><Bell_Icon /></View> : <View><MyPostGreen_Icon /></View>}
//                   </View>
//                   <Text
//                     numberOfLines={1}
//                     ellipsizeMode="tail"
//                     style={{
//                       flex: 1,
//                       color: theme.colors.textColor,
//                       fontSize: 16,
//                       textAlignVertical: 'center',
//                       fontFamily:'Poppins-SemiBold'
//                     }}>
//                     {el.product_name}
//                   </Text>

//                   <Text
//                     numberOfLines={1}
//                     ellipsizeMode="tail"
//                     style={{
//                       width: '50%',
//                       height: '100%',
//                       fontSize: 16,
//                       textAlign: 'right',
//                       alignItems: 'center',
//                       textAlignVertical: 'center',
//                       fontFamily:'Poppins-SemiBold'
//                     }}>
//                     {el.no_of_bales} Bales
//                   </Text>
//                 </View>

//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     marginLeft: '5%',
//                     marginTop: 10,
//                     marginRight: '5%',
//                     height: 40,
//                   }}>
//                   {this.createMyPostAttribute(el.attribute_array)}
//                 </View>

//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     marginLeft: '5%',
//                     marginTop: 10,
//                     marginRight: '5%',
//                     height: 40,
//                   }}>
//                   <View style={{ flex: 1, marginTop: 10 }}>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{
//                         flex: 1,
//                         color: theme.colors.textColor,
//                         fontSize: 12,
//                         opacity: 0.5,
//                         textAlignVertical: 'center',
//                         fontFamily:'Poppins-Medium'
//                       }}>
//                       {el.date}
//                     </Text>
//                   </View>

//                   <Text
//                     numberOfLines={1}
//                     ellipsizeMode="tail"
//                     style={{
//                       width: '29%',
//                       height: '100%',
//                       fontSize: 14,
//                       textAlign: 'center',
//                       alignItems: 'center',
//                       color: theme.colors.textColor,
//                       top: 5,
//                       textAlignVertical: 'center',
//                       fontFamily:'Poppins-SemiBold'
//                     }}>
//                     ₹ {el.price}
//                   </Text>
//                   <Text
//                     numberOfLines={1}
//                     onPress={() => this.onClickCancelPost(el.id, el.type)}
//                     ellipsizeMode="tail"
//                     style={{
//                       width: '35%',
//                       height: '80%',
//                       marginTop: '2%',
//                       fontSize: 14,
//                       textAlign: 'center',
//                       alignItems: 'center',
//                       color: 'white',
//                       borderRadius: 5,
//                       backgroundColor: '#69BA53',
//                       textAlignVertical: 'center',
//                       fontFamily:'Poppins-SemiBold'
//                     }}>
//                     Cancel
//                   </Text>
//                 </View>
//                 <View
//                   style={{
//                     width: '90%',
//                     left: '5%',
//                     height: 1,
//                     marginTop: 10,
//                     backgroundColor: '#D1D1D1',
//                   }}></View>
//               </View>

//             </TouchableOpacity>

//           ));
//         }
//         return (
//           <View
//             style={{
//               height: '90%',
//               flex: 1,
//               flexDirection: 'column',
//               //backgroundColor: 'red',
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginTop: '40%'
//             }}>
//             <NoRecordsFound_Icon />
//             <Text style={{fontSize:14,fontFamily:'Poppins-Regular'}}>Sorry, no records available</Text>
//           </View>
//         );
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   createMyPostCompletedUI = () => {
//     try {

//       if (this.state.isMyPostCompletedClicked) {
//         if (this.state.myActivePost.length > 0) {
//           return this.state.myActivePost.map((el, i) => (
//             <TouchableOpacity onPress={() => this.onClickMyPostDetails(el, 'completed')}>
//               <View>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     marginLeft: '5%',
//                     marginRight: '5%',
//                     height: 40,
//                   }}>
//                   <View style={{ marginTop: 5, marginRight: 10 }}>
//                     {el.type == 'notification' ? <View><Bell_Icon /></View> : <View><MyPostGreen_Icon /></View>}
//                   </View>
//                   <Text
//                     numberOfLines={1}
//                     ellipsizeMode="tail"
//                     style={{
//                       flex: 1,
//                       color: theme.colors.textColor,
//                       fontSize: 16,
//                       textAlignVertical: 'center',
//                       fontFamily:'Poppins-Medium'
//                     }}>
//                     {el.product_name}
//                   </Text>

//                   <Text
//                     numberOfLines={1}
//                     ellipsizeMode="tail"
//                     style={{
//                       width: '50%',
//                       height: '100%',
//                       fontSize: 16,
//                       textAlign: 'right',
//                       alignItems: 'center',
//                       textAlignVertical: 'center',
//                       fontFamily:'Poppins-Medium'
//                     }}>
//                     {el.no_of_bales} Bales
//                   </Text>
//                 </View>

//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     marginLeft: '5%',
//                     marginTop: 10,
//                     marginRight: '5%',
//                     height: 35,
//                   }}>
//                   <View style={{ flex: 1 }}>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{
//                         flex: 1,
//                         color: theme.colors.textColor,
//                         fontSize: 12,
//                         opacity: 0.5,
//                         textAlignVertical: 'center',
//                         fontFamily:'Poppins-Regular'
//                       }}>
//                       Post time
//                     </Text>

//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{
//                         flex: 1,
//                         color: theme.colors.textColor,
//                         fontSize: 12,
//                         textAlignVertical: 'center',
//                         fontFamily:'Poppins-Regular'
//                       }}>
//                       {el.created_at}
//                     </Text>
//                   </View>
//                   {el.status == "complete" ? <Text
//                     numberOfLines={1}
//                     ellipsizeMode="tail"
//                     style={{
//                       width: '35%',
//                       height: '100%',
//                       fontSize: 14,
//                       textAlign: 'center',
//                       alignItems: 'center',
//                       color: '#69BA53',
//                       borderStyle: 'dotted',
//                       borderWidth: 1,
//                       borderRadius: 5,
//                       borderColor: '#69BA53',
//                       textAlignVertical: 'center',
//                       fontFamily:'Poppins-Medium'
//                     }}>
//                     Deal Done
//                   </Text> :
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{
//                         width: '35%',
//                         height: '100%',
//                         fontSize: 14,
//                         textAlign: 'center',
//                         alignItems: 'center',
//                         color: '#BA5369',
//                         borderStyle: 'dotted',
//                         borderWidth: 1,
//                         borderRadius: 5,
//                         borderColor: '#BA5369',
//                         textAlignVertical: 'center',
//                         fontFamily:'Poppins-Medium'
//                       }}>
//                       Cancelled
//                     </Text>}

//                 </View>
//                 {el.status == "complete" ?
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       marginLeft: '5%',
//                       marginTop: 10,
//                       marginRight: '5%',
//                       height: 35,
//                     }}>
//                     <View style={{ flex: 1 }}>
//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           flex: 1,
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           opacity: 0.5,
//                           textAlignVertical: 'center',
//                           fontFamily:'Poppins-Regular'
//                         }}>
//                         Buyer Name
//                       </Text>

//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           flex: 1,
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           textAlignVertical: 'center',
//                           fontFamily:'Poppins-Regular'
//                         }}>
//                         {el.done_by}
//                       </Text>
//                     </View>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{
//                         width: '35%',
//                         height: '100%',
//                         fontSize: 14,
//                         textAlign: 'right',
//                         alignItems: 'center',
//                         color: 'black',
//                         textAlignVertical: 'center',
//                         fontFamily:'Poppins-SemiBold'
//                       }}>
//                       ₹ {el.price}
//                     </Text>
//                   </View> :
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       marginLeft: '5%',
//                       marginTop: 10,
//                       marginRight: '5%',
//                       height: 35,
//                     }}>
//                     <View style={{ flex: 1 }}>
//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           flex: 1,
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           opacity: 0.5,
//                           textAlignVertical: 'center',
//                           fontFamily:'Poppins-Regular'
//                         }}>
//                         Cancel time
//                       </Text>

//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           flex: 1,
//                           color: theme.colors.textColor,
//                           fontSize: 12,
//                           textAlignVertical: 'center',
//                           fontFamily:'Poppins-Regular'
//                         }}>
//                         {el.updated_at}
//                       </Text></View>
//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       style={{
//                         width: '35%',
//                         height: '100%',
//                         fontSize: 14,
//                         textAlign: 'right',
//                         alignItems: 'center',
//                         color: 'black',
//                         fontFamily:'Poppins-SemiBold',
//                         textAlignVertical: 'center',
//                       }}>
//                       ₹ {el.price}
//                     </Text>
//                   </View>
//                 }

//                 <View style={{ width: '90%', height: 1, backgroundColor: '#D1D1D1', marginBottom: 10, marginTop: 10, marginLeft: 19 }} />

//               </View>
//             </TouchableOpacity>
//           ));
//         }
//         return (
//           <View
//             style={{
//               height: '90%',
//               flex: 1,
//               flexDirection: 'column',
//               //backgroundColor: 'red',
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginTop: '40%'
//             }}>
//             <NoRecordsFound_Icon />
//             <Text style={{fontSize:14,fontFamily:'Poppins-Regular'}}>Sorry, no records available</Text>
//           </View>
//         );
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   changeProduct = selectedItem => {
//     try {
//       this.setState({ spinner: true, selectedProductID: selectedItem.value, selectedProductName: selectedItem.label });
//       this.getProductAttributeAPI(selectedItem.value);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   onClickMinusIcon = () => {
//     try {
//       if (this.state.displayBalesCount - this.state.balesCount != 0) {
//         if (this.state.displayBalesCount > 0) {
//           this.state.displayBalesCount =
//             this.state.displayBalesCount - this.state.balesCount;
//           this.setState({ displayBalesCount: this.state.displayBalesCount });
//         }
//       }

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   onClickPlusIcon = () => {
//     try {
//       this.state.displayBalesCount =
//         this.state.displayBalesCount + this.state.balesCount;
//       this.setState({ displayBalesCount: this.state.displayBalesCount });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   getProductAttributeArray = () => {
//     try {
//       let tempArray = [];
//       this.state.inputData.map((el, i) => {
//         tempArray.push({
//           attribute: el.attribute,
//           attribute_value: el.attribute_value,
//         })
//       }
//       );
//       return tempArray
//       //this.setState({attributeArry:tempArray})
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   getProductAttributeArrayForSearchBuyer = () => {
//     try {
//       let tempArray = [];
//       this.state.inputData.map((el, i) => {
//         tempArray.push({
//           attribute: el.attribute,
//           from: el.from,
//           to: el.to,
//         })
//       }
//       );
//       return tempArray
//       //this.setState({attributeArry:tempArray})
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   checkValidation = () => {
//     try {

//       if (this.state.isPostToSell || this.state.isNotificationToBuyer) {
//         let attrValue = this.getProductAttributeArray();
//         if (attrValue.length == 0) {
//           alert(defaultMessages.en.required.replace('{0}', 'atribute value'))
//           return false;
//         }
//         if (!fieldValidator(this.state.balesPrice)) {
//           alert(defaultMessages.en.required.replace('{0}', 'price'))
//           return false;
//         }

//         if (!priceValidator(this.state.balesPrice)) {
//           alert('Please enter valid price')
//           return false;
//         }

//         if (this.state.displayBalesCount == 0) {
//           alert(defaultMessages.en.required.replace('{0}', 'bales'))
//           return false;
//         }

//         if (this.state.isShowSpinningName) {
//           if (!fieldValidator(this.state.txtSpinningMillName)) {
//             alert(defaultMessages.en.required.replace('{0}', 'spinning mill name'))
//             return false;
//           }
//         }

//         return true;
//       } else if (this.state.isSearchToSell) {
//         let attrValue = this.getProductAttributeArray();
//         if (attrValue.length == 0) {
//           alert(defaultMessages.en.required.replace('{0}', 'atribute value'))
//           return false;
//         }
//         if (this.state.displayBalesCount == 0) {
//           alert(defaultMessages.en.required.replace('{0}', 'bales'))
//           return false;
//         }

//         return true;
//       }

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   onClickPostToSell = async () => {
//     try {
//       if (this.checkValidation()) {
//         var self = this;
//         self.setState({
//           spinner: true,
//         });

//         let data = {
//           seller_buyer_id: await EncryptedStorage.getItem('user_id'),
//           product_id: this.state.selectedProductID,
//           price: this.state.balesPrice,
//           no_of_bales: this.state.displayBalesCount,
//           address: 'Raiya Road Rajkot',
//           attribute_array: this.getProductAttributeArray(),
//         };
//         const formData = new FormData();
//         formData.append('data', JSON.stringify(data));

//         axios({
//           url: api_config.BASE_URL + api_config.POST_TO_SELL,
//           method: 'POST',
//           data: formData,
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'multipart/form-data',
//           },
//         })
//           .then(function (response) {
//             console.log('response :', response);
//             if (response.status == 200) {
//               self.setState({
//                 spinner: false,
//                 isPostToSell: false,
//                 isDashboard: true,
//                 attributeArry: [],
//                 inputData: []
//               });
//               alert('Your product posted successfully.');
//             } else {
//               self.setState({
//                 spinner: false,
//               });
//               alert(response.message);
//             }
//           })
//           .catch(function (error) {
//             self.setState({
//               spinner: false,
//             });
//             alert(defaultMessages.en.serverNotRespondingMsg);
//           });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   onClickSearch = async () => {
//     try {
//       if (this.checkValidation()) {
//         var self = this;
//         self.setState({
//           spinner: true,
//         });

//         var productName = this.state.selectedProductName;

//         let data = {
//           type: 'post',
//           seller_buyer_id: await EncryptedStorage.getItem('user_id'),
//           product_id: this.state.selectedProductID,
//           no_of_bales: this.state.displayBalesCount,
//           attribute_array: this.getProductAttributeArrayForSearchBuyer(),
//           d_e: this.state.deName,
//         };
//         console.log("Serach to sell request: " + JSON.stringify(data))
//         const formData = new FormData();
//         formData.append('data', JSON.stringify(data));

//         axios({
//           url: api_config.BASE_URL + api_config.SEARCH_TO_SELL,
//           method: 'POST',
//           data: formData,
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'multipart/form-data',
//           },
//         })
//           .then(function (response) {
//             console.log('search to sell response :', response);
//             if (response.data.status == 200) {
//               //REDIRECT TO SEARCH SCREEN
//               self.setState({
//                 spinner: false,
//               });
//               if (response.data.data.length > 0) {
//                 self.props.navigation.navigate('SearchSelectSeller', { data: response.data, info: data, pn: productName, bales: self.state.displayBalesCount });
//               } else {
//                 alert("No search data available");
//               }
//             } else if (response.data.status == 404) {
//               self.setState({
//                 spinner: false,
//               });
//               alert("No search data available");
//             } else {
//               self.setState({
//                 spinner: false,
//               });
//               alert(response.message);
//             }
//           })
//           .catch(function (error) {
//             self.setState({
//               spinner: false,
//             });
//             alert(defaultMessages.en.serverNotRespondingMsg);
//           });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   changeDE = () => {
//     alert("Bhavin Thakkar");
//   }

//   onChanged(text) {
//     this.setState({
//       balesPrice: text.replace(/[^0-9]/g, ''),
//     });
//   }

//   render() {
//     const jsonDashboard = this.state.jsonData;

//     return (
//       <Background>
//         <View
//           style={{
//             flex: 1,
//             width: '100%',
//             height: '100%',
//             position: 'relative',
//             marginTop: -40,
//             backgroundColor: theme.colors.blackBG,
//           }}>
//           <Spinner visible={this.state.spinner} color="#085cab" />

//           <View style={{ width: '100%', height: 55, marginTop: 40 }}>
//             <Appbar.Header style={{ backgroundColor: 'transparent' }}>
//               <Appbar.Action
//                 icon="menu"
//                 color="white"
//                 onPress={() => this.onclickMenu()}
//               />
//               <Appbar.Content
//                 style={{ alignItems: 'center' }}
//                 color="white"
//                 title={this.state.titleOfScreen}
//                 titleStyle={{ fontSize: 20,fontFamily: "Poppins-SemiBold" }}
//               />
//               <Appbar.Action
//                 icon="notification-clear-all"
//                 color={this.state.isMyContracts || this.state.isProfile ? "white" : "transparent"}
//                 onPress={() => {
//                   this.setState({ isFilterShow: true });
//                   if (this.state.isMyContracts || this.state.isProfile) {
//                     this.state.isMyContracts && this.props.navigation.navigate
//                     ('MyContractFilter',{ productList: this.state.productItem });
//                     this.state.isProfile && this.props.navigation.navigate('EditProfile', { data: this.state.ProfileData })
//                   }
//                 }}
//               />
//             </Appbar.Header>
//           </View>

//           {this.state.isPostToSell && (
//             <View
//               style={{
//                 width: '100%',
//                 height: '86%',
//                 paddingBottom: 30,
//                 marginTop: 10,
//                 backgroundColor: 'white',
//                 borderTopLeftRadius: 20,
//                 borderTopRightRadius: 20,
//               }}>
//               <ScrollView>
//                 <View style={{ marginTop: 20 }}>
//                   {/* <DropDownPicker
//                     placeholder={this.state.dropdownPlaceholder}
//                     open={this.state.openState}
//                     value={this.state.value}
//                     items={this.state.items}
//                     setOpen={this.setOpenState}
//                     setValue={this.setValue}
//                     setItems={this.setItemsState}
//                     containerStyle={{
//                       height: 50,
//                       width: '90%',
//                       marginTop: 15,
//                       marginLeft: '5%',
//                     }}
//                     listMode="MODAL"
//                     onChangeValue={item => this.changeProduct(item)}
//                     scrollViewProps={{
//                       decelerationRate: 'fast',
//                     }}
//                   /> */}
//                   <View style={{ height: 50, width: '90%', marginTop: 15, marginLeft: '5%', }}>
//                     <SelectDropdown
//                       data={this.state.productItem}
//                       onSelect={(selectedItem, i) => {
//                         console.log(selectedItem)
//                         this.changeProduct(selectedItem)
//                         //this.addValues(selectedItem.label, el.label)
//                       }}

//                       buttonStyle={styles.dropdown3BtnStyle}
//                       renderCustomizedButtonChild={(selectedItem, index) => {
//                         return (
//                           <View style={styles.dropdown3BtnChildStyle}>
//                             <Text style={styles.dropdown3BtnTxt}>
//                               {selectedItem ? selectedItem.label : this.state.dropdownPlaceholder}
//                             </Text>
//                           </View>
//                         );
//                       }}
//                       renderDropdownIcon={() => {
//                         return (
//                           <FontAwesome name="chevron-down" color={"black"} size={14} style={{ marginRight: 20 }} />
//                         );
//                       }}
//                       dropdownIconPosition={"right"}

//                       dropdownStyle={styles.dropdown3DropdownStyle}
//                       rowStyle={styles.dropdown3RowStyle}
//                       renderCustomizedRowChild={(item, index) => {
//                         return (
//                           <View style={styles.dropdown3RowChildStyle}>

//                             <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
//                           </View>
//                         );
//                       }}
//                     /></View>
//                   {this.crateProductAttributeUI()}

//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       marginLeft: '5%',
//                       marginTop: 15,
//                       marginRight: '5%',
//                       height: 50,
//                       alignItems: 'center',
//                     }}>
//                     <Text
//                       style={{
//                         width: '35%',
//                         color: theme.colors.text,
//                         fontFamily:'Poppins-SemiBold'
//                       }}>
//                       Price
//                     </Text>

//                     <View
//                       style={{
//                         width: '65%',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                       }}>
//                       <TextInput
//                         style={{ width: '100%', height: 46, fontWeight: 'bold', backgroundColor: '#fff' }}
//                         label=""
//                         autoFocus={this.state.balespriceFocus}
//                         returnKeyType="next"
//                         maxLength={6}
//                         onChangeText={text => this.onChanged(text)}
//                         value={this.state.balesPrice}
//                         error={!!this.state.balesPriceError}
//                         errorText={this.state.balesPriceError}
//                         autoCapitalize="none"
//                         autoCompleteType="off"
//                         textContentType="none"
//                         keyboardType="numeric"
//                       />
//                     </View>
//                   </View>

//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       marginLeft: '5%',
//                       marginTop: 10,
//                       marginRight: '5%',
//                       height: 50,
//                       alignItems: 'center',
//                     }}>
//                     <Text style={{ width: '35%', color: theme.colors.textColor,fontFamily:'Poppins-SemiBold' }}>
//                       Sale bales
//                     </Text>

//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         width: '65%',
//                         height: '100%',
//                         alignItems: 'center',
//                       }}>
//                       <TouchableOpacity onPress={() => this.onClickMinusIcon()}>
//                         <Minus />
//                       </TouchableOpacity>

//                       <Text
//                         style={{
//                           width: '45%',
//                           textAlign: 'center',
//                           textAlignVertical: 'center',
//                           height: '100%',
//                           color: theme.colors.textColor,
//                           fontFamily:'Poppins-SemiBold'
//                         }}>
//                         {this.state.displayBalesCount}
//                       </Text>

//                       <TouchableOpacity onPress={() => this.onClickPlusIcon()}>
//                         <Plus />
//                       </TouchableOpacity>
//                     </View>
//                   </View>

//                   {/* <View style={{flexDirection: 'row',marginLeft:'5%',marginTop:10,marginRight:'5%',height:20,alignItems:'center'}}>
//                   <Text style={{width:'35%',color:theme.colors.textColor}}>D/E</Text>
//               </View>

//               <DropDownPicker
//               placeholder="Export"
//               open={this.state.openState}
//               value={this.state.value}
//               items={this.state.items}
//               setOpen={this.setOpenState}
//               setValue={this.setValue}
//               setItems={this.setItemsState}
//               containerStyle={{height: 50,width:'90%',marginTop:15,marginLeft:'5%'}}
//               listMode="MODAL"
//               scrollViewProps={{
//                 decelerationRate: "fast"
//               }} /> */}

//                   <Button
//                     mode="contained"
//                     uppercase={false}
//                     contentStyle={{ height: 50 }}
//                     style={{ width: '90%', marginLeft: '5%', marginTop: 20 }}
//                     labelStyle={{
//                       fontFamily:'Poppins-SemiBold',
//                       fontSize: 16,
//                       color: 'white',
//                     }}
//                     onPress={() => this.onClickPostToSell()}>
//                     Post
//                   </Button>
//                 </View>
//               </ScrollView>
//             </View>
//           )}

//           {this.state.isSearchToSell && (
//             <View
//               style={{
//                 width: '100%',
//                 height: '86%',
//                 paddingBottom: 30,
//                 marginTop: 10,
//                 backgroundColor: 'white',
//                 borderTopLeftRadius: 20,
//                 borderTopRightRadius: 20,
//               }}>
//               <ScrollView>
//                 <View style={{ marginTop: 20 }}>
//                   {/* <DropDownPicker
//                     placeholder={this.state.dropdownPlaceholder}
//                     open={this.state.openState}
//                     value={this.state.value}
//                     items={this.state.items}
//                     setOpen={this.setOpenState}
//                     setValue={this.setValue}
//                     setItems={this.setItemsState}
//                     containerStyle={{
//                       height: 50,
//                       width: '90%',
//                       marginTop: 15,
//                       marginLeft: '5%',
//                     }}
//                     listMode="MODAL"
//                     onChangeValue={item => this.changeProduct(item)}
//                     scrollViewProps={{
//                       decelerationRate: 'fast',
//                     }}
//                   /> */}

//                   <View style={{ height: 50, width: '90%', marginTop: 15, marginLeft: '5%', }}>
//                     <SelectDropdown
//                       data={this.state.productItem}
//                       onSelect={(selectedItem, i) => {
//                         console.log(selectedItem)
//                         this.changeProduct(selectedItem)
//                         //this.addValues(selectedItem.label, el.label)
//                       }}

//                       buttonStyle={styles.dropdown3BtnStyle}
//                       renderCustomizedButtonChild={(selectedItem, index) => {
//                         return (
//                           <View style={styles.dropdown3BtnChildStyle}>
//                             <Text style={styles.dropdown3BtnTxt}>
//                               {selectedItem ? selectedItem.label : this.state.dropdownPlaceholder}
//                             </Text>
//                           </View>
//                         );
//                       }}
//                       renderDropdownIcon={() => {
//                         return (
//                           <FontAwesome name="chevron-down" color={"black"} size={14} style={{ marginRight: 20 }} />
//                         );
//                       }}
//                       dropdownIconPosition={"right"}

//                       dropdownStyle={styles.dropdown3DropdownStyle}
//                       rowStyle={styles.dropdown3RowStyle}
//                       renderCustomizedRowChild={(item, index) => {
//                         return (
//                           <View style={styles.dropdown3RowChildStyle}>

//                             <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
//                           </View>
//                         );
//                       }}
//                     /></View>

//                   {this.crateProductAttributeUI()}

//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       marginLeft: '5%',
//                       marginTop: 10,
//                       marginRight: '5%',
//                       height: 50,
//                       alignItems: 'center',
//                     }}>
//                     <Text style={{ width: '35%', color: theme.colors.textColor,fontFamily:'Poppins-SemiBold' }}>
//                       Sale bales
//                     </Text>

//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         width: '65%',
//                         height: '100%',
//                         alignItems: 'center',
//                       }}>
//                       <TouchableOpacity onPress={() => this.onClickMinusIcon()}>
//                         <Minus />
//                       </TouchableOpacity>

//                       <Text
//                         style={{
//                           width: '45%',
//                           textAlign: 'center',
//                           textAlignVertical: 'center',
//                           height: '100%',
//                           color: theme.colors.textColor,
//                           fontFamily:'Poppins-SemiBold'
//                         }}>
//                         {this.state.displayBalesCount}
//                       </Text>

//                       <TouchableOpacity onPress={() => this.onClickPlusIcon()}>
//                         <Plus />
//                       </TouchableOpacity>

//                     </View>

//                   </View>
//                   <Text style={{ width: '35%', color: theme.colors.textColor, left: '6%',fontFamily:'Poppins-Medium' }}>
//                     D/E
//                   </Text>
//                   {/* <DropDownPicker
//                     placeholder={'Domestic'}
//                     open={this.state.deOpenState}
//                     value={this.state.deValue}
//                     items={this.state.deList}
//                     setOpen={this.setDEOpenState}
//                     setValue={this.setDEValue}
//                     setItems={this.setDEItemsState}
//                     containerStyle={{
//                       height: 50,
//                       width: '90%',
//                       marginTop: 5,
//                       marginLeft: '5%',
//                     }}
//                     listMode="MODAL"
//                     onChangeValue={item => this.setState({deName:item})}
//                     scrollViewProps={{
//                       decelerationRate: 'fast',
//                     }}
//                   /> */}
//                   <View style={{ height: 50, width: '90%', marginTop: 5, marginLeft: '5%', }}>
//                     <SelectDropdown
//                       data={this.state.deList}
//                       onSelect={(selectedItem, i) => {
//                         console.log(selectedItem)
//                         this.setDEFlages(selectedItem)
//                         //this.addValues(selectedItem.label, el.label)
//                       }}

//                       buttonStyle={styles.dropdown3BtnStyle}
//                       renderCustomizedButtonChild={(selectedItem, index) => {
//                         return (
//                           <View style={styles.dropdown3BtnChildStyle}>
//                             <Text style={styles.dropdown3BtnTxt}>
//                               {selectedItem ? selectedItem.label : this.state.deName}
//                             </Text>
//                           </View>
//                         );
//                       }}
//                       renderDropdownIcon={() => {
//                         return (
//                           <FontAwesome name="chevron-down" color={"black"} size={14} style={{ marginRight: 20 }} />
//                         );
//                       }}
//                       dropdownIconPosition={"right"}

//                       dropdownStyle={styles.dropdown3DropdownStyle}
//                       rowStyle={styles.dropdown3RowStyle}
//                       renderCustomizedRowChild={(item, index) => {
//                         return (
//                           <View style={styles.dropdown3RowChildStyle}>

//                             <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
//                           </View>
//                         );
//                       }}
//                     /></View>
//                   <Button
//                     mode="contained"
//                     uppercase={false}
//                     contentStyle={{ height: 50 }}
//                     style={{ width: '90%', marginLeft: '5%', marginTop: 20 }}
//                     labelStyle={{
//                       fontFamily:'Poppins-SemiBold',
//                       fontSize: 16,
//                       color: 'white',
//                     }}
//                     onPress={() => this.onClickSearch()}>
//                     Search
//                   </Button>
//                 </View>
//               </ScrollView>
//             </View>
//           )}

//           {this.state.isNotificationToBuyer && (
//             <View style={{ width: '100%', height: '86%', paddingBottom: 30, marginTop: 10, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

//               <ScrollView>
//                 <View style={{ marginTop: 20 }}>

//                   {/* <DropDownPicker
//               placeholder="Shankar 6"
//               open={this.state.openState}
//               value={this.state.value}
//               items={this.state.productItem}
//               setOpen={this.setOpenState}
//               setValue={this.setValue}
//               setItems={this.setItemsState}
//               containerStyle={{height: 50,width:'90%',marginTop:15,marginLeft:'5%'}}
//               listMode="MODAL"
//               onChangeValue={item => this.changeProduct(item)}
//               scrollViewProps={{
//                 decelerationRate: "fast"
//               }} /> */}

//                   <View style={{ height: 50, width: '90%', marginTop: 15, marginLeft: '5%', }}>
//                     <SelectDropdown
//                       data={this.state.productItem}
//                       onSelect={(selectedItem, i) => {
//                         console.log(selectedItem)
//                         this.changeProduct(selectedItem)
//                         //this.addValues(selectedItem.label, el.label)
//                       }}

//                       buttonStyle={styles.dropdown3BtnStyle}
//                       renderCustomizedButtonChild={(selectedItem, index) => {
//                         return (
//                           <View style={styles.dropdown3BtnChildStyle}>
//                             <Text style={styles.dropdown3BtnTxt}>
//                               {selectedItem ? selectedItem.label : this.state.dropdownPlaceholder}
//                             </Text>
//                           </View>
//                         );
//                       }}
//                       renderDropdownIcon={() => {
//                         return (
//                           <FontAwesome name="chevron-down" color={"black"} size={14} style={{ marginRight: 20 }} />
//                         );
//                       }}
//                       dropdownIconPosition={"right"}

//                       dropdownStyle={styles.dropdown3DropdownStyle}
//                       rowStyle={styles.dropdown3RowStyle}
//                       renderCustomizedRowChild={(item, index) => {
//                         return (
//                           <View style={styles.dropdown3RowChildStyle}>

//                             <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
//                           </View>
//                         );
//                       }}
//                     /></View>

//                   {this.crateProductAttributeUI()}

//                   <View style={{ flexDirection: 'row', marginLeft: '5%', marginTop: 10, marginRight: '5%', height: 50,
//                    alignItems: 'center' }}>


//                     <Text style={{ width: '35%', color: theme.colors.textColor, fontFamily:'Poppins-SemiBold' }}>Price</Text>

//                     <View style={{ width: '65%', alignItems: 'center', justifyContent: 'center' }}>

//                       <TextInput
//                         style={{ width: '100%', height: 46, fontWeight: 'bold', backgroundColor: '#fff' }}
//                         label=""
//                         autoFocus={this.state.balespriceFocus}
//                         returnKeyType="next"
//                         maxLength={6}
//                         onChangeText={text => this.onChanged(text)}
//                         value={this.state.balesPrice}
//                         error={!!this.state.balesPriceError}
//                         errorText={this.state.balesPriceError}
//                         autoCapitalize="none"
//                         autoCompleteType="off"
//                         textContentType="none"
//                         keyboardType="numeric"
//                       />
//                     </View>
//                   </View>

//                   <View style={{ flexDirection: 'row', marginLeft: '5%', marginTop: 10, marginRight: '5%', height: 50, alignItems: 'center' }}>

//                     <Text style={{ width: '35%', color: theme.colors.textColor,fontFamily:'Poppins-SemiBold' }}>Sale bales</Text>

//                     <View style={{ flexDirection: 'row', width: '65%', height: '100%', alignItems: 'center' }}>

//                       <TouchableOpacity onPress={() => this.onClickMinusPTB()}>
//                         <MinusRound source={require('../assets/ic_me_512.png')} style={{
//                           width: 30,
//                           height: 30,
//                           marginLeft: 10,
//                           marginRight: 5
//                         }} />
//                       </TouchableOpacity>

//                       <Text style={{
//                         width: '45%',
//                         textAlign: 'center',
//                         textAlignVertical: 'center',
//                         height: '100%',
//                         color: theme.colors.textColor,
//                         fontFamily:'Poppins-SemiBold'
//                       }}>{this.state.displayBalesCount}</Text>

//                       <TouchableOpacity onPress={() => this.onClickPlusPTB()}>
//                         <PlusRound style={{
//                           width: 30,
//                           height: 30,
//                           marginLeft: 5, marginRight: 10
//                         }} />
//                       </TouchableOpacity>

//                     </View>
//                   </View>

//                   {/* <View style={{ flexDirection: 'row', marginLeft: '5%', marginTop: 10, marginRight: '5%', height: 20, alignItems: 'center' }}>
//                     <Text style={{ width: '35%', color: theme.colors.textColor ,fontFamily:'Poppins-Medium'}}>D/E</Text>
//                   </View> */}

//                   {/* <DropDownPicker
//                 placeholder={'Domestic'}
//                 open={this.state.deOpenState}
//                 value={this.state.deValue}
//                 items={this.state.deList}
//                 setOpen={this.setDEOpenState}
//                 setValue={this.setDEValue}
//                 setItems={this.setDEItemsState}
//                 containerStyle={{
//                   height: 50,
//                   width: '90%',
//                   marginTop: 5,
//                   marginLeft: '5%',
//                 }}
//                 listMode="MODAL"
//                 onChangeValue={item => this.setDEFlages(item)}
//                 scrollViewProps={{
//                   decelerationRate: 'fast',
//                 }}
//               /> */}
//                   {/* <View style={{ height: 50, width: '90%', marginTop: 15, marginLeft: '5%', }}>
//                     <SelectDropdown
//                       data={this.state.deList}
//                       onSelect={(selectedItem, i) => {
//                         console.log(selectedItem)
//                         this.setDEFlages(selectedItem)
//                         //this.addValues(selectedItem.label, el.label)
//                       }}

//                       buttonStyle={styles.dropdown3BtnStyle}
//                       renderCustomizedButtonChild={(selectedItem, index) => {
//                         return (
//                           <View style={styles.dropdown3BtnChildStyle}>
//                             <Text style={styles.dropdown3BtnTxt}>
//                               {selectedItem ? selectedItem.label : this.state.deName}
//                             </Text>
//                           </View>
//                         );
//                       }}
//                       renderDropdownIcon={() => {
//                         return (
//                           <FontAwesome name="chevron-down" color={"black"} size={14} style={{ marginRight: 20 }} />
//                         );
//                       }}
//                       dropdownIconPosition={"right"}

//                       dropdownStyle={styles.dropdown3DropdownStyle}
//                       rowStyle={styles.dropdown3RowStyle}
//                       renderCustomizedRowChild={(item, index) => {
//                         return (
//                           <View style={styles.dropdown3RowChildStyle}>

//                             <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
//                           </View>
//                         );
//                       }}
//                     /></View> */}
//                   {this.state.isShowBuyForDrpDown && <View>
//                     {/* <View style={{ flexDirection: 'row', marginLeft: '5%', marginTop: 10, marginRight: '5%', height: 20, alignItems: 'center' }}>
//                       <Text style={{ width: '35%', color: theme.colors.textColor,fontFamily:'Poppins-Medium' }}>Buy For</Text>
//                     </View> */}
//                     {/* <DropDownPicker
//                 placeholder={'Self'}
//                 open={this.state.buyForOpenState}
//                 value={this.state.buyForValue}
//                 items={this.state.buyForList}
//                 setOpen={this.setBuyForOpenState}
//                 setValue={this.setBuyForValue}
//                 setItems={this.setBuyForItemsState}
//                 containerStyle={{
//                   height: 50,
//                   width: '90%',
//                   marginTop: 5,
//                   marginLeft: '5%',
//                 }}
//                 listMode="MODAL"
//                 onChangeValue={item => this.setSpinningnameFlages(item)}
//                 scrollViewProps={{
//                   decelerationRate: 'fast',
//                 }}
//               /> */}
//                     {/* <View style={{ height: 50, width: '90%', marginTop: 15, marginLeft: '5%', }}>
//                       <SelectDropdown
//                         data={this.state.buyForList}
//                         onSelect={(selectedItem, i) => {
//                           console.log(selectedItem)
//                           this.setSpinningnameFlages(selectedItem)
//                           //this.addValues(selectedItem.label, el.label)
//                         }}

//                         buttonStyle={styles.dropdown3BtnStyle}
//                         renderCustomizedButtonChild={(selectedItem, index) => {
//                           return (
//                             <View style={styles.dropdown3BtnChildStyle}>
//                               <Text style={styles.dropdown3BtnTxt}>
//                                 {selectedItem ? selectedItem.label : this.state.buyForDropDownValue}
//                               </Text>
//                             </View>
//                           );
//                         }}
//                         renderDropdownIcon={() => {
//                           return (
//                             <FontAwesome name="chevron-down" color={"black"} size={14} style={{ marginRight: 20 }} />
//                           );
//                         }}
//                         dropdownIconPosition={"right"}

//                         dropdownStyle={styles.dropdown3DropdownStyle}
//                         rowStyle={styles.dropdown3RowStyle}
//                         renderCustomizedRowChild={(item, index) => {
//                           return (
//                             <View style={styles.dropdown3RowChildStyle}>

//                               <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
//                             </View>
//                           );
//                         }}
//                       /></View> */}
//                   </View>
//                   }
//                   {this.state.isShowSpinningName && <View>
//                     <View style={{ flexDirection: 'row', marginLeft: '5%', marginTop: 5, marginRight: '5%', alignItems: 'center' }}>
//                       <TextInput
//                         style={{ width: '100%', height: 46, fontWeight: 'bold', backgroundColor: '#fff' }}
//                         label=""
//                         placeholder="Spinning Mill Name"
//                         returnKeyType="next"
//                         onChangeText={text => this.setState({ txtSpinningMillName: text })}
//                         value={this.state.txtSpinningMillName}
//                         autoCapitalize="none"
//                         autoCompleteType="off"
//                         textContentType="none"
//                       />
//                     </View>
//                   </View>
//                   }


//                   <Button mode="contained"
//                     uppercase={false}
//                     contentStyle={{ height: 50 }}
//                     style={{ width: '90%', marginLeft: '5%', marginTop: 20 }}
//                     labelStyle={{ fontFamily:'Poppins-SemiBold', fontSize: 16, color: 'white' }}
//                     onPress={() => this.onClickSelectSeller()}>
//                     Select Buyer
//                   </Button>


//                 </View>

//               </ScrollView>


//             </View>)}

//           {this.state.isMyPost && (
//             <View
//               style={{
//                 width: '100%',
//                 height: '86%',
//                 paddingBottom: 30,
//                 marginTop: 10,
//                 backgroundColor: 'white',
//                 borderTopLeftRadius: 20,
//                 borderTopRightRadius: 20,
//               }}>
//               <ScrollView>
//                 <View style={{ marginTop: 20 }}>
//                   <View style={styles.container}>
//                     <View style={this.state.btnActiveContainer}>
//                       <TouchableOpacity onPress={() => this.onClickActive()}>
//                         <Button
//                           mode="text"
//                           uppercase={false}
//                           color={this.state.btnActiveTextColor}
//                           labelStyle={{ fontSize: 14,fontFamily:'Poppins-Regular' }}>
//                           Active
//                         </Button>
//                       </TouchableOpacity>
//                     </View>

//                     <View style={this.state.btnCompletedContainer}>
//                       <TouchableOpacity onPress={() => this.onClickCompleted()}>
//                         <Button
//                           mode="text"
//                           uppercase={false}
//                           color={this.state.btnCompletedTextColor}
//                           labelStyle={{ fontSize: 14,fontFamily:'Poppins-Regular' }}>
//                           Completed
//                         </Button>
//                       </TouchableOpacity>
//                     </View>
//                   </View>

//                   {this.createMyPostUI()}
//                   {this.createMyPostCompletedUI()}
//                 </View>
//               </ScrollView>
//             </View>
//           )}

//           {this.state.isDashboard && (
//             <View
//               style={{
//                 width: '100%',
//                 height: '86%',
//                 paddingBottom: 30,
//                 marginTop: 10,
//                 backgroundColor: 'white',
//                 borderTopLeftRadius: 20,
//                 borderTopRightRadius: 20,
//               }}>
//               <ScrollView>
//                 <View style={{ marginTop: 20 }}>
//                   <View
//                     style={{
//                       marginRight: 20,
//                       marginLeft: 20,
//                       flexDirection: 'row',
//                       flex: 1,
//                     }}>
//                     <View style={styles.btnCompletedContainer}>
//                       <TouchableOpacity onPress={() => this.onClickActive()}>
//                         <Button
//                           mode="text"
//                           uppercase={false}
//                           color="gray"
//                           labelStyle={{ fontSize: 14,fontFamily: "Poppins-SemiBold" }}>
//                           My Favourite
//                         </Button>
//                       </TouchableOpacity>
//                     </View>

//                     <View style={styles.btnActiveContainer}>
//                       <TouchableOpacity onPress={() => this.onClickCompleted()}>
//                         <Button
//                           mode="text"
//                           uppercase={false}
//                           color={theme.colors.primary}
//                           labelStyle={{ fontSize: 14,fontFamily: "Poppins-SemiBold" }}>
//                           Deals
//                         </Button>
//                       </TouchableOpacity>
//                     </View>
//                   </View>

//                   <View style={styles.dealTopMainContainer}>
//                     <View style={this.state.dealTabStyle1}>
//                       <TouchableOpacity
//                         onPress={() => this.onClickNegotiation()}>
//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={this.state.dealTabTextBox1}>
//                           In Negotiation
//                         </Text>
//                       </TouchableOpacity>
//                     </View>

//                     <View style={this.state.dealTabStyle2}>
//                       <TouchableOpacity
//                         onPress={() => this.onClickNotification()}>
//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={this.state.dealTabTextBox2}>
//                           Notification
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>

//                   {this.state.dealTabStyle1.backgroundColor == '#69BA53' && (
//                     // {this.createDashboardInNegotiationListUI()}
//                     <View>
//                       {this.createDashboardInNegotiationListUI()}
//                     </View>
//                   )}

//                   {this.state.dealTabStyle2.backgroundColor == '#69BA53' && (
//                     <View>
//                       {this.createDashboardNotificationListUI()}
//                     </View>
//                   )}

//                   {/* {this.state.dealTabStyle1.backgroundColor == '#69BA53' && (
                    
//                   )} */}

//                   {/*{this.state.dealTabStyle1.backgroundColor == '#69BA53' && (
//                     <View style={{flexDirection: 'row', width: '100%'}}>
//                       <View
//                         style={{
//                           flex: 1,
//                           marginLeft: '5%',
//                           marginRight: '5%',
//                           height: 40,
//                         }}>
//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             flex: 1,
//                             marginTop: 18,
//                             color: theme.colors.textColor,
//                             fontSize: 16,
//                             textAlignVertical: 'center',
//                           }}>
//                           Shankar6
//                         </Text>
//                       </View>

//                       <View
//                         style={{
//                           flex: 1,
//                           marginLeft: '5%',
//                           marginTop: 10,
//                           marginRight: '5%',
//                           height: 40,
//                         }}>
//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             flex: 1,
//                             color: theme.colors.textColor,
//                             fontSize: 12,
//                             opacity: 0.5,
//                             textAlignVertical: 'center',
//                           }}>
//                           Prev
//                         </Text>

//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             flex: 1,
//                             color: theme.colors.textColor,
//                             fontSize: 12,
//                             textAlignVertical: 'center',
//                           }}>
//                           ₹ 47000 (300)
//                         </Text>
//                       </View>

//                       <View
//                         style={{
//                           flex: 1.2,
//                           width: '100%',
//                           marginLeft: '1%',
//                           marginTop: 10,
//                           marginRight: '5%',
//                           height: 35,
//                         }}>
//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             width: '100%',
//                             height: '100%',
//                             fontSize: 10,
//                             textAlign: 'center',
//                             alignItems: 'center',
//                             color: '#69BA53',
//                             borderRadius: 5,

//                             textAlignVertical: 'center',
//                           }}>
//                           10 Negotiation
//                         </Text>
//                       </View>
//                     </View>
//                   )}

//                   {this.state.dealTabStyle1.backgroundColor == '#69BA53' && (
//                     <View style={{flexDirection: 'row', width: '100%'}}>
//                       <View
//                         style={{
//                           flex: 1,
//                           marginLeft: '5%',
//                           marginTop: 10,
//                           marginRight: '5%',
//                           height: 40,
//                         }}>
//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             flex: 1,
//                             color: theme.colors.textColor,
//                             fontSize: 12,
//                             opacity: 0.5,
//                             textAlignVertical: 'center',
//                           }}>
//                           Best Deal
//                         </Text>

//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             flex: 1,
//                             color: theme.colors.textColor,
//                             fontSize: 12,
//                             textAlignVertical: 'center',
//                           }}>
//                           John Deo
//                         </Text>
//                       </View>

//                       <View
//                         style={{
//                           flex: 1,
//                           marginLeft: '5%',
//                           marginTop: 10,
//                           marginRight: '5%',
//                           height: 40,
//                         }}>
//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             flex: 1,
//                             color: theme.colors.textColor,
//                             fontSize: 12,
//                             opacity: 0.5,
//                             textAlignVertical: 'center',
//                           }}>
//                           Base
//                         </Text>

//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             flex: 1,
//                             color: theme.colors.textColor,
//                             fontSize: 12,
//                             textAlignVertical: 'center',
//                           }}>
//                           ₹ 46000(200)
//                         </Text>
//                       </View>

//                       <View
//                         style={{
//                           flex: 1,
//                           marginLeft: '5%',
//                           marginTop: 10,
//                           marginRight: '5%',
//                           height: 40,
//                         }}>
//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             flex: 1,
//                             color: theme.colors.textColor,
//                             fontSize: 12,
//                             fontWeight: 'bold',

//                             textAlignVertical: 'center',
//                           }}>
//                           Deal
//                         </Text>

//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             flex: 1,
//                             color: theme.colors.textColor,
//                             fontSize: 12,
//                             fontWeight: 'bold',
//                             textAlignVertical: 'center',
//                           }}>
//                           ₹ 46000(200)
//                         </Text>
//                       </View>
//                     </View>
//                         )}*/}




//                 </View>
//               </ScrollView>
//             </View>
//           )}
//           {this.state.isNewsFeed && (
//             <View
//               style={{
//                 width: '100%',
//                 height: '86%',
//                 paddingBottom: 30,
//                 paddingTop: 20,
//                 marginTop: 20,
//                 backgroundColor: 'white',
//                 borderTopLeftRadius: 20,
//                 borderTopRightRadius: 20,
//               }}>
//               <NewsFeedView Props={this.props} />

//               {/* <PostedScreen Props={this.state.ProfileData} /> */}


//               {/* <Wallet Props={this.props} /> */}

//             </View>)}
//           {this.state.isCalculator && (
//             <View
//               style={{
//                 width: '100%',
//                 height: '86%',
//                 paddingBottom: 30,
//                 marginTop: 10,
//                 backgroundColor: 'white',
//                 borderTopLeftRadius: 20,
//                 borderTopRightRadius: 20,
//               }}>
//               <CalculatorView />
//             </View>
//           )}
//           {this.state.isWallet && (
//             <View
//               style={{
//                 width: '100%',
//                 height: '86%',
//                 paddingBottom: 30,
//                 marginTop: 10,
//                 backgroundColor: 'white',
//                 borderTopLeftRadius: 20,
//                 borderTopRightRadius: 20,
//               }}>
//               <Wallet Props={this.props} />
//             </View>
//           )}
//           {this.state.isProfile && (
//             <View
//               style={{
//                 width: '100%',
//                 height: '86%',
//                 paddingBottom: 30,
//                 paddingTop: 20,
//                 marginTop: 20,
//                 backgroundColor: 'white',
//                 borderTopLeftRadius: 20,
//                 borderTopRightRadius: 20,
//               }}>
//               {/* <NewsFeedView Props={this.props} /> */}
//               <Profile Props={this.state.ProfileData} />
//               {/* <PostedScreen Props={this.state.ProfileData} /> */}


//               {/* <Wallet Props={this.props} /> */}

//             </View>)}

//           {this.state.isMyContracts && (
//             <View
//               style={{
//                 width: '100%',
//                 height: '86%',
//                 paddingBottom: 30,
//                 marginTop: 10,
//                 backgroundColor: 'white',
//                 borderTopLeftRadius: 20,
//                 borderTopRightRadius: 20,
//               }}>
//               <ScrollView
//                 // refreshControl={
//                 //   <RefreshControl
//                 //     refreshing={this.state.refreshing}
//                 //     onRefresh={this._onRefresh}
//                 //   />
//                 // }
//                 >
//                 <View style={{ marginTop: 20 }}>
//                   {this.createMyContractUI()}
//                 </View>
//               </ScrollView>
//             </View>
//           )}
//         </View>

//         {this.state.isMenuOpen && (
//           <View
//             style={{
//               width: '100%',
//               height: '100%',
//               backgroundColor: theme.colors.blackBG,
//             }}>
//             <TouchableOpacity onPress={() => this.onClickHomeClose()}>
//               <Icon
//                 name="close"
//                 size={30}
//                 color="white"
//                 style={{
//                   width: 30,
//                   height: 30,
//                   marginTop: '10%',
//                   marginLeft: '5%',
//                 }}
//               />
//             </TouchableOpacity>

//             <View style={styles.container2}>
//               <ScrollView showsVerticalScrollIndicator={false}
//                 showsHorizontalScrollIndicator={false}>
//                 <TouchableOpacity onPress={() => this.onClickHome()}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '10%',
//                       paddingLeft: '5%',
//                       alignItems: 'center',
//                     }}>
//                     <Home />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal', height: 20 }}>
//                       Home
//                     </Button>
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={() => this.onClickPostToBuy()}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '4%',
//                       paddingLeft: '5%',
//                       alignItems: 'center',
//                     }}>
//                     {/* <Icon name="home" size={20} color="black" style={{ width: 20,
//             height: 20,
//             }} /> */}
//                     <PostToSell_Icon />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal' }}>
//                       Post to sell
//                     </Button>
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={() => this.onClickSearchToBuy()}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '4%',
//                       paddingLeft: '5%',
//                       alignItems: 'center',
//                     }}>
//                     <SearchToSell_Icon />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal' }}>
//                       Search Buyer
//                     </Button>
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={() => this.onClickNotificationToSeller()}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '4%',
//                       paddingLeft: '5%',
//                       alignItems: 'center',
//                     }}>
//                     <NotificationToBuyer_Icon />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal' }}>
//                       Notification to buyer
//                     </Button>
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={() => this.onClickMyPost()}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '4%',
//                       paddingLeft: '5%',
//                       alignItems: 'center',
//                     }}>
//                     <MyPost_Icon />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal' }}>
//                       My Post
//                     </Button>
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={() => this.onClickMyContracts()}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '4%',
//                       paddingLeft: '5%',
//                       alignItems: 'center',
//                     }}>
//                     <MyContracts_Icon />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal' }}>
//                       My Contracts
//                     </Button>
//                   </View>
//                 </TouchableOpacity>

//                 {/* <TouchableOpacity onPress={() => this.onClickLogout()}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '4%',
//                       paddingLeft: '5%',
//                       alignItems: 'center',
//                     }}>
//                     <Logout_Icon />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal' }}>
//                       Brokers
//                     </Button>
//                   </View>
//                 </TouchableOpacity> */}

//                 <TouchableOpacity
//                 /*onPress={() => this.onClickNotificationToSeller()}*/>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '4%',
//                       paddingLeft: '5%',
//                       alignItems: 'center',
//                     }}>
//                     <Reports_Icon />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal' }}>
//                       Reports
//                     </Button>
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                 /*onPress={() => this.onClickNotificationToSeller()}*/>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '4%',
//                       paddingLeft: '5%',
//                       alignItems: 'center',
//                     }}>
//                     <TransactionTracking_Icon />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal' }}>
//                       Transaction Tracking
//                     </Button>
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                 /*onPress={() => this.onClickNotificationToSeller()}*/>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '4%',
//                       paddingLeft: '5%',
//                       alignItems: 'center',
//                     }}>
//                     <History_Icon />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal' }}>
//                       History
//                     </Button>
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={() => this.onclickNewsFeed()}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '4%',
//                       paddingLeft: '5%',
//                       alignItems: 'center',
//                     }}>
//                     <Newsfeed_Icon />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal' }}>
//                       News Feed
//                     </Button>
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                 /*onPress={() => this.onClickNotificationToSeller()}*/>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '4%',
//                       paddingLeft: '7%',
//                       alignItems: 'center',
//                     }}>
//                     <MCX_Icon />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal' }}>
//                       MCX
//                     </Button>
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={() => this.props.navigation.navigate('Calculator')}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '4%',
//                       paddingLeft: '5%',
//                       alignItems: 'center',
//                     }}>
//                     <Calculator_Icon />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal' }}>
//                       Calculator
//                     </Button>
//                   </View>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => this.onClickWallet()}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '4%',
//                       paddingLeft: '5%',
//                       alignItems: 'center',
//                     }}>
//                     <Profile_Icon />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal' }}>
//                       Wallet
//                     </Button>
//                   </View>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => this.onClickProfile()}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '4%',
//                       paddingLeft: '5%',
//                       alignItems: 'center',
//                     }}>
//                     <Profile_Icon />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal' }}>
//                       Profile
//                     </Button>
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={() => this.onClickNotificationToSeller()}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '4%',
//                       paddingLeft: '5%',
//                       alignItems: 'center',
//                     }}>
//                     <ChangePassword_Icon />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal' }}>
//                       Change Password
//                     </Button>
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={() => this.onClickLogout()}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       paddingTop: '4%',
//                       paddingLeft: '5%',
//                       alignItems: 'center',
//                     }}>
//                     <Logout_Icon />
//                     <Button
//                       mode="text"
//                       uppercase={false}
//                       color={theme.colors.blackBG}
//                       labelStyle={{ fontWeight: 'normal' }}>
//                       Logout
//                     </Button>
//                   </View>
//                 </TouchableOpacity>
//               </ScrollView>
//             </View>
//           </View>
//         )}
//       </Background>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     top: 0,
//   },
//   container2: {
//     marginTop: '2%',
//     width: '90%',
//     height: '86%',
//     marginLeft: '5%',
//     marginRight: '5%',
//     backgroundColor: 'white',
//     borderColor: 'white',
//     borderWidth: 1,
//     borderRadius: 20,
//     alignItems: 'flex-start',
//   },
//   btnActiveContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomWidth: 2,
//     borderBottomColor: theme.colors.primary,
//   },
//   btnCompletedContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//     opacity: 0.5,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomWidth: 2,
//     borderBottomColor: '#57a3f5',
//     marginLeft: 1,
//   },
//   buttonContainer2: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 1,
//     marginRight: 1,
//     opacity: 0.4,
//   },
//   spinnerTextStyle: {
//     color: '#000',
//   },
//   module_parent_view: {
//     width: '100%',
//   },
//   module_label_header: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     justifyContent: 'center',
//     color: '#2DA3FC',
//   },
//   module_card2: {
//     height: 70,
//     width: '90%',
//     position: 'absolute',
//     backgroundColor: 'white',
//     borderRadius: 35,
//     borderColor: '#57a3f5',
//     borderWidth: 1,
//     elevation: 5,
//     alignItems: 'center',
//     alignSelf: 'center',
//     top: 80,
//   },
//   allbid: {
//     flexDirection: 'row',
//     marginLeft: '5%',
//     marginTop: '5%',
//   },
//   bidedItem: {
//     height: 120,
//     width: '90%',
//     backgroundColor: 'white',
//     borderRadius: 0,
//     borderColor: '#57a3f5',
//     borderWidth: 1,
//     elevation: 5,
//     marginLeft: '5%',
//     marginTop: 15,
//     flexDirection: 'row',
//   },
//   bidedProduct: {
//     width: '60%',
//     height: '85%',
//     marginLeft: '2%',
//     marginTop: '3%',
//     alignItems: 'flex-start',
//   },
//   bidedQuantity: {
//     width: '35%',
//     height: '85%',
//     marginTop: '3%',
//     textAlign: 'center',
//     alignItems: 'center',
//     textAlignVertical: 'center',
//   },

//   titleText: {
//     flex: 1,
//     color: '#2DA3FC',
//     fontWeight: 'bold',
//   },
//   allbidValue: {
//     flexDirection: 'row',
//     marginLeft: '5%',
//     marginTop: '1%',
//   },
//   titleTextValue: {
//     flex: 1,
//     color: '#2DA3FC',
//     fontSize: 12,
//   },
//   scrollViewStyle: {
//     width: '100%',
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   dealTopMainContainer: {
//     flexDirection: 'row',
//     top: 0,
//     marginLeft: '5%',
//     marginRight: '5%',
//   },

//   dealBtnEnable: {
//     flex: 1,
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#69BA53',
//     marginLeft: 0,
//     marginRight: 5,
//     marginTop: 10,
//     borderRadius: 5,
//   },
//   dealBtnDisable: {
//     flex: 1,
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F0F5F9',
//     marginLeft: 5,
//     marginRight: 0,
//     marginTop: 10,
//     borderRadius: 5,
//   },
//   dealTopBoxTextView: {
//     height: 40,
//     width: '100%',
//     textAlign: 'center',
//     alignItems: 'center',
//     textAlignVertical: 'center',
//     color: 'white',
//   },
//   dealTopBoxTextViewDisable: {
//     height: 40,
//     width: '100%',
//     textAlign: 'center',
//     alignItems: 'center',
//     textAlignVertical: 'center',
//     color: '#343434',
//   },
//   dropdown3BtnStyle: {
//     width: "100%",
//     height: 50,
//     backgroundColor: "#FFF",
//     paddingHorizontal: 0,
//     borderWidth: 1,
//     borderRadius: 4,
//     borderColor: "#444",
//     left: 0
//   },
//   dropdown3BtnChildStyle: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 0,
//   },
//   dropdown3BtnImage: { width: 45, height: 45, resizeMode: "cover" },
//   dropdown3BtnTxt: {
//     color: "black",
//     textAlign: "center",
//     fontSize: 14,
//     marginHorizontal: 0,
//     fontFamily:'Poppins-Regular'
//   },
//   dropdown3DropdownStyle: { backgroundColor: "white" },
//   dropdown3RowStyle: {
//     backgroundColor: "#fff",
//     borderBottomColor: "#444",
//     height: 50,
//   },
//   dropdown3RowChildStyle: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     paddingHorizontal: 0,
//   },
//   dropdownRowImage: { width: 45, height: 45, resizeMode: "cover" },
//   dropdown3RowTxt: {
//     color: "#000",
//     textAlign: "center",
//     fontSize: 16,
//     marginHorizontal: 0,
//     width: '100%',
//     fontFamily:'Poppins-Regular'
//   },
// });

// export default Dashboard;
