import React,{useEffect} from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';
import { theme } from './src/core/theme'
import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  SplashScreen,
  Dashboard,
  SetPasswordScreen,
  VerifyOtpScreen,
  ChangePasswordScreen,
  SearchSelectSeller,
  DealDetails,
  NegotiateDetails,
  NotificationSelectSeller,
  MyPostDetails,
  MyContractFilter,
  MyContractDetails,
  MultipleNegotiationList
} from './src/screens'

import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import EncryptedStorage from 'react-native-encrypted-storage';

const Stack = createStackNavigator()

const App = () => {

  const credentials = {
    clientId: '344769026558-brnhdibbgm0t5slebcc769go7hp07qbm.apps.googleusercontent.com',
    appId: '1:344769026558:android:31b9350842bf06912e08af',
    apiKey: 'AIzaSyDQFD_xWk9itib5H-sGiJ-Utc1IL-8QiRo',
    storageBucket: 'cotton-seller.appspot.com',
    databaseURL: 'https://databasename.firebaseio.com',
    messagingSenderId: '344769026558',
    projectId: 'cotton-seller',
  };

  async function onAppBootstrap() {
    // Register the device with FCM

    if (!firebase.apps.length) {
      await firebase.initializeApp(credentials);
    }

    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const token = await messaging().getToken();

    console.log('token', token)

    await EncryptedStorage.setItem('FCMToken', token);

    // Save the token
  }


  async function onMessageReceived(message) {
    console.log('message', message)
  }

  useEffect(() => {
    onAppBootstrap()
    
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });

    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);

    // return unsubscribe;
  }, []);

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}/>
            <Stack.Screen
            name="SetPasswordScreen"
            component={SetPasswordScreen}/>
            <Stack.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}/>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
		  <Stack.Screen name="MyContractDetails" component={MyContractDetails} />
		  <Stack.Screen name="MyContractFilter" component={MyContractFilter} />
          <Stack.Screen name="SearchSelectSeller" component={SearchSelectSeller} />
          <Stack.Screen name="DealDetails" component={DealDetails} />
          <Stack.Screen name="NegotiateDetails" component={NegotiateDetails} />
          <Stack.Screen name="NotificationSelectSeller" component={NotificationSelectSeller} />
          <Stack.Screen name="MyPostDetails" component={MyPostDetails} />
	  <Stack.Screen name="MultipleNegotiationList" component={MultipleNegotiationList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
