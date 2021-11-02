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
  BackHandler,
} from 'react-native';
import {StackActions, useRoute} from '@react-navigation/native';
import {Appbar, Searchbar, Button, Badge} from 'react-native-paper';

import Spinner from 'react-native-loading-spinner-overlay';

import {theme} from '../core/theme';

import api_config from '../Api/api';
import axios from 'axios';

import defaultMessages from '../helpers/defaultMessages';

//svgs

import NoRecordsFound_Icon from '../assets/NoRecodsFound';

import EncryptedStorage from 'react-native-encrypted-storage';

import io from 'socket.io-client';
import styles from './Styles';
if (!window.location) {
  // App is running in simulator
  window.navigator.userAgent = 'ReactNative';
}
const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 5000,
  transports: ['websocket'], /// you need to explicitly tell it to use websockets
};

const socket = io.connect('http://165.232.181.91:3000/', connectionConfig); //live

import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../helpers/backHandler';
import {exitAlert} from '../helpers/customAlert';
import RNFetchBlob from 'rn-fetch-blob';
let backHandlerClickCount = 0;
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedPosition: 0,
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
      dropdownPlaceholder: '',
      balesCount: 100,
      displayBalesCount: 100,
      balesPrice: '',
      productJsonData: {},
      productAttributeList: {},
      myActivePost: {},
      arrNegotiationList: [],
      arrNotificationList: [],
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

    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      // Prevent default action
      this.setState({
        arrNegotiationList: [],
        arrNotificationList: [],
      });

      this.getNegotiationListData();
    });
  }

  componentWillUnmount() {
    this.setState({
      arrNegotiationList: [],
      arrNotificationList: [],
    });
    this.unsubscribe.remove();
    //BackHandler.remove();
  }

  getNegotiationListData = async () => {
    console.log('bringing data,', await EncryptedStorage.getItem('user_id'));
    try {
      var self = this;
      self.setState({
        seller_id: await EncryptedStorage.getItem('user_id'),
        spinner:true
            });
      let data = {
        seller_id: await EncryptedStorage.getItem('user_id'),
        offset: '0',
        limit: '5',
      };
      console.log("Negotiation request: " + JSON.stringify(data))
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      //console.log('data', JSON.stringify(formData));

      axios({
        url: api_config.BASE_URL + api_config.NEGOTIATION_LIST,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'cache-control': 'no-cache',
        },
      })
        .then(function (response) {
          // console.log('my negotiation list response :', JSON.stringify(response.data.data));
          self.setState({
            arrNegotiationList: [],
            spinner: false,
            refreshing: false

            // refreshing: false,

          });
          if (response.data.status == 200) {
            console.log(' response.data.data >> nagotiation', JSON.stringify(response.data));
            self.setState({arrNegotiationList: response.data.data});
          } else {
            console.log(response.data.message);
          }
        })
        .catch(function (error) {
          self.setState({
            spinner: false,
            refreshing: false,

            message: 'Something bad happened ' + error,
          }),
            alert('alert' + JSON.stringify(error));
        });
    } catch (error) {
      console.log('catch error', error);
    }
  };

  onClickWaitingForResponse = el => {
    //this.props.navigation.navigate('NegotiateDetails',{data:el,type:el.negotiation_type,post_id:el.post_notification_id,buyerId:el.buyer_id});
    this.props.navigation.navigate('NegotiateDetails', {
      data: el,
      type: el.negotiation_type,
      post_id: el.post_notification_id,
      buyerId: el.seller_buyer_id,
      prevScrName: 'Dashboard',
      cameFrom: 'Dashboard',
      Title: el.product_name,
    });
  };

  onClickMultipleNegotiation = el => {
    console.log('el', JSON.stringify(el));
    this.props.navigation.navigate('MultipleNegotiationList', {
      data: el,
      Title: el.product_name,
      prevScrName: 'HomeScreen',
    });
  };

  onClickRespond = el => {
    let data = {};
    if (el.negotiation_type == 'post') {
      data = {
        cameFrom: 'Negotiation',
        post_id: el.post_detail[0].post_notification_id,
        buyerId: el.post_detail[0].buyer_id,
        current_price: el.post_detail[0].current_price,
        current_no_of_bales: el.post_detail[0].current_no_of_bales,
        payment_condition: el.post_detail[0].payment_condition,
        transmit_condition: el.post_detail[0].transmit_condition,
        lab: el.post_detail[0].lab,
        type: el.negotiation_type,
      };
    } else {
      data = {
        cameFrom: 'Negotiation',
        post_id: el.notification_detail[0].post_notification_id,
        buyerId: el.notification_detail[0].buyer_id,
        current_price: el.notification_detail[0].current_price,
        current_no_of_bales: el.notification_detail[0].current_no_of_bales,
        payment_condition: el.notification_detail[0].payment_condition,
        transmit_condition: el.notification_detail[0].transmit_condition,
        lab: el.notification_detail[0].lab,
        type: el.negotiation_type,
      };
    }
    this.props.navigation.navigate('DealDetails', {
      data: data,
      cameFrom: 'Negotiation',
      Title: el.product_name,
      type: el.negotiation_type,
      prevScrName: 'Dashboard',
    });
  };

  createDashboardInNegotiationListUI = () => {
    try {
      // console.log(
      //   'Negotiation list: ' + JSON.stringify(this.state.arrNegotiationList),
      // );
      if (this.state.arrNegotiationList.length > 0) {
        return this.state.arrNegotiationList.map((el, i) => {
          // console.log('el', el);
          return (
            //alert(el.best_price),
            <View key={i}>
              {el.best_price === '' ? (
                <View>
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: '5%',
                        marginRight: '5%',
                        height: 40,
                      }}>
                      {el.negotiation_type == 'notification' ? (
                        <View
                          style={{
                            flex: 1,
                            height: 40,
                            marginLeft: '5%',
                            marginRight: '5%',
                          }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              flex: 1,
                              marginTop: 18,
                              color: theme.colors.textColor,
                              fontSize: 16,
                              textAlignVertical: 'center',
                              fontFamily: 'Poppins-Medium',
                            }}>
                            {el.product_name}
                          </Text>
                        </View>
                      ) : (
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            flex: 1,
                            marginTop: 18,
                            color: theme.colors.textColor,
                            fontSize: 16,
                            textAlignVertical: 'center',
                            fontFamily: 'Poppins-Medium',
                          }}>
                          {el.product_name}
                        </Text>
                      )}
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
                          opacity: 0.5,
                          textAlignVertical: 'center',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Prev
                      </Text>
                      {el.negotiation_type == 'notification' ? (
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
                          ₹ {el.notification_detail[0].prev_price} (
                          {el.notification_detail[0].prev_no_of_bales})
                        </Text>
                      ) : (
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
                          ₹ {el.post_detail[0].prev_price} (
                          {el.post_detail[0].prev_no_of_bales})
                        </Text>
                      )}
                    </View>

                    {el.negotiation_type == 'notification' ? (
                      el.notification_detail[0].negotiation_by == 'seller' ? (
                        <View
                          style={{
                            flex: 1.2,
                            width: '100%',
                            marginLeft: '1%',
                            marginTop: 10,
                            marginRight: '5%',
                            height: 35,
                          }}>
                          <TouchableOpacity
                            onPress={() => this.onClickWaitingForResponse(el)}>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{
                                width: '100%',
                                height: '100%',
                                fontSize: 10,
                                textAlign: 'center',
                                alignItems: 'center',
                                color: '#69BA53',
                                borderRadius: 5,
                                textAlignVertical: 'center',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              Waiting for response
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View
                          style={{
                            flex: 1,
                            width: '100%',
                            marginLeft: '5%',
                            marginTop: 10,
                            marginRight: '5%',
                            height: 35,
                          }}>
                          <TouchableOpacity
                            onPress={() => this.onClickRespond(el)}>
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
                              Respond
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )
                    ) : el.post_detail[0].negotiation_by == 'seller' ? (
                      <View
                        style={{
                          flex: 1.2,
                          width: '100%',
                          marginLeft: '1%',
                          marginTop: 10,
                          marginRight: '5%',
                          height: 35,
                        }}>
                        <TouchableOpacity
                          onPress={() => this.onClickWaitingForResponse(el)}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              width: '100%',
                              height: '100%',
                              fontSize: 10,
                              textAlign: 'center',
                              alignItems: 'center',
                              color: '#69BA53',
                              borderRadius: 5,
                              textAlignVertical: 'center',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            Waiting for response
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          width: '100%',
                          marginLeft: '5%',
                          marginTop: 10,
                          marginRight: '5%',
                          height: 35,
                        }}>
                        <TouchableOpacity
                          onPress={() => this.onClickRespond(el)}>
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
                            Respond
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
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
                        Posted by
                      </Text>

                      {el.negotiation_type == 'notification' ? (
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
                          {el.name}
                        </Text>
                      ) : (
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
                          {el.name}
                        </Text>
                      )}
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
                          textAlignVertical: 'center',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        New
                      </Text>
                      {el.negotiation_type == 'notification' ? (
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            flex: 1,
                            color: theme.colors.textColor,
                            fontSize: 12,
                            fontWeight: 'bold',
                            textAlignVertical: 'center',
                            fontFamily: 'Poppins-SemiBold',
                          }}>
                          ₹ {el.notification_detail[0].current_price} (
                          {el.notification_detail[0].current_no_of_bales})
                        </Text>
                      ) : (
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            flex: 1,
                            color: theme.colors.textColor,
                            fontSize: 12,
                            fontWeight: 'bold',
                            textAlignVertical: 'center',
                            fontFamily: 'Poppins-SemiBold',
                          }}>
                          {el.post_detail[0].current_price} (
                          {el.post_detail[0].current_no_of_bales})
                        </Text>
                      )}
                    </View>

                    <View
                      style={{
                        flex: 1,
                        width: '100%',
                        marginLeft: '5%',
                        marginTop: 10,
                        marginRight: '5%',
                        height: 35,
                      }}></View>
                  </View>
                  <View
                    style={{
                      width: '90%',
                      left: '5%',
                      height: 1,
                      marginTop: 10,
                      backgroundColor: '#D1D1D1',
                    }}></View>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => this.onClickMultipleNegotiation(el)}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      marginTop: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginLeft: '5%',
                        marginRight: '5%',
                      }}>
                      <Text
                        style={{
                          color: theme.colors.textColor,
                          fontSize: 16,
                          margin: 0,
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        {el.product_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: theme.colors.primary,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {el.count} Negotiation
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          marginLeft: '5%',
                          marginRight: '5%',
                          width: '30%',
                        }}>
                        <Text
                          style={{
                            color: theme.colors.textColor,
                            fontSize: 12,
                            marginTop: 10,
                            opacity: 0.5,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          Best Deal
                        </Text>
                        <Text
                          style={{
                            color: theme.colors.textColor,
                            fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {el.best_name}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          marginLeft: '5%',
                          marginRight: '5%',
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            color: theme.colors.textColor,
                            fontSize: 12,
                            opacity: 0.5,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          Base
                        </Text>
                        <Text
                          style={{
                            color: theme.colors.textColor,
                            fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          ₹ {el.price} ({el.no_of_bales})
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          marginLeft: '5%',
                          marginRight: '5%',
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            color: theme.colors.textColor,
                            fontSize: 12,
                            fontFamily: 'Poppins-Bold',
                          }}>
                          Deal
                        </Text>
                        <Text
                          style={{
                            color: theme.colors.textColor,
                            fontSize: 12,
                            fontFamily: 'Poppins-Bold',
                          }}>
                          ₹ {el.best_price} ({el.best_bales})
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          width: '100%',
                          marginLeft: '5%',
                          marginTop: 10,
                          marginRight: '5%',
                          height: 35,
                        }}></View>
                    </View>
                    <View
                      style={{
                        width: '90%',
                        left: '5%',
                        height: 1,
                        marginTop: 10,
                        backgroundColor: '#D1D1D1',
                      }}></View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          );
        });
      }
      return (
        <View
          style={{
            height: '90%',
            flex: 1,
            flexDirection: 'column',
            //backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '40%',
          }}>
          <NoRecordsFound_Icon />
          <Text style={{fontSize: 14, fontFamily: 'Poppins-Regular'}}>
            Sorry, no records available
          </Text>
        </View>
      );
    } catch (error) {
      console.log(error);
    }
  };

  onClickNotification = () => {
    this.setState({
      dealTabStyle2: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#69BA53',
        marginLeft: 5,
        marginRight: 0,
        marginTop: 10,
        borderRadius: 5,
      },
      dealTabStyle1: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F5F9',
        marginLeft: 0,
        marginRight: 5,
        marginTop: 10,
        borderRadius: 5,
      },
      dealTabTextBox2: {
        height: 40,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontFamily: 'Poppins-Regular',
      },
      dealTabTextBox1: {
        height: 40,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        color: theme.colors.textColor,
        fontFamily: 'Poppins-Regular',
      },
    });
    this.setState({spinner: true});
    this.getNotificationListData();
  };

  onClickNegotiation = () => {
    this.setState({
      spinner: true,
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
    });

    this.getNegotiationListData();
  };

  getNotificationListData = async () => {
    try {
      var self = this;
      self.setState({
        userID: await EncryptedStorage.getItem('user_id'),
        spinner:true
      });
      let data = {seller_id: await EncryptedStorage.getItem('user_id')};

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.NOTIFICATION_LIST,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('my notification list response :', response.data.data[0]);
          self.setState({
            arrNotificationList: [],
            spinner: false,
            refreshing: false,

          });
          if (response.data.status == 200) {
            self.setState({arrNotificationList: response.data.data});
          } else {
            console.log(response.data.message);
          }
        })
        .catch(function (error) {
          self.setState({
            spinner: false,
            refreshing: false,

            message: 'Something bad happened ' + error,
          }),
            alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
    }
  };

  createDashboardNotificationListUI = () => {
    try {
      // console.log(
      //   'createDashboardNotificationListUI' +
      //     JSON.stringify(this.state.arrNotificationList),
      // );
      //let = await EncryptedStorage.getItem('user_id');
      if (this.state.arrNotificationList.length > 0) {
        return this.state.arrNotificationList.map((el, i) => (
          <View style={{backgroundColor: 'white'}} key={i}>
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
                    marginTop: 18,
                    color: theme.colors.textColor,
                    fontSize: 16,
                    textAlignVertical: 'center',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  {el.product_name}
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
                  Send by
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
                  {el.send_by}
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
                    opacity: 0.5,
                    textAlignVertical: 'center',
                    fontFamily: 'Poppins-Regular',
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
                    fontFamily: 'Poppins-Regular',
                  }}>
                  ₹ {el.price} ({el.no_of_bales})
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
                <TouchableOpacity
                  onPress={() => this.onClickNotificationView(el)}>
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
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ));
      }
      return (
        <View
          style={{
            height: '90%',
            flex: 1,
            flexDirection: 'column',
            //backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '40%',
          }}>
          <NoRecordsFound_Icon />
          <Text style={{fontSize: 14, fontFamily: 'Poppins-Regular'}}>
            Sorry, no records available
          </Text>
        </View>
      );
    } catch (error) {
      console.log(error);
    }
  };

  // remove listener on unmount
  componentWillUnmount() {
    // if (this._didFocusSubscription) {
    // BackHandler.remove();
    // }
  }

  onBackButtonPressAndroid = () => {
    console.log('hi');
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        'e-Cotton',
        'Do you want to quit the app?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
      return true;
    } else {
      this.props.navigation.goBack();
    }
    return true;
  };

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.onBackButtonPressAndroid(),
    );

    let d = await EncryptedStorage.getItem('user_id');
    const user_id = JSON.parse(d);
    const {route} = this.props;

    console.log('route', route);

    //    this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload =>
    const self = this;
    this.getNegotiationListData();

    socket.connect();

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>user', user_id);

    socket.on(
      'NotificationToSeller' + (await EncryptedStorage.getItem('user_id')),
      content => {
        // global.Notification = content.data.notificationSeller
        console.log('this.,', this.state.arrNotificationList);
        const newUsers = this.state.arrNotificationList
          ? [content.data.notificationSeller, ...this.state.arrNotificationList]
          : [content.data.notificationSeller];
        // this.setState({ arrNotificationList:  })

        this.setState({arrNotificationList: newUsers});

        console.log('content >>> socket', content);
      },
    );


    socket.onAny(async event => {
      if('MakeDealToSeller' + (await EncryptedStorage.getItem('user_id')) === event)
    {
      this.getNegotiationListData();

    }})

    
    // socket.onAny(
    //   'MakeDealToSeller' + (await EncryptedStorage.getItem('user_id')),
    //   content => {
    //     this.getNegotiationListData();
    //   },
    // );
    
    socket.on(
      'NegotiationToSeller' + (await EncryptedStorage.getItem('user_id')),
      content => {
        // global.Notification = content.data.notificationSeller
        console.log('this.,', this.state.arrNegotiationList, content.data);
        if (this.state.arrNegotiationList.length > 0) {
          let find = this.state.arrNegotiationList.find(item =>
            item.negotiation_type === 'post'
              ? item.post_id ===
                content.data.negotiationSeller.post_notification_id
              : item.notification_id ===
                content.data.negotiationSeller.post_notification_id,
          );
          let findInd = this.state.arrNegotiationList.findIndex(item =>
            item.negotiation_type === 'post'
              ? item.post_id ===
                content.data.negotiationSeller.post_notification_id
              : item.notification_id ===
                content.data.negotiationSeller.post_notification_id,
          );

          // console.log('findDat + homescreen',find)
          if (find) {
            let newBuyer = '';
            let buyerIndex = '';
            if (content.data.negotiationSeller.negotiation_type === 'post')
              buyerIndex = find.post_detail.find(
                item =>
                  item.buyer_id ===
                  parseInt(content.data.negotiationSeller.buyer_id),
              );
            else
              buyerIndex = find.notification_detail.find(
                item =>
                  item.buyer_id ===
                  parseInt(content.data.negotiationSeller.buyer_id),
              );
            // let buyerIndex = content.data.negotiationSeller.negotiation_type === 'post' ?
            // find.post_detail.find(item => item.buyer_id === parseInt(content.data.negotiationSeller.sell)) :
            // find.notification_detail.find(item => item.buyer_id === parseInt(content.data.negotiationSeller.sell));

            let buyerId;
            if (content.data.negotiationSeller.negotiation_type === 'post')
              buyerId = find.post_detail.findIndex(
                item =>
                  item.buyer_id ===
                  parseInt(content.data.negotiationSeller.buyer_id),
              );
            else
              buyerId = find.notification_detail.findIndex(
                item =>
                  item.buyer_id ===
                  parseInt(content.data.negotiationSeller.buyer_id),
              );

            // console.log('find value',find,buyerIndex,findInd,buyerId)

            if (content.data.negotiationSeller.hasOwnProperty('best_price')) {
              if (buyerIndex) {
                find.best_price = content.data.negotiationSeller.best_price;
                find.count = content.data.negotiationSeller.negotiation_count;
                find.best_name =
                  content.data.negotiationSeller.best_dealer_name;
                find.best_bales = content.data.negotiationSeller.best_bales;

                buyerIndex = content.data.negotiationSeller;

                buyerIndex.prev_price =
                  content.data.negotiationSeller.prev_price;
                buyerIndex.current_price =
                  content.data.negotiationSeller.current_price;
                buyerIndex.buyer_name =
                  content.data.negotiationSeller.buyer_name;
                buyerIndex.negotiation_by =
                  content.data.negotiationSeller.negotiation_by;
                buyerIndex.prev_no_of_bales =
                  content.data.negotiationSeller.prev_bales;
                buyerIndex.current_no_of_bales =
                  content.data.negotiationSeller.current_bales;
                console.log('buyerIndex', buyerIndex);
              } else {


                console.log("New Buyer =======>>>>>>")
                find.best_price = content.data.negotiationSeller.best_price;
                find.count = content.data.negotiationSeller.negotiation_count;
                find.best_name =
                  content.data.negotiationSeller.best_dealer_name;
                find.best_bales = content.data.negotiationSeller.best_bales;

                newBuyer = content.data.negotiationSeller;

                newBuyer.prev_price = content.data.negotiationSeller.prev_price;
                newBuyer.current_price =
                  content.data.negotiationSeller.current_price;
                newBuyer.buyer_name = content.data.negotiationSeller.buyer_name;
                newBuyer.negotiation_by =
                  content.data.negotiationSeller.negotiation_by;
                newBuyer.prev_no_of_bales =
                  content.data.negotiationSeller.prev_bales;
                newBuyer.current_no_of_bales =
                  content.data.negotiationSeller.current_bales;
              }
            } else {
              find.prev_price = content.data.negotiationSeller.prev_price;
              find.prev_no_of_bales = content.data.negotiationSeller.prev_bales;
              find.current_price = content.data.negotiationSeller.new_price;
              find.current_no_of_bales =
                content.data.negotiationSeller.new_bales;

              buyerIndex = content.data.negotiationSeller;

              buyerIndex.prev_price = content.data.negotiationSeller.prev_price;
              buyerIndex.current_price =
                content.data.negotiationSeller.new_price;
              //   buyerIndex.seller_name = content.data.negotiationSeller.best_dealer_name;
              buyerIndex.negotiation_by =
                content.data.negotiationSeller.negotiation_by;
              buyerIndex.prev_no_of_bales =
                content.data.negotiationSeller.prev_bales;
              buyerIndex.current_no_of_bales =
                content.data.negotiationSeller.new_bales;
              console.log('buyerIndex >>>> else', buyerIndex);
            }

            console.log('find value', find, buyerIndex, newBuyer);
            let temp = JSON.parse(JSON.stringify(find));
            const oldData = JSON.parse(JSON.stringify(find));


            if (temp.negotiation_type == 'post')
            buyerIndex
                ? (temp.post_detail[buyerId] = buyerIndex)
                : (temp.post_detail = [newBuyer, ...oldData.post_detail]);
            else
            buyerIndex
                ? (temp.notification_detail[buyerId] = buyerIndex)
                : (temp.notification_detail = [
                  newBuyer,
                    ...oldData.notification_detail,
                  ]);

            // if (find.negotiation_type == 'post')
            //   // Object.keys(buyerIndex).length === 0
            //   buyerIndex
            //     ? (temp.post_detail[buyerId] = buyerIndex)
            //     : [newBuyer, ...oldData.post_detail];
            // else
            //   buyerIndex
            //     ? (temp.notification_detail[buyerId] = buyerIndex)
            //     : [newBuyer, ...oldData.notification_detail];


                console.log('temp ==============>',temp)

            const {arrNegotiationList} = this.state;
            arrNegotiationList[findInd] = temp;

            self.setState({arrNegotiationList});
          } else {
            this.getNegotiationListData();
          }
        } else {
          // this.setState({ arrNegotiationList:[content.data.negotiationBuyer] })
          this.getNegotiationListData();
        }

        //       if ( this.state.arrNegotiationList.length > 0)
        // {
        //         let find = this.state.arrNegotiationList.find(item => item.negotiation_type === 'post' ? item.post_id === content.data.negotiationSeller.post_notification_id : item.notification_id === content.data.negotiationSeller.post_notification_id)
        //     console.log('findDat + homescreen',find)
        //         if (find) {
        //           let itemSeller = {};
        //           const arrNegotiationList = this.state.arrNegotiationList.map(item => {
        //             if(
        //               item.negotiation_type == 'post' ? item.post_id == content.data.negotiationSeller.post_notification_id : item.notification_id == content.data.negotiationSeller.post_notification_id)
        //               {

        //                 //item.post_detail.unshift(content.data.negotiationSeller)
        //                 if (content.data.negotiationSeller.hasOwnProperty('best_price'))
        //                      { item.best_price = content.data.negotiationSeller.best_price;
        //                       item.count = content.data.negotiationSeller.negotiation_count;
        //                       item.best_name = content.data.negotiationSeller.best_dealer_name;
        //                       item.best_bales = content.data.negotiationSeller.best_bales;

        //                   itemSeller = content.data.negotiationSeller

        //                   itemSeller.prev_price = content.data.negotiationSeller.base_price;
        //                   itemSeller.current_price = content.data.negotiationSeller.best_price;
        //                   itemSeller.seller_name = content.data.negotiationSeller.best_dealer_name;
        //                   itemSeller.negotiation_by = content.data.negotiationSeller.negotiation_by;
        //                   itemSeller.prev_no_of_bales = content.data.negotiationSeller.base_bales;
        //                   itemSeller.current_no_of_bales = content.data.negotiationSeller.best_bales;

        //               } else {

        //                 item.prev_price = content.data.negotiationSeller.prev_price;
        //                 item.prev_no_of_bales = content.data.negotiationSeller.prev_bales;
        //                 item.current_price = content.data.negotiationSeller.new_price;
        //                 item.current_no_of_bales = content.data.negotiationSeller.new_bales;

        //                 itemSeller = content.data.negotiationSeller
        //                 itemSeller.current_price = content.data.negotiationSeller.new_price;
        //                 itemSeller.prev_no_of_bales = content.data.negotiationSeller.prev_bales;
        //                 itemSeller.current_no_of_bales = content.data.negotiationSeller.new_bales;

        //               }
        //               console.log('item >>>>>>>M<<<<<<', item, itemSeller)
        //               if(item.negotiation_type === 'post')
        //                item.post_detail.unshift(itemSeller)
        //                else
        //                item.notification_detail.unshift(itemSeller)

        //                 return item
        //             }else
        //             {
        //               return item
        //             }
        //           } )
        //             console.log('users >>> same user nagotiate by notification>>>>>>>>>><<<<<<<<<',arrNegotiationList)

        //       self.setState({ arrNegotiationList})
        //         }else{
        //           console.log('heelo api calling')
        //           this.getNegotiationListData();
        //           // const arrNegotiationList = this.state.arrNegotiationList.length > 0 ? [content.data.negotiationSeller, ...this.state.arrNegotiationList] : [content.data.negotiationSeller];
        //           // self.setState({ arrNegotiationList})
        //         }
        //       }else{
        //       // this.setState({ arrNegotiationList:[content.data.negotiationSeller] })
        //           this.getNegotiationListData();

        //       }
        // console.log('this.,Nagotiations',content)
        // const newUsers = this.state.arrNotificationList ? [content.data.notificationSeller, ...this.state.arrNotificationList] : [content.data.notificationSeller];
        // this.setState({ arrNotificationList:  })

        // this.setState({ arrNotificationList:newUsers})

        // console.log('content >>> socket', content)
      },
    );

    //      socket.on('error', console.log('error'))
    //  socket.on('connect_error', console.log('error>>>>>>>'))

    // handleAndroidBackButton(exitAlert);

    // console.log('this.props', this.props.route)
    // if (this.props.navigation.isFocused() && this.props.route.name === 'HomeScreen')
    // handleAndroidBackButton(exitAlert);
  }

  onClickNotificationView = el => {
    console.log('el', el);
    let data = {
      cameFrom: 'Notification',
      post_id: el.notification_id,
      type: 'notification',
      buyerId: el.seller_buyer_id,
      current_price: el.price,
      current_no_of_bales: el.no_of_bales,
      payment_condition: '',
      transmit_condition: '',
      lab: '',
    };
    this.props.navigation.navigate('DealDetails', {
      data: data,
      type: 'notification',
      Title: el.product_name,
      prevScrName: 'Dashboard',
      cameFrom: 'notification',
    });
  };
  getMyActivePost = async () => {
    try {
      var self = this;
      let data = {seller_id: await EncryptedStorage.getItem('user_id')};

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.MY_ACTIVE_POST,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          // console.log('my active post list response :', response.data.data);
          self.setState({
            myActivePost: [],
            spinner: false,
          });
          if (response.data.status == 200) {
            self.setState({myActivePost: response.data.data});
          } else {
            console.log(response.data.message);
          }
        })
        .catch(function (error) {
          self.setState({
            spinner: false,
            message: 'Something bad happened ' + error,
          }),
            alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
    }
  };

  onClickActive = () => {
    this.setState({
      isMyPostActiveClicked: true,
      isMyPostCompletedClicked: false,
      myActivePost: [],
      spinner: true,
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
    });

    this.getMyActivePost();
  };
  onClickCompleted = () => {
    this.setState({
      isMyPostActiveClicked: false,
      isMyPostCompletedClicked: true,
      spinner: true,
      myActivePost: [],
      btnActiveContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        opacity: 0.5,
      },
      btnCompletedContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.primary,
      },
      btnActiveTextColor: 'gray',
      btnCompletedTextColor: theme.colors.primary,
    });
    this.getMyCompletedPost();
  };
  getMyCompletedPost = async () => {
    try {
      var self = this;
      let data = {
        seller_id: await EncryptedStorage.getItem('user_id'),
        user_type: 'seller',
        type: 'post',
      };

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      // console.log("Completed post request: " + JSON.stringify(data))
      axios({
        url: api_config.BASE_URL + api_config.COMPLETED_DEALS,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          // console.log('my completed post list response :', response.data.data);
          self.setState({myActivePost: [], spinner: false});
          if (response.data.status == 200) {
            self.setState({myActivePost: response.data.data});
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          self.setState({
            spinner: false,
            message: 'Something bad happened ' + error,
          }),
            alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
    }
  };

  _onRefresh = () => {
    this.setState({
      refreshing: true,

    })

    this.getNotificationListData();
    this.getNegotiationListData();

    // getCallNews(1);

  }

  render() {
    // console.log('arrNegotiationList', this.state.arrNegotiationList);
    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />}>
        <Spinner visible={this.state.spinner} color="#085cab" />
        <View style={{marginTop: 20}}>
          <View
            style={{
              marginRight: 20,
              marginLeft: 20,
              flexDirection: 'row',
              flex: 1,
            }}>
            <View style={styles.btnCompletedContainer}>
              <TouchableOpacity onPress={() => this.onClickActive()}>
                <Button
                  mode="text"
                  uppercase={false}
                  color="gray"
                  labelStyle={{fontSize: 14, fontFamily: 'Poppins-SemiBold'}}>
                  My Favourite
                </Button>
              </TouchableOpacity>
            </View>

            <View style={styles.btnActiveContainer}>
              <TouchableOpacity onPress={() => this.onClickCompleted()}>
                <Button
                  mode="text"
                  uppercase={false}
                  color={theme.colors.primary}
                  labelStyle={{fontSize: 14, fontFamily: 'Poppins-SemiBold'}}>
                  Deals
                </Button>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dealTopMainContainer}>
            <View style={this.state.dealTabStyle1}>
              <TouchableOpacity onPress={() => this.onClickNegotiation()}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={this.state.dealTabTextBox1}>
                  In Negotiation
                </Text>
              </TouchableOpacity>
            </View>

            <View style={this.state.dealTabStyle2}>
              <TouchableOpacity onPress={() => this.onClickNotification()}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={this.state.dealTabTextBox2}>
                  Notification
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {this.state.dealTabStyle1.backgroundColor == '#69BA53' && (
            // {this.createDashboardInNegotiationListUI()}
            <View>{this.createDashboardInNegotiationListUI()}</View>
          )}

          {this.state.dealTabStyle2.backgroundColor == '#69BA53' && (
            <View>{this.createDashboardNotificationListUI()}</View>
          )}
        </View>
      </ScrollView>
    );
  }
}
