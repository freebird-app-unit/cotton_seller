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
  }
  componentDidMount() {
    console.log('hellow', this.props);
    this.getMyContracts();
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
            (arrDealDetails = el.deal_details),
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
                      onPress={() => this.onClickContractDetail(dd)}>
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
                          {dd.is_seller_otp_verify == 1 ?
                          (<TouchableOpacity
                            onPress={() => this.onClickDownload(dd.url)}>
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
                                fontFamily: 'Poppins-Regular',
                              }}>
                              Download
                            </Text>
                          </TouchableOpacity>) : (
                              <Text
                                onPress={() => this.setState({set:true})}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{
                                  // width: '100%',
                                  height: '100%',
                                  fontSize: 14,
                                  textAlign: 'center',
                                  alignItems: 'center',
                                  color: 'white',
                                  borderRadius: 5,
                                  backgroundColor: '#69BA53',
                                  textAlignVertical: 'center',
                                  fontFamily: 'Poppins-Regular',
                                }}>
                                Pending verification
                              </Text>
                          )

                          }
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
        // refreshControl={
        //   <RefreshControl
        //     refreshing={this.state.refreshing}
        //     onRefresh={this._onRefresh}
        //   />
        // }
        >
          <View style={{marginTop: 20}}>{this.createMyContractUI()}</View>
        </ScrollView>
      </View>
    );
  }
}
