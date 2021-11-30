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
// import SelectDropdown from 'react-native-select-dropdown';
import SelectDropdown from "../components/selectBox";

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


const CustomComponent = ({ ...props }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginLeft: "5%",
        marginTop: 10,
        marginRight: "5%",
        height: 50,
        width: "80%",
        alignItems: "center",
      }}
    >
      <Text style={{ width: "35%", color: theme.colors.textColor }}>
        {props.label}
      </Text>
      <View
        style={{
          width: "78%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginLeft: "0%",
            marginRight: "0%",
            marginTop: 0,
          }}
        ><View style={{ flex: 1, marginRight: 3 }}>
            <SelectDropdown
              data={props.fromValue}
              ref={props.fromref}

              onSelect={props.onSelectFrom}
              buttonStyle={styles.dropdown3BtnStyle}
              renderCustomizedButtonChild={(selectedItem, index) => {
                // console.log('sera', this.state.Micronnaire.value, index)
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    <Text style={styles.dropdown3BtnTxt}>
                      {selectedItem
                        ? selectedItem.label
                        : ''}
                    </Text>
                  </View>
                );
              }}
              renderDropdownIcon={() => {
                return (
                  <FontAwesome
                    name="chevron-down"
                    color={"black"}
                    size={14}
                    style={{ marginRight: 20 }}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown3DropdownStyle}
              rowStyle={styles.dropdown3RowStyle}
              renderCustomizedRowChild={(item, index) => {
                // console.log('sera>>>', item)

                return (
                  <View style={styles.dropdown3RowChildStyle}>
                    <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={{ flex: 1, marginRight: 3 }}>
            <SelectDropdown
              data={props.toValue}
              ref={props.toref}

              onSelect={props.onSelectTo}
              defaultValue={props.to}
              buttonStyle={styles.dropdown3BtnStyle}
              renderCustomizedButtonChild={(selectedItem, index) => {
                // console.log('sera', props.value, index)
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    <Text style={styles.dropdown3BtnTxt}>
                      {selectedItem
                        ? (selectedItem.label > props.from ? selectedItem.label : 'Select ' + props.label)
                        : ''}
                    </Text>
                  </View>
                );
              }}
              renderDropdownIcon={() => {
                return (
                  <FontAwesome
                    name="chevron-down"
                    color={"black"}
                    size={14}
                    style={{ marginRight: 20 }}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown3DropdownStyle}
              rowStyle={styles.dropdown3RowStyle}
              renderCustomizedRowChild={(item, index) => {
                // console.log('sera>>>', item)

                return (
                  <View style={styles.dropdown3RowChildStyle}>
                    <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
                  </View>
                );
              }}
            /></View></View></View></View>
  )
}


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMicronnaire: {},
      selectedRD: {},
      selectedTrash: {},
      selectedMoisture: {},
      Micronnaire: [],
      selectedlength: {},
      RD: [],
      Trash: [],
      Moisture: [],
      lengthData: [],
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
    this.fromselectRef = {};
    this.lengthRef = null

    this.MicronnairefromRef = null
    this.MicronnairetoRef = null

    this.RDfromRef = null
    this.RDtoRef = null

    this.TrashfromRef = null
    this.TrashtoRef = null

    this.MoisturefromRef = null
    this.MoisturetoRef = null
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

  Fromselectmarg = (item, from) => {
    // console.log('item', item, from);
    // if (item < from) {
    //   alert(
    //     'please select smallert value than to value or change the to value',
    //   );
    //   this.fromselectRef.openDropdown();
    // } else if (item == from) {
    //   alert('please select deiffrent');
    //   this.fromselectRef.openDropdown();
    // } else {
    // }

    // (item > from) ? null :  this.fromselectRef.openDropdown();
  };

  selectmarg = (item, selected) => {
    // console.log('item', item, selected);

    // if (item > selected)
    //   alert(
    //     'please select bigger value than from value or change the from value',
    //   );
    // else alert('please select deiffrent');

    // this.selectRef.openDropdown();
  };
  addValuesSearchBuyer = (text, label, itemId, index, rangeType) => {
    // if (label === 'Length(mm)') {
    //   let dataArray = this.state.LengthinputData;
    //   let checkBool = false;
    //   if (dataArray.length !== 0) {
    //     dataArray.forEach(element => {
    //       if (element.index === index) {
    //         if (rangeType == 'from') {
    //           element.from = text;
    //           checkBool = true;
    //         } else if (element.hasOwnProperty('from')) {
    //           console.log('element.from>>>>', element.from);

    //           if (
    //             parseFloat(element.from) >= parseFloat(text) ||
    //             parseFloat(element.from) === parseFloat(text)
    //           ) {
    //             alert('Invalid selection');
    //             element.to = 0;
    //             return;
    //           } else {
    //             element.to = text;
    //             checkBool = true;
    //           }
    //         } else {
    //           alert('please select first from');
    //         }
    //       }
    //     });
    //   }
    //   if (checkBool) {
    //     this.setState({
    //       LengthinputData: dataArray,
    //     });
    //   } else {
    //     if (rangeType == 'from') {
    //       dataArray.push({
    //         attribute: label,
    //         attribute_value: text,
    //         index: index,
    //         itemId: itemId,
    //         from: text,
    //         to: 0,
    //       });
    //     } else {
    //       alert('please select starting value first');
    //     }
    //     this.setState({
    //       LengthinputData: dataArray,
    //     });
    //   }
    // } else {
      let dataArray = this.state.inputData;
      let checkBool = false;
      if (dataArray.length !== 0) {
        dataArray.forEach(element => {
          if (element.index === index) {
            if (rangeType == 'from') {
              element.from = text;
              checkBool = true;
            } else {
              if (parseFloat(element.from) >= parseFloat(text)) {
                alert('Invalid selection');
                element.to = 0;
              } else {
                element.to = text;
                checkBool = true;
              }
            }
          }
        });
      }
      if (checkBool) {
        this.setState({
          inputData: dataArray,
        });
      } else {
        if (rangeType == 'from') {
          dataArray.push({
            attribute: label,
            attribute_value: text,
            index: index,
            itemId: itemId,
            from: text,
            to: 0,
          });
        }
        this.setState({
          inputData: dataArray,
        });
      }
      console.log('Add Values: ' + JSON.stringify(this.state.inputData));
    
  };

  getProductAttributeArray = () => {
    try {
      if (this.state.selectedMicronnaire.to != '' &&
        this.state.selectedRD.to != ''  &&
        this.state.selectedlength.to != '' &&
        this.state.selectedTrash.to != '' &&
        this.state.selectedMoisture.to != ''
        )
        {
      let tempArray = [
        this.state.selectedMicronnaire,
        this.state.selectedlength, this.state.selectedRD, this.state.selectedTrash, this.state.selectedMoisture
      ];
      // this.state.inputData.map((el, i) =>
      //   tempArray.push({
      //     attribute: el.attribute,
      //     attribute_value: el.attribute_value,
      //   })
      // );
      // // this.state.inputData
      console.log("Post attri array: " + JSON.stringify(tempArray));
      return tempArray;
    }
    else {
      alert('please fill all the attributes')
    }
      //this.setState({attributeArry:tempArray})
    } catch (error) {
      console.log(error);
    }
  };


  checkValidation = () => {
    try {
      let attrValue = this.getProductAttributeArray();
      if (attrValue.length == 0) {
        alert(defaultMessages.en.required.replace("{0}", "atribute value"));
        return false;
      }
      if (this.state.displayBalesCount == 0) {
        alert(defaultMessages.en.required.replace("{0}", "bales"));
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  getProductAttributeArrayForSearchBuyer = () => {
    try {
      let tempArray = [];
      this.state.inputData.map((el, i) => {
        tempArray.push({
          attribute: el.attribute,
          from: el.from,
          to: el.to,
        });
      });
      return tempArray;
      //this.setState({attributeArry:tempArray})
    } catch (error) {
      console.log(error);
    }
  };

  onClickSearch = async () => {
    try {
      if (this.checkValidation()) {
        var self = this;
        self.setState({
          spinner: true,
        });
        // getProductAttributeArray
        var productName = this.state.selectedProductName;
        let attributeArray = {attribute_array: this.getProductAttributeArray()};

        let data = {
          type: 'post',
          seller_buyer_id: await EncryptedStorage.getItem('user_id'),
          product_id: this.state.selectedProductID,
          no_of_bales: this.state.displayBalesCount,
          attribute_array: this.getProductAttributeArray(),
          d_e: this.state.deName,
        };
        console.log('Serach to sell request: ' + JSON.stringify(data));
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));

        axios({
          url: api_config.BASE_URL + api_config.SEARCH_TO_SELL,
          method: 'POST',
          data: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(function (response) {
            console.log('search to sell response :', response);
            if (response.data.status == 200) {
              //REDIRECT TO SEARCH SCREEN
              self.setState({
                spinner: false,
              });

              if (response.data.data.length > 0) {
                self.props.navigation.navigate('SearchSelectSeller', {
                  data: response.data,
                  info: attributeArray,
                  pn:  self.state.selectedProductName,
                  bales: self.state.displayBalesCount,
                });
              } else {
                alert('No search data available');
              }
            } else if (response.data.status == 404) {
              self.setState({
                spinner: false,
              });
              alert('No search data available');
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
            console.log('error',JSON.stringify(error))
            alert(defaultMessages.en.serverNotRespondingMsg);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                self.setState({dropdownPlaceholder: productList[i].name, selectedProductName: productList[i].name});
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

            let lengthsf = response.data.data.filter(item => item.label === 'Micronnaire')
            let rd = response.data.data.filter(item => item.label === 'RD')
            let tr = response.data.data.filter(item => item.label === 'Trash(%)')
            let mo = response.data.data.filter(item => item.label === 'Moisture(%)')
            let lengths = response.data.data.filter(item => item.label === 'Length(mm)')



            // el.label !== "RD" &&
            //   el.label !== "Trash(%)" &&
            //   el.label !== "Moisture(%)"

            console.log('lengthsf', lengthsf[0])
            // console.log("Bhavin Thakkar: ", response.data.data)
            self.setState({
              lengthData: lengths[0],
              Micronnaire: lengthsf[0],
              RD: rd[0],
              Trash: tr[0],
              Moisture: mo[0],

              // MicronnaireTo: lengthsf[0],

              spinner: false,

              // productAttributeList: response.data.data,
            });

            // self.setState({
            //   productAttributeList: response.data.data,
            //   spinner: false,
            // });
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
      this.lengthRef.reset()

      this.MicronnairefromRef.reset()
      this.MicronnairetoRef.reset()

      this.RDfromRef.reset()
      this.RDtoRef.reset()

      this.TrashfromRef.reset()
      this.TrashtoRef.reset()

      this.MoisturefromRef.reset()
      this.MoisturetoRef.reset()

      this.setState({
        spinner: true,
        displayBalesCount: 100,
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
  setDEFlages = selectedItem => {
    this.setState({deName: selectedItem.label});

    if (selectedItem.label == 'Domestic') {
      this.setState({isShowBuyForDrpDown: true});
    } else {
      this.setState({isShowBuyForDrpDown: false});
      this.setState({isShowSpinningName: false});
    }
  };
  onClickPlusIcon = () => {
    try {
      this.state.displayBalesCount =
        this.state.displayBalesCount + this.state.balesCount;
      this.setState({displayBalesCount: this.state.displayBalesCount});
    } catch (error) {
      console.log(error);
    }
  };

  addValuesMicronnaire = (text, label, itemId, rangeType) => {

    var self = this
    let { selectedMicronnaire } = this.state;
    if (rangeType == 'from') {
      selectedMicronnaire = {
        attribute: label,
        // attribute_value : text,
        // itemId : itemId,
        from: text,
        to: '',
      }
    }
    else {
      selectedMicronnaire = {
        ...selectedMicronnaire,
        to: text
      }
    }
    self.setState({
      selectedMicronnaire,
      // inputData: [...this.state.inputData, selectedMicronnaire],
    })
  }

  addValuesSearchBuyer = (text, label, itemId, rangeType) => {
    var self = this
    let { selectedlength } = this.state;
    if (rangeType == 'from') {
      selectedlength = {
        attribute: label,
        // attribute_value: text,
        // itemId: itemId,
        from: text,
        to: text,
      }
    }
    else {
      selectedlength = {
        ...selectedlength,
        to: text
      }
    }

    self.setState({
      selectedlength,
      // inputData: [...this.state.inputData, selectedMicronnaire],
    })
  }
  addValuesRD = (text, label, itemId, rangeType) => {

    var self = this
    let { selectedRD } = this.state;
    if (rangeType == 'from') {
      selectedRD = {
        attribute: label,
        // attribute_value: text,
        // itemId: itemId,
        from: text,
        to: '',
      }
    }
    else {
      selectedRD = {
        ...selectedRD,
        to: text
      }
    }
    self.setState({
      selectedRD,
      // inputData: [...this.state.inputData, selectedRD],
    })
  }

  addValuesTrash = (text, label, itemId, rangeType) => {

    var self = this
    let { selectedTrash } = this.state;
    if (rangeType == 'from') {
      selectedTrash = {
        attribute: label,
        // attribute_value: text,
        // itemId: itemId,
        from: text,
        to: '',
      }
    }
    else {
      selectedTrash = {
        ...selectedTrash,
        to: text
      }
    }
    self.setState({
      selectedTrash,
      // inputData: [...this.state.inputData, selectedTrash],
    })
  }
  addValuesMoisture = (text, label, itemId, rangeType) => {

    var self = this
    let { selectedMoisture } = this.state;
    if (rangeType == 'from') {
      selectedMoisture = {
        attribute: label,
        // attribute_value: text,
        // itemId: itemId,
        from: parseInt(text),
        to: '',
      }
      // pelu function copy kari mukid dyo to
    }
    else {
      selectedMoisture = {
        ...selectedMoisture,
        to: text
      }
    }


    self.setState({
      selectedMoisture,
      // inputData: [...this.state.inputData, selectedMoisture],
    })
  }

  crateProductAttributeUI = () => {
    return (<View
      style={{
        flexDirection: "row",
        marginLeft: "5%",
        marginTop: 10,
        marginRight: "5%",
        height: 50,
        width: "80%",
        alignItems: "center",
      }}
    >
      <Text style={{ width: "35%", color: theme.colors.textColor }}>
        {this.state.lengthData.label}
      </Text>
      <View
        style={{
          width: "78%",
          alignItems: "center",
          justifyContent: "center",
        }}
      ><SelectDropdown
          data={this.state.lengthData.value}
          ref={(ref) => { this.lengthRef = ref; return true; }}

          onSelect={(selectedItem, j) => {
            console.log(selectedItem);
            this.addValuesSearchBuyer(
              selectedItem.label,
              this.state.lengthData.label,
              selectedItem.value,
              "from"
            );
          }}
          buttonStyle={styles.dropdown3BtnStyle}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View style={styles.dropdown3BtnChildStyle}>
                <Text style={styles.dropdown3BtnTxt}>
                  {selectedItem
                    ? selectedItem.label
                    : ''}
                </Text>
              </View>
            );
          }}
          renderDropdownIcon={() => {
            return (
              <FontAwesome
                name="chevron-down"
                color={"black"}
                size={14}
                style={{ marginRight: 20 }}
              />
            );
          }}
          dropdownIconPosition={"right"}
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
    </View>

    )
  };

  render() {
    return (
      <View
        style={{
          width: '100%',
          // height: '86%',
          paddingBottom: 30,
          marginTop: 10,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <ScrollView>
        <Spinner visible={this.state.spinner} color="#085cab" />
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
            {this.state.lengthData.hasOwnProperty('value') && this.crateProductAttributeUI()}
            {this.state.Micronnaire.hasOwnProperty('value') && <CustomComponent to={this.state.selectedMicronnaire.to}
              from={this.state.selectedMicronnaire.from} label={this.state.Micronnaire.label}
              fromref={(ref) => { this.MicronnairefromRef = ref; return true; }}
              toref={(ref) => { this.MicronnairetoRef = ref; return true; }}
              fromValue={this.state.Micronnaire.value}
              toValue={this.state.Micronnaire.value.filter(item => item.label > this.state.selectedMicronnaire.from)}
              onSelectFrom={(selectedItem, j) => {
                console.log(selectedItem);
                this.addValuesMicronnaire(
                  selectedItem.label,
                  this.state.Micronnaire.label,
                  selectedItem.value,
                  "from"
                );
              }}
              onSelectTo={(selectedItem, j) => {
                console.log(selectedItem);
                this.addValuesMicronnaire(
                  selectedItem.label,
                  this.state.Micronnaire.label,
                  selectedItem.value,
                  "to"
                );
              }}
            />}
            {this.state.RD.hasOwnProperty('value') && <CustomComponent to={this.state.selectedRD.to}
              from={this.state.selectedRD.from} label={this.state.RD.label}
              fromref={(ref) => { this.RDfromRef = ref; return true; }}
              toref={(ref) => { this.RDtoRef = ref; return true; }}
              fromValue={this.state.RD.value}
              toValue={this.state.RD.value.filter(item => item.label > this.state.selectedRD.from)}
              onSelectFrom={(selectedItem, j) => {
                console.log(selectedItem);
                this.addValuesRD(
                  selectedItem.label,
                  this.state.RD.label,
                  selectedItem.value,
                  "from"
                );
              }}
              onSelectTo={(selectedItem, j) => {
                console.log(selectedItem);
                this.addValuesRD(
                  selectedItem.label,
                  this.state.RD.label,
                  selectedItem.value,
                  "to"
                );
              }}
            />}
            {this.state.Trash.hasOwnProperty('value') && <CustomComponent to={this.state.selectedTrash.to}
              from={this.state.selectedTrash.from} label={this.state.Trash.label}
              fromValue={this.state.Trash.value}
              fromref={(ref) => { this.TrashfromRef = ref; return true; }}
              toref={(ref) => { this.TrashtoRef = ref; return true; }}
              toValue={this.state.Trash.value.filter(item => item.label > this.state.selectedTrash.from)}
              onSelectFrom={(selectedItem, j) => {
                console.log(selectedItem);
                this.addValuesTrash(
                  selectedItem.label,
                  this.state.Trash.label,
                  selectedItem.value,
                  "from"
                );
              }}
              onSelectTo={(selectedItem, j) => {
                console.log(selectedItem);
                this.addValuesTrash(
                  selectedItem.label,
                  this.state.Trash.label,
                  selectedItem.value,
                  "to"
                );
              }}
            />}
            {this.state.Moisture.hasOwnProperty('value') && <CustomComponent to={this.state.selectedMoisture.to}
              from={this.state.selectedMoisture.from} label={this.state.Moisture.label}
              fromValue={this.state.Moisture.value}
              fromref={(ref) => { this.MoisturefromRef = ref; return true; }}
              toref={(ref) => { this.MoisturetoRef = ref; return true; }}
              toValue={this.state.Moisture.value.filter(item => +item.label > +this.state.selectedMoisture.from)}
              onSelectFrom={(selectedItem, j) => {
                console.log(selectedItem);
                this.addValuesMoisture(
                  selectedItem.label,
                  this.state.Moisture.label,
                  selectedItem.value,
                  "from"
                );
              }}
              onSelectTo={(selectedItem, j) => {
                console.log(selectedItem);
                this.addValuesMoisture(
                  selectedItem.label,
                  this.state.Moisture.label,
                  selectedItem.value,
                  "to"
                );
              }}
            />}

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
            <Text
              style={{
                width: '35%',
                color: theme.colors.textColor,
                left: '6%',
                fontFamily: 'Poppins-Medium',
              }}>
              D/E
            </Text>
            {/* <DropDownPicker
                    placeholder={'Domestic'}
                    open={this.state.deOpenState}
                    value={this.state.deValue}
                    items={this.state.deList}
                    setOpen={this.setDEOpenState}
                    setValue={this.setDEValue}
                    setItems={this.setDEItemsState}
                    containerStyle={{
                      height: 50,
                      width: '90%',
                      marginTop: 5,
                      marginLeft: '5%',
                    }}
                    listMode="MODAL"
                    onChangeValue={item => this.setState({deName:item})}
                    scrollViewProps={{
                      decelerationRate: 'fast',
                    }}
                  /> */}
            <View
              style={{
                height: 50,
                width: '90%',
                marginTop: 5,
                marginLeft: '5%',
              }}>
              <SelectDropdown
                data={this.state.deList}
                onSelect={(selectedItem, i) => {
                  console.log(selectedItem);
                  this.setDEFlages(selectedItem);
                  //this.addValues(selectedItem.label, el.label)
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Text style={styles.dropdown3BtnTxt}>
                        {selectedItem ? selectedItem.label : this.state.deName}
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
              onPress={() => this.onClickSearch()}>
              Search
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}
