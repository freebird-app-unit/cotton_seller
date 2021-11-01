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
import {baseUrl} from '../components/Global';
import {fontSizeMyPostCenterText} from '../components/Global';
import {vLineMyPostStyle} from '../components/Global';
import {wfrInNegotiation} from '../components/Global';

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
import Plus from '../assets/Plus';
import Bell_Icon from '../assets/Bell';
import History_Icon from '../assets/History';
import Newsfeed_Icon from '../assets/NewsFeed';
import MCX_Icon from '../assets/MCX';
import Calculator_Icon from '../assets/Calculator';
import ChangePassword_Icon from '../assets/ChangePassword';
import Profile_Icon from '../assets/Profile';
import Reports_Icon from '../assets/Reports';
import TransactionTracking_Icon from '../assets/TransactionTracking';
import {fieldValidator} from '../helpers/fieldValidator';
import {priceValidator} from '../helpers/priceValidator';
import MyPostGreen_Icon from '../assets/MyPostGreen';
import defaultMessages from '../helpers/defaultMessages';
import {Picker} from '@react-native-picker/picker';
//svgs
import Home from '../assets/Home';
import NoRecordsFound_Icon from '../assets/NoRecodsFound';
import SearchToSell_Icon from '../assets/SearchToSell';
import PostToSell_Icon from '../assets/PostToSell';
import MyPost_Icon from '../assets/MyPost';
import MyContracts_Icon from '../assets/MyContracts';
import Logout_Icon from '../assets/Logout';
import NotificationToBuyer_Icon from '../assets/NotificationToBuyer';
import Employee from '../assets/Employee';
import EmployeeGray from '../assets/EmployeeGray';
import CustomerIcon from '../assets/CustomerIcon';
import FilterSettings from '../assets/FilterSettings';
import Minus from '../assets/Minus';
import MPIcon1 from '../assets/MPIcon1';
import MPIcon2 from '../assets/MPIcon2';
import PlusRound from '../assets/PlusRound';
import MinusRound from '../assets/MinusRound';
import SetPassword from '../assets/SetPassword';
import EncryptedStorage from 'react-native-encrypted-storage';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NewsFeedView from '../components/NewsFeedView';
import Profile from '../components/Profile';
import Wallet from '../components/Wallet';
import CalculatorView from '../components/CalculatorView';
import io from 'socket.io-client';
import styles from './Styles';
if (!window.location) {
  // App is running in simulator
  window.navigator.userAgent = 'ReactNative';
}

// const socket = io.connect('http://cottontradecentre.com:6001', {
//   transports: ['websocket'],
// }); //live

import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../helpers/backHandler';
import {exitAlert} from '../helpers/customAlert';
import RNFetchBlob from 'rn-fetch-blob';

export default class PostToSell extends Component {
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
      spinner: true,
      jsonData: {},
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

    // this.setValue = this.setValue.bind(this);
    // this.setOpenState = this.setOpenState.bind(this);
    // this.setItemsState = this.setItemsState.bind(this);

    // this.setDEValue = this.setDEValue.bind(this);
    // this.setDEOpenState = this.setDEOpenState.bind(this);
    // this.setDEItemsState = this.setDEItemsState.bind(this);
  }

  componentDidMount() {
    this.getProductListAPI();
  }

  getProductListAPI = () => {
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
          console.log('response :', response.data);
          if (response.data.status == 200) {
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
            self.getProductAttributeAPI(firstProductID);
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

  getProductAttributeAPI = productID => {
    try {
      this.setState({selectedProductID: productID});
      // console.log('Bhavin: ' + productID);
      var self = this;
      let data = {product_id: productID};

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.PRODUCT_ATTRIBUTE_LIST,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          // console.log('response PRODUCT_ATTRIBUTE_LIST:', response.data);
          if (response.data.status == 200) {
            self.setState({
              productAttributeList: response.data.data,
              spinner: false,
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
  changeProduct = selectedItem => {
    try {
      this.setState({
        spinner: true,
        selectedProductID: selectedItem.value,
        selectedProductName: selectedItem.label,
      });
      this.getProductAttributeAPI(selectedItem.value);
    } catch (error) {
      console.log(error);
    }
  };
  onClickMinusIcon = () => {
    try {
      if (this.state.displayBalesCount - this.state.balesCount != 0) {
        if (this.state.displayBalesCount > 0) {
          this.state.displayBalesCount =
            this.state.displayBalesCount - this.state.balesCount;
          this.setState({displayBalesCount: this.state.displayBalesCount});
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  getProductAttributeArray = () => {
    try {
      let tempArray = [];
      this.state.inputData.map((el, i) => {
        tempArray.push({
          attribute: el.attribute,
          attribute_value: el.attribute_value,
        });
      });
      return tempArray;
      //this.setState({attributeArry:tempArray})
    } catch (error) {
      console.log(error);
    }
  };

  checkValidation = () => {
    try {
      let attrValue = this.getProductAttributeArray();
      if (attrValue.length == 0) {
        alert(defaultMessages.en.required.replace('{0}', 'atribute value'));
        return false;
      }
      if (!fieldValidator(this.state.balesPrice)) {
        alert(defaultMessages.en.required.replace('{0}', 'price'));
        return false;
      }

      if (!priceValidator(this.state.balesPrice)) {
        alert('Please enter valid price');
        return false;
      }

      if (this.state.displayBalesCount == 0) {
        alert(defaultMessages.en.required.replace('{0}', 'bales'));
        return false;
      }

      if (this.state.isShowSpinningName) {
        if (!fieldValidator(this.state.txtSpinningMillName)) {
          alert(
            defaultMessages.en.required.replace('{0}', 'spinning mill name'),
          );
          return false;
        }
      }

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  onClickPostToSell = async () => {
    try {
      if (this.checkValidation()) {
        var self = this;
        self.setState({
          spinner: true,
        });

        let data = {
          seller_buyer_id: await EncryptedStorage.getItem('user_id'),
          product_id: this.state.selectedProductID,
          price: this.state.balesPrice,
          no_of_bales: this.state.displayBalesCount,
          address: 'Raiya Road Rajkot',
          attribute_array: this.getProductAttributeArray(),
        };
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));


        console.log('data>>>>>>>>>>post to sell',JSON.stringify(data));

        axios({
          url: api_config.BASE_URL + api_config.POST_TO_SELL,
          method: 'POST',
          data: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(function (response) {
            console.log('response :', response);
            if (response.status == 200) {
              self.setState({
                spinner: false,
                isPostToSell: false,
                isDashboard: true,
                attributeArry: [],
                inputData: [],
              });
              alert('Your product posted successfully.');
              self.props.navigation.navigate('HomeScreen');
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  onChanged(text) {
    this.setState({
      balesPrice: text.replace(/[^0-9]/g, ''),
    });
  }
  onClickPlusIcon = () => {
    try {
      this.state.displayBalesCount =
        this.state.displayBalesCount + this.state.balesCount;
      this.setState({displayBalesCount: this.state.displayBalesCount});
    } catch (error) {
      console.log(error);
    }
  };

  addValues = (text, label, itemId, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach(element => {
        if (element.index === index) {
          element.attribute_value = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputData: dataArray,
      });
    } else {
      dataArray.push({
        attribute: label,
        attribute_value: text,
        index: index,
        itemId: itemId,
      });
      this.setState({
        inputData: dataArray,
      });
    }
    console.log('Add Values: ' + JSON.stringify(this.state.inputData));
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
        <ScrollView>
          <View style={{marginTop: 20}}>
            {/* <DropDownPicker
                    placeholder={this.state.dropdownPlaceholder}
                    open={this.state.openState}
                    value={this.state.value}
                    items={this.state.items}
                    setOpen={this.setOpenState}
                    setValue={this.setValue}
                    setItems={this.setItemsState}
                    containerStyle={{
                      height: 50,
                      width: '90%',
                      marginTop: 15,
                      marginLeft: '5%',
                    }}
                    listMode="MODAL"
                    onChangeValue={item => this.changeProduct(item)}
                    scrollViewProps={{
                      decelerationRate: 'fast',
                    }}
                  /> */}
            <View
              style={{
                height: 50,
                width: '90%',
                marginTop: 15,
                marginLeft: '5%',
              }}>
              <SelectDropdown
                data={this.state.productItem}
                onSelect={(selectedItem, i) => {
                  console.log(selectedItem);
                  this.changeProduct(selectedItem);
                  //this.addValues(selectedItem.label, el.label)
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Text style={styles.dropdown3BtnTxt}>
                        {selectedItem
                          ? selectedItem.label
                          : this.state.dropdownPlaceholder}
                      </Text>
                    </View>
                  );
                }}
                renderDropdownIcon={() => {
                  return (
                    <FontAwesome
                      name="chevron-down"
                      color={'black'}
                      size={14}
                      style={{marginRight: 20}}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown3DropdownStyle}
                rowStyle={styles.dropdown3RowStyle}
                renderCustomizedRowChild={(item, index) => {
                  return (
                    <View style={styles.dropdown3RowChildStyle}>
                      <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
                    </View>
                  );
                }}
              />
            </View>
            {this.state.productAttributeList.length ? (
              this.state.productAttributeList.map((el, i) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: '5%',
                    marginTop: 10,
                    marginRight: '5%',
                    height: 50,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      width: '35%',
                      color: theme.colors.textColor,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {el.label}
                  </Text>
                  <View
                    style={{
                      width: '65%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <SelectDropdown
                      data={el.value}
                      onSelect={(selectedItem, j) => {
                        console.log(selectedItem);
                        //this.addValues(selectedItem.label, el.label)
                        this.addValues(
                          selectedItem.label,
                          el.label,
                          selectedItem.value,
                          i,
                        );
                      }}
                      buttonStyle={styles.dropdown3BtnStyle}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={styles.dropdown3BtnChildStyle}>
                            <Text style={styles.dropdown3BtnTxt}>
                              {selectedItem
                                ? selectedItem.label
                                : 'Select ' + el.label}
                            </Text>
                          </View>
                        );
                      }}
                      renderDropdownIcon={() => {
                        return (
                          <FontAwesome
                            name="chevron-down"
                            color={'black'}
                            size={14}
                            style={{marginRight: 20}}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown3DropdownStyle}
                      rowStyle={styles.dropdown3RowStyle}
                      renderCustomizedRowChild={(item, index) => {
                        return (
                          <View style={styles.dropdown3RowChildStyle}>
                            <Text style={styles.dropdown3RowTxt}>
                              {item.label}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
              ))
            ) : (
              <Spinner visible={this.state.spinner} color="#085cab" />
            )}
            <View
              style={{
                flexDirection: 'row',
                marginLeft: '5%',
                marginTop: 15,
                marginRight: '5%',
                height: 50,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: '35%',
                  color: theme.colors.text,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Price
              </Text>

              <View
                style={{
                  width: '65%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    width: '100%',
                    height: 46,
                    fontWeight: 'bold',
                    backgroundColor: '#fff',
                  }}
                  label=""
                  autoFocus={this.state.balespriceFocus}
                  returnKeyType="next"
                  maxLength={6}
                  onChangeText={text => this.onChanged(text)}
                  value={this.state.balesPrice}
                  error={!!this.state.balesPriceError}
                  errorText={this.state.balesPriceError}
                  autoCapitalize="none"
                  autoCompleteType="off"
                  textContentType="none"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: '5%',
                marginTop: 10,
                marginRight: '5%',
                height: 50,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: '35%',
                  color: theme.colors.textColor,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Sale bales
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  width: '65%',
                  height: '100%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => this.onClickMinusIcon()}>
                  <Minus />
                </TouchableOpacity>

                <Text
                  style={{
                    width: '45%',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    height: '100%',
                    color: theme.colors.textColor,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  {this.state.displayBalesCount}
                </Text>

                <TouchableOpacity onPress={() => this.onClickPlusIcon()}>
                  <Plus />
                </TouchableOpacity>
              </View>
            </View>

            {/* <View style={{flexDirection: 'row',marginLeft:'5%',marginTop:10,marginRight:'5%',height:20,alignItems:'center'}}>
                  <Text style={{width:'35%',color:theme.colors.textColor}}>D/E</Text>
              </View>

              <DropDownPicker
              placeholder="Export"
              open={this.state.openState}
              value={this.state.value}
              items={this.state.items}
              setOpen={this.setOpenState}
              setValue={this.setValue}
              setItems={this.setItemsState}
              containerStyle={{height: 50,width:'90%',marginTop:15,marginLeft:'5%'}}
              listMode="MODAL"
              scrollViewProps={{
                decelerationRate: "fast"
              }} /> */}

            <Button
              mode="contained"
              uppercase={false}
              contentStyle={{height: 50}}
              style={{width: '90%', marginLeft: '5%', marginTop: 20}}
              labelStyle={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 16,
                color: 'white',
              }}
              onPress={() => this.onClickPostToSell()}>
              Post
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}
