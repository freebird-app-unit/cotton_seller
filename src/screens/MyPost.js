import React, { Component } from "react";
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
} from "react-native";
import { baseUrl } from "../components/Global";
import { fontSizeMyPostCenterText } from "../components/Global";
import { vLineMyPostStyle } from "../components/Global";
import { wfrInNegotiation } from "../components/Global";

import Background from "../components/Background";
import Header from "../components/Header";
import { Card } from "react-native-elements";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Appbar, Searchbar, Button, Badge } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import Icon from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import { theme } from "../core/theme";
import TextInput from "../components/TextInput";
import api_config from "../Api/api";
import axios from "axios";
import Plus from "../assets/Plus";
import Bell_Icon from "../assets/Bell";
import History_Icon from "../assets/History";
import Newsfeed_Icon from "../assets/NewsFeed";
import MCX_Icon from "../assets/MCX";
import Calculator_Icon from "../assets/Calculator";
import ChangePassword_Icon from "../assets/ChangePassword";
import Profile_Icon from "../assets/Profile";
import Reports_Icon from "../assets/Reports";
import TransactionTracking_Icon from "../assets/TransactionTracking";
import { fieldValidator } from "../helpers/fieldValidator";
import { priceValidator } from "../helpers/priceValidator";
import MyPostGreen_Icon from "../assets/MyPostGreen";
import defaultMessages from "../helpers/defaultMessages";
import { Picker } from "@react-native-picker/picker";
//svgs
import Home from "../assets/Home";
import NoRecordsFound_Icon from "../assets/NoRecodsFound";
import SearchToSell_Icon from "../assets/SearchToSell";
import PostToSell_Icon from "../assets/PostToSell";
import MyPost_Icon from "../assets/MyPost";
import MyContracts_Icon from "../assets/MyContracts";
import Logout_Icon from "../assets/Logout";
import NotificationToBuyer_Icon from "../assets/NotificationToBuyer";
import Employee from "../assets/Employee";
import EmployeeGray from "../assets/EmployeeGray";
import CustomerIcon from "../assets/CustomerIcon";
import FilterSettings from "../assets/FilterSettings";
import Minus from "../assets/Minus";
import MPIcon1 from "../assets/MPIcon1";
import MPIcon2 from "../assets/MPIcon2";
import PlusRound from "../assets/PlusRound";
import MinusRound from "../assets/MinusRound";
import SetPassword from "../assets/SetPassword";
import EncryptedStorage from "react-native-encrypted-storage";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NewsFeedView from "../components/NewsFeedView";
import Profile from "../components/Profile";
import Wallet from "../components/Wallet";
import CalculatorView from "../components/CalculatorView";
import io from "socket.io-client";
import styles from "./Styles";
if (!window.location) {
  // App is running in simulator
  window.navigator.userAgent = "ReactNative";
}

// const socket = io.connect('http://cottontradecentre.com:6001', { transports: ['websocket'] }); //live

import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from "../helpers/backHandler";
import { exitAlert } from "../helpers/customAlert";
import RNFetchBlob from "rn-fetch-blob";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      loading: "true",
      refreshing: false,
      isLoading: true,
      userID: 0,
      isNewsFeed: false,
      isProfile: false,
      ProfileData: [],
      spinner: true,
      jsonData: {},
      dropdownPlaceholder: "",
      balesCount: 100,
      displayBalesCount: 100,
      balesPrice: "",
      productJsonData: {},
      productAttributeList: {},
      myActivePost: {},
      arrNegotiationList: [],
      arrNotificationList: {},
      myContractListArray: {},
      txtSpinningMillName: "",
      attributeValue: [{}],
      selectedProductID: 0,
      selectedProductName: "",
      inputData: [],
      LengthinputData: [],
      attributeArry: [],
      balespriceFocus: false,
      token: "",
      balesPriceError: "",
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
        { label: "Maharashtra", value: "1" },
        { label: "Rajasthan", value: "2" },
        { label: "Punjab", value: "3" },
        { label: "Karnatak", value: "4" },
      ],
      deList: [
        { label: "Domestic", value: "Domestic" },
        { label: "Export", value: "Export" },
      ],
      deName: "Domestic",
      buyForList: [
        { label: "Self", value: "Self" },
        { label: "Other", value: "Other" },
      ],
      isShowBuyForDrpDown: true,
      isShowSpinningName: false,
      buyForDropDownValue: "Self",
      arrProductAttributeValue: [
        { label: "Maharashtra", value: "1" },
        { label: "Rajasthan", value: "2" },
        { label: "Punjab", value: "3" },
        { label: "Karnatak", value: "4" },
      ],
      isPostToSell: false,
      isSearchToSell: false,
      isNotificationToBuyer: false,
      isDashboard: true,
      isCalculator: false,
      isWallet: false,
      isMyContracts: false,
      titleOfScreen: "Dashboard",
      dealTabStyle1: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#69BA53",
        marginLeft: 0,
        marginRight: 5,
        marginTop: 10,
        borderRadius: 5,
      },
      dealTabStyle2: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0F5F9",
        marginLeft: 5,
        marginRight: 0,
        marginTop: 10,
        borderRadius: 5,
      },
      dealTabTextBox1: {
        height: 40,
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        textAlignVertical: "center",
        color: "white",
        fontFamily: "Poppins-Regular",
      },
      dealTabTextBox2: {
        height: 40,
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        textAlignVertical: "center",
        color: theme.colors.textColor,
        fontFamily: "Poppins-Regular",
      },
      btnActiveTextColor: theme.colors.primary,
      btnCompletedTextColor: "gray",
      btnActiveContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.primary,
      },
      btnCompletedContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        opacity: 0.5,
      },
      btnActiveTextColor: theme.colors.primary,
      btnCompletedTextColor: "gray",
    };

    // this.setValue = this.setValue.bind(this);
    // this.setOpenState = this.setOpenState.bind(this);
    // this.setItemsState = this.setItemsState.bind(this);

    // this.setDEValue = this.setDEValue.bind(this);
    // this.setDEOpenState = this.setDEOpenState.bind(this);
    // this.setDEItemsState = this.setDEItemsState.bind(this);
  }

  componentDidMount() {
    console.log("hellow", this.props);
    this.getMyActivePost();
  }

  onClickActive = () => {
    this.setState({
      isMyPostActiveClicked: true,
      isMyPostCompletedClicked: false,
      myActivePost: [],
      spinner: true,
      btnActiveContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.primary,
      },
      btnCompletedContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        opacity: 0.5,
      },
      btnActiveTextColor: theme.colors.primary,
      btnCompletedTextColor: "gray",
    });

    this.getMyActivePost();
  };

  onPostPressed = () => {
    this.setState({
      isAllBid: false,
      isBided: false,
      isDeal: true,
    });
  };

  onClickCompleted = () => {
    this.setState({
      isMyPostActiveClicked: false,
      isMyPostCompletedClicked: true,
      spinner: true,
      myActivePost: [],
      btnActiveContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        opacity: 0.5,
      },
      btnCompletedContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.primary,
      },
      btnActiveTextColor: "gray",
      btnCompletedTextColor: theme.colors.primary,
    });
    this.getMyCompletedPost();
  };

  getMyCompletedPost = async () => {
    try {
      var self = this;
      let data = {
        seller_id: await EncryptedStorage.getItem("user_id"),
        user_type: "seller",
        type: "post",
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      // console.log("Completed post request: " + JSON.stringify(data))
      axios({
        url: api_config.BASE_URL + api_config.COMPLETED_DEALS,
        method: "POST",
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {
          //alert('my completed post list response :'+ JSON.stringify(response.data.data));
          self.setState({ myActivePost: [], spinner: false });
          if (response.data.status == 200) {
            self.setState({ myActivePost: response.data.data });
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          self.setState({
            spinner: false,
            message: "Something bad happened " + error,
          }),
            alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
    }
  };
  getMyActivePost = async () => {
    try {
      var self = this;
      let data = { seller_id: await EncryptedStorage.getItem("user_id") };

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.MY_ACTIVE_POST,
        method: "POST",
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {
          // console.log('my active post list response :', response.data.data);
          self.setState({
            myActivePost: [],
            spinner: false,
            refreshing: false,
          });
          if (response.data.status == 200) {
            self.setState({ myActivePost: response.data.data });
          } else {
            console.log(response.data.message);
          }
        })
        .catch(function (error) {
          self.setState({
            spinner: false,
            refreshing: false,
            message: "Something bad happened " + error,
          }),
            alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
    }
  };

  onChanged(text) {
    this.setState({
      balesPrice: text.replace(/[^0-9]/g, ""),
    });
  }

  onClickMyPostDetails = (obj, status) => {
    console.log("MypostDetails -" + status);
    this.props.navigation.navigate("MyPostDetails", {
      data: obj,
      status: status,
      type: obj.type
    });
  };

  onClickCancelPost = async (postID, type) => {
    try {
      this.setState({
        spinner: true,
      });
      var self = this;
      let api_url = "";
      let data;

      if (type == "post") {
        data = {
          seller_buyer_id: await EncryptedStorage.getItem("user_id"),
          user_type: "seller",
          post_id: postID,
        };
        api_url = api_config.BASE_URL + api_config.CANCEL_POST;
      } else {
        data = {
          seller_buyer_id: await EncryptedStorage.getItem("user_id"),
          user_type: "seller",
          notification_id: postID,
        };
        api_url = api_config.BASE_URL + api_config.CANCEL_NOTIFICATION;
      }
      console.log(JSON.stringify(data));

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      axios({
        url: api_url,
        method: "POST",
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {
          console.log("delete post response :", response.status);
          if (response.status == 200) {
            alert("Post cancelled successfully.");
            self.getMyActivePost();
          } else {
            self.setState({
              spinner: false,
            });
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          self.setState({
            spinner: false,
            message: "Something bad happened " + error,
          }),
            console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  onClickPlusIcon = () => {
    try {
      this.state.displayBalesCount =
        this.state.displayBalesCount + this.state.balesCount;
      this.setState({ displayBalesCount: this.state.displayBalesCount });
    } catch (error) {
      console.log(error);
    }
  };
  createMyPostAttribute = (attributeArray) => {
    try {
      if (attributeArray.length > 0) {
        return attributeArray.map((el, i) => (
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                flex: 1,
                color: theme.colors.textColor,
                fontSize: fontSizeMyPostCenterText,
                textAlign: "center",
                textAlignVertical: "center",
                fontFamily: "Poppins-Regular",
              }}
            >
              {el.attribute}
            </Text>

            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                flex: 1,
                color: theme.colors.textColor,
                fontSize: fontSizeMyPostCenterText,
                fontWeight: "bold",
                textAlign: "center",
                textAlignVertical: "center",
                fontFamily: "Poppins-Regular",
              }}
            >
              {el.attribute_value}(mm)
            </Text>
          </View>

          // <View style={vLineMyPostStyle}></View>
        ));
      }
      return (
        <View
          style={{
            height: "90%",
            flex: 1,
            flexDirection: "column",
            //backgroundColor: 'red',
            justifyContent: "center",
            alignItems: "center",
            marginTop: "40%",
          }}
        >
          <NoRecordsFound_Icon />
          <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular" }}>
            Sorry, no records available
          </Text>
        </View>
      );
    } catch (error) {
      console.log(error);
    }
  };

  createMyPostUI = () => {
    try {
      if (this.state.isMyPostActiveClicked) {
        if (this.state.myActivePost.length > 0) {
          return this.state.myActivePost.map((el, i) => (
            <TouchableOpacity
              onPress={() => this.onClickMyPostDetails(el, "active")}
            >
              <View style={{ width: "100%" }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "5%",
                    marginRight: "5%",
                    height: 40,
                  }}
                >
                  <View style={{ marginTop: 5, marginRight: 10 }}>
                    {el.type == "notification" ? (
                      <View>
                        <Bell_Icon />
                      </View>
                    ) : (
                      <View>
                        <MyPostGreen_Icon />
                      </View>
                    )}
                  </View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      flex: 1,
                      color: theme.colors.textColor,
                      fontSize: 16,
                      textAlignVertical: "center",
                      fontFamily: "Poppins-SemiBold",
                    }}
                  >
                    {el.product_name}
                  </Text>

                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      width: "50%",
                      height: "100%",
                      fontSize: 16,
                      textAlign: "right",
                      alignItems: "center",
                      textAlignVertical: "center",
                      fontFamily: "Poppins-SemiBold",
                    }}
                  >
                    {el.no_of_bales} Bales
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "5%",
                    marginTop: 10,
                    marginRight: "5%",
                    height: 40,
                  }}
                >
                  {this.createMyPostAttribute(el.attribute_array)}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "5%",
                    marginTop: 10,
                    marginRight: "5%",
                    height: 40,
                  }}
                >
                  <View style={{ flex: 1, marginTop: 10 }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: theme.colors.textColor,
                        fontSize: 12,
                        opacity: 0.5,
                        textAlignVertical: "center",
                        fontFamily: "Poppins-Medium",
                      }}
                    >
                      {el.date}
                    </Text>
                  </View>

                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      width: "29%",
                      height: "100%",
                      fontSize: 14,
                      textAlign: "center",
                      alignItems: "center",
                      color: theme.colors.textColor,
                      top: 5,
                      textAlignVertical: "center",
                      fontFamily: "Poppins-SemiBold",
                    }}
                  >
                    ₹ {el.price}
                  </Text>
                  <Text
                    numberOfLines={1}
                    onPress={() => this.onClickCancelPost(el.id, el.type)}
                    ellipsizeMode="tail"
                    style={{
                      width: "35%",
                      height: "80%",
                      marginTop: "2%",
                      fontSize: 14,
                      textAlign: "center",
                      alignItems: "center",
                      color: "white",
                      borderRadius: 5,
                      backgroundColor: "#69BA53",
                      textAlignVertical: "center",
                      fontFamily: "Poppins-SemiBold",
                    }}
                  >
                    Cancel
                  </Text>
                </View>
                <View
                  style={{
                    width: "90%",
                    left: "5%",
                    height: 1,
                    marginTop: 10,
                    backgroundColor: "#D1D1D1",
                  }}
                ></View>
              </View>
            </TouchableOpacity>
          ));
        }
        return (
          <View
            style={{
              height: "90%",
              flex: 1,
              flexDirection: "column",
              //backgroundColor: 'red',
              justifyContent: "center",
              alignItems: "center",
              marginTop: "40%",
            }}
          >
            <NoRecordsFound_Icon />
            <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular" }}>
              Sorry, no records available
            </Text>
          </View>
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  createMyPostCompletedUI = () => {
    try {
      if (this.state.isMyPostCompletedClicked) {
        if (this.state.myActivePost.length > 0) {
          return this.state.myActivePost.map((el, i) => (
            <TouchableOpacity
              onPress={() => this.onClickMyPostDetails(el, el.status)}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "5%",
                    marginRight: "5%",
                    height: 40,
                  }}
                >
                  <View style={{ marginTop: 5, marginRight: 10 }}>
                    {el.type == "notification" ? (
                      <View>
                        <Bell_Icon />
                      </View>
                    ) : (
                      <View>
                        <MyPostGreen_Icon />
                      </View>
                    )}
                  </View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      flex: 1,
                      color: theme.colors.textColor,
                      fontSize: 16,
                      textAlignVertical: "center",
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    {el.product_name}
                  </Text>

                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      width: "50%",
                      height: "100%",
                      fontSize: 16,
                      textAlign: "right",
                      alignItems: "center",
                      textAlignVertical: "center",
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    {el.no_of_bales} Bales
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "5%",
                    marginTop: 10,
                    marginRight: "5%",
                    height: 35,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: theme.colors.textColor,
                        fontSize: 12,
                        opacity: 0.5,
                        textAlignVertical: "center",
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      Post time
                    </Text>

                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: theme.colors.textColor,
                        fontSize: 12,
                        textAlignVertical: "center",
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {el.created_at}
                    </Text>
                  </View>
                  {el.status == "complete" ? (
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        width: "35%",
                        height: "100%",
                        fontSize: 14,
                        textAlign: "center",
                        alignItems: "center",
                        color: "#69BA53",
                        borderStyle: "dotted",
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: "#69BA53",
                        textAlignVertical: "center",
                        fontFamily: "Poppins-Medium",
                      }}
                    >
                      Deal Done
                    </Text>
                  ) : (
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        width: "35%",
                        height: "100%",
                        fontSize: 14,
                        textAlign: "center",
                        alignItems: "center",
                        color: "#BA5369",
                        borderStyle: "dotted",
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: "#BA5369",
                        textAlignVertical: "center",
                        fontFamily: "Poppins-Medium",
                      }}
                    >
                      Cancelled
                    </Text>
                  )}
                </View>
                {el.status == "complete" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: "5%",
                      marginTop: 10,
                      marginRight: "5%",
                      height: 35,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          color: theme.colors.textColor,
                          fontSize: 12,
                          opacity: 0.5,
                          textAlignVertical: "center",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        Buyer Name
                      </Text>

                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          color: theme.colors.textColor,
                          fontSize: 12,
                          textAlignVertical: "center",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {el.done_by}
                      </Text>
                    </View>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        width: "35%",
                        height: "100%",
                        fontSize: 14,
                        textAlign: "right",
                        alignItems: "center",
                        color: "black",
                        textAlignVertical: "center",
                        fontFamily: "Poppins-SemiBold",
                      }}
                    >
                      ₹ {el.price}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: "5%",
                      marginTop: 10,
                      marginRight: "5%",
                      height: 35,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          color: theme.colors.textColor,
                          fontSize: 12,
                          opacity: 0.5,
                          textAlignVertical: "center",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        Cancel time
                      </Text>

                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          color: theme.colors.textColor,
                          fontSize: 12,
                          textAlignVertical: "center",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {el.updated_at}
                      </Text>
                    </View>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        width: "35%",
                        height: "100%",
                        fontSize: 14,
                        textAlign: "right",
                        alignItems: "center",
                        color: "black",
                        fontFamily: "Poppins-SemiBold",
                        textAlignVertical: "center",
                      }}
                    >
                      ₹ {el.price}
                    </Text>
                  </View>
                )}

                <View
                  style={{
                    width: "90%",
                    height: 1,
                    backgroundColor: "#D1D1D1",
                    marginBottom: 10,
                    marginTop: 10,
                    marginLeft: 19,
                  }}
                />
              </View>
            </TouchableOpacity>
          ));
        }
        return (
          <View
            style={{
              height: "90%",
              flex: 1,
              flexDirection: "column",
              //backgroundColor: 'red',
              justifyContent: "center",
              alignItems: "center",
              marginTop: "40%",
            }}
          >
            <NoRecordsFound_Icon />
            <Text style={{ fontSize: 14, fontFamily: "Poppins-Regular" }}>
              Sorry, no records available
            </Text>
          </View>
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  addValues = (text, label, itemId, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach((element) => {
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
    console.log("Add Values: " + JSON.stringify(this.state.inputData));
  };

  _onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.getMyActivePost();
    // getCallNews(1);
  };

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <Spinner visible={this.state.spinner} color="#085cab" />

        <View style={{ marginTop: 20 }}>
          <View style={styles.container}>
            <View style={this.state.btnActiveContainer}>
              <TouchableOpacity onPress={() => this.onClickActive()}>
                <Button
                  mode="text"
                  uppercase={false}
                  color={this.state.btnActiveTextColor}
                  labelStyle={{ fontSize: 14, fontFamily: "Poppins-Regular" }}
                >
                  Active
                </Button>
              </TouchableOpacity>
            </View>

            <View style={this.state.btnCompletedContainer}>
              <TouchableOpacity onPress={() => this.onClickCompleted()}>
                <Button
                  mode="text"
                  uppercase={false}
                  color={this.state.btnCompletedTextColor}
                  labelStyle={{ fontSize: 14, fontFamily: "Poppins-Regular" }}
                >
                  Completed
                </Button>
              </TouchableOpacity>
            </View>
          </View>

          {this.createMyPostUI()}
          {this.createMyPostCompletedUI()}
        </View>
      </ScrollView>
    );
  }
}
