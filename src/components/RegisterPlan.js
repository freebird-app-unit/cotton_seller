import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet, View, Text, ScrollView,
    useWindowDimensions, Image, TouchableOpacity,
} from 'react-native';
import { theme } from '../core/theme';
import Button from '../components/Button';
import Swiper from 'react-native-swiper';
import { GenericStyles } from '../styles/GenericStyles';
import colors from '../common/colors';
import EncryptedStorage from 'react-native-encrypted-storage';

import {
    FullButtonComponent,
} from '../lib';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../components/responsive-ratio';
import defaultMessages from '../helpers/defaultMessages';
import TextInput from '../components/TextInput';
import { FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import api_config from '../Api/api';
import axios from 'axios';
import { RazorpayApiKey, RazorpayApiSecret } from "../Api/Razorpayconfig";
import RazorpayCheckout from 'react-native-razorpay';

const RegisterPlan = ({ navigation }) => {

    // console.log('props>>', navigation)

    const [Plan, setPlan] = useState([])
    const [refund,setRefund] = useState(false)

    const [itemChecked, setItemChecked] = useState(true);


    // const[Id,setId] = useState(0);
    const backgroundStyle = {
        flex: 1,
        width: '100%',
        paddingBottom: 5,
        paddingTop: hp(3),
        // marginTop: hp(2),
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    };
    const [spinner, setSpinner] = useState(false)
    const [IdSelected, setIdSelected] = useState('')


    useEffect(() => {

        try {
            setSpinner(true)
            let data = {

                "deal_id": 1, "upload_by": "seller", "sample": 1
            };

            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            axios({
                url: api_config.BASE_URL + api_config.PLAN_LIST,
                method: 'GET',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(function (response) {
                console.log('res', response.data.data)
                if (response.data.status == 200) {

                    let p = response.data.data.map(item => {

                        return {
                            ...item,
                            selected: false
                        }

                    })
                    console.log('p', p)
                    setPlan(p)
                    // navigation.setParams({
                    //     ProfileData: response.data.data,
                    // });
                    setSpinner(false)
                } else {
                    console.log(response.data.message);
                }
            })
                .catch(function (error) {
                    setSpinner(false)
                    console.log('error', JSON.stringify(error))
                    alert(defaultMessages.en.serverNotRespondingMsg);
                });
        } catch (error) {
            setSpinner(false)

            console.log(error);
        }

    }, [])

    const onSubmitButtonPress = async () => {
        //  test with upi failure@razorpay
        //  test with upi success@razorpay

        
        let datas = JSON.parse(await EncryptedStorage.getItem('user_data'));
        let data = {
            ...datas,
            plan_id: IdSelected.id,
            payment_status: false,
            payment_id: '',
            user_type:'seller'         

        };

        await EncryptedStorage.setItem('Plan_data', JSON.stringify(data));

        if (IdSelected) {
            try {
                var today = new Date();
                var time = today.getHours() + today.getMinutes() + today.getSeconds();

                let user_data = JSON.parse(await EncryptedStorage.getItem('user_data'))

                console.log('IdSelected.price', IdSelected.price)
                let op = {
                    name: 'Seller ' + await EncryptedStorage.getItem('user_id'),
                    image: require('../assets/ic_launcher.png'),
                    description: `Payment of ${IdSelected.name} with ${IdSelected.validity} days validity`,
                    key: RazorpayApiKey,
                    currency: 'INR',
                    amount: JSON.stringify(IdSelected.price) + '00',
                    prefill: {
                        email: '',
                        contact: user_data.user_mobile,
                        name: '',
                    },
                    theme: { color: theme.colors.primary }
                }

                //    setOption(op);
                console.log('option', op)

                RazorpayCheckout.open(op)
                    .then(async res => {
                        console.log('res', res)
                        if (res.hasOwnProperty('razorpay_payment_id'))
                        {
                            let data = JSON.parse(await EncryptedStorage.getItem('Plan_data'));
                                data.payment_status = true,
                                data.payment_id = res.razorpay_payment_id,

                                    await EncryptedStorage.setItem('Plan_data',JSON.stringify(data));
                           
                            PaymentDone(res.razorpay_payment_id)
                        }
                        else
                            alert('please check your network')

                    })
                    .catch(err => {
                        console.log(JSON.stringify(err))
                        alert('please check your network')
                    });

            }
            catch (error) {
                console.log(JSON.stringify(error));
            }
        }
        else {
            alert('Please Select the Plan')
        }

    }

    const PaymentDone = async (RazorPayId) => {

        console.log('avigay')
        try {
            setSpinner(true)
            let data = {

                "user_id": await EncryptedStorage.getItem('user_id'),
                "user_type": "seller",
                "plan_id": IdSelected.id,
                'transaction_id': RazorPayId
            };

            const formData = new FormData();
            formData.append('data', JSON.stringify(data));
            console.log('data', data);
            axios({
                url: api_config.BASE_URL + api_config.ADD_USER_PLAN,
                method: 'POST',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',

                },
            }).then(async function (response) {
                setSpinner(false)

                console.log('res>>>', response.data)
                if (response.data.status == 200) {
                    alert(response.data.message)
                    let data = JSON.parse(await EncryptedStorage.getItem('Plan_data'));
                       
                        data.is_api_call = true,

                        await EncryptedStorage.setItem('Plan_data', JSON.stringify(data));
                    // setRefund(true)


                    navigation.navigate('HomeScreen')

                } else {
                    setRefund(true)                
                    console.log(response.data.message);
                }
            })
                .catch(function (error) {
                    setRefund(true)
                    setSpinner(false)
                    console.log('error', JSON.stringify(error))
                    alert(defaultMessages.en.serverNotRespondingMsg);
                });
        } catch (error) {
            setRefund(true)
            console.log(Json.stringify(error));
        }

    }

    const [submittingOtp, setSubmittingOtp] = useState(true);

    const InPutText = (props) => {
        return (
            <View style={{
                backgroundColor: '#fff', width: wp(90), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <View style={{ width: wp(30), alignItems: 'flex-start', justifyContent: 'center', paddingTop: hp(1.5) }}>
                    <Text style={{
                        fontSize: hp(1.9),
                        color: theme.colors.text,
                        fontFamily: "Poppins-Regular"
                    }}>{props.label}</Text></View>
                <View style={{ width: wp(43), marginVertical: -4 }}><TextInput
                    returnKeyType="next"
                    require={true}
                    maxLength={50}
                    {...props}
                /></View>
                <View style={{ width: wp(18), alignItems: 'flex-start', justifyContent: 'center', paddingTop: hp(1.5) }}>
                    <Text style={{
                        fontSize: hp(1.7),
                        color: theme.colors.text,
                        opacity: 0.5,
                        fontFamily: "Poppins-Regular",
                        width: wp(18)
                    }} numberOfLines={2}>{props.labelValue}</Text></View>




            </View>
        )
    }


    // const FirstRoute = () => (
    //     <View style={{ flex: 1, marginTop: hp(1) }}>

    //         <Image style={{ width: wp(90), height: hp(25) }} source={require('../images/a1.png')} />
    //         <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: wp(2) }}>

    //             <Text style={styles.label}>Punjab Agriculture University (PAU) on wednesday asked the cotton growers to</Text>
    //             <Text style={[styles.VAlue1], { opacity: 0.5 }}>1h ago</Text>
    //         </View>
    //     </View>



    // );


    const select = (item) => {
        console.log('item', item);

        item.selected = !item.selected
        setIdSelected(item)
        const updated = Plan.map((it) => {
            it.selected = false;
            if (it.id === item.id) {
                it.selected = !it.selected;
            }
            return it;
        });

        setPlan(updated)
        setItemChecked((prevState) => !prevState);
        setSubmittingOtp(false)

        // setPlan(pl)
    }



    const onRefund = async () => {
        // var basicAuth = 'Basic ' + window.btoa(username + ':' + password);

        // console.log('besicauth', basicAuth)

        try {

            let data =  JSON.parse(await EncryptedStorage.getItem('Plan_data'));
            setSpinner(true)

            
            // const formData = new FormData();
            // formData.append('data', JSON.stringify(data));
            console.log(`https://api.razorpay.com/v1/payments/${data.payment_id}/refund`);
            var session_url = `https://api.razorpay.com/v1/payments/${data.payment_id}/refund`;
            // var username = RazorpayApiKey;
            // var password = RazorpayApiSecret;
            // var basicAuth = 'Basic ' + btoa(username + ':' + password);

            // console.log('besicauth',basicAuth)
            // axios.post(session_url, {}, {
            //     headers: { 'Authorization': + basicAuth }
            axios({
                url: session_url,
                method: 'POST', 
                auth: {
                    username: RazorpayApiKey,
                    password: RazorpayApiSecret,
                },
               }).then(function (response) {
                setSpinner(false)

                console.log('res>>>refunc', response)
                // if (response.data.status == 200) {
                //     // console.log('resposed',response.data)
                    
                //     // alert(`the refund for the amount ${amount}`)

                //     navigation.navigate('HomeScreen')

                // } else {
                //     setRefund(true)
                //     console.log(response.data.message);
                // }
            }).catch(function (error) {
                    setSpinner(false)
                    console.log('error', JSON.stringify(error))
                    alert(defaultMessages.en.serverNotRespondingMsg);
                });
        } catch (error) {
            console.log('eroor',JSON.stringify(error));
        }
    }

    const renderItem = ({ item }) => {
        return <View style={{
            borderWidth: wp(0.3), width: wp(40), margin: wp(2.5),
            paddingTop: hp(1), backgroundColor: 'rgba(0,0,0,0.02)',
            borderColor: item.selected ? theme.colors.primary : 'rgba(0,0,0,0.1)',
            justifyContent: 'space-between', borderRadius: wp(5),
            zIndex: 8888
        }} onStartShouldSetResponder={() => select(item)}>
            {item.selected && <View style={{ height: hp(3), width: hp(3), zIndex: 10000, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: hp(-1.5), left: wp(20) - hp(1.5) }}>
                <Ionicons name='checkmark-circle' size={hp(3)} color={theme.colors.primary} />
            </View>}
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ height: hp(9), marginTop: hp(1), alignItems: 'center' }}>
                    <Text style={{
                        fontSize: hp(2.2),
                        color: theme.colors.text,
                        opacity: 0.5,
                        fontFamily: "Poppins-Regular",
                    }}>Validity</Text>
                    <Text style={styles.label}>{item.validity} Days</Text>
                </View>
                <View style={{ width: wp(40), justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={{
                        height: hp(4), justifyContent: 'center', alignItems: 'center',
                        backgroundColor: theme.colors.primary, width: wp(40),
                        borderBottomEndRadius: wp(5), borderBottomStartRadius: wp(5)
                    }}>
                        <Text style={styles.value}>{item.price}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }

    // const setIndex = (index) => setId(index);

    return (
        <View style={{ flex: 1, backgroundColor: '#333', }}>
            <Spinner visible={spinner} color="#085cab" />
            <View style={backgroundStyle}>
                {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} hidden /> */}
                <View style={{ flex: 1, backgroundColor: 'white', }}>

                    <View style={{
                        flex: 1, width: wp(100),
                        flexDirection: 'column', backgroundColor: '#fff', paddingHorizontal: wp(5)
                    }}>

                        <View style={{height:hp(65)}}>
                            <FlatList
                                data={Plan}
                                numColumns={2}
                                renderItem={renderItem}
                                extraData={itemChecked}
                            />
                        </View>
                        <FullButtonComponent
                            type={'fill'}
                            // text={refund ? 'Refund' : 'Buy'} // when the refund need to done temp commentted
                            text={'Buy'}

                            textStyle={styles.submitButtonText}
                            // buttonStyle={GenericStyles.mt24}
                            // onPress={refund ? onRefund : onSubmitButtonPress} // when the refund need to done temp commentted
                            onPress={onSubmitButtonPress}
                        // disabled={submittingOtp}
                        />
                        
                    </View>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: hp(2.4),
        color: theme.colors.text,
        fontFamily: "Poppins-Regular"
    },
    value: {
        fontSize: hp(2.5),
        color: '#fff',
        fontFamily: "Poppins-Bold",
    },
    VAlue1: {
        fontSize: hp(2),
        color: theme.colors.text,
        fontFamily: "Poppins-Regular"
    },
    submitButtonText: {
        color: colors.WHITE,
        //backgroundColor:colors.GREEN,
        fontFamily: 'popins',
        fontSize: 18,
        alignItems: 'center',
    },

})

export default RegisterPlan