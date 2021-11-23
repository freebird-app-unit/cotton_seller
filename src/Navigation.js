import React, { useEffect, useFocusEffect, BackHandler } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './core/theme'
import { View, Text, Alert, StatusBar, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Appbar, Searchbar, Button, Badge } from 'react-native-paper';
import { navigationRef } from '../RootNavigation';
import {
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    SplashScreen,
    SetPasswordScreen,
    VerifyOtpScreen,
    ChangePasswordScreen,
    SearchSelectSeller,
    DealDetails, Dashboard,
    NegotiateDetails,
    NotificationSelectSeller,
    MyPostDetails,
    MyContractFilter,
    MyContractDetails,
    MultipleNegotiationList,
    HomeScreen, MenuScreen,
    PostToSell,
    SearchToSell,
    NotificationToBuyer,
    MyPost,
    MyContract,
    NewsFeedView,
    Wallet,
    Profile, OTPVerificationDeal
} from './screens'
import styles from './screens/Styles'
import EditProfile from './components/EditProfile'
import NewsSingle from './components/NewsSingle'
import MCXScreen from './components/MCXScreen'

import Custom from './components/Custom'
// import notifee, { EventType, AndroidImportance } from '@notifee/react-native';
import Plan from './components/Plan'
import RegisterPlan from './components/RegisterPlan'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from './components/responsive-ratio';
// import Wallet from './src/components/Wallet'
import { FirstRoute, SecondRoute, ThirdRoute } from './components/CalculatorView'
import { Post, Contract } from './screens/ReportScreen'


// import firebase from '@react-native-firebase/app';
// import messaging from '@react-native-firebase/messaging';
// import EncryptedStorage from 'react-native-encrypted-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createIconSetFromFontello } from 'react-native-vector-icons';

const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator();

const tabnavi = ({ navigation }) => {
    // console.log('nabvi', navigation)
    return (
        <View style={{ flex: 1, backgroundColor: '#333', }}>
            <View style={{
                flexDirection: 'row', paddingHorizontal: wp(5),
                marginTop: hp(4), height: hp(9), alignItems: 'center', justifyContent: 'space-between'
            }}>
                <Ionicons name='chevron-back-outline' size={hp(3)} color='#fff' style={{ width: wp(30) }} onPress={() => navigation.goBack()} />
                <Text style={{ alignSelf: 'center', color: '#fff', fontSize: hp(3), fontFamily: 'Poppins - Regular' }}>Calculator</Text>
                <View style={{ width: wp(30) }} />

            </View>
            <View style={{
                flex: 1,
                width: '100%',
                // height: hp(86),
                paddingBottom: 30,
                paddingTop: hp(3),
                marginTop: hp(2),
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}>
                <Tab.Navigator tabBarOptions={{
                    labelStyle: { fontSize: hp(2), fontFamily: 'Poppins-Regular' },
                    activeTintColor: theme.colors.primary,
                    inactiveTintColor: '#afafaf',
                    indicatorStyle: { backgroundColor: theme.colors.primary }
                }}>
                    <Tab.Screen name="Ginning" component={FirstRoute} />
                    <Tab.Screen name="Spinning" component={SecondRoute} />
                    <Tab.Screen name="Exports" component={ThirdRoute} />
                </Tab.Navigator>
            </View>
        </View>
    );
}


const ReportTab = ({ navigation }) => {
    // console.log('nabvi', navigation)
    return (
        <View style={{ flex: 1, backgroundColor: '#333', }}>
            <View style={{
                flexDirection: 'row', paddingHorizontal: wp(5),
                marginTop: hp(4), height: hp(9), alignItems: 'center', justifyContent: 'space-between'
            }}>
                <Ionicons name='chevron-back-outline' size={hp(3)} color='#fff' style={{ width: wp(30) }} onPress={() => navigation.goBack()} />
                <Text style={{ alignSelf: 'center', color: '#fff', fontSize: hp(3), fontFamily: 'Poppins - Regular' }}>Report</Text>
                <View style={{ width: wp(30) }} />

            </View>
            <View style={{
                flex: 1,
                width: '100%',
                // height: hp(86),
                paddingBottom: 30,
                paddingTop: hp(3),
                marginTop: hp(2),
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}>
                <Tab.Navigator tabBarOptions={{
                    labelStyle: { fontSize: hp(2), fontFamily: 'Poppins-Regular' },
                    activeTintColor: theme.colors.primary,
                    inactiveTintColor: '#afafaf',
                    indicatorStyle: { backgroundColor: theme.colors.primary }
                }}>
                    <Tab.Screen name="Post" component={Post} />
                    <Tab.Screen name="Contract" component={Contract} />
                </Tab.Navigator>
            </View>
        </View>
    );
}

const AppHeading = (props) => {
    console.log('props', props)
    return (
        <View style={{ width: '100%', height: hp(9), marginTop: hp(4) }}>
            <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                {props.menu ? <Appbar.Action
                    icon="menu"
                    color={props.color ? props.color : "white"}
                    onPress={props.leftPress}
                /> :
                    <Appbar.Action
                        icon={() => <Ionicons name='chevron-back-outline' size={hp(3)} color= {props.color ? props.color : '#fff'} />}
                        color={props.color ? props.color : "white"}
                        onPress={props.leftPress}
                    />}
                <Appbar.Content
                    style={{ alignItems: 'center' }}
                    color= {props.color ? props.color : "white"}
                    title={props.title}
                    titleStyle={{ fontSize: 20, fontFamily: "Poppins-SemiBold" }}
                />
                {props.filter ? <Appbar.Action
                    icon="notification-clear-all"
                    color={props.color ? props.color : "white"}
                    onPress={
                        props.rightPress
                        // this.setState({ isFilterShow: true });
                        // // if (this.state.isMyContracts || this.state.isProfile) {
                        //   this.state.isMyContracts && this.props.navigation.navigate
                        //     ('MyContractFilter', { productList: this.state.productItem });
                        //   this.state.isProfile && this.props.navigation.navigate('EditProfile', { data: this.state.ProfileData })

                    }
                /> : <Appbar.Action
                    icon="menu"
                    color="transparent"
                    onPress={() => null}
                />}
            </Appbar.Header>
        </View>
    )
}

const AppHeadingProfile = (props) => {
    console.log('props', props)
    return (
        <View style={{ width: '100%', height: hp(9), marginTop: hp(4) }}>
            <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                {props.menu ? <Appbar.Action
                    icon="menu"
                    color="white"
                    onPress={props.leftPress}
                /> :
                    <Appbar.Action
                        icon={() => <Ionicons name='chevron-back-outline' size={hp(3)} color='#fff' />}
                        color="white"
                        onPress={props.leftPress}
                    />}
                <Appbar.Content
                    style={{ alignItems: 'center' }}
                    color="white"
                    title={props.title}
                    titleStyle={{ fontSize: 20, fontFamily: "Poppins-SemiBold" }}
                />
                {

                    props.profile ? <Appbar.Action
                        icon={() => <Image tintColor={'white'} style={{ height: hp(3), width: hp(3) }} source={require('./assets/edit-icon.png')} />}
                        color={"white"}
                        onPress={
                            props.rightPress
                            // this.setState({ isFilterShow: true });
                            // // if (this.state.isMyContracts || this.state.isProfile) {
                            //   this.state.isMyContracts && this.props.navigation.navigate
                            //     ('MyContractFilter', { productList: this.state.productItem });
                            //   this.state.isProfile && this.props.navigation.navigate('EditProfile', { data: this.state.ProfileData })

                        }
                    /> : <Appbar.Action
                        icon="menu"
                        color="transparent"
                        onPress={() => null}
                    />

                }

            </Appbar.Header>
        </View>
    )
}

const home = ({ navigation, route }) => {
    // console.log('navigation>', navigation)
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <AppHeading title={'Dashboard'} menu leftPress={() => navigation.navigate('MenuScreen')} />
            <View
                style={styles.flex}>
                <HomeScreen navigation={navigation} route={route} />
            </View>
        </View>
    )
}
const mcxScreenFunction = ({ navigation, route }) => {
    // console.log('navigation>', navigation)
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <AppHeading title={'MCX'} menu leftPress={() => navigation.navigate('MenuScreen')} />
            <View
                style={styles.flex}>
                <MCXScreen navigation={navigation} route={route} />
            </View>
        </View>
    )
}

const MyContractFunction = ({ navigation, route }) => {
    // console.log('navigation>??', route)
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <AppHeading title={'My Contract'} menu filter leftPress={() => navigation.navigate('MenuScreen')} rightPress={() =>
                navigation.navigate('MyContractFilter', { productList: route.params.productList })} />
            <View
                style={styles.flex}>
                <MyContract navigation={navigation} />
            </View>
        </View>
    )
}

const MyContractDetailsFunction = ({ navigation, route }) => {
    // console.log('navigation>??', route)
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <AppHeading title={'My Contract Details'} menu filter leftPress={() => navigation.navigate('MenuScreen')} rightPress={() => { }} />
            <View
                style={styles.flex}>
                <MyContractDetails navigation={navigation} route={route} />
            </View>
        </View>
    )
}

const PostToSellFunction = ({ navigation }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Post to sell'} menu leftPress={() => navigation.navigate('MenuScreen')} />
    <View
        style={styles.flex}>
        <PostToSell navigation={navigation} />
    </View>
</View>

const SearchToSellFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Search to sell'} menu leftPress={() => navigation.navigate('MenuScreen')} />
    <View
        style={styles.flex}>
        <SearchToSell navigation={navigation} route={route} />
    </View>
</View>

const NotificationToBuyerFunction = ({ navigation }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Notification to buyer'} menu leftPress={() => navigation.navigate('MenuScreen')} />
    <View
        style={styles.flex}>
        <NotificationToBuyer navigation={navigation} />
    </View>
</View>

const MyPostFunction = ({ navigation }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'My Post'} menu leftPress={() => navigation.navigate('MenuScreen')} />
    <View
        style={styles.flex}>
        <MyPost navigation={navigation} />
    </View>
</View>

const NewsFeedViewFunction = ({ navigation }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'News Feed'} menu leftPress={() => navigation.navigate('MenuScreen')} />
    <View
        style={styles.flex}>
        <NewsFeedView navigation={navigation} />
    </View>
</View>

const MyContractFilterFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Filter'} leftPress={() => navigation.goBack()} />
    <View
        style={styles.flex}>
        <MyContractFilter navigation={navigation} route={route} />
    </View>
</View>

const PlanFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Plan'} leftPress={() => navigation.goBack()} />
    <View
        style={styles.flex}>
        <Plan navigation={navigation} route={route} />
    </View>
</View>

const SearchSelectSellerFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Select Buyer'} leftPress={() => navigation.goBack()} />
    <View
        style={styles.flex}>
        <SearchSelectSeller navigation={navigation} route={route} />
    </View>
</View>

const RegisterScreenFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#f4fafe' }}>
    <AppHeading color='#333' title={'Create an account'} leftPress={() => navigation.goBack()} />
    <View
        style={styles.flex}>
        <RegisterScreen navigation={navigation} route={route} />
    </View>
</View>


const MyPostDetailsFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'My Post Details'} leftPress={() => navigation.goBack()} />
    <View
        style={styles.flex}>
        <MyPostDetails navigation={navigation} route={route} />
    </View>
</View>





const RegisterPlanFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Plan'} leftPress={() => navigation.goBack()} />
    <View
        style={styles.flex}>
        <RegisterPlan navigation={navigation} route={route} />
    </View>
</View>



const NotificationSelectSellerFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Select Buyer'} leftPress={() => navigation.goBack()} />
    <View
        style={styles.flex}>
        <NotificationSelectSeller navigation={navigation} route={route} />
    </View>
</View>



const WalletFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Wallet'} menu leftPress={() => navigation.navigate('MenuScreen')} />
    <View
        style={styles.flex}>
        <Wallet navigation={navigation} route={route} />
    </View>
</View>

const ProfileFunction = ({ navigation, route }) => {
    // console.log('navigation>?? profiole', route.params)
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <AppHeadingProfile profile title={'Profile'} menu filter leftPress={() => navigation.navigate('MenuScreen')}
                rightPress={() => navigation.navigate('EditProfile', { data: route.params != undefined ? route.params.ProfileData : [] })} />
            <View
                style={styles.flex}>
                <Profile navigation={navigation} route={route} />
            </View>
        </View>
    )
}

const MultipleNegotiationListFunction = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ width: '100%', height: hp(9), marginTop: hp(4) }}>

                <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                    <Appbar.BackAction
                        color="black"
                        onPress={() => navigation.goBack()}
                    />
                    <Appbar.Content
                        style={{ alignItems: 'center' }}
                        color="#333"
                        title={route.params.Title}
                        titleStyle={{ fontSize: 20, fontFamily: 'Poppins-SemiBold', color: '#333' }}
                    />
                    <Appbar.Action
                        icon={() => <Ionicons
                            name="ios-information-circle-outline"
                            size={25}
                            color="black"
                        />}
                        color="black"
                        onPress={() => {
                            navigation.navigate('Participant', {
                                prevScrName: 'HomeScreen',
                            });
                        }}
                    />
                </Appbar.Header>
            </View>
            <View
                style={styles.flex}>
                <MultipleNegotiationList navigation={navigation} route={route} />
            </View>
        </View>
    )
}

const DealDetailsFunction = ({ navigation, route }) => {
    console.log('navigation>?? profiole >> dealdetails', route.params)
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ width: '100%', height: hp(9), marginTop: hp(4) }}>

                <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                    <Appbar.BackAction
                        color="black"
                        onPress={() => navigation.goBack()}
                    />
                    <Appbar.Content
                        style={{ alignItems: 'center' }}
                        color="#333"
                        title={route.params.Title}
                        titleStyle={{ fontSize: 20, fontFamily: 'Poppins-SemiBold', color: '#333' }}
                    />
                    <Appbar.Action
                        icon={() => <Ionicons
                            name="ios-information-circle-outline"
                            size={25}
                            color="black"
                        />}
                        color="black"
                        onPress={() => {
                            navigation.navigate('Participant', {
                                prevScrName: 'DealDetails',
                            });
                        }}
                    />
                </Appbar.Header>
            </View>
            <View
                style={styles.flex}>
                <DealDetails navigation={navigation} route={route} />
            </View>
        </View>
    )
}




const NegotiateDetailsFunction = ({ navigation, route }) => {
    // console.log('navigation>?? profiole', route.params)
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ width: '100%', height: hp(9), marginTop: hp(4) }}>

                <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                    <Appbar.BackAction
                        color="black"
                        onPress={() => navigation.goBack()}
                    />
                    <Appbar.Content
                        style={{ alignItems: 'center' }}
                        color="black"
                        title={route.params.Title}
                        titleStyle={{ fontSize: 20, fontFamily: 'Poppins-SemiBold' }}
                    />
                    <Appbar.Action
                        icon={() => <Ionicons
                            name="ios-information-circle-outline"
                            size={25}
                            color="black"
                        />}
                        color="black"
                        onPress={() => {
                            navigation.navigate('Participant', {
                                prevScrName: 'DealDetails',
                            });
                        }}
                    />
                </Appbar.Header>
            </View>
            <View
                style={styles.flex}>
                <NegotiateDetails navigation={navigation} route={route} />
            </View>
        </View>
    )
}





const App = () => {

    // useFocusEffect(
    //     React.useCallback(() => {
    //         const onBackPress = () => {
    //             if (isSelectionModeEnabled()) {
    //                 disableSelectionMode();
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //         };

    //         BackHandler.addEventListener('hardwareBackPress', onBackPress);

    //         return () =>
    //             BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    //     }, [isSelectionModeEnabled, disableSelectionMode])
    // );

    // const credentials = {
    //     clientId: '344769026558-brnhdibbgm0t5slebcc769go7hp07qbm.apps.googleusercontent.com',
    //     appId: '1:344769026558:android:31b9350842bf06912e08af',
    //     apiKey: 'AIzaSyDQFD_xWk9itib5H-sGiJ-Utc1IL-8QiRo',
    //     storageBucket: 'cotton-seller.appspot.com',
    //     databaseURL: 'https://databasename.firebaseio.com',
    //     messagingSenderId: '344769026558',
    //     projectId: 'cotton-seller',
    // };

    // // const channelId = notifee.createChannel({
    // //   id: '1',
    // //   name: 'Default Channel',
    // // });

    // async function onAppBootstrap() {
    //     // Register the device with FCM


    //     if (!firebase.apps.length) {
    //         await firebase.initializeApp(credentials);
    //     }
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //     if (enabled) {
    //         // console.log('Authorization status:', authStatus);
    //     }
    //     await messaging().registerDeviceForRemoteMessages();

    //     // Get the token
    //     const token = await messaging().getToken();

    //     // console.log('token', token)

    //     await EncryptedStorage.setItem('FCMToken', token);

    //     // Save the token
    // }



    // async function onMessageReceived(message) {
    //     const { title, body } = message.notification

    //     await notifee.displayNotification({
    //         title: title,
    //         body: body,
    //         android: {
    //             channelId: "default",
    //             importance: AndroidImportance.HIGH,
    //         },
    //     });
    // }

    // useEffect(async () => {
    //     componentWillMount() {
    //         BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    //     }

    //     componentWillUnmount() {
    //         BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    //     }

    //     backPressed = () => {

    //         console.log('navigation', this.props.route)
    //         Alert.alert(
    //             'Exit App',
    //             'Do you want to exit?',
    //             [
    //                 { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
    //                 { text: 'Yes', onPress: () => BackHandler.exitApp() },
    //             ],
    //             { cancelable: false });
    //         return true;
    //     }
    // })
    //     const session = await EncryptedStorage.getItem('FCMToken');

    //     // const settings = await notifee.requestPermission();

    //     console.log('session', session)


    //     if (session === null)
    //         onAppBootstrap()





    //     const unsubscribe = messaging().onMessage(async remoteMessage => {
    //         // onMessageReceived
    //         const { title, body } = remoteMessage.notification



    //         // Display a notification
    //         await notifee.displayNotification({
    //             title: title,
    //             body: body,
    //             android: {
    //                 channelId: "default",
    //                 importance: AndroidImportance.HIGH,

    //             },
    //         });



    //         // Alert.alert(
    //         //   title, body,
    //         //   [
    //         //     { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         //   ],
    //         //   { cancelable: false },
    //         // );
    //     });

    //     messaging().onMessage(onMessageReceived);
    //     messaging().setBackgroundMessageHandler(onMessageReceived);

    //     // notifee.onForegroundEvent(({ type, detail }) => {
    //     //   switch (type) {
    //     //     case EventType.DISMISSED:
    //     //       console.log('User dismissed notification', detail.notification);
    //     //       break;
    //     //     case EventType.PRESS:
    //     //       console.log('User pressed notification', detail.notification);
    //     //       break;
    //     //   }
    //     // });

    //     notifee.onBackgroundEvent(async ({ type, detail }) => {
    //         const { notification, pressAction } = detail;

    //         // Check if the user pressed the "Mark as read" action
    //         if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    //             // Update external API
    //             // await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
    //             //   method: 'POST',
    //             // });

    //             // Remove the notification
    //             await notifee.cancelNotification(notification.id);
    //         }
    //     });



    //     return unsubscribe;
    // }, []);




    return (
        <Provider theme={theme}>
            <NavigationContainer ref={navigationRef}>
                <StatusBar barStyle={'light-content'}
                    backgroundColor="transparent" translucent={true} />
                <Stack.Navigator
                    initialRouteName="SplashScreen"
                    screenOptions={{
                        headerShown: false,
                    }}
                >

                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="HomeScreen" component={home} />
                    
                    <Stack.Screen name="MenuScreen" component={MenuScreen} />
                    <Stack.Screen name="PostToSell" component={PostToSellFunction} />
                    <Stack.Screen name="SearchToSell" component={SearchToSellFunction} />
                    <Stack.Screen name="NotificationToBuyer" component={NotificationToBuyerFunction} />
                    <Stack.Screen name="MyPost" component={MyPostFunction} />
                    <Stack.Screen name="MyContract" component={MyContractFunction} />
                    <Stack.Screen name="NewsFeed" component={NewsFeedViewFunction} />
                    <Stack.Screen name="Wallet" component={WalletFunction} />
                    <Stack.Screen name="Profile" component={ProfileFunction} />
                    <Stack.Screen name="McxScreen" component={mcxScreenFunction} />











                    <Stack.Screen name="RegisterScreen" component={RegisterScreenFunction} />
                    <Stack.Screen
                        name="ForgotPasswordScreen"
                        component={ForgotPasswordScreen} />
                    <Stack.Screen
                        name="SetPasswordScreen"
                        component={SetPasswordScreen} />
                    <Stack.Screen
                        name="ChangePasswordScreen"
                        component={ChangePasswordScreen} />
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                    {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
                    <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
                    <Stack.Screen name="MyContractDetails" component={MyContractDetailsFunction} />
                    <Stack.Screen name="MyContractFilter" component={MyContractFilterFunction} />
                    <Stack.Screen name="SearchSelectSeller" component={SearchSelectSellerFunction} />
                    <Stack.Screen name="DealDetails" component={DealDetailsFunction} />
                    <Stack.Screen name="NegotiateDetails" component={NegotiateDetailsFunction} />
                    <Stack.Screen name="NotificationSelectSeller" component={NotificationSelectSellerFunction} />
                    <Stack.Screen name="MyPostDetails" component={MyPostDetailsFunction} />
                    <Stack.Screen name="MultipleNegotiationList" component={MultipleNegotiationListFunction} />
                    <Stack.Screen name="EditProfile" component={EditProfile} />
                    <Stack.Screen name="NewsSingle" component={NewsSingle} />
                    <Stack.Screen name="Plan" component={PlanFunction} />
                    <Stack.Screen name="RegisterPlan" component={RegisterPlanFunction} />
                    <Stack.Screen name="OTPVerification" component={OTPVerificationDeal} />

                    {/* <Stack.Screen name="Wallet" component={Wallet} /> */}
                    <Stack.Screen name="Custom" component={Custom} />
                    <Stack.Screen name="Calculator" component={tabnavi} />
                    <Stack.Screen name="ReportScreen" component={ReportTab} />

                    

                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App
