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
  FlatList,
} from 'react-native';
import {baseUrl} from '../components/Global';
import {fontSizeMyPostCenterText} from '../components/Global';
import {vLineMyPostStyle} from '../components/Global';
import Background from '../components/Background';
import Header from '../components/Header';
import {Card} from 'react-native-elements';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Appbar, Searchbar, Button, Badge} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {theme} from '../core/theme';
import TextInput from '../components/TextInput';
import api_config from '../Api/api';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fieldValidator} from '../helpers/fieldValidator';
import defaultMessages from '../helpers/defaultMessages';
import EncryptedStorage from 'react-native-encrypted-storage';
//svgs
import Home from '../assets/Home';
import Employee from '../assets/Employee';
import EmployeeGray from '../assets/EmployeeGray';
import CustomerIcon from '../assets/CustomerIcon';
import FilterSettings from '../assets/FilterSettings';
import PlusRound from '../assets/PlusRound';
import MinusRound from '../assets/MinusRound';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../helpers/backHandler';

import io from 'socket.io-client';
if (!window.location) {
  // App is running in simulator
  window.navigator.userAgent = 'ReactNative';
}
const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 5000,
  transports: ['websocket']/// you need to explicitly tell it to use websockets
};

const socket = io.connect('http://165.232.181.91:3000/', connectionConfig); //live


class MultipleNegotiationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      loading: 'true',
      spinner: false,
      jsonData: {},
      token: '',
      dealDetails: {},
      paymentArray: [],
      transmitArray: [],
      labsArray: [],
      maxbalesCount: 0,
      dropdownPlaceholder: '',
      balesCount: 100,
      displayBalesCount: 100,
      balesPrice: '',
      balespriceFocus: false,
      balesPriceError: '',
      selectedPaymentCondition: {},
      selectedTransmitCondition: {},
      selectedLab: {},
      arrNegotiationList: {},
    };
  }

  async componentDidMount() {
    let data;
    let post_notification_id;
    
    if(this.props.route.params.data.negotiation_type == "post") {
      data = this.props.route.params.data.post_detail;
      post_notification_id = this.props.route.params.data.post_id;
    } else {
      data = this.props.route.params.data.notification_detail;
      post_notification_id = this.props.route.params.data.notification_id;
    }

    const datas = data;
    const self = this;
    this.setState({ arrNegotiationList: data,spinner: true });

    socket.connect()
    const multipleBuyerNegotiation  = datas;

    socket.on("NegotiationToMultipleSeller" +  await EncryptedStorage.getItem('user_id'), (content) => {
      let find =multipleBuyerNegotiation.find(item => 
        parseInt(item.post_notification_id) === 
        parseInt(content.data.negotiationMultipleSeller.post_notification_id))

      

      if (find){
        let find_buyer =multipleBuyerNegotiation.find(item => 
          parseInt(item.buyer_id) === 
          parseInt(content.data.negotiationMultipleSeller.buyer_id))
        let New_buyer = multipleBuyerNegotiation.findIndex(item => 
          item.buyer_id === parseInt(content.data.negotiationMultipleSeller.buyer_id))

          // console.log('NEw_buyer id',New_buyer)
          let newItem = parseInt(New_buyer);


          if (newItem > -1)
          {
          console.log('NEw_buyer id',newItem)

      console.log('findDat + data', find_buyer)

            let temp = JSON.parse(JSON.stringify(find_buyer))
           
            temp.current_price = content.data.negotiationMultipleSeller.current_price;
            temp.buyer_name = content.data.negotiationMultipleSeller.buyer_name;
            temp.negotiation_by = content.data.negotiationMultipleSeller.negotiation_by;
            temp.prev_no_of_bales = content.data.negotiationMultipleSeller.prev_bales;
            temp.current_no_of_bales = content.data.negotiationMultipleSeller.current_bales;
            temp.broker_name = content.data.negotiationMultipleSeller.broker_name
            // console.log('findDat + changed', find)


            multipleBuyerNegotiation[New_buyer] = temp;
          console.log('NEw_buyer find>>>>', multipleBuyerNegotiation[New_buyer])

            self.setState({
              arrNegotiationList:multipleBuyerNegotiation
            });

          console.log('NEw_buyer final',multipleBuyerNegotiation)

          }else{
            let temp = content.data.negotiationMultipleSeller ;
            temp.prev_no_of_bales = content.data.negotiationMultipleSeller.prev_bales;
                temp.current_no_of_bales = content.data.negotiationMultipleSeller.current_bales;
            self.setState({
              arrNegotiationList:[temp , ...self.state.arrNegotiationList]
            });


     
          }
      }

      // global.Notification = content.data.notificationSeller

      
//       console.log('this.,',this.state.arrNegotiationList,content.data)
//       if ( this.state.arrNegotiationList.length > 0)
// {
//       let find =  this.state.arrNegotiationList.find(item => item.buyer_id === parseInt(content.data.negotiationSeller.buyer_id) )
//     console.log('findDat + multiple',find)
//         if (find) {
//           const arrNegotiationList = this.state.arrNegotiationList.map(item => {
//             if(
//             item.buyer_id === parseInt(content.data.negotiationSeller.buyer_id)){
//               item.prev_price = item.current_price;

//                 item.current_price = content.data.negotiationSeller.best_price;
//                 item.buyer_name = content.data.negotiationSeller.best_dealer_name;
//                 item.negotiation_by = content.data.negotiationSeller.negotiation_by;
//                 item.prev_no_of_bales =item.current_no_of_bales;
//                 item.current_no_of_bales = content.data.negotiationSeller.best_bales;

                               
//                 // item.prev_price = content.data.negotiationSeller.best_price;

//                return item
//             }else{
           
//               return item}} )
//             console.log('users >>> same user nagotiate by notification>>>>>>>>>><<<<<<<<<',arrNegotiationList)

//       self.setState({ arrNegotiationList})
//         }else{
//           let item = content.data.negotiationSeller;
//           item.prev_price = content.data.negotiationSeller.base_price;
//           item.current_price = content.data.negotiationSeller.best_price;
//           item.buyer_name = content.data.negotiationSeller.best_dealer_name;
//           item.negotiation_by = content.data.negotiationSeller.negotiation_by;
//           item.prev_no_of_bales = content.data.negotiationSeller.base_bales;
//           item.current_no_of_bales = content.data.negotiationSeller.best_bales;
//           const arrNegotiationList = this.state.arrNegotiationList.length > 0 ? [item, ...this.state.arrNegotiationList] : [item];
//           self.setState({ arrNegotiationList})
//         }
//       }else{
//       this.setState({ arrNegotiationList:[content.data.negotiationSeller] })
//       }
      // console.log('this.,Nagotiations',content)
      // const newUsers = this.state.arrNotificationList ? [content.data.notificationSeller, ...this.state.arrNotificationList] : [content.data.notificationSeller];
      // this.setState({ arrNotificationList:  })

      // this.setState({ arrNotificationList:newUsers})
      
      // console.log('content >>> socket', content)
    })

    console.log('data',data[0])
   
    this.getPostDetailsAPI(
      post_notification_id,
      this.props.route.params.data.negotiation_type,
    );
    // handleAndroidBackButton(this.goToDashboard);
  }

  goToDashboard = () => {
    const navigation = this.props.navigation;
    let canGoBack = navigation.canGoBack();
    return canGoBack
      ? navigation.goBack()
      : navigation.replace(this.props.route.params.prevScrName);
  };

  componentWillUnmount() {
    // removeAndroidBackButtonHandler();
  }

  getPostDetailsAPI = (postId, type) => {
    try {
      console.log('PostId is: ' + postId + ':' + type);
      var self = this;
      let data = {post_notification_id: postId, type: type};

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.POST_DETAILS,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('response POST_DETAILS:', response.data);
          
          if (response.data.status == 200) {
            self.setState({
              dealDetails: response.data.data[0],
              spinner: false,
            });

            self.setState({
              maxbalesCount: self.state.dealDetails.no_of_bales,
            });
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

  checkValidation = () => {
    try {
      if (!fieldValidator(this.state.balesPrice)) {
        alert(defaultMessages.en.required.replace('{0}', 'price'));
        return false;
      }
      if (this.state.displayBalesCount == 0) {
        alert(defaultMessages.en.required.replace('{0}', 'bales'));
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  _keyExtractor(item, index) {
    return index.toString();
  }

  createNegitiationListUI = () => {
    console.log('this.state.arrNegotiationList: ' + JSON.stringify(this.state.arrNegotiationList))
    try {
      console.log("Bhavin Thakkar: " + JSON.stringify(this.state.arrNegotiationList.length))
      if (this.state.arrNegotiationList.length > 0) {
        return this.state.arrNegotiationList.map((el, i) => (
          <View>
            {el.negotiation_type == 'post' ? (
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    paddingHorizontal: '2%',
                    marginTop: 10,
                    marginLeft: '2%',
                    marginRight: '2%',
                  }}>
                  {i == 0 && (<View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#333',
                        margin: 0,
                        fontSize: 18,
                        fontWeight: 'bold',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Buyers
                    </Text>
                    <Icon name="search-outline" color={'black'} size={20} />
                  </View>)}
                  
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '32%',
                      }}>
                      <View
                        style={{
                          //justifyContent: 'center',
                          alignItems: 'center',
                          height: 50,
                        }}>
                        <Text style={{fontFamily:'Poppins-Regular'}}>{el.buyer_name}</Text>
                      </View>
                      <View
                        style={{
                          //justifyContent: 'center',
                          //alignItems: 'center',
                          height: 50,
                        }}>
                        <Text
                          style={{
                            color: theme.colors.textColor,
                            fontSize: 12,
                            opacity: 0.5,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          Broker
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: theme.colors.textColor,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {el.broker_name}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '32%',
                      }}>
                      <View style={{height: 50}}>
                        <Text
                          style={{
                            color: theme.colors.textColor,
                            fontSize: 12,
                            opacity: 0.5,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          Prev
                        </Text>
                        <Text
                          style={{
                            color: theme.colors.textColor,
                            fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {el.prev_price} ({el.prev_no_of_bales})
                        </Text>
                      </View>
                      <View style={{height: 50}}>
                        <Text
                          style={{
                            color: theme.colors.textColor,
                            fontSize: 12,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-Bold',
                          }}>
                          New
                        </Text>
                        <Text
                          style={{
                            color: theme.colors.textColor,
                            fontSize: 12,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-Bold',
                          }}>
                          {el.current_price} ({el.current_no_of_bales})
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        width: '100%',
                        marginLeft: '5%',
                        marginTop: 0,
                        marginRight: '5%',
                        height: 35,
                      }}>
                      {el.negotiation_by == 'seller' ? 
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
                            fontFamily:'Poppins-Regular'
                          }}>
                          Waiting for response
                        </Text>
                    </TouchableOpacity> :
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
                          fontFamily:'Poppins-Regular'
                        }}>
                        Respond
                      </Text>
                      </TouchableOpacity>
                      } 
                      
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: '90%',
                    left: '4%',
                    height: 1,
                    marginTop: 0,
                    backgroundColor: '#D1D1D1',
                  }}></View>
                
              </View>
            ) : (
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    paddingHorizontal: '2%',
                    marginTop: 10,
                    marginLeft: '2%',
                    marginRight: '2%',
                  }}>
                  {i == 0 && (<View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#333',
                        margin: 0,
                        fontSize: 18,
                        fontWeight: 'bold',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Sellers
                    </Text>
                    <Icon name="search-outline" color={'black'} size={20} />
                  </View>)}

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '32%',
                      }}>
                      <View
                        style={{
                          //justifyContent: 'center',
                          alignItems: 'center',
                          height: 50,
                        }}>
                        <Text>{el.buyer_name}</Text>
                      </View>
                      <View
                        style={{
                          //justifyContent: 'center',
                          //alignItems: 'center',
                          height: 50,
                        }}>
                        <Text
                          style={{
                            color: theme.colors.textColor,
                            fontSize: 12,
                            opacity: 0.5,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          Broker
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: theme.colors.textColor,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {el.broker_name}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '32%',
                      }}>
                      <View style={{ height: 50 }}>
                        <Text
                          style={{
                            color: theme.colors.textColor,
                            fontSize: 12,
                            opacity: 0.5,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          Prev
                        </Text>
                        <Text
                          style={{
                            color: theme.colors.textColor,
                            fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {el.prev_price} ({el.prev_no_of_bales})
                        </Text>
                      </View>
                      <View style={{ height: 50 }}>
                        <Text
                          style={{
                            color: theme.colors.textColor,
                            fontSize: 12,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-Bold',
                          }}>
                          New
                        </Text>
                        <Text
                          style={{
                            color: theme.colors.textColor,
                            fontSize: 12,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-Bold',
                          }}>
                          {el.current_price} ({el.current_no_of_bales})
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        width: '100%',
                        marginLeft: '5%',
                        marginTop: 0,
                        marginRight: '5%',
                        height: 35,
                      }}>
                      {el.negotiation_by == 'seller' ?
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
                            }}>
                            Waiting for response
                          </Text>
                        </TouchableOpacity> :
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
                            }}>
                            Respond
                          </Text>
                        </TouchableOpacity>
                      }

                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: '90%',
                    left: '4%',
                    height: 1,
                    marginTop: 0,
                    backgroundColor: '#D1D1D1',
                  }}></View>

              </View>
            )}
          </View>
        ));
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  onClickWaitingForResponse = el => {
    console.log('Waiting for response clicked: ' + JSON.stringify(el));
    this.props.navigation.navigate('NegotiateDetails', {
      data: el,
      cameFrom: 'MultiNego',
      type: el.negotiation_type,
      post_id: el.post_notification_id,
      buyerId: el.buyer_id,
      Title: this.props.route.params.Title,
      prevScrName: 'Dashboard',
    });
  };

  onClickRespond = el => {
    console.log('el',JSON.stringify(el),this.props.route.params)
    let data = {
        cameFrom: 'Negotiation',
        post_id: el.post_notification_id,
        buyerId: el.buyer_id,
        current_price: el.current_price,
        current_no_of_bales: el.current_no_of_bales,
        payment_condition: el.payment_condition,
        transmit_condition: el.transmit_condition,
        lab: el.lab,
        type:el.negotiation_type
    };
    
    this.props.navigation.navigate('DealDetails', {
      data: data,
      type: el.negotiation_type,
      Title:this.props.route.params.Title,
      prevScrName: 'Dashboard',
      cameFrom:'multipleNego'
    });
  };

  _renderItem({item, index}) {
    return (
      <View style={{flexDirection: 'row', width: 80}}>
        <View style={{flex: 1}}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              flex: 1,
              color: theme.colors.textColor,
              fontSize: fontSizeMyPostCenterText,
              textAlign: 'center',
              textAlignVertical: 'center',
              textTransform: 'uppercase',
              fontFamily:'Poppins-Regular'
            }}>
            {item.attribute}
          </Text>

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              flex: 1,
              color: theme.colors.textColor,
              fontSize: fontSizeMyPostCenterText,
              fontWeight: 'bold',
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            {item.attribute_value}
          </Text>
        </View>

        <View style={vLineMyPostStyle}></View>
      </View>
    );
  }

  render() {
    var myData = this.state.dealDetails;
    
    return (
      <Background>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            position: 'relative',
            // marginTop: -40,
            backgroundColor: 'white',
          }}>
          <Spinner visible={this.state.spinner} color="#085cab" />

      

          <View
            style={{
              width: '100%',
              // height: '86%',
              paddingBottom: 30,
              // marginTop: 10,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <ScrollView>
              <View>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: '#F0F5F9',
                    paddingBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '5%',
                      marginRight: '5%',
                      height: 40,
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: theme.colors.blackBG,
                        fontSize: 16,
                        
                        textAlignVertical: 'center',
                        fontFamily:'Poppins-SemiBold'
                      }}>
                      {myData.product_name}
                    </Text>

                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        width: '50%',
                        height: '100%',
                        fontSize: 16,
                        
                        textAlign: 'right',
                        alignItems: 'center',
                        color: theme.colors.blackBG,
                        textAlignVertical: 'center',
                        fontFamily:'Poppins-SemiBold'
                      }}>
                      ₹ {myData.price} ({myData.no_of_bales})
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 40,
                    }}>
                    <FlatList
                      style={{flex: 1}}
                      data={myData.attribute_array}
                      keyExtractor={this._keyExtractor.bind(this)}
                      renderItem={this._renderItem.bind(this)}
                      horizontal={true}
                    />
                  </View>
                </View>
                {this.createNegitiationListUI()}
              </View>
            </ScrollView>
          </View>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    top: 0,
  },
  container2: {
    marginTop: '2%',
    width: '90%',
    height: '86%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'flex-start',
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#57a3f5',
    marginLeft: 1,
  },
  buttonContainer2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 1,
    marginRight: 1,
    opacity: 0.4,
  },
  spinnerTextStyle: {
    color: '#000',
  },
  module_parent_view: {
    width: '100%',
  },
  module_label_header: {
    fontWeight: 'bold',
    fontSize: 20,
    justifyContent: 'center',
    color: '#2DA3FC',
  },
  module_card2: {
    height: 70,
    width: '90%',
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 35,
    borderColor: '#57a3f5',
    borderWidth: 1,
    elevation: 5,
    alignItems: 'center',
    alignSelf: 'center',
    top: 80,
  },
  allbid: {
    flexDirection: 'row',
    marginLeft: '5%',
    marginTop: '5%',
  },
  bidedItem: {
    height: 120,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 0,
    borderColor: '#57a3f5',
    borderWidth: 1,
    elevation: 5,
    marginLeft: '5%',
    marginTop: 15,
    flexDirection: 'row',
  },
  bidedProduct: {
    width: '60%',
    height: '85%',
    marginLeft: '2%',
    marginTop: '3%',
    alignItems: 'flex-start',
  },
  bidedQuantity: {
    width: '35%',
    height: '85%',
    marginTop: '3%',
    textAlign: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
  },

  titleText: {
    flex: 1,
    color: '#2DA3FC',
    fontWeight: 'bold',
  },
  allbidValue: {
    flexDirection: 'row',
    marginLeft: '5%',
    marginTop: '1%',
  },
  titleTextValue: {
    flex: 1,
    color: '#2DA3FC',
    fontSize: 12,
  },
  scrollViewStyle: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  dealTopMainContainer: {
    flexDirection: 'row',
    top: 0,
    marginLeft: '5%',
    marginRight: '5%',
  },

  dealBtnEnable: {
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
  dealBtnDisable: {
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
  dealTopBoxTextView: {
    height: 40,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
  dealTopBoxTextViewDisable: {
    height: 40,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    color: '#343434',
  },

  dropdown3BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#444',
    left: 0,
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 16,
    marginHorizontal: 0,
    fontFamily:'Poppins-Regular'
  },
  dropdown3DropdownStyle: {backgroundColor: 'white'},
  dropdown3RowStyle: {
    backgroundColor: '#fff',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3RowTxt: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 16,
    marginHorizontal: 0,
    width: '100%',
    fontFamily:'Poppins-Regular'
  },
});

export default MultipleNegotiationList;
